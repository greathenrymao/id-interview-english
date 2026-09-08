# UI comfort pass (v9)

Sources reviewed 2026-09-08:
- https://developer.apple.com/design/tips/ (hit targets, legibility, spacing)
- https://developer.apple.com/design/human-interface-guidelines/layout (safe areas and adaptation)
- https://developer.apple.com/design/human-interface-guidelines/tab-bars (consistent labeled navigation)
- https://developer.apple.com/design/human-interface-guidelines/icons (optical balance)

Web implementation choices, not an Apple certification or native-point equivalence:
- Action glyphs 22 CSS px inside 44 x 44 CSS px controls at default text scale; 8 px action spacing.
- Tab glyphs 24 px at default scale, consistent custom SVG strokes; no Apple symbol assets are redistributed.
- Compact navigation uses Chinese labels; desktop uses bilingual labels beside icons. Accessible names remain bilingual.
- Keep translation next to its English text. On mobile, sentence actions move below the text; short words keep trailing actions.
- Respect top/bottom/side safe-area insets. A ResizeObserver measures tab-bar height to reserve content and toast space.
- Inline dictionary words remain inline text-sized targets (not all text tokens claim 44 px targets).
- Calendar dates preserve 44 px targets with contained horizontal scrolling on very narrow screens, rather than causing page overflow.
- Checkboxes have full-height labels; text fields retain 16 px default text size and keyboard-focus clearance.

No curriculum or storage-key changes. ui-text-test.html is a local-only 200% text-scale fixture and is not part of deployment.
