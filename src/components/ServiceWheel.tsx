import { useCurrentFrame } from "remotion";
import { SCENES, value } from "../timing";

const services = [
  "Brand Identity",
  "Brand Strategy",
  "Brand Story",
  "Graphic Design",
  "Video Production",
  "Video Editing",
  "Content Strategy",
  "Platform Branding",
  "Growth Marketing",
  "Video Editing",
  "Graphic Design",
  "Video Production",
  "Brand Identity",
  "Brand Story",
  "Graphic Design",
  "Video Production",
  "Video Editing",
  "Content Strategy",
  "Platform Branding",
  "Growth Marketing",
  "Brand Strategy",
  "Brand Story",
  "Graphic Design",
  "Video Production",
];

export const ServiceWheel: React.FC = () => {
  const frame = useCurrentFrame() + SCENES.services.from;
  const scroll = value(
    frame,
    [241, 257, 279, 299, 316, 330, 339, 346, 355, 362, 370, 377],
    [0, 0.05, 1.22, 2.55, 3.25, 4.03, 6.5, 8.35, 10, 12.8, 17.5, 23],
  );
  const exit = value(frame, [368, 376], [1, 0]);

  return (
    <div style={{ opacity: exit }}>
      {frame >= 240 ? (
        <div
          style={{
            position: "absolute",
            left: 103,
            top: 184,
            fontSize: 40,
            lineHeight: "48px",
            letterSpacing: -1.6,
          }}
        >
          to play
        </div>
      ) : null}
      <div
        style={{
          opacity: value(frame, [234, 243, 248, 251], [0, 0.05, 0.7, 1]),
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 251,
            top: 198,
            width: 15,
            height: 15,
            borderRadius: "50%",
            background: "#fff",
            transform: `scale(${value(frame, [367, 375], [1, 0])})`,
          }}
        />
        {services.map((service, i) => {
          const offset = i - scroll;
          const distance = Math.abs(offset);
          const y = 207 + offset * 49;
          if (y < -140 || y > 550) return null;
          return (
            <div
              key={`${i}-${service}`}
              style={{
                position: "absolute",
                left:
                  241 -
                  offset * offset * 1.5 +
                  42 * Math.exp(-6 * offset * offset),
                top: y - 31,
                fontSize: 49,
                lineHeight: "58px",
                fontWeight: 300,
                letterSpacing: -1.9,
                whiteSpace: "nowrap",
                opacity: value(
                  distance,
                  [0, 0.6, 1.2, 4, 7],
                  [1, 0.88, 0.56, 0.48, 0.22],
                ),
                transform: `rotate(${offset * 4.6}deg) scaleX(1.08)`,
                transformOrigin: "left center",
              }}
            >
              {service}
            </div>
          );
        })}
      </div>
    </div>
  );
};
