"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type ReactNode } from "react";
import { categories, hostCreations, pastNights, tastes, type Creation, type HostCreation, type PastNight } from "@/lib/events";
import { balanceNote, usePotluck } from "@/lib/use-potluck";
import { chip, label, link, primary, secondary, tab } from "@/components/line-and-stone/styles";
import { Badge, HowItWorks, Lessons, Meter, Toggle } from "@/components/line-and-stone/ui";

// [label, short label for phones, anchor]
const nav = [
  ["Bring", "Bring", "#bring"],
  ["Learn", "Learn", "#learn"],
  ["Build", "Build", "#build"],
  ["My kitchen", "Kitchen", "#kitchen"],
  ["Past nights", "Past", "#past"],
] as const;

function Step({ id, n, title, intro, children }: { id: string; n: string; title: string; intro: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-ls-ink py-14 sm:py-20" aria-labelledby={`${id}-title`}>
      <div className="mb-10 grid gap-3 sm:grid-cols-[8rem_1fr] sm:items-baseline">
        <p className={`${label} text-ls-muted`}>Step {n}</p>
        <div>
          <h2 id={`${id}-title`} className="font-ls-serif text-5xl leading-none sm:text-6xl">
            {title}
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-ls-muted">{intro}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

function Arcade({ count = 12, className = "" }: { count?: number; className?: string }) {
  const w = 240 / count;
  return (
    <svg viewBox="0 0 240 40" className={`block w-full ${className}`} aria-hidden="true" preserveAspectRatio="none">
      {Array.from({ length: count }, (_, i) => (
        <path
          key={i}
          d={`M${i * w + w * 0.15} 40 V22 A${w * 0.35} ${w * 0.35} 0 0 1 ${i * w + w * 0.85} 22 V40`}
          fill="none"
          stroke="#1C1D1F"
          strokeWidth="0.6"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}

export default function Lab() {
  const p = usePotluck();
  const howRef = useRef<HTMLDialogElement>(null);
  const detailRef = useRef<HTMLDialogElement>(null);
  const [saved, setSaved] = useState(false);
  const [detail, setDetail] = useState<{ night: PastNight; creation: Creation } | null>(null);
  const openDetail = (night: PastNight, creation: Creation) => {
    setDetail({ night, creation });
    detailRef.current?.showModal();
  };
  const dishRef = useRef<HTMLDialogElement>(null);
  const [kind, setKind] = useState<HostCreation["kind"] | "All">("All");
  const [dish, setDish] = useState<HostCreation | null>(null);
  const kinds = ["All", ...Array.from(new Set(hostCreations.map((d) => d.kind)))] as const;
  const shownDishes = hostCreations.filter((d) => kind === "All" || d.kind === kind);
  const openDish = (d: HostCreation) => {
    setDish(d);
    dishRef.current?.showModal();
  };
  const onPizzaCount = p.intoOven.length - p.event.base.length + p.afterBake.length;

  return (
    <div className="min-h-screen bg-ls-bg font-ls-sans text-ls-ink">
      <header className="sticky top-0 z-20 border-b border-ls-ink bg-ls-bg/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
          <a href="#top" className="font-ls-serif text-xl leading-none whitespace-nowrap outline-none focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-4 focus-visible:outline-ls-ink">
            <span className="sm:hidden" aria-label="Phamtastic Lab">
              P<span className="italic">L</span>
            </span>
            <span className="hidden sm:inline">
              Phamtastic <span className="italic">Lab</span>
            </span>
          </a>
          <nav aria-label="Sections" className="flex gap-3 sm:gap-7">
            {nav.map(([name, short, href]) => (
              <a key={href} href={href} className={`${label} shrink-0 py-2 text-ls-muted underline-offset-8 transition-colors hover:text-ls-ink hover:underline focus-visible:text-ls-ink focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-ls-ink`}>
                <span className="sm:hidden">{short}</span>
                <span className="hidden sm:inline">{name}</span>
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main id="top" className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Hero: the next lab night is the first thing guests see */}
        <section className="pt-12 pb-14 sm:pt-20 sm:pb-20" aria-labelledby="hero-title">
          <p className={`${label} text-ls-muted`}>The Phamtastic Culinary Lab</p>
          <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_22rem] lg:items-end">
            <div>
              <p className="text-base">
                Next lab · {p.event.date} · {p.event.time}
              </p>
              <h1 id="hero-title" className="mt-2 font-ls-serif text-7xl leading-[0.9] sm:text-9xl">
                {p.event.theme}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed">
                I make the dough and sauce and show you why it works. You bring three ingredients, then build your own
                creation from everything on the table. <span className="font-ls-serif text-xl italic">You&rsquo;re the final chef.</span>
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#bring" className={primary.live}>
                  Bring my three
                </a>
                <button type="button" onClick={() => howRef.current?.showModal()} className={secondary.live}>
                  How it works
                </button>
              </div>
            </div>
            <dl className="divide-y divide-ls-border border-y border-ls-ink">
              {[
                ["I’ll provide", p.event.base.join(" & ")],
                ["You bring", `${p.event.perGuest} ingredients each`],
                ["The pool so far", `${p.pool.length} ingredients · ${p.event.guests.length} guests`],
                ["Tonight’s lessons", `${p.event.lessons.length} bits of food science`],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[9rem_1fr] gap-3 py-3 text-[15px]">
                  <dt className="text-ls-muted">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <Arcade className="mt-14 h-10 sm:h-14" />
        </section>

        <Step id="bring" n="01" title="Bring" intro="Claim three ingredients so we don’t double up. Everything you bring goes into a shared pool that anyone can use.">
          <div className="grid gap-10 lg:grid-cols-[1fr_24rem]">
            <div>
              <div className="mb-3 flex items-center justify-between gap-4">
                <p className={label}>
                  You&rsquo;re bringing · {p.bringing.length} of {p.event.perGuest}
                </p>
                <div className="w-24">
                  <Meter value={p.bringing.length} max={p.event.perGuest} />
                </div>
              </div>
              <div role="tablist" aria-label="Ingredient category" className="flex gap-5 overflow-x-auto border-b border-ls-border">
                {categories.map((c) => (
                  <button key={c} type="button" role="tab" aria-selected={p.ideaTab === c} onClick={() => p.setIdeaTab(c)} className={`${tab.live} shrink-0`}>
                    {c}
                  </button>
                ))}
              </div>
              <ul className="divide-y divide-ls-border border-b border-ls-border" role="tabpanel">
                {p.event.ideas
                  .filter((i) => i.category === p.ideaTab)
                  .map((i) => {
                    const on = p.bringing.includes(i.id);
                    return (
                      <li key={i.id} className="flex items-center justify-between gap-4 py-4">
                        <div className="min-w-0">
                          <p className="text-[17px]">{i.name}</p>
                          <p className="text-sm text-ls-muted">
                            {i.vegetarian ? "Vegetarian" : "Meat & fish"}
                            {i.nuts ? " · Contains nuts" : ""}
                            {i.after ? " · Goes on after the bake" : ""}
                          </p>
                        </div>
                        <button
                          type="button"
                          aria-pressed={on}
                          disabled={!on && p.full}
                          aria-label={`${on ? "Stop bringing" : "Bring"} ${i.name}`}
                          onClick={() => p.toggleBring(i.id)}
                          className={`${secondary.live} min-h-10 shrink-0 px-4`}
                        >
                          {on ? "✓ Bringing" : "Bring"}
                        </button>
                      </li>
                    );
                  })}
              </ul>
              {p.full && <p className="mt-3 text-sm text-ls-muted">That&rsquo;s your three. Remove one to swap it out.</p>}

              <div className="mt-8">
                <p className={`${label} mb-3 text-ls-muted`}>Already in the pool</p>
                <ul className="flex flex-wrap gap-2">
                  {p.event.pool.map((i) => (
                    <li key={i.id} className="border border-ls-border bg-ls-surface px-3 py-1.5 text-sm">
                      {i.name} <span className="text-ls-muted">· {i.broughtBy}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className="self-start border border-ls-ink bg-ls-surface lg:sticky lg:top-24" aria-label="What I'm bringing">
              <div className="space-y-3 border-b border-ls-border px-5 py-4">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-ls-serif text-2xl">What I&rsquo;m bringing</h3>
                  <span className="text-sm text-ls-muted">
                    {p.bringing.length} of {p.event.perGuest}
                  </span>
                </div>
                <Meter value={p.bringing.length} max={p.event.perGuest} />
              </div>
              {p.mine.length === 0 ? (
                <p className="px-5 py-6 text-[15px] text-ls-muted">Nothing yet. Pick up to three ingredients to bring.</p>
              ) : (
                <ul className="divide-y divide-ls-border">
                  {p.mine.map((i) => (
                    <li key={i.id} className="flex items-center justify-between gap-4 px-5 py-3">
                      <div className="min-w-0">
                        <p className="truncate text-[15px]">{i.name}</p>
                        <p className="text-sm text-ls-muted">{i.category}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => p.toggleBring(i.id)}
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
                <button type="button" disabled={p.mine.length === 0} onClick={p.confirm} className={`${primary.live} w-full`}>
                  Add mine to the pool
                </button>
                {p.confirmed && (
                  <p role="status" className="mt-3 text-sm text-ls-success">
                    ✓ You&rsquo;re in. Next, learn why it works.{" "}
                    <a href="#learn" className="underline underline-offset-4">
                      Go to step 2 →
                    </a>
                  </p>
                )}
              </div>
            </aside>
          </div>
        </Step>

        <Step id="learn" n="02" title="Learn" intro="A few bits of food science before we build. Use them, bend them, or ignore them. It’s your pizza.">
          <Lessons poolIds={p.pool.map((i) => i.id)} />
        </Step>

        <Step id="build" n="03" title="Build" intro="Tap anything in tonight’s pool to put it on your pizza. I’ll sort out what goes in the oven and what goes on after.">
          <div className="grid gap-10 lg:grid-cols-[1fr_24rem]">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2" aria-label="Filter the pool">
                {(["All", ...categories] as const).map((f) => (
                  <button key={f} type="button" aria-pressed={p.poolFilter === f} onClick={() => p.setPoolFilter(f)} className={chip.live}>
                    {f}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-3 text-[15px]">
                <label className="flex cursor-pointer items-center gap-3">
                  <input type="checkbox" className="ls-check" checked={p.vegOnly} onChange={(e) => p.setVegOnly(e.target.checked)} />
                  Vegetarian
                </label>
                <label className="flex cursor-pointer items-center gap-3">
                  <input type="checkbox" className="ls-check" checked={p.noNuts} onChange={(e) => p.setNoNuts(e.target.checked)} />
                  No nuts
                </label>
                <label className="flex items-center gap-3 text-ls-muted">
                  <input type="checkbox" className="ls-check" disabled />
                  Gluten-free dough (ask me)
                </label>
                <Toggle checked={p.showNames} onChange={p.setShowNames} labelText="Show who brought what" />
              </div>

              <p className="flex flex-wrap items-center gap-2 border-y border-dashed border-ls-border py-3 text-[15px]">
                <Badge tone="solid">On every pizza</Badge>
                {p.event.base.join(" & ")}
              </p>
              <ul className="flex flex-wrap gap-2" aria-label="Tonight's pool">
                {p.visiblePool.map((i) => (
                  <li key={i.id}>
                    <button
                      type="button"
                      aria-pressed={p.creation.includes(i.id)}
                      onClick={() => {
                        setSaved(false);
                        p.toggleCreation(i.id);
                      }}
                      className={`${chip.live} min-h-11 text-[15px]`}
                    >
                      {i.name}
                      {p.showNames && <span className="text-[11px] opacity-70">· {i.broughtBy}</span>}
                    </button>
                  </li>
                ))}
              </ul>
              {p.visiblePool.length === 0 && <p className="text-sm text-ls-muted">Nothing in the pool matches. Try another filter.</p>}

              <fieldset>
                <legend className={`${label} mb-3`}>Crust</legend>
                <div className="flex flex-wrap gap-6 text-[15px]">
                  {[
                    ["thin", "Thin and crisp"],
                    ["thick", "Thick and chewy"],
                  ].map(([v, l]) => (
                    <label key={v} className="flex cursor-pointer items-center gap-3">
                      <input type="radio" name="lab-crust" className="ls-radio" value={v} checked={p.crust === v} onChange={() => p.setCrust(v)} />
                      {l}
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>

            <aside className="self-start border border-ls-ink bg-ls-surface lg:sticky lg:top-24" aria-label="Your creation">
              <div className="border-b border-ls-border px-5 py-4">
                <p className={`${label} text-ls-muted`}>Your creation · {p.crust === "thin" ? "thin crust" : "thick crust"}</p>
                <p className="mt-1 text-sm text-ls-muted">
                  {onPizzaCount} {onPizzaCount === 1 ? "topping" : "toppings"} from the pool
                </p>
              </div>
              <dl className="space-y-3 px-5 py-4">
                <div>
                  <dt className="text-sm text-ls-muted">Into the oven</dt>
                  <dd className="font-ls-serif text-2xl leading-snug">{p.intoOven.join(", ")}</dd>
                </div>
                <div>
                  <dt className="text-sm text-ls-muted">After the bake</dt>
                  <dd className="font-ls-serif text-2xl leading-snug">
                    {p.afterBake.length ? p.afterBake.join(", ") : <span className="font-ls-sans text-base text-ls-muted">Nothing yet</span>}
                  </dd>
                </div>
              </dl>
              <div className="border-t border-ls-border px-5 py-4">
                <p className={`${label} mb-3 text-ls-muted`}>Balance</p>
                <ul className="grid grid-cols-5 gap-2">
                  {tastes.map((t) => (
                    <li key={t} className="text-center" aria-label={`${t}: ${p.tasteCount[t]}`}>
                      <div className="mb-1.5 flex h-10 flex-col-reverse gap-0.5">
                        {Array.from({ length: 4 }, (_, k) => (
                          <span key={k} className={`h-2 ${k < p.tasteCount[t] ? "bg-ls-ink" : "bg-ls-rule/40"}`} />
                        ))}
                      </div>
                      <span className="text-xs text-ls-muted">{t}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-sm" aria-live="polite">
                  {balanceNote(p.tasteCount)}
                </p>
              </div>
              <div className="border-t border-ls-border p-5">
                <button type="button" aria-pressed={saved} onClick={() => setSaved(true)} className={`${primary.live} w-full`}>
                  {saved ? "✓ Saved for Saturday" : "That’s my creation"}
                </button>
                {saved && (
                  <p role="status" className="mt-3 text-sm text-ls-success">
                    Nice. I&rsquo;ll have the oven hot. Change anything until the night.
                  </p>
                )}
              </div>
            </aside>
          </div>
        </Step>

        <section id="kitchen" className="scroll-mt-20 border-t border-ls-ink py-14 sm:py-20" aria-labelledby="kitchen-title">
          <div className="mb-10 grid gap-3 sm:grid-cols-[8rem_1fr] sm:items-baseline">
            <p className={`${label} text-ls-muted`}>From my kitchen</p>
            <div>
              <h2 id="kitchen-title" className="font-ls-serif text-5xl leading-none sm:text-6xl">
                My creations
              </h2>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-ls-muted">
                Dishes I&rsquo;ve built at home, and the bit of food science that makes each one work. Steal any idea you like.
              </p>
            </div>
          </div>
          <div className="mb-6 flex flex-wrap gap-2" aria-label="Filter my creations">
            {kinds.map((k) => (
              <button key={k} type="button" aria-pressed={kind === k} onClick={() => setKind(k)} className={chip.live}>
                {k}
                <span className="text-[11px] opacity-70">{k === "All" ? hostCreations.length : hostCreations.filter((d) => d.kind === k).length}</span>
              </button>
            ))}
          </div>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
            {shownDishes.map((d) => (
              <li key={d.id}>
                <button
                  type="button"
                  onClick={() => openDish(d)}
                  className="group block w-full cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-4 focus-visible:outline-ls-ink"
                >
                  <span className="block overflow-hidden border border-ls-border">
                    <Image
                      src={d.image.src}
                      alt={d.image.alt}
                      width={d.image.w}
                      height={d.image.h}
                      sizes="(min-width: 1024px) 16rem, (min-width: 640px) 30vw, 45vw"
                      className="aspect-[4/5] h-auto w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] group-active:scale-100"
                    />
                  </span>
                  <span className={`${label} mt-3 block text-ls-muted`}>{d.kind}</span>
                  <span className="mt-1 block font-ls-serif text-[22px] leading-tight group-hover:underline group-hover:underline-offset-4">{d.name}</span>
                  <span className="mt-1 block text-sm leading-snug text-ls-muted">{d.summary}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section id="past" className="scroll-mt-20 border-t border-ls-ink py-14 sm:py-20" aria-labelledby="past-title">
          <div className="mb-10 grid gap-3 sm:grid-cols-[8rem_1fr] sm:items-baseline">
            <p className={`${label} text-ls-muted`}>Archive</p>
            <div>
              <h2 id="past-title" className="font-ls-serif text-5xl leading-none sm:text-6xl">
                Past nights
              </h2>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-ls-muted">
                Every lab has a theme, a lesson, and a table full of creations nobody planned.
              </p>
            </div>
          </div>
          <div className="divide-y divide-ls-border border-y border-ls-border">
            {pastNights.map((night) => (
              <article key={night.id} className="grid gap-6 py-8 lg:grid-cols-[18rem_1fr]">
                <div>
                  <p className={`${label} text-ls-muted`}>{night.date}</p>
                  <h3 className="mt-1 font-ls-serif text-4xl leading-none">{night.theme}</h3>
                  <p className="mt-3 border-l border-ls-ink pl-3 text-[15px] leading-relaxed">
                    <span className={`${label} block text-ls-muted`}>What we learned</span>
                    {night.lesson}
                  </p>
                </div>
                <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {night.creations.map((c) => (
                    <li key={c.id}>
                      <button
                        type="button"
                        onClick={() => openDetail(night, c)}
                        className="group block w-full cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-4 focus-visible:outline-ls-ink"
                      >
                        <span className="block overflow-hidden border border-ls-border">
                          <Image
                            src={c.image.src}
                            alt={c.image.alt}
                            width={c.image.w}
                            height={c.image.h}
                            sizes="(min-width: 1024px) 14rem, 45vw"
                            className="aspect-[4/5] h-auto w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] group-active:scale-100"
                          />
                        </span>
                        <span className="mt-2 block font-ls-serif text-xl leading-tight group-hover:underline group-hover:underline-offset-4">
                          {c.name}
                        </span>
                        <span className="block text-sm text-ls-muted">Built by {c.builtBy}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-ls-ink">
        <Arcade count={18} className="h-8" />
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-8 text-sm text-ls-muted sm:px-8">
          <p>The Phamtastic Culinary Lab · you&rsquo;re the final chef.</p>
          <Link href="/" className={link}>
            Project hub
          </Link>
        </div>
      </footer>

      <dialog
        ref={howRef}
        aria-label="How it works"
        className="m-auto w-[min(32rem,calc(100vw-2rem))] border border-ls-ink bg-ls-surface p-0 text-ls-ink backdrop:bg-ls-ink/50"
        onClick={(e) => e.target === howRef.current && howRef.current.close()}
      >
        <HowItWorks onClose={() => howRef.current?.close()} />
      </dialog>

      <dialog
        ref={dishRef}
        aria-label={dish?.name ?? "Creation"}
        className="m-auto max-h-[calc(100dvh-2rem)] w-[min(36rem,calc(100vw-2rem))] border border-ls-ink bg-ls-surface p-0 text-ls-ink backdrop:bg-ls-ink/50"
        onClick={(e) => e.target === dishRef.current && dishRef.current.close()}
      >
        {dish && (
          <div>
            <div className="flex items-center justify-between border-b border-ls-border px-5 py-3">
              <span className={`${label} text-ls-muted`}>From my kitchen · {dish.kind}</span>
              <button
                type="button"
                onClick={() => dishRef.current?.close()}
                aria-label="Close"
                className="grid size-9 cursor-pointer place-items-center text-xl leading-none hover:bg-ls-ink/[0.06] focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-ls-ink"
              >
                ×
              </button>
            </div>
            <Image src={dish.image.src} alt={dish.image.alt} width={dish.image.w} height={dish.image.h} sizes="36rem" className="aspect-[4/3] h-auto w-full object-cover" />
            <div className="space-y-4 p-5">
              <h3 className="font-ls-serif text-[32px] leading-[1.15]">{dish.name}</h3>
              <p className="text-base leading-relaxed">{dish.summary}</p>
              <div className="border-l-2 border-ls-ink pl-4">
                <p className={label}>Why it works</p>
                <p className="mt-1 text-[15px] leading-relaxed">{dish.science}</p>
              </div>
              <div>
                <p className={`${label} mb-2 text-ls-muted`}>What goes in</p>
                <ul className="flex flex-wrap gap-2">
                  {dish.ingredients.map((f) => (
                    <li key={f}>
                      <Badge>{f}</Badge>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </dialog>

      <dialog
        ref={detailRef}
        aria-label={detail?.creation.name ?? "Creation"}
        className="m-auto w-[min(34rem,calc(100vw-2rem))] border border-ls-ink bg-ls-surface p-0 text-ls-ink backdrop:bg-ls-ink/50"
        onClick={(e) => e.target === detailRef.current && detailRef.current.close()}
      >
        {detail && (
          <div>
            <div className="flex items-center justify-between border-b border-ls-border px-5 py-3">
              <span className={`${label} text-ls-muted`}>
                {detail.night.theme} · {detail.night.date}
              </span>
              <button
                type="button"
                onClick={() => detailRef.current?.close()}
                aria-label="Close"
                className="grid size-9 cursor-pointer place-items-center text-xl leading-none hover:bg-ls-ink/[0.06] focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-ls-ink"
              >
                ×
              </button>
            </div>
            <Image
              src={detail.creation.image.src}
              alt={detail.creation.image.alt}
              width={detail.creation.image.w}
              height={detail.creation.image.h}
              sizes="34rem"
              className="aspect-[4/3] h-auto w-full object-cover"
            />
            <div className="space-y-3 p-5">
              <h3 className="font-ls-serif text-[32px] leading-[1.15]">{detail.creation.name}</h3>
              <p className="text-ls-muted">Built by {detail.creation.builtBy}</p>
              <div>
                <p className={`${label} mb-2 text-ls-muted`}>Built from</p>
                <ul className="flex flex-wrap gap-2">
                  {detail.creation.from.map((f) => (
                    <li key={f}>
                      <Badge>{f}</Badge>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="border-l border-ls-ink pl-3 text-[15px] leading-relaxed">
                <span className={`${label} block text-ls-muted`}>The lesson that night</span>
                {detail.night.lesson}
              </p>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
