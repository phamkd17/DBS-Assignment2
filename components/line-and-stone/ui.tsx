"use client";

// Line & Stone building blocks shared by the design system page and the site.

import type { ReactNode } from "react";
import { pizzaNight as event } from "@/lib/events";
import { howItWorks as steps, ingredientName, useLessons } from "@/lib/use-potluck";
import { label, primary, secondary } from "@/components/line-and-stone/styles";

export function Badge({ children, tone = "outline" }: { children: ReactNode; tone?: "outline" | "solid" }) {
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

export function Toggle({ checked, onChange, labelText }: { checked: boolean; onChange: (v: boolean) => void; labelText: string }) {
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
export function Meter({ value, max }: { value: number; max: number }) {
  return (
    <div className="flex gap-1" role="meter" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max} aria-label="Ingredients claimed">
      {Array.from({ length: max }, (_, i) => (
        <span key={i} className={`h-1 flex-1 ${i < value ? "bg-ls-ink" : "bg-ls-rule/50"}`} />
      ))}
    </div>
  );
}

export function HowItWorks({ onClose }: { onClose?: () => void }) {
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
export function Lessons({ poolIds }: { poolIds: string[] }) {
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
