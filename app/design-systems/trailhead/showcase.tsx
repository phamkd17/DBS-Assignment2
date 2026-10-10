"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { contrast } from "@/lib/contrast";
import { categories, pastCreation, pizzaNight as event, tastes } from "@/lib/events";
import { balanceNote, howItWorks, ingredientName, useLessons, usePotluck } from "@/lib/use-potluck";
import { controlStates, type ControlState } from "@/components/line-and-stone/styles";
import { card, chip, input, label, link, primary, secondary, tab } from "@/components/trailhead/styles";

const WHITE = "#FFFFFF";
const INK = "#12181B";

const colorRoles = [
  { role: "Background", token: "th-bg", hex: "#F7F5EE", name: "Cloud", note: "Page", fg: INK, bg: "#F7F5EE", on: "Text on it" },
  { role: "Surface", token: "th-surface", hex: WHITE, name: "White", note: "Cards, inputs, panels", fg: INK, bg: WHITE, on: "Text on it" },
  { role: "Text", token: "th-ink", hex: INK, name: "Basalt", note: "Text, 2px outlines, shadows", fg: INK, bg: WHITE, on: "On surface" },
  { role: "Muted", token: "th-muted", hex: "#4A5357", name: "Slate", note: "Secondary text", fg: "#4A5357", bg: WHITE, on: "On surface" },
  { role: "Accent", token: "th-accent", hex: "#F6B336", name: "Sunrise", note: "Primary action only", fg: INK, bg: "#F6B336", on: "Basalt label" },
  { role: "Selected", token: "th-selected", hex: "#C6E264", name: "Anemone", note: "Chosen chips, tabs, toggles", fg: INK, bg: "#C6E264", on: "Basalt label" },
  { role: "Link · focus", token: "th-link", hex: "#086A73", name: "Deep lagoon", note: "Links, 3px focus ring", fg: "#086A73", bg: WHITE, on: "On surface" },
  { role: "Error", token: "th-error", hex: "#B8401C", name: "Deep canyon", note: "Problems, invalid fields", fg: "#B8401C", bg: WHITE, on: "On surface" },
  { role: "Success", token: "th-success", hex: "#2F7D32", name: "Fern", note: "Confirmations", fg: "#2F7D32", bg: WHITE, on: "On surface" },
];

const decorative = [
  { name: "Lagoon", hex: "#0B7F8A" },
  { name: "Canyon", hex: "#D9532B" },
  { name: "Sky", hex: "#2E7CD6" },
  { name: "Fern", hex: "#2F7D32" },
];

const typeRoles = [
  { role: "Display", spec: "Bricolage Grotesque · 800 · 72/68 · −2%", className: "font-th-display text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-[72px]", sample: "Your creation, your rules." },
  { role: "Heading", spec: "Bricolage Grotesque · 700 · 32/36", className: "font-th-display text-[32px] font-bold leading-[1.1]", sample: "Pizza night is on!" },
  { role: "Body", spec: "Instrument Sans · 400 · 17/28", className: "font-th-sans text-[17px] leading-7", sample: "I’ll make the dough and sauce. You bring three toppings. Then build whatever you like from everything on the table." },
  { role: "Label", spec: "Instrument Sans · 600 · 12/16 · caps, +0.12em", className: label, sample: "You’re bringing · 2 of 3" },
];

const spacing = [4, 8, 12, 16, 24, 32, 48, 64];
const meterColors = ["bg-th-canyon", "bg-th-accent", "bg-th-selected"];
const tasteColors: Record<string, string> = {
  Salty: "bg-th-sky",
  Sweet: "bg-th-accent",
  Sour: "bg-th-selected",
  Heat: "bg-th-canyon",
  Umami: "bg-th-lagoon",
};

function Section({ n, title, color, children, id }: { n: string; title: string; color: string; children: ReactNode; id?: string }) {
  return (
    <section id={id} className="scroll-mt-6 pb-16">
      <h2 className="mb-8 flex items-center gap-4">
        <span className={`grid size-12 place-items-center rounded-full border-2 border-th-ink font-th-display text-xl font-extrabold ${color}`}>
          {n}
        </span>
        <span className="font-th-display text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</span>
      </h2>
      {children}
    </section>
  );
}

