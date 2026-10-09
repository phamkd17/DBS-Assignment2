import type { Metadata } from "next";
import { Instrument_Serif, Jost } from "next/font/google";
import { Board, Generated, type Theme } from "../_components/board";
import { lineAndStone as board } from "@/lib/mood-boards";

const display = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"] });
const body = Jost({ subsets: ["latin"], weight: ["300", "400", "500"] });

export const metadata: Metadata = { title: "Line & Stone · Mood Board" };

const c = Object.fromEntries(board.palette.map((s) => [s.name, s.hex]));
const hairline = `1px solid ${c.Ink}`;

const theme: Theme = {
  bg: c.Limestone,
  text: c.Ink,
  muted: c.Slate,
  mark: c.Terracotta,
  radius: "0px",
  displayClass: display.className,
  bodyClass: `${body.className} font-light`,
  titleClass: "text-6xl leading-none sm:text-8xl",
};

const label = "text-[11px] font-normal uppercase tracking-[0.22em]";

const generated = {
  1: (
    <Generated theme={theme} className="p-4" style={{ background: c.Plaster, border: hairline }}>
      <div className="grid grid-cols-2 gap-x-3 gap-y-4">
        {board.palette.map((s) => (
          <div key={s.hex}>
            <div className="aspect-square" style={{ background: s.hex, border: hairline }} />
            <p className={`mt-1.5 ${label}`}>{s.name}</p>
            <p className="text-[11px]" style={{ color: c.Slate }}>
              {s.hex}
            </p>
          </div>
        ))}
      </div>
    </Generated>
  ),
  5: (
    <Generated theme={theme} className="px-5 pt-4 pb-5" style={{ background: c.Plaster, border: hairline }}>
      <div className="relative">
        {/* ascender, x-height, and baseline guides */}
        {["18%", "47%", "82%"].map((top) => (
          <div
            key={top}
            className="absolute inset-x-0 h-px"
            style={{ top, background: `${c.Terracotta}80` }}
          />
        ))}
        <p className={`${display.className} text-[8rem] leading-none`}>Aa</p>
      </div>
      <p className={`mt-3 ${label}`}>Instrument Serif · Jost Light</p>
    </Generated>
  ),
  9: (
    <Generated theme={theme} className="p-6" style={{ background: c.Plaster, border: hairline }}>
      <p className={label} style={{ color: c.Slate }}>
        Menu · No. 04
      </p>
      <div className="my-4 h-px" style={{ background: c.Ink }} />
      <p className={`${display.className} text-4xl leading-[1.05]`}>
        Seven courses, <em>one long table.</em>
      </p>
      <p className="mt-4 text-sm leading-relaxed">
        Served slowly, in order, with a pause between each plate.
      </p>
    </Generated>
  ),
  13: (
    <Generated
      theme={theme}
      className="aspect-square"
      style={{
        border: hairline,
        background: c.Limestone,
        backgroundImage: `repeating-linear-gradient(45deg, ${c.Stone} 0 1px, transparent 1px 9px), linear-gradient(${c.Stone}55 1px, transparent 1px), linear-gradient(90deg, ${c.Stone}55 1px, transparent 1px)`,
        backgroundSize: "auto, 36px 36px, 36px 36px",
      }}
    >
      <span className={`absolute bottom-3 left-3 px-1.5 py-0.5 ${label}`} style={{ background: c.Plaster }}>
        Texture · hatch and grid
      </span>
    </Generated>
  ),
  17: (
    <Generated theme={theme} className="flex flex-col gap-3 p-5" style={{ background: c.Plaster, border: hairline }}>
      <span className={`block px-5 py-3 text-center ${label}`} style={{ background: c.Aegean, color: c.Plaster }}>
        Reserve a seat
      </span>
      <span className={`block px-5 py-3 text-center ${label}`} style={{ border: hairline }}>
        View menu
      </span>
      <span className="text-sm underline underline-offset-4">See every dish →</span>
      <div className="mt-1 flex gap-5 border-b" style={{ borderColor: c.Stone }}>
        {["Primi", "Secondi", "Dolci"].map((t, i) => (
          <span
            key={t}
            className={`-mb-px pb-2 ${label}`}
            style={i === 0 ? { borderBottom: `2px solid ${c.Ink}` } : { color: c.Slate }}
          >
            {t}
          </span>
        ))}
      </div>
    </Generated>
  ),
  22: (
    <Generated theme={theme} className="p-6 text-center" style={{ background: c.Plaster, border: hairline }}>
      <p className={label} style={{ color: c.Slate }}>
        II · Primi
      </p>
      <p className={`${display.className} mt-3 text-2xl leading-snug`}>
        Hand-cut tagliatelle, brown butter, sage
      </p>
      <div className="mx-auto my-4 h-px w-10" style={{ background: c.Ink }} />
      <p className="text-sm" style={{ color: c.Slate }}>
        First made October 2023
      </p>
    </Generated>
  ),
  26: (
    <Generated theme={theme} className="p-4" style={{ background: c.Plaster, border: hairline }}>
      <svg viewBox="0 0 240 160" className="block w-full" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <path
            key={i}
            d={`M${10 + i * 56} 150 V70 A26 26 0 0 1 ${62 + i * 56} 70 V150`}
            fill="none"
            stroke={c.Ink}
            strokeWidth="1"
          />
        ))}
        <line x1="4" y1="150" x2="236" y2="150" stroke={c.Ink} strokeWidth="1" />
        <line x1="4" y1="34" x2="236" y2="34" stroke={c.Terracotta} strokeWidth="1" />
      </svg>
      <p className={`mt-2 ${label}`}>Motif · the arcade</p>
    </Generated>
  ),
};

export default function Page() {
  return <Board board={board} theme={theme} generated={generated} />;
}
