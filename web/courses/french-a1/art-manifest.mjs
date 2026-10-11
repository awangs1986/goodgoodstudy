// French-only illustration manifest. These are asset keys and semantic rules, not preload requests.
// Keep prop order stable: propsFor uses it when a sentence contains more than one object.
export const cast = {
  lea: { name: 'Léa', sprite: 'lea' },
  hugo: { name: 'Hugo', sprite: 'hugo' },
  marie: { name: 'Marie', sprite: 'marie' },
  luc: { name: 'Luc', sprite: 'luc' },
  camille: { name: 'Camille', sprite: 'camille' },
  zoe: { name: 'Zoé', sprite: 'zoe' },
  ines: { name: 'Inès', sprite: 'ines' },
  paul: { name: 'Paul', sprite: 'paul', scale: .8 },
  anne: { name: 'Anne', sprite: 'anne' }
};
// Optional variants: { 'wave:happy': 'lea-wave-happy', wave: 'lea-wave' }.
// Only declare a variant after its PNG exists. Undeclared poses/moods use the main sprite.
export const villain = { sprite: 'gribouille', scale: .95 };
export const propNames = [
  'umbrella', 'pen', 'book', 'watch', 'coat', 'dress', 'shirt', 'hat', 'shoes', 'bag', 'key',
  'car', 'bus', 'bike', 'train', 'plane', 'ticket', 'phone', 'computer', 'tv', 'camera',
  'letter', 'newspaper', 'cup', 'teapot', 'milk', 'apple', 'bread', 'egg', 'icecream',
  'money', 'gift', 'flower', 'dog', 'cat', 'chair', 'table', 'bed', 'ball', 'guitar',
  'glasses', 'medicine', 'map', 'calendar', 'window', 'house', 'sun', 'rain', 'snow',
  'tree', 'boat', 'police', 'bell', 'croissant', 'baguette', 'fromage', 'clock', 'metroTicket'
];
export const skyProps = new Set(['sun', 'rain', 'snow', 'plane']);
export const wallProps = new Set(['calendar', 'window', 'newspaper', 'clock']);
// Keep weather clear of the pharmacy sign and counter.
export const skySpots = { pharmacie: [300, 126, .85] };

export const keywords = {
  umbrella: 'parapluie|il pleut', pen: 'stylo|crayon|écrire|écris|épeler|l\'alphabet', book: 'livre|lire|lis|roman|devoirs|cahier',
  watch: 'heures?|heure|midi|minuit|et quart|et demie|moins le quart|tôt|tard', coat: 'manteau|il fait froid|froid', dress: 'robe|jupe',
  shirt: 'chemise|t-shirt|vêtements?|taille|s\'habiller', hat: 'chapeau|casquette', shoes: 'chaussures', bag: 'sac|valise',
  key: 'clé|clef|porte', car: 'voiture|taxi', bus: 'bus|autobus', bike: 'vélo', train: 'train|tgv|quai', plane: 'avion|aéroport',
  ticket: 'billet|ticket|réservation', phone: 'téléphone|appeler|portable', computer: 'ordinateur|e-mail|internet', tv: 'télé|télévision|cinéma|film',
  camera: 'photo|appareil', letter: 'lettre|carte postale|adresse|timbre|colis', newspaper: 'journal|magazine', cup: 'café|thé|tasse|boire',
  milk: 'eau|lait|jus|bouteille', apple: 'pomme|fruits?|orange|banane|légumes', bread: 'déjeuner|dîner|petit-déjeuner|manger|repas|riz|poisson|viande',
  egg: 'œufs?|oeufs?|beurre', icecream: 'glace|gâteau|dessert', money: 'euros?|addition|prix|cher|combien|kilo|payer|acheter',
  gift: 'cadeau|anniversaire|fête', flower: 'fleurs?|jardin', dog: 'chien', cat: 'chat', chair: 'chaise|s\'asseoir', table: 'table|bureau',
  bed: 'lit|dormir|se coucher|se lever|fatigué|chambre', ball: 'foot|tennis|sport|ballon|jouer|natation', guitar: 'guitare|musique|chanter|piano|concert',
  glasses: 'lunettes|regarder|voir', medicine: 'médicament|malade|médecin|hôpital|pharmacie|fièvre|gorge|tête|ventre|dos|toux|dents|bras|jambe|main|pied|rendez-vous',
  map: 'gauche|droite|tout droit|rue|où|près de|devant|derrière|plan', calendar: 'lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche|semaine|week-end|demain|hier|aujourd\'hui|janvier|février|mai|juillet|août|mois',
  window: 'fenêtre', house: 'maison|appartement|habiter|habite|cuisine|salon|salle de bains', sun: 'soleil|il fait beau|il fait chaud|chaud|beau',
  rain: 'nuage|vent|orage', snow: 'neige|il neige', tree: 'parc|arbre|campagne', boat: 'bateau|mer|plage|vacances|seine', police: 'police|voleur', bell: 'réveil|cloche',
  croissant: 'croissant|boulangerie', baguette: 'pain|baguette', fromage: 'fromage', clock: 'horloge|pendule', metroTicket: 'métro|station'
};
export const placeLabels = { rue: 'RUE DE PARIS', cafe: 'CAFÉ', boulangerie: 'BOULANGERIE', metro: 'MÉTRO', marche: 'MARCHÉ', gare: 'GARE', pharmacie: 'PHARMACIE', ecole: 'ÉCOLE', appartement: 'APPARTEMENT', jardin: 'JARDIN', poste: 'LA POSTE', seine: 'QUAI DE SEINE' };
// Words in a question's French that move the scene somewhere more specific than its chapter's home place.
export const PLACE_WORDS = [
  ['cafe', /(?<!\p{L})(café|thé|l'addition|serveur|menu)(?!\p{L})/iu], ['boulangerie', /(?<!\p{L})(pain|croissant|baguette|boulangerie)(?!\p{L})/iu],
  ['metro', /(?<!\p{L})(métro|bus|station)(?!\p{L})/iu], ['marche', /(?<!\p{L})(marché|kilo|pommes?|légumes|fromage|fruits?)(?!\p{L})/iu],
  ['gare', /(?<!\p{L})(gare|train|billet|quai|partir|arriver)(?!\p{L})/iu], ['pharmacie', /(?<!\p{L})(pharmacie|médicament|malade|fièvre|médecin|hôpital|toux)(?!\p{L})/iu],
  ['ecole', /(?<!\p{L})(école|étudiante?|professeur|classe|alphabet|épeler)(?!\p{L})/iu], ['appartement', /(?<!\p{L})(maison|chambre|cuisine|salon|salle de bains|appartement|famille)(?!\p{L})/iu],
  ['jardin', /(?<!\p{L})(parc|jardin|tennis|foot|natation|fête)(?!\p{L})/iu], ['poste', /(?<!\p{L})(adresse|lettre|la poste|téléphone)(?!\p{L})/iu]
];
