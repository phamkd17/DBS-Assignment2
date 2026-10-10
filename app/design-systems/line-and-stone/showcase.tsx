"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { contrast } from "@/lib/contrast";
import { categories, pastCreation, pizzaNight as event, tastes } from "@/lib/events";
import { balanceNote, howItWorks as steps, ingredientName, useLessons, usePotluck } from "@/lib/use-potluck";
import {
  chip,
  controlStates,
  input,
  label,
  link,
  primary,
  secondary,
  tab,
  type ControlState,
} from "@/components/line-and-stone/styles";

const SURFACE = "#F8F6F1";
const BG = "#ECE7DC";

const colorRoles = [
  { role: "Background", token: "ls-bg", hex: BG, note: "Page", ratio: { fg: "#1C1D1F", bg: BG, label: "Text on it" } },
  { role: "Surface", token: "ls-surface", hex: SURFACE, note: "Cards, inputs, panels", ratio: { fg: "#1C1D1F", bg: SURFACE, label: "Text on it" } },
  { role: "Text", token: "ls-ink", hex: "#1C1D1F", note: "Body, control lines, selected", ratio: { fg: "#1C1D1F", bg: SURFACE, label: "On surface" } },
  { role: "Muted", token: "ls-muted", hex: "#5E656E", note: "Secondary text, placeholders", ratio: { fg: "#5E656E", bg: SURFACE, label: "On surface" } },
  { role: "Border", token: "ls-border", hex: "#8A8377", note: "Dividers, card edges", ratio: { fg: "#8A8377", bg: SURFACE, label: "On surface · 3:1 min", min: 3 } },
  { role: "Accent", token: "ls-accent", hex: "#23449A", note: "Primary action only", ratio: { fg: SURFACE, bg: "#23449A", label: "Label on it" } },
  { role: "Error", token: "ls-error", hex: "#9A4A31", note: "Problems, invalid fields", ratio: { fg: "#9A4A31", bg: SURFACE, label: "On surface" } },
  { role: "Success", token: "ls-success", hex: "#3E6B45", note: "Confirmations", ratio: { fg: "#3E6B45", bg: SURFACE, label: "On surface" } },
];

const typeRoles = [
  { role: "Display", spec: "Instrument Serif · 400 · 64/64", className: "font-ls-serif text-5xl leading-none sm:text-[64px]", sample: "Your creation, your rules." },
  { role: "Heading", spec: "Instrument Serif · 400 · 32/38", className: "font-ls-serif text-[32px] leading-[1.2]", sample: "Pizza night · October 18" },
  { role: "Body", spec: "Jost · 400 · 16/26", className: "font-ls-sans text-base leading-relaxed", sample: "I’ll make the dough and sauce. You bring three toppings. Then build whatever you like from everything on the table." },
  { role: "Label", spec: "Jost · 500 · 11/16 · caps, +0.22em", className: label, sample: "You’re bringing · 2 of 3" },
];

const spacing = [4, 8, 12, 16, 24, 32, 48, 64];
function Section({ n, title, id, children }: { n: string; title: string; id?: string; children: ReactNode }) {
  return (
    <section id={id} className="border-t border-ls-ink pt-6 pb-14">
      <h2 className={`${label} mb-8 flex gap-4`}>
        <span className="text-ls-muted">{n}</span>
        {title}
      </h2>
      {children}
    </section>
  );
}

function Caption({ children }: { children: ReactNode }) {
  return <p className={`${label} mb-3 text-ls-muted`}>{children}</p>;
}

