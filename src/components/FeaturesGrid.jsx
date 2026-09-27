import React, { useState } from 'react';

export default function FeaturesGrid({ onSelectFeature }) {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      id: 'collision-avoidance',
      title: 'Automated Trajectory & Collision Avoidance',
      icon: 'shield',
      iconColor: 'text-[#ddb7ff]',
      iconBg: 'bg-[#b76dff]/15 shadow-[0_0_16px_rgba(183,109,255,0.3)]',
      desc: 'Real-time conjunction analysis computing high-precision orbital maneuvers in microseconds to safeguard constellations against space debris.',
      badgeLabel: 'CONJUNCTION RISK',
      badgeValue: 'Risk Factor: 0.0001%',
      badgeColor: 'text-[#7bd0ff] bg-[#1c2b3c]',
      stat1: 'T-00:24:12',
      stat2: 'Auto-Burn Armed',
      stat2Color: 'text-[#ddb7ff]',
      bullets: [
        'Conjunction assessment early warning',
        'Automated delta-v thrust calculations',
        'Multi-agency debris catalog syncing'
      ],
      footerStatus: 'STATUS: NOMINAL',
      accentColor: '#ddb7ff',
      hoverGlow: 'hover:shadow-[0_0_28px_rgba(183,109,255,0.25)]',
      type: 'sparkline'
    },
    {
      id: 'telemetry',
      title: 'Sub-Second Global Ground Telemetry',
      icon: 'sensors',
      iconColor: 'text-[#7bd0ff]',
      iconBg: 'bg-[#7bd0ff]/15 shadow-[0_0_16px_rgba(123,208,255,0.3)]',
      desc: 'High-throughput Ka/X-band and optical mesh downlink processing distributed across 85+ redundant terrestrial stations worldwide.',
      badgeLabel: 'DOWNLINK LATENCY',
      badgeValue: '<8.4ms',
      badgeColor: 'text-[#ddb7ff] bg-[#1c2b3c]',
      stat1: '85 Relays Active',
      stat2: '9.4 Gbps Optical',
      stat2Color: 'text-[#7bd0ff]',
      bullets: [
        'Optical laser cross-link ingestion',
        'Multi-beam phased array telemetry',
        'Instant lossless edge compression'
      ],
      footerStatus: 'NETWORK: OPTICAL MESH',
      accentColor: '#7bd0ff',
      hoverGlow: 'hover:shadow-[0_0_28px_rgba(123,208,255,0.25)]',
      type: 'bar'
    },
    {
      id: 'synchronization',
      title: 'Constellation Fleet Synchronization',
      icon: 'scatter_plot',
      iconColor: 'text-[#fbabff]',
      iconBg: 'bg-[#fbabff]/15 shadow-[0_0_16px_rgba(251,171,255,0.3)]',
      desc: 'Coordinated station-keeping and autonomous orbital phasing for mega-constellations with zero ground operator intervention.',
      badgeLabel: 'PHASE PLANE',
      badgeValue: '48 Nodes Synced',
      badgeColor: 'text-[#fbabff] bg-[#1c2b3c]',
      stat1: 'RAAN: 142.12°',
      stat2: 'Phase Drift: 0.002°',
      stat2Color: 'text-[#fbabff]',
      bullets: [
        'Multi-plane orbital drift compensation',
        'Solar flux predictive drag analytics',
        'Autonomous end-of-life de-orbit burns'
      ],
      footerStatus: 'SYNC: AUTONOMOUS',
      accentColor: '#fbabff',
      hoverGlow: 'hover:shadow-[0_0_28px_rgba(251,171,255,0.25)]',
      type: 'grid'
    }
  ];

  return (
    <section className="w-full py-24 px-4 md:px-8 lg:px-12 bg-[#051424]" id="features">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <span className="font-['JetBrains_Mono'] text-xs text-[#ddb7ff] uppercase tracking-widest mb-3">
            ENGINEERED FOR MISSION-CRITICAL SPACECRAFT OPERATIONS
          </span>
          <h2 className="font-['Space_Grotesk'] text-3xl md:text-4xl font-bold text-white leading-tight">
            Full-Spectrum Autonomous Orbital Orchestration Platform
          </h2>
          <p className="font-['Plus_Jakarta_Sans'] text-base text-[#94a3b8] mt-3">
            Execute automated station-keeping, live conjunction detection, and multi-gigabit downlinks with sub-millisecond precision.
          </p>
        </div>

        {/* 3-Column Desktop Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, idx) => (
            <div
              key={f.id}
              onClick={() => {
                setActiveFeature(idx);
                onSelectFeature?.(f);
              }}
              className={`flex flex-col justify-between p-6 rounded-xl bg-[#122131]/70 border border-[#1c2b3c] backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.3)] ${f.hoverGlow} transition-all duration-300 hover:-translate-y-1 cursor-pointer ${
                activeFeature === idx ? 'border-[#a855f7]/60 ring-1 ring-[#a855f7]/40' : ''
              }`}
            >
              <div>
                <div className={`w-12 h-12 rounded-lg ${f.iconBg} flex items-center justify-center ${f.iconColor} mb-5`}>
                  <span className="material-symbols-outlined text-[28px]">{f.icon}</span>
                </div>

                <h3 className="font-['Space_Grotesk'] text-xl text-white font-semibold mb-2">
                  {f.title}
                </h3>
                
                <p className="font-['Plus_Jakarta_Sans'] text-sm text-[#94a3b8] mb-5 leading-relaxed">
                  {f.desc}
                </p>

                {/* Embedded UI Card Snippet */}
                <div className="p-4 rounded-lg bg-[#0d1c2d] border border-[#1c2b3c]/80 mb-5 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="font-['JetBrains_Mono'] text-[11px] text-[#94a3b8]">{f.badgeLabel}</span>
                    <span className={`px-2.5 py-0.5 rounded text-[11px] font-['JetBrains_Mono'] font-semibold ${f.badgeColor}`}>
                      {f.badgeValue}
                    </span>
                  </div>

                  {/* Sparkline Graphic */}
                  {f.type === 'sparkline' && (
                    <svg className="w-full h-8 text-[#7bd0ff]" fill="none" viewBox="0 0 200 40">
                      <path d="M0 25 Q 40 10, 80 20 T 160 15 T 200 8" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
                      <circle cx="200" cy="8" fill="#7bd0ff" r="3" />
                    </svg>
                  )}

                  {/* Bar Graphic */}
                  {f.type === 'bar' && (
                    <div className="w-full bg-[#1c2b3c] rounded h-2 overflow-hidden my-1">
                      <div className="bg-gradient-to-r from-[#7bd0ff] to-[#ddb7ff] h-full rounded w-[94%] transition-all duration-1000"></div>
                    </div>
                  )}

                  {/* Grid Graphic */}
                  {f.type === 'grid' && (
                    <div className="grid grid-cols-8 gap-1 py-1">
                      {[...Array(8)].map((_, i) => (
                        <span
                          key={i}
                          className={`h-2 rounded-sm ${
                            i < 4 ? 'bg-[#ddb7ff]' : i < 6 ? 'bg-[#fbabff]' : 'bg-[#7bd0ff]'
                          }`}
                        ></span>
                      ))}
                    </div>
                  )}

                  <div className="flex justify-between font-['JetBrains_Mono'] text-[11px] text-[#94a3b8]">
                    <span>{f.stat1}</span>
                    <span className={`font-medium ${f.stat2Color}`}>{f.stat2}</span>
                  </div>
                </div>

                {/* Capability Checklist */}
                <ul className="flex flex-col gap-2 font-['Plus_Jakarta_Sans'] text-sm text-[#d4e4fa]">
                  {f.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <span className={`material-symbols-outlined ${f.iconColor} text-[18px] mt-0.5`}>
                        check_circle
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Footer status indicator */}
              <div className={`mt-6 pt-3 border-t border-[#1c2b3c] flex items-center justify-between font-['JetBrains_Mono'] text-xs ${f.iconColor}`}>
                <span>{f.footerStatus}</span>
                <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
