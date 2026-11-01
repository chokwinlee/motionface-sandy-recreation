import { Composition } from "remotion";
import { SandyRecreation } from "./SandyRecreation";
import { VIDEO } from "./timing";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="SandyRecreation"
        component={SandyRecreation}
        {...VIDEO}
      />
      <Composition
        id="SandyRecreationHD"
        component={SandyRecreation}
        {...VIDEO}
        width={1920}
        height={1080}
      />
    </>
  );
};
