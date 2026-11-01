import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

loadFont({
  family: "Inter Tight",
  url: staticFile("fonts/inter-tight-latin-400-normal.woff2"),
  weight: "400",
});
loadFont({
  family: "Inter Tight",
  url: staticFile("fonts/inter-tight-latin-300-normal.woff2"),
  weight: "300",
});

export const fontFamily = '"Inter Tight", sans-serif';
