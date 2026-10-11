// Authoring helper for per-lesson teach text. Paragraphs are separated by "|".
// Text is trusted, bundled HTML (only <code>, <b>, <i>, &lt; entities are used).
export const r = String.raw;
export const T = (teach, example, hints) => ({
  teach: teach.split('|').map(paragraph => `<p>${paragraph.trim()}</p>`).join(''),
  example,
  ...(hints ? { hints } : {})
});