function Caption({ children }: { children: ReactNode }) {
  return <p className={`${label} mb-3 text-th-muted`}>{children}</p>;
}

function Badge({ children, tone = "outline" }: { children: ReactNode; tone?: "outline" | "lime" | "sun" | "ink" }) {
  const tones = {
    outline: "border-th-ink bg-th-surface text-th-ink",
    lime: "border-th-ink bg-th-selected text-th-ink",
    sun: "border-th-ink bg-th-accent text-th-ink",
    ink: "border-th-ink bg-th-ink text-th-surface",
  };
  return (
    <span className={`inline-flex items-center rounded-full border-2 px-2.5 py-0.5 font-th-sans text-xs font-semibold ${tones[tone]}`}>
      {children}
    </span>
  );
}

function Toggle({ checked, onChange, labelText }: { checked: boolean; onChange: (v: boolean) => void; labelText: string }) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-3 font-th-sans text-base font-medium">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className="relative h-8 w-14 shrink-0 cursor-pointer rounded-full border-2 border-th-ink bg-th-surface transition-colors hover:bg-th-bg focus-visible:outline-3 focus-visible:outline-solid focus-visible:outline-offset-3 focus-visible:outline-th-link aria-checked:bg-th-selected"
      >
        <span
          className={`absolute top-1/2 left-[3px] size-[22px] -translate-y-1/2 rounded-full border-2 border-th-ink bg-th-surface transition-transform duration-150 ${
            checked ? "translate-x-6" : ""
          }`}
        />
      </button>
      {labelText}
    </label>
  );
}

function Meter({ value, max }: { value: number; max: number }) {
  return (
    <div className="flex gap-1.5" role="meter" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max} aria-label="Ingredients claimed">
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={`h-3 flex-1 rounded-full border-2 border-th-ink ${i < value ? meterColors[i % meterColors.length] : "bg-th-surface"}`} />
      ))}
    </div>
  );
}

