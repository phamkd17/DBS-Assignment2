import type { Metadata } from "next";
import Link from "next/link";
import { moodBoards } from "@/lib/mood-boards";
import { bricolage, fraunces, lineAndStoneFonts } from "@/lib/fonts";
import { label, primary } from "@/components/line-and-stone/styles";

export const metadata: Metadata = {
  title: "The Phamtastic Food Lab · Project hub",
  description: "Mood boards, design systems, and the site for The Phamtastic Food Lab.",
};

// Each design system previewed in its own type and colors.
const designSystems = [
  {
    slug: "trailhead",
    name: "Trailhead",
    note: "Loud, sunny, sticker shadows",
    bg: "#F7F5EE",
    fg: "#12181B",
    font: `${bricolage.className} font-extrabold`,
    swatches: ["#F6B336", "#C6E264", "#0B7F8A", "#D9532B"],
  },
  {
    slug: "line-and-stone",
    name: "Line & Stone",
    note: "Quiet hairlines, one blue",
    bg: "#ECE7DC",
    fg: "#1C1D1F",
    font: "font-ls-serif",
    swatches: ["#1C1D1F", "#23449A", "#A9553A", "#A8A196"],
    chosen: true,
  },
  {
    slug: "candlelit-table",
    name: "Candlelit Table",
    note: "Dark espresso, candle glow",
    bg: "#1E1510",
    fg: "#F6EEE0",
    font: `${fraunces.className} italic`,
    swatches: ["#E3A73C", "#7A2230", "#B5733A", "#E6D7BE"],
  },
];

const cardLink =
  "group block h-full border border-ls-border bg-ls-surface transition-colors hover:border-ls-ink active:bg-ls-bg focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-ls-ink";

function SectionHead({ id, n, title, note }: { id: string; n: string; title: string; note: string }) {
  return (
    <div className="mb-6 grid gap-2 border-t border-ls-ink pt-5 sm:grid-cols-[8rem_1fr] sm:items-baseline">
      <p className={`${label} text-ls-muted`}>{n}</p>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h2 id={id} className="font-ls-serif text-4xl leading-none">
          {title}
        </h2>
        <p className="text-sm text-ls-muted">{note}</p>
      </div>
    </div>
  );
}

