import os
import subprocess
import json
from PIL import Image

def main():
    video_path = "VIDEO-ANI/ANIMATED-VID.mp4"
    out_dir = "public/frames"
    os.makedirs(out_dir, exist_ok=True)
    os.makedirs("public/assets/images", exist_ok=True)
    
    print(f"Extracting frames from {video_path}...")
    
    # 1. Extract frames directly to high quality WebP at 1600x900 using FFmpeg
    # The source is 2560x1440, so 1600x900 is 16:9, crystal crisp, and lightweight
    out_pattern = os.path.join(out_dir, "frame_%04d.webp")
    
    cmd = [
        "ffmpeg", "-y",
        "-i", video_path,
        "-vf", "scale=1600:900:flags=lanczos",
        "-c:v", "libwebp",
        "-quality", "82",
        "-compression_level", "4",
        out_pattern
    ]
    
    subprocess.run(cmd, check=True)
    
    # Count generated frames
    frames = [f for f in sorted(os.listdir(out_dir)) if f.startswith("frame_") and f.endswith(".webp")]
    total_frames = len(frames)
    print(f"Extracted {total_frames} frames successfully.")
    
    # Calculate total size
    total_bytes = sum(os.path.getsize(os.path.join(out_dir, f)) for f in frames)
    print(f"Total frame sequence size: {total_bytes / (1024*1024):.2f} MB")
    
    # Write manifest
    manifest = {
        "count": total_frames,
        "pattern": "frames/frame_%04d.webp",
        "aspectRatio": 16 / 9,
        "width": 1600,
        "height": 900
    }
    with open(os.path.join(out_dir, "manifest.json"), "w") as f:
        json.dump(manifest, f, indent=2)
    print("Manifest written to public/frames/manifest.json")
    
    # 2. Convert START.png and END.png to optimized WebP for editorial sections
    for img_name in ["START.png", "END.png"]:
        src_path = os.path.join("IMAGES", img_name)
        if os.path.exists(src_path):
            dst_name = "start.webp" if "START" in img_name else "end.webp"
            dst_path = os.path.join("public/assets/images", dst_name)
            im = Image.open(src_path).convert("RGB")
            # Resize max dimension 2000px if larger
            im.thumbnail((2048, 2048), Image.Resampling.LANCZOS)
            im.save(dst_path, "WEBP", quality=88)
            print(f"Saved {dst_path} ({os.path.getsize(dst_path) / 1024:.1f} KB)")
            
    # Also save a hero poster from frame 1
    if frames:
        first_frame = Image.open(os.path.join(out_dir, frames[0]))
        first_frame.save("public/assets/images/hero_poster.webp", "WEBP", quality=85)
        print("Hero poster created.")

if __name__ == "__main__":
    main()
