// Generates /workspace/geo-image-prompts.json (painted-art prompts for the parent's image generator).
import { writeFileSync } from 'node:fs';
import { ports, chapters } from '../../web/courses/geography/course.mjs';
const STYLE = 'modern Chinese game-CG semi-realistic 厚涂 (thick-paint) digital painting, smooth painterly Photoshop rendering with subtle brushwork, cinematic lighting with soft rim light, clean simplified uncluttered composition with one clear focal point, polished mobile-game splash-art quality, warm inviting atmosphere for children, NOT oil painting, NOT palette knife, NOT busy or overly detailed, no text, no letters, no logos, no watermark';
const scene = {
  shanghai: 'the Huangpu River at golden hour: the curved riverfront of the Bund with stately stone buildings on the left bank, across the water the Pudong skyline with the Oriental Pearl Tower as the focal point, a small wooden sailing ship gliding on the calm river',
  busan: 'a hillside village of small pastel-coloured houses stepping up a green slope above a deep blue harbour (Gamcheon-style), a few fishing boats below, soft morning light',
  nagasaki: 'a long narrow deep-water bay framed by steep forested green hills, warm lantern lights beginning to glow along the shore at dusk, one sailing ship entering the bay',
  guangzhou: 'the slender twisted lattice tower of Canton Tower rising beside the Pearl River at sunset, subtropical trees and flowering kapok in the foreground, a small boat on the river',
  manila: 'a wide calm bay at sunset with a glowing orange sky reflected on the water, palm silhouettes and the distant cone of a volcano on the horizon, a single outrigger boat',
  jakarta: 'a row of lush green volcanic cones on Java under tropical cumulus clouds, terraced rice paddies in the foreground, a traditional sailing boat on a calm coast',
  singapore: 'futuristic tree-like vertical gardens (Supertree-style) glowing softly at blue hour beside a calm marina, many container ships twinkling far out at sea',
  malacca: 'a quiet historic riverside town square with red-painted colonial buildings and a red clock tower, tropical trees, a small river boat, warm afternoon light',
  colombo: 'emerald tea-plantation terraces wrapping misty green hills in the highlands of Sri Lanka, a winding path, soft morning sunlight breaking through mist',
  male: 'aerial view of a turquoise coral atoll ring and its pale blue lagoon in the Indian Ocean, a tiny island with palms and white sand, deep blue ocean around it',
  goa: 'dramatic monsoon clouds sweeping over the green Western Ghats mountains with waterfalls, a coconut-palm coastline and a whitewashed church in the distance',
  mumbai: 'the monumental basalt arch of the Gateway of India on the waterfront at sunrise, calm Arabian Sea, small boats, soft pastel sky',
  hormuz: 'a surreal coastline of red, ochre and purple mineral rocks and sand beside a calm turquoise strait, bright desert sunlight, one dhow sailing past',
  aden: 'an old port town nestled inside the rim of an extinct dark volcanic crater beside a deep blue gulf, white houses, a wooden dhow at anchor',
  mombasa: 'a giant baobab tree on a coral-stone shore by the Indian Ocean at golden hour, white coral-stone houses in the distance, a lateen-sailed dhow',
  zanzibar: 'a narrow sunlit lane of an old stone town with a single ornately carved wooden door as the focal point, clove branches, warm light',
  capetown: 'flat-topped Table Mountain with a white "tablecloth" cloud spilling over its edge above a harbour city, Atlantic waves, a few African penguins on a rock in the foreground',
  dakar: 'long colourful hand-painted wooden pirogue fishing boats pulled up on a golden beach, Atlantic surf, clear sky',
  laspalmas: 'the volcanic peak of Mount Teide rising above a sea of clouds at sunset, Canary island pines, the Atlantic beyond',
  lisbon: 'the ornate limestone Belém Tower standing at the edge of the wide Tagus river at golden hour, a yellow tram glimpsed on a hill in the background',
  barcelona: 'the soaring organic spires of the Sagrada Família basilica above a Mediterranean city, soft evening light, palm trees',
  venice: 'a gondola gliding along the Grand Canal between pastel palazzi at sunset, reflections on the water, one arched bridge',
  piraeus: 'the white marble Parthenon on the Acropolis hill in warm light, olive trees in the foreground, the blue Aegean visible in the distance',
  istanbul: 'a suspension bridge spanning the Bosphorus strait between two green hilly shores at sunset, silhouettes of domes and minarets on the skyline, a ferry crossing',
  alexandria: 'a sturdy sand-coloured medieval seafront citadel on a promontory where the ancient lighthouse once stood, calm Mediterranean, palm trees',
  london: 'Tower Bridge over the River Thames with its bascules raised, a gentle drizzle clearing to soft light, a small sailing ship passing beneath',
  amsterdam: 'a traditional Dutch windmill beside a calm canal with fields of colourful tulips in rows, bicycles on a small bridge, big soft clouds',
  oslo: 'a deep glacier-carved fjord with steep forested walls and calm mirror water, a small sailing ship, crisp northern light',
  reykjavik: 'a geyser erupting a white steam column on a volcanic plain under green aurora ribbons in a starry night sky',
  newyork: 'the Statue of Liberty holding her torch on her island at sunrise, the Manhattan skyline softly in the distance across the harbour',
  havana: 'a seafront promenade with waves splashing over the sea wall, a pastel classic car, and an old stone fortress lighthouse at the harbour mouth',
  rio: 'Sugarloaf Mountain rising from Guanabara Bay at golden hour, lush green hills, a sweeping beach curve',
  buenosaires: 'brightly painted corrugated-metal houses in a historic port neighbourhood, a couple dancing tango in the cobbled street, warm evening light',
  ushuaia: 'a small red-and-white striped lighthouse on a rocky islet in a windswept channel with snow-capped mountains behind, sea lions on rocks',
  antarctica: 'towering blue-white icebergs in calm polar water with a colony of gentoo penguins on an ice floe, a whale spout in the distance, soft low sun',
  lima: 'dramatic desert sea cliffs above the Pacific under a soft grey coastal overcast, distant snowy Andes peaks breaking through, a llama in the foreground',
  panama: 'a huge canal lock chamber with gates opening as a ship rises inside it, tropical green rainforest around, cinematic perspective',
  sanfrancisco: 'the red-orange Golden Gate Bridge with its towers rising out of soft rolling fog, a sailing ship passing beneath',
  vancouver: 'carved wooden totem poles in a lush cedar forest park with snow-capped coastal mountains and a calm harbour behind',
  honolulu: 'the Diamond Head volcanic crater rising beside a curving sandy beach with turquoise waves and a surfer, palm trees',
  auckland: 'a harbour filled with white sailboats and a grassy volcanic cone hill in the city, soft late-afternoon light',
  sydney: 'the Sydney Opera House with its white sail-like shells on the harbour at golden hour, the steel arch harbour bridge behind'
};
const out = [];
for (const p of ports) {
  if (!scene[p.id]) throw new Error(`no scene for ${p.id}`);
  out.push({ id: `port-${p.id}`, kind: 'port', port: p.id, name: p.name, aspect: '16:9', size: '1280x720', target: `web/public/art/geography/ports/${p.id}.webp`,
    prompt: `${scene[p.id]}. Real recognizable geography of ${p.en}, ${p.country}, era-flexible and historically neutral, respectful, no stereotypes, any people small and secondary, dressed in everyday modern or timeless clothing. ${STYLE}.` });
}
const regionScene = { geo01: 'East Asian seas: misty green islands and a calm sea at dawn, a junk-rigged sailing ship', geo02: 'Southeast Asian tropical straits: emerald islands, rainforest, turquoise water', geo03: 'Indian Ocean under towering monsoon clouds with rain curtains and a sunlit sail', geo04: 'Arabian Sea coast: golden desert dunes meeting a turquoise sea, a dhow', geo05: 'the stormy Cape of Good Hope with dramatic waves and a rocky headland', geo06: 'the Mediterranean: whitewashed island village above deep blue water', geo07: 'North Atlantic: dark sea, fjord cliffs and northern lights', geo08: 'Caribbean and North American coast: palm-lined turquoise water fading to a temperate shore', geo09: 'southern seas: Andes peaks and floating icebergs under a vast sky', geo10: 'the vast blue Pacific with a volcanic island and a far horizon' };
for (const c of chapters) out.push({ id: `region-${c.id}`, kind: 'region-banner', name: c.title, aspect: '16:5', size: '1600x500', target: `web/public/art/geography/regions/${c.id}.webp`, prompt: `Wide panoramic banner, ${regionScene[c.id]}, lots of calm negative space. ${STYLE}.` });
out.push({ id: 'title', kind: 'title', aspect: '16:9', size: '1920x1080', target: 'web/public/art/geography/ui/title.webp', prompt: `Title screen key art: a kid captain standing at the bow of a small sailing ship, looking out over a glowing sea toward a far horizon with a faint globe-like curve and a golden compass motif in the sky, sense of wonder and adventure. ${STYLE}.` });
out.push({ id: 'captain', kind: 'captain', aspect: '3:4', size: '768x1024', target: 'web/public/art/geography/ui/captain.webp', prompt: `Half-body portrait of a cheerful generic kid explorer captain (about 11 years old, gender-neutral look), navy coat with gold buttons, brass spyglass and a rolled sea chart, friendly smile, plain soft gradient background. ${STYLE}.` });
const ships = ['a small single-mast sailing boat (sloop), modest and sturdy', 'a two-masted brigantine with more sails, sleek', 'a grand three-masted full-rigged ship with billowing sails'];
ships.forEach((s, i) => out.push({ id: `ship-${i + 1}`, kind: 'ship', level: i + 1, aspect: '16:9', size: '1280x720', target: `web/public/art/geography/ui/ship-${i + 1}.webp`, prompt: `Clean side view of ${s}, navy hull with gold trim, sailing on calm water, simple soft sky background, consistent design language across three upgrade levels. ${STYLE}.` }));
writeFileSync('/workspace/geo-image-prompts.json', JSON.stringify({ style: STYLE, note: 'Save each image as WebP at the target path (overwrite placeholder), keep the size/aspect.', count: out.length, items: out }, null, 2));
console.log(out.length);
