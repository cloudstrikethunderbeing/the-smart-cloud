# Design Brief

## Direction

Obsidian Mica — a mobile-first, iOS-inspired landing page for The Smart Cloud: deep obsidian/midnight glass with electric blue/cyan + violet accents, built around the cloud logo and the tagline "Results over attention."

## Tone

Native Apple confidence. Frosted glass/mica surfaces over near-black obsidian, ultra-clean white + muted silver type, electric gradient accents used sparingly. Feels like an iOS system screen, not a marketing page.

## Differentiation

The cloud logo floats in a blue-purple glow halo as the hero; every card is a frosted mica pane with a glowing gradient border that ignites on hover/touch. Native Cupertino type + fluid display scale make it feel like first-party Apple software.

## Color Palette

| Token            | OKLCH           | Role                                  |
|------------------|-----------------|---------------------------------------|
| background       | 0.012 0.005 265 | Near-black obsidian (#000–#0a0a0c)    |
| foreground       | 0.96 0.01 265   | Ultra-clean white (#f5f5f7) text      |
| card             | 0.09 0.012 265  | Obsidian mica card surface            |
| primary (blue)   | 0.72 0.16 250   | Electric blue, CTAs, primary accents  |
| accent (cyan)    | 0.78 0.13 200   | Cyan highlights, secondary accents    |
| muted            | 0.15 0.012 265  | Muted surfaces, dimmed panels         |
| muted-foreground | 0.60 0.01 265   | Muted silver (#86868b) text           |
| violet (gradient)| 0.62 0.18 305   | Gradient tail on glows/borders        |
| destructive      | 0.62 0.2 25     | Error states                          |

## Typography

- Display: Cupertino system stack (-apple-system / SF Pro Display) — hero, section titles, fluid clamp scale, tight tracking.
- Body: Cupertino system stack (-apple-system / SF Pro Text) — paragraphs, labels, UI text.
- Mono: Geist Mono — OPP-LITE formula, code, numeric accents.
- Scale: hero clamp(2.5rem,9vw,5rem) bold -0.03em, h2 3xl→5xl bold -0.02em, label xs uppercase tracking-widest, body text-base md:text-lg.

## Elevation & Depth

Depth via frosted glass (backdrop-blur-xl + saturate) over layered obsidian, 1px translucent borders, and soft electric/violet glows on hover. Mica cards lift (translateY -4px + scale 1.015) with a gradient border ignition.

## Structural Zones

| Zone    | Background       | Border   | Notes                                       |
|---------|------------------|----------|---------------------------------------------|
| Header  | background       | none     | Minimal, sticky, no chrome                  |
| Hero    | background + aurora orbs | none | Cloud logo in glow halo, centered, mix-blend screen |
| Content | background       | —        | Alternating mica-card bento / full-width panes |
| Cards   | mica (blur)      | 1px      | Eco cards, founder card, pillars bento grid |
| Footer  | background/20    | 1px top  | Muted-foreground text, social icon buttons  |

## Spacing & Rhythm

Mobile-first: cards full-width stacked with 1rem gaps, grid on md+. Section gaps 6–10rem, hero 8xl vertical. Micro-spacing 0.5–1rem inside cards. Min 44px touch targets on all buttons and icon buttons.

## Component Patterns

- Buttons: pill (rounded-full), min 3rem height, primary = electric gradient fill + glow, secondary = frosted glass border, hover scale 1.02, active scale 0.97.
- Cards: mica-card rounded-[1.75rem], backdrop-blur-xl, 1px translucent border, gradient glow border on hover, lift + scale.
- Badges: rounded-full pill, muted/20 bg, accent dot, uppercase xs label.
- Icon buttons: 3rem circle (min 44px), frosted glass, hover scale 1.04.

## Motion

- Entrance: staged fade-in + slide-up (logo 0s, content 0.75s, world 1.35s).
- Hover: cards lift + scale 1.015 with gradient border, buttons scale 1.02, 0.35s spring-like cubic-bezier.
- Decorative: logo-glow-pulse (4s), aurora-pulse (8s) ambient orbs. No bouncing.

## Constraints

- Mobile-first: all text fluid via clamp, cards full-width on mobile, bento grid on md+.
- Cupertino system font stack — no external font download for UI.
- Frosted glass/mica + subtle borders; glows reserved for hover and the hero logo.
- Dark mode only; min 44px touch targets; no BarelyHuman.ai / JackBear.ai links.

## Signature Detail

The cloud logo as a self-luminous hero — purple-to-cyan gradient cloud with infinity + circuitry, mix-blend screen, breathing blue-purple glow halo — the single unforgettable focal point above the frosted ecosystem cards.
