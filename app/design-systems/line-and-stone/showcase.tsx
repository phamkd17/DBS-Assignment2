"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type ReactNode } from "react";
import { contrast } from "@/lib/contrast";
import { dishes, type Course, type Dish } from "@/lib/dishes";
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
  { role: "Display", spec: "Instrument Serif · 400 · 64/64", className: "font-ls-serif text-5xl leading-none sm:text-[64px]", sample: "Your plate, your rules." },
  { role: "Heading", spec: "Instrument Serif · 400 · 32/38", className: "font-ls-serif text-[32px] leading-[1.2]", sample: "Tonight's dishes" },
  { role: "Body", spec: "Jost · 400 · 16/26", className: "font-ls-sans text-base leading-relaxed", sample: "Pick a starter, a main, and something sweet. I'll cook whatever you choose." },
  { role: "Label", spec: "Jost · 500 · 11/16 · caps, +0.22em", className: label, sample: "Your plate · 3 dishes" },
];

const spacing = [4, 8, 12, 16, 24, 32, 48, 64];
const courses: Course[] = ["Starter", "Main", "Dessert"];
const filters = ["All", "Seafood", "Vegetarian", "Pasta", "Sweet"];

function Section({ n, title, children }: { n: string; title: string; children: ReactNode }) {
  return (
    <section className="border-t border-ls-ink pt-6 pb-14">
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

function Toggle({ checked, onChange, labelText, disabled }: { checked: boolean; onChange?: (v: boolean) => void; labelText: string; disabled?: boolean }) {
  return (
    <label className={`inline-flex items-center gap-3 font-ls-sans text-[15px] ${disabled ? "text-ls-muted" : "cursor-pointer"}`}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className="relative h-6 w-11 shrink-0 cursor-pointer rounded-full border border-ls-ink bg-ls-surface transition-colors hover:bg-[color-mix(in_srgb,var(--color-ls-ink)_6%,var(--color-ls-surface))] focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-ls-ink aria-checked:bg-ls-ink disabled:cursor-not-allowed disabled:border-ls-border disabled:bg-ls-disabled"
      >
        <span
          className={`absolute top-1/2 left-[3px] size-4 -translate-y-1/2 rounded-full transition-transform duration-150 ${
            checked ? "translate-x-5 bg-ls-surface" : "bg-ls-ink"
          } ${disabled ? "bg-ls-border" : ""}`}
        />
      </button>
      {labelText}
    </label>
  );
}

function DishDetail({ dish, onClose, onAdd, added }: { dish: Dish; onClose?: () => void; onAdd: () => void; added: boolean }) {
  return (
    <div className="bg-ls-surface">
      <div className="flex items-center justify-between border-b border-ls-border px-5 py-3">
        <span className={`${label} text-ls-muted`}>{dish.course}</span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="grid size-9 cursor-pointer place-items-center text-xl leading-none text-ls-ink hover:bg-ls-ink/[0.06] focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-ls-ink"
        >
          ×
        </button>
      </div>
      <Image
        src={dish.image.src}
        alt={dish.image.alt}
        width={dish.image.w}
        height={dish.image.h}
        sizes="(min-width: 640px) 32rem, 100vw"
        className="aspect-[16/10] h-auto w-full object-cover"
      />
      <div className="space-y-4 p-5">
        <h3 className="font-ls-serif text-[32px] leading-[1.2] text-ls-ink">{dish.name}</h3>
        <p className="font-ls-sans text-base leading-relaxed text-ls-ink">{dish.description}</p>
        <div className="flex flex-wrap gap-2">
          {dish.favorite && <Badge tone="solid">Guest favorite</Badge>}
          {dish.tags.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
        <p className="font-ls-sans text-sm text-ls-muted">First made {dish.firstMade}</p>
        <button type="button" aria-pressed={added} onClick={onAdd} className={`${primary.live} w-full`}>
          {added ? "✓ On my plate" : "Add to my plate"}
        </button>
      </div>
    </div>
  );
}

export default function Showcase() {
  const [plate, setPlate] = useState<string[]>(["baked-oysters", "farfalle"]);
  const [sent, setSent] = useState(false);
  const [activeCourse, setActiveCourse] = useState<Course>("Main");
  const [activeFilters, setActiveFilters] = useState<string[]>(["All"]);
  const [veg, setVeg] = useState(true);
  const [noNuts, setNoNuts] = useState(false);
  const [portion, setPortion] = useState("taste");
  const [seasonal, setSeasonal] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const featured = dishes.find((d) => d.id === "farfalle")!;
  const togglePlate = (id: string) => {
    setSent(false);
    setPlate((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  };
  const toggleFilter = (f: string) =>
    setActiveFilters((cur) => {
      if (f === "All") return ["All"];
      const next = cur.includes(f) ? cur.filter((x) => x !== f) : [...cur.filter((x) => x !== "All"), f];
      return next.length ? next : ["All"];
    });
  const plateDishes = plate.map((id) => dishes.find((d) => d.id === id)!).filter(Boolean);

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
            A quiet, precise kit for a table where the guest is the chef. Ink hairlines instead of shadows, square
            corners, and one blue reserved for the action that matters: adding a dish to your plate.
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
            <div className="space-y-10">
              <div>
                <Caption>Buttons and link</Caption>
                <div className="flex flex-wrap items-center gap-3">
                  <button type="button" className={primary.live}>
                    Add to my plate
                  </button>
                  <button type="button" className={secondary.live}>
                    See all dishes
                  </button>
                  <a href="#ui-states" className={link}>
                    How it works →
                  </a>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="ls-search" className={`${label} mb-2 block`}>
                    Search dishes
                  </label>
                  <input id="ls-search" type="search" placeholder="Try “oysters”" className={input.live} />
                </div>
                <div>
                  <label htmlFor="ls-sort" className={`${label} mb-2 block`}>
                    Sort by
                  </label>
                  <div className="relative">
                    <select id="ls-sort" className={`${input.live} cursor-pointer appearance-none pr-9`} defaultValue="loved">
                      <option value="loved">Most loved</option>
                      <option value="new">Newest</option>
                      <option value="az">A to Z</option>
                    </select>
                    <span aria-hidden className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-xs">
                      ▾
                    </span>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="ls-note" className={`${label} mb-2 block`}>
                    Anything I should know?
                  </label>
                  <input id="ls-note" aria-invalid="true" aria-describedby="ls-note-error" defaultValue="Allergic to" className={input.live} />
                  <p id="ls-note-error" className="mt-2 text-sm text-ls-error">
                    Tell me what you&rsquo;re allergic to so I can plan around it.
                  </p>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <fieldset>
                  <legend className={`${label} mb-3`}>Dietary</legend>
                  <div className="space-y-3 text-[15px]">
                    <label className="flex cursor-pointer items-center gap-3">
                      <input type="checkbox" className="ls-check" checked={veg} onChange={(e) => setVeg(e.target.checked)} />
                      Vegetarian
                    </label>
                    <label className="flex cursor-pointer items-center gap-3">
                      <input type="checkbox" className="ls-check" checked={noNuts} onChange={(e) => setNoNuts(e.target.checked)} />
                      No nuts
                    </label>
                    <label className="flex items-center gap-3 text-ls-muted">
                      <input type="checkbox" className="ls-check" disabled />
                      Gluten-free (ask me)
                    </label>
                  </div>
                </fieldset>
                <fieldset>
                  <legend className={`${label} mb-3`}>Portion</legend>
                  <div className="space-y-3 text-[15px]">
                    {[
                      ["taste", "A taste"],
                      ["full", "A full plate"],
                    ].map(([v, l]) => (
                      <label key={v} className="flex cursor-pointer items-center gap-3">
                        <input type="radio" name="portion" className="ls-radio" value={v} checked={portion === v} onChange={() => setPortion(v)} />
                        {l}
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>

              <Toggle checked={seasonal} onChange={setSeasonal} labelText="Only show what's in season" />

              <div>
                <Caption>Tabs and list rows</Caption>
                <div role="tablist" aria-label="Course" className="flex gap-6 border-b border-ls-border">
                  {courses.map((c) => (
                    <button
                      key={c}
                      type="button"
                      role="tab"
                      aria-selected={activeCourse === c}
                      onClick={() => setActiveCourse(c)}
                      className={tab.live}
                    >
                      {c}s
                    </button>
                  ))}
                </div>
                <ul className="divide-y divide-ls-border border-b border-ls-border" role="tabpanel">
                  {dishes
                    .filter((d) => d.course === activeCourse)
                    .map((d) => {
                      const added = plate.includes(d.id);
                      return (
                        <li key={d.id} className="flex items-center justify-between gap-4 py-3">
                          <div className="min-w-0">
                            <p className="truncate text-[15px]">{d.name}</p>
                            <p className="text-sm text-ls-muted">{d.tags.join(" · ")}</p>
                          </div>
                          <button
                            type="button"
                            aria-pressed={added}
                            aria-label={`${added ? "Remove" : "Add"} ${d.name}`}
                            onClick={() => togglePlate(d.id)}
                            className={`${secondary.live} min-h-9 shrink-0 px-4`}
                          >
                            {added ? "✓ Added" : "Add"}
                          </button>
                        </li>
                      );
                    })}
                </ul>
              </div>

              <div>
                <Caption>Filter chips</Caption>
                <div className="flex flex-wrap gap-2">
                  {filters.map((f) => (
                    <button key={f} type="button" aria-pressed={activeFilters.includes(f)} onClick={() => toggleFilter(f)} className={chip.live}>
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Caption>Badges</Caption>
                <div className="flex flex-wrap gap-2">
                  <Badge tone="solid">Guest favorite</Badge>
                  <Badge>New</Badge>
                  <Badge>In season</Badge>
                  <Badge>Contains nuts</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-10">
              <div>
                <Caption>Dish card</Caption>
                <article className="border border-ls-border bg-ls-surface">
                  <Image
                    src={featured.image.src}
                    alt={featured.image.alt}
                    width={featured.image.w}
                    height={featured.image.h}
                    sizes="(min-width: 1024px) 34rem, 100vw"
                    className="aspect-[4/3] h-auto w-full object-cover"
                  />
                  <div className="space-y-3 p-5">
                    <div className="flex items-center justify-between">
                      <span className={`${label} text-ls-muted`}>{featured.course}</span>
                      <Badge tone="solid">Guest favorite</Badge>
                    </div>
                    <h3 className="font-ls-serif text-[32px] leading-[1.2]">{featured.name}</h3>
                    <p className="text-base leading-relaxed">{featured.description}</p>
                    <div className="flex flex-wrap gap-3 pt-1">
                      <button type="button" aria-pressed={plate.includes(featured.id)} onClick={() => togglePlate(featured.id)} className={primary.live}>
                        {plate.includes(featured.id) ? "✓ On my plate" : "Add to my plate"}
                      </button>
                      <button type="button" onClick={() => dialogRef.current?.showModal()} className={secondary.live}>
                        Details
                      </button>
                    </div>
                  </div>
                </article>
              </div>

              <div>
                <Caption>Your plate · tray</Caption>
                <div className="border border-ls-ink bg-ls-surface">
                  <div className="flex items-baseline justify-between border-b border-ls-border px-5 py-4">
                    <h3 className="font-ls-serif text-2xl">Your plate</h3>
                    <span className="text-sm text-ls-muted">
                      {plateDishes.length} {plateDishes.length === 1 ? "dish" : "dishes"}
                    </span>
                  </div>
                  {plateDishes.length === 0 ? (
                    <p className="px-5 py-6 text-[15px] text-ls-muted">Nothing yet. Add a dish to start building your meal.</p>
                  ) : (
                    <ul className="divide-y divide-ls-border">
                      {plateDishes.map((d) => (
                        <li key={d.id} className="flex items-center justify-between gap-4 px-5 py-3">
                          <div className="min-w-0">
                            <p className="truncate text-[15px]">{d.name}</p>
                            <p className="text-sm text-ls-muted">{d.course}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => togglePlate(d.id)}
                            aria-label={`Remove ${d.name}`}
                            className="grid size-9 shrink-0 cursor-pointer place-items-center text-xl leading-none hover:bg-ls-ink/[0.06] active:bg-ls-ink/[0.12] focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-ls-ink"
                          >
                            ×
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="border-t border-ls-border p-5">
                    <button type="button" disabled={plateDishes.length === 0} onClick={() => setSent(true)} className={`${primary.live} w-full`}>
                      Send my picks
                    </button>
                    {sent && (
                      <p role="status" className="mt-3 text-sm text-ls-success">
                        ✓ Got it. I&rsquo;ll start cooking.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <Caption>Detail panel · opens as a modal from “Details”</Caption>
                <div className="border border-ls-ink">
                  <DishDetail dish={featured} onAdd={() => togglePlate(featured.id)} added={plate.includes(featured.id)} />
                </div>
              </div>
            </div>
          </div>

          <dialog
            ref={dialogRef}
            aria-label={featured.name}
            className="m-auto w-[min(32rem,calc(100vw-2rem))] border border-ls-ink bg-ls-surface p-0 text-ls-ink backdrop:bg-ls-ink/50"
            onClick={(e) => e.target === dialogRef.current && dialogRef.current.close()}
          >
            <DishDetail
              dish={featured}
              onClose={() => dialogRef.current?.close()}
              onAdd={() => togglePlate(featured.id)}
              added={plate.includes(featured.id)}
            />
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
                <StateRow name="Primary" render={(s) => <span className={primary.state[s]}>{s === "selected" ? "✓ On my plate" : "Add"}</span>} />
                <StateRow name="Secondary" render={(s) => <span className={secondary.state[s]}>{s === "selected" ? "✓ Added" : "Details"}</span>} />
                <StateRow name="Filter chip" render={(s) => <span className={chip.state[s]}>Seafood</span>} />
                <StateRow name="Tab" render={(s) => <span className={tab.state[s]}>Mains</span>} />
                <StateRow
                  name="Text input"
                  render={(s) =>
                    input.state[s] ? <span className={`${input.state[s]} flex items-center text-ls-muted`}>Search</span> : <span className="text-ls-muted">—</span>
                  }
                />
              </tbody>
            </table>
          </div>
        </Section>

        <section id="ui-states" className="border-t border-ls-ink pt-6 pb-14">
          <h2 className={`${label} mb-8 flex gap-4`}>
            <span className="text-ls-muted">06</span>UI states
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatePanel title="Empty">
              <span aria-hidden className="mx-auto block size-10 rounded-full border border-dashed border-ls-border" />
              <p className="mt-4 font-ls-serif text-2xl">Your plate is empty</p>
              <p className="mt-1 text-sm text-ls-muted">Pick a dish to start.</p>
            </StatePanel>
            <StatePanel title="Loading">
              <div className="h-px w-full overflow-hidden bg-ls-border">
                <div className="ls-progress h-px w-2/5 bg-ls-ink" />
              </div>
              <p className="mt-5 font-ls-serif text-2xl">Setting the table…</p>
              <p className="mt-1 text-sm text-ls-muted">Gathering tonight&rsquo;s dishes.</p>
            </StatePanel>
            <StatePanel title="Error">
              <span aria-hidden className="mx-auto grid size-10 place-items-center rounded-full border border-ls-error text-ls-error">
                !
              </span>
              <p className="mt-4 font-ls-serif text-2xl text-ls-error">Couldn&rsquo;t load the dishes</p>
              <button type="button" className={`${secondary.live} mt-3 min-h-9 px-4`}>
                Try again
              </button>
            </StatePanel>
            <StatePanel title="Success">
              <span aria-hidden className="mx-auto grid size-10 place-items-center rounded-full bg-ls-success text-ls-surface">
                ✓
              </span>
              <p className="mt-4 font-ls-serif text-2xl text-ls-success">Your picks are in</p>
              <p className="mt-1 text-sm text-ls-muted">I&rsquo;ll start cooking.</p>
            </StatePanel>
          </div>
        </section>
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
