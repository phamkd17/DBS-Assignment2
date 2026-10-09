import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import { Board, Generated, type Theme } from "../_components/board";
import { trailhead as board } from "@/lib/mood-boards";

const display = Bricolage_Grotesque({ subsets: ["latin"], weight: ["500", "800"] });
const body = Instrument_Sans({ subsets: ["latin"] });

export const metadata: Metadata = { title: "Trailhead · Mood Board" };

const c = Object.fromEntries(board.palette.map((s) => [s.name, s.hex]));

const theme: Theme = {
  bg: c.Cloud,
  text: c.Basalt,
  muted: "#4A5357",
  mark: c.Canyon,
  radius: "18px",
  displayClass: display.className,
  bodyClass: body.className,
  titleClass: "text-6xl font-extrabold tracking-tight sm:text-8xl",
};

const generated = {
  1: (
    <Generated theme={theme} style={{ background: c.Basalt }}>
      {board.palette.map((s, i) => (
        <div
          key={s.hex}
          className="flex h-11 items-center justify-between px-4 text-xs font-medium"
          style={{
            background: s.hex,
            color: i === 0 || i === 4 || i === 6 ? c.Basalt : c.Cloud,
          }}
        >
          <span>{s.name}</span>
          <span className="opacity-80">{s.hex}</span>
        </div>
      ))}
    </Generated>
  ),
  5: (
    <Generated theme={theme} className="p-5" style={{ background: c.Canyon, color: c.Cloud }}>
      <p className={`${display.className} text-[7rem] font-extrabold leading-none tracking-tighter`}>
        Aa
      </p>
      <p className="mt-3 text-sm">Bricolage Grotesque · 800</p>
      <p className="text-sm opacity-85">Instrument Sans · 400</p>
    </Generated>
  ),
  9: (
    <Generated theme={theme} className="p-5" style={{ background: c.Lagoon, color: c.Cloud }}>
      <p className="text-xs uppercase tracking-[0.2em] opacity-85">Main · Summer</p>
      <p className={`${display.className} mt-2 text-3xl font-extrabold leading-[1.05]`}>
        Charred corn, lime, and a little fire.
      </p>
      <p className="mt-3 text-sm leading-relaxed opacity-90">
        Cooked straight on the coals, finished with chili butter and cotija.
      </p>
    </Generated>
  ),
  13: (
    <Generated
      theme={theme}
      className="aspect-square"
      style={{
        background: c.Fern,
        backgroundImage: `repeating-radial-gradient(circle at 30% 70%, transparent 0 14px, ${c.Anemone}99 14px 16px), repeating-radial-gradient(circle at 85% 15%, transparent 0 18px, ${c.Anemone}55 18px 19px)`,
      }}
    >
      <span className="absolute bottom-3 left-4 text-xs font-medium" style={{ color: c.Cloud }}>
        Texture · contour lines
      </span>
    </Generated>
  ),
  17: (
    <Generated theme={theme} className="flex flex-col gap-3 bg-white p-5">
      <span
        className="block rounded-full px-5 py-3 text-center text-sm font-semibold"
        style={{ background: c.Sunrise, color: c.Basalt }}
      >
        Pick this dish
      </span>
      <span
        className="block rounded-full border-2 px-5 py-3 text-center text-sm font-semibold"
        style={{ borderColor: c.Basalt, color: c.Basalt }}
      >
        See the menu
      </span>
      <div className="flex flex-wrap gap-2 pt-1">
        {["Starters", "Mains", "Dessert"].map((label, i) => (
          <span
            key={label}
            className="rounded-full border-2 px-3 py-1 text-xs font-semibold"
            style={
              i === 1
                ? { background: c.Anemone, borderColor: c.Anemone, color: c.Basalt }
                : { borderColor: c.Basalt, color: c.Basalt }
            }
          >
            {label}
          </span>
        ))}
      </div>
    </Generated>
  ),
  22: (
    <Generated theme={theme} className="bg-white">
      <div
        className="h-28"
        style={{ background: `linear-gradient(135deg, ${c.Sunrise}, ${c.Canyon})` }}
      />
      <div className="p-4">
        <span
          className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
          style={{ background: c.Anemone, color: c.Basalt }}
        >
          New
        </span>
        <p className={`${display.className} mt-2 text-xl font-extrabold leading-tight`}>
          Grilled peach, burrata, basil
        </p>
        <p className="mt-1 text-sm" style={{ color: "#4A5357" }}>
          Starter · first made July 2025
        </p>
      </div>
    </Generated>
  ),
  26: (
    <Generated
      theme={theme}
      className="flex aspect-[4/5] items-end p-4"
      style={{
        background: `linear-gradient(180deg, ${c.Sky} 0%, ${c.Lagoon} 45%, ${c.Sunrise} 80%, ${c.Canyon} 100%)`,
      }}
    >
      <span className="text-xs font-medium" style={{ color: c.Basalt }}>
        Gradient · sky to canyon
      </span>
    </Generated>
  ),
};

export default function Page() {
  return <Board board={board} theme={theme} generated={generated} />;
}
