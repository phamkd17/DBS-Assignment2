# AGENTS.md

Guidance for AI agents working in this repo. Read this fully before making changes.

## Project

**Design, Build, Ship (MPCS 51238), Assignment 2: UI/UX & Visual Design**
Due **Tuesday, October 13, 2026, 5:30 PM**. Submitted as a Vercel URL (the hub) and a GitHub URL.

The site is a **personal culinary showcase** for dinner parties:
- **Archive:** every dish the owner has cooked, with photos, notes, and tags (course, cuisine, season).
- **Themed potluck events:** friends see the next theme, claim the ingredients they'll bring, and build their own creation from the shared pool (see below).

**Audience:** the owner's friends and dinner guests, mostly opening a shared link on their phones.

### Culinary philosophy (guides all copy and UX)
The host provides an exceptional platform; **the guest is the final chef**. Guests are the masters of their own palate, and they build their own perfect meal from what's on offer.
- **Tone:** warm, casual, and guest-centered. Never pretentious: no tasting-menu or fine-dining language ("seven courses," "served in order," French/Italian course names like *Primi*), and no telling guests how to eat.
- **Voice:** speak to the guest ("you pick," "your plate"). The host's role is to set things up and cook ("I'll cook it").
- **UX:** choice and control come first. Selecting, combining, and building a meal is the main interaction, not passively browsing a fixed menu.

### How the events work (the site should model this)
Each event has a **theme**, and it's a potluck of ingredients, not of finished dishes:
1. **The host picks a theme and provides the base.** Example: *Pizza night*. The host supplies the dough and sauce.
2. **Each guest brings ingredients.** Example: 3 toppings per guest.
3. **Everything goes into a shared pool.** At the event, anyone can mix and match from everything everyone brought.
4. **Each guest builds their own creation** from the base and the pool. Every plate is different.

What this means for the site:
- **Content model:** an *event* has a theme, a date, a host-provided base, a per-guest ingredient count, and the guests' contributed ingredients. Past events in the archive show the theme and what people made.
- **Main interactions** (all faked in the browser): (a) a guest **claims the ingredients they'll bring** (up to the limit, e.g. 3) and sees the shared pool grow; (b) a guest **builds their creation** from the base and the pool.
- **Language:** "bring," "pool," "build," "your creation." The host's role is "I'll provide the dough and sauce," never "I'll cook your order."
- The Line & Stone design system already follows this model (`lib/events.ts`: claim up to 3 → pool → build). New design systems should use the same components and data.

## How we work (important)

- **The user directs the design. You carry it out.** The brief says every change must come from the user looking at the screen and naming what to change, using UI element names and design principles. Don't build big chunks unprompted.
- **No one-shot builds.** A submission made by handing the brief to an agent once is marked incomplete. Work in small steps, show the result, and wait for direction.
- **Offer options, but let the user decide** on style, palette, type, and layout. When asked, suggest 2–3 options with short trade-offs.
- **Commit often, with descriptive messages.** The commit history is graded as evidence of progress. Commit after each meaningful step, and only when the user asks or agrees.
- **Log decisions** in `DECISIONS.md` (see below). The user has to explain their choices in class.

## Tech stack (hard constraints)

- **Next.js (App Router) + Tailwind CSS**, as a static site deployed on **Vercel Hobby**.
- **No database, accounts, auth, external APIs, or data storage.** All data lives in local files (e.g. `lib/events.ts`), and images live in `public/`.
- Interactions are **faked in the browser** with React state. Nothing persists, so no `localStorage`-backed "votes" or server actions.
- **Don't add packages unless they're clearly needed.** Ask first. Avoid UI kits (shadcn, MUI, etc.) because the components should come from our own design systems.

## Routes

```
/                              Hub (homepage, the submitted URL)
/mood-boards/[style]           3 mood boards
/design-systems/[style]        3 design systems, one per mood board
/<site-route>                  The culinary site, e.g. /kitchen or /supper-club (name TBD)
```

### 1. Hub (`/`)
- Title plus the site name
- **Mood Boards:** 3 links, each with a small color-swatch preview
- **Design Systems:** 3 links, each with an "Aa" sample and swatches
- **Your Site:** one prominent link to the culinary site

