# Design decisions: The Phamtastic Food Lab

Assignment 2, UI/UX & Visual Design. A record of what I decided, why, and how I worked with the agent.
Sections marked **[edit in your words]** are suggested reasoning to rewrite before class.

---

## 1. The idea

**The Phamtastic Food Lab** is the site for my themed potluck nights:

1. I pick a theme and provide the base (Pizza night: dough and tomato sauce).
2. Each guest brings ingredients (three is a suggestion, and more is welcome).
3. Everything goes into a shared pool that anyone can use.
4. I teach the food science behind the theme, explaining *why* things work instead of handing out a recipe.
5. Each guest builds their own creation from the pool.

**My philosophy:** I provide an exceptional platform, and the guest is the final chef because they're the master of their own palate. Every decision below comes back to that: the site gives guests choices and knowledge, never instructions.

---

## 2. Mood boards (three clearly different moods)

| Board | Mood | Where it came from |
|---|---|---|
| **Trailhead** | Fresh · Bright · Adventurous · High contrast | My direction: nature, "lots of colors and contrast" |
| **Line & Stone** | Artistic · Geometric · Textured · Refined | My direction: city and human elements, "refinement without overindulgence" |
| **Candlelit Table** | Warm · Intimate · Generous · Golden | The agent proposed this mood for my food photos. I accepted it. |

- Every board has **30 artifacts**: 23 of my own photos plus 7 generated tiles (palette, type, texture, interface pieces), marked ✦. I asked for exactly 30.
- **I curated the photos myself** by looking at each board and naming changes:
  - **Line & Stone:** replaced a train-station detail with a stronger modern lead image (the perforated sculpture), added Florence (the Duomo from above, and the Ponte Vecchio at evening instead of daytime), swapped a grey street for a more vibrant one, and replaced a monastery with something more modern (the Seattle Ferris wheel). Then I had the photos reshuffled so **old-world and modern images alternate across every column**, keeping my two lead photos fixed.
  - **Trailhead:** swapped a waterfall for a canyon, a banana slug for a winter scene (snowy pines), and added a moody, rainy note (storm clouds with a rainbow, plus a rain texture), so the board isn't all sunshine.
  - **Candlelit Table:** replaced a daylight sangria and a steak board with candlelit shots (a rustic spread and an amber drink) that fit the warm, low-light mood.

---

## 3. Design systems

I built all three from the same components, so the only differences are visual style.

| | Line & Stone | Trailhead | Candlelit Table |
|---|---|---|---|
| Shape | Square corners, 1px hairlines | Pills, rounded "sticker" cards, 2px outlines | Soft pills, 12px cards |
| Depth | None; a hairline does the job | Hard offset shadow that lifts on hover and presses flat | Candle glow that brightens on hover and sinks on press |
| Primary action | Aegean blue | Sunrise yellow | Saffron |
| Selected | Ink | Anemone lime | Claret |
| Type | Instrument Serif + Jost | Bricolage Grotesque + Instrument Sans | Fraunces Italic + Figtree |

Each system includes color roles with **computed contrast ratios** (all pass WCAG AA), type roles, spacing and shape, every component, a side-by-side table of control states (rest, hover, focus, pressed, selected, disabled), and empty, loading, error and success states.

---

## 4. Why Line & Stone for the site

I chose Line & Stone.

**[edit in your words]** Suggested reasoning:
- **It stays out of the food's way.** My guests' creations and the ingredients are the color. A quiet limestone background and ink hairlines let them stand out.
- **It matches the lab.** The precise lines, labels and numbered steps (01 Bring, 02 Learn, 03 Build) feel like a well-organized kitchen, which suits teaching food science.
- **"Refined without overindulgence"** fits my anti-pretentious philosophy. It's calm and considered, not fancy.
- **One accent color makes the next step obvious.** Blue appears only on the main action in each section.

---

## 5. Key design decisions on the site

