// Potluck model: the host provides a base, each guest brings a few ingredients into a
// shared pool, and everyone builds their own creation from the base + pool.
// Guest names and contributions are placeholders until the owner provides real ones.

export type Category = "Cheese" | "Veg" | "Meat & fish" | "Finish";
export const categories: Category[] = ["Cheese", "Veg", "Meat & fish", "Finish"];

export type Taste = "Salty" | "Sweet" | "Acid" | "Heat" | "Rich";
export const tastes: Taste[] = ["Salty", "Sweet", "Acid", "Heat", "Rich"];

export type Ingredient = {
  id: string;
  name: string;
  category: Category;
  vegetarian: boolean;
  nuts?: boolean;
  tastes?: Taste[];
  after?: boolean; // goes on after the bake
  broughtBy?: string; // set for ingredients already in the pool
};

// A food-science principle the host teaches before guests build.
export type Lesson = {
  id: string;
  title: string;
  principle: string;
  takeaway: string;
  related: string[]; // ingredient ids this lesson applies to
};

export type CulinaryEvent = {
  id: string;
  theme: string;
  date: string;
  time: string;
  base: string[]; // what the host provides
  baseTastes: Taste[]; // what the base already contributes (tomato sauce: acid, sweet)
  perGuest: number; // ingredients each guest brings
  guests: string[];
  pool: Ingredient[]; // already claimed by other guests
  ideas: Ingredient[]; // unclaimed suggestions a guest can bring
  lessons: Lesson[];
};

const veg = (id: string, name: string, category: Category, extra: Partial<Ingredient> = {}): Ingredient => ({
  id,
  name,
  category,
  vegetarian: true,
  ...extra,
});
const meat = (id: string, name: string, extra: Partial<Ingredient> = {}): Ingredient => ({
  id,
  name,
  category: "Meat & fish",
  vegetarian: false,
  ...extra,
});

export const pizzaNight: CulinaryEvent = {
  id: "pizza-night",
  theme: "Pizza night",
  date: "Saturday, October 18",
  time: "7 pm",
  base: ["Hand-stretched dough", "Tomato sauce"],
  baseTastes: ["Acid", "Sweet"],
  perGuest: 3,
  guests: ["Maya", "Jordan", "Sam", "Priya", "Leo", "You"],
  pool: [
    veg("mozzarella", "Fresh mozzarella", "Cheese", { tastes: ["Rich"], broughtBy: "Maya" }),
    veg("basil", "Basil", "Finish", { after: true, broughtBy: "Maya" }),
    meat("prosciutto", "Prosciutto", { tastes: ["Salty", "Rich"], after: true, broughtBy: "Maya" }),
    veg("mushrooms", "Roasted mushrooms", "Veg", { tastes: ["Rich"], broughtBy: "Jordan" }),
    veg("hot-honey", "Hot honey", "Finish", { tastes: ["Sweet", "Heat"], after: true, broughtBy: "Jordan" }),
    veg("pecorino", "Pecorino", "Cheese", { tastes: ["Salty"], broughtBy: "Jordan" }),
    veg("red-onion", "Red onion", "Veg", { tastes: ["Sweet"], broughtBy: "Sam" }),
    veg("olives", "Castelvetrano olives", "Veg", { tastes: ["Salty", "Acid"], broughtBy: "Sam" }),
  ],
  ideas: [
    veg("burrata", "Burrata", "Cheese", { tastes: ["Rich"], after: true }),
    veg("ricotta", "Ricotta", "Cheese", { tastes: ["Rich"] }),
    veg("gorgonzola", "Gorgonzola", "Cheese", { tastes: ["Salty", "Rich"] }),
    veg("arugula", "Arugula", "Veg", { tastes: ["Heat"], after: true }),
    veg("peppers", "Roasted peppers", "Veg", { tastes: ["Sweet"] }),
    veg("figs", "Fresh figs", "Veg", { tastes: ["Sweet"] }),
    meat("soppressata", "Spicy soppressata", { tastes: ["Salty", "Heat", "Rich"] }),
    meat("anchovies", "Anchovies", { tastes: ["Salty"] }),
    meat("sausage", "Fennel sausage", { tastes: ["Salty", "Rich"] }),
    veg("pesto", "Pistachio pesto", "Finish", { nuts: true, tastes: ["Rich"], after: true }),
    veg("chili", "Chili flakes", "Finish", { tastes: ["Heat"] }),
    veg("garlic-oil", "Garlic oil", "Finish", { tastes: ["Rich"] }),
  ],
  lessons: [
    {
      id: "heat",
      title: "Heat makes the crust",
      principle:
        "A very hot oven and a preheated stone set the bottom of the dough fast, so it puffs and blisters before it has time to dry out.",
      takeaway: "Keep the toppings light so the heat can reach the dough.",
      related: [],
    },
    {
      id: "water",
      title: "Water is the enemy of crisp",
      principle:
        "Wet toppings turn to steam in the oven. That steam soaks into the middle of the pizza, and you get a soggy center instead of a crisp one.",
      takeaway: "Tear and drain fresh mozzarella, go easy on wet toppings, and add burrata after the bake. The mushrooms are pre-roasted for exactly this reason.",
      related: ["mozzarella", "burrata", "mushrooms"],
    },
    {
      id: "balance",
      title: "Balance salt, fat, acid, and heat",
      principle:
        "Rich cheese tastes better next to something salty, something sharp, and a little heat. Sweet ingredients need a counterweight, or every bite tastes the same.",
      takeaway: "Try hot honey with salty prosciutto or pecorino. Olives bring both salt and acid.",
      related: ["hot-honey", "prosciutto", "pecorino", "olives"],
    },
    {
      id: "after",
      title: "Some things go on after",
      principle:
        "Delicate herbs, greens, cured meat, and creamy cheese lose what makes them special in a hot oven. Basil goes black and prosciutto turns tough.",
      takeaway: "Add basil, arugula, burrata, prosciutto, and hot honey once the pizza comes out.",
      related: ["basil", "arugula", "burrata", "prosciutto", "hot-honey"],
    },
  ],
};

