import Link from "next/link";
import { candlelitTable, lineAndStone, moodBoards, trailhead } from "@/lib/mood-boards";
import { bricolage, fraunces, instrumentSerif } from "@/lib/fonts";

const designSystems = [trailhead, lineAndStone, candlelitTable];
const sampleFont: Record<string, string> = {
  trailhead: `${bricolage.className} font-extrabold`,
  "line-and-stone": instrumentSerif.className,
  "candlelit-table": `${fraunces.className} italic`,
};

export default function Hub() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-16">
      <p className="text-sm text-neutral-600">UI/UX &amp; Visual Design</p>
      <h1 className="mt-1 text-4xl font-semibold tracking-tight">Culinary Showcase</h1>

      <section className="mt-12">
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-600">
          1 · Mood Boards
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-3">
          {moodBoards.map((board) => (
            <li key={board.slug}>
              <Link
                href={`/mood-boards/${board.slug}`}
                className="flex items-center justify-between gap-3 rounded-xl border border-neutral-300 p-4 transition-colors hover:border-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 active:bg-neutral-100"
              >
                <span className="flex">
                  {board.palette.slice(0, 4).map((s) => (
                    <span
                      key={s.hex}
                      className="h-6 w-6 border border-black/10"
                      style={{ background: s.hex }}
                    />
                  ))}
                </span>
                <span className="text-sm font-medium">{board.name} →</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-600">
          2 · Design Systems
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-3">
          {designSystems.map((board) => (
            <li key={board.slug}>
              <Link
                href={`/design-systems/${board.slug}`}
                className="flex items-center justify-between gap-3 rounded-xl border border-neutral-300 p-4 transition-colors hover:border-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 active:bg-neutral-100"
              >
                <span className="flex items-center gap-2">
                  <span className={`${sampleFont[board.slug]} text-3xl leading-none`}>Aa</span>
                  <span className="flex">
                    {board.palette.slice(3, 7).map((s) => (
                      <span key={s.hex} className="h-6 w-3" style={{ background: s.hex }} />
                    ))}
                  </span>
                </span>
                <span className="text-sm font-medium">{board.name} →</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
