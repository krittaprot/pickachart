# AGENTS.md

Project context for AI agents and developers working on **Pick a Chart** (`pickachart`) — a prompt template website for data visualization.

## What this project is

A Next.js single-page app at `pickachart.vercel.app` that helps users pick a chart type and generate a ready-to-use prompt for AI tools. Users either:

1. Click the featured **"Help me pick the best chart"** card to get a recommendation, or
2. Pick a specific chart template from a 3-column grid (12 chart types) to fill in a prompt builder.

The prompt builder is a modal with a goal field, a data field, optional extra notes, optional output preference chips (for chart templates), and a copy-to-clipboard button.

## Tech stack

- **Next.js 16** with App Router (Turbopack)
- **React 19**
- **TypeScript** (strict mode)
- **Tailwind CSS v4** (no `tailwind.config.js` — uses `@theme inline` in `globals.css`)
- **shadcn/ui** with `base-nova` style, neutral base color, oklch CSS variables
- **lucide-react** for icons
- **@base-ui/react** primitives (used internally by shadcn/ui)
- **pnpm** for package management (never npm or yarn)
- Deployment target: Vercel
- Public site: `pickachart.vercel.app`

## Project structure

```
src/
  app/
    globals.css          # Tailwind v4 import + shadcn theme (oklch vars) + all keyframes
    layout.tsx           # Root layout with Geist fonts, metadata
    page.tsx             # Homepage (server component, hero only)
  components/
    ui/                  # shadcn/ui primitives
      button.tsx
      card.tsx
      badge.tsx
      input.tsx          # shadcn default focus ring (not customized)
      textarea.tsx       # customized focus ring (softer, lighter — see below)
      dialog.tsx         # customized overlay/content timing (see below)
    prompt-grid.tsx      # Client: search + featured + grid + modal state
    featured-card.tsx    # "Help me pick the best chart" card
    chart-card.tsx       # Individual chart template card
    prompt-builder.tsx   # Modal with goal/data/notes/output fields
  data/
    prompts.ts           # 12 chart templates + recommendation config + generators
  lib/
    utils.ts             # cn() helper
public/
  sw.js                  # Service-worker cleanup (unregisters stale SW + clears caches)
run.sh                    # Clean dev launcher (rm -rf .next && pnpm dev)
```

## Key conventions

### Server vs client components
- `app/page.tsx` is a **server component** (no interactivity)
- Anything with state, effects, or event handlers is a **client component** (`"use client"`)
- Keep server/client boundaries clean — don't import client components from server ones except as children

### Animation conventions
- **Pure CSS only** — no framer-motion or animation libraries. All animations are CSS keyframes + Tailwind transitions.
- **Easing curves** (used throughout):
  - `cubic-bezier(0.16, 1, 0.3, 1)` — ease-out-expo for entrances, page load, dialog animations (Apple / Material Design 3)
  - `cubic-bezier(0.4, 1, 0.6, 1)` — "ease-out practical" for hover/press micro-interactions (Atlassian)
  - `cubic-bezier(0.2, 0.8, 0.2, 1)` — springy overshoot for copy-pop, chip toggle
  - `cubic-bezier(0.32, 0, 0.67, 0)` — decelerating exit for dialog close
- **Timing**:
  - Micro-interactions (chip toggle, button press): 100-180ms
  - Standard transitions (hover, focus): 150-250ms
  - Emphasis transitions (dialog entrance, section fade-in): 300-500ms
  - Page entrance stagger: 80ms between elements (search → featured → grid)
- **Card motion pattern**: subtle lift (`-translate-y-0.5`), shadow step-up, border tint, and a `::after` state-layer overlay (`bg-primary/5`) that fades in on hover. Scale is minimal (`scale-[0.992]` on press only). Active/selected card uses border highlight + ring + state layer, not large scale.
  - Hover: `duration-150` with `ease-[cubic-bezier(0.4,1,0.6,1)]`
  - Press: `active:duration-100` for snappy feedback
  - State layer: `after:bg-primary/5 after:opacity-0 hover:after:opacity-100 after:duration-150`
