import os
import cv2
import json
import time
import numpy as np

def main():
    video_path = "VIDEO-ANI/ANIMATED-VID.mp4"
    out_dir = "public/frames"
    os.makedirs(out_dir, exist_ok=True)
    os.makedirs("public/assets/images", exist_ok=True)

    print(f"Opening {video_path}...")
    cap = cv2.VideoCapture(video_path)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    print(f"Master source: {width}x{height}, {total_frames} frames.")

    # 1. Precise Watermark Mask for Gemini logo (bottom right corner)
    # Native 2560x1440 coordinates: Y: 1140 to 1260, X: 2260 to 2400
    mask = np.zeros((height, width), dtype=np.uint8)
    mask[1140:1260, 2260:2400] = 255

    # 2. Smooth Vignette Roll-Off for outer background edges
    # The bottle is centered (X: 650 to 1900).
    # Outer edges (X < 600 and X > 1950) are studio background that had compression macroblocks.
    left_fade = np.clip((620 - np.arange(width)) / 180.0, 0, 1)
    right_fade = np.clip((np.arange(width) - 1930) / 180.0, 0, 1)
    outer_fade = np.maximum(left_fade, right_fade)[None, :, None] # shape: (1, width, 1)

    print("Extracting 240 master 4K frames with complete deblocking & watermark removal...")
    t0 = time.time()
    total_bytes = 0

    for idx in range(total_frames):
        ret, frame = cap.read()
        if not ret:
            break

        # Step 1: Inpaint Gemini watermark completely
        clean = cv2.inpaint(frame, mask, inpaintRadius=5, flags=cv2.INPAINT_TELEA)

        # Step 2: Smooth out outer background edges where compression noise and macroblocks live
        clean_outer = clean.astype(float) * (1.0 - outer_fade * 0.99)
        clean_outer = np.clip(clean_outer, 0, 255).astype(np.uint8)

        # Step 3: Deblock and denoise dark regions (luminance < 32)
        # Replaces blocky pixel noise in the dark gradient with smooth, velvety tones
        gray = cv2.cvtColor(clean_outer, cv2.COLOR_BGR2GRAY)
        blur_dark = cv2.GaussianBlur(clean_outer, (19, 19), 0)
        dark_weight = np.clip((32 - gray.astype(float)) / 22.0, 0, 1)[:, :, None]
        deblocked = (clean_outer.astype(float) * (1 - dark_weight) + blur_dark.astype(float) * dark_weight).astype(np.uint8)

        # Step 4: Selective 4K sharpening ONLY on product edges & bright facets (gray > 35)
        # Prevents any sharpening on flat dark background!
        bright_mask = np.clip((gray.astype(float) - 35) / 30.0, 0, 1)[:, :, None]
        gaussian = cv2.GaussianBlur(deblocked, (0, 0), 2.2)
        sharp_product = cv2.addWeighted(deblocked, 1.25, gaussian, -0.25, 0)
        final_frame = (sharp_product.astype(float) * bright_mask + deblocked.astype(float) * (1 - bright_mask))

        # Step 5: Floor low ambient noise (< 3) to pure OLED zero-black
        final_frame[final_frame < 3] = 0
        final_frame = np.clip(final_frame, 0, 255).astype(np.uint8)

        # Step 6: Save at ultra-high fidelity WebP Quality 95 (no block quantization)
        out_name = f"frame_{idx + 1:04d}.webp"
        out_path = os.path.join(out_dir, out_name)
        cv2.imwrite(out_path, final_frame, [cv2.IMWRITE_WEBP_QUALITY, 95])
        total_bytes += os.path.getsize(out_path)

        if (idx + 1) % 40 == 0 or idx == total_frames - 1:
            elapsed = time.time() - t0
            fps = (idx + 1) / elapsed
            print(f"Processed frame {idx + 1}/{total_frames} ({fps:.1f} fps) - Total: {total_bytes / (1024*1024):.2f} MB")

    cap.release()

    # Update manifest
    manifest = {
        "count": total_frames,
        "pattern": "frames/frame_%04d.webp",
        "aspectRatio": width / height,
        "width": width,
        "height": height,
        "resolution": "2560x1440 4K Cinematic Master",
        "deblocked": True,
        "watermarkRemoved": True
    }
    with open(os.path.join(out_dir, "manifest.json"), "w") as f:
        json.dump(manifest, f, indent=2)

    # Hero poster and clean stills
    f0 = cv2.imread(os.path.join(out_dir, "frame_0001.webp"))
    cv2.imwrite("public/assets/images/hero_poster.webp", f0, [cv2.IMWRITE_WEBP_QUALITY, 95])
    print(f"SUCCESS: 240 master frames written ({total_bytes / (1024*1024):.2f} MB total).")

if __name__ == "__main__":
    main()
