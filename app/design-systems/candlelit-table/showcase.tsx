"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { contrast } from "@/lib/contrast";
import { categories, pastCreation, pizzaNight as event, tastes } from "@/lib/events";
import { balanceNote, howItWorks, ingredientName, useLessons, usePotluck } from "@/lib/use-potluck";
import { controlStates, type ControlState } from "@/components/line-and-stone/styles";
import { card, chip, input, label, link, primary, secondary, tab } from "@/components/candlelit-table/styles";

const BG = "#1E1510";
const SURFACE = "#2A1E17";
const TEXT = "#F6EEE0";

const colorRoles = [
  { role: "Background", token: "ct-bg", hex: BG, name: "Espresso", note: "Page", fg: TEXT, bg: BG, on: "Text on it" },
  { role: "Surface", token: "ct-surface", hex: SURFACE, name: "Roast", note: "Cards and panels", fg: TEXT, bg: SURFACE, on: "Text on it" },
  { role: "Text", token: "ct-text", hex: TEXT, name: "Cream", note: "Body and headings", fg: TEXT, bg: SURFACE, on: "On surface" },
  { role: "Muted", token: "ct-muted", hex: "#CBB89A", name: "Toasted linen", note: "Secondary text", fg: "#CBB89A", bg: SURFACE, on: "On surface" },
  { role: "Border", token: "ct-border", hex: "#8C7259", name: "Walnut edge", note: "Control outlines", fg: "#8C7259", bg: SURFACE, on: "On surface · 3:1 min", min: 3 },
  { role: "Accent", token: "ct-accent", hex: "#E3A73C", name: "Saffron", note: "Primary action only", fg: BG, bg: "#E3A73C", on: "Espresso label" },
  { role: "Selected", token: "ct-selected", hex: "#7A2230", name: "Claret", note: "Chosen chips, toggles", fg: TEXT, bg: "#7A2230", on: "Cream label" },
  { role: "Error", token: "ct-error", hex: "#E58A7A", name: "Rose", note: "Problems, invalid fields", fg: "#E58A7A", bg: SURFACE, on: "On surface" },
  { role: "Success", token: "ct-success", hex: "#9DB86A", name: "Herb", note: "Confirmations", fg: "#9DB86A", bg: SURFACE, on: "On surface" },
];

const typeRoles = [
  { role: "Display", spec: "Fraunces Italic · 400 · 64/68", className: "font-ct-serif text-5xl italic leading-[1.05] sm:text-[64px]", sample: "Your creation, your rules." },
  { role: "Heading", spec: "Fraunces · 500 · 30/36", className: "font-ct-serif text-[30px] font-medium leading-[1.2]", sample: "Pizza night, by candlelight" },
  { role: "Body", spec: "Figtree · 400 · 16/26", className: "font-ct-sans text-base leading-relaxed text-ct-linen", sample: "I’ll make the dough and sauce. You bring three toppings. Then build whatever you like from everything on the table." },
  { role: "Label", spec: "Figtree · 600 · 11/16 · caps, +0.18em", className: `${label} text-ct-muted`, sample: "You’re bringing · 2 of 3" },
];

const spacing = [4, 8, 12, 16, 24, 32, 48, 64];

function Section({ n, title, children, id }: { n: string; title: string; children: ReactNode; id?: string }) {
  return (
    <section id={id} className="scroll-mt-6 pb-16">
      <div className="mb-8 flex items-center gap-4">
        <span className={`${label} text-ct-accent`}>{n}</span>
        <h2 className="font-ct-serif text-3xl italic sm:text-4xl">{title}</h2>
        <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-ct-border/60 to-transparent" />
      </div>
      {children}
    </section>
  );
}

function Caption({ children }: { children: ReactNode }) {
  return <p className={`${label} mb-3 text-ct-muted`}>{children}</p>;
}

