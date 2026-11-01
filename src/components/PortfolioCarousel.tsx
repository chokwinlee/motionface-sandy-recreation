import { Img, staticFile, useCurrentFrame } from "remotion";
import { SCENES, value } from "../timing";

// The thumbnails are small, perspective-rectified artwork samples, never video
// frames placed over the composition. Every card is its own transformed plane.
const cards = [
  "newspaper",
  "lotus",
  "crest",
  "watercolor",
  "consistency",
  "portrait",
  "icecream",
  "car",
];

export const PortfolioCarousel: React.FC = () => {
  const f = useCurrentFrame() + SCENES.carousel.from;
  const active = value(
    f,
    [377, 390, 410, 420, 438, 455, 475, 487, 497],
    [-0.6, 0.35, 0.8, 1.15, 1.98, 2.88, 4.02, 4.77, 5.3],
  );
  const angleStep = 360 / cards.length;
  const radius = 260;
  const entryY = value(f, [377, 389, 400], [385, 42, 0], true);
  const exitY = value(f, [483, 498], [0, -390]);
  const tilt = value(f, [377, 394, 488, 498], [20, 0, 0, -9]);
  const scale = value(f, [377, 389, 400], [0.9, 1, 1], true);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        perspective: 2000,
        perspectiveOrigin: "50% 50%",
        opacity: value(f, [377, 381, 496, 500], [0, 1, 1, 0]),
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 368,
          top: 207 + entryY + exitY,
          width: 0,
          height: 0,
          transformStyle: "preserve-3d",
          transform: `scale(${scale}) rotateZ(${tilt}deg) rotateX(-3deg) translateZ(${-radius}px)`,
        }}
      >
        {cards.map((card, index) => {
          const angle = (index - active) * angleStep;
          return (
            <div
              key={card}
              style={{
                position: "absolute",
                left: -84,
                top: -108,
                width: 168,
                height: 216,
                transformStyle: "preserve-3d",
                transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: 18,
                  background: "#20252e",
                  transform: "translateZ(-1px)",
                  backfaceVisibility: "hidden",
                  boxShadow: "1px 0 0 #c5c6bd, 2px 0 0 #2a2b30",
                }}
              />
              <Img
                src={staticFile(
                  `artwork/${card === "newspaper" && f < 400 ? "newspaper-bw" : card === "lotus" && f > 414 ? "red" : card}.webp`,
                )}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 17,
                  objectFit: "cover",
                  backfaceVisibility: "visible",
                  transform: "translateZ(0.1px)",
                }}
              />
              {card === "crest" ? (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 17,
                    background: "#120034",
                    mixBlendMode: "screen",
                    opacity: value(f, [442, 451], [0, 1]),
                    transform: "translateZ(0.2px)",
                  }}
                />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};
