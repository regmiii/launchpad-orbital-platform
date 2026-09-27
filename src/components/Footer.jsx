import React, { useState, useEffect } from 'react';
import { playSound } from '../utils/audio';

export default function Footer({ onOpenConsole }) {
  const [utcTime, setUtcTime] = useState('');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toUTCString().replace('GMT', 'UTC'));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    playSound('beep');
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="w-full bg-[#010f1f] border-t border-[#1c2b3c] text-[#94a3b8] font-['Plus_Jakarta_Sans']">
      {/* Telemetry Status Strip */}
      <div className="w-full border-b border-[#1c2b3c]/60 bg-[#051424] px-4 md:px-8 lg:px-12 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs font-['JetBrains_Mono']">
          <div className="flex items-center gap-3">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7bd0ff] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7bd0ff]"></span>
            </span>
            <span className="text-white font-semibold">ALL SYSTEMS NOMINAL</span>
            <span className="text-[#1c2b3c]">|</span>
            <span className="text-[#ddb7ff]">DEFCON 5</span>
            <span className="text-[#1c2b3c]">|</span>
            <span className="text-[#7bd0ff]">85/85 GROUND STATIONS ONLINE</span>
          </div>

          <div className="flex items-center gap-4 text-[#94a3b8]">
            <span>UTC: {utcTime}</span>
            <button
              onClick={() => onOpenConsole?.('flight-sim')}
              className="text-[#ddb7ff] hover:text-white underline cursor-pointer"
            >
              Open Console &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
        {/* Brand & Newsletter Column (2 Cols) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-[#842bd2] to-[#7bd0ff] p-[1.5px] shadow-[0_0_16px_rgba(168,85,247,0.4)]">
              <div className="w-full h-full bg-[#051424] rounded-[7px] flex items-center justify-center">
                <span className="material-symbols-outlined text-transparent bg-clip-text bg-gradient-to-r from-[#ddb7ff] to-[#7bd0ff] text-[22px]">
                  rocket_launch
                </span>
              </div>
            </div>
            <span className="font-['Space_Grotesk'] text-xl font-bold tracking-tight text-white">
              LaunchPad
            </span>
            <span className="px-2 py-0.5 rounded bg-[#1c2b3c] text-[#7bd0ff] font-['JetBrains_Mono'] text-[11px]">
              v4.2
            </span>
          </div>

          <p className="text-xs text-[#94a3b8] leading-relaxed max-w-sm">
            Autonomous orbit operations, automated collision avoidance, and ultra-low latency orbital telemetry streams for commercial &amp; sovereign aerospace fleets.
          </p>

          {/* Newsletter Form */}
          <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
            <span className="font-['JetBrains_Mono'] text-xs text-white font-semibold uppercase tracking-wider">
              Orbital Telemetry Dispatch
            </span>
            <div className="flex items-center gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="operator@aerospace.space"
                className="px-3.5 py-2 rounded-lg bg-[#0d1c2d] border border-[#1c2b3c] text-xs font-['JetBrains_Mono'] text-white placeholder-[#94a3b8] focus:outline-none focus:border-[#a855f7] flex-1"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-[#a855f7] hover:bg-[#b76dff] text-white text-xs font-['JetBrains_Mono'] font-bold transition-all cursor-pointer whitespace-nowrap"
              >
                JOIN DISPATCH
              </button>
            </div>
            {subscribed && (
              <span className="text-[11px] font-['JetBrains_Mono'] text-[#7bd0ff] animate-fadeIn">
                ✓ Uplink verified. You are now subscribed to orbital fleet bulletins.
              </span>
            )}
          </form>
        </div>

        {/* Links Column 1: Platform */}
        <div className="flex flex-col gap-3">
          <span className="font-['JetBrains_Mono'] text-xs text-white uppercase tracking-wider font-bold">
            Platform
          </span>
          <a href="#features" className="text-xs hover:text-white transition-colors">Trajectory Engine</a>
          <a href="#constellations" className="text-xs hover:text-white transition-colors">Constellation Mesh</a>
          <a href="#ground-network" className="text-xs hover:text-white transition-colors">Ground Stations</a>
          <a href="#tech" className="text-xs hover:text-white transition-colors">Telemetry gRPC API</a>
          <a href="#pricing" className="text-xs hover:text-white transition-colors">Mission Pricing</a>
        </div>

        {/* Links Column 2: Standards */}
        <div className="flex flex-col gap-3">
          <span className="font-['JetBrains_Mono'] text-xs text-white uppercase tracking-wider font-bold">
            Aerospace
          </span>
          <a href="#security-faq" className="text-xs hover:text-white transition-colors">CCSDS Protocols</a>
          <a href="#security-faq" className="text-xs hover:text-white transition-colors">NASA CARA Sync</a>
          <a href="#security-faq" className="text-xs hover:text-white transition-colors">ITAR Compliance</a>
          <a href="#security-faq" className="text-xs hover:text-white transition-colors">Post-Quantum Kyber</a>
          <a href="#security-faq" className="text-xs hover:text-white transition-colors">ISO 27001 Space</a>
        </div>

        {/* Links Column 3: Developers */}
        <div className="flex flex-col gap-3">
          <span className="font-['JetBrains_Mono'] text-xs text-white uppercase tracking-wider font-bold">
            Developers
          </span>
          <a href="#tech" className="text-xs hover:text-white transition-colors">Python SDK</a>
          <a href="#tech" className="text-xs hover:text-white transition-colors">Rust Crate (tokio)</a>
          <a href="#tech" className="text-xs hover:text-white transition-colors">C++ Aerospace Header</a>
          <a href="#tech" className="text-xs hover:text-white transition-colors">TypeScript SDK</a>
          <a href="#tech" className="text-xs hover:text-white transition-colors">API Reference</a>
        </div>

        {/* Links Column 4: Directorate */}
        <div className="flex flex-col gap-3">
          <span className="font-['JetBrains_Mono'] text-xs text-white uppercase tracking-wider font-bold">
            Directorate
          </span>
          <a href="#" className="text-xs hover:text-white transition-colors">Mission Directorate</a>
          <a href="#" className="text-xs hover:text-white transition-colors">Space Surveillance</a>
          <a href="#" className="text-xs hover:text-white transition-colors">Careers (ITAR Only)</a>
          <a href="#" className="text-xs hover:text-white transition-colors">Security Disclosures</a>
          <a href="#" className="text-xs hover:text-white transition-colors">Contact Ground Ops</a>
        </div>
      </div>

      {/* Bottom Sub-footer */}
      <div className="border-t border-[#1c2b3c] py-6 px-4 md:px-8 lg:px-12 bg-[#051424]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-['JetBrains_Mono'] text-[#94a3b8]">
          <p>© 2026 LaunchPad Aerospace Technologies Inc. All orbital maneuvers and telemetry vectors reserved.</p>
          <div className="flex items-center gap-6">
            <span>EXPORT CONTROLLED: USML CAT XV</span>
            <span>PRIVACY &amp; TELEMETRY POLICY</span>
            <span>TERMS OF SERVICE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