function Arcade() {
  return (
    <svg viewBox="0 0 240 40" className="block h-10 w-full" aria-hidden="true" preserveAspectRatio="none">
      {Array.from({ length: 12 }, (_, i) => (
        <path
          key={i}
          d={`M${i * 20 + 3} 40 V22 A7 7 0 0 1 ${i * 20 + 17} 22 V40`}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.6"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}

export default function Hub() {
  return (
    <div className={`${lineAndStoneFonts} min-h-screen bg-ls-bg font-ls-sans text-ls-ink`}>
      <main className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-20">
        <header className="mb-16 sm:mb-24">
          <p className={`${label} text-ls-muted`}>Design, Build, Ship · Assignment 2 · UI/UX &amp; Visual Design</p>
          <h1 className="mt-5 font-ls-serif text-6xl leading-[0.95] sm:text-8xl">
            The Phamtastic
            <br />
            Food <span className="italic">Lab</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ls-muted">
            A themed potluck where I provide the base and the food science, and every guest builds their own creation.
            Three moods, three design systems, and one site.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Link href="/phamtastic-lab" className={primary.live}>
              Open the site →
            </Link>
            <a href="#process" className="text-[15px] underline decoration-ls-rule underline-offset-4 hover:decoration-ls-ink focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-ls-ink">
              See the process
            </a>
          </div>
        </header>

        <div id="process" className="scroll-mt-8 space-y-16 sm:space-y-20">
          <section aria-labelledby="moods">
            <SectionHead id="moods" n="01" title="Mood boards" note="Thirty artifacts each, from my own photos" />
            <ul className="grid gap-4 sm:grid-cols-3">
              {moodBoards.map((board) => (
                <li key={board.slug}>
                  <Link href={`/mood-boards/${board.slug}`} className={cardLink}>
                    <span className="flex h-24 border-b border-ls-border" aria-hidden="true">
                      {board.palette.map((s) => (
                        <span key={s.hex} className="flex-1" style={{ background: s.hex }} />
                      ))}
                    </span>
                    <span className="block p-5">
                      <span className="block font-ls-serif text-[28px] leading-tight group-hover:underline group-hover:underline-offset-4">
                        {board.name}
                      </span>
                      <span className="mt-1 block text-sm text-ls-muted">{board.keywords.join(" · ")}</span>
                      <span className={`${label} mt-4 block`}>View board →</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="systems">
            <SectionHead id="systems" n="02" title="Design systems" note="One for each mood, with every state" />
            <ul className="grid gap-4 sm:grid-cols-3">
              {designSystems.map((ds) => (
                <li key={ds.slug}>
                  <Link href={`/design-systems/${ds.slug}`} className={cardLink}>
                    <span className="flex items-end justify-between gap-4 px-5 pt-5 pb-4" style={{ background: ds.bg, color: ds.fg }}>
                      <span className={`${ds.font} text-7xl leading-none`}>Aa</span>
                      <span className="flex flex-col gap-1" aria-hidden="true">
                        {ds.swatches.map((hex) => (
                          <span key={hex} className="h-3 w-10" style={{ background: hex }} />
                        ))}
                      </span>
                    </span>
                    <span className="block border-t border-ls-border p-5">
                      <span className="flex items-baseline justify-between gap-3">
                        <span className="font-ls-serif text-[28px] leading-tight group-hover:underline group-hover:underline-offset-4">{ds.name}</span>
                        {ds.chosen && (
                          <span className="shrink-0 bg-ls-ink px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-ls-surface">
                            Chosen
                          </span>
                        )}
                      </span>
                      <span className="mt-1 block text-sm text-ls-muted">{ds.note}</span>
                      <span className={`${label} mt-4 block`}>View system →</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="site">
            <SectionHead id="site" n="03" title="The site" note="Built in Line & Stone" />
            <Link
              href="/phamtastic-lab"
              className="group block bg-ls-ink text-ls-surface transition-colors hover:bg-[#2a2b2e] active:bg-black focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-4 focus-visible:outline-ls-ink"
            >
              <span className="block px-6 pt-6 text-ls-surface/40 sm:px-10">
                <Arcade />
              </span>
              <span className="grid gap-8 px-6 pt-6 pb-8 sm:px-10 sm:pb-10 lg:grid-cols-[1fr_auto] lg:items-end">
                <span className="block">
                  <span className={`${label} block text-ls-surface/70`}>Next lab · Pizza night</span>
                  <span className="mt-3 block font-ls-serif text-5xl leading-none sm:text-7xl">
                    Phamtastic Food <span className="italic">Lab</span>
                  </span>
                  <span className="mt-4 block max-w-xl text-base leading-relaxed text-ls-surface/80">
                    Bring your ingredients, learn the food science, and build your own creation from everything on the table.
                  </span>
                </span>
                <span className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ls-surface/80 lg:flex-col lg:text-right">
                  <span>01 Bring</span>
                  <span>02 Learn</span>
                  <span>03 Build</span>
                </span>
              </span>
              <span className="flex items-center justify-between border-t border-ls-surface/20 px-6 py-4 sm:px-10">
                <span className={`${label} text-ls-surface`}>Open the site</span>
                <span aria-hidden className="text-xl transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          </section>
        </div>
      </main>

      <footer className="border-t border-ls-ink">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-3 px-5 py-6 text-sm text-ls-muted sm:px-8">
          <p>The Phamtastic Food Lab · you&rsquo;re the final chef.</p>
          <p>MPCS 51238 · Design, Build, Ship</p>
        </div>
      </footer>
    </div>
  );
}
