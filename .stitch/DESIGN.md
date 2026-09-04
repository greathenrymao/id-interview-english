# Design System: ID Interview English

## 1. Visual Theme & Atmosphere

An industrial-design critique room translated into a daily learning tool: precise, calm, tactile, and editorial. Density is Daily App Balanced (6/10), variance is Offset Asymmetric (6/10), and motion is Fluid CSS (4/10). The content leads; navigation stays quiet.

## 2. Color Palette & Roles

- **Studio Paper** (#F3F1EB) — primary canvas.
- **Drafting Surface** (#FCFBF7) — elevated lesson surface.
- **Graphite Ink** (#1C201F) — primary text and dark-mode canvas; never pure black.
- **Measured Gray** (#6D716E) — definitions and metadata.
- **Construction Line** (rgba(28,32,31,0.14)) — dividers and outlines.
- **Clay Marker** (#B85F3B) — the only accent; active states, progress, focus, and primary actions.

No purple, neon, blue gradients, or competing accent colors.

## 3. Typography Rules

- **Display:** Avenir Next — tight tracking, 700 weight, controlled `clamp()` scale.
- **Body:** Avenir Next — relaxed 1.6 line-height and a maximum readable measure of 65 characters.
- **Metadata:** ui-monospace — compact labels, lesson numbers, and progress values.
- **Banned:** Inter, Georgia, generic editorial serifs, oversized display copy, gradient text.

## 4. Component Stylings

- **Buttons:** flat clay fill for primary actions; translucent graphite wash for secondary actions; 44px minimum target and tactile scale feedback.
- **Cards:** used for the three main learning stages only. Large but controlled 24px radius, tinted shadow, and structural top dividers inside dense lists.
- **Inputs:** label above, inline feedback below, clay focus ring, no floating labels.
- **Navigation:** a floating functional layer with restrained blur; no decorative glass in lesson content.
- **States:** text-first success and error feedback; no emoji status marks.

## 5. Layout Principles

Mobile-first single column below 768px. Desktop uses asymmetric whitespace instead of centered hero copy. Content never overlaps and horizontal scrolling is forbidden. The primary reading column stays below 820px.

## 6. Motion & Interaction

Use spring-like easing and animate only transform and opacity. Panels reveal with a short stagger; active navigation has a slow, low-amplitude breathing marker. Respect reduced-motion and reduced-transparency settings.

## 7. Anti-Patterns (Banned)

No emoji, Inter, pure black, neon glow, blue-purple gradients, excessive cards, equal three-column feature rows, fake metrics, generic AI slogans, centered marketing heroes, overlapping elements, or decorative filler instructions.
