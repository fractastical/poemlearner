// Collection of classic poems in various languages
import { Poem } from '../types';
import { childrenPoems } from './childrenPoems';

// Original poems array
const originalPoems: Poem[] = [
  // Dutch poems
  {
    id: "vondel-gijsbrecht",
    title: "Gijsbrecht van Aemstel (Opening)",
    author: "Joost van den Vondel",
    year: "1637",
    collection: "Gijsbrecht van Aemstel",
    content: `HEt hemelsche gerecht heeft zich ten lange leste\n
Ontferremt over my, en mijn benaeude veste,\n
En arme burgery; en, op mijn volx gebedt,\n
En dagelijx geschrey, de bange stadt ontzet.\n`,
    translations: {
      "hemelsche": "heavenly",
      "gerecht": "justice",
      "zich": "itself",
      "ten": "at",
      "lange": "long",
      "leste": "last",
      "Ontferremt": "taken pity",
      "over": "over",
      "benaeude": "distressed",
      "veste": "fortress",
      "arme": "poor",
      "burgery": "citizens",
      "volx": "people's",
      "gebedt": "prayer",
      "dagelijx": "daily",
      "geschrey": "crying",
      "bange": "anxious",
      "stadt": "city",
      "ontzet": "relieved"
    },
    language: "dutch"
  },
  {
    id: "hooft-klare",
    title: "Klare, wat heeft er uw hartje verlept",
    author: "P.C. Hooft",
    year: "1610",
    collection: "Gedichten",
    content: `Klare, wat heeft er uw hartje verlept,\n
Dat het de minnelijke vreugde schept\n
In een stil eenzaam leven?\n
Wildy den zoeten tijd,\n
Die 't al verblijdt,\n
Vruchteloos begeven?\n`,
    translations: {
      "Klare": "Clara",
      "wat": "what",
      "heeft": "has",
      "hartje": "little heart",
      "verlept": "wilted",
      "minnelijke": "lovely",
      "vreugde": "joy",
      "schept": "creates",
      "stil": "quiet",
      "eenzaam": "lonely",
      "leven": "life",
      "Wildy": "Will you",
      "zoeten": "sweet",
      "tijd": "time",
      "verblijdt": "delights",
      "Vruchteloos": "fruitlessly",
      "begeven": "abandon"
    },
    language: "dutch"
  },
  {
    id: "bredero-liedt",
    title: "Een Liedt",
    author: "G.A. Bredero",
    year: "1622",
    collection: "Groot Lied-boeck",
    content: `Wat dat de wereld is,\n
Dat weet ick al te wis,\n
Door mijn verdriet:\n
't Is een schijn die bedrieght,\n
't Is een droom die vlieght,\n
't Is niet.\n`,
    translations: {
      "Wat": "What",
      "wereld": "world",
      "weet": "know",
      "al": "all",
      "wis": "certain",
      "Door": "Through",
      "verdriet": "sorrow",
      "schijn": "appearance",
      "bedrieght": "deceives",
      "droom": "dream",
      "vlieght": "flies",
      "niet": "nothing"
    },
    language: "dutch"
  },
  {
    id: "perk-iris",
    title: "Iris",
    author: "Jacques Perk",
    year: "1881",
    collection: "Gedichten",
    content: `Ik ben geboren uit zonnegloren\n
En een vochtige zucht van de zee,\n
Die opgaat in tintelend gloren\n
Van parels en vonken gedwee.\n`,
    translations: {
      "geboren": "born",
      "uit": "from",
      "zonnegloren": "sun's glory",
      "vochtige": "moist",
      "zucht": "sigh",
      "zee": "sea",
      "opgaat": "rises",
      "tintelend": "sparkling",
      "gloren": "glow",
      "parels": "pearls",
      "vonken": "sparks",
      "gedwee": "docile"
    },
    language: "dutch"
  },
  {
    id: "kloos-zee",
    title: "De zee, de zee klotst voort in eindeloze deining",
    author: "Willem Kloos",
    year: "1894",
    collection: "Verzen",
    content: `De zee, de zee klotst voort in eindeloze deining,\n
De zee, waarin mijn ziel zich-zelf weerspiegeld ziet;\n
De zee is als mijn ziel in wezen en verschijning,\n
Zij is een levend schijn en durende verdwijning,\n`,
    translations: {
      "zee": "sea",
      "klotst": "sloshes",
      "voort": "forth",
      "eindeloze": "endless",
      "deining": "swell",
      "waarin": "wherein",
      "ziel": "soul",
      "zich-zelf": "itself",
      "weerspiegeld": "reflected",
      "ziet": "sees",
      "wezen": "being",
      "verschijning": "appearance",
      "levend": "living",
      "schijn": "semblance",
      "durende": "lasting",
      "verdwijning": "disappearance"
    },
    language: "dutch"
  },
  {
    id: "achterberg-sneeuwwitje",
    title: "Sneeuwwitje",
    author: "Gerrit Achterberg",
    year: "1949",
    collection: "Hoonte",
    content: `Sneeuwwitje, het wordt tijd dat je ontwaakt.\n
De prins heeft zich al in het bos begeven.\n
De dwergen zijn naar hun werk vertrokken.\n
De vogels hebben je gebed gestaakt.\n`,
    translations: {
      "Sneeuwwitje": "Snow White",
      "wordt": "becomes",
      "tijd": "time",
      "ontwaakt": "awakens",
      "prins": "prince",
      "heeft": "has",
      "zich": "himself",
      "bos": "forest",
      "begeven": "entered",
      "dwergen": "dwarfs",
      "naar": "to",
      "werk": "work",
      "vertrokken": "departed",
      "vogels": "birds",
      "gebed": "prayer",
      "gestaakt": "ceased"
    },
    language: "dutch"
  },
  {
    id: "herinnering-aan-holland",
    title: "Herinnering aan Holland",
    author: "Hendrik Marsman",
    year: "1936",
    collection: "Verzamelde Gedichten",
    content: `Denkend aan Holland\n
zie ik brede rivieren\n
traag door oneindig\n
laagland gaan\n`,
    translations: {
      "Denkend": "Thinking",
      "brede": "wide",
      "rivieren": "rivers",
      "traag": "slow",
      "door": "through",
      "oneindig": "endless",
      "laagland": "lowland",
      "gaan": "go"
    },
    language: "dutch"
  },
  {
    id: "cats-twee-verkracht",
    title: "Twee verkracht",
    author: "Jacob Cats",
    year: "1618",
    collection: "Sinne- en Minnebeelden",
    content: `Twee tortsen even schoon, van even lanck geschoven,\n
Die worden even veel door haren brant verdooft;\n
Twee herten even groot, van even hooch geboren,\n
Die worden even veel door soete min bekoort.\n`,
    translations: {
      "tortsen": "torches",
      "even": "equally",
      "schoon": "beautiful",
      "lanck": "long",
      "geschoven": "pushed",
      "worden": "become",
      "brant": "fire",
      "verdooft": "dimmed",
      "herten": "hearts",
      "groot": "great",
      "hooch": "high",
      "geboren": "born",
      "soete": "sweet",
      "min": "love",
      "bekoort": "enchanted"
    },
    language: "dutch"
  },
  {
    id: "dullaert-christus",
    title: "Op de Geboorte van Christus",
    author: "Heiman Dullaert",
    year: "1658",
    collection: "Gedichten",
    content: `O Heiligh, heiligh Kind, dat in de kribbe leidt,\n
En met uw needrigheit ons tot uw hoogheit leidt,\n
Wat zyt gy arm en kleen om ons te maecken groot!\n
Wat lijdt gy bitter kouw in uwen eersten noot!\n`,
    translations: {
      "Heiligh": "Holy",
      "Kind": "Child",
      "kribbe": "manger",
      "leidt": "lies",
      "needrigheit": "humility",
      "hoogheit": "highness",
      "zyt": "are",
      "arm": "poor",
      "kleen": "small",
      "maecken": "make",
      "groot": "great",
      "lijdt": "suffer",
      "bitter": "bitter",
      "kouw": "cold",
      "eersten": "first",
      "noot": "need"
    },
    language: "dutch"
  },
  {
    id: "luyken-jezus",
    title: "Jezus en de Ziel",
    author: "Jan Luyken",
    year: "1678",
    collection: "Jesus en de Ziel",
    content: `O Jezus, bron van zaligheid,\n
Die 't harte door uw gunst verblijdt,\n
Wanneer het zich tot U wil geven,\n
Om als een bloempje van uw hof,\n
Te bloeien tot uws naams lof,\n
En door uw zegen te herleven.\n`,
    translations: {
      "bron": "source",
      "zaligheid": "salvation",
      "harte": "heart",
      "gunst": "favor",
      "verblijdt": "delights",
      "zich": "itself",
      "bloempje": "little flower",
      "hof": "garden",
      "bloeien": "bloom",
      "naams": "name's",
      "lof": "praise",
      "zegen": "blessing",
      "herleven": "revive"
    },
    language: "dutch"
  },
  {
    id: "camphuysen-maysche",
    title: "Maysche Morgenstond",
    author: "Dirck Raphaelsz Camphuysen",
    year: "1624",
    collection: "Stichtelycke Rymen",
    content: `De morgenstont verschynt met rozen op de wangen,\n
De dauw besproeit het gras.\n`,
    translations: {
      "morgenstont": "morning",
      "verschynt": "appears",
      "rozen": "roses",
      "wangen": "cheeks",
      "dauw": "dew",
      "besproeit": "sprinkles",
      "gras": "grass"
    },
    language: "dutch"
  },
  {
    id: "starter-dartelavond",
    title: "Dartel Avond-Deuntje",
    author: "Jan Jansz Starter",
    year: "1621",
    collection: "Friesche Lusthof",
    content: `Wanneer de Son zijn Peerden ment,\n
En daelt beneen den Horizont,\n
Dan wort het vrolijk spel bekent,\n
Dan gaet de vreugd eerst in de rondt.\n`,
    translations: {
      "Wanneer": "When",
      "Son": "Sun",
      "Peerden": "Horses",
      "ment": "drives",
      "daelt": "descends",
      "beneen": "below",
      "Horizont": "Horizon",
      "wort": "becomes",
      "vrolijk": "merry",
      "spel": "game",
      "bekent": "known",
      "gaet": "goes",
      "vreugd": "joy",
      "eerst": "first",
      "rondt": "round"
    },
    language: "dutch"
  },
  {
    id: "revius-hij-droech",
    title: "Hij droech onse smerten",
    author: "Jacobus Revius",
    year: "1630",
    collection: "Over-Ysselsche Sangen en Dichten",
    content: `T'en zijn de Joden niet, Heer Jesu, die u cruysten,\n
Noch die verradelijck u togen voort gericht,\n
Noch die versmadelijck u spogen int gesicht,\n
Noch die u knevelden, en stieten u vol puysten,\n`,
    translations: {
      "droech": "bore",
      "smerten": "pains",
      "cruysten": "crucified",
      "verradelijck": "treacherously",
      "togen": "dragged",
      "voort": "before",
      "gericht": "court",
      "versmadelijck": "contemptuously",
      "spogen": "spat",
      "gesicht": "face",
      "knevelden": "bound",
      "stieten": "pushed",
      "puysten": "bruises"
    },
    language: "dutch"
  },
  {
    id: "stalpart-kersnacht",
    title: "Kersnacht",
    author: "Johannes Stalpart van der Wiele",
    year: "1622",
    collection: "Gulde-Jaers Feestdagen",
    content: `O Kersnacht, schooner dan de dagen,\n
Hoe kan Herodes 't licht verdragen,\n
Dat in uw duisternisse blinct,\n
En word geviert en aangebeden?\n`,
    translations: {
      "Kersnacht": "Christmas night",
      "schooner": "more beautiful",
      "dagen": "days",
      "licht": "light",
      "verdragen": "endure",
      "duisternisse": "darkness",
      "blinct": "shines",
      "geviert": "celebrated",
      "aangebeden": "worshipped"
    },
    language: "dutch"
  },
  {
    id: "six-schaduwen",
    title: "Schaduw-verdrijf",
    author: "Jan Six van Chandelier",
    year: "1657",
    collection: "Poësy",
    content: `De schaduwen verdwijnen,\n
Als 't zonnelicht komt schijnen.\n`,
    translations: {
      "schaduwen": "shadows",
      "verdwijnen": "disappear",
      "zonnelicht": "sunlight",
      "komt": "comes",
      "schijnen": "shine"
    },
    language: "dutch"
  },
  {
    id: "westerbaen-zomer",
    title: "Zomer",
    author: "Jacob Westerbaen",
    year: "1644",
    collection: "Gedichten",
    content: `De Somer is gekomen,\n
Het veld staet vol geblomt.\n`,
    translations: {
      "Somer": "Summer",
      "gekomen": "arrived",
      "veld": "field",
      "staet": "stands",
      "geblomt": "flowers"
    },
    language: "dutch"
  },
  {
    id: "huygens-voorhout",
    title: "Voorhout",
    author: "Constantijn Huygens",
    year: "1621",
    collection: "Batava Tempe",
    content: `Hier stond ick eens te kijcken\n
Naer 't rijsen van de Maen.\n`,
    translations: {
      "stond": "stood",
      "eens": "once",
      "kijcken": "look",
      "rijsen": "rising",
      "Maen": "Moon"
    },
    language: "dutch"
  },
  {
    id: "anslo-pest",
    title: "De Pest tot Amsterdam",
    author: "Reyer Anslo",
    year: "1662",
    collection: "Poezy",
    content: `De bleecke Doot, die nu geen pijl gebruyckt noch bogen,\n
Maer met een' enckel sicht de menschen neer kan slaen.\n`,
    translations: {
      "bleecke": "pale",
      "Doot": "Death",
      "pijl": "arrow",
      "gebruyckt": "uses",
      "noch": "nor",
      "bogen": "bows",
      "enckel": "single",
      "sicht": "sight",
      "menschen": "people",
      "neer": "down",
      "slaen": "strike"
    },
    language: "dutch"
  },
  {
    id: "wellekens-herder",
    title: "Herderskout",
    author: "Jan Baptista Wellekens",
    year: "1715",
    collection: "Verscheiden Gedichten",
    content: `De morgenstont verschynt met rozen op de wangen,\n
De dauw besproeit het gras.\n`,
    translations: {
      "morgenstont": "morning",
      "verschynt": "appears",
      "rozen": "roses",
      "wangen": "cheeks",
      "dauw": "dew",
      "besproeit": "sprinkles",
      "gras": "grass"
    },
    language: "dutch"
  },
  {
    id: "moonen-lente",
    title: "Lentezang",
    author: "Arnold Moonen",
    year: "1700",
    collection: "Poëzy",
    content: `De lente komt, de winter wijkt,\n
Het aerdrijk groent en bloeit en prijkt.\n`,
    translations: {
      "lente": "spring",
      "komt": "comes",
      "winter": "winter",
      "wijkt": "retreats",
      "aerdrijk": "earth",
      "groent": "grows green",
      "bloeit": "blooms",
      "prijkt": "shines"
    },
    language: "dutch"
  },
  {
    id: "poot-mei",
    title: "Mei",
    author: "Hubert Korneliszoon Poot",
    year: "1722",
    collection: "Gedichten",
    content: `Hoe lieflijk rolt de Mei\n
Door beemden en valleien!\n`,
    translations: {
      "lieflijk": "lovely",
      "rolt": "rolls",
      "beemden": "meadows",
      "valleien": "valleys"
    },
    language: "dutch"
  },
  {
    id: "antonides-ijstroom",
    title: "De Ystroom",
    author: "Joannes Antonides van der Goes",
    year: "1671",
    collection: "Gedichten",
    content: `De waterstroom, die 't Y wordt van ons volk geheten,\n
Rolt met zijn golven voort.\n`,
    translations: {
      "waterstroom": "waterstream",
      "wordt": "becomes",
      "volk": "people",
      "geheten": "called",
      "golven": "waves",
      "voort": "forth"
    },
    language: "dutch"
  },
  {
    id: "vollenhove-morgenstond",
    title: "Morgenstond",
    author: "Johannes Vollenhove",
    year: "1686",
    collection: "Kruistriomf",
    content: `De morgenstond, met goud gekroond,\n
Heeft al het land met licht verschoond.\n`,
    translations: {
      "morgenstond": "morning",
      "goud": "gold",
      "gekroond": "crowned",
      "land": "land",
      "licht": "light",
      "verschoond": "beautified"
    },
    language: "dutch"
  },
  // German poems
  {
    id: "der-panther",
    title: "Der Panther",
    author: "Rainer Maria Rilke",
    content: `Sein Blick ist vom Vorübergehn der Stäbe\n
so müd geworden, dass er nichts mehr hält\n`,
    translations: {
      "Sein": "His",
      "Blick": "gaze",
      "ist": "is",
      "vom": "from",
      "Vorübergehn": "passing",
      "der": "the",
      "Stäbe": "bars",
      "so": "so",
      "müd": "tired",
      "geworden": "become",
      "dass": "that",
      "er": "he",
      "nichts": "nothing",
      "mehr": "more",
      "hält": "holds"
    },
    language: "german"
  },
  {
    id: "wandrers-nachtlied",
    title: "Wandrers Nachtlied",
    author: "Johann Wolfgang von Goethe",
    content: `Über allen Gipfeln\n
ist Ruh\n`,
    translations: {
      "Über": "Above",
      "allen": "all",
      "Gipfeln": "peaks",
      "ist": "is",
      "Ruh": "peace"
    },
    language: "german"
  },
  {
    id: "graue-nacht",
    title: "Graue Nacht",
    author: "Heinrich Heine",
    year: "1844",
    collection: "Neue Gedichte",
    content: `Graue Nacht liegt auf dem Meere,\nUnd die kleinen Sterne glimmen.\nManchmal tönen in dem Wasser\nLange hingezogne Stimmen.\n`,
    translations: {
      "Graue": "Gray",
      "Nacht": "night",
      "liegt": "lies",
      "auf": "upon",
      "dem": "the",
      "Meere": "sea",
      "kleinen": "small",
      "Sterne": "stars",
      "glimmen": "glimmer",
      "Manchmal": "Sometimes",
      "tönen": "sound",
      "in": "in",
      "Wasser": "water",
      "Lange": "Long",
      "hingezogne": "drawn-out",
      "Stimmen": "voices"
    },
    language: "german"
  },
  // Greek poems
  {
    id: "iliad-1",
    title: "Ἰλιάδος Α",
    author: "Ὅμηρος",
    content: `μῆνιν ἄειδε θεὰ Πηληϊάδεω Ἀχιλῆος\n
οὐλομένην\n`,
    translations: {
      "μῆνιν": "wrath",
      "ἄειδε": "sing",
      "θεὰ": "goddess",
      "Πηληϊάδεω": "of Peleus' son",
      "Ἀχιλῆος": "of Achilles",
      "οὐλομένην": "destructive"
    },
    language: "greek"
  },
  {
    id: "odyssey-1",
    title: "Ὀδύσσεια α",
    author: "Ὅμηρος",
    content: `ἄνδρα μοι ἔννεπε, μοῦσα, πολύτροπον\n`,
    translations: {
      "ἄνδρα": "man",
      "μοι": "to me",
      "ἔννεπε": "tell",
      "μοῦσα": "muse",
      "πολύτροπον": "of many turns"
    },
    language: "greek"
  },
  // Russian poems
  {
    id: "pushkin-winter-evening",
    title: "Зимний вечер",
    author: "Александр Пушкин",
    year: "1825",
    content: `Буря мглою небо кроет,\n
Вихри снежные крутя;\n
То, как зверь, она завоет,\n
То заплачет, как дитя.\n`,
    translations: {
      "Буря": "storm",
      "мглою": "with darkness",
      "небо": "sky",
      "кроет": "covers",
      "Вихри": "whirlwinds",
      "снежные": "snowy",
      "крутя": "spinning",
      "как": "like",
      "зверь": "beast",
      "она": "it",
      "завоет": "will howl",
      "заплачет": "will cry",
      "дитя": "child"
    },
    language: "russian"
  },
  // Italian poems
  {
    id: "dante-inferno",
    title: "Inferno (Canto I)",
    author: "Dante Alighieri",
    year: "1320",
    collection: "La Divina Commedia",
    content: `Nel mezzo del cammin di nostra vita\n
mi ritrovai per una selva oscura,\n
ché la diritta via era smarrita.\n
Ahi quanto a dir qual era è cosa dura\n`,
    translations: {
      "Nel": "in",
      "mezzo": "middle",
      "cammin": "journey",
      "nostra": "our",
      "vita": "life",
      "ritrovai": "found myself",
      "selva": "forest",
      "oscura": "dark",
      "diritta": "straight",
      "via": "way",
      "era": "was",
      "smarrita": "lost",
      "quanto": "how much",
      "dir": "to tell",
      "qual": "what",
      "cosa": "thing",
      "dura": "hard"
    },
    language: "italian"
  }
];

// Combine original poems with children's poems and sort by language
export const poems = [...originalPoems, ...childrenPoems].sort((a, b) => 
  a.language.localeCompare(b.language)
);