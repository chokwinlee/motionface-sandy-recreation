# Reference study and implementation handoff

Target: Motionface recording `0b66f6e0-a1a5-457c-a4b2-d903a75df7f5`, titled “by sandydesignstudio”. Goal: an editable Remotion recreation, complete public source repository, and verified recording/repository binding.

## Measurements

- H.264 reference: **736 × 414**, **30 fps**, **629 video frames**, **20.966667 s** of video. The MP4 container is 21.133334 s because its AAC track extends slightly past the last video frame. The composition preserves the actual video-frame count and trims the soundtrack at the end.
- Composition: full-bleed 16:9; center line near y = 207; white type and glyphs against navy, cobalt, and cyan light fields. The sampled top-left background differs by less than 0.4 RGB levels between representative frames, consistent with a static field plus compression noise.
- Typography: neutral grotesk with tight tracking; approximate 40 px body copy, 49 px light service text, 49 px row advance. The original font is not identified; bundled Inter Tight 400/300 provides a portable approximation.
- Motion: short word reveals followed by a held line; small rapidly changing icon groups around “like”; slower first service rows followed by accelerated rolling; constant-orbit perspective cards with a vertical entry/exit; irregular circular logo choreography, a short black-background interval, then the final wordmark hold.

| Reference frames | Observed action | Owning component |
| --- | --- | --- |
| 0–74 | “Creativity is like a game,” writes on; cyan word accents | `KineticType` |
| 75–176 | Words collapse into changing design-tool glyphs around “like” | `KineticType`, `ToolIcon` |
| 171–239 | “and yes, we like to play.” resolves; copy reduces to “to play” and slides left | `KineticType` |
| 234–376 | Curved service list fades in, accelerates, exits | `ServiceWheel` |
| 377–499 | Rounded portfolio cards rotate in perspective and leave vertically | `PortfolioCarousel` |
| 498–575 | Thin ring, thick ring, and disk converge, spin, and form the logo symbol | `LogoFinale` |
| 564–628 | SDS letters resolve, tracked studio name reveals, final lockup holds | `LogoFinale` |

## Decisions and boundaries

Every position, scale, opacity, and reveal is derived from `useCurrentFrame()` and clamped interpolation. CSS keyframe animations, transitions, real-time timers, random values, and network-loaded assets are absent. All foreground typography, icons, wheel, carousel geometry, and circle choreography remain editable.

The background is a still texture from the blank opening frame, not a moving video. Ten small artwork samples supply eight cards, including the newspaper and white/red content changes. They are rectified with homographies recorded in `asset-sampling.json`; the Python extraction script is optional, and assets are already included. The white SDS wordmark is redrawn with smooth SVG paths; circles are native SVG geometry. Audio is the AAC soundtrack remuxed without source metadata.

Fidelity limits: font identification is approximate; the icon changes and wheel timing are reconstructed by inspection; small moving films inside the original cards are represented with sampled artwork. This is a motion reconstruction, not a claim of pixel-identical reproduction. The included verification record distinguishes successful rendering and observed visual checks.

Acceptance: clean install, type/lint check, production bundle, complete render with correct streams/frame count, opening/middle/finale visual inspection, Studio playback/scrub, public GitHub visibility and remote HEAD equality, and matching recording/repository values in the binding API response.
