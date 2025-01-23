import { Poem } from '../types';

// Collection of children's poems in various languages
export const childrenPoems: Poem[] = [
  // Dutch children's poems
  {
    id: "dutch-children-1",
    title: "De Maan",
    author: "Annie M.G. Schmidt",
    year: "1950",
    content: `Daar komt de maan\n
En hij heeft een gouden pet op\n
Hij is de baas van de nacht\n
En hij lacht maar wat\n
Dag maan, dag maan\n
Met je gouden pet op`,
    translations: {
      "maan": "moon",
      "gouden": "golden",
      "pet": "cap",
      "baas": "boss",
      "nacht": "night",
      "lacht": "laughs",
      "dag": "hello/goodbye"
    },
    language: "dutch"
  },
  {
    id: "dutch-children-2",
    title: "Het Lieveheersbeestje",
    author: "Traditional",
    content: `Lieveheersbeestje, vlieg weg\n
Vlieg naar de hemel blauw\n
Vlieg naar de zon zo geel\n
En kom weer gauw`,
    translations: {
      "Lieveheersbeestje": "ladybug",
      "vlieg": "fly",
      "weg": "away",
      "hemel": "heaven/sky",
      "blauw": "blue",
      "zon": "sun",
      "geel": "yellow",
      "kom": "come",
      "weer": "again",
      "gauw": "soon"
    },
    language: "dutch"
  },
  {
    id: "dutch-children-3",
    title: "De Spin Sebastiaan",
    author: "Annie M.G. Schmidt",
    year: "1952",
    content: `Sebastiaan, Sebastiaan,\n
Die had nog nooit een web gedaan.\n
Hij dacht: Dat trekt zich vanzelf wel aan.\n
Kijk, zei de spin Sebastiaan,\n
Dat hoeft niet zo precies te gaan.`,
    translations: {
      "spin": "spider",
      "nog": "yet",
      "nooit": "never",
      "web": "web",
      "gedaan": "done",
      "dacht": "thought",
      "trekt": "pulls",
      "vanzelf": "by itself",
      "aan": "on",
      "kijk": "look",
      "hoeft": "needs",
      "niet": "not",
      "precies": "precise",
      "gaan": "go"
    },
    language: "dutch"
  },
  {
    id: "dutch-children-4",
    title: "Tien Kleine Visjes",
    author: "Traditional",
    content: `Tien kleine visjes die zwommen in de zee.\n
Toen kwam de haai voorbij... toen waren er nog maar negen.\n
Negen kleine visjes die zwommen in de zee.\n
Toen kwam de haai voorbij... toen waren er nog maar acht.`,
    translations: {
      "Tien": "ten",
      "kleine": "little",
      "visjes": "fish",
      "zwommen": "swam",
      "zee": "sea",
      "kwam": "came",
      "haai": "shark",
      "voorbij": "past",
      "waren": "were",
      "nog": "still",
      "maar": "only",
      "negen": "nine",
      "acht": "eight"
    },
    language: "dutch"
  },
  {
    id: "dutch-children-5",
    title: "In De Maneschijn",
    author: "Traditional",
    content: `In de maneschijn, in de maneschijn,\n
Klom ik op een trapje door het raamkozijn.\n
Maar je raadt het niet, maar je raadt het niet,\n
Zo doet een vogel en zo doet een vis.`,
    translations: {
      "maneschijn": "moonshine",
      "klom": "climbed",
      "trapje": "little ladder",
      "raamkozijn": "window frame",
      "raadt": "guess",
      "vogel": "bird",
      "vis": "fish"
    },
    language: "dutch"
  },
  // Russian children's poems
  {
    id: "russian-children-1",
    title: "Мишка",
    author: "Агния Барто",
    year: "1936",
    content: `Уронили мишку на пол,\n
Оторвали мишке лапу.\n
Всё равно его не брошу -\n
Потому что он хороший.`,
    translations: {
      "Уронили": "dropped",
      "мишку": "teddy bear",
      "пол": "floor",
      "Оторвали": "tore off",
      "лапу": "paw",
      "Всё": "all",
      "равно": "same",
      "брошу": "will throw away",
      "Потому": "because",
      "хороший": "good"
    },
    language: "russian"
  },
  {
    id: "russian-children-2",
    title: "Зайка",
    author: "Агния Барто",
    content: `Зайку бросила хозяйка -\n
Под дождем остался зайка.\n
Со скамейки слезть не мог,\n
Весь до ниточки промок.`,
    translations: {
      "Зайку": "bunny",
      "бросила": "abandoned",
      "хозяйка": "owner",
      "дождем": "rain",
      "остался": "remained",
      "скамейки": "bench",
      "слезть": "climb down",
      "мог": "could",
      "Весь": "completely",
      "ниточки": "thread",
      "промок": "got wet"
    },
    language: "russian"
  },
  {
    id: "russian-children-3",
    title: "Наша Таня",
    author: "Агния Барто",
    content: `Наша Таня громко плачет:\n
Уронила в речку мячик.\n
- Тише, Танечка, не плачь:\n
Не утонет в речке мяч.`,
    translations: {
      "Наша": "our",
      "громко": "loudly",
      "плачет": "cries",
      "Уронила": "dropped",
      "речку": "river",
      "мячик": "ball",
      "Тише": "quieter",
      "утонет": "will drown",
      "мяч": "ball"
    },
    language: "russian"
  },
  {
    id: "russian-children-4",
    title: "Бычок",
    author: "Агния Барто",
    content: `Идет бычок, качается,\n
Вздыхает на ходу:\n
- Ох, доска кончается,\n
Сейчас я упаду!`,
    translations: {
      "Идет": "walks",
      "бычок": "little bull",
      "качается": "sways",
      "Вздыхает": "sighs",
      "ходу": "way",
      "доска": "board",
      "кончается": "ends",
      "Сейчас": "now",
      "упаду": "will fall"
    },
    language: "russian"
  },
  {
    id: "russian-children-5",
    title: "Снег",
    author: "Ирина Токмакова",
    content: `Как на горке - снег, снег,\n
И под горкой - снег, снег,\n
И на елке - снег, снег,\n
И под елкой - снег, снег.`,
    translations: {
      "горке": "hill",
      "снег": "snow",
      "под": "under",
      "елке": "fir tree",
      "елкой": "fir tree"
    },
    language: "russian"
  },
  // Italian children's poems
  {
    id: "italian-children-1",
    title: "La Farfallina",
    author: "Traditional",
    content: `Farfallina bella e bianca\n
vola vola mai si stanca\n
gira qua e gira là\n
poi si ferma sopra un fior`,
    translations: {
      "Farfallina": "little butterfly",
      "bella": "beautiful",
      "bianca": "white",
      "vola": "flies",
      "mai": "never",
      "stanca": "tired",
      "gira": "turns",
      "qua": "here",
      "là": "there",
      "ferma": "stops",
      "sopra": "on",
      "fior": "flower"
    },
    language: "italian"
  },
  {
    id: "italian-children-2",
    title: "La Pioggia",
    author: "Traditional",
    content: `Piove piove\n
la gatta non si muove\n
la fiamma traballa\n
la mucca è nella stalla`,
    translations: {
      "Piove": "it rains",
      "gatta": "cat",
      "non": "not",
      "muove": "moves",
      "fiamma": "flame",
      "traballa": "wobbles",
      "mucca": "cow",
      "nella": "in the",
      "stalla": "stable"
    },
    language: "italian"
  },
  {
    id: "italian-children-3",
    title: "L'Arcobaleno",
    author: "Gianni Rodari",
    content: `Dopo la pioggia viene il sereno\n
brilla in cielo l'arcobaleno\n
è come un ponte imbandierato\n
e il sole ci passa festeggiato`,
    translations: {
      "Dopo": "after",
      "pioggia": "rain",
      "viene": "comes",
      "sereno": "clear sky",
      "brilla": "shines",
      "cielo": "sky",
      "arcobaleno": "rainbow",
      "ponte": "bridge",
      "imbandierato": "decorated with flags",
      "sole": "sun",
      "passa": "passes",
      "festeggiato": "celebrated"
    },
    language: "italian"
  },
  {
    id: "italian-children-4",
    title: "Il Gatto",
    author: "Traditional",
    content: `C'è un gatto nel cortile\n
che dorme tutto il dì\n
si sveglia verso sera\n
e va a caccia così`,
    translations: {
      "gatto": "cat",
      "cortile": "courtyard",
      "dorme": "sleeps",
      "tutto": "all",
      "dì": "day",
      "sveglia": "wakes up",
      "verso": "towards",
      "sera": "evening",
      "caccia": "hunting",
      "così": "like this"
    },
    language: "italian"
  },
  {
    id: "italian-children-5",
    title: "La Luna",
    author: "Traditional",
    content: `Luna lunetta\n
faccia tonda e bella\n
illumina la terra\n
e tutta la sera`,
    translations: {
      "Luna": "moon",
      "lunetta": "little moon",
      "faccia": "face",
      "tonda": "round",
      "bella": "beautiful",
      "illumina": "illuminates",
      "terra": "earth",
      "tutta": "all",
      "sera": "evening"
    },
    language: "italian"
  },
  // Spanish children's poems
  {
    id: "spanish-children-1",
    title: "La Plaza Tiene Una Torre",
    author: "Antonio Machado",
    content: `La plaza tiene una torre,\n
la torre tiene un balcón,\n
el balcón tiene una dama,\n
la dama una blanca flor.`,
    translations: {
      "plaza": "square",
      "tiene": "has",
      "torre": "tower",
      "balcón": "balcony",
      "dama": "lady",
      "blanca": "white",
      "flor": "flower"
    },
    language: "spanish"
  },
  {
    id: "spanish-children-2",
    title: "El Lagarto Está Llorando",
    author: "Federico García Lorca",
    content: `El lagarto está llorando.\n
El lagarto y la lagarta\n
con delantalitos blancos.\n
Han perdido sin querer\n
su anillo de desposados.`,
    translations: {
      "lagarto": "lizard",
      "está": "is",
      "llorando": "crying",
      "lagarta": "female lizard",
      "delantalitos": "little aprons",
      "blancos": "white",
      "perdido": "lost",
      "querer": "wanting",
      "anillo": "ring",
      "desposados": "married"
    },
    language: "spanish"
  },
  {
    id: "spanish-children-3",
    title: "La Hormiguita",
    author: "Traditional",
    content: `Una hormiguita chiquita\n
salió a pasear un día,\n
encontró una monedita\n
y un lazo se compraría.`,
    translations: {
      "hormiguita": "little ant",
      "chiquita": "tiny",
      "salió": "went out",
      "pasear": "to walk",
      "día": "day",
      "encontró": "found",
      "monedita": "little coin",
      "lazo": "bow",
      "compraría": "would buy"
    },
    language: "spanish"
  },
  {
    id: "spanish-children-4",
    title: "La Luna",
    author: "Traditional",
    content: `Luna lunera,\n
cascabelera,\n
dime dónde vas\n
tan de mañana.`,
    translations: {
      "Luna": "moon",
      "lunera": "moony",
      "cascabelera": "jingling",
      "dime": "tell me",
      "dónde": "where",
      "vas": "are you going",
      "mañana": "morning"
    },
    language: "spanish"
  },
  {
    id: "spanish-children-5",
    title: "El Caracol",
    author: "Traditional",
    content: `Caracol, col, col,\n
saca tus cuernos al sol,\n
que tu padre y tu madre\n
ya los sacó.`,
    translations: {
      "Caracol": "snail",
      "saca": "take out",
      "cuernos": "horns",
      "sol": "sun",
      "padre": "father",
      "madre": "mother",
      "sacó": "took out"
    },
    language: "spanish"
  },
  // Pablo Neruda's poems
  {
    id: "neruda-septiembre-8",
    title: "Septiembre 8",
    author: "Pablo Neruda",
    year: "1904",
    collection: "Cien sonetos de amor",
    content: `Ya eres mía. Reposa con tu sueño en mi sueño.\n
Amor, dolor, trabajos, deben dormir ahora.\n
Gira la noche sobre sus invisibles ruedas\n
y junto a mí eres pura como el ámbar dormido.`,
    translations: {
      "eres": "are",
      "mía": "mine",
      "Reposa": "rest",
      "sueño": "dream",
      "Amor": "love",
      "dolor": "pain",
      "trabajos": "works",
      "deben": "must",
      "dormir": "sleep",
      "ahora": "now",
      "Gira": "turns",
      "noche": "night",
      "sobre": "over",
      "invisibles": "invisible",
      "ruedas": "wheels",
      "junto": "next to",
      "pura": "pure",
      "como": "like",
      "ámbar": "amber",
      "dormido": "asleep"
    },
    language: "spanish"
  },
  {
    id: "neruda-oda-al-limon",
    title: "Oda al Limón",
    author: "Pablo Neruda",
    year: "1954",
    collection: "Odas elementales",
    content: `De todos los tesoros\n
amarillos\n
el limón\n
es el más concentrado,\n
la copa delicada\n
del ácido sol de la tierra.`,
    translations: {
      "todos": "all",
      "tesoros": "treasures",
      "amarillos": "yellow",
      "limón": "lemon",
      "más": "most",
      "concentrado": "concentrated",
      "copa": "cup",
      "delicada": "delicate",
      "ácido": "acid",
      "sol": "sun",
      "tierra": "earth"
    },
    language: "spanish"
  },
  {
    id: "neruda-soneto-xvii",
    title: "Soneto XVII",
    author: "Pablo Neruda",
    year: "1959",
    collection: "Cien sonetos de amor",
    content: `No te amo como si fueras rosa de sal, topacio\n
o flecha de claveles que propagan el fuego:\n
te amo como se aman ciertas cosas oscuras,\n
secretamente, entre la sombra y el alma.`,
    translations: {
      "amo": "love",
      "como": "as/like",
      "fueras": "were",
      "rosa": "rose",
      "sal": "salt",
      "topacio": "topaz",
      "flecha": "arrow",
      "claveles": "carnations",
      "propagan": "propagate",
      "fuego": "fire",
      "ciertas": "certain",
      "cosas": "things",
      "oscuras": "dark",
      "secretamente": "secretly",
      "entre": "between",
      "sombra": "shadow",
      "alma": "soul"
    },
    language: "spanish"
  }
];