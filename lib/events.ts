// Potluck model: the host provides a base, each guest brings a few ingredients into a
// shared pool, and everyone builds their own creation from the base + pool.
// Guest names and contributions are placeholders until the owner provides real ones.

export type Category = "Cheese" | "Veg" | "Meat & fish" | "Finish";
export const categories: Category[] = ["Cheese", "Veg", "Meat & fish", "Finish"];

export type Ingredient = {
  id: string;
  name: string;
  category: Category;
  vegetarian: boolean;
  nuts?: boolean;
  broughtBy?: string; // set for ingredients already in the pool
};

export type CulinaryEvent = {
  id: string;
  theme: string;
  date: string;
  time: string;
  base: string[]; // what the host provides
  perGuest: number; // ingredients each guest brings
  guests: string[];
  pool: Ingredient[]; // already claimed by other guests
  ideas: Ingredient[]; // unclaimed suggestions a guest can bring
};

const veg = (id: string, name: string, category: Category, extra: Partial<Ingredient> = {}): Ingredient => ({
  id,
  name,
  category,
  vegetarian: true,
  ...extra,
});
const meat = (id: string, name: string, broughtBy?: string): Ingredient => ({
  id,
  name,
  category: "Meat & fish",
  vegetarian: false,
  broughtBy,
});

export const pizzaNight: CulinaryEvent = {
  id: "pizza-night",
  theme: "Pizza night",
  date: "Saturday, October 18",
  time: "7 pm",
  base: ["Hand-stretched dough", "Tomato sauce"],
  perGuest: 3,
  guests: ["Maya", "Jordan", "Sam", "Priya", "Leo", "You"],
  pool: [
    veg("mozzarella", "Fresh mozzarella", "Cheese", { broughtBy: "Maya" }),
    veg("basil", "Basil", "Finish", { broughtBy: "Maya" }),
    meat("prosciutto", "Prosciutto", "Maya"),
    veg("mushrooms", "Roasted mushrooms", "Veg", { broughtBy: "Jordan" }),
    veg("hot-honey", "Hot honey", "Finish", { broughtBy: "Jordan" }),
    veg("pecorino", "Pecorino", "Cheese", { broughtBy: "Jordan" }),
    veg("red-onion", "Red onion", "Veg", { broughtBy: "Sam" }),
    veg("olives", "Castelvetrano olives", "Veg", { broughtBy: "Sam" }),
  ],
  ideas: [
    veg("burrata", "Burrata", "Cheese"),
    veg("ricotta", "Ricotta", "Cheese"),
    veg("gorgonzola", "Gorgonzola", "Cheese"),
    veg("arugula", "Arugula", "Veg"),
    veg("peppers", "Roasted peppers", "Veg"),
    veg("figs", "Fresh figs", "Veg"),
    meat("soppressata", "Spicy soppressata"),
    meat("anchovies", "Anchovies"),
    meat("sausage", "Fennel sausage"),
    veg("pesto", "Pistachio pesto", "Finish", { nuts: true }),
    veg("chili", "Chili flakes", "Finish"),
    veg("garlic-oil", "Garlic oil", "Finish"),
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