// A past creation for the archive card (placeholder until real event history is added).
export const pastCreation = {
  name: "Farfalle, herbs & parmesan",
  event: "Pasta night",
  year: 2021,
  builtBy: "Priya",
  from: ["Farfalle", "Garden herbs", "Chili flakes", "Parmesan"],
  image: { src: "/mood-boards/candlelit-table/card.jpg", w: 750, h: 1000, alt: "Farfalle with herbs and shaved parmesan" },
};

// Past lab nights for the archive. Photos are the owner's; themes, guests, and lessons are
// placeholders until the owner fills in what really happened.
export type Creation = {
  id: string;
  name: string;
  builtBy: string;
  from: string[];
  image: { src: string; w: number; h: number; alt: string };
};

export type PastNight = {
  id: string;
  theme: string;
  date: string;
  lesson: string; // the food-science idea taught that night
  creations: Creation[];
};

const photo = (file: string, alt: string, w = 1013, h = 1350) => ({ src: `/mood-boards/candlelit-table/${file}`, w, h, alt });

export const pastNights: PastNight[] = [
  {
    id: "dessert-night",
    theme: "Dessert night",
    date: "March 2024",
    lesson: "Sugar caramelizes around 340°F. Go darker for bitterness, lighter for sweetness.",
    creations: [
      { id: "creme-caramel", name: "Crème caramel", builtBy: "Leo", from: ["Custard base", "Dark caramel", "Vanilla"], image: photo("01.jpg", "Crème caramel on a navy-rimmed plate", 1012, 1350) },
      { id: "flambe", name: "Flambéed meringue", builtBy: "Maya", from: ["Meringue", "Rum", "Berry sauce"], image: photo("21.jpg", "Dessert flambéed with a blue flame") },
    ],
  },
  {
    id: "seafood-night",
    theme: "Seafood night",
    date: "September 2023",
    lesson: "Fish proteins set gently. Pull it off the heat early and let carryover cooking finish the job.",
    creations: [
      { id: "salmon", name: "Seared salmon, herb sauce", builtBy: "Jordan", from: ["Salmon", "Herb sauce", "Asparagus"], image: photo("12.jpg", "Seared salmon over herb sauce with asparagus") },
      { id: "squid-ink", name: "Squid-ink noodles, white fish", builtBy: "Sam", from: ["Squid-ink noodles", "White fish", "Broth"], image: photo("14.jpg", "Fish over squid-ink noodles in broth") },
    ],
  },
  {
    id: "oyster-night",
    theme: "Oyster night",
    date: "November 2022",
    lesson: "Acid and salt wake up briny flavors. A little mignonette goes a long way.",
    creations: [
      { id: "baked-oysters", name: "Baked oysters, garlic butter", builtBy: "Priya", from: ["Oysters", "Garlic butter", "Breadcrumbs"], image: photo("05.jpg", "Baked oysters arranged around a scoop of butter") },
      { id: "raw-oysters", name: "Oysters, mignonette", builtBy: "You", from: ["Oysters", "Shallot", "Vinegar"], image: photo("09.jpg", "Oysters on ice with mignonette") },
    ],
  },
  {
    id: "pasta-night",
    theme: "Pasta night",
    date: "November 2021",
    lesson: "Starchy pasta water is an emulsifier. It turns butter and cheese into a glossy sauce.",
    creations: [
      { id: "farfalle", name: "Farfalle, herbs & parmesan", builtBy: "Priya", from: ["Farfalle", "Garden herbs", "Chili flakes", "Parmesan"], image: { src: "/mood-boards/candlelit-table/card.jpg", w: 750, h: 1000, alt: "Farfalle with herbs and shaved parmesan" } },
    ],
  },
];
