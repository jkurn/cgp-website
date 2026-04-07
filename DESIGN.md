# Design System — PT Citra Gemilang Prima

## Product Context
- **What this is:** Premium B2B single-page marketing site for an Indonesian food importer & distributor
- **Who it's for:** International food brand manufacturers (principals) and Indonesian modern trade retail buyers
- **Space/industry:** Premium food import / B2B wholesale / Indonesia FMCG
- **Project type:** Marketing site (single-page, static, GitHub Pages)

## Aesthetic Direction
- **Direction:** Refined editorial — luxury food house meets import authority
- **Decoration level:** Intentional — fine rules, generous whitespace, occasional gold accent details. No blobs, no gradients as decoration, no icons in circles.
- **Mood:** Authoritative without being cold. Premium without being fashion. Food-adjacent warmth anchored by B2B seriousness.
- **Reference aesthetic:** Williams-Sonoma, Harrods Food Hall, Dean & DeLuca — not SaaS, not fashion luxury

## Typography
- **Display/Hero:** `Fraunces` — variable optical serif. High contrast, genuine editorial character, less used than Playfair Display. Use italic variant sparingly on hero headlines for maximum impact.
- **Body/UI:** `Plus Jakarta Sans` — warmer and more distinctive than Inter. Designed by a Jakarta studio — culturally resonant. Use 400 for body, 500 for UI labels, 600 for buttons and eyebrows.
- **Loading:** Google Fonts CDN — `family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,300;1,9..144,400;1,9..144,600&family=Plus+Jakarta+Sans:wght@400;500;600;700`
- **Scale:**
  - h1: `clamp(2.4rem, 5vw, 3.8rem)` / weight 600 / tracking -0.02em
  - h2: `clamp(1.8rem, 3.2vw, 2.6rem)` / weight 600 / tracking -0.015em
  - h3: `1.4rem` / weight 600 / tracking -0.01em
  - eyebrow: `0.72rem` / weight 700 / tracking 0.18em / uppercase
  - body: `1rem` / weight 400 / line-height 1.75
  - small/caption: `0.85rem` minimum

## Color
- **Approach:** Restrained — 1 brand accent (burgundy) + material accent (bronze gold) + warm neutrals. Color is rare and carries weight.
- **Burgundy:** `#7B1D26` — primary action, CTA buttons, link hover. Distinctive and warm. Do not change.
- **Burgundy hover:** `#9E2736`
- **Bronze Gold:** `#9C7A3C` — decorative accent, dividers, eyebrow labels, partner tags. Cooler and darker than a standard gold — reads as patinated material, not decoration. Do not use orange-warm golds (#C5993A and warmer are retired).
- **Gold light:** `#B89652` — used on dark backgrounds (hero, dark sections) where the base gold would be too dark.
- **Cream:** `#F8F6F1` — primary background. Warm, not clinical. Keep.
- **Charcoal:** `#1E1E24` — primary text, dark section backgrounds. Keep.
- **Charcoal-2:** `#3A3A42` — secondary text, subheadings
- **Charcoal-3:** `#6B6B78` — muted text, captions
- **Border:** `#E4DDD0` — subtle warm divider
- **Dark mode:** Not implemented. If added: use elevation-based surfaces, not simple lightness inversion. Keep burgundy and gold but desaturate 10-15%.

## Spacing
- **Base unit:** 8px
- **Density:** Spacious — this is a premium positioning site, not a data dashboard
- **Section padding:** 96px vertical
- **Container max-width:** 1200px
- **Container padding:** 32px horizontal
- **Scale:** 4 / 8 / 16 / 24 / 32 / 48 / 64 / 96

## Layout
- **Approach:** Grid-disciplined — strict column alignment, predictable hierarchy. No editorial asymmetry.
- **Border radius:** 4px uniform (`--radius`). Never increase to bubbly values. The minimal radius signals precision, not approachability.
- **Max content width:** 1200px

## Motion
- **Approach:** Intentional — animations communicate state, they don't decorate
- **Scroll reveal:** IntersectionObserver, threshold 0.05, `opacity 0.65s + translateY(24px) → 0`
- **Carousel:** Pure fade (opacity only), 0.4s — no horizontal slides
- **Hero entry:** fadeUp staggered at 0.2s intervals (eyebrow → h1 → p → CTAs)
- **Easing:** ease-out for entering, ease-in for exiting
- **Duration range:** 0.25s (micro interactions) → 0.65s (scroll reveals)
- **prefers-reduced-motion:** Fully respected — all animations disabled

## Principles
1. **Never reach for Playfair Display again.** It signals "we tried to look premium" rather than being premium. Fraunces is the display font.
2. **Never use Inter or Roboto.** Plus Jakarta Sans is the body font.
3. **Gold means bronze, not candy.** `#9C7A3C` only. No warmer values.
4. **No blobs, wavy dividers, or icons in colored circles.** These are AI slop anti-patterns.
5. **Burgundy is the only primary action color.** Do not add a second action color.
6. **Whitespace is a design element.** The generous spacing is intentional — resist adding content density.

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-04-07 | Playfair Display → Fraunces | Playfair is overused for "luxury" positioning. Fraunces has more genuine editorial character. |
| 2026-04-07 | Inter → Plus Jakarta Sans | Inter is the world's most-used web font — zero differentiation. Plus Jakarta Sans is warmer and more considered. |
| 2026-04-07 | Gold shifted #C5993A → #9C7A3C | Old gold had an orange-warm bias that read cheap. New bronze gold reads as patinated material. |
| 2026-04-07 | h3 size 1.25rem → 1.4rem | Restores the type scale ratio (1.25× was too close to body text at 1.6rem). |
| 2026-04-07 | Negative letter-spacing on headings | Fraunces at large optical sizes tracks too loosely at default. -0.015em to -0.02em tightens display text to professional standard. |
| 2026-04-07 | Body line-height 1.65 → 1.75 | Plus Jakarta Sans has slightly tighter default metrics than Inter. 1.75 restores comfortable reading rhythm. |
