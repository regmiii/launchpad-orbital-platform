---
name: Aerospace Deep Orbital
theme: dark
project: LaunchPad
stitch_project_id: projects/4726580104550988865
colors:
  surface: '#051424'
  surface-dim: '#051424'
  surface-bright: '#2c3a4c'
  surface-container-lowest: '#010f1f'
  surface-container-low: '#0d1c2d'
  surface-container: '#122131'
  surface-container-high: '#1c2b3c'
  surface-container-highest: '#273647'
  on-surface: '#d4e4fa'
  on-surface-variant: '#cfc2d6'
  inverse-surface: '#d4e4fa'
  inverse-on-surface: '#233143'
  outline: '#988d9f'
  outline-variant: '#4d4354'
  surface-tint: '#ddb7ff'
  primary: '#ddb7ff'
  on-primary: '#490080'
  primary-container: '#b76dff'
  on-primary-container: '#400071'
  inverse-primary: '#842bd2'
  secondary: '#7bd0ff'
  on-secondary: '#00354a'
  secondary-container: '#00a6e0'
  on-secondary-container: '#00374d'
  tertiary: '#fbabff'
  on-tertiary: '#580065'
  tertiary-container: '#e14ef6'
  on-tertiary-container: '#4d0059'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#f0dbff'
  primary-fixed-dim: '#ddb7ff'
  on-primary-fixed: '#2c0051'
  on-primary-fixed-variant: '#6900b3'
  secondary-fixed: '#c4e7ff'
  secondary-fixed-dim: '#7bd0ff'
  on-secondary-fixed: '#001e2c'
  on-secondary-fixed-variant: '#004c69'
  tertiary-fixed: '#ffd6fd'
  tertiary-fixed-dim: '#fbabff'
  on-tertiary-fixed: '#36003e'
  on-tertiary-fixed-variant: '#7c008e'
  background: '#051424'
  on-background: '#d4e4fa'
  surface-variant: '#273647'
typography:
  display-hero:
    fontFamily: Space Grotesk
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Space Grotesk
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-xl:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
    letterSpacing: -0.005em
  title-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  title-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  telemetry-metric:
    fontFamily: JetBrains Mono
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 34px
    letterSpacing: -0.02em
  label-mono-lg:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.02em
  label-mono-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.04em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  gutter-lg: 2rem
  margin: 2rem
  margin-mobile: 1rem
  margin-desktop: 3rem
  space-2xs: 0.125rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
  space-3xl: 4.5rem
---

# Design System: Aerospace Deep Orbital

Extracted from Stitch Project: **LaunchPad** (`projects/4726580104550988865`)

---

## 1. Brand & Aesthetic Overview

The design system projects mission-critical precision, aerodynamic elegance, and the calm authority of advanced aerospace operations. Built for orbital launch operators, satellite fleet managers, and space telemetry engineers, the interface eliminates cognitive clutter while delivering dense, high-frequency telemetry data with extreme legibility.

The aesthetic fuses **Modern Technical Glassmorphism** with **Orbital Minimalist Depth**:
- **Operational Strata**: Translucent glass layers (`rgba(19, 27, 51, 0.65)` to `rgba(26, 36, 68, 0.85)` with `backdrop-filter: blur()`).
- **High-Chroma Signals**: Electric purple (`#A855F7`) and violet for master actions and state changes; cyan tracers (`#38BDF8`) for active telemetry vectors and nominal pings; plasma magenta (`#D946EF`) for critical alerts.
- **Surface Finish**: Anti-reflective flight-deck instrumentation styling against deep orbital voids (`#051424` / `#090D1A`).

---

## 2. Color Palette

### 2.1 Void & Surface Continuum

| Token | Value | Opacity / Treatment | Usage |
| :--- | :--- | :--- | :--- |
| **Void 0 (Canvas Base)** | `#090D1A` | 100% | Absolute ground; deep telemetry charts, app canvas |
| **Void 1 (Canvas Alternate)** | `#0D1326` | 100% | Base panel layout background, structural grid fields |
| **Surface (Default)** | `#051424` | 100% | Core application surface / dark background |
| **Surface 1 (Base Container)**| `#131B33` | 70% + 16px blur | Standard operational card container |
| **Surface 2 (Elevated)** | `#1A2444` | 80% + 24px blur | Popovers, flyout drawers, active telemetry monitors |
| **Surface 3 (Interactive)** | `#232F58` | 100% | Table headers, inactive button chips, toggle tracks |
| **Surface Bright** | `#2C3A4C` | 100% | High-contrast elevated panels |
| **Surface Dim** | `#051424` | 100% | Submerged surface containers |

### 2.2 Accent & Signal Colors

| Role | Color Name | Hex Code | Visual Application |
| :--- | :--- | :--- | :--- |
| **Primary Accent** | Electric Violet | `#A855F7` | Master actions, primary buttons, selected telemetry vectors |
| **Primary Bright** | Solar Lavender | `#C084FC` | Hover highlights, active edge borders, illuminated text labels |
| **Primary Muted** | Deep Ion | `#8B5CF6` | Focus outlines, selected segment fills |
| **Secondary Accent** | Orbital Cyan | `#38BDF8` | Live telemetry pulses, altitude traces, sync status, active metrics |
| **Tertiary Accent** | Plasma Magenta | `#D946EF` | Critical velocity bounds, payload stage events, urgent alerts |
| **Error / Abort** | Orbital Crimson | `#FFB4AB` / `#EF4444` | Abort actions, safety thresholds breached, critical errors |

### 2.3 Typography & Neutral Tones

| Token | Hex Code | Purpose |
| :--- | :--- | :--- |
| **Star White (Text Display)** | `#FFFFFF` | Primary optical contrast for headlines, KPIs, critical metrics |
| **On-Surface (Light Blue-White)** | `#D4E4FA` | Primary UI labels, modal headers, navigational items |
| **Lunar Slate (Text Body)** | `#CBD5E1` | High-legibility long-form text, descriptions, parameter values |
| **Muted Orbit (Text Subdued)** | `#94A3B8` | Unit symbols, auxiliary metadata, inactive iconography |
| **Outline / Cosmic Dust** | `#1E293B` / `#4D4354` | Table grid borders, subtle dividers, containment outlines |

---

## 3. Typography

The typography architecture uses a deliberate three-tier hierarchy tailored for technical aerospace computing:

1. **Space Grotesk (Headlines & Structural Titles)**: Engineered geometric grotesque typography providing futuristic, high-stability visual hooks.
2. **Plus Jakarta Sans (Operational Body)**: Balanced, low-fatigue humanist sans-serif providing optimal readability on dark backlit displays.
3. **JetBrains Mono (Data & Telemetry Engine)**: Fixed-width tabular readouts, timestamps, azimuth/elevation coordinates, and velocity readings.
