# French illustration semantics audit

The PNG revision was checked against all **416 questions / 156 lessons**. This audit
separates unchanged teaching information from a deliberate reduction in decorative
pose/expression variation. It is not a claim that the old and new pictures are identical.

## What the previous poses encoded

`course.mjs` assigns the first character's pose using only question metadata:

- audio present → `hold`
- otherwise question index modulo three equals two → `point`
- otherwise → `wave`
- exam lesson → `surprised`; other lessons → `happy`

All 416 scenes match that algorithm; there are **zero content-driven exceptions**.
There are 306 wave, 62 point and 48 hold scenes; 336 happy and 80 surprised scenes.
The cross-counts are wave/happy 252, point/happy 48, hold/happy 36,
wave/surprised 54, point/surprised 14, hold/surprised 12. Secondary characters in the
336 non-exam scenes stand; the 80 exam scenes have one protagonist and the antagonist.
No course scene uses worried, sad, seated, standing-up or a semantic gesture field.

The former shared SVG person renderer drew a fixed raised arm, fixed rightward pointing
arm or fixed bent empty arm. Its legs always stood. Props were separately anchored to
floor, wall or sky; they were never attached to a hand. A first-position character was
never mirrored to convey a requested direction.

## Question-level checks

The audit covered prompts, options, accepted answers, explanations, passages, transcripts
and scene data. No current prompt asks the learner to infer an answer from an illustrated
gesture, facial expression or spatial relation between people.

| Category | Representative questions | Finding |
| --- | --- | --- |
| Greeting / farewell | `fr01-v1` (bonjour), `fr01-v3` (write “goodbye”), `fr01-reading` (Léa's final action: Au revoir) | The same old wave served both greeting and farewell; the word or reading supplies the answer. |
| Directions / position | `fr06-extra-12` (devant), `fr06-extra-13` (derrière), `fr06-v3` (à gauche), `fr06-v4` (à droite), `fr-final-review-6` (tournez ___ droite) | Front and behind both had the same rightward point; left and right both had wave. Old gestures did not encode direction. |
| Holding / listening | `fr05-listen` (café and water), `fr06-listen` (which direction after straight ahead), `fr-health-exam-listen` (arm and leg pain) | All 48 audio questions used the same bent empty arm. Audio supplies the answer; no directional/pain-pointing gesture was present. Adding an answer-specific gesture would risk giving away the listening answer. |
| Emotion | `fr01-extra-15` (enchanté), `fr-invite-v4` (désolé), `fr-health-dictation` (Je suis fatigué), `fr-basics-v7` (choose six) | The first three were all happy despite different meanings; the exam item was surprised merely because it was an exam. No emotion-identification question exists. |
| Daily / body actions | `fr04-extra-8` (se lever), `fr-time-v1` (se coucher), `fr-time-v2` (s'habiller), `fr-health-order` (headache) | Old people remained standing and did not perform getting up, sleeping, dressing or indicating pain. |

**Required teaching-semantic pose variants for the current course: 0.** The new main
sprites preserve identity, cast order/count, scale and left/right facing. They intentionally
do not reproduce all decorative arm and mouth variants. Pose/mood data is retained for
future artwork, but metadata is not counted as a rendered action.

## Other invariants and limits

All scene assignments, question IDs, words, answers, audio references and passages are
unchanged; a full pre-change lesson-data SHA-256 regression guards them. PNG props retain
the same keys, count and anchors, and all 12 place keys remain available. Speech and
captions remain live text. Listening displays only the existing `♪ Écoute…` cue, with
transcripts behind the player's assistance control.

If future questions ask learners to identify actions, emotions or directions **from the
picture**, the current generic scene model is insufficient. Add an explicit semantic
scene field and verified corresponding PNG variants before publishing such questions;
index-based pose assignment must not stand in for meaningful illustrations.

This is a source/data and static-art audit. Actual browser layout, image-request timing,
interaction and build checks require the repository's supported runtime environment.
