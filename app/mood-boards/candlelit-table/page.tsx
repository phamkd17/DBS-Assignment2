import type { Metadata } from "next";
import Image from "next/image";
import { Fraunces, Figtree } from "next/font/google";
import { Board, Generated, type Theme } from "../_components/board";
import { candlelitTable as board, photoSrc } from "@/lib/mood-boards";

const display = Fraunces({ subsets: ["latin"], style: ["normal", "italic"], weight: ["400", "600"] });
const body = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = { title: "Candlelit Table · Mood Board" };

const c = Object.fromEntries(board.palette.map((s) => [s.name, s.hex]));

const theme: Theme = {
  bg: c.Espresso,
  text: c.Cream,
  muted: "#CBB89A",
  mark: c.Saffron,
  radius: "12px",
  displayClass: display.className,
  bodyClass: body.className,
  titleClass: "text-6xl italic sm:text-8xl",
};

const flan = board.photos[0];

const generated = {
  1: (
    <Generated theme={theme} className="p-5" style={{ background: c.Walnut }}>
      <div className="grid grid-cols-4 gap-x-2 gap-y-4">
        {board.palette.map((s) => (
          <div key={s.hex} className="text-center">
            <div
              className="mx-auto aspect-square w-full rounded-full"
              style={{ background: s.hex, boxShadow: `0 0 0 3px ${c.Cream}22` }}
            />
            <p className="mt-1.5 text-[11px]" style={{ color: c.Cream }}>
              {s.name}
            </p>
          </div>
        ))}
      </div>
    </Generated>
  ),
  5: (
    <Generated theme={theme} className="p-5" style={{ background: c.Walnut }}>
      <p className={`${display.className} text-[7.5rem] italic leading-none`} style={{ color: c.Saffron }}>
        Aa
      </p>
      <p className="mt-3 text-sm" style={{ color: c.Cream }}>
        Fraunces Italic · Figtree
      </p>
    </Generated>
  ),
  9: (
    <Generated theme={theme} className="p-6" style={{ background: c.Claret, color: c.Cream }}>
      <p className="text-xs uppercase tracking-[0.2em] opacity-85">Saturday, 8 pm</p>
      <p className={`${display.className} mt-3 text-3xl leading-tight`}>
        Tonight, <em>you&rsquo;re the chef.</em>
      </p>
      <p className="mt-3 text-sm leading-relaxed opacity-90">Pick the dishes you love. I&rsquo;ll cook them.</p>
    </Generated>
  ),
  13: (
    <Generated
      theme={theme}
      className="aspect-square"
      style={{
        background: c.Linen,
        backgroundImage: `repeating-linear-gradient(0deg, ${c.Caramel}33 0 1px, transparent 1px 4px), repeating-linear-gradient(90deg, ${c.Walnut}26 0 1px, transparent 1px 5px)`,
      }}
    >
      <span className="absolute bottom-3 left-4 text-xs font-medium" style={{ color: c.Walnut }}>
        Texture · table linen
      </span>
    </Generated>
  ),
  17: (
    <Generated theme={theme} className="flex flex-col gap-3 p-5" style={{ background: "#2A1E17" }}>
      <span
        className="block rounded-full px-5 py-3 text-center text-sm font-semibold"
        style={{ background: c.Saffron, color: c.Espresso }}
      >
        Add to tonight&rsquo;s menu
      </span>
      <span
        className="block rounded-full border px-5 py-3 text-center text-sm font-semibold"
        style={{ borderColor: c.Linen, color: c.Cream }}
      >
        Maybe next time
      </span>
      <div className="flex flex-wrap gap-2 pt-1">
        {["Starter", "Main", "Dessert"].map((t, i) => (
          <span
            key={t}
            className="rounded-full border px-3 py-1 text-xs font-medium"
            style={
              i === 2
                ? { background: c.Cream, borderColor: c.Cream, color: c.Espresso }
                : { borderColor: `${c.Linen}88`, color: c.Cream }
            }
          >
            {t}
          </span>
        ))}
      </div>
    </Generated>
  ),
  22: (
    <Generated theme={theme} style={{ background: c.Cream, color: c.Espresso }}>
      <Image
        src={photoSrc(board, flan)}
        alt=""
        width={flan.w}
        height={flan.h}
        sizes="(min-width: 1024px) 20vw, 50vw"
        className="block aspect-[4/3] h-auto w-full object-cover"
      />
      <div className="p-4">
        <span
          className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
          style={{ background: c.Herb, color: c.Cream }}
        >
          Guest favorite
        </span>
        <p className={`${display.className} mt-2 text-xl`}>Crème caramel</p>
        <p className="text-sm" style={{ color: c.Walnut }}>
          Dessert · served since 2021
        </p>
      </div>
    </Generated>
  ),
  26: (
    <Generated
      theme={theme}
      className="flex aspect-[4/5] items-end p-4"
      style={{
        background: `radial-gradient(circle at 50% 38%, #FFE7A8 0%, ${c.Saffron} 12%, ${c.Caramel}AA 30%, ${c.Walnut}66 52%, ${c.Espresso} 75%)`,
      }}
    >
      <span className="text-xs font-medium" style={{ color: c.Linen }}>
        Light · candle glow
      </span>
    </Generated>
  ),
};

export default function Page() {
  return <Board board={board} theme={theme} generated={generated} />;
}
