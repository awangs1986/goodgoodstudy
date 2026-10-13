# English · Comic City Quest — credits and content policy

## Syllabus alignment (原创内容声明)
The unit order follows the grammar and topic sequence of *New Concept English* Books 1–2
(《新概念英语》第一、二册，Longman / 外语教学与研究出版社). **Aligned to the NCE syllabus, original content**:
the original comic route’s lesson titles, dialogues, stories, sentences, vocabulary selections and exercises
were written for Gray Crown. The added life-practice route maps the factual target wordlists described below. No NCE lesson text, dialogue, title, illustration or exercise is reproduced. "New Concept English"
is used only to describe the syllabus the course follows; the course is not affiliated with or endorsed by its
authors or publishers.

本课程仅对齐新概念英语第一、二册的语法与话题顺序，所有课文、对话、标题与练习均为原创。

## Artwork
All illustrations are composed at runtime from the English-specific, hand-authored SVG kit:
`art.mjs` (panel composition and lettering), `comic-places.mjs` (15 locations),
`comic-cast.mjs` (Leo, Mia, Sam, Mr Grant, Grandma Rose, Dr Lin, Ada, Officer Bell,
and the trickster Mr Muddle), and `comic-props.mjs` (53 everyday props).
The original American adventure-comic treatment uses angular ink contours, flat cel shadows,
selective halftone, and a restrained red/blue/gold print palette. It is not based on any franchise.
The 712 question panels, chapter covers, battle scenes, and victory pages are assembled from
these reusable parts. Vocabulary-to-prop rules retain the shared kit's original keyword order.
No raster images, remote artwork, new fonts, or dependencies are required. The shared French
illustrations are unchanged.
Licensed with the project (MIT).

## Audio
`web/public/audio/en/*.mp3` — synthesized speech, see `web/public/audio/en/ATTRIBUTION.txt`.

## Original Book 2 real-life practice

The separate `life-*` modules add 96 original lessons for Chinese middle/high-school learners.
Each lesson maps factual vocabulary and grammar targets to a new real-life setting, explanation,
example sentences, reading and six exercises. The map contains 862 wordlist entries (839 unique
spellings; repeated teaching targets are intentional). Proper names and less common historical
vocabulary receive explicit context rather than being presented as everyday essential words.

References supplied by the user and inspected on 2026-10-11:
- [Scanned Book 2 PDF](https://github.com/sunny10010/English-book-for-study/blob/main/%E6%96%B0%E6%A6%82%E5%BF%B5%E8%8B%B1%E8%AF%AD%E7%AC%AC%E4%BA%8C%E5%86%8C.PDF), 443 PDF pages; SHA-256 `30f1219bd738cfbfea00e8bc8e1b51f752a3eb1d47c87090f0120ded0a203633`.
- [Initial GitBook repository](https://github.com/wenmin92/NCE2/tree/2e1328bcc07fd5e7fe178bba45a74027b0bc1fb3), which has 37 lesson bodies and a 96-entry table of contents; it does not provide bodies for lessons 38–96, complete translations, exercises or media.

No textbook narrative, example sentence, question, title or illustration is reproduced. The PDF,
page images and OCR text are not distributed with this project. `life-syllabus.mjs` is a factual
coverage map, not a copy of the textbook; page references are 1-based PDF pages. Lessons 24, 48,
72 and 96 are usage reviews, not new Key structures sections. The source lists *reward* twice
in lesson 51 (noun/verb); the target list combines those senses into one spelling entry.

The new track uses text-based learning and does not claim to include textbook recordings.
The original 325 offline MP3 files and their attribution are unchanged.

## Lesson-end vocabulary checks

English and French use the original shared `vocabulary-*` components. Small original SVG objects
are displayed only for explicitly supported, concrete noun senses; abstract words use other question
types. These are new drawings, not textbook artwork. Tests draw only on a lesson's taught words or an
explicitly displayed chapter recap. Existing saved completions remain valid.