**Structure: one scrolling page.** Next lab → 01 Bring → 02 Learn → 03 Build → Past nights. (The agent suggested this. It's easiest to share as one link, and most guests open it on a phone.) A sticky nav **highlights the section you're in** as you scroll (my request).

**What guests see first.** The huge "Pizza night" title and one blue button. Later, I **muted the overview and Past nights**: grey body text, lighter lines, and a desaturated photo archive. That way the three steps carry the visual weight, and the past reads as quiet memories that come back to full color on hover.

**Bring: typing comes first.** I asked for "What are you bringing?" to be the main input, with the click-to-pick ideas list moved below as **"Stuck? Pick from these ideas."** The page starts with nothing claimed, guests can bring **more than three**, "Already in the pool · don't double up" sits between the two, and duplicates are caught ("Maya's already bringing basil").

**Learn: food-science lessons.** Four Pizza-night principles, each with an "At the table" takeaway and the pool ingredients it applies to, ending in "Start building."

**Build: the lessons show up as you build.**
- Your creation splits into **Into the oven** and **After the bake** (lesson 4).
- A **taste balance** meter (Salty, Sweet, Sour, Spicy, Umami) gives a gentle nudge that never says a creation is wrong (lesson 3).
- The base is **"I'll provide · use it, swap it, or skip it."** I corrected the original "On every pizza," because anything could be on any pizza.
- **"The pool"** gets a matching label, so my base and the guests' ingredients are clearly distinct.
- Filters by **Category** (Cheese, Produce, Proteins, Finish) and by **Taste**.

**How people know what's clickable.** Bordered buttons and chips, underlined links, a hand cursor, photos that regain color on hover, and a visible 2px focus ring on every control for keyboard users.

**What each state communicates.**
- **Selected turns ink,** so the blue always points to the *next* step.
- **Disabled** is greyed with a not-allowed cursor. The design systems demonstrate this at a three-item cap; the site has no cap.
- **Hover** shifts the background, and **pressed** sinks it.
- **Success** messages are green, and **errors** are terracotta with the fix spelled out.

**Hub.** A **neutral, generic** theme (my request), so it frames the work without favoring one style. Only the previews carry each style.

---

## 6. How I used the agent (and where I pushed back)

**What I asked for:** guidance on mood boards, then the boards, design systems and site, built in small steps. I reviewed each step in the browser before committing.

**Where I pushed back or changed direction:**
- **"Too pretentious."** The first copy used tasting-menu language ("Seven courses… served in order," Primi/Secondi). I rejected it and defined my philosophy: the guest is the final chef. All copy was rewritten to be warm and guest-centered.
- **The event model.** The first design assumed guests pick finished dishes from a menu. I explained that my events are an *ingredient potluck* with a theme and a shared pool, so the data and components were reworked.
- **Teaching.** I added that I teach food science so guests can build their own masterpiece, which became the lessons component.
- **"Anything could be on any pizza."** I corrected the fixed base so the dough and sauce are optional.
- **Words matter.** Acid became **Sour**, Rich became **Umami**, Heat became **Spicy**, Veg became **Produce**, and Meat & fish became **Proteins**.
- **Content I didn't like.** I added my real dishes from a menu PDF, then had the photos removed, and then the whole section.
- **Defaults.** No pre-picked ingredients. Typing first, ideas second. No three-item cap.
- **Visual tuning by name.** Muted the overview, desaturated Past nights further, removed a stray scrollbar from the tabs, renamed the header to "Phamtastic Food Lab," and switched the hub to a generic theme.

**What the agent contributed that I kept:**
- Reserving one accent color for the primary action in each system.
- Computing contrast ratios, and fixing an invisible keyboard focus ring.
- Building every state into a side-by-side table.
- Sharing one data model and set of components across the three systems.
- Testing every change in a real browser at 390px and 1440px before I committed.

**What I decided myself:** the three moods' direction, every photo swap and the board order, the site's style and name, the event model and philosophy, and every wording and interaction change listed above.

---

## 7. Still placeholder

- Guest names (Maya, Jordan, Sam, Priya, Leo) and what they're bringing.
- The Past nights archive: themes, dates, lessons, and who built what. The photos are mine; the details are invented.
- The Pizza night date.
