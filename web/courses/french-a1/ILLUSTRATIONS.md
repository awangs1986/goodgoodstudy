# French illustration layer

French panels use independent PNG assets and a responsive HTML/CSS stage. English continues
using the unchanged shared SVG kit. The French art code does not import that kit.

## Asset contract

Files live under `web/public/art/french-illustrations/`:

- `places/<key>.png`: 12 background scenes, **8:5** aspect ratio (released 960×600;
  minimum 400×250). Keep foreground space for the people and objects described below.
- `characters/<key>.png`: nine recurring people plus `gribouille`, transparent full-body
  sprites. Released 400×600 with consistent framing, feet on the bottom baseline and
  the default person facing right. The renderer mirrors right-hand characters.
- `props/<key>.png`: 58 supported standalone objects, transparent, released 256×256.
  Center the object horizontally and align its bottom to the baseline.

Backgrounds contain no foreground cast or lesson objects. Do not bake speech bubbles,
lesson text, captions, sound effects, readable signage or answers into any asset. These
are not 416 flattened screenshots: each question selects its own layers at runtime.
The manifest is data only, so importing a course does not request all images.

`art-manifest.mjs` is the authoritative key list. Do not reorder `propNames`: order controls
which two objects `propsFor()` selects when several keywords match. All 58 keys remain
supported even though the current 416 question scenes use only 30 of them. In particular,
`teapot` is retained as an explicit prop even though it has no French keyword mapping.

## Composition and text

The logical stage remains 400×250; CSS percentage positions scale it without JavaScript
resizing or a canvas. Render order is background, props, Gribouille, people, speech, burst,
caption. Cast order and count are retained; normal panels allow three people and boss
panels allow two plus Gribouille. Character foot anchor is y=236:

| People | x anchors | Floor prop anchors | Floor scale |
| --- | --- | --- | --- |
| 1 | 110 | (230,222), (310,222), (370,222) | 1.5 |
| 2 | 90,310 | (200,224), (160,230), (244,230) | 1.2 |
| 3 | 70,200,330 | (135,230), (265,230), (380,232) | 1.2 |

In boss panels the second person moves to x=200 and is not mirrored. Gribouille stays at
(330,236), scale .95; Paul retains scale .8. A person at x>200 is otherwise mirrored.
Wall props use (200,120), scale 1.1; sky props use (350,98), scale 1.1, except the pharmacy
sky location (300,126), scale .85. Sky and wall objects do not consume floor slots.

The first person retains `scene.pose` (default `wave`), other people use `stand`; all retain
`scene.mood` (default `happy`). This edition displays the same main standing PNG for each
person, while data attributes preserve that intent. To add a real pose later, publish its
PNG and add `variants: { 'wave:happy': 'lea-wave-happy', wave: 'lea-wave' }` to that person.
The most specific declared variant wins, otherwise the main sprite is used. No speculative
asset URLs or extra pose downloads are emitted.

Speech, captions and bursts are live text, escaped before insertion. Text wraps in HTML
and scales with container query units. The outer stage has the existing image label;
decorative images have empty alt text and the internal layers are hidden from assistive
technology. Listening questions retain the cue `♪ Écoute…`, while transcripts remain
behind the existing assistance control. No question text, answer, scene assignment or ID
is changed by this renderer.

## Loading and deployment

URLs are relative to Vite's `import.meta.env.BASE_URL`, falling back to `./` in direct Node
imports. This supports root hosting, deployment subpaths and the existing relative-base
offline bundle. Files stay in the public directory and are copied by Vite; there is no
remote CDN or network dependency. Every rendered image uses native lazy loading and async
decoding. Hidden question panels and unopened collection pages do not trigger a global
preload; only actual image elements can request their declared assets.

## Verification

- `node --test tests/french-comic.test.mjs tests/english-course.test.mjs tests/new-courses.test.mjs tests/library-save.test.mjs`
  covers scene semantics, all 416 question assignments (a pre-change SHA-256 baseline),
  cast/prop placement, safe text escaping, base paths, listening cues, existing audio,
  old save compatibility and English isolation.
- `node --test tests/french-illustration-assets.test.mjs` requires every declared PNG,
  validates its signature, CRCs, complete IDAT decompression, scanline filters, download budget, background dimensions and alpha
  support for characters/props. It is a file-integrity gate, not a visual-quality review.
- `tests/browser-courses.mjs` now uses French HTML stage selectors, checks visible PNG
  loads and leaves all English SVG selectors unchanged. Run the repository's documented
  build/launcher/browser workflow in an environment that supports it for visual and
  interaction acceptance, including narrow mobile, collection thumbnails and long text.

Implementation-time checks are limited to Node and static inspection where browser/build
execution is unavailable. They do not establish that a browser, build or visual QA passed.

The complete pose/expression audit and representative question IDs are recorded in
`ILLUSTRATION_SEMANTICS.md`. No current question requires an omitted pose variant to
understand or answer it; the decorative visual variation is intentionally reduced.
