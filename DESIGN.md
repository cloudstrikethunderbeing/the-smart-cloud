# Design Brief

## Direction

Luxury Tech Minimalism — a high-conversion landing page for the AI agent economy, executed with brutalist confidence and maximum whitespace.

## Tone

Execution over explanation. Deep, warm dark with gold accents (wealth + trust). No hedging. Geometric sans-serif + system-precision type. This system IS; it doesn't apologize.

## Differentiation

Mathematical formula (P = 1/(c+l+r+t)) as visual centerpiece with gold outline. Intentional left-side dimming vs. right-side brightness in the Shift section to show the world change visually.

## Color Palette

| Token            | OKLCH           | Role                                 |
|------------------|-----------------|--------------------------------------|
| background       | 0.12 0.015 50   | Deep warm charcoal (dark mode)       |
| foreground       | 0.92 0.01 60    | Warm light gray text                 |
| card             | 0.16 0.018 50   | Elevated card surfaces               |
| primary (gold)   | 0.72 0.17 70    | CTAs, primary interaction, confidence |
| accent (cyan)    | 0.72 0.15 190   | Secondary highlights, tech energy    |
| muted            | 0.18 0.015 50   | Muted backgrounds, dimmed text       |
| destructive      | 0.65 0.19 22    | Error states                         |

## Typography

- Display: Space Grotesk — geometric sans for hero, section titles, formula. Bold, tight tracking, 5xl–8xl at hero scale.
- Body: DM Sans — clean, readable, 16px base, used for supporting text and UI labels.
- Mono: Geist Mono — formula display and code snippets, monospace precision.
- Scale: hero 8xl bold tracking-tight, section h2 5xl bold tracking-tight, labels xs uppercase semibold tracking-widest, body text-base md:text-lg.

## Elevation & Depth

Minimal shadow hierarchy — cards use subtle borders (1px) instead of shadows. Dark mode surfaces rely on lightness shifts (background 0.12 → card 0.16) for depth. Gold glow on formula (optional shadow-gold). No layered shadows; clean, flat geometry.

## Structural Zones

| Zone    | Background    | Border | Notes                                                  |
|---------|---------------|--------|--------------------------------------------------------|
| Hero    | background    | none   | Full-viewport, centered content, max whitespace        |
| Section | background    | none   | Alternating content + muted/20 sections for rhythm     |
| Cards   | card + border  | 1px    | Ecosystem cards, formula container, comparison blocks |
| Footer  | background/20 | 1px    | Light border-top, footer text muted-foreground         |

## Spacing & Rhythm

Vertical rhythm: 6xl/8xl hero headline, 3–4rem gap to subheadline, 4–5rem gap to proof strip, 8–10rem between major sections. No tight grouping — whitespace amplifies importance. Hero CTA buttons stacked or 2-column on mobile, spaced 1rem apart. Comparison cards sit 2rem apart in a grid.

## Component Patterns

- **Buttons**: gold primary (bg-primary text-primary-foreground), cyan secondary (bg-accent text-accent-foreground), 3rem min-height, semibold, rounded-sm (subtle 6px), hover:opacity-90 transition.
- **Cards**: bg-card border border-border rounded-sm. Formula container has gold border (border-primary) + optional gold shadow. Comparison cards: left .comparison-old (muted/20), right .comparison-new (primary/10).
- **Proof Strip**: horizontal flex, muted-foreground text, gold underline or top-border.

## Motion

- Entrance: fade-in (0.4s) + slide-up (0.5s) staggered for hero elements. Section content reveals on scroll.
- Hover: buttons transition-smooth (0.3s) with opacity-90. No scale or complex transforms.
- Decorative: pulse-gold (2s infinite) on formula, optional. No bouncing or overstated animations.

## Constraints

- Mobile-first: all text sizes scale from sm to md/lg breakpoints. CTA buttons full-width on mobile, 1/3 width on md+.
- No decoration: no gradients, no patterns, no textures — clean flat surfaces only.
- Whitespace-first: every section must have 8rem+ vertical gap. No crowding.
- Dark mode primary: execute in dark, light mode optional.

## Signature Detail

Large monospace formula (P = 1/(c+l+r+t)) centered on its own section with gold outline and subtle pulse animation — the mathematical heart of agent selection logic made visual.
