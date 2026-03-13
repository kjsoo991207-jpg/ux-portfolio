#!/bin/bash
# Run this from your Mac terminal to extract frames from the scan video.
# Then I can look at the frames and tell you where to cut.
# Usage: ./scripts/extract-video-frames.sh

set -e
VIDEO="$HOME/Downloads/Gen-4 Turbo 한사람이 얼굴이 나오는게 아니라, 손만 나온 상태에서 걸어가 그 이후에, 테이블 위에 있는 저 통을 집어 올려 이 상태는 전부 카메라즉 동영상이 켜져 있는게 녹화되었으.mp4"
OUTDIR="$(dirname "$0")/../public/videos/frames"
mkdir -p "$OUTDIR"

if [[ ! -f "$VIDEO" ]]; then
  echo "Video not found at: $VIDEO"
  exit 1
fi

# Extract one frame every second (0, 1, 2, 3, 4, 5)
for i in 0 1 2 3 4 5; do
  out="$OUTDIR/frame_$(printf "%02d" $i).png"
  echo "Extracting t=${i}s -> $out"
  ffmpeg -y -ss $i -i "$VIDEO" -vframes 1 -update 1 "$out" 2>/dev/null || true
done

echo "Done. Frames saved to $OUTDIR"
ls -la "$OUTDIR"
