"use client";

import { useState } from "react";
import { pizzaNight as event, tastes, type Category, type Ingredient, type Taste } from "@/lib/events";

// Shared bring → learn → build state, used by every design system so they behave the same
// and differ only in styling.

export const howItWorks: [string, string][] = [
  ["I pick a theme.", "Tonight it’s pizza, so I make the dough and tomato sauce."],
  ["You bring three ingredients.", "Claim them here so we don’t double up."],
  ["It all goes in the pool.", "Everyone can use anything anyone brought."],
  ["I show you why it works.", "A few bits of food science, so you know what makes a pizza great."],
  ["You build your creation.", "Mix and match. No two plates come out the same."],
];

const allIngredients = [...event.pool, ...event.ideas];
export const ingredientName = (id: string) => allIngredients.find((i) => i.id === id)?.name ?? id;

/** A gentle, never-judging nudge based on the tastes on the plate. */
export function balanceNote(count: Record<Taste, number>) {
  if (count.Salty === 0) return "Nothing salty yet. A salty cheese, olives, or cured meat would wake it up.";
  if (count.Sweet >= 2 && count.Heat === 0) return "Sweet with no heat. A little spice would play against it.";
  if (count.Rich >= 3 && count.Acid + count.Heat <= 1) return "That's a rich one. Something sharp or spicy keeps every bite interesting.";
  return "Nicely balanced. It's yours, so trust your palate.";
}

export function usePotluck() {
  const [bringing, setBringing] = useState<string[]>(["burrata", "arugula"]);
  const [confirmed, setConfirmed] = useState(false);
  const [ideaTab, setIdeaTab] = useState<Category>("Cheese");
  const [poolFilter, setPoolFilter] = useState<Category | "All">("All");
  const [creation, setCreation] = useState<string[]>(["mozzarella", "basil"]);
  const [showNames, setShowNames] = useState(true);
  const [vegOnly, setVegOnly] = useState(false);
  const [noNuts, setNoNuts] = useState(false);
  const [crust, setCrust] = useState("thin");

  const full = bringing.length >= event.perGuest;
  const mine: Ingredient[] = bringing.map((id) => ({ ...event.ideas.find((i) => i.id === id)!, broughtBy: "You" }));
  const pool: Ingredient[] = [...event.pool, ...mine];
  const fitsDiet = (i: Ingredient) => (!vegOnly || i.vegetarian) && (!noNuts || !i.nuts);
  const visiblePool = pool.filter((i) => (poolFilter === "All" || i.category === poolFilter) && fitsDiet(i));

  const onPizza = pool.filter((i) => creation.includes(i.id) && fitsDiet(i));
  const intoOven = [...event.base, ...onPizza.filter((i) => !i.after).map((i) => i.name)];
  const afterBake = onPizza.filter((i) => i.after).map((i) => i.name);
  const tasteCount = Object.fromEntries(tastes.map((t) => [t, 0])) as Record<Taste, number>;
  for (const t of [...event.baseTastes, ...onPizza.flatMap((i) => i.tastes ?? [])]) tasteCount[t]++;

  const toggleBring = (id: string) => {
    setConfirmed(false);
    const wasBringing = bringing.includes(id);
    setBringing((b) => (b.includes(id) ? b.filter((x) => x !== id) : b.length < event.perGuest ? [...b, id] : b));
    if (wasBringing) setCreation((c) => c.filter((x) => x !== id));
  };
  const toggleCreation = (id: string) => setCreation((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]));

  return {
    event,
    bringing,
    full,
    mine,
    pool,
    visiblePool,
    confirmed,
    confirm: () => setConfirmed(true),
    toggleBring,
    ideaTab,
    setIdeaTab,
    poolFilter,
    setPoolFilter,
    creation,
    toggleCreation,
    showNames,
    setShowNames,
    vegOnly,
    setVegOnly,
    noNuts,
    setNoNuts,
    crust,
    setCrust,
    intoOven,
    afterBake,
    tasteCount,
  };
}

export function useLessons() {
  const [current, setCurrent] = useState(0);
  const [seen, setSeen] = useState<string[]>([event.lessons[0].id]);
  const go = (i: number) => {
    setCurrent(i);
    setSeen((s) => (s.includes(event.lessons[i].id) ? s : [...s, event.lessons[i].id]));
  };
  return { lessons: event.lessons, current, lesson: event.lessons[current], seen, go, last: event.lessons.length - 1 };
}