function Badge({ children, tone = "outline" }: { children: ReactNode; tone?: "outline" | "claret" | "saffron" | "cream" }) {
  const tones = {
    outline: "border border-ct-border text-ct-linen",
    claret: "bg-ct-selected text-ct-text",
    saffron: "bg-ct-accent text-ct-bg",
    cream: "bg-ct-text text-ct-bg",
  };
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-ct-sans text-xs font-semibold ${tones[tone]}`}>{children}</span>;
}

function Toggle({ checked, onChange, labelText }: { checked: boolean; onChange: (v: boolean) => void; labelText: string }) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-3 font-ct-sans text-[15px]">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className="relative h-7 w-12 shrink-0 cursor-pointer rounded-full border border-ct-border bg-ct-raised transition-colors hover:border-ct-linen focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-3 focus-visible:outline-ct-accent aria-checked:border-ct-selected aria-checked:bg-ct-selected"
      >
        <span
          className={`absolute top-1/2 left-1 size-5 -translate-y-1/2 rounded-full transition-[transform,background-color,box-shadow] duration-200 ${
            checked ? "translate-x-5 bg-ct-accent shadow-[0_0_10px_rgb(227_167_60/0.7)]" : "bg-ct-muted"
          }`}
        />
      </button>
      {labelText}
    </label>
  );
}

/** Three candles that light as you claim ingredients. */
function Candles({ value, max }: { value: number; max: number }) {
  return (
    <div className="flex items-end gap-3" role="meter" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max} aria-label="Ingredients claimed">
      {Array.from({ length: max }, (_, i) => {
        const lit = i < value;
        return (
          <span key={i} className="flex flex-col items-center" aria-hidden>
            <span className={`h-3 w-2 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] ${lit ? "ct-flicker bg-ct-accent shadow-[0_0_12px_3px_rgb(227_167_60/0.6)]" : "bg-transparent"}`} />
            <span className={`mt-0.5 h-7 w-3.5 rounded-sm ${lit ? "bg-ct-linen" : "bg-ct-hairline"}`} />
          </span>
        );
      })}
    </div>
  );
}

function HowItWorks({ onClose }: { onClose?: () => void }) {
  return (
    <div>
      <div className="flex items-center justify-between border-b border-ct-hairline px-6 py-4">
        <span className={`${label} text-ct-accent`}>How it works</span>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid size-9 cursor-pointer place-items-center rounded-full text-xl leading-none text-ct-linen hover:bg-ct-raised focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-ct-accent"
          >
            ×
          </button>
        )}
      </div>
      <div className="p-6">
        <p className="font-ct-serif text-[30px] italic leading-tight">{event.theme}</p>
        <p className="text-ct-muted">
          {event.date} · {event.time}
        </p>
        <ol className="mt-5 space-y-4">
          {howItWorks.map(([head, rest], i) => (
            <li key={head} className="flex gap-4">
              <span className="font-ct-serif text-2xl italic leading-none text-ct-accent">{i + 1}</span>
              <p className="leading-relaxed text-ct-linen">
                <span className="font-semibold text-ct-text">{head}</span> {rest}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function Lessons({ poolIds }: { poolIds: string[] }) {
  const { lessons, current, lesson, seen, go, last } = useLessons();
  return (
    <div className={`${card} overflow-hidden`}>
      <div className="relative px-6 pt-8 pb-6 text-center sm:px-10">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-24 mx-auto size-72 rounded-full bg-[radial-gradient(circle,rgb(227_167_60/0.22),transparent_65%)]" />
        <p className={`${label} relative text-ct-accent`}>Learn, then build</p>
        <h3 className="relative mt-2 font-ct-serif text-4xl italic">Why it works</h3>
        <div role="tablist" aria-label="Lessons" className="relative mt-5 flex flex-wrap justify-center gap-x-6 gap-y-1">
          {lessons.map((l, i) => (
            <button key={l.id} type="button" role="tab" aria-selected={i === current} onClick={() => go(i)} className={tab.live}>
              <span className="mr-1.5 not-italic text-sm text-ct-muted">{seen.includes(l.id) ? "✓" : i + 1}</span>
              {l.title}
            </button>
          ))}
        </div>
        <p className="relative mt-2 text-sm text-ct-muted">
          {seen.length} of {lessons.length} read
        </p>
      </div>

      <div className="grid border-t border-ct-hairline md:grid-cols-[1fr_20rem]" role="tabpanel" aria-live="polite">
        <div className="p-6 sm:p-8">
          <p className={`${label} text-ct-muted`}>
            Lesson {current + 1} of {lessons.length}
          </p>
          <h4 className="mt-2 font-ct-serif text-[30px] font-medium leading-[1.2]">{lesson.title}</h4>
          <p className="mt-4 max-w-prose text-base leading-relaxed text-ct-linen">{lesson.principle}</p>
          <div className="mt-6 flex gap-3">
            <button type="button" disabled={current === 0} onClick={() => go(current - 1)} className={secondary.live}>
              ← Back
            </button>
            {current < last ? (
              <button type="button" onClick={() => go(current + 1)} className={secondary.live}>
                Next lesson →
              </button>
            ) : (
              <a href="#build" className={primary.live}>
                Start building
              </a>
            )}
          </div>
        </div>
        <div className="border-t border-ct-hairline bg-ct-walnut/30 p-6 sm:p-8 md:border-t-0 md:border-l">
          <p className={`${label} text-ct-accent`}>At the table</p>
          <p className="mt-2 font-ct-serif text-lg italic leading-relaxed">{lesson.takeaway}</p>
          {lesson.related.length > 0 && (
            <>
              <p className={`${label} mt-6 mb-2 text-ct-muted`}>Applies to</p>
              <ul className="flex flex-wrap gap-2">
                {lesson.related.map((id) => (
                  <li key={id}>
                    <Badge tone={poolIds.includes(id) ? "claret" : "outline"}>
                      {ingredientName(id)}
                      {poolIds.includes(id) ? " · in the pool" : ""}
                    </Badge>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Showcase() {
  const p = usePotluck();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openHow = () => dialogRef.current?.showModal();

  return (
    <main className="min-h-screen bg-ct-bg font-ct-sans text-ct-text">
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
        <nav className="flex gap-6">
          <Link href="/" className={link}>
            ← Hub
          </Link>
          <Link href="/mood-boards/candlelit-table" className={link}>
            Mood board
          </Link>
        </nav>

        <header className="relative mt-10 mb-20 overflow-hidden rounded-xl px-6 py-16 text-center sm:py-24">
          <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgb(227_167_60/0.28),rgb(94_56_32/0.25)_40%,transparent_72%)]" />
          <p className={`${label} relative text-ct-accent`}>Design system</p>
          <h1 className="relative mt-3 font-ct-serif text-6xl italic leading-none sm:text-8xl">Candlelit Table</h1>
          <p className="relative mx-auto mt-6 max-w-xl leading-relaxed text-ct-linen">
            Warm, intimate, and golden, for themed potluck nights where the guest is the chef. Dark espresso surfaces, soft
            pill controls, a candle glow instead of shadows, and saffron saved for the action that matters.
          </p>
        </header>

        <Section n="01" title="Color roles">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {colorRoles.map((c) => {
              const r = contrast(c.fg, c.bg);
              const pass = r >= (c.min ?? 4.5);
              return (
                <div key={c.role} className={`${card} flex items-center gap-4 p-4`}>
                  <span className="size-16 shrink-0 rounded-full ring-1 ring-ct-border/60" style={{ background: c.hex }} />
                  <div className="min-w-0">
                    <p className="font-ct-serif text-xl italic">{c.role}</p>
                    <p className="text-sm text-ct-muted">
                      {c.name} · {c.hex}
                    </p>
                    <p className="text-sm text-ct-linen">{c.note}</p>
                    <p className="mt-1 text-xs text-ct-muted">
                      <span className="font-semibold text-ct-text">{r.toFixed(1)}:1</span> {c.on} {pass ? "· passes" : "· fails"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Section>

        <Section n="02" title="Type roles">
          <div className={`${card} divide-y divide-ct-hairline`}>
            {typeRoles.map((t) => (
              <div key={t.role} className="grid gap-3 p-6 sm:grid-cols-[14rem_1fr] sm:items-baseline">
                <div>
                  <p className={`${label} text-ct-accent`}>{t.role}</p>
                  <p className="mt-1 text-sm text-ct-muted">{t.spec}</p>
                </div>
                <p className={t.className}>{t.sample}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section n="03" title="Spacing and shape">
          <div className="grid gap-5 lg:grid-cols-3">
            <div className={`${card} p-6`}>
              <Caption>Spacing scale · px</Caption>
              <div className="flex items-end gap-3">
                {spacing.map((s) => (
                  <div key={s} className="flex flex-col items-center gap-2">
                    <div className="w-3 rounded-full bg-gradient-to-t from-ct-walnut to-ct-accent" style={{ height: s }} />
                    <span className="text-xs text-ct-muted">{s}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={`${card} p-6`}>
              <Caption>Corners</Caption>
              <div className="flex gap-5">
                {[
                  ["12px", "rounded-xl", "Cards, panels"],
                  ["10px", "rounded-[10px]", "Inputs"],
                  ["Pill", "rounded-full", "Buttons, chips"],
                ].map(([n, cls, use]) => (
                  <div key={n}>
                    <div className={`size-16 border border-ct-border bg-ct-raised ${cls}`} />
                    <p className="mt-2 text-sm font-semibold">{n}</p>
                    <p className="text-xs text-ct-muted">{use}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className={`${card} p-6`}>
              <Caption>Light, not shadow</Caption>
              <div className="flex items-end gap-6">
                {[
                  ["Glow", "Cards", "shadow-ct-glow"],
                  ["Bright", "Hover", "shadow-ct-glow-strong"],
                  ["Sink", "Pressed", "shadow-ct-press"],
                ].map(([n, use, cls]) => (
                  <div key={n}>
                    <div className={`h-14 w-20 rounded-xl bg-ct-raised ${cls}`} />
                    <p className="mt-3 text-sm font-semibold">{n}</p>
                    <p className="text-xs text-ct-muted">{use}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-ct-linen">Surfaces are lit from below, like a candle on the table.</p>
            </div>
          </div>
        </Section>

        <Section n="04" title="Components">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-8">
              <div className={`${card} p-6`}>
                <Caption>Buttons and link</Caption>
                <div className="flex flex-wrap items-center gap-4">
                  <button type="button" className={primary.live}>
                    Bring this
                  </button>
                  <button type="button" className={secondary.live}>
                    See the pool
                  </button>
                  <button type="button" onClick={openHow} className={`${link} cursor-pointer`}>
                    How it works
                  </button>
                </div>
              </div>

              <div className={`${card} grid gap-4 p-6 sm:grid-cols-2`}>
                <div>
                  <label htmlFor="ct-search" className={`${label} mb-2 block text-ct-muted`}>
                    Search ingredients
                  </label>
                  <input id="ct-search" type="search" placeholder="Try “basil”" className={input.live} />
                </div>
                <div>
                  <label htmlFor="ct-sort" className={`${label} mb-2 block text-ct-muted`}>
                    Sort the pool
                  </label>
                  <div className="relative">
                    <select id="ct-sort" defaultValue="category" className={`${input.live} cursor-pointer appearance-none pr-10`}>
                      <option value="category">By category</option>
                      <option value="guest">By guest</option>
                      <option value="az">A to Z</option>
                    </select>
                    <span aria-hidden className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-ct-muted">
                      ▾
                    </span>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="ct-own" className={`${label} mb-2 block text-ct-muted`}>
                    Bringing something else?
                  </label>
                  <input id="ct-own" aria-invalid="true" aria-describedby="ct-own-error" defaultValue="Basil" className={input.live} />
                  <p id="ct-own-error" className="mt-2 text-sm text-ct-error">
                    Maya&rsquo;s already bringing basil. Try something new for the pool.
                  </p>
                </div>
              </div>

              <div id="bring" className={`${card} scroll-mt-6 overflow-hidden`}>
                <div className="flex items-end justify-between gap-4 border-b border-ct-hairline px-6 py-5">
                  <div>
                    <h3 className="font-ct-serif text-2xl italic">Bring your three</h3>
                    <p className="text-sm text-ct-muted">
                      {p.bringing.length} of {p.event.perGuest} candles lit
                    </p>
                  </div>
                  <Candles value={p.bringing.length} max={p.event.perGuest} />
                </div>
                <div className="px-6 pt-2 pb-5">
                  <div role="tablist" aria-label="Ingredient category" className="flex gap-5 overflow-x-auto border-b border-ct-hairline">
                    {categories.map((c) => (
                      <button key={c} type="button" role="tab" aria-selected={p.ideaTab === c} onClick={() => p.setIdeaTab(c)} className={`${tab.live} shrink-0`}>
                        {c}
                      </button>
                    ))}
                  </div>
                  <ul className="divide-y divide-ct-hairline" role="tabpanel">
                    {p.event.ideas
                      .filter((i) => i.category === p.ideaTab)
                      .map((i) => {
                        const on = p.bringing.includes(i.id);
                        return (
                          <li key={i.id} className="flex items-center justify-between gap-4 py-3">
                            <div className="min-w-0">
                              <p className="truncate font-medium">{i.name}</p>
                              <p className="text-sm text-ct-muted">
                                {i.vegetarian ? "Vegetarian" : "Meat & fish"}
                                {i.nuts ? " · Contains nuts" : ""}
                                {i.after ? " · After the bake" : ""}
                              </p>
                            </div>
                            <button
                              type="button"
                              aria-pressed={on}
                              disabled={!on && p.full}
                              aria-label={`${on ? "Stop bringing" : "Bring"} ${i.name}`}
                              onClick={() => p.toggleBring(i.id)}
                              className={`${secondary.live} min-h-9 shrink-0 px-4 text-sm`}
                            >
                              {on ? "✓ Bringing" : "Bring"}
                            </button>
                          </li>
                        );
                      })}
                  </ul>
                  {p.full && <p className="mt-2 text-sm text-ct-muted">That&rsquo;s your three. Remove one to swap it out.</p>}
                </div>
              </div>

              <div className={`${card} overflow-hidden`}>
                <div className="border-b border-ct-hairline px-6 py-4">
                  <h3 className="font-ct-serif text-2xl italic">What I&rsquo;m bringing</h3>
                </div>
                {p.mine.length === 0 ? (
                  <p className="px-6 py-6 text-ct-muted">Nothing yet. Pick up to three ingredients to bring.</p>
                ) : (
                  <ul className="divide-y divide-ct-hairline">
                    {p.mine.map((i) => (
                      <li key={i.id} className="flex items-center justify-between gap-4 px-6 py-3">
                        <div className="min-w-0">
                          <p className="truncate font-medium">{i.name}</p>
                          <p className="text-sm text-ct-muted">{i.category}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => p.toggleBring(i.id)}
                          aria-label={`Remove ${i.name}`}
                          className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-full border border-ct-border text-lg leading-none text-ct-linen hover:border-ct-error hover:text-ct-error active:shadow-ct-press focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-ct-accent"
                        >
                          ×
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="border-t border-ct-hairline p-5">
                  <button type="button" disabled={p.mine.length === 0} onClick={p.confirm} className={`${primary.live} w-full`}>
                    Add mine to the pool
                  </button>
                  {p.confirmed && (
                    <p role="status" className="mt-3 text-sm text-ct-success">
                      ✓ You&rsquo;re in. See you {p.event.date.split(",")[0]}.
                    </p>
                  )}
                </div>
              </div>

              <div className={`${card} p-6`}>
                <Caption>Badges</Caption>
                <div className="flex flex-wrap gap-2">
                  <Badge tone="cream">I&rsquo;ll provide</Badge>
                  <Badge tone="saffron">You</Badge>
                  <Badge tone="claret">Guest favorite</Badge>
                  <Badge>Vegetarian</Badge>
                  <Badge>After the bake</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <article className={`${card} relative overflow-hidden`}>
                <div aria-hidden className="absolute -top-20 -right-16 size-64 rounded-full bg-[radial-gradient(circle,rgb(227_167_60/0.3),transparent_65%)]" />
                <div className="relative space-y-4 p-7">
                  <div className="flex items-center justify-between gap-3">
                    <span className={`${label} text-ct-accent`}>
                      {p.event.date} · {p.event.time}
                    </span>
                    <Badge>Upcoming</Badge>
                  </div>
                  <h3 className="font-ct-serif text-5xl italic leading-none">{p.event.theme}</h3>
                  <dl className="grid grid-cols-[7rem_1fr] gap-y-1.5 text-[15px]">
                    <dt className="text-ct-muted">I&rsquo;ll provide</dt>
                    <dd>{p.event.base.join(" & ")}</dd>
                    <dt className="text-ct-muted">You bring</dt>
                    <dd>{p.event.perGuest} ingredients</dd>
                    <dt className="text-ct-muted">The pool</dt>
                    <dd>
                      {p.pool.length} ingredients from {p.event.guests.length} guests
                    </dd>
                  </dl>
                  <div className="flex flex-wrap gap-3 pt-1">
                    <a href="#bring" className={primary.live}>
                      Bring my three
                    </a>
                    <button type="button" onClick={openHow} className={secondary.live}>
                      How it works
                    </button>
                  </div>
                </div>
              </article>

              <div id="build" className={`${card} scroll-mt-6 overflow-hidden`}>
                <div className="border-b border-ct-hairline px-6 py-5">
                  <h3 className="font-ct-serif text-2xl italic">Build your creation</h3>
                  <p className="text-sm text-ct-muted">Tap anything in tonight&rsquo;s pool to put it on your pizza.</p>
                </div>
                <div className="space-y-5 p-6">
                  <div className="flex flex-wrap gap-2">
                    {(["All", ...categories] as const).map((f) => (
                      <button key={f} type="button" aria-pressed={p.poolFilter === f} onClick={() => p.setPoolFilter(f)} className={chip.live}>
                        {f}
                      </button>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-x-6 gap-y-3 text-[15px]">
                    <label className="flex cursor-pointer items-center gap-2.5">
                      <input type="checkbox" className="ct-check" checked={p.vegOnly} onChange={(e) => p.setVegOnly(e.target.checked)} />
                      Vegetarian
                    </label>
                    <label className="flex cursor-pointer items-center gap-2.5">
                      <input type="checkbox" className="ct-check" checked={p.noNuts} onChange={(e) => p.setNoNuts(e.target.checked)} />
                      No nuts
                    </label>
                    <label className="flex items-center gap-2.5 text-ct-muted">
                      <input type="checkbox" className="ct-check" disabled />
                      Gluten-free dough (ask me)
                    </label>
                  </div>
                  <Toggle checked={p.showNames} onChange={p.setShowNames} labelText="Show who brought what" />

                  <div className="space-y-2">
                    <p className="flex flex-wrap items-center gap-2 text-sm">
                      <Badge tone="cream">I&rsquo;ll provide</Badge>
                      <span className="opacity-80">Use it, swap it, or skip it.</span>
                    </p>
                    <ul className="flex flex-wrap gap-2" aria-label="Provided by the host">
                      {p.event.base.map((b) => (
                        <li key={b}>
                          <button type="button" aria-pressed={p.baseOn.includes(b)} onClick={() => p.toggleBase(b)} className={chip.live}>
                            {b}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <p className="flex flex-wrap items-center gap-2 text-sm">
                      <Badge tone="outline">The pool</Badge>
                      <span className="opacity-80">
                        Everything guests brought, {p.pool.length} so far. Take anything.
                      </span>
                    </p>
                    <ul className="flex flex-wrap gap-2" aria-label="Tonight's pool">
                      {p.visiblePool.map((i) => (
                        <li key={i.id}>
                          <button type="button" aria-pressed={p.creation.includes(i.id)} onClick={() => p.toggleCreation(i.id)} className={chip.live}>
                            {i.name}
                            {p.showNames && <span className="text-xs opacity-70">· {i.broughtBy}</span>}
                          </button>
                        </li>
                      ))}
                    </ul>
                    {p.visiblePool.length === 0 && <p className="text-sm text-ct-muted">Nothing in the pool matches. Try another filter.</p>}
                  </div>

                  <fieldset>
                    <legend className={`${label} mb-3 text-ct-muted`}>Crust</legend>
                    <div className="flex flex-wrap gap-6 text-[15px]">
                      {[
                        ["thin", "Thin and crisp"],
                        ["thick", "Thick and chewy"],
                      ].map(([v, l]) => (
                        <label key={v} className="flex cursor-pointer items-center gap-2.5">
                          <input type="radio" name="ct-crust" className="ct-radio" value={v} checked={p.crust === v} onChange={() => p.setCrust(v)} />
                          {l}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </div>

                <div className="border-t border-ct-hairline bg-ct-walnut/25 p-6">
                  <p className={`${label} text-ct-accent`}>Your creation · {p.crust === "thin" ? "thin crust" : "thick crust"}</p>
                  <dl className="mt-3 space-y-3">
                    <div>
                      <dt className="text-sm text-ct-muted">Into the oven</dt>
                      <dd className="font-ct-serif text-xl italic leading-snug">{p.intoOven.length ? p.intoOven.join(", ") : "Nothing yet"}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-ct-muted">After the bake</dt>
                      <dd className="font-ct-serif text-xl italic leading-snug">
                        {p.afterBake.length ? p.afterBake.join(", ") : <span className="font-ct-sans text-base not-italic text-ct-muted">Nothing yet</span>}
                      </dd>
                    </div>
                  </dl>
                  <p className={`${label} mt-6 mb-3 text-ct-muted`}>Balance</p>
                  <ul className="flex justify-between gap-2">
                    {tastes.map((t) => {
                      const n = Math.min(p.tasteCount[t], 4);
                      return (
                        <li key={t} className="flex flex-1 flex-col items-center gap-2" aria-label={`${t}: ${p.tasteCount[t]}`}>
                          <span
                            className="grid size-12 place-items-center rounded-full border border-ct-border font-ct-serif text-lg transition-[background-color,box-shadow] duration-300"
                            style={{
                              background: `rgb(227 167 60 / ${n * 0.18})`,
                              boxShadow: n ? `0 0 ${n * 6}px rgb(227 167 60 / ${n * 0.12})` : undefined,
                              color: n >= 3 ? BG : undefined,
                            }}
                          >
                            {p.tasteCount[t]}
                          </span>
                          <span className="text-xs text-ct-muted">{t}</span>
                        </li>
                      );
                    })}
                  </ul>
                  <p className="mt-4 font-ct-serif text-[15px] italic text-ct-linen" aria-live="polite">
                    {balanceNote(p.tasteCount)}
                  </p>
                </div>
              </div>

              <article className={`${card} overflow-hidden`}>
                <Image
                  src={pastCreation.image.src}
                  alt={pastCreation.image.alt}
                  width={pastCreation.image.w}
                  height={pastCreation.image.h}
                  sizes="(min-width: 1024px) 34rem, 100vw"
                  className="aspect-[16/9] w-full object-cover object-[50%_75%]"
                />
                <div className="space-y-1 p-6">
                  <Caption>
                    Creation card · {pastCreation.event}, {pastCreation.year}
                  </Caption>
                  <h3 className="font-ct-serif text-[28px] italic leading-tight">{pastCreation.name}</h3>
                  <p className="text-sm text-ct-muted">
                    Built by {pastCreation.builtBy} from {pastCreation.from.join(", ").toLowerCase()}
                  </p>
                </div>
              </article>
            </div>
          </div>

          <div id="lessons" className="mt-10 scroll-mt-6">
            <Caption>Lessons · the food science behind tonight&rsquo;s theme</Caption>
            <Lessons poolIds={p.pool.map((i) => i.id)} />
          </div>

          <div className="mt-10">
            <Caption>Modal · opens from “How it works”</Caption>
            <div className={`${card} max-w-lg`}>
              <HowItWorks />
            </div>
          </div>

          <dialog
            ref={dialogRef}
            aria-label="How it works"
            className="m-auto w-[min(32rem,calc(100vw-2rem))] rounded-xl border border-ct-border bg-ct-surface p-0 text-ct-text shadow-ct-glow-strong backdrop:bg-black/70"
            onClick={(e) => e.target === dialogRef.current && dialogRef.current.close()}
          >
            <HowItWorks onClose={() => dialogRef.current?.close()} />
          </dialog>
        </Section>

        <Section n="05" title="Control states">
          <div className={`${card} overflow-x-auto p-6`}>
            <table className="w-full min-w-[50rem] border-collapse text-left">
              <thead>
                <tr>
                  <th className="w-32" />
                  {controlStates.map((s) => (
                    <th key={s} scope="col" className={`${label} pb-4 text-ct-muted capitalize`}>
                      {s}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="align-middle">
                <StateRow name="Primary" render={(s) => <span className={primary.state[s]}>{s === "selected" ? "✓ In the pool" : "Add to pool"}</span>} />
                <StateRow name="Secondary" render={(s) => <span className={secondary.state[s]}>{s === "selected" ? "✓ Bringing" : "Bring"}</span>} />
                <StateRow name="Filter chip" render={(s) => <span className={chip.state[s]}>Burrata</span>} />
                <StateRow name="Tab" render={(s) => <span className={tab.state[s]}>Cheese</span>} />
                <StateRow
                  name="Text input"
                  render={(s) => (input.state[s] ? <span className={`${input.state[s]} flex items-center text-ct-muted`}>Search</span> : <span className="text-ct-muted">—</span>)}
                />
              </tbody>
            </table>
            <p className="mt-4 text-sm text-ct-muted">
              Hover brightens the glow, press sinks it inward. Selected turns claret, so saffron always points to the next step.
            </p>
          </div>
        </Section>

        <Section n="06" title="UI states">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StatePanel title="Empty">
              <span aria-hidden className="mx-auto flex flex-col items-center">
                <span className="h-4 w-2.5 rounded-[50%] bg-transparent" />
                <span className="h-9 w-4 rounded-sm bg-ct-hairline" />
              </span>
              <p className="mt-4 font-ct-serif text-2xl italic">The pool is empty</p>
              <p className="mt-1 text-sm text-ct-muted">Be the first to bring something.</p>
            </StatePanel>
            <StatePanel title="Loading">
              <span aria-hidden className="mx-auto flex flex-col items-center">
                <span className="ct-flicker h-4 w-2.5 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-ct-accent shadow-[0_0_16px_4px_rgb(227_167_60/0.6)]" />
                <span className="mt-0.5 h-9 w-4 rounded-sm bg-ct-linen" />
              </span>
              <p className="mt-4 font-ct-serif text-2xl italic">Lighting the candles…</p>
              <p className="mt-1 text-sm text-ct-muted">Gathering everyone&rsquo;s ingredients.</p>
            </StatePanel>
            <StatePanel title="Error">
              <span aria-hidden className="mx-auto grid size-12 place-items-center rounded-full border border-ct-error font-ct-serif text-xl text-ct-error">
                !
              </span>
              <p className="mt-4 font-ct-serif text-2xl italic text-ct-error">Couldn&rsquo;t load the pool</p>
              <button type="button" className={`${secondary.live} mt-3 min-h-9 text-sm`}>
                Try again
              </button>
            </StatePanel>
            <StatePanel title="Success">
              <span aria-hidden className="mx-auto grid size-12 place-items-center rounded-full bg-ct-success font-semibold text-ct-bg">
                ✓
              </span>
              <p className="mt-4 font-ct-serif text-2xl italic text-ct-success">Your three are in</p>
              <p className="mt-1 text-sm text-ct-muted">See you Saturday.</p>
            </StatePanel>
          </div>
        </Section>
      </div>
    </main>
  );
}

function StateRow({ name, render }: { name: string; render: (s: ControlState) => ReactNode }) {
  return (
    <tr className="border-t border-ct-hairline">
      <th scope="row" className="py-5 pr-4 text-sm font-medium text-ct-muted">
        {name}
      </th>
      {controlStates.map((s) => (
        <td key={s} className="py-5 pr-4">
          {render(s)}
        </td>
      ))}
    </tr>
  );
}

function StatePanel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className={`${card} flex flex-col`}>
      <div className="flex min-h-60 flex-1 flex-col justify-center p-6 text-center">{children}</div>
      <p className={`${label} border-t border-ct-hairline px-5 py-3 text-ct-muted`}>{title}</p>
    </div>
  );
}
