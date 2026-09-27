# LaunchPad — Autonomous Orbit Operations & Telemetry Platform

> **Aesthetic & Design System**: *Aerospace Deep Orbital*  
> Built for orbital launch operators, satellite fleet managers, and space telemetry engineers.

LaunchPad is a mission-critical aerospace web application designed to deliver real-time constellation management, automated collision avoidance vectors, sub-second global ground telemetry, and flight-ready SDK integration across LEO, MEO, and GEO orbital regimes.

---

## 🛰️ Key Platform Capabilities

### 1. Real-Time Telemetry & Orbital HUD
- **Dynamic Orbital Simulation**: Interactive ECI-J2000 coordinate projection tracking live spacecraft across LEO (~500 km), MEO (~20,000 km), and GEO (35,786 km).
- **Satellite Inspector**: Direct telemetry telemetry lock on active spacecraft (`SAT-401A`, `STAR-LINK-V24`, `OPTIC-X9`, `QKD-PRIME`, `RELAY-04B`) displaying altitude, orbital velocity, solar battery SOC, propulsion fuel reserves, thermal regimes, and RF signal strength.
- **Debris Hazard & Conjunction Simulation**: One-click conjunction event injection with autonomous delta-v evasive burn execution.

### 2. Worldwide Terrestrial Ground Station Network
- **Global Mesh Coverage**: Tracking pass telemetry across 85+ terrestrial stations including Svalbard Arctic, Guiana Space Center, White Sands, Hartebeesthoek, and Perth Deep Space.
- **Steerable Antenna HUD**: Interactive azimuth/elevation radar dial, carrier frequency selection (Optical Laser, Ka-band, X-band), SNR readouts, and antenna re-calibration.

### 3. Space-Grade Developer Stack & Live SDK Runner
- **Multi-Language SDKs**: First-class code examples for **Python**, **Rust (`tokio`)**, **C++**, and **TypeScript**.
- **Interactive Query Runner**: Execute mock gRPC / REST telemetry queries directly in the browser to view live simulated responses, latency figures, and resolved burn vectors.

### 4. Interactive Mission Cost Configurator & Tier Calculator
- **Three Core Tiers**:
  - **CubeSat & Test Flight**: University and demonstrator missions ($1,490/mo).
  - **Commercial Constellation**: Mega-constellations and broadband fleets ($4,850/mo).
  - **Deep Space & Defense**: Classified, lunar, and interplanetary operations ($14,900/mo).
- **Dynamic Sliders**: Configure active spacecraft (1–120+), optical bandwidth (5–100 Gbps), and contact passes per day (4–96) with instant cost recalculation and annual billing discount.

### 5. Mission Control Flight Deck Console
- **Live CCSDS Packet Stream**: Real-time incoming telemetry frames with auto-scroll and synthesized audio feedback.
- **RCS Thruster & Delta-V Solver**: Maneuver planning interface with prograde, normal, and radial vector sliders, plume animation, and orbital delta calculation.
- **Subsystem Health Diagnostics**: Health checks across ADCS, EPS, RF arrays, optical transceivers, and propulsion.
- **Interactive Flight CLI**: Fully functional terminal supporting commands: `help`, `status`, `satellites`, `burn <dv>`, `ping <station>`, `diagnostics`, `clear`, and `abort`.

### 6. Aerospace Security, Compliance & Authentication
- **ITAR / EAR & Post-Quantum Ready**: Compliant with USML Category XV and NIST ML-KEM / Kyber-1024 cryptographic handshakes.
- **Operator Authentication Modal**: Passkey / biometric, CAC / PIV smart card, and Gov SSO options.
- **Operator Profile Drawer**: View clearance level (`LEVEL 4 - TOP SECRET`), manage API secret keys with instant regeneration, and configure webhooks.

---

## 🛠️ Technology Stack

- **Framework**: React 19 + Vite 8
- **Styling**: Tailwind CSS + Custom CSS Variables matching the *Aerospace Deep Orbital* Design System
- **Typography**: Space Grotesk (Headlines), Plus Jakarta Sans (Operational Body), JetBrains Mono (Telemetry Data)
- **Audio Feedback**: Web Audio API Synthesizer (Zero-latency procedural telemetry chirps & thruster sound effects)
- **Linting & Code Quality**: Oxlint

---

## 🚀 Running the Project

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Run Oxlint validation
npm run lint

# Compile production bundle
npm run build
```
