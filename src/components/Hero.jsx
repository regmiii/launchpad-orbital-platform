import React, { useState, useEffect } from 'react';
import { playSound } from '../utils/audio';

export default function Hero({ onOpenConsole }) {
  const [epochTime, setEpochTime] = useState('2026.270.10:48:12');
  const [velocity, setVelocity] = useState(7.612);
  const [apogee, setApogee] = useState(542.4);
  const [burnActive, setBurnActive] = useState(false);
  const [activeLayer, setActiveLayer] = useState('LEO');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const doy = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
      const timeStr = now.toTimeString().split(' ')[0];
      setEpochTime(`${now.getFullYear()}.${doy}.${timeStr}`);
      
      // Subtle telemetry jitter
      setVelocity(() => +(7.61 + Math.sin(Date.now() / 1500) * 0.008).toFixed(3));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const triggerBurn = () => {
    playSound('burn');
    setBurnActive(true);
    setApogee((prev) => +(prev + 1.2).toFixed(1));
    setTimeout(() => {
      playSound('telemetry');
      setBurnActive(false);
    }, 1800);
  };

  return (
    <section className="relative w-full overflow-hidden px-4 md:px-8 lg:px-12 pt-12 pb-24">
      {/* Ambient Orbital Background Glows */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#a855f7]/15 rounded-full blur-[140px] -z-10"></div>
      <div className="pointer-events-none absolute top-72 -left-36 w-[550px] h-[550px] bg-[#38bdf8]/15 rounded-full blur-[130px] -z-10"></div>
      <div className="pointer-events-none absolute top-96 -right-36 w-[500px] h-[500px] bg-[#d946ef]/10 rounded-full blur-[130px] -z-10"></div>

      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Version & Status Capsule Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#1c2b3c]/80 border border-[#273647] backdrop-blur-md shadow-[0_0_20px_rgba(183,109,255,0.2)] mb-6 transition-all hover:scale-[1.02] cursor-default">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ddb7ff] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#a855f7]"></span>
          </span>
          <span className="font-['JetBrains_Mono'] text-xs text-[#d4e4fa] font-medium tracking-wide">
            v4.2 Orbital OS Released • <span className="text-[#7bd0ff] font-semibold">Next-Gen Satellite Telemetry</span>
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-['Space_Grotesk'] text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white max-w-4xl leading-[1.15]">
          Autonomous Orbit Operations &amp; Telemetry at{' '}
          <span className="bg-gradient-to-r from-[#ddb7ff] via-[#fbabff] to-[#7bd0ff] bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(183,109,255,0.5)]">
            Light Speed
          </span>
        </h1>

        {/* Subheadline */}
        <p className="font-['Plus_Jakarta_Sans'] text-base md:text-lg text-[#94a3b8] max-w-2xl mt-5 mb-8 leading-relaxed">
          LaunchPad delivers real-time constellation management, automated collision avoidance vectors, and ultra-low latency orbital data streams for commercial aerospace fleets.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <a
            href="#pricing"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-gradient-to-r from-[#b76dff] to-[#842bd2] text-white text-base font-semibold tracking-wide shadow-[0_0_28px_rgba(183,109,255,0.5)] hover:shadow-[0_0_36px_rgba(183,109,255,0.7)] transition-all duration-300 hover:-translate-y-0.5"
          >
            <span>Get Started</span>
            <span className="material-symbols-outlined text-[20px]">rocket_launch</span>
          </a>
          <button
            onClick={() => onOpenConsole?.('flight-sim')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#1c2b3c]/70 hover:bg-[#273647] border border-[#273647] text-[#7bd0ff] text-base font-semibold tracking-wide shadow-[0_0_16px_rgba(123,208,255,0.15)] transition-all duration-200 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">orbit</span>
            <span>Explore Live Constellation</span>
          </button>
        </div>

        {/* Metric Highlights Strip */}
        <div className="w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl bg-[#0d1c2d]/80 border border-[#1c2b3c] backdrop-blur-md mb-12 shadow-[0_4px_24px_rgba(1,15,31,0.6)]">
          <div className="flex flex-col items-center p-2">
            <span className="font-['JetBrains_Mono'] text-2xl sm:text-3xl text-white font-bold tracking-tight">4,820+</span>
            <span className="font-['JetBrains_Mono'] text-[11px] text-[#7bd0ff] uppercase tracking-wider mt-1">Satellites Tracked</span>
          </div>
          <div className="flex flex-col items-center p-2 border-l border-[#1c2b3c]/50">
            <span className="font-['JetBrains_Mono'] text-2xl sm:text-3xl text-[#ddb7ff] font-bold tracking-tight">&lt;12ms</span>
            <span className="font-['JetBrains_Mono'] text-[11px] text-[#94a3b8] uppercase tracking-wider mt-1">Vector Latency</span>
          </div>
          <div className="flex flex-col items-center p-2 border-l border-[#1c2b3c]/50">
            <span className="font-['JetBrains_Mono'] text-2xl sm:text-3xl text-white font-bold tracking-tight">99.999%</span>
            <span className="font-['JetBrains_Mono'] text-[11px] text-[#7bd0ff] uppercase tracking-wider mt-1">Ground Uptime</span>
          </div>
          <div className="flex flex-col items-center p-2 border-l border-[#1c2b3c]/50">
            <span className="font-['JetBrains_Mono'] text-2xl sm:text-3xl text-[#fbabff] font-bold tracking-tight">0.00</span>
            <span className="font-['JetBrains_Mono'] text-[11px] text-[#94a3b8] uppercase tracking-wider mt-1">Collision Incidents</span>
          </div>
        </div>

        {/* Hero Visual Container: Aerospace Telemetry HUD */}
        <div className="w-full max-w-6xl relative rounded-xl p-1 bg-gradient-to-b from-[#a855f7]/40 via-[#1c2b3c] to-[#010f1f] shadow-[0_0_40px_rgba(183,109,255,0.25)]" id="flight-sim">
          <div className="relative w-full rounded-lg overflow-hidden bg-[#010f1f]">
            {/* Mock HUD Header Bar */}
            <div className="w-full px-4 py-3 bg-[#122131]/90 border-b border-[#1c2b3c] backdrop-blur-md flex flex-wrap items-center justify-between gap-3 text-left">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#7bd0ff] shadow-[0_0_8px_#7bd0ff] animate-pulse"></span>
                <span className="font-['JetBrains_Mono'] text-xs sm:text-sm text-white font-semibold">
                  ORBIT-HUD // NODE: ALPHA-7
                </span>
                <span className="px-2 py-0.5 rounded bg-[#1c2b3c] text-[#ddb7ff] font-['JetBrains_Mono'] text-[11px]">
                  LEO-97.4° INC
                </span>
              </div>

              {/* Layer switch buttons */}
              <div className="flex items-center gap-2">
                {['LEO', 'GEO', 'CISLUNAR'].map((layer) => (
                  <button
                    key={layer}
                    onClick={() => setActiveLayer(layer)}
                    className={`px-2.5 py-1 rounded text-[11px] font-['JetBrains_Mono'] transition-all ${
                      activeLayer === layer
                        ? 'bg-[#a855f7] text-white shadow-[0_0_10px_rgba(168,85,247,0.5)]'
                        : 'bg-[#1c2b3c] text-[#94a3b8] hover:text-white'
                    }`}
                  >
                    {layer}
                  </button>
                ))}
                <span className="text-[#7bd0ff] hidden md:inline font-['JetBrains_Mono'] text-[11px] ml-2">
                  EPOCH: {epochTime}
                </span>
              </div>
            </div>

            {/* Constellation Canvas & Interactive Overlay */}
            <div className="relative w-full aspect-[16/9] max-h-[580px] overflow-hidden bg-[#051424]">
              {/* Starfield & Earth Grid Canvas Simulation */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#131b33] via-[#051424] to-[#010f1f]"></div>
              
              {/* Concentric Orbital Rings */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[500px] h-[500px] rounded-full border border-[#38bdf8]/15 animate-[spin_60s_linear_infinite]"></div>
                <div className="absolute w-[360px] h-[360px] rounded-full border border-[#a855f7]/25 animate-[spin_40s_linear_infinite_reverse]"></div>
                <div className="absolute w-[220px] h-[220px] rounded-full border border-[#fbabff]/20"></div>
                {/* Central Celestial Body / Earth Sphere */}
                <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-[#00354a] via-[#00a6e0] to-[#7bd0ff] shadow-[0_0_50px_rgba(0,166,224,0.6)] flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-[#051424]/40 backdrop-blur-sm border border-[#7bd0ff]/40 flex items-center justify-center text-[#7bd0ff] text-xs font-['JetBrains_Mono']">
                    TERRA
                  </div>
                </div>
              </div>

              {/* Orbital Tracking Satellites */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[28%] left-[32%] flex items-center gap-1.5 animate-bounce">
                  <span className="w-2 h-2 rounded-full bg-[#ddb7ff] shadow-[0_0_10px_#ddb7ff]"></span>
                  <span className="font-['JetBrains_Mono'] text-[10px] text-[#ddb7ff] bg-[#051424]/80 px-1 rounded">SAT-401A</span>
                </div>
                <div className="absolute top-[62%] left-[68%] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#7bd0ff] shadow-[0_0_10px_#7bd0ff] animate-ping"></span>
                  <span className="font-['JetBrains_Mono'] text-[10px] text-[#7bd0ff] bg-[#051424]/80 px-1 rounded">RELAY-09</span>
                </div>
                <div className="absolute top-[35%] right-[22%] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#fbabff] shadow-[0_0_10px_#fbabff]"></span>
                  <span className="font-['JetBrains_Mono'] text-[10px] text-[#fbabff] bg-[#051424]/80 px-1 rounded">OPTIC-X</span>
                </div>
              </div>

              {/* HUD Vector Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#010f1f] via-transparent to-transparent opacity-80 pointer-events-none"></div>

              {/* Top Left Avionics Pill */}
              <div className="absolute top-4 left-4 p-3 rounded-lg bg-[#010f1f]/85 border border-[#1c2b3c] backdrop-blur-lg hidden sm:flex flex-col gap-1.5 text-left shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
                <div className="flex items-center justify-between gap-6">
                  <span className="font-['JetBrains_Mono'] text-[11px] text-[#94a3b8]">PRIMARY APOGEE</span>
                  <span className="font-['JetBrains_Mono'] text-[11px] text-[#7bd0ff] font-bold">{apogee} km</span>
                </div>
                <div className="flex items-center justify-between gap-6">
                  <span className="font-['JetBrains_Mono'] text-[11px] text-[#94a3b8]">VELOCITY (ECI)</span>
                  <span className="font-['JetBrains_Mono'] text-[11px] text-[#ddb7ff] font-bold">{velocity} km/s</span>
                </div>
                <div className="flex items-center justify-between gap-6">
                  <span className="font-['JetBrains_Mono'] text-[11px] text-[#94a3b8]">DELTA-V BUDGET</span>
                  <span className="font-['JetBrains_Mono'] text-[11px] text-white font-bold">184.2 m/s</span>
                </div>
                <button
                  onClick={triggerBurn}
                  disabled={burnActive}
                  className="mt-1 w-full py-1 text-center text-[10px] font-['JetBrains_Mono'] font-bold uppercase rounded bg-[#a855f7]/20 border border-[#a855f7] text-[#ddb7ff] hover:bg-[#a855f7] hover:text-white transition-all cursor-pointer"
                >
                  {burnActive ? '🔥 EXECUTING THRUST BURN...' : '⚡ TEST DELTA-V BURN'}
                </button>
              </div>

              {/* Bottom Left Telemetry Status Pill */}
              <div className="absolute bottom-4 left-4 p-3.5 rounded-lg bg-[#0d1c2d]/90 border border-[#1c2b3c] backdrop-blur-xl max-w-xs text-left shadow-[0_8px_24px_rgba(0,0,0,0.6)]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#7bd0ff] animate-pulse"></span>
                  <span className="font-['JetBrains_Mono'] text-[11px] text-[#7bd0ff] font-bold uppercase tracking-wider">
                    Telemetry Stream Locked
                  </span>
                </div>
                <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#94a3b8]">
                  Conjunction assessment vector: 0 threats inside 25km radius window. Trajectory nominal.
                </p>
              </div>

              {/* Bottom Right Mission Vector Pill */}
              <div className="absolute bottom-4 right-4 p-3.5 rounded-lg bg-[#0d1c2d]/90 border border-[#1c2b3c] backdrop-blur-xl hidden md:flex flex-col items-end text-right shadow-[0_8px_24px_rgba(0,0,0,0.6)]">
                <span className="font-['JetBrains_Mono'] text-[11px] text-[#94a3b8] uppercase tracking-wider">
                  Synchronized Relay
                </span>
                <span className="font-['Space_Grotesk'] text-xl text-white font-bold">
                  128 Phased Nodes
                </span>
                <span className="font-['JetBrains_Mono'] text-[11px] text-[#ddb7ff] mt-0.5">
                  99.98% Phase Alignment
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
