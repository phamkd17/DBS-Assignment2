export type Swatch = { name: string; hex: string };
export type Photo = { file: string; w: number; h: number; alt: string };

export type MoodBoard = {
  slug: string;
  name: string;
  keywords: string[];
  summary: string;
  palette: Swatch[];
  photos: Photo[];
};

// Most source photos are 1080x1350 (4:5) or 1013x1350 (3:4); exceptions noted inline.
const tall = (file: string, alt: string, w = 1013, h = 1350): Photo => ({ file, w, h, alt });
const p45 = (file: string, alt: string): Photo => tall(file, alt, 1080, 1350);

export const trailhead: MoodBoard = {
  slug: "trailhead",
  name: "Trailhead",
  keywords: ["Fresh", "Bright", "Adventurous", "High contrast"],
  summary:
    "Saturated color pulled from coastlines, canyons, and rainforest. Bold, loud, and full of energy.",
  palette: [
    { name: "Cloud", hex: "#F7F5EE" },
    { name: "Basalt", hex: "#12181B" },
    { name: "Lagoon", hex: "#0B7F8A" },
    { name: "Fern", hex: "#2F7D32" },
    { name: "Anemone", hex: "#C6E264" },
    { name: "Canyon", hex: "#D9532B" },
    { name: "Sunrise", hex: "#F6B336" },
    { name: "Sky", hex: "#2E7CD6" },
  ],
  photos: [
    tall("01.jpg", "Trail along a red sandstone ridge under a deep blue sky"),
    tall("02.jpg", "River running between towering canyon walls"),
    p45("03.jpg", "Waterfall pouring past a fallen orange log"),
    tall("04.jpg", "Green sea cliffs dropping into white surf"),
    tall("05.jpg", "Sea stacks rising above a turquoise beach"),
    tall("06.jpg", "Purple water lilies among glossy lily pads"),
    p45("07.jpg", "Bright yellow banana slug on the forest floor"),
    p45("08.jpg", "Alpine ridge above evergreen valleys and snowy peaks"),
    p45("09.jpg", "Moss-draped trees in a temperate rainforest"),
    p45("10.jpg", "Neon green sea anemone in a tide pool"),
    tall("11.jpg", "Underwater coral with a red starfish"),
    p45("12.jpg", "Rock towers above a green alpine meadow"),
    { file: "13.jpg", w: 1080, h: 608, alt: "Canyon overlook glowing orange and red" },
    { file: "14.jpg", w: 1080, h: 864, alt: "Waterfall plunging into a deep basalt gorge" },
    { file: "15.jpg", w: 900, h: 1350, alt: "Tall waterfall down a granite cliff" },
    p45("16.jpg", "Small rainbow over a lava-rock tide pool"),
    p45("17.jpg", "Sun bursting over a sea of clouds"),
    p45("18.jpg", "Red volcanic crater slopes at dawn"),
    p45("19.jpg", "Jungle stream and boulders beneath red cliffs"),
    p45("20.jpg", "Jagged coastline glowing pink at sunset"),
    p45("21.jpg", "Aerial view of waterfalls threading through jungle"),
    p45("22.jpg", "Green fluted ridges meeting white surf"),
    { file: "23.jpg", w: 1080, h: 864, alt: "Aerial view of a turquoise bay below mountains" },
  ],
};

