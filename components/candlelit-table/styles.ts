// Candlelit Table component styles: warm dark surfaces, soft pill controls, and a candle
// glow (instead of a hard shadow) that brightens on hover and sinks inward on press.

import type { ControlState } from "@/components/line-and-stone/styles";

export const label = "font-ct-sans text-[11px] font-semibold uppercase tracking-[0.18em]";

const focusRing = "focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-3 focus-visible:outline-ct-accent";
const forcedFocus = "outline-2 outline-solid outline-offset-3 outline-ct-accent";

const pill =
  "inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 font-ct-sans text-[15px] font-semibold transition-[background-color,box-shadow,color] duration-200 select-none cursor-pointer";

export const primary = {
  live: `${pill} ${focusRing} bg-ct-accent text-ct-bg enabled:hover:bg-ct-accent-hover enabled:hover:shadow-ct-glow-strong enabled:active:bg-ct-accent-pressed enabled:active:shadow-ct-press aria-pressed:bg-ct-selected aria-pressed:text-ct-text aria-pressed:enabled:hover:bg-ct-selected-hover disabled:cursor-not-allowed disabled:bg-ct-disabled disabled:text-ct-muted/70`,
  state: {
    rest: `${pill} bg-ct-accent text-ct-bg`,
    hover: `${pill} bg-ct-accent-hover text-ct-bg shadow-ct-glow-strong`,
    focus: `${pill} ${forcedFocus} bg-ct-accent text-ct-bg`,
    pressed: `${pill} bg-ct-accent-pressed text-ct-bg shadow-ct-press`,
    selected: `${pill} bg-ct-selected text-ct-text`,
    disabled: `${pill} cursor-not-allowed bg-ct-disabled text-ct-muted/70`,
  } satisfies Record<ControlState, string>,
};

const outline = "border border-ct-border";

export const secondary = {
  live: `${pill} ${outline} ${focusRing} text-ct-text enabled:hover:border-ct-linen enabled:hover:bg-ct-raised enabled:active:bg-ct-bg enabled:active:shadow-ct-press aria-pressed:border-ct-selected aria-pressed:bg-ct-selected aria-pressed:enabled:hover:bg-ct-selected-hover disabled:cursor-not-allowed disabled:border-ct-hairline disabled:text-ct-muted/60`,
  state: {
    rest: `${pill} ${outline} text-ct-text`,
    hover: `${pill} border border-ct-linen bg-ct-raised text-ct-text`,
    focus: `${pill} ${outline} ${forcedFocus} text-ct-text`,
    pressed: `${pill} ${outline} bg-ct-bg text-ct-text shadow-ct-press`,
    selected: `${pill} border border-ct-selected bg-ct-selected text-ct-text`,
    disabled: `${pill} cursor-not-allowed border border-ct-hairline text-ct-muted/60`,
  } satisfies Record<ControlState, string>,
};

const chipBase =
  "inline-flex min-h-9 items-center gap-1.5 rounded-full border px-3.5 font-ct-sans text-sm font-medium transition-colors duration-200 select-none cursor-pointer";

export const chip = {
  live: `${chipBase} ${focusRing} border-ct-border bg-ct-surface text-ct-linen hover:border-ct-linen hover:bg-ct-raised active:bg-ct-bg aria-pressed:border-ct-selected aria-pressed:bg-ct-selected aria-pressed:text-ct-text aria-pressed:hover:bg-ct-selected-hover disabled:cursor-not-allowed disabled:border-ct-hairline disabled:text-ct-muted/60`,
  state: {
    rest: `${chipBase} border-ct-border bg-ct-surface text-ct-linen`,
    hover: `${chipBase} border-ct-linen bg-ct-raised text-ct-linen`,
    focus: `${chipBase} ${forcedFocus} border-ct-border bg-ct-surface text-ct-linen`,
    pressed: `${chipBase} border-ct-border bg-ct-bg text-ct-linen`,
    selected: `${chipBase} border-ct-selected bg-ct-selected text-ct-text`,
    disabled: `${chipBase} cursor-not-allowed border-ct-hairline bg-ct-surface text-ct-muted/60`,
  } satisfies Record<ControlState, string>,
};

// Tabs: italic serif words with a saffron candle-line underneath when selected.
const tabBase =
  "relative inline-flex min-h-11 items-center rounded-md px-1 font-ct-serif text-lg italic transition-colors duration-200 cursor-pointer after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:rounded-full after:transition-colors";

export const tab = {
  live: `${tabBase} ${focusRing} text-ct-muted after:bg-transparent hover:text-ct-text hover:after:bg-ct-border active:text-ct-text aria-selected:text-ct-text aria-selected:after:bg-ct-accent disabled:cursor-not-allowed disabled:text-ct-muted/50`,
  state: {
    rest: `${tabBase} text-ct-muted after:bg-transparent`,
    hover: `${tabBase} text-ct-text after:bg-ct-border`,
    focus: `${tabBase} ${forcedFocus} text-ct-muted after:bg-transparent`,
    pressed: `${tabBase} text-ct-text after:bg-ct-linen`,
    selected: `${tabBase} text-ct-text after:bg-ct-accent`,
    disabled: `${tabBase} cursor-not-allowed text-ct-muted/50 after:bg-transparent`,
  } satisfies Record<ControlState, string>,
};

const inputBase =
  "h-11 w-full rounded-[10px] border bg-ct-raised px-4 font-ct-sans text-[15px] text-ct-text placeholder:text-ct-muted transition-colors duration-200";

export const input = {
  live: `${inputBase} border-ct-border hover:border-ct-linen ${focusRing} disabled:cursor-not-allowed disabled:border-ct-hairline disabled:bg-ct-disabled disabled:text-ct-muted aria-invalid:border-ct-error`,
  state: {
    rest: `${inputBase} border-ct-border`,
    hover: `${inputBase} border-ct-linen`,
    focus: `${inputBase} ${forcedFocus} border-ct-border`,
    pressed: "",
    selected: "",
    disabled: `${inputBase} cursor-not-allowed border-ct-hairline bg-ct-disabled text-ct-muted`,
  } satisfies Record<ControlState, string>,
};

export const link = `rounded-sm font-ct-sans text-[15px] font-medium text-ct-caramel underline decoration-ct-caramel/50 underline-offset-4 transition-colors hover:text-ct-accent hover:decoration-ct-accent active:text-ct-linen ${focusRing}`;

// Card: warm surface, 12px corners, faint border, soft candle glow below.
export const card = "rounded-xl bg-ct-surface shadow-ct-glow";
