import { Audio } from "@remotion/media";
import {
  AbsoluteFill,
  Img,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { KineticType } from "./components/KineticType";
import { ServiceWheel } from "./components/ServiceWheel";
import { PortfolioCarousel } from "./components/PortfolioCarousel";
import { LogoFinale } from "./components/LogoFinale";
import { SCENES, value, VIDEO } from "./timing";
import { fontFamily } from "./fonts";

export const SandyRecreation: React.FC = () => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();
  const scale = width / VIDEO.width;

  return (
    <AbsoluteFill style={{ background: "#01040a", overflow: "hidden" }}>
      <div
        style={{
          width: VIDEO.width,
          height: VIDEO.height,
          position: "absolute",
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          color: "#fff",
          fontFamily,
          WebkitFontSmoothing: "antialiased",
        }}
      >
        <Img
          src={staticFile("artwork/blue-light-field.png")}
          style={{
            position: "absolute",
            width: 736,
            height: 414,
            opacity: value(frame, [530, 538, 559, 575], [1, 0, 0, 1]),
          }}
        />
        <Sequence
          from={SCENES.typography.from}
          durationInFrames={SCENES.typography.duration}
          name="01 · Creativity / tools / play"
        >
          <KineticType />
        </Sequence>
        <Sequence
          from={SCENES.services.from}
          durationInFrames={SCENES.services.duration}
          name="02 · Service wheel"
        >
          <ServiceWheel />
        </Sequence>
        <Sequence
          from={SCENES.carousel.from}
          durationInFrames={SCENES.carousel.duration}
          name="03 · Portfolio orbit"
        >
          <PortfolioCarousel />
        </Sequence>
        <Sequence
          from={SCENES.logo.from}
          durationInFrames={SCENES.logo.duration}
          name="04 · Circle choreography / SDS"
        >
          <LogoFinale />
        </Sequence>
      </div>
      <Audio src={staticFile("audio/reference-soundtrack.m4a")} />
    </AbsoluteFill>
  );
};
