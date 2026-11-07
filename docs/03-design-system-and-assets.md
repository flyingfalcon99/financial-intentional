# Design System & Brand Assets Specification

## 1. Color Palette (Executive Navy & Intentional Emerald)
Designed for high financial authority, WCAG AA/AAA contrast compliance, and tactile visual clarity across mobile and desktop viewports.

| Token | Hex | HSL | Usage |
| :--- | :--- | :--- | :--- |
| `--navy-950` | `#071120` | `hsl(216, 64%, 8%)` | Deep hero/footer canvas & primary dark surfaces |
| `--navy-900` | `#0A192F` | `hsl(216, 65%, 11%)` | Executive cards, calculator dark summary panel |
| `--navy-800` | `#112240` | `hsl(218, 58%, 16%)` | Elevated dark containers & interactive borders |
| `--emerald-600` | `#059669` | `hsl(161, 94%, 30%)` | Primary CTA buttons, active slider tracks, key accents |
| `--emerald-500` | `#10B981` | `hsl(160, 84%, 39%)` | Interactive highlights, P&I chart segment, badges |
| `--gold-500` | `#D97706` | `hsl(32, 95%, 44%)` | Secondary warm accent for taxes/advisory callouts |
| `--surface-ivory` | `#F8FAFC` | `hsl(210, 40%, 98%)` | Primary light section background |
| `--surface-card` | `#FFFFFF` | `hsl(0, 0%, 100%)` | Elevated interactive cards with subtle warm border |

## 2. Typography System
- **Display / Headings (`--font-display`):** *Fraunces* / *Playfair Display* (Editorial authority for headlines and financial metrics).
- **UI & Body (`--font-sans`):** *Plus Jakarta Sans* / *Inter* (Crisp legibility for calculator sliders, disclosures, and mobile navigation).
- **Numeric Readouts (`--font-mono`):** `font-variant-numeric: tabular-nums` enforced on all live calculator outputs so numbers never jitter while dragging sliders.

## 3. Asset Repository & Handoff Checklist
- [ ] Primary Vector Logo (`SVG` / `EPS`) — Light & Dark variants (`public/brand/`)
- [ ] Treece Financial Group affiliation badge (`SVG` / `PNG`)
- [ ] JSS Recruiting partner mark (`SVG` / `PNG`)
- [ ] Equal Housing Lender vector icon (`Included in prototype`)
