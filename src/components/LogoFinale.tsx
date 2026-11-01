import { Img, staticFile, useCurrentFrame } from "remotion";
import { appear, SCENES, value } from "../timing";

// [frame, thin x/y/radius, ring x/y/radius, filled x/y/radius].
// The irregular spin, temporary expansion, and leftward landing were measured
// from the reference rather than replaced with a generic spring.
const keys = [
  [500, 145, 207, 27, 360, 207, 28, 575, 207, 29],
  [505, 181, 207, 27, 360.5, 207, 25.8, 526, 203.5, 28.2],
  [510, 267, 221.5, 27.8, 360, 207, 28, 455, 192, 29],
  [515, 281, 243.5, 27.8, 360, 206, 28, 443.5, 168, 29.2],
  [520, 309.5, 275, 27.2, 361.5, 206, 28.2, 414.5, 132.5, 29.5],
  [525, 382.5, 285, 27.8, 364, 204, 28, 336, 122, 29.5],
  [530, 433, 177.5, 27.8, 356.5, 195.5, 28.5, 285, 235, 29.5],
  [535, 295, 207.5, 28.8, 368.5, 218, 29.2, 440.5, 190, 30.2],
  [540, 398, 229.5, 29.2, 346.5, 182, 29.8, 274, 186, 31],
  [545, 383.5, 172.5, 29.5, 329, 212, 30, 341.5, 280, 31.2],
  [550, 343, 166, 29.5, 327.5, 230, 29.8, 392, 253, 31],
  [555, 295.5, 173.5, 28.5, 304.5, 236, 28.8, 367.5, 214.5, 29.5],
  [560, 245.5, 179.5, 26.5, 265.5, 238, 27.2, 313.5, 193.5, 28.5],
  [565, 226.5, 183.5, 26.5, 255, 239.5, 26.8, 293, 186, 28],
  [575, 221.5, 185.5, 26.5, 253.5, 240, 27, 289.5, 185.5, 28],
];
const frames = keys.map((key) => key[0]);

export const LogoFinale: React.FC = () => {
  const f = useCurrentFrame() + SCENES.logo.from;
  const sample = (column: number) =>
    value(
      f,
      frames,
      keys.map((key) => key[column]),
    );

  return (
    <>
      <svg
        width="736"
        height="414"
        style={{ position: "absolute", inset: 0, opacity: appear(f, 498, 8) }}
      >
        <circle
          cx={sample(1)}
          cy={sample(2)}
          r={sample(3) - 2.5}
          stroke="#fff"
          strokeWidth="5"
          fill="none"
        />
        <circle
          cx={sample(4)}
          cy={sample(5)}
          r={sample(6) - 7}
          stroke="#fff"
          strokeWidth="14"
          fill="none"
        />
        <circle cx={sample(7)} cy={sample(8)} r={sample(9)} fill="#fff" />
      </svg>
      {[0, 1, 2].map((i) => {
        const reveal = appear(f, 564 + i * 2, 12);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 338 + i * 71,
              top: 172,
              width: 71,
              height: 72,
              overflow: "hidden",
              opacity: reveal,
              transform: `translateY(${(1 - reveal) * 14}px) rotateX(${(1 - reveal) * 95}deg)`,
            }}
          >
            <Img
              src={staticFile("artwork/sds-wordmark.svg")}
              style={{
                position: "absolute",
                left: -i * 71,
                width: 213,
                height: 72,
                clipPath: `inset(0 0 ${(1 - reveal) * 100}% 0)`,
              }}
            />
          </div>
        );
      })}
      <div
        style={{
          position: "absolute",
          left: 342,
          top: 252,
          width: 207,
          overflow: "hidden",
          clipPath: `inset(0 ${(1 - appear(f, 579, 12)) * 100}% 0 0)`,
          fontSize: 11.1,
          lineHeight: "15px",
          letterSpacing: 5.7,
          whiteSpace: "nowrap",
        }}
      >
        SANDYDESIGNSTUDIO
      </div>
    </>
  );
};