### 2. Mood boards (`/mood-boards/[style]`)
One per style. The **three styles must feel clearly different.** Each page has:
- A **mood name** (e.g. "Candlelit · Rustic · Warm")
- **25–30 artifacts** in a masonry or collage grid, mixing:
  - food and table photography (the user's own photos where possible)
  - typography samples ("Aa" tiles, menu headings set in candidate fonts)
  - color swatches and textures (linen, wood, marble, paper, ceramics)
  - interface pieces (menu cards, buttons, chips in that style)
- Mark artifacts the agent generated (e.g. with a ✦ and a "generated by your agent" note)
- A short footer caption, e.g. "28 artifacts: photos, type, color, texture, and interface pieces"

Styles (photos are the owner's own, from `~/Desktop/Mood Board`, resized with EXIF/GPS stripped):
| Slug | Mood name | Keywords | Type | Status |
|---|---|---|---|---|
| `trailhead` | Trailhead (nature) | Fresh · Bright · Adventurous · High contrast | Bricolage Grotesque + Instrument Sans | Board done |
| `line-and-stone` | Line & Stone (city / human) | Artistic · Geometric · Textured · Refined | Instrument Serif + Jost Light | Board done |
| `candlelit-table` | Candlelit Table (food), proposed mood | Warm · Intimate · Generous · Golden | Fraunces Italic + Figtree | Board done, mood pending user approval |

Board data and palettes live in `lib/mood-boards.ts`; each board is 23 photos + 7 generated tiles = 30 artifacts.

### 3. Design systems (`/design-systems/[style]`)
Status: **Line & Stone done** (`app/design-systems/line-and-stone/`). Trailhead and Candlelit Table not started.
Shared pieces: color tokens in `app/globals.css` (`--color-ls-*` → `bg-ls-bg`, `text-ls-ink`, …), fonts in `lib/fonts.ts`, component class strings with live and per-state variants in `components/line-and-stone/styles.ts`, event data (base, pool, ideas) in `lib/events.ts`, contrast math in `lib/contrast.ts`. Reuse these for the site; don't duplicate tokens.
Tailwind v4 gotcha: `outline-none` also cancels `focus-visible:outline-2`. Pair focus rings with `focus-visible:outline-solid`.

Each is a UI library built from its mood board, using **culinary content** (real dish names, not lorem ipsum). Each includes:
1. **Color roles:** background, surface, text, muted text, border, and accent, **with contrast ratios** shown (text and muted text must be ≥ 4.5:1 on background)
2. **Type roles:** display, heading, body, and label, with sizes and weights, set in real content (e.g. "14 ingredients in the pool")
3. **Spacing and shape:** a spacing scale (e.g. 4/8/12/16/24/32), corner radii, borders, and the shadow approach
4. **Components:** primary and secondary buttons, a link, a text input, a select, a checkbox, a radio, a toggle, tabs, filter chips, an event card, list rows, a badge, a modal or detail panel, plus anything the site needs (e.g. a "bring this" control, a what-I'm-bringing tray, the shared pool, a creation builder)
5. **Control states:** rest, hover, focus, pressed, selected, and disabled, shown side by side
6. **UI states:** empty, loading, error, and success

Keep each style's tokens (colors, fonts, radii) in one place per style so the design system and the site share them.

### 4. The site (`/<site-route>`)
Built in the **one style the user picks**, using that style's design-system components. Requirements:
1. **Thoughtful visual hierarchy:** it's clear what to look at first
2. **At least two faked interactions.** Candidates:
   - claim up to 3 ingredients to bring, with a running "What I'm bringing" tray and a pool that grows (not saved)
   - build your creation: tap pool ingredients onto your pizza, filtered by category or diet
   - a past-events archive with creation detail (photo, who built it, from what)
3. **Every control in all its states** (hover, focus-visible, pressed, selected, disabled)
4. **The accent color is reserved for the primary action** (e.g. "Bring this" / "Add mine to the pool")
5. **Responsive:** test at **390px mobile** and **1440px desktop**

## Design requirements (checklist for every change)

- **Visual hierarchy:** one clear focal point per screen
- **Type:** a few sizes and weights, used consistently; comfortable line length and line height
- **Color:** a small palette where every color has a job
- **Accessibility:** legible contrast, visible focus rings, keyboard-operable controls, alt text on dish photos, semantic HTML (`button`, `nav`, `dialog`, etc.)
- **Layout:** intentional alignment, related items grouped, works on desktop and mobile
- **Affordances:** clickable things look clickable
- **States:** controls respond to hover, focus, and press
- **Visual style:** it must look like the chosen style, **not a generic agent/Tailwind default**. Avoid default blue buttons, gray-on-white cards, and `rounded-lg shadow-md` everywhere.
- **Simplicity:** if a word or an image doesn't help, remove it

## Verify

After building or changing UI, check it in a real browser (Claude in Chrome via `/chrome`, or Playwright MCP):
- Open each page at **390px** and **1440px**
- Try every interaction, including with the keyboard (Tab, Enter, Space, Esc to close modals)
- Take screenshots and report concretely what's broken or off-style
- Fix only what the user agrees to fix

## Decision log (`DECISIONS.md`)

Keep a running log the user can use to prepare for the in-class explanation. For each entry, record the date, what was decided, why, and who decided (user or agent suggestion the user accepted or rejected). Cover:
1. **Style:** why the chosen style fits the site and its guests
2. **Design decisions:** what people see first, how they know what's clickable, and what each state communicates
3. **Agent use:** what was asked for, where the user pushed back, and what the user decided themselves

## Content

- Event data in `lib/events.ts`: each event has `theme`, `date`, `base` (host provides), `perGuest`, `guests`, `pool` (claimed ingredients with `broughtBy`), and `ideas` (unclaimed suggestions). Past creations feed the archive.
- Use the user's real events, guests, and photos when they're provided. Guest names and contributions are placeholders until then.
- Optimize images with `next/image` and keep the files reasonably small for the Vercel Hobby plan

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
