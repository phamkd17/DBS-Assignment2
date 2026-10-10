// Trailhead component styles: pills, 2px Basalt outlines, and hard "sticker" shadows that
// press flat when you click. Each control has a live class and per-state classes for the
// side-by-side state table.

import type { ControlState } from "@/components/line-and-stone/styles";

export const label = "font-th-sans text-xs font-semibold uppercase tracking-[0.12em]";

const focusRing = "focus-visible:outline-3 focus-visible:outline-solid focus-visible:outline-offset-3 focus-visible:outline-th-link";
const forcedFocus = "outline-3 outline-solid outline-offset-3 outline-th-link";

const pill =
  "inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full border-2 border-th-ink px-6 font-th-sans text-[15px] font-semibold transition-[transform,box-shadow,background-color] duration-150 select-none cursor-pointer";
const lift = "shadow-th";
const lifted = "-translate-x-px -translate-y-px shadow-th-lg";
const pressedFlat = "translate-x-[3px] translate-y-[3px] shadow-none";

export const primary = {
  live: `${pill} ${focusRing} ${lift} bg-th-accent text-th-ink enabled:hover:-translate-x-px enabled:hover:-translate-y-px enabled:hover:bg-th-accent-hover enabled:hover:shadow-th-lg enabled:active:translate-x-[3px] enabled:active:translate-y-[3px] enabled:active:bg-th-accent-pressed enabled:active:shadow-none aria-pressed:bg-th-selected aria-pressed:enabled:hover:bg-th-selected disabled:cursor-not-allowed disabled:border-[#a7a49b] disabled:bg-th-disabled disabled:text-th-muted disabled:shadow-none`,
  state: {
    rest: `${pill} ${lift} bg-th-accent text-th-ink`,
    hover: `${pill} ${lifted} bg-th-accent-hover text-th-ink`,
    focus: `${pill} ${lift} ${forcedFocus} bg-th-accent text-th-ink`,
    pressed: `${pill} ${pressedFlat} bg-th-accent-pressed text-th-ink`,
    selected: `${pill} ${lift} bg-th-selected text-th-ink`,
    disabled: `${pill} cursor-not-allowed border-[#a7a49b] bg-th-disabled text-th-muted`,
  } satisfies Record<ControlState, string>,
};

export const secondary = {
  live: `${pill} ${focusRing} bg-th-surface text-th-ink enabled:hover:bg-th-bg enabled:active:translate-x-px enabled:active:translate-y-px enabled:active:bg-th-divider aria-pressed:bg-th-selected disabled:cursor-not-allowed disabled:border-[#a7a49b] disabled:bg-th-disabled disabled:text-th-muted`,
  state: {
    rest: `${pill} bg-th-surface text-th-ink`,
    hover: `${pill} bg-th-bg text-th-ink`,
    focus: `${pill} ${forcedFocus} bg-th-surface text-th-ink`,
    pressed: `${pill} translate-x-px translate-y-px bg-th-divider text-th-ink`,
    selected: `${pill} bg-th-selected text-th-ink`,
    disabled: `${pill} cursor-not-allowed border-[#a7a49b] bg-th-disabled text-th-muted`,
  } satisfies Record<ControlState, string>,
};

const chipBase =
  "inline-flex min-h-10 items-center gap-1.5 rounded-full border-2 border-th-ink px-4 font-th-sans text-sm font-semibold transition-colors duration-150 select-none cursor-pointer";

export const chip = {
  live: `${chipBase} ${focusRing} bg-th-surface text-th-ink hover:bg-[color-mix(in_srgb,var(--color-th-selected)_35%,white)] active:bg-[color-mix(in_srgb,var(--color-th-selected)_70%,white)] aria-pressed:bg-th-selected disabled:cursor-not-allowed disabled:border-[#a7a49b] disabled:bg-th-disabled disabled:text-th-muted`,
  state: {
    rest: `${chipBase} bg-th-surface text-th-ink`,
    hover: `${chipBase} bg-[color-mix(in_srgb,var(--color-th-selected)_35%,white)] text-th-ink`,
    focus: `${chipBase} ${forcedFocus} bg-th-surface text-th-ink`,
    pressed: `${chipBase} bg-[color-mix(in_srgb,var(--color-th-selected)_70%,white)] text-th-ink`,
    selected: `${chipBase} bg-th-selected text-th-ink`,
    disabled: `${chipBase} cursor-not-allowed border-[#a7a49b] bg-th-disabled text-th-muted`,
  } satisfies Record<ControlState, string>,
};

// Tabs sit in a pill track; the selected tab becomes a solid Basalt pill.
const tabBase =
  "inline-flex min-h-10 items-center rounded-full px-4 font-th-sans text-sm font-semibold transition-colors duration-150 cursor-pointer";

export const tab = {
  live: `${tabBase} ${focusRing} text-th-ink hover:bg-th-selected/50 active:bg-th-selected aria-selected:bg-th-ink aria-selected:text-th-surface disabled:cursor-not-allowed disabled:text-th-muted/60`,
  state: {
    rest: `${tabBase} text-th-ink`,
    hover: `${tabBase} bg-th-selected/50 text-th-ink`,
    focus: `${tabBase} ${forcedFocus} text-th-ink`,
    pressed: `${tabBase} bg-th-selected text-th-ink`,
    selected: `${tabBase} bg-th-ink text-th-surface`,
    disabled: `${tabBase} cursor-not-allowed text-th-muted/60`,
  } satisfies Record<ControlState, string>,
};

const inputBase =
  "h-12 w-full rounded-2xl border-2 bg-th-surface px-4 font-th-sans text-base text-th-ink placeholder:text-th-muted transition-colors duration-150";

export const input = {
  live: `${inputBase} border-th-ink hover:bg-th-bg ${focusRing} disabled:cursor-not-allowed disabled:border-[#a7a49b] disabled:bg-th-disabled disabled:text-th-muted aria-invalid:border-th-error aria-invalid:bg-[#fdf1ec]`,
  state: {
    rest: `${inputBase} border-th-ink`,
    hover: `${inputBase} border-th-ink bg-th-bg`,
    focus: `${inputBase} ${forcedFocus} border-th-ink`,
    pressed: "",
    selected: "",
    disabled: `${inputBase} cursor-not-allowed border-[#a7a49b] bg-th-disabled text-th-muted`,
  } satisfies Record<ControlState, string>,
};

export const link = `font-th-sans text-base font-semibold text-th-link underline decoration-2 underline-offset-4 transition-colors hover:text-th-ink active:text-th-lagoon ${focusRing} rounded-sm`;

// Sticker card: white, rounded, 2px outline, hard shadow.
export const card = "rounded-[18px] border-2 border-th-ink bg-th-surface shadow-th";
