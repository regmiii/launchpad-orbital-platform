import React, { useState } from 'react';
import { playSound } from '../utils/audio';

export default function PricingCalculator({ onDeployMission }) {
  const [satellites, setSatellites] = useState(8);
  const [bandwidth, setBandwidth] = useState(25); // Gbps
  const [passesPerDay, setPassesPerDay] = useState(24);
  const [autoAvoidance, setAutoAvoidance] = useState(true);
  const [quantumCrypto, setQuantumCrypto] = useState(true);
  const [dedicatedFlightDirector, setDedicatedFlightDirector] = useState(false);
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'annual'

  // Dynamic calculated pricing
  const baseRate = 980;
  const satCost = satellites * 180;
  const bwCost = bandwidth * 35;
  const passCost = passesPerDay * 20;
  const avoidanceCost = autoAvoidance ? 650 : 0;
  const cryptoCost = quantumCrypto ? 480 : 0;
  const flightDirectorCost = dedicatedFlightDirector ? 2400 : 0;

  const rawMonthlyTotal =
    baseRate + satCost + bwCost + passCost + avoidanceCost + cryptoCost + flightDirectorCost;

  const monthlyTotal =
    billingCycle === 'annual' ? Math.round(rawMonthlyTotal * 0.8) : rawMonthlyTotal;

  const tiers = [
    {
      name: 'CubeSat & Test Flight',
      price: billingCycle === 'annual' ? '$1,190' : '$1,490',
      period: '/mo',
      desc: 'Ideal for academic research, cubesat demonstrators, and sub-orbital test vehicles.',
      features: [
        'Up to 3 LEO spacecraft',
        '1 Gbps shared ground downlink',
        '8 ground station passes/day',
        'REST & gRPC telemetry API',
        'Community SLA support',
      ],
      popular: false,
      cta: 'Launch Test Fleet',
      planId: 'cubesat',
    },
    {
      name: 'Commercial Constellation',
      price: billingCycle === 'annual' ? '$3,880' : '$4,850',
      period: '/mo',
      desc: 'For commercial imaging, IoT, broadband, and telecom mega-constellations.',
      features: [
        'Up to 32 active satellites',
        '25 Gbps dedicated optical mesh',
        'Unlimited polar & equatorial passes',
        'Automated Collision Avoidance AI',
        'Post-Quantum ITAR Encryption',
        'Sub-12ms ground ingest SLA',
      ],
      popular: true,
      cta: 'Deploy Commercial Fleet',
      planId: 'commercial',
    },
    {
      name: 'Deep Space & Defense',
      price: billingCycle === 'annual' ? '$11,900' : '$14,900',
      period: '/mo',
      desc: 'Sovereign space agencies, defense constellations, cislunar, and interplanetary missions.',
      features: [
        'Unlimited satellites & spacecraft',
        'Dedicated 18m steerable dishes',
        'Air-gapped on-premise deployment',
        'Dedicated 24/7 Orbital Flight Director',
        'NASA CARA / ESA DISCOS direct sync',
        'Custom FPGA telemetry edge solvers',
      ],
      popular: false,
      cta: 'Contact Flight Directorate',
      planId: 'defense',
    },
  ];

  return (
    <section className="w-full py-24 px-4 md:px-8 lg:px-12 bg-[#010f1f] border-t border-[#1c2b3c]" id="pricing">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <span className="font-['JetBrains_Mono'] text-xs text-[#7bd0ff] uppercase tracking-widest mb-3">
            MISSION-READY ORBITAL PLANS &amp; ESTIMATOR
          </span>
          <h2 className="font-['Space_Grotesk'] text-3xl md:text-4xl font-bold text-white tracking-tight">
            Transparent Pricing for Orbital Operations
          </h2>
          <p className="font-['Plus_Jakarta_Sans'] text-base text-[#94a3b8] mt-3">
            Scale seamlessly from single university CubeSats to synchronized 500-spacecraft global mega-constellations.
          </p>

          {/* Monthly / Annual Toggle */}
          <div className="mt-8 inline-flex items-center rounded-xl bg-[#0d1c2d] p-1.5 border border-[#1c2b3c]">
            <button
              onClick={() => {
                playSound('click');
                setBillingCycle('monthly');
              }}
              className={`px-4 py-2 text-xs font-['JetBrains_Mono'] font-semibold rounded-lg transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-[#a855f7] text-white shadow-[0_0_12px_rgba(168,85,247,0.4)]'
                  : 'text-[#94a3b8] hover:text-white'
              }`}
            >
              MONTHLY INVOICING
            </button>
            <button
              onClick={() => {
                playSound('click');
                setBillingCycle('annual');
              }}
              className={`px-4 py-2 text-xs font-['JetBrains_Mono'] font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                billingCycle === 'annual'
                  ? 'bg-[#a855f7] text-white shadow-[0_0_12px_rgba(168,85,247,0.4)]'
                  : 'text-[#94a3b8] hover:text-white'
              }`}
            >
              <span>ANNUAL CONTRACT</span>
              <span className="px-1.5 py-0.5 rounded bg-[#7bd0ff]/20 text-[#7bd0ff] text-[10px]">
                SAVE 20%
              </span>
            </button>
          </div>
        </div>

        {/* Tier Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative flex flex-col justify-between p-8 rounded-2xl bg-[#0d1c2d] border transition-all duration-300 hover:-translate-y-1 ${
                t.popular
                  ? 'border-[#a855f7] shadow-[0_0_36px_rgba(168,85,247,0.3)] ring-1 ring-[#a855f7]/60'
                  : 'border-[#1c2b3c] hover:border-[#273647]'
              }`}
            >
              {t.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-[#b76dff] to-[#842bd2] text-white font-['JetBrains_Mono'] text-[11px] font-bold tracking-wider uppercase shadow-[0_0_12px_rgba(168,85,247,0.5)]">
                  MOST POPULAR FLEET TIER
                </div>
              )}

              <div>
                <h3 className="font-['Space_Grotesk'] text-xl font-bold text-white mb-2">
                  {t.name}
                </h3>
                <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#94a3b8] mb-6 min-h-[36px]">
                  {t.desc}
                </p>

                <div className="flex items-baseline gap-1 mb-6">
                  <span className="font-['Space_Grotesk'] text-4xl font-extrabold text-white">
                    {t.price}
                  </span>
                  <span className="font-['JetBrains_Mono'] text-xs text-[#94a3b8]">
                    {t.period}
                  </span>
                </div>

                <div className="w-full h-[1px] bg-[#1c2b3c] mb-6"></div>

                <ul className="flex flex-col gap-3 font-['Plus_Jakarta_Sans'] text-xs text-[#cbd5e1] mb-8">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <span className="material-symbols-outlined text-[#7bd0ff] text-[18px] flex-shrink-0">
                        check
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => {
                  playSound('click');
                  onDeployMission?.(t.planId);
                }}
                className={`w-full py-3 rounded-lg font-['Plus_Jakarta_Sans'] text-sm font-semibold tracking-wide transition-all cursor-pointer ${
                  t.popular
                    ? 'bg-gradient-to-r from-[#b76dff] to-[#842bd2] text-white shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:brightness-110'
                    : 'bg-[#1c2b3c] hover:bg-[#273647] text-[#d4e4fa]'
                }`}
              >
                {t.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Dynamic Mission Cost Configurator Calculator */}
        <div className="w-full rounded-2xl bg-[#051424] border border-[#1c2b3c] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1c2b3c] mb-8">
            <div>
              <span className="font-['JetBrains_Mono'] text-xs text-[#ddb7ff] uppercase tracking-wider block mb-1">
                INTERACTIVE COST ESTIMATOR
              </span>
              <h3 className="font-['Space_Grotesk'] text-2xl font-bold text-white">
                Customize Your Fleet Configuration
              </h3>
            </div>
            <span className="text-xs font-['JetBrains_Mono'] text-[#94a3b8]">
              Includes automatic telemetry failover across 85 ground stations
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Sliders Area (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {/* Slider 1: Satellites */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs font-['JetBrains_Mono']">
                  <span className="text-[#94a3b8] uppercase">Active Spacecraft in Fleet</span>
                  <span className="text-[#7bd0ff] font-bold text-sm">{satellites} Satellites</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="120"
                  value={satellites}
                  onChange={(e) => setSatellites(parseInt(e.target.value))}
                  className="w-full accent-[#a855f7] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-['JetBrains_Mono'] text-[#94a3b8]">
                  <span>1 Sat</span>
                  <span>30 Sats</span>
                  <span>60 Sats</span>
                  <span>120 Sats</span>
                </div>
              </div>

              {/* Slider 2: Bandwidth */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs font-['JetBrains_Mono']">
                  <span className="text-[#94a3b8] uppercase">Peak Telemetry &amp; Downlink Bandwidth</span>
                  <span className="text-[#ddb7ff] font-bold text-sm">{bandwidth} Gbps Optical/Ka</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  step="5"
                  value={bandwidth}
                  onChange={(e) => setBandwidth(parseInt(e.target.value))}
                  className="w-full accent-[#7bd0ff] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-['JetBrains_Mono'] text-[#94a3b8]">
                  <span>5 Gbps</span>
                  <span>25 Gbps</span>
                  <span>50 Gbps</span>
                  <span>100 Gbps</span>
                </div>
              </div>

              {/* Slider 3: Ground Station Passes */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs font-['JetBrains_Mono']">
                  <span className="text-[#94a3b8] uppercase">Ground Station Contacts per Day</span>
                  <span className="text-[#fbabff] font-bold text-sm">{passesPerDay} Contact Passes/Day</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="96"
                  step="4"
                  value={passesPerDay}
                  onChange={(e) => setPassesPerDay(parseInt(e.target.value))}
                  className="w-full accent-[#fbabff] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-['JetBrains_Mono'] text-[#94a3b8]">
                  <span>4 Passes</span>
                  <span>24 Passes</span>
                  <span>48 Passes</span>
                  <span>96 Passes</span>
                </div>
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <label className="flex items-center gap-2 p-3 rounded-lg bg-[#0d1c2d] border border-[#1c2b3c] cursor-pointer hover:border-[#a855f7]/60 transition-colors">
                  <input
                    type="checkbox"
                    checked={autoAvoidance}
                    onChange={(e) => setAutoAvoidance(e.target.checked)}
                    className="accent-[#a855f7]"
                  />
                  <span className="text-xs font-['Plus_Jakarta_Sans'] text-white">
                    Auto-Avoidance AI (+ $650)
                  </span>
                </label>

                <label className="flex items-center gap-2 p-3 rounded-lg bg-[#0d1c2d] border border-[#1c2b3c] cursor-pointer hover:border-[#7bd0ff]/60 transition-colors">
                  <input
                    type="checkbox"
                    checked={quantumCrypto}
                    onChange={(e) => setQuantumCrypto(e.target.checked)}
                    className="accent-[#7bd0ff]"
                  />
                  <span className="text-xs font-['Plus_Jakarta_Sans'] text-white">
                    Post-Quantum (+ $480)
                  </span>
                </label>

                <label className="flex items-center gap-2 p-3 rounded-lg bg-[#0d1c2d] border border-[#1c2b3c] cursor-pointer hover:border-[#fbabff]/60 transition-colors">
                  <input
                    type="checkbox"
                    checked={dedicatedFlightDirector}
                    onChange={(e) => setDedicatedFlightDirector(e.target.checked)}
                    className="accent-[#fbabff]"
                  />
                  <span className="text-xs font-['Plus_Jakarta_Sans'] text-white">
                    Flight Director (+ $2.4k)
                  </span>
                </label>
              </div>
            </div>

            {/* Calculated Output Card (5 Cols) */}
            <div className="lg:col-span-5 p-6 rounded-xl bg-[#0d1c2d] border border-[#1c2b3c] flex flex-col justify-between gap-6 shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
              <div>
                <span className="font-['JetBrains_Mono'] text-xs text-[#94a3b8] uppercase tracking-wider block mb-1">
                  ESTIMATED OPERATIONAL FEE
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-['Space_Grotesk'] text-4xl sm:text-5xl font-extrabold text-white">
                    ${monthlyTotal.toLocaleString()}
                  </span>
                  <span className="font-['JetBrains_Mono'] text-xs text-[#7bd0ff]">
                    / month {billingCycle === 'annual' ? '(Billed Annually)' : ''}
                  </span>
                </div>

                <div className="mt-4 pt-4 border-t border-[#1c2b3c] flex flex-col gap-2 font-['JetBrains_Mono'] text-xs text-[#94a3b8]">
                  <div className="flex justify-between">
                    <span>Base Flight Platform:</span>
                    <span className="text-white">${baseRate}/mo</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Spacecraft Node Licenses ({satellites}x):</span>
                    <span className="text-[#ddb7ff]">${satCost}/mo</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Optical Bandwidth ({bandwidth} Gbps):</span>
                    <span className="text-[#7bd0ff]">${bwCost}/mo</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Ground Contacts ({passesPerDay}/day):</span>
                    <span className="text-[#fbabff]">${passCost}/mo</span>
                  </div>
                  {autoAvoidance && (
                    <div className="flex justify-between">
                      <span>Collision Avoidance AI:</span>
                      <span className="text-white">$650/mo</span>
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={() => {
                  playSound('beep');
                  onDeployMission?.('custom');
                }}
                className="w-full py-3.5 rounded-lg bg-gradient-to-r from-[#b76dff] to-[#842bd2] text-white text-sm font-semibold tracking-wide shadow-[0_0_24px_rgba(183,109,255,0.4)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
                <span>DEPLOY CONFIGURATION TO CONSOLE</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
