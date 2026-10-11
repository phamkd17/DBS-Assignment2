import type { Metadata } from "next";
import Link from "next/link";
import { moodBoards } from "@/lib/mood-boards";
import { bricolage, fraunces, instrumentSerif } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "The Phamtastic Food Lab · Project hub",
  description: "Mood boards, design systems, and the site for The Phamtastic Food Lab.",
};

// The hub is intentionally neutral; only the previews show each style.
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
    font: instrumentSerif.className,
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

const card =
  "group block h-full overflow-hidden rounded-xl border border-neutral-200 bg-white transition hover:border-neutral-400 hover:shadow-sm active:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900";

function SectionHead({ id, n, title, note }: { id: string; n: string; title: string; note: string }) {
  return (
    <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
      <h2 id={id} className="text-lg font-semibold">
        <span className="mr-2 text-neutral-400">{n}</span>
        {title}
      </h2>
      <p className="text-sm text-neutral-500">{note}</p>
    </div>
  );
}

export default function Hub() {
  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-neutral-900">
      <main className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
        <header className="mb-12">
          <p className="text-sm text-neutral-500">Design, Build, Ship · Assignment 2 · UI/UX &amp; Visual Design</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">The Phamtastic Food Lab</h1>
          <p className="mt-3 max-w-2xl text-neutral-600">
            A themed potluck where I provide the base and the food science, and every guest builds their own creation.
            Three mood boards, three design systems, and the finished site.
          </p>
        </header>

        <div className="space-y-12">
          <section aria-labelledby="moods">
            <SectionHead id="moods" n="1" title="Mood boards" note="30 artifacts each, from my own photos" />
            <ul className="grid gap-4 sm:grid-cols-3">
              {moodBoards.map((board) => (
                <li key={board.slug}>
                  <Link href={`/mood-boards/${board.slug}`} className={card}>
                    <span className="flex h-16 border-b border-neutral-200" aria-hidden="true">
                      {board.palette.map((s) => (
                        <span key={s.hex} className="flex-1" style={{ background: s.hex }} />
                      ))}
                    </span>
                    <span className="block p-4">
                      <span className="flex items-center justify-between">
                        <span className="font-medium">{board.name}</span>
                        <span className="text-neutral-400 transition-transform group-hover:translate-x-0.5" aria-hidden>
                          →
                        </span>
                      </span>
                      <span className="mt-1 block text-sm text-neutral-500">{board.keywords.join(" · ")}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="systems">
            <SectionHead id="systems" n="2" title="Design systems" note="One per mood, with every component and state" />
            <ul className="grid gap-4 sm:grid-cols-3">
              {designSystems.map((ds) => (
                <li key={ds.slug}>
                  <Link href={`/design-systems/${ds.slug}`} className={card}>
                    <span className="flex items-end justify-between gap-4 border-b border-neutral-200 px-4 pt-4 pb-3" style={{ background: ds.bg, color: ds.fg }}>
                      <span className={`${ds.font} text-5xl leading-none`}>Aa</span>
                      <span className="flex gap-1" aria-hidden="true">
                        {ds.swatches.map((hex) => (
                          <span key={hex} className="size-5 rounded-full ring-1 ring-black/10" style={{ background: hex }} />
                        ))}
                      </span>
                    </span>
                    <span className="block p-4">
                      <span className="flex items-center justify-between gap-2">
                        <span className="font-medium">{ds.name}</span>
                        {ds.chosen ? (
                          <span className="rounded-full bg-neutral-900 px-2 py-0.5 text-xs font-medium text-white">Used for the site</span>
                        ) : (
                          <span className="text-neutral-400 transition-transform group-hover:translate-x-0.5" aria-hidden>
                            →
                          </span>
                        )}
                      </span>
                      <span className="mt-1 block text-sm text-neutral-500">{ds.note}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="site">
            <SectionHead id="site" n="3" title="Your site" note="Built in Line & Stone" />
            <Link
              href="/phamtastic-lab"
              className="group flex flex-col gap-6 rounded-xl bg-neutral-900 p-6 text-white transition hover:bg-neutral-800 active:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 sm:flex-row sm:items-center sm:justify-between sm:p-8"
            >
              <span>
                <span className="block text-sm text-neutral-400">Next lab · Pizza night</span>
                <span className="mt-1 block text-2xl font-semibold sm:text-3xl">The Phamtastic Food Lab</span>
                <span className="mt-2 block max-w-xl text-neutral-300">
                  Bring your ingredients, learn the food science, and build your own creation.
                </span>
              </span>
              <span className="inline-flex shrink-0 items-center gap-2 self-start rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-neutral-900 transition group-hover:bg-neutral-100 sm:self-auto">
                Open the site
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </span>
            </Link>
          </section>
        </div>
      </main>

      <footer className="border-t border-neutral-200">
        <p className="mx-auto max-w-5xl px-5 py-6 text-sm text-neutral-500 sm:px-8">MPCS 51238 · Design, Build, Ship</p>
      </footer>
    </div>
  );
}
