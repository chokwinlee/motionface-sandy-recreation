import { useCurrentFrame } from "remotion";
import { appear, value } from "../timing";
import { ToolIcon } from "./ToolIcon";

const Label: React.FC<{
  children: React.ReactNode;
  x: number;
  y?: number;
  opacity?: number;
  scale?: number;
  stretch?: number;
  clip?: number;
  color?: string;
}> = ({
  children,
  x,
  y = 184,
  opacity = 1,
  scale = 1,
  stretch = 1.07,
  clip = 1,
  color = "#fff",
}) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      fontSize: 40,
      lineHeight: "48px",
      letterSpacing: -1.6,
      whiteSpace: "nowrap",
      opacity,
      color,
      transform: `scale(${scale}) scaleX(${stretch})`,
      transformOrigin: "left center",
      clipPath: `inset(0 ${(1 - clip) * 100}% 0 0)`,
    }}
  >
    {children}
  </div>
);

export const KineticType: React.FC = () => {
  const f = useCurrentFrame();
  const iconReveal = appear(f, 75, 4) * value(f, [171, 178], [1, 0]);
  const likeX = value(f, [66, 104, 172, 181], [359, 340, 340, 344], true);
  const words = [
    { word: "Creativity", x: 155, start: 2, end: 76, endDuration: 3 },
    { word: "is", x: 320, start: 11, end: 82, endDuration: 7 },
    { word: "like", x: likeX, start: 19, end: 210, endDuration: 6 },
    { word: "a", x: 421, start: 27, end: 94, endDuration: 7 },
    { word: "game,", x: 452, start: 32, end: 94, endDuration: 7 },
  ];

  return (
    <>
      {words.map(({ word, x, start, end, endDuration }) => {
        const exit = value(f, [end, end + endDuration], [1, 0], true);
        const isLike = word === "like";
        const baseX =
          word === "Creativity" ? value(f, [19, 40], [170, 155], true) : x;
        const cyan =
          (word === "Creativity" && f >= 29 && f < 36) ||
          (word === "game," && f >= 53 && f < 61);
        return (
          <Label
            key={word}
            x={baseX}
            opacity={exit}
            scale={isLike ? 1 : 0.35 + exit * 0.65}
            stretch={
              word === "Creativity" ? value(f, [19, 40], [1, 1.07]) : 1.07
            }
            y={
              184 -
              (isLike
                ? 0
                : (1 - exit) *
                  (word === "Creativity" || word === "is" ? 41 : -43))
            }
            clip={appear(f, start, 5)}
            color={cyan ? "#94d7f5" : "#fff"}
          >
            {word}
          </Label>
        );
      })}
      {f >= 23 && f < 37 ? (
        <svg
          width="92"
          height="51"
          style={{
            position: "absolute",
            left: value(f, [23, 32], [435, 451]),
            top: 175,
            opacity: 0.7,
          }}
        >
          <path
            d="M1 15V1h14M91 35v15H76"
            stroke="#b5d4ef"
            strokeWidth="0.9"
            fill="none"
          />
        </svg>
      ) : null}
      {f >= 75 && f < 179
        ? Array.from({ length: 8 }, (_, i) => {
            const upper = i < 4;
            const laneIndex = i % 4;
            const centerX = upper
              ? value(
                  f,
                  [77, 116, 133, 151, 168, 176],
                  [235, 285, 328, 462, 461, 470],
                  true,
                )
              : value(
                  f,
                  [95, 115, 133, 151, 168, 176],
                  [461, 469, 427, 272, 280, 292],
                  true,
                );
            const spacing = value(
              f,
              [77, 121, 132, 140, 153, 170],
              [27, 27, 72, 34, 30, 30],
            );
            const y = upper
              ? value(f, [77, 116, 151, 169, 176], [166, 149, 137, 157, 162])
              : value(f, [95, 119, 155, 169, 176], [250, 252, 273, 251, 245]);
            const drift = Math.sin(f * 0.14 + i * 1.9) * (f > 122 ? 4 : 0);
            const start = upper ? 75 : 94;
            const palette = upper
              ? f < 85
                ? [0, 1, 2, 3]
                : f < 94
                  ? [3, 4, 5, 6]
                  : f < 102
                    ? [10, 9, 10, 11]
                    : f < 110
                      ? [7, 1, 10, 7]
                      : f < 118
                        ? [8, 1, 2, 0]
                        : f < 144
                          ? [8, 12, 13, 3]
                          : f < 156
                            ? [8, 10, 14, 3]
                            : [8, 2, 5, 11]
              : f < 110
                ? [9, 14, 15, 5]
                : f < 120
                  ? [9, 4, 7, 5]
                  : f < 144
                    ? [1, 6, 10, 2]
                    : f < 157
                      ? [15, 3, 10, 2]
                      : [3, 12, 13, 2];
            const kind = palette[laneIndex];
            const laneExit =
              upper && laneIndex === 0
                ? value(f, [131, 138], [1, 0])
                : !upper && laneIndex === 3
                  ? value(f, [131, 138], [1, 0])
                  : 1;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: centerX + (laneIndex - 1.5) * spacing - 11,
                  top: y - 11 + drift,
                  opacity:
                    iconReveal * appear(f, start + laneIndex, 3) * laneExit,
                  transform: `rotate(${Math.sin(f / 9 + i) * 10}deg)`,
                }}
              >
                <ToolIcon kind={kind} />
              </div>
            );
          })
        : null}
      {f >= 171 ? (
        <>
          <Label
            x={161}
            stretch={0.94}
            opacity={appear(f, 171, 5) * value(f, [198, 207], [1, 0])}
            clip={appear(f, 171, 5)}
          >
            and yes, we
          </Label>
          <Label
            x={value(f, [208, 224, 240], [405, 291, 103], true)}
            clip={appear(f, 177, 6)}
          >
            to play
            <span style={{ opacity: value(f, [230, 236], [1, 0]) }}>.</span>
          </Label>
        </>
      ) : null}
    </>
  );
};