- **Dialog animations**: custom keyframes with blur + scale + shadow choreography. Entry 380ms, exit 200ms, sections stagger with `[animation-delay:55ms]` / `[animation-delay:105ms]`.
- **Page entrance animations**: hero uses `animate-fade-in-up` (500ms), search/featured/grid use `animate-fade-in-up` or `animate-slide-up-fade` with staggered `[animation-delay:...]`.
- **Warning/validation messages**: use `animate-warning-enter` (250ms slide-down).
- **Accessibility**: All animations are disabled via `prefers-reduced-motion: reduce` media query in `globals.css`.
- **Keyframes** are defined in `src/app/globals.css` with matching `@layer utilities` classes (e.g. `.animate-fade-in-up`).
- **Stagger delays** use Tailwind arbitrary values: `[animation-delay:80ms]`.
- **`animation-fill-mode: both`** is used on all entrance animations so elements start invisible and animate in without FOUC.
- **GPU acceleration**: Transform and opacity are used exclusively (no layout-triggering properties). Never use `will-change` on lists of >3 elements.

### Spacing rhythm (Tailwind v4)
- **4px base unit**: `1=4px, 2=8px, 3=12px, 4=16px, 6=24px, 8=32px, 10=40px, 12=48px`
- **Prefer `gap-*` over `space-y-*`** (shadcn v4 rule)
- **Card padding**: `px-6 py-6` for standard cards, `px-8 py-10` for featured
- **Card section gap**: `gap-6` (24px) between icon block, title block, and chips
- **Title→description**: `gap-1.5` (6px) inside the title block
- **Form fields in modals**: `gap-5` (20px) between fields, `gap-2` label→input
- **Modal footer**: `flex-col-reverse gap-2 sm:flex-row sm:justify-end`
- **Section breaks (page-level, not within a flow)**: `gap-16 md:gap-20 lg:gap-24`
- **Within-flow rhythm (e.g., search → featured → grid)**: `gap-8 md:gap-10` — these are related elements, not separate sections
- **Container**: `max-w-6xl mx-auto px-4 md:px-6 lg:px-8`
- **Hero padding**: `pt-16 pb-20 md:pt-24 md:pb-28 lg:pt-32 lg:pb-32`

### Clickable cards (no nested buttons)
Cards that are fully clickable **must not** be a `<button>` containing another `<button>`. The hydration error is severe — React refuses to patch the mismatch.

Use this pattern:
```tsx
<div
  role="button"
  tabIndex={0}
  onClick={onClick}
  onKeyDown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      onClick()
    }
  }}
  className="cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
>
  {/* content with no nested <button> elements */}
</div>
```

Style the "looks-like-a-button" child as a `<div>` with appropriate border/hover, not a real `<Button>` component.

### shadcn/ui specifics
- `Card` renders as a `<div>` — safe to nest `<Button>` inside it
- `Button` renders as `<button>` — do not nest inside another button
- `Dialog` content uses `<DialogPrimitive.Popup>` (a div) — buttons inside are fine
- `Input` and `Textarea` from shadcn render native `<input>`/`<textarea>`
- Use `cn()` from `@/lib/utils` to merge Tailwind classes
- **Customized primitives** (safe to further customize, but document here):
  - `textarea.tsx` — softer focus ring: `focus-visible:border-foreground/35 focus-visible:ring-[3px] focus-visible:ring-foreground/8` with `shadow-xs` base and `transition-[border-color,box-shadow] duration-200`
  - `dialog.tsx` — overlay uses `data-open:duration-300` with premium easing; content uses `data-open:duration-300`

### Prompt builder behavior
- **Reset on close**: All form state (goal, data, extra notes, output preference, copied, warning, resetting) clears when the dialog closes. The reset happens after the close animation (220ms delay) to avoid visual flicker, and also resets immediately before a fresh open.
- **Reset on explicit button**: The Reset button clears all fields with a settle animation (`animate-reset-settle`, 420ms).
- **Attached-image data shortcut**: The data field has an `I'll attach an image instead` action that fills the data textarea with `See attached image(s) for the provided data.` for Claude/image-context workflows.
- **Default goal fallback**: If data is provided but the goal is empty, copying uses and fills the goal with `Create a clear visualization that highlights the most important patterns, comparisons, and insights in the data.`
- **Copy validation**: If both goal and data are empty, shows a warning message with `animate-warning-enter` that auto-dismisses after 3 seconds.
- **Copy success**: Button turns emerald with `animate-copy-pop` on the checkmark icon for 2 seconds.