export const lineAndStone: MoodBoard = {
  slug: "line-and-stone",
  name: "Line & Stone",
  keywords: ["Artistic", "Geometric", "Textured", "Refined"],
  summary:
    "Arches, colonnades, and long perspectives in stone and plaster. Precise lines, quiet color, one blue accent, nothing in excess.",
  palette: [
    { name: "Plaster", hex: "#F8F6F1" },
    { name: "Limestone", hex: "#ECE7DC" },
    { name: "Stone", hex: "#A8A196" },
    { name: "Slate", hex: "#5E656E" },
    { name: "Ink", hex: "#1C1D1F" },
    { name: "Terracotta", hex: "#A9553A" },
    { name: "Aegean", hex: "#23449A" },
  ],
  photos: [
    tall("01.jpg", "Pink and blue stripes beside a brushed-steel train call button"),
    tall("02.jpg", "Narrow street of tiled facades receding to a vanishing point"),
    tall("03.jpg", "Triumphal arch lit up at blue hour"),
    p45("04.jpg", "Suspension bridge silhouetted against the setting sun"),
    tall("05.jpg", "Barrel-vaulted church nave with rows of pews"),
    tall("06.jpg", "Iron arch bridge spanning a river"),
    tall("07.jpg", "Whitewashed alley with an outlined stone path"),
    tall("08.jpg", "Perforated white sculptural surfaces curving overhead"),
    tall("09.jpg", "Ochre alley lined with green shutters"),
    p45("10.jpg", "White baroque church facade on the water"),
    { file: "11.jpg", w: 1080, h: 864, alt: "Stone bridge reflected in a still river" },
    p45("12.jpg", "Arcaded colonnade and lamp posts at dusk"),
    p45("13.jpg", "Domed basilica in warm evening light"),
    p45("14.jpg", "Canal between terracotta houses"),
    p45("15.jpg", "Byzantine domes above a carved marble facade"),
    p45("16.jpg", "Glass towers framed by autumn leaves"),
    p45("17.jpg", "Ancient temple columns on a rocky outcrop"),
    { file: "18.jpg", w: 900, h: 1350, alt: "White windmill with spoked sails" },
    p45("19.jpg", "Blue domes and white bell towers at sunset"),
    p45("20.jpg", "Whitewashed bell arch overlooking the sea"),
    { file: "21.jpg", w: 900, h: 1350, alt: "Stepped white walls with a blue gate" },
    p45("22.jpg", "Bridge walkway leading toward a lit skyline at night"),
    p45("23.jpg", "Rows of weathered pier pilings in front of a skyline"),
  ],
};

export const candlelitTable: MoodBoard = {
  slug: "candlelit-table",
  name: "Candlelit Table",
  keywords: ["Warm", "Intimate", "Generous", "Golden"],
  summary:
    "Dinner by candlelight: walnut tables, dark stoneware, saffron sauces, and the glow just before the first plate lands.",
  palette: [
    { name: "Espresso", hex: "#1E1510" },
    { name: "Walnut", hex: "#5E3820" },
    { name: "Caramel", hex: "#B5733A" },
    { name: "Saffron", hex: "#E3A73C" },
    { name: "Linen", hex: "#E6D7BE" },
    { name: "Cream", hex: "#F6EEE0" },
    { name: "Claret", hex: "#7A2230" },
    { name: "Herb", hex: "#6E8B45" },
  ],
  photos: [
    { file: "01.jpg", w: 1012, h: 1350, alt: "Crème caramel on a navy-rimmed plate" },
    { file: "02.jpg", w: 1080, h: 810, alt: "Overhead view of pastries on small white plates" },
    p45("03.jpg", "Golden pastry over dressed greens, flowers behind"),
    tall("04.jpg", "Dumplings and mushrooms in a wide white bowl"),
    tall("05.jpg", "Baked oysters arranged around a scoop of butter"),
    tall("06.jpg", "Grilled dessert ringed with saffron sauce"),
    tall("07.jpg", "Soup in a black bowl on a wooden tray"),
    tall("08.jpg", "Spoon bites on a carved wooden board"),
    tall("09.jpg", "Oysters on ice with mignonette"),
    tall("10.jpg", "Chocolate dessert with blood orange and sauce swoosh"),
    tall("11.jpg", "Tomahawk steak, broccolini, and hasselback potato on a board"),
    tall("12.jpg", "Seared salmon over herb sauce with asparagus"),
    tall("13.jpg", "Composed plate with saffron dots on grey stoneware"),
    tall("14.jpg", "Fish over squid-ink noodles in broth"),
    tall("15.jpg", "Three tarts: nut, lattice, and mushroom"),
    tall("16.jpg", "Roasted squash and pear on a sage-green plate"),
    tall("17.jpg", "Octopus with chickpeas beside a candle"),
    tall("18.jpg", "Pumpkin-shaped dessert on a pale plate"),
    tall("19.jpg", "Roasted beets with endive and dill"),
    tall("20.jpg", "Pitcher of sangria with lime and orange wheels"),
    tall("21.jpg", "Dessert flambéed with a blue flame"),
    tall("22.jpg", "Quail-egg starters in coupe glasses by candlelight"),
    tall("23.jpg", "Saffron rice with grilled kebabs"),
  ],
};

export const moodBoards = [trailhead, lineAndStone, candlelitTable];

export const photoSrc = (board: MoodBoard, photo: Photo) =>
  `/mood-boards/${board.slug}/${photo.file}`;
