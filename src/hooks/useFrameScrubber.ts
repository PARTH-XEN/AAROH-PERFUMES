import { useState, useEffect, useRef, useCallback } from 'react';
import { Manifest } from '../types';

interface UseFrameScrubberOptions {
  manifestUrl: string;
  onProgress?: (loaded: number, total: number) => void;
}

export function useFrameScrubber({ manifestUrl, onProgress }: UseFrameScrubberOptions) {
  const [manifest, setManifest] = useState<Manifest | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [loadPercentage, setLoadPercentage] = useState(0);

  // Buffer and decoded bitmaps
  const blobsRef = useRef<(Blob | null)[]>([]);
  const bitmapsRef = useRef<Map<number, ImageBitmap>>(new Map());
  const decodingRef = useRef<Set<number>>(new Set());
  const directionRef = useRef<number>(1);
  const lastIndexRef = useRef<number>(-1);

  const KEEP_WINDOW = 60; // Max bitmaps kept in memory for device safety
  const AHEAD_LOOK = 24;  // Decode ahead frames

  // 1. Fetch manifest
  useEffect(() => {
    fetch(manifestUrl)
      .then((res) => {
        if (!res.ok) throw new Error('Manifest not found');
        return res.json();
      })
      .then((data: Manifest) => {
        setManifest(data);
        blobsRef.current = new Array(data.count).fill(null);
      })
      .catch((err) => console.error('Manifest fetch error:', err));
  }, [manifestUrl]);

  // Decode specific index to ImageBitmap
  const decodeFrame = useCallback(async (index: number) => {
    if (bitmapsRef.current.has(index) || decodingRef.current.has(index)) return;
    const blob = blobsRef.current[index];
    if (!blob) return;

    decodingRef.current.add(index);
    try {
      const bmp = await createImageBitmap(blob);
      bitmapsRef.current.set(index, bmp);
    } catch {
      // transient decode error
    } finally {
      decodingRef.current.delete(index);
    }
  }, []);

  // Fetch Blob on demand or in background
  const fetchBlob = useCallback(async (index: number, pattern: string) => {
    if (blobsRef.current[index]) return blobsRef.current[index];
    const url = pattern.replace('%04d', String(index + 1).padStart(4, '0'));
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      blobsRef.current[index] = blob;
      return blob;
    } catch (e) {
      console.warn(`Frame ${index} fetch failed`, e);
      return null;
    }
  }, []);

  // Window manager
  const manageWindow = useCallback((center: number) => {
    if (!manifest) return;
    const { count } = manifest;

    // Decode in scroll direction
    for (let d = 0; d <= AHEAD_LOOK; d++) {
      const fwd = center + d * directionRef.current;
      const back = center - Math.min(d, 8) * directionRef.current;
      if (fwd >= 0 && fwd < count) decodeFrame(fwd);
      if (back >= 0 && back < count) decodeFrame(back);
    }

    // Evict distant bitmaps
    if (bitmapsRef.current.size > KEEP_WINDOW * 2) {
      for (const [idx, bmp] of bitmapsRef.current) {
        if (Math.abs(idx - center) > KEEP_WINDOW) {
          bmp.close();
          bitmapsRef.current.delete(idx);
        }
      }
    }
  }, [manifest, decodeFrame]);

  // Initial eager preload to unblock
  useEffect(() => {
    if (!manifest) return;
    let isCancelled = false;

    const { count, pattern } = manifest;
    const EAGER_COUNT = Math.min(Math.ceil(count * 0.15), 40); // 15% eager load

    let loaded = 0;

    const runPreload = async () => {
      // Eager load first frames
      const eagerPromises = Array.from({ length: EAGER_COUNT }, async (_, i) => {
        await fetchBlob(i, pattern);
        if (isCancelled) return;
        loaded++;
        const pct = Math.round((loaded / EAGER_COUNT) * 100);
        setLoadPercentage(pct);
        if (onProgress) onProgress(loaded, count);
      });

      await Promise.all(eagerPromises);
      if (isCancelled) return;

      // Decode initial frames
      await decodeFrame(0);
      await decodeFrame(1);
      setIsReady(true);

      // Background load the rest in sequential batches of 6
      const BATCH_SIZE = 6;
      for (let i = EAGER_COUNT; i < count; i += BATCH_SIZE) {
        if (isCancelled) break;
        const batch = [];
        for (let j = i; j < Math.min(i + BATCH_SIZE, count); j++) {
          batch.push(fetchBlob(j, pattern));
        }
        await Promise.all(batch);
      }
    };

    runPreload();

    return () => {
      isCancelled = true;
    };
  }, [manifest, fetchBlob, decodeFrame, onProgress]);

  // Render to canvas
  const drawFrame = useCallback((canvas: HTMLCanvasElement, progress: number) => {
    if (!manifest || !canvas) return;
    const { count } = manifest;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Calculate target frame
    const targetIdx = Math.min(Math.max(0, Math.round(progress * (count - 1))), count - 1);

    if (targetIdx !== lastIndexRef.current) {
      directionRef.current = targetIdx >= lastIndexRef.current ? 1 : -1;
      lastIndexRef.current = targetIdx;
    }

    manageWindow(targetIdx);

    // Find nearest available bitmap
    let activeBmp = bitmapsRef.current.get(targetIdx);
    if (!activeBmp) {
      for (let offset = 1; offset < 20; offset++) {
        if (bitmapsRef.current.has(targetIdx - offset)) {
          activeBmp = bitmapsRef.current.get(targetIdx - offset);
          break;
        }
        if (bitmapsRef.current.has(targetIdx + offset)) {
          activeBmp = bitmapsRef.current.get(targetIdx + offset);
          break;
        }
      }
    }

    if (!activeBmp) return;

    const cw = canvas.width;
    const ch = canvas.height;

    // Pure OLED zero-black background fill
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, cw, ch);

    // High quality cinematic interpolation
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Contain-fit calculation with slight bleed
    const s = Math.min(cw / activeBmp.width, ch / activeBmp.height) * 1.02;
    const w = activeBmp.width * s;
    const h = activeBmp.height * s;
    const x = (cw - w) / 2;
    const y = (ch - h) / 2;

    ctx.drawImage(activeBmp, x, y, w, h);
  }, [manifest, manageWindow]);

  return {
    manifest,
    isReady,
    loadPercentage,
    drawFrame,
  };
}