function HowItWorks({ onClose }: { onClose?: () => void }) {
  return (
    <div>
      <div className="flex items-center justify-between rounded-t-[16px] bg-th-lagoon px-5 py-4 text-th-surface">
        <span className="font-th-display text-2xl font-extrabold">How it works</span>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid size-10 cursor-pointer place-items-center rounded-full border-2 border-th-surface text-xl leading-none hover:bg-th-surface hover:text-th-ink focus-visible:outline-3 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-th-surface"
          >
            ×
          </button>
        )}
      </div>
      <div className="p-5">
        <p className="font-th-display text-[28px] font-bold leading-tight">{event.theme}</p>
        <p className="text-th-muted">
          {event.date} · {event.time}
        </p>
        <ol className="mt-5 space-y-3">
          {howItWorks.map(([head, rest], i) => (
            <li key={head} className="flex gap-3">
              <span className={`grid size-8 shrink-0 place-items-center rounded-full border-2 border-th-ink font-th-display font-extrabold ${["bg-th-accent", "bg-th-selected", "bg-th-sky text-th-surface", "bg-th-canyon text-th-surface", "bg-th-lagoon text-th-surface"][i]}`}>
                {i + 1}
              </span>
              <p className="pt-0.5 leading-relaxed">
                <span className="font-semibold">{head}</span> {rest}
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
  const stripes = ["bg-th-canyon", "bg-th-sky", "bg-th-accent", "bg-th-selected"];
  return (
    <div className={`${card} overflow-hidden`}>
      <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-th-ink bg-th-ink px-6 py-5 text-th-surface">
        <div>
          <p className={`${label} text-th-selected`}>Learn, then build</p>
          <h3 className="font-th-display text-[32px] font-extrabold leading-tight">Why it works</h3>
        </div>
        <p className="font-th-sans font-semibold">
          {seen.length} of {lessons.length} read
        </p>
      </div>
      <div className="flex gap-2 overflow-x-auto border-b-2 border-th-ink p-3" role="list">
        {lessons.map((l, i) => (
          <button
            key={l.id}
            type="button"
            role="listitem"
            aria-current={i === current ? "step" : undefined}
            onClick={() => go(i)}
            className={`${chip.live} shrink-0 aria-[current=step]:bg-th-ink aria-[current=step]:text-th-surface aria-[current=step]:hover:bg-th-ink`}
          >
            <span className={`grid size-5 place-items-center rounded-full border-2 border-current text-[11px] font-extrabold`}>{seen.includes(l.id) ? "✓" : i + 1}</span>
            {l.title}
          </button>
        ))}
      </div>
      <div className="grid md:grid-cols-[1fr_18rem]" aria-live="polite">
        <div className="p-6">
          <div className={`mb-4 h-2 w-16 rounded-full ${stripes[current % stripes.length]}`} />
          <p className={`${label} text-th-muted`}>
            Lesson {current + 1} of {lessons.length}
          </p>
          <h4 className="mt-1 font-th-display text-[32px] font-bold leading-[1.1]">{lesson.title}</h4>
          <p className="mt-4 max-w-prose text-[17px] leading-7">{lesson.principle}</p>
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
        <div className="border-t-2 border-th-ink bg-th-selected/40 p-6 md:border-t-0 md:border-l-2">
          <p className={label}>At the table</p>
          <p className="mt-2 text-base leading-relaxed">{lesson.takeaway}</p>
          {lesson.related.length > 0 && (
            <>
              <p className={`${label} mt-5 mb-2 text-th-muted`}>Applies to</p>
              <ul className="flex flex-wrap gap-2">
                {lesson.related.map((id) => (
                  <li key={id}>
                    <Badge tone={poolIds.includes(id) ? "ink" : "outline"}>
                      {ingredientName(id)}
                      {poolIds.includes(id) ? " ✓" : ""}
                    </Badge>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-xs text-th-muted">✓ already in the pool</p>
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
    <main className="min-h-screen bg-th-bg font-th-sans text-th-ink">
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
        <nav className="flex gap-6">
          <Link href="/" className={link}>
            ← Hub
          </Link>
          <Link href="/mood-boards/trailhead" className={link}>
            Mood board
          </Link>
        </nav>

        <header className={`${card} relative mt-8 mb-16 overflow-hidden`}>
          <div className="grid md:grid-cols-[1fr_15rem]">
            <div className="p-6 sm:p-10">
              <p className={`${label} text-th-muted`}>Design system</p>
              <h1 className="mt-2 font-th-display text-6xl font-extrabold leading-[0.9] tracking-tight sm:text-8xl">Trailhead</h1>
              <p className="mt-5 max-w-xl text-[17px] leading-7">
                Loud, sunny, and a little wild, for themed potluck nights where the guest is the chef. Chunky outlines, pill
                buttons, sticker shadows that press flat, and one sunrise yellow reserved for the action that matters most.
              </p>
            </div>
            <div className="grid grid-cols-2 border-t-2 border-th-ink md:grid-cols-1 md:border-t-0 md:border-l-2" aria-hidden="true">
              <div className="min-h-20 bg-th-sky" />
              <div className="min-h-20 bg-th-lagoon" />
              <div className="min-h-20 bg-th-selected" />
              <div className="min-h-20 bg-th-canyon" />
            </div>
          </div>
        </header>

        <Section n="1" title="Color roles" color="bg-th-accent">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {colorRoles.map((c) => {
              const r = contrast(c.fg, c.bg);
              return (
                <div key={c.role} className={`${card} overflow-hidden`}>
                  <div className="flex h-24 items-end border-b-2 border-th-ink p-3" style={{ background: c.hex }}>
                    <span className="rounded-full border-2 border-th-ink bg-th-surface px-2.5 py-0.5 text-xs font-semibold">
                      {r.toFixed(1)}:1 · {r >= 4.5 ? "AA pass" : "fails"}
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="font-th-display text-xl font-bold">{c.role}</p>
                    <p className="text-sm text-th-muted">
                      {c.name} · {c.hex} · {c.token}
                    </p>
                    <p className="mt-1 text-sm">{c.note}</p>
                    <p className="mt-1 text-xs text-th-muted">Contrast: {c.on}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-6">
            <Caption>Decorative fills · big shapes and art only, never small text</Caption>
            <div className="flex flex-wrap gap-3">
              {decorative.map((d) => (
                <span key={d.name} className="inline-flex items-center gap-2 rounded-full border-2 border-th-ink bg-th-surface py-1 pr-3 pl-1 text-sm font-semibold">
                  <span className="size-6 rounded-full border-2 border-th-ink" style={{ background: d.hex }} />
                  {d.name} {d.hex}
                </span>
              ))}
            </div>
          </div>
        </Section>

        <Section n="2" title="Type roles" color="bg-th-selected">
          <div className={`${card} divide-y-2 divide-th-ink`}>
            {typeRoles.map((t) => (
              <div key={t.role} className="grid gap-3 p-6 sm:grid-cols-[15rem_1fr] sm:items-baseline">
                <div>
                  <Badge tone="lime">{t.role}</Badge>
                  <p className="mt-2 text-sm text-th-muted">{t.spec}</p>
                </div>
                <p className={t.className}>{t.sample}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section n="3" title="Spacing and shape" color="bg-th-sky text-th-surface">
          <div className="grid gap-5 lg:grid-cols-3">
            <div className={`${card} p-6`}>
              <Caption>Spacing scale · px</Caption>
              <div className="flex items-end gap-2.5">
                {spacing.map((s, i) => (
                  <div key={s} className="flex flex-col items-center gap-2">
                    <div className={`w-5 rounded-full border-2 border-th-ink ${["bg-th-sky", "bg-th-lagoon", "bg-th-selected", "bg-th-accent"][i % 4]}`} style={{ height: s + 4 }} />
                    <span className="text-xs font-semibold text-th-muted">{s}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={`${card} p-6`}>
              <Caption>Corners</Caption>
              <div className="flex gap-5">
                {[
                  ["18px", "rounded-[18px]", "Cards, panels"],
                  ["16px", "rounded-2xl", "Inputs"],
                  ["Pill", "rounded-full", "Buttons, chips, tabs"],
                ].map(([n, cls, use]) => (
                  <div key={n}>
                    <div className={`size-16 border-2 border-th-ink bg-th-selected ${cls}`} />
                    <p className="mt-2 text-sm font-semibold">{n}</p>
                    <p className="text-xs text-th-muted">{use}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className={`${card} p-6`}>
              <Caption>Lines and shadow</Caption>
              <div className="flex items-end gap-6">
                <div>
                  <div className="h-14 w-20 rounded-xl border-2 border-th-ink bg-th-surface shadow-th" />
                  <p className="mt-3 text-sm font-semibold">4px sticker</p>
                  <p className="text-xs text-th-muted">Rest</p>
                </div>
                <div>
                  <div className="h-14 w-20 -translate-x-px -translate-y-px rounded-xl border-2 border-th-ink bg-th-surface shadow-th-lg" />
                  <p className="mt-3 text-sm font-semibold">6px lift</p>
                  <p className="text-xs text-th-muted">Hover</p>
                </div>
                <div>
                  <div className="h-14 w-20 translate-x-[3px] translate-y-[3px] rounded-xl border-2 border-th-ink bg-th-surface" />
                  <p className="mt-3 text-sm font-semibold">Flat</p>
                  <p className="text-xs text-th-muted">Pressed</p>
                </div>
              </div>
              <p className="mt-4 text-sm">All outlines are 2px Basalt. Shadows are hard, never blurry.</p>
            </div>
          </div>
        </Section>

        <Section n="4" title="Components" color="bg-th-canyon text-th-surface">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Left: bring your three */}
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
                  <label htmlFor="th-search" className={`${label} mb-2 block`}>
                    Search ingredients
                  </label>
                  <input id="th-search" type="search" placeholder="Try “basil”" className={input.live} />
                </div>
                <div>
                  <label htmlFor="th-sort" className={`${label} mb-2 block`}>
                    Sort the pool
                  </label>
                  <div className="relative">
                    <select id="th-sort" defaultValue="category" className={`${input.live} cursor-pointer appearance-none pr-10 font-medium`}>
                      <option value="category">By category</option>
                      <option value="guest">By guest</option>
                      <option value="az">A to Z</option>
                    </select>
                    <span aria-hidden className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 font-bold">
                      ⌄
                    </span>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="th-own" className={`${label} mb-2 block`}>
                    Bringing something else?
                  </label>
                  <input id="th-own" aria-invalid="true" aria-describedby="th-own-error" defaultValue="Basil" className={input.live} />
                  <p id="th-own-error" className="mt-2 flex items-center gap-2 text-sm font-semibold text-th-error">
                    <span aria-hidden className="grid size-5 place-items-center rounded-full bg-th-error text-xs text-th-surface">
                      !
                    </span>
                    Maya&rsquo;s already bringing basil. Try something new for the pool.
                  </p>
                </div>
              </div>

              <div id="bring" className={`${card} scroll-mt-6 overflow-hidden`}>
                <div className="space-y-3 border-b-2 border-th-ink bg-th-accent px-6 py-5">
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-th-display text-2xl font-extrabold">Bring your three</h3>
                    <span className="font-semibold">
                      {p.bringing.length} of {p.event.perGuest}
                    </span>
                  </div>
                  <Meter value={p.bringing.length} max={p.event.perGuest} />
                </div>
                <div className="p-4">
                  <Caption>Tabs and list rows</Caption>
                  <div role="tablist" aria-label="Ingredient category" className="flex gap-1 overflow-x-auto rounded-full border-2 border-th-ink bg-th-bg p-1">
                    {categories.map((c) => (
                      <button key={c} type="button" role="tab" aria-selected={p.ideaTab === c} onClick={() => p.setIdeaTab(c)} className={`${tab.live} shrink-0`}>
                        {c}
                      </button>
                    ))}
                  </div>
                  <ul className="mt-3 space-y-2" role="tabpanel">
                    {p.event.ideas
                      .filter((i) => i.category === p.ideaTab)
                      .map((i) => {
                        const on = p.bringing.includes(i.id);
                        return (
                          <li key={i.id} className={`flex items-center justify-between gap-4 rounded-2xl border-2 border-th-ink px-4 py-3 ${on ? "bg-th-selected/40" : "bg-th-surface"}`}>
                            <div className="min-w-0">
                              <p className="truncate font-semibold">{i.name}</p>
                              <p className="text-sm text-th-muted">
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
                              className={`${secondary.live} min-h-10 shrink-0 px-4 text-sm`}
                            >
                              {on ? "✓ Bringing" : "+ Bring"}
                            </button>
                          </li>
                        );
                      })}
                  </ul>
                  {p.full && <p className="mt-3 text-sm font-semibold">That&rsquo;s your three! Remove one to swap it out.</p>}
                </div>
              </div>

              <div className={`${card} overflow-hidden`}>
                <div className="flex items-baseline justify-between border-b-2 border-th-ink px-6 py-4">
                  <h3 className="font-th-display text-2xl font-extrabold">What I&rsquo;m bringing</h3>
                  <span className="text-sm font-semibold text-th-muted">Tray</span>
                </div>
                {p.mine.length === 0 ? (
                  <p className="px-6 py-6 text-th-muted">Nothing yet. Pick up to three ingredients to bring.</p>
                ) : (
                  <ul className="space-y-2 p-4">
                    {p.mine.map((i) => (
                      <li key={i.id} className="flex items-center justify-between gap-4 rounded-2xl bg-th-bg px-4 py-2.5">
                        <div className="min-w-0">
                          <p className="truncate font-semibold">{i.name}</p>
                          <p className="text-sm text-th-muted">{i.category}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => p.toggleBring(i.id)}
                          aria-label={`Remove ${i.name}`}
                          className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-full border-2 border-th-ink bg-th-surface text-lg leading-none hover:bg-th-canyon hover:text-th-surface active:translate-x-px active:translate-y-px focus-visible:outline-3 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-th-link"
                        >
                          ×
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="border-t-2 border-th-ink p-5">
                  <button type="button" disabled={p.mine.length === 0} onClick={p.confirm} className={`${primary.live} w-full`}>
                    Add mine to the pool
                  </button>
                  {p.confirmed && (
                    <p role="status" className="mt-3 flex items-center gap-2 font-semibold text-th-success">
                      <span aria-hidden className="grid size-6 place-items-center rounded-full bg-th-success text-sm text-th-surface">
                        ✓
                      </span>
                      You&rsquo;re in! See you {p.event.date.split(",")[0]}.
                    </p>
                  )}
                </div>
              </div>

              <div className={`${card} p-6`}>
                <Caption>Badges</Caption>
                <div className="flex flex-wrap gap-2">
                  <Badge tone="ink">I&rsquo;ll provide</Badge>
                  <Badge tone="sun">You</Badge>
                  <Badge tone="lime">Vegetarian</Badge>
                  <Badge>Contains nuts</Badge>
                  <Badge>After the bake</Badge>
                </div>
              </div>
            </div>

            {/* Right: the event, the pool, building */}
            <div className="space-y-8">
              <article className={`${card} overflow-hidden`}>
                <div className="relative h-36 overflow-hidden border-b-2 border-th-ink bg-th-sky" aria-hidden="true">
                  <div className="absolute -bottom-16 -left-6 size-40 rounded-full border-2 border-th-ink bg-th-accent" />
                  <div className="absolute -right-4 -bottom-10 h-28 w-64 rotate-[-8deg] rounded-[40%] border-2 border-th-ink bg-th-fern" />
                  <div className="absolute right-24 -bottom-14 h-28 w-48 rotate-[10deg] rounded-[45%] border-2 border-th-ink bg-th-lagoon" />
                </div>
                <div className="space-y-4 p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone="lime">Upcoming</Badge>
                    <span className="font-semibold text-th-muted">
                      {p.event.date} · {p.event.time}
                    </span>
                  </div>
                  <h3 className="font-th-display text-5xl font-extrabold leading-none tracking-tight">{p.event.theme}</h3>
                  <dl className="grid gap-2 text-center sm:grid-cols-3">
                    {[
                      ["I’ll provide", "Dough & sauce"],
                      ["You bring", `${p.event.perGuest} ingredients`],
                      ["The pool", `${p.pool.length} so far`],
                    ].map(([k, v]) => (
                      <div key={k} className="rounded-2xl border-2 border-th-ink bg-th-bg px-2 py-3">
                        <dt className="text-xs font-semibold text-th-muted">{k}</dt>
                        <dd className="font-th-display text-lg font-bold leading-tight">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="flex flex-wrap gap-3">
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
                <div className="border-b-2 border-th-ink bg-th-selected px-6 py-5">
                  <h3 className="font-th-display text-2xl font-extrabold">Build your creation</h3>
                  <p className="text-sm">Tap anything in tonight&rsquo;s pool to put it on your pizza.</p>
                </div>
                <div className="space-y-5 p-6">
                  <div className="flex flex-wrap gap-2">
                    {(["All", ...categories] as const).map((f) => (
                      <button key={f} type="button" aria-pressed={p.poolFilter === f} onClick={() => p.setPoolFilter(f)} className={chip.live}>
                        {f}
                      </button>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-x-6 gap-y-3">
                    <label className="flex cursor-pointer items-center gap-2.5 font-medium">
                      <input type="checkbox" className="th-check" checked={p.vegOnly} onChange={(e) => p.setVegOnly(e.target.checked)} />
                      Vegetarian
                    </label>
                    <label className="flex cursor-pointer items-center gap-2.5 font-medium">
                      <input type="checkbox" className="th-check" checked={p.noNuts} onChange={(e) => p.setNoNuts(e.target.checked)} />
                      No nuts
                    </label>
                    <label className="flex items-center gap-2.5 font-medium text-th-muted">
                      <input type="checkbox" className="th-check" disabled />
                      Gluten-free dough (ask me)
                    </label>
                  </div>
                  <Toggle checked={p.showNames} onChange={p.setShowNames} labelText="Show who brought what" />

                  <div className="space-y-2">
                    <p className="flex flex-wrap items-center gap-2 text-sm">
                      <Badge tone="ink">I&rsquo;ll provide</Badge>
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
                      <Badge tone="lime">The pool</Badge>
                      <span className="opacity-80">
                        Everything guests brought, {p.pool.length} so far. Take anything.
                      </span>
                    </p>
                    <ul className="flex flex-wrap gap-2" aria-label="Tonight's pool">
                      {p.visiblePool.map((i) => (
                        <li key={i.id}>
                          <button type="button" aria-pressed={p.creation.includes(i.id)} onClick={() => p.toggleCreation(i.id)} className={chip.live}>
                            {p.creation.includes(i.id) ? "✓ " : ""}
                            {i.name}
                            {p.showNames && <span className="text-xs font-medium text-th-muted">{i.broughtBy}</span>}
                          </button>
                        </li>
                      ))}
                    </ul>
                    {p.visiblePool.length === 0 && <p className="text-sm text-th-muted">Nothing in the pool matches. Try another filter.</p>}
                  </div>

                  <fieldset>
                    <legend className={`${label} mb-3`}>Crust</legend>
                    <div className="flex flex-wrap gap-6">
                      {[
                        ["thin", "Thin and crisp"],
                        ["thick", "Thick and chewy"],
                      ].map(([v, l]) => (
                        <label key={v} className="flex cursor-pointer items-center gap-2.5 font-medium">
                          <input type="radio" name="th-crust" className="th-radio" value={v} checked={p.crust === v} onChange={() => p.setCrust(v)} />
                          {l}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </div>

                <div className="border-t-2 border-th-ink bg-th-bg p-6">
                  <p className={`${label} text-th-muted`}>Your creation · {p.crust === "thin" ? "thin crust" : "thick crust"}</p>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border-2 border-th-ink bg-th-surface p-4">
                      <p className="text-sm font-semibold text-th-canyon">🔥 Into the oven</p>
                      <p className="mt-1 font-th-display text-lg font-bold leading-snug">{p.intoOven.length ? p.intoOven.join(", ") : "Nothing yet"}</p>
                    </div>
                    <div className="rounded-2xl border-2 border-th-ink bg-th-surface p-4">
                      <p className="text-sm font-semibold text-th-link">🌿 After the bake</p>
                      <p className="mt-1 font-th-display text-lg font-bold leading-snug">
                        {p.afterBake.length ? p.afterBake.join(", ") : <span className="font-th-sans text-base font-normal text-th-muted">Nothing yet</span>}
                      </p>
                    </div>
                  </div>
                  <p className={`${label} mt-5 mb-2 text-th-muted`}>Balance</p>
                  <ul className="space-y-1.5">
                    {tastes.map((t) => (
                      <li key={t} className="grid grid-cols-[3.5rem_1fr] items-center gap-3" aria-label={`${t}: ${p.tasteCount[t]}`}>
                        <span className="text-sm font-semibold">{t}</span>
                        <span className="h-4 overflow-hidden rounded-full border-2 border-th-ink bg-th-surface">
                          <span className={`block h-full rounded-full transition-[width] duration-300 ${tasteColors[t]}`} style={{ width: `${Math.min(p.tasteCount[t], 4) * 25}%` }} />
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 rounded-2xl bg-th-surface px-4 py-3 text-sm font-medium" aria-live="polite">
                    💡 {balanceNote(p.tasteCount)}
                  </p>
                </div>
              </div>

              <article className={`${card} overflow-hidden`}>
                <Caption>
                  <span className="block px-6 pt-5">Creation card · from past events</span>
                </Caption>
                <div className="grid gap-4 px-6 pb-6 sm:grid-cols-[9rem_1fr]">
                  <Image
                    src={pastCreation.image.src}
                    alt={pastCreation.image.alt}
                    width={pastCreation.image.w}
                    height={pastCreation.image.h}
                    sizes="9rem"
                    className="aspect-square w-full rounded-2xl border-2 border-th-ink object-cover object-[50%_75%] sm:w-36"
                  />
                  <div>
                    <Badge tone="sun">
                      {pastCreation.event} · {pastCreation.year}
                    </Badge>
                    <h3 className="mt-2 font-th-display text-2xl font-extrabold leading-tight">{pastCreation.name}</h3>
                    <p className="mt-1 text-sm text-th-muted">
                      Built by {pastCreation.builtBy} from {pastCreation.from.join(", ").toLowerCase()}
                    </p>
                  </div>
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
            className="m-auto w-[min(32rem,calc(100vw-2rem))] rounded-[18px] border-2 border-th-ink bg-th-surface p-0 text-th-ink shadow-th-lg backdrop:bg-th-ink/60"
            onClick={(e) => e.target === dialogRef.current && dialogRef.current.close()}
          >
            <HowItWorks onClose={() => dialogRef.current?.close()} />
          </dialog>
        </Section>

        <Section n="5" title="Control states" color="bg-th-lagoon text-th-surface">
          <div className={`${card} overflow-x-auto p-6`}>
            <table className="w-full min-w-[52rem] border-collapse text-left">
              <thead>
                <tr>
                  <th className="w-32" />
                  {controlStates.map((s) => (
                    <th key={s} scope="col" className={`${label} pb-4 text-th-muted capitalize`}>
                      {s}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="align-middle">
                <StateRow name="Primary" render={(s) => <span className={primary.state[s]}>{s === "selected" ? "✓ In the pool" : "Add to pool"}</span>} />
                <StateRow name="Secondary" render={(s) => <span className={secondary.state[s]}>{s === "selected" ? "✓ Bringing" : "+ Bring"}</span>} />
                <StateRow name="Filter chip" render={(s) => <span className={chip.state[s]}>Burrata</span>} />
                <StateRow name="Tab" render={(s) => <span className={tab.state[s]}>Cheese</span>} />
                <StateRow
                  name="Text input"
                  render={(s) => (input.state[s] ? <span className={`${input.state[s]} flex items-center text-th-muted`}>Search</span> : <span className="text-th-muted">—</span>)}
                />
              </tbody>
            </table>
            <p className="mt-4 text-sm text-th-muted">
              Hover lifts the sticker, press squashes it flat. Selected turns Anemone green, so the sunrise yellow always points to the
              next step.
            </p>
          </div>
        </Section>

        <Section n="6" title="UI states" color="bg-th-fern text-th-surface">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StatePanel title="Empty" stripe="bg-th-divider">
              <span aria-hidden className="mx-auto grid size-14 place-items-center rounded-full border-2 border-dashed border-th-ink text-2xl">
                🧺
              </span>
              <p className="mt-4 font-th-display text-2xl font-extrabold">The pool is empty</p>
              <p className="mt-1 text-sm text-th-muted">Be the first to bring something!</p>
            </StatePanel>
            <StatePanel title="Loading" stripe="bg-th-sky">
              <div className="mx-auto flex gap-2" aria-hidden>
                {["bg-th-canyon", "bg-th-accent", "bg-th-selected"].map((c, i) => (
                  <span key={c} className={`size-4 animate-bounce rounded-full border-2 border-th-ink motion-reduce:animate-none ${c}`} style={{ animationDelay: `${i * 120}ms` }} />
                ))}
              </div>
              <p className="mt-5 font-th-display text-2xl font-extrabold">Firing up the oven…</p>
              <p className="mt-1 text-sm text-th-muted">Gathering everyone&rsquo;s ingredients.</p>
            </StatePanel>
            <StatePanel title="Error" stripe="bg-th-canyon">
              <span aria-hidden className="mx-auto grid size-14 place-items-center rounded-full border-2 border-th-ink bg-th-canyon text-2xl font-extrabold text-th-surface">
                !
              </span>
              <p className="mt-4 font-th-display text-2xl font-extrabold text-th-error">Couldn&rsquo;t load the pool</p>
              <button type="button" className={`${secondary.live} mt-3 min-h-10 text-sm`}>
                Try again
              </button>
            </StatePanel>
            <StatePanel title="Success" stripe="bg-th-selected">
              <span aria-hidden className="mx-auto grid size-14 place-items-center rounded-full border-2 border-th-ink bg-th-selected text-2xl font-extrabold">
                ✓
              </span>
              <p className="mt-4 font-th-display text-2xl font-extrabold text-th-success">Your three are in!</p>
              <p className="mt-1 text-sm text-th-muted">See you Saturday.</p>
            </StatePanel>
          </div>
        </Section>
      </div>
    </main>
  );
}

function StateRow({ name, render }: { name: string; render: (s: ControlState) => ReactNode }) {
  return (
    <tr className="border-t-2 border-th-divider">
      <th scope="row" className="py-5 pr-4 text-sm font-semibold text-th-muted">
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

function StatePanel({ title, stripe, children }: { title: string; stripe: string; children: ReactNode }) {
  return (
    <div className={`${card} flex flex-col overflow-hidden`}>
      <div className={`h-3 border-b-2 border-th-ink ${stripe}`} />
      <div className="flex min-h-60 flex-1 flex-col justify-center p-6 text-center">{children}</div>
      <p className={`${label} border-t-2 border-th-ink px-4 py-2 text-th-muted`}>{title}</p>
    </div>
  );
}
