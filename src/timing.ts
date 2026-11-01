import { Easing, interpolate } from "remotion";

export const VIDEO = {
  width: 736,
  height: 414,
  fps: 30,
  durationInFrames: 629,
};

export const ease = Easing.bezier(0.22, 1, 0.36, 1);

export const value = (
  frame: number,
  frames: number[],
  values: number[],
  smooth = false,
) =>
  interpolate(frame, frames, values, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    ...(smooth ? { easing: ease } : {}),
  });

export const appear = (frame: number, start: number, duration = 6) =>
  value(frame, [start, start + duration], [0, 1], true);

export const SCENES = {
  typography: { from: 0, duration: 240 },
  services: { from: 232, duration: 145 },
  carousel: { from: 377, duration: 124 },
  logo: { from: 498, duration: 131 },
} as const;
