import { Instrument_Serif, Jost } from "next/font/google";

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