### File organization
- Keep all chart data in `src/data/prompts.ts` — single source of truth
- Each chart template includes: id, title, description, icon, examples, chartType, placeholders, and chart-specific requirements
- `generateChartPrompt()` and `recommendationTemplate.generatePrompt()` produce the final prompt strings
- When adding a new chart: update the `chartTemplates` array, pick a Lucide icon, and provide chart-specific requirements

## Common issues and how to fix them

### 1. Turbopack hydration mismatch after CSS-only changes
**Symptom**: Browser console shows `A tree hydrated but some attributes of the server rendered HTML didn't match the client properties` with diff showing old vs new class names.

**Cause**: Usually stale `.next/` output or a stale browser/service-worker cache serving old client bundles while SSR serves the new HTML.

**Fix**:
```bash
./run.sh
```

The project includes `public/sw.js` only to unregister and clear stale service-worker caches if a browser still has one registered for localhost.

### 2. `<button>` cannot be a descendant of `<button>`
**Symptom**: Hydration error with "button cannot contain a nested button" or "cannot be a descendant of button."

**Cause**: Used `<button>` for a clickable card wrapper, then put a `<Button>` (which renders as `<button>`) inside.

**Fix**: Use the `role="button" tabIndex={0}` div pattern shown above. Never wrap interactive content in a `<button>` element.

### 3. shadcn `init` may fail silently
**Symptom**: Components added but `src/lib/utils.ts` and CSS variables are missing.

**Cause**: pnpm's `[ERR_PNPM_IGNORED_BUILDS]` blocks postinstall scripts for some deps (sharp, msw, unrs-resolver).

**Fix**:
```bash
pnpm approve-builds
# Select sharp, msw, unrs-resolver (use space + enter)
# Then re-run:
pnpm dlx shadcn@latest add button card badge input textarea dialog -y
# Manually create src/lib/utils.ts with the cn() helper if missing
```

### 4. Build fails with "Cannot find name 'X'" after removing a function
**Symptom**: TypeScript error on a variable that should exist but doesn't.

**Cause**: Edit tool removed a function but the variables defined just below it got included in the deletion.

**Fix**: Re-read the file, find the missing variable definitions, and add them back. This happens when `oldString` matches a multi-line block that includes following declarations.

### 5. Tailwind v4 has no `tailwind.config.js`
All config lives in `src/app/globals.css` under `@theme inline`. The `--color-*`, `--radius-*`, `--font-*` variables are defined there and consumed as Tailwind utilities. **Do not** create a `tailwind.config.js` — it will be ignored.

### 6. `flex-shrink-0` vs `shrink-0` in v4
Both work, but `size-*` is preferred for fixed dimensions in v4. The shadcn v4 components use both — match the style of nearby code.

## Development workflow

```bash
# Install deps (first time)
pnpm install

# Run dev server (recommended — clears .next cache)
./run.sh              # localhost:3000

# Alternative (does not clear cache)
pnpm dev              # localhost:3000

# Lint
pnpm lint

# Build
pnpm build            # runs typecheck + production build
```

## Code style

- **No comments** unless explicitly requested
- Use TypeScript strict mode — avoid `any`, prefer specific types
- One component per file, named export, match filename
- Keep data, logic, and presentation separate
- When adding a new chart type: update `src/data/prompts.ts` only
- When tweaking UI: edit the component file first; customize shadcn primitives only when the default styling doesn't match the design intent, and document the customization in this file

## Testing the UI

After any UI change:
1. Run `pnpm lint` — must pass with zero issues
2. Run `pnpm build` — must complete without TypeScript or build errors
3. Use `./run.sh` (or `rm -rf .next`) before testing in browser to avoid stale hydration warnings
4. Verify the page loads at `localhost:3000` with no console errors

## Future extensions

When the project grows, consider:
- Adding a detail page for each chart (`/charts/[id]`)
- Storing prompt history in localStorage
- Exporting prompts as `.md` files
- Adding dark mode toggle (CSS variables are already set up for it)
- Sharing prompts via URL query params
