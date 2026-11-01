# Verification

Validation date: 2026-11-01 (Asia/Singapore).

## Local reconstruction

- `npm run check`: ESLint and TypeScript passed for the final component code.
- `npm run build`: production bundle passed after the final SVG and component changes.
- `npm run render -- --concurrency=4`: all **629** original-size frames rendered and encoded successfully.
- `npm run render:hd -- --concurrency=4`: all **629** HD frames rendered and encoded successfully.
- `npm run verify:render`: H.264 / yuv420p, 736 × 414, 30 fps, 629 decoded frames, 20.966667 s, AAC soundtrack; passed.
- `npm run verify:render -- out/sandy-recreation-1080p.mp4`: H.264 / yuv420p, 1920 × 1080, same duration/frame count and AAC soundtrack; passed.
- Rendered audio decoded successfully; measured mean level approximately **−14.1 dB**. Original audio is audible, not a silent placeholder.
- `npm run poster`: closing lockup rendered at frame 596; the output is included as `docs/preview.png`.
- Visual inspection compared opening typography, icon exchange, service wheel, card orbit, circle choreography, and final lockup with reference keyframes. Corrections addressed word spacing, service-list fade/curvature, card ordering, artwork cropping, and the wordmark's compressed source edges.
- Remotion Studio loaded both compositions. Original-size and HD previews were inspected, timeline seeking and playback worked, audio was enabled, and the Studio error overlay returned `null`. Reloading refreshed an artwork cached by the preview browser.
- No original-video playback component is used. Local raster samples, SVG artwork, fonts, and audio render without reference-URL access.
- Public-file scan found no repository-binding credential, signed COS download URL, or GitHub access token. Generated bundles, rendered videos, and the source reference are excluded from the public source tree.

The visual approximation boundaries are documented in `source-study.md`. The rendering tests establish successful output and preview behavior; they do not imply pixel-perfect identity. npm's scaffold/toolchain audit reported upstream transitive advisories; no forced dependency downgrade was applied, and a zero-advisory audit is not claimed.

Repository publication, fresh-clone checks, and recording binding are recorded below after the corresponding remote operations complete.
