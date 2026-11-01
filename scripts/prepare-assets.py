"""Rebuild the small reference-derived textures from a local video.

Optional authoring tool, not required for preview/render.
Usage: python scripts/prepare-assets.py /path/to/reference.mp4
Requires: pip install opencv-python-headless numpy
The input video stays outside the repository. No network calls or credentials.
"""

import json
import sys
from pathlib import Path

import cv2
import numpy as np

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "artwork"
OUT.mkdir(parents=True, exist_ok=True)
capture = cv2.VideoCapture(sys.argv[1])


def frame(number):
    capture.set(cv2.CAP_PROP_POS_FRAMES, number)
    ok, image = capture.read()
    if not ok:
        raise RuntimeError(f"Could not decode frame {number}")
    return image


# All coordinates are in the original 736 × 414 image. Four outside corners
# unwrap each artwork into a rectangular texture; CSS supplies the round corners.
CARDS = [
    ("car", 390, [[100, 147], [184, 141], [176, 345], [91, 330]]),
    ("newspaper", 410, [[165, 106], [288, 97], [289, 314], [165, 304]]),
    ("newspaper-bw", 390, [[217, 139], [382, 144], [371, 360], [207, 350]]),
    ("lotus", 410, [[329, 96], [495, 101], [495, 314], [329, 317]]),
    ("red", 420, [[252, 99], [419, 99], [419, 315], [252, 315]]),
    ("crest", 438, [[287, 99], [456, 99], [456, 315], [287, 315]]),
    ("watercolor", 475, [[144, 105], [244, 98], [244, 312], [144, 300]]),
    ("consistency", 475, [[280, 97], [449, 97], [449, 316], [280, 316]]),
    ("portrait", 487, [[335, 47], [502, 47], [502, 264], [335, 264]]),
    ("icecream", 487, [[531, 52], [619, 67], [619, 242], [531, 260]]),
]
metadata = []
for name, number, corners in CARDS:
    source = np.float32(corners)
    target = np.float32([[0, 0], [329, 0], [329, 439], [0, 439]])
    matrix = cv2.getPerspectiveTransform(source, target)
    image = cv2.warpPerspective(frame(number), matrix, (330, 440))
    cv2.imwrite(str(OUT / f"{name}.webp"), image, [cv2.IMWRITE_WEBP_QUALITY, 94])
    metadata.append({"name": name, "frame": number, "corners": corners})

cv2.imwrite(str(OUT / "blue-light-field.png"), frame(0))

# Redraw the distinctive rounded SDS silhouette as clean cubic Bezier paths.
# The low-resolution reference's compression stair steps are deliberately omitted.
s_shape = "M51 2C56 2 59 5 59 10C59 14 56 17 52 17H23C20 17 18 19 20 22C21 23 24 24 25 25L48 36C56 40 60 44 60 51C60 61 53 68 43 68H11C7 68 4 65 4 61C4 57 7 54 11 54H40C44 54 45 50 41 48L16 36C7 32 3 27 3 19C3 9 11 2 23 2Z"
d_shape = "M74 68V33C74 14 86 1 104 1C123 1 137 15 137 33C137 53 123 68 103 68ZM89 54H103C115 54 123 46 123 34C123 23 116 16 105 16C95 16 89 23 89 34Z"
svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 213 72">'
svg += '<defs><path id="s" d="' + s_shape + '"/></defs>'
svg += '<g fill="#fff"><use href="#s"/><path fill-rule="evenodd" d="' + d_shape + '"/><use href="#s" x="149"/></g></svg>\n'
(OUT / "sds-wordmark.svg").write_text(svg)
(ROOT / "docs" / "asset-sampling.json").write_text(json.dumps(metadata, indent=2) + "\n")
capture.release()
print(f"Prepared background, {len(CARDS)} artwork textures, and vector wordmark.")