function Badge({ children, tone = "outline" }: { children: ReactNode; tone?: "outline" | "solid" }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 font-ls-sans text-[10px] font-medium uppercase tracking-[0.18em] ${
        tone === "solid" ? "bg-ls-ink text-ls-surface" : "border border-ls-ink text-ls-ink"
      }`}
    >
      {children}
    </span>
  );
}

function Toggle({ checked, onChange, labelText }: { checked: boolean; onChange: (v: boolean) => void; labelText: string }) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-3 font-ls-sans text-[15px]">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className="relative h-6 w-11 shrink-0 cursor-pointer rounded-full border border-ls-ink bg-ls-surface transition-colors hover:bg-[color-mix(in_srgb,var(--color-ls-ink)_6%,var(--color-ls-surface))] focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-ls-ink aria-checked:bg-ls-ink"
      >
        <span
          className={`absolute top-1/2 left-[3px] size-4 -translate-y-1/2 rounded-full transition-transform duration-150 ${
            checked ? "translate-x-5 bg-ls-surface" : "bg-ls-ink"
          }`}
        />
      </button>
      {labelText}
    </label>
  );
}

/** Three-segment meter: how many of your ingredients you've claimed. */
function Meter({ value, max }: { value: number; max: number }) {
  return (
    <div className="flex gap-1" role="meter" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max} aria-label="Ingredients claimed">
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={`h-1 flex-1 ${i < value ? "bg-ls-ink" : "bg-ls-rule/50"}`} />
      ))}
    </div>
  );
}

function HowItWorks({ onClose }: { onClose?: () => void }) {
  return (
    <div className="bg-ls-surface">
      <div className="flex items-center justify-between border-b border-ls-border px-5 py-3">
        <span className={`${label} text-ls-muted`}>How it works</span>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid size-9 cursor-pointer place-items-center text-xl leading-none text-ls-ink hover:bg-ls-ink/[0.06] focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-ls-ink"
          >
            ×
          </button>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-ls-serif text-[32px] leading-[1.2]">{event.theme}</h3>
        <p className="text-sm text-ls-muted">
          {event.date} · {event.time}
        </p>
        <ol className="mt-5 divide-y divide-ls-border border-y border-ls-border">
          {steps.map(([head, rest], i) => (
            <li key={head} className="flex gap-4 py-3">
              <span className="font-ls-serif text-2xl leading-none text-ls-muted">{i + 1}</span>
              <p className="text-[15px] leading-relaxed">
                <span className="font-medium">{head}</span> {rest}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/** Food-science lessons: pick a principle, read why it works, and see which ingredients it applies to. */
function Lessons({ poolIds }: { poolIds: string[] }) {
  const { current, lesson, seen, go, last } = useLessons();

  return (
    <div className="grid border border-ls-ink bg-ls-surface md:grid-cols-[17rem_1fr]">
      <div className="border-b border-ls-border md:border-r md:border-b-0">
        <div className="border-b border-ls-border px-5 py-4">
          <h3 className="font-ls-serif text-2xl">Why it works</h3>
          <p className="text-sm text-ls-muted">
            {seen.length} of {event.lessons.length} read
          </p>
        </div>
        <ol>
          {event.lessons.map((l, i) => (
            <li key={l.id} className="border-b border-ls-border last:border-b-0">
              <button
                type="button"
                aria-current={i === current ? "step" : undefined}
                onClick={() => go(i)}
                className="flex w-full cursor-pointer items-baseline gap-3 px-5 py-3 text-left text-[15px] transition-colors hover:bg-ls-ink/[0.04] active:bg-ls-ink/[0.08] focus-visible:outline-2 focus-visible:outline-solid focus-visible:-outline-offset-2 focus-visible:outline-ls-ink aria-[current=step]:bg-ls-ink aria-[current=step]:text-ls-surface aria-[current=step]:hover:bg-ls-ink"
              >
                <span className="font-ls-serif text-xl leading-none">{i + 1}</span>
                <span className="flex-1">{l.title}</span>
                {seen.includes(l.id) && (
                  <span aria-label="read" className="text-xs">
                    ✓
                  </span>
                )}
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div className="flex flex-col p-6" aria-live="polite">
        <p className={`${label} text-ls-muted`}>
          Lesson {current + 1} of {event.lessons.length}
        </p>
        <h4 className="mt-2 font-ls-serif text-[32px] leading-[1.15]">{lesson.title}</h4>
        <p className="mt-4 max-w-prose text-base leading-relaxed">{lesson.principle}</p>
        <div className="mt-5 border-l-2 border-ls-ink pl-4">
          <p className={label}>At the table</p>
          <p className="mt-1 max-w-prose text-[15px] leading-relaxed">{lesson.takeaway}</p>
        </div>
        {lesson.related.length > 0 && (
          <div className="mt-5">
            <p className={`${label} mb-2 text-ls-muted`}>Applies to</p>
            <ul className="flex flex-wrap gap-2">
              {lesson.related.map((id) => (
                <li key={id}>
                  <Badge tone={poolIds.includes(id) ? "solid" : "outline"}>
                    {ingredientName(id)}
                    {poolIds.includes(id) ? " · in the pool" : ""}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="mt-auto flex gap-3 pt-6">
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
    </div>
  );
}

export default function Showcase() {
  const {
    bringing, full, mine, pool, visiblePool, confirmed, confirm, toggleBring, ideaTab, setIdeaTab, poolFilter, setPoolFilter,
    creation, toggleCreation, showNames, setShowNames, vegOnly, setVegOnly, noNuts, setNoNuts, crust, setCrust,
    intoOven, afterBake, tasteCount,
  } = usePotluck();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openHow = () => dialogRef.current?.showModal();

  return (
    <main className="min-h-screen bg-ls-bg font-ls-sans text-ls-ink">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
        <nav className="flex gap-6 text-sm">
          <Link href="/" className={link}>
            ← Hub
          </Link>
          <Link href="/mood-boards/line-and-stone" className={link}>
            Mood board
          </Link>
        </nav>

        <header className="mt-10 mb-14">
          <p className={`${label} text-ls-muted`}>Design system</p>
          <h1 className="mt-3 font-ls-serif text-6xl leading-none sm:text-8xl">Line &amp; Stone</h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ls-muted">
            A quiet, precise kit for themed potluck nights where the guest is the chef. Ink hairlines instead of
            shadows, square corners, and one blue saved for the action that matters: bringing your ingredients to the
            table.
          </p>
        </header>

        <Section n="01" title="Color roles">
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4">
            {colorRoles.map((c) => {
              const r = contrast(c.ratio.fg, c.ratio.bg);
              const pass = r >= (c.ratio.min ?? 4.5);
              return (
                <div key={c.role}>
                  <div className="aspect-[4/3] border border-ls-ink" style={{ background: c.hex }} />
                  <p className="mt-3 font-ls-serif text-2xl leading-tight">{c.role}</p>
                  <p className="text-sm text-ls-muted">
                    {c.token} · {c.hex}
                  </p>
                  <p className="mt-1 text-sm text-ls-muted">{c.note}</p>
                  <p className="mt-2 text-sm">
                    <span className="font-medium">{r.toFixed(1)}:1</span>{" "}
                    <span className="text-ls-muted">
                      {c.ratio.label} {pass ? "· passes" : "· fails"}
                    </span>
                  </p>
                </div>
              );
            })}
          </div>
        </Section>

        <Section n="02" title="Type roles">
          <div className="divide-y divide-ls-border border-y border-ls-border">
            {typeRoles.map((t) => (
              <div key={t.role} className="grid gap-3 py-6 sm:grid-cols-[14rem_1fr] sm:items-baseline">
                <div>
                  <p className={label}>{t.role}</p>
                  <p className="mt-1 text-sm text-ls-muted">{t.spec}</p>
                </div>
                <p className={t.className}>{t.sample}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section n="03" title="Spacing and shape">
          <div className="grid gap-12 lg:grid-cols-3">
            <div>
              <Caption>Spacing scale · px</Caption>
              <div className="flex items-end gap-3">
                {spacing.map((s) => (
                  <div key={s} className="flex flex-col items-center gap-2">
                    <div className="w-4 bg-ls-ink" style={{ height: s }} />
                    <span className="text-xs text-ls-muted">{s}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Caption>Corners</Caption>
              <div className="flex gap-6">
                <div>
                  <div className="size-16 border border-ls-ink bg-ls-surface" />
                  <p className="mt-2 text-sm">0px</p>
                  <p className="text-xs text-ls-muted">Everything</p>
                </div>
                <div>
                  <div className="size-16 rounded-full border border-ls-ink bg-ls-surface" />
                  <p className="mt-2 text-sm">Full</p>
                  <p className="text-xs text-ls-muted">Radio, toggle only</p>
                </div>
              </div>
            </div>
            <div>
              <Caption>Lines and shadow</Caption>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-3">
                  <span className="h-px w-12 bg-ls-ink" /> 1px Ink · controls
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-px w-12 bg-ls-border" /> 1px Border · dividers, cards
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-0.5 w-12 bg-ls-ink" /> 2px Ink · focus ring, selected tab
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-12 text-center text-ls-muted">—</span> No shadows. A hairline does the job.
                </li>
              </ul>
            </div>
          </div>
        </Section>

        <Section n="04" title="Components">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Left: claiming what you'll bring */}
            <div className="space-y-10">
              <div>
                <Caption>Buttons and link</Caption>
                <div className="flex flex-wrap items-center gap-3">
                  <button type="button" className={primary.live}>
                    Bring this
                  </button>
                  <button type="button" className={secondary.live}>
                    See the pool
                  </button>
                  <button type="button" onClick={openHow} className={`${link} cursor-pointer`}>
                    How it works →
                  </button>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="ls-search" className={`${label} mb-2 block`}>
                    Search ingredients
                  </label>
                  <input id="ls-search" type="search" placeholder="Try “basil”" className={input.live} />
                </div>
                <div>
                  <label htmlFor="ls-sort" className={`${label} mb-2 block`}>
                    Sort the pool
                  </label>
                  <div className="relative">
                    <select id="ls-sort" className={`${input.live} cursor-pointer appearance-none pr-9`} defaultValue="category">
                      <option value="category">By category</option>
                      <option value="guest">By guest</option>
                      <option value="az">A to Z</option>
                    </select>
                    <span aria-hidden className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-xs">
                      ▾
                    </span>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="ls-own" className={`${label} mb-2 block`}>
                    Bringing something else?
                  </label>
                  <input id="ls-own" aria-invalid="true" aria-describedby="ls-own-error" defaultValue="Basil" className={input.live} />
                  <p id="ls-own-error" className="mt-2 text-sm text-ls-error">
                    Maya&rsquo;s already bringing basil. Try something new for the pool.
                  </p>
                </div>
              </div>

              <div id="bring" className="scroll-mt-6">
                <Caption>Tabs and list rows · ideas to bring</Caption>
                <div className="mb-3 flex items-center justify-between gap-4">
                  <p className={label}>
                    You&rsquo;re bringing · {bringing.length} of {event.perGuest}
                  </p>
                  <div className="w-24">
                    <Meter value={bringing.length} max={event.perGuest} />
                  </div>
                </div>
                <div role="tablist" aria-label="Ingredient category" className="flex gap-5 overflow-x-auto border-b border-ls-border">
                  {categories.map((c) => (
                    <button
                      key={c}
                      type="button"
                      role="tab"
                      aria-selected={ideaTab === c}
                      onClick={() => setIdeaTab(c)}
                      className={`${tab.live} shrink-0`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
                <ul className="divide-y divide-ls-border border-b border-ls-border" role="tabpanel">
                  {event.ideas
                    .filter((i) => i.category === ideaTab)
                    .map((i) => {
                      const on = bringing.includes(i.id);
                      return (
                        <li key={i.id} className="flex items-center justify-between gap-4 py-3">
                          <div className="min-w-0">
                            <p className="truncate text-[15px]">{i.name}</p>
                            <p className="text-sm text-ls-muted">
                              {i.vegetarian ? "Vegetarian" : "Meat & fish"}
                              {i.nuts ? " · Contains nuts" : ""}
                            </p>
                          </div>
                          <button
                            type="button"
                            aria-pressed={on}
                            disabled={!on && full}
                            aria-label={`${on ? "Stop bringing" : "Bring"} ${i.name}`}
                            onClick={() => toggleBring(i.id)}
                            className={`${secondary.live} min-h-9 shrink-0 px-4`}
                          >
                            {on ? "✓ Bringing" : "Bring"}
                          </button>
                        </li>
                      );
                    })}
                </ul>
                {full && <p className="mt-2 text-sm text-ls-muted">That&rsquo;s your three. Remove one to swap it out.</p>}
              </div>

              <div>
                <Caption>Tray · what you&rsquo;re bringing</Caption>
                <div className="border border-ls-ink bg-ls-surface">
                  <div className="space-y-3 border-b border-ls-border px-5 py-4">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-ls-serif text-2xl">What I&rsquo;m bringing</h3>
                      <span className="text-sm text-ls-muted">
                        {bringing.length} of {event.perGuest}
                      </span>
                    </div>
                    <Meter value={bringing.length} max={event.perGuest} />
                  </div>
                  {mine.length === 0 ? (
                    <p className="px-5 py-6 text-[15px] text-ls-muted">Nothing yet. Pick up to three ingredients to bring.</p>
                  ) : (
                    <ul className="divide-y divide-ls-border">
                      {mine.map((i) => (
                        <li key={i.id} className="flex items-center justify-between gap-4 px-5 py-3">
                          <div className="min-w-0">
                            <p className="truncate text-[15px]">{i.name}</p>
                            <p className="text-sm text-ls-muted">{i.category}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => toggleBring(i.id)}
                            aria-label={`Remove ${i.name}`}
                            className="grid size-9 shrink-0 cursor-pointer place-items-center text-xl leading-none hover:bg-ls-ink/[0.06] active:bg-ls-ink/[0.12] focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-ls-ink"
                          >
                            ×
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="border-t border-ls-border p-5">
                    <button type="button" disabled={mine.length === 0} onClick={confirm} className={`${primary.live} w-full`}>
                      Add mine to the pool
                    </button>
                    {confirmed && (
                      <p role="status" className="mt-3 text-sm text-ls-success">
                        ✓ You&rsquo;re in. See you {event.date.split(",")[0]}.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <Caption>Badges</Caption>
                <div className="flex flex-wrap gap-2">
                  <Badge tone="solid">I&rsquo;ll provide</Badge>
                  <Badge>You</Badge>
                  <Badge>Vegetarian</Badge>
                  <Badge>Contains nuts</Badge>
                </div>
              </div>
            </div>

            {/* Right: the event, the pool, and building your creation */}
            <div className="space-y-10">
              <div>
                <Caption>Event card</Caption>
                <article className="border border-ls-border bg-ls-surface">
                  <svg viewBox="0 0 240 36" className="block w-full border-b border-ls-border bg-ls-bg" aria-hidden="true">
                    {Array.from({ length: 10 }, (_, i) => (
                      <path key={i} d={`M${6 + i * 23.4} 36 V20 A9 9 0 0 1 ${24 + i * 23.4} 20 V36`} fill="none" stroke="#1C1D1F" strokeWidth="0.6" />
                    ))}
                  </svg>
                  <div className="space-y-3 p-5">
                    <div className="flex items-center justify-between gap-3">
                      <span className={`${label} text-ls-muted`}>
                        {event.date} · {event.time}
                      </span>
                      <Badge>Upcoming</Badge>
                    </div>
                    <h3 className="font-ls-serif text-[40px] leading-none">{event.theme}</h3>
                    <dl className="grid grid-cols-[6rem_1fr] gap-y-1 text-[15px]">
                      <dt className="text-ls-muted">I&rsquo;ll provide</dt>
                      <dd>{event.base.join(" & ")}</dd>
                      <dt className="text-ls-muted">You bring</dt>
                      <dd>{event.perGuest} ingredients</dd>
                      <dt className="text-ls-muted">The pool</dt>
                      <dd>
                        {pool.length} ingredients from {event.guests.length} guests
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
              </div>

              <div id="build" className="scroll-mt-6">
                <Caption>Pool and builder · filter chips, checkboxes, radio, toggle</Caption>
                <div className="border border-ls-ink bg-ls-surface">
                  <div className="border-b border-ls-border px-5 py-4">
                    <h3 className="font-ls-serif text-2xl">Build your creation</h3>
                    <p className="text-sm text-ls-muted">Tap anything in tonight&rsquo;s pool to put it on your pizza.</p>
                  </div>
                  <div className="space-y-5 p-5">
                    <div className="flex flex-wrap gap-2">
                      {(["All", ...categories] as const).map((f) => (
                        <button key={f} type="button" aria-pressed={poolFilter === f} onClick={() => setPoolFilter(f)} className={chip.live}>
                          {f}
                        </button>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-x-6 gap-y-3 text-[15px]">
                      <label className="flex cursor-pointer items-center gap-3">
                        <input type="checkbox" className="ls-check" checked={vegOnly} onChange={(e) => setVegOnly(e.target.checked)} />
                        Vegetarian
                      </label>
                      <label className="flex cursor-pointer items-center gap-3">
                        <input type="checkbox" className="ls-check" checked={noNuts} onChange={(e) => setNoNuts(e.target.checked)} />
                        No nuts
                      </label>
                      <label className="flex items-center gap-3 text-ls-muted">
                        <input type="checkbox" className="ls-check" disabled />
                        Gluten-free dough (ask me)
                      </label>
                    </div>
                    <Toggle checked={showNames} onChange={setShowNames} labelText="Show who brought what" />

                    <p className="flex flex-wrap items-center gap-2 border-y border-dashed border-ls-border py-3 text-[15px]">
                      <Badge tone="solid">On every pizza</Badge>
                      {event.base.join(" & ")}
                    </p>
                    <ul className="flex flex-wrap gap-2" aria-label="Tonight's pool">
                      {visiblePool.map((i) => (
                        <li key={i.id}>
                          <button type="button" aria-pressed={creation.includes(i.id)} onClick={() => toggleCreation(i.id)} className={chip.live}>
                            {i.name}
                            {showNames && <span className="text-[11px] opacity-70">· {i.broughtBy}</span>}
                          </button>
                        </li>
                      ))}
                    </ul>
                    {visiblePool.length === 0 && <p className="text-sm text-ls-muted">Nothing in the pool matches. Try another filter.</p>}

                    <fieldset>
                      <legend className={`${label} mb-3`}>Crust</legend>
                      <div className="flex gap-6 text-[15px]">
                        {[
                          ["thin", "Thin and crisp"],
                          ["thick", "Thick and chewy"],
                        ].map(([v, l]) => (
                          <label key={v} className="flex cursor-pointer items-center gap-3">
                            <input type="radio" name="crust" className="ls-radio" value={v} checked={crust === v} onChange={() => setCrust(v)} />
                            {l}
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  </div>
                  <div className="border-t border-ls-border p-5">
                    <p className={`${label} text-ls-muted`}>Your creation · {crust === "thin" ? "thin crust" : "thick crust"}</p>
                    <dl className="mt-3 space-y-3">
                      <div>
                        <dt className="text-sm text-ls-muted">Into the oven</dt>
                        <dd className="font-ls-serif text-2xl leading-snug">{intoOven.join(", ")}</dd>
                      </div>
                      <div>
                        <dt className="text-sm text-ls-muted">After the bake</dt>
                        <dd className="font-ls-serif text-2xl leading-snug">
                          {afterBake.length ? afterBake.join(", ") : <span className="text-ls-muted">Nothing yet</span>}
                        </dd>
                      </div>
                    </dl>
                    <div className="mt-5 border-t border-ls-border pt-4">
                      <p className={`${label} mb-3 text-ls-muted`}>Balance</p>
                      <ul className="grid grid-cols-5 gap-2">
                        {tastes.map((t) => (
                          <li key={t} className="text-center" aria-label={`${t}: ${tasteCount[t]}`}>
                            <div className="mb-1.5 flex h-10 flex-col-reverse gap-0.5">
                              {Array.from({ length: 4 }, (_, k) => (
                                <span key={k} className={`h-2 ${k < tasteCount[t] ? "bg-ls-ink" : "bg-ls-rule/40"}`} />
                              ))}
                            </div>
                            <span className="text-xs text-ls-muted">{t}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="mt-3 text-sm" aria-live="polite">
                        {balanceNote(tasteCount)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Caption>Creation card · from past events</Caption>
                <article className="grid border border-ls-border bg-ls-surface sm:grid-cols-[40%_1fr]">
                  <Image
                    src={pastCreation.image.src}
                    alt={pastCreation.image.alt}
                    width={pastCreation.image.w}
                    height={pastCreation.image.h}
                    sizes="(min-width: 1024px) 14rem, 100vw"
                    className="aspect-[4/3] h-full w-full object-cover object-[50%_75%] sm:aspect-auto"
                  />
                  <div className="space-y-2 p-5">
                    <span className={`${label} text-ls-muted`}>
                      {pastCreation.event} · {pastCreation.year}
                    </span>
                    <h3 className="font-ls-serif text-[28px] leading-[1.15]">{pastCreation.name}</h3>
                    <p className="text-sm text-ls-muted">Built by {pastCreation.builtBy} from {pastCreation.from.join(", ").toLowerCase()}</p>
                  </div>
                </article>
              </div>
            </div>
          </div>

          <div id="lessons" className="mt-12 scroll-mt-6">
            <Caption>Lessons · the food science behind tonight&rsquo;s theme</Caption>
            <Lessons poolIds={pool.map((i) => i.id)} />
          </div>

          <div className="mt-12">
            <Caption>Modal · opens from “How it works”</Caption>
            <div className="max-w-lg border border-ls-ink">
              <HowItWorks />
            </div>
          </div>

          <dialog
            ref={dialogRef}
            aria-label="How it works"
            className="m-auto w-[min(32rem,calc(100vw-2rem))] border border-ls-ink bg-ls-surface p-0 text-ls-ink backdrop:bg-ls-ink/50"
            onClick={(e) => e.target === dialogRef.current && dialogRef.current.close()}
          >
            <HowItWorks onClose={() => dialogRef.current?.close()} />
          </dialog>
        </Section>

        <Section n="05" title="Control states">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[46rem] border-collapse text-left">
              <thead>
                <tr>
                  <th className="w-36" />
                  {controlStates.map((s) => (
                    <th key={s} scope="col" className={`${label} pb-4 font-medium text-ls-muted capitalize`}>
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
                  render={(s) =>
                    input.state[s] ? <span className={`${input.state[s]} flex items-center text-ls-muted`}>Search</span> : <span className="text-ls-muted">—</span>
                  }
                />
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-ls-muted">
            Disabled “Bring” is what you see once you&rsquo;ve claimed your three. Selected turns ink, so the blue always points to
            the next step.
          </p>
        </Section>

        <Section n="06" title="UI states">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatePanel title="Empty">
              <span aria-hidden className="mx-auto block size-10 rounded-full border border-dashed border-ls-border" />
              <p className="mt-4 font-ls-serif text-2xl">The pool is empty</p>
              <p className="mt-1 text-sm text-ls-muted">Be the first to bring something.</p>
            </StatePanel>
            <StatePanel title="Loading">
              <div className="h-px w-full overflow-hidden bg-ls-border">
                <div className="ls-progress h-px w-2/5 bg-ls-ink" />
              </div>
              <p className="mt-5 font-ls-serif text-2xl">Setting the table…</p>
              <p className="mt-1 text-sm text-ls-muted">Gathering everyone&rsquo;s ingredients.</p>
            </StatePanel>
            <StatePanel title="Error">
              <span aria-hidden className="mx-auto grid size-10 place-items-center rounded-full border border-ls-error text-ls-error">
                !
              </span>
              <p className="mt-4 font-ls-serif text-2xl text-ls-error">Couldn&rsquo;t load the pool</p>
              <button type="button" className={`${secondary.live} mt-3 min-h-9 px-4`}>
                Try again
              </button>
            </StatePanel>
            <StatePanel title="Success">
              <span aria-hidden className="mx-auto grid size-10 place-items-center rounded-full bg-ls-success text-ls-surface">
                ✓
              </span>
              <p className="mt-4 font-ls-serif text-2xl text-ls-success">Your three are in</p>
              <p className="mt-1 text-sm text-ls-muted">See you Saturday.</p>
            </StatePanel>
          </div>
        </Section>
      </div>
    </main>
  );
}

function StateRow({ name, render }: { name: string; render: (s: ControlState) => ReactNode }) {
  return (
    <tr className="border-t border-ls-border">
      <th scope="row" className="py-4 pr-4 text-sm font-normal text-ls-muted">
        {name}
      </th>
      {controlStates.map((s) => (
        <td key={s} className="py-4 pr-4">
          {render(s)}
        </td>
      ))}
    </tr>
  );
}

function StatePanel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <div className="flex min-h-52 flex-col justify-center border border-ls-border bg-ls-surface p-6 text-center">{children}</div>
      <p className={`${label} mt-3 text-ls-muted`}>{title}</p>
    </div>
  );
}
