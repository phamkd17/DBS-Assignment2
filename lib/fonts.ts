import { Bricolage_Grotesque, Figtree, Fraunces, Instrument_Sans, Instrument_Serif, Jost } from "next/font/google";

// Line & Stone type: exposed as CSS variables so Tailwind's font-ls-serif / font-ls-sans work.
export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
});

export const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
});

export const lineAndStoneFonts = `${instrumentSerif.variable} ${jost.variable}`;

// Trailhead type
export const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  variable: "--font-bricolage",
});

export const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-instrument-sans",
});

export const trailheadFonts = `${bricolage.variable} ${instrumentSans.variable}`;

// Candlelit Table type
export const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
  variable: "--font-fraunces",
});

export const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-figtree",
});

export const candlelitFonts = `${fraunces.variable} ${figtree.variable}`;
