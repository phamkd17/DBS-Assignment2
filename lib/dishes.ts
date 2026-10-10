export type Course = "Starter" | "Main" | "Dessert";

export type Dish = {
  id: string;
  name: string;
  course: Course;
  tags: string[];
  description: string;
  image: { src: string; w: number; h: number; alt: string };
  firstMade: number;
  favorite?: boolean;
};

// Names are based on the owner's photos; confirm or correct them before the site launches.
const img = (file: string, alt: string, w = 1013, h = 1350) => ({
  src: `/mood-boards/candlelit-table/${file}`,
  w,
  h,
  alt,
});

export const dishes: Dish[] = [
  {
    id: "baked-oysters",
    name: "Baked oysters, garlic butter",
    course: "Starter",
    tags: ["Seafood"],
    description: "Bubbling under breadcrumbs and herbs. Squeeze of lemon optional.",
    image: img("05.jpg", "Baked oysters arranged around a scoop of butter"),
    firstMade: 2021,
    favorite: true,
  },
  {
    id: "roasted-beets",
    name: "Roasted beets, endive, dill",
    course: "Starter",
    tags: ["Vegetarian"],
    description: "Sweet, earthy beets with crisp endive and a little yogurt.",
    image: img("19.jpg", "Roasted beets with endive and dill"),
    firstMade: 2023,
  },
  {
    id: "squash-pear",
    name: "Roasted squash and pear",
    course: "Starter",
    tags: ["Vegetarian", "In season"],
    description: "Caramelized edges, blackberry, and toasted seeds.",
    image: img("16.jpg", "Roasted squash and pear on a sage-green plate"),
    firstMade: 2022,
  },
  {
    id: "farfalle",
    name: "Farfalle, herbs & parmesan",
    course: "Main",
    tags: ["Vegetarian", "Pasta"],
    description: "Butter, garden herbs, chili flakes, and plenty of parmesan.",
    image: { src: "/mood-boards/candlelit-table/card.jpg", w: 750, h: 1000, alt: "Farfalle with herbs and shaved parmesan" },
    firstMade: 2021,
    favorite: true,
  },
  {
    id: "seared-salmon",
    name: "Seared salmon, herb sauce",
    course: "Main",
    tags: ["Seafood"],
    description: "Crisp skin over a bright green herb sauce, with asparagus.",
    image: img("12.jpg", "Seared salmon over herb sauce with asparagus"),
    firstMade: 2022,
  },
  {
    id: "squid-ink",
    name: "Squid-ink noodles, white fish",
    course: "Main",
    tags: ["Seafood", "Pasta"],
    description: "Black noodles in a rich broth, topped with pan-roasted fish.",
    image: img("14.jpg", "Fish over squid-ink noodles in broth"),
    firstMade: 2022,
  },
  {
    id: "saffron-rice",
    name: "Saffron rice and kebabs",
    course: "Main",
    tags: ["In season"],
    description: "Fluffy saffron rice with charred chicken and beef kebabs.",
    image: img("23.jpg", "Saffron rice with grilled kebabs"),
    firstMade: 2023,
  },
  {
    id: "creme-caramel",
    name: "Crème caramel",
    course: "Dessert",
    tags: ["Sweet"],
    description: "Silky custard under a pool of dark caramel.",
    image: img("01.jpg", "Crème caramel on a navy-rimmed plate", 1012, 1350),
    firstMade: 2021,
    favorite: true,
  },
  {
    id: "three-tarts",
    name: "Three little tarts",
    course: "Dessert",
    tags: ["Sweet", "Contains nuts"],
    description: "Pecan, berry lattice, and a savory mushroom one for the brave.",
    image: img("15.jpg", "Three tarts: nut, lattice, and mushroom"),
    firstMade: 2022,
  },
];
