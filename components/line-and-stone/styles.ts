// Line & Stone component styles. Each control has a "live" class (real hover/focus/press)
// and per-state classes used to show every state side by side in the design system.

export type ControlState = "rest" | "hover" | "focus" | "pressed" | "selected" | "disabled";
export const controlStates: ControlState[] = ["rest", "hover", "focus", "pressed", "selected", "disabled"];

export const label = "font-ls-sans text-[11px] font-medium uppercase tracking-[0.22em]";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-ls-ink";
const forcedFocus = "outline-2 outline-offset-2 outline-ls-ink";

const buttonBase =
  "inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap px-6 font-ls-sans text-xs font-medium uppercase tracking-[0.18em] transition-colors duration-150 select-none cursor-pointer";

export const primary = {
  live: `${buttonBase} ${focusRing} bg-ls-accent text-ls-surface hover:bg-ls-accent-hover active:translate-y-px active:bg-ls-accent-pressed aria-pressed:bg-ls-ink disabled:cursor-not-allowed disabled:bg-ls-disabled disabled:text-ls-muted`,
  state: {
    rest: `${buttonBase} bg-ls-accent text-ls-surface`,
    hover: `${buttonBase} bg-ls-accent-hover text-ls-surface`,
    focus: `${buttonBase} ${forcedFocus} bg-ls-accent text-ls-surface`,
    pressed: `${buttonBase} translate-y-px bg-ls-accent-pressed text-ls-surface`,
    selected: `${buttonBase} bg-ls-ink text-ls-surface`,
    disabled: `${buttonBase} cursor-not-allowed bg-ls-disabled text-ls-muted`,
  } satisfies Record<ControlState, string>,
};

export const secondary = {
  live: `${buttonBase} ${focusRing} border border-ls-ink text-ls-ink hover:bg-ls-ink/[0.06] active:translate-y-px active:bg-ls-ink/[0.12] aria-pressed:bg-ls-ink aria-pressed:text-ls-surface disabled:cursor-not-allowed disabled:border-ls-border disabled:bg-ls-disabled/60 disabled:text-ls-muted`,
  state: {
    rest: `${buttonBase} border border-ls-ink text-ls-ink`,
    hover: `${buttonBase} border border-ls-ink bg-ls-ink/[0.06] text-ls-ink`,
    focus: `${buttonBase} ${forcedFocus} border border-ls-ink text-ls-ink`,
    pressed: `${buttonBase} translate-y-px border border-ls-ink bg-ls-ink/[0.12] text-ls-ink`,
    selected: `${buttonBase} border border-ls-ink bg-ls-ink text-ls-surface`,
    disabled: `${buttonBase} cursor-not-allowed border border-ls-border bg-ls-disabled/60 text-ls-muted`,
  } satisfies Record<ControlState, string>,
};

const chipBase =
  "inline-flex min-h-9 items-center gap-1.5 border px-3.5 font-ls-sans text-[13px] transition-colors duration-150 select-none cursor-pointer";

export const chip = {
  live: `${chipBase} ${focusRing} border-ls-ink bg-ls-surface text-ls-ink hover:bg-[color-mix(in_srgb,var(--color-ls-ink)_6%,var(--color-ls-surface))] active:bg-[color-mix(in_srgb,var(--color-ls-ink)_12%,var(--color-ls-surface))] aria-pressed:bg-ls-ink aria-pressed:text-ls-surface aria-pressed:hover:bg-ls-ink aria-pressed:active:bg-ls-ink disabled:cursor-not-allowed disabled:border-ls-border disabled:bg-ls-disabled disabled:text-ls-muted`,
  state: {
    rest: `${chipBase} border-ls-ink bg-ls-surface text-ls-ink`,
    hover: `${chipBase} border-ls-ink bg-[color-mix(in_srgb,var(--color-ls-ink)_6%,var(--color-ls-surface))] text-ls-ink`,
    focus: `${chipBase} ${forcedFocus} border-ls-ink bg-ls-surface text-ls-ink`,
    pressed: `${chipBase} border-ls-ink bg-[color-mix(in_srgb,var(--color-ls-ink)_12%,var(--color-ls-surface))] text-ls-ink`,
    selected: `${chipBase} border-ls-ink bg-ls-ink text-ls-surface`,
    disabled: `${chipBase} cursor-not-allowed border-ls-border bg-ls-disabled text-ls-muted`,
  } satisfies Record<ControlState, string>,
};

const tabBase =
  "-mb-px inline-flex min-h-11 items-center border-b-2 px-1 font-ls-sans text-xs font-medium uppercase tracking-[0.18em] transition-colors duration-150 cursor-pointer";

export const tab = {
  live: `${tabBase} ${focusRing} border-transparent text-ls-muted hover:text-ls-ink active:text-ls-ink aria-selected:border-ls-ink aria-selected:text-ls-ink disabled:cursor-not-allowed disabled:text-ls-muted/50`,
  state: {
    rest: `${tabBase} border-transparent text-ls-muted`,
    hover: `${tabBase} border-ls-rule text-ls-ink`,
    focus: `${tabBase} ${forcedFocus} border-transparent text-ls-muted`,
    pressed: `${tabBase} border-ls-border text-ls-ink`,
    selected: `${tabBase} border-ls-ink text-ls-ink`,
    disabled: `${tabBase} cursor-not-allowed border-transparent text-ls-muted/50`,
  } satisfies Record<ControlState, string>,
};

const inputBase =
  "h-11 w-full border bg-ls-surface px-3 font-ls-sans text-[15px] text-ls-ink placeholder:text-ls-muted transition-colors duration-150";

export const input = {
  live: `${inputBase} border-ls-ink hover:bg-white focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-ls-ink disabled:cursor-not-allowed disabled:border-ls-border disabled:bg-ls-disabled disabled:text-ls-muted aria-invalid:border-ls-error`,
  state: {
    rest: `${inputBase} border-ls-ink`,
    hover: `${inputBase} border-ls-ink bg-white`,
    focus: `${inputBase} ${forcedFocus} border-ls-ink`,
    pressed: "",
    selected: "",
    disabled: `${inputBase} cursor-not-allowed border-ls-border bg-ls-disabled text-ls-muted`,
  } satisfies Record<ControlState, string>,
};

export const link =
  "font-ls-sans text-[15px] text-ls-ink underline decoration-ls-rule underline-offset-4 transition-colors hover:decoration-ls-ink active:text-ls-muted focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-ls-ink";
