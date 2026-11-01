import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, statSync } from "node:fs";

const file = process.argv[2] ?? "out/sandy-recreation.mp4";
assert.ok(
  existsSync(file),
  `Missing render: ${file}. Run npm run render first.`,
);
const result = JSON.parse(
  execFileSync(
    "npx",
    [
      "--no-install",
      "remotion",
      "ffprobe",
      "-v",
      "error",
      "-count_frames",
      "-show_streams",
      "-show_format",
      "-of",
      "json",
      file,
    ],
    { encoding: "utf8", maxBuffer: 1024 * 1024 },
  ),
);
const video = result.streams.find((stream) => stream.codec_type === "video");
const audio = result.streams.find((stream) => stream.codec_type === "audio");
assert.ok(video, "No video stream");
assert.ok(audio, "No soundtrack");
assert.equal(video.codec_name, "h264");
assert.equal(video.pix_fmt, "yuv420p");
assert.equal(video.r_frame_rate, "30/1");
assert.equal(Number(video.nb_read_frames ?? video.nb_frames), 629);
assert.ok(
  (video.width === 736 && video.height === 414) ||
    (video.width === 1920 && video.height === 1080),
  `Unexpected dimensions ${video.width} × ${video.height}`,
);
assert.ok(Math.abs(Number(video.duration) - 629 / 30) < 0.05);
assert.ok(Math.abs(Number(audio.duration) - 629 / 30) < 0.1);
assert.ok(statSync(file).size > 100_000, "Implausibly small output");
console.log(
  JSON.stringify(
    {
      file,
      video: `${video.width}x${video.height}, ${video.codec_name}, ${video.pix_fmt}`,
      frames: Number(video.nb_read_frames ?? video.nb_frames),
      fps: 30,
      duration: Number(video.duration),
      audio: audio.codec_name,
      bytes: statSync(file).size,
      passed: true,
    },
    null,
    2,
  ),
);
