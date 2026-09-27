import React, { useState, useEffect } from 'react';
import { playSound } from '../utils/audio';

const INITIAL_SATELLITES = [
  {
    id: 'SAT-401A',
    name: 'Aura Alpha',
    regime: 'LEO',
    orbitType: 'Polar SSO (97.4°)',
    altitude: 542.4,
    velocity: 7.614,
    period: '94.8m',
    battery: 94,
    temp: '+18.2°C',
    fuel: '14.2 kg Xe',
    signal: -68,
    status: 'Nominal',
    color: '#ddb7ff',
    angle: 45,
    speed: 1.2,
    radius: 140,
    desc: 'Hyperspectral Earth observation sensor with direct-to-cell optical downlink.'
  },
  {
    id: 'STAR-LINK-V24',
    name: 'Vanguard Mesh-24',
    regime: 'LEO',
    orbitType: 'Equatorial (53.0°)',
    altitude: 550.0,
    velocity: 7.590,
    period: '95.1m',
    battery: 88,
    temp: '+21.0°C',
    fuel: '22.8 kg Xe',
    signal: -62,
    status: 'Nominal',
    color: '#7bd0ff',
    angle: 160,
    speed: 1.0,
    radius: 170,
    desc: 'High-throughput phased array cross-link routing gigabit packets across the constellation.'
  },
  {
    id: 'OPTIC-X9',
    name: 'Optic-X Laser',
    regime: 'MEO',
    orbitType: 'Semi-Synchronous (55.0°)',
    altitude: 20200.0,
    velocity: 3.874,
    period: '11h 58m',
    battery: 98,
    temp: '-04.5°C',
    fuel: '84.0 kg Bi-Prop',
    signal: -74,
    status: 'Nominal',
    color: '#fbabff',
    angle: 280,
    speed: 0.5,
    radius: 220,
    desc: 'Inter-satellite laser communications terminal connecting LEO satellites to ground optical hubs.'
  },
  {
    id: 'RELAY-04B',
    name: 'Centauri GEO-4',
    regime: 'GEO',
    orbitType: 'Geostationary (0.0°)',
    altitude: 35786.0,
    velocity: 3.075,
    period: '23h 56m',
    battery: 92,
    temp: '+14.1°C',
    fuel: '190.5 kg Bi-Prop',
    signal: -82,
    status: 'Nominal',
    color: '#38bdf8',
    angle: 110,
    speed: 0.25,
    radius: 270,
    desc: 'High-power Ku/Ka transponder platform providing continuous regional telemetry relay.'
  },
  {
    id: 'QKD-PRIME',
    name: 'Quantum-1 Cipher',
    regime: 'LEO',
    orbitType: 'Sun-Synchronous (98.2°)',
    altitude: 510.8,
    velocity: 7.642,
    period: '93.9m',
    battery: 96,
    temp: '-12.0°C',
    fuel: '9.8 kg Cold Gas',
    signal: -64,
    status: 'Nominal',
    color: '#c084fc',
    angle: 210,
    speed: 1.4,
    radius: 130,
    desc: 'Post-quantum cryptographic key distribution satellite for zero-trust ground networks.'
  }
];

export default function ConstellationViewer({ onLaunchConsole }) {
  const [satellites, setSatellites] = useState(INITIAL_SATELLITES);
  const [selectedSatId, setSelectedSatId] = useState(INITIAL_SATELLITES[0].id);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [simSpeed, setSimSpeed] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [alertMode, setAlertMode] = useState(false);
  const [actionMessage, setActionMessage] = useState('');

  const selectedSat = satellites.find((s) => s.id === selectedSatId) || satellites[0];

  // Animate satellites orbiting
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setSatellites((prev) =>
        prev.map((sat) => ({
          ...sat,
          angle: (sat.angle + sat.speed * simSpeed * 0.4) % 360,
          velocity: +(sat.velocity + (Math.random() - 0.5) * 0.002).toFixed(3),
        }))
      );
    }, 50);
    return () => clearInterval(interval);
  }, [isPaused, simSpeed]);

  const handleSelectSat = (sat) => {
    playSound('click');
    setSelectedSatId(sat.id);
  };

  const handleTriggerAvoidance = () => {
    playSound('burn');
    setActionMessage(`Executing autonomous delta-v burn on ${selectedSat.id}...`);
    setTimeout(() => {
      playSound('telemetry');
      setSatellites((prev) =>
        prev.map((s) =>
          s.id === selectedSat.id
            ? {
                ...s,
                altitude: +(s.altitude + 2.4).toFixed(1),
                status: 'Burn Complete: Orbit Raised (+2.4 km)',
              }
            : s
        )
      );
      setActionMessage(`Maneuver Confirmed: ${selectedSat.id} orbit increased by 2.4 km. Conjunction cleared.`);
      setAlertMode(false);
      setTimeout(() => setActionMessage(''), 5000);
    }, 1800);
  };

  const handleSimulateAlert = () => {
    playSound('alert');
    setAlertMode(true);
    setActionMessage(`WARNING: Debris conjunction hazard detected for ${selectedSat.id} (T-14m)`);
  };

  const filteredSats = satellites.filter((s) => {
    if (activeFilter === 'ALL') return true;
    return s.regime === activeFilter;
  });

  return (
    <section className="w-full py-24 px-4 md:px-8 lg:px-12 bg-[#010f1f] relative overflow-hidden" id="constellations">
      {/* Background radial atmosphere */}
      <div className="pointer-events-none absolute -bottom-32 left-1/3 w-[600px] h-[600px] bg-[#38bdf8]/10 rounded-full blur-[140px] -z-10"></div>
      <div className="pointer-events-none absolute top-12 right-10 w-[500px] h-[500px] bg-[#a855f7]/10 rounded-full blur-[140px] -z-10"></div>

      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#1c2b3c]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#1c2b3c] border border-[#273647] text-[#7bd0ff] font-['JetBrains_Mono'] text-xs font-semibold uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-[#7bd0ff] animate-ping"></span>
              LIVE FLEET RADAR &amp; CONSTELLATION MESH
            </div>
            <h2 className="font-['Space_Grotesk'] text-3xl md:text-4xl font-bold text-white tracking-tight">
              Real-Time Orbital Tracking Engine
            </h2>
            <p className="font-['Plus_Jakarta_Sans'] text-base text-[#94a3b8] mt-2 max-w-2xl">
              Inspect active satellite telemetry, simulate automated collision avoidance burns, and project orbital planes across LEO, MEO, and GEO regimes.
            </p>
          </div>

          {/* Controls Bar */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Speed selector */}
            <div className="flex items-center rounded-lg bg-[#0d1c2d] border border-[#1c2b3c] p-1">
              {[1, 5, 25].map((spd) => (
                <button
                  key={spd}
                  onClick={() => {
                    playSound('click');
                    setSimSpeed(spd);
                  }}
                  className={`px-2.5 py-1 text-xs font-['JetBrains_Mono'] rounded transition-all ${
                    simSpeed === spd
                      ? 'bg-[#a855f7] text-white font-bold shadow-[0_0_8px_rgba(168,85,247,0.5)]'
                      : 'text-[#94a3b8] hover:text-white'
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>

            {/* Pause / Play */}
            <button
              onClick={() => {
                playSound('click');
                setIsPaused(!isPaused);
              }}
              className="px-3 py-1.5 rounded-lg bg-[#0d1c2d] hover:bg-[#1c2b3c] border border-[#1c2b3c] text-xs font-['JetBrains_Mono'] text-[#d4e4fa] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">
                {isPaused ? 'play_arrow' : 'pause'}
              </span>
              <span>{isPaused ? 'RESUME' : 'FREEZE'}</span>
            </button>

            {/* Quick Console Jump */}
            <button
              onClick={() => onLaunchConsole?.('flight-sim')}
              className="px-3.5 py-1.5 rounded-lg bg-[#1c2b3c] hover:bg-[#273647] border border-[#a855f7]/40 text-xs font-['JetBrains_Mono'] text-[#ddb7ff] flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(168,85,247,0.2)] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">terminal</span>
              <span>FLIGHT DECK</span>
            </button>
          </div>
        </div>

        {/* Action Alert Banner */}
        {actionMessage && (
          <div
            className={`p-4 rounded-xl border flex items-center justify-between gap-4 transition-all duration-300 ${
              alertMode
                ? 'bg-[#93000a]/30 border-[#ffb4ab]/60 text-[#ffdad6] shadow-[0_0_24px_rgba(255,180,171,0.25)]'
                : 'bg-[#00354a]/40 border-[#7bd0ff]/60 text-[#d4e4fa] shadow-[0_0_20px_rgba(123,208,255,0.2)]'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[24px] animate-pulse">
                {alertMode ? 'warning' : 'satellite_alt'}
              </span>
              <span className="font-['JetBrains_Mono'] text-xs sm:text-sm font-semibold">
                {actionMessage}
              </span>
            </div>
            {alertMode && (
              <button
                onClick={handleTriggerAvoidance}
                className="px-3 py-1 rounded bg-[#ffb4ab] text-[#690005] font-['JetBrains_Mono'] text-xs font-bold uppercase hover:bg-white transition-colors cursor-pointer whitespace-nowrap"
              >
                EXECUTE EVASIVE Δv BURN
              </button>
            )}
          </div>
        )}

        {/* Orbit Grid Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {['ALL', 'LEO', 'MEO', 'GEO'].map((filter) => (
            <button
              key={filter}
              onClick={() => {
                playSound('click');
                setActiveFilter(filter);
              }}
              className={`px-4 py-1.5 rounded-lg text-xs font-['JetBrains_Mono'] uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                activeFilter === filter
                  ? 'bg-gradient-to-r from-[#842bd2] to-[#b76dff] text-white shadow-[0_0_16px_rgba(183,109,255,0.4)]'
                  : 'bg-[#0d1c2d] text-[#94a3b8] hover:text-white border border-[#1c2b3c]'
              }`}
            >
              {filter} REGIME ({satellites.filter((s) => filter === 'ALL' || s.regime === filter).length})
            </button>
          ))}
        </div>

        {/* Main Interactive Stage: Dual Split (Orbit Simulation & Telemetry Inspector) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Orbital Radar Projection Viewport (7 Cols) */}
          <div className="lg:col-span-7 rounded-2xl bg-[#051424] border border-[#1c2b3c] p-6 relative overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.6)] flex flex-col items-center justify-center min-h-[500px]">
            {/* Background Grid & Compass Markings */}
            <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none"></div>
            
            {/* Top Info Bar */}
            <div className="w-full flex items-center justify-between mb-4 z-10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#7bd0ff] animate-ping"></span>
                <span className="font-['JetBrains_Mono'] text-xs text-[#7bd0ff] font-bold">
                  ORBITAL PROJECTION: ECI-J2000
                </span>
              </div>
              <span className="font-['JetBrains_Mono'] text-[11px] text-[#94a3b8]">
                SCALE: 1px ≈ 120km
              </span>
            </div>

            {/* Orbit Canvas Projection */}
            <div className="relative w-[340px] sm:w-[420px] h-[340px] sm:h-[420px] flex items-center justify-center my-6">
              {/* Radar Sweep Effect */}
              <div className="absolute inset-0 radar-sweep opacity-20 pointer-events-none"></div>

              {/* Orbital Range Rings */}
              {/* LEO Ring */}
              <div className="absolute w-[150px] sm:w-[190px] h-[150px] sm:h-[190px] rounded-full border border-[#ddb7ff]/25 border-dashed">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#051424] px-1 text-[9px] font-['JetBrains_Mono'] text-[#ddb7ff]">
                  LEO ~500km
                </span>
              </div>

              {/* MEO Ring */}
              <div className="absolute w-[240px] sm:w-[300px] h-[240px] sm:h-[300px] rounded-full border border-[#fbabff]/20">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#051424] px-1 text-[9px] font-['JetBrains_Mono'] text-[#fbabff]">
                  MEO ~20,000km
                </span>
              </div>

              {/* GEO Ring */}
              <div className="absolute w-[320px] sm:w-[400px] h-[320px] sm:h-[400px] rounded-full border border-[#38bdf8]/20">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#051424] px-1 text-[9px] font-['JetBrains_Mono'] text-[#38bdf8]">
                  GEO 35,786km
                </span>
              </div>

              {/* Central Terrestrial Body (Earth) */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-[#001e2c] via-[#00a6e0] to-[#7bd0ff] shadow-[0_0_40px_rgba(56,189,248,0.5)] flex items-center justify-center border border-[#7bd0ff]/60 z-10 cursor-pointer group">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#051424]/50 backdrop-blur-xs flex flex-col items-center justify-center text-center p-1">
                  <span className="material-symbols-outlined text-[#7bd0ff] text-[20px] group-hover:scale-110 transition-transform">
                    public
                  </span>
                  <span className="font-['JetBrains_Mono'] text-[9px] text-white font-bold tracking-wider">
                    TERRA
                  </span>
                </div>
              </div>

              {/* Orbiting Satellites */}
              {filteredSats.map((sat) => {
                const rad = (sat.angle * Math.PI) / 180;
                // Responsive radius multiplier
                const r = sat.radius * (window.innerWidth < 640 ? 0.75 : 0.95);
                const x = Math.cos(rad) * r;
                const y = Math.sin(rad) * r;
                const isSelected = selectedSat.id === sat.id;

                return (
                  <div
                    key={sat.id}
                    onClick={() => handleSelectSat(sat)}
                    style={{
                      transform: `translate(${x}px, ${y}px)`,
                    }}
                    className="absolute cursor-pointer z-20 group transition-transform duration-75"
                  >
                    {/* Node Dot & Pulse */}
                    <div className="relative flex items-center justify-center">
                      {isSelected && (
                        <div
                          className="absolute w-8 h-8 rounded-full animate-ping opacity-60"
                          style={{ backgroundColor: sat.color }}
                        ></div>
                      )}
                      <div
                        className={`w-3.5 h-3.5 rounded-full shadow-[0_0_12px_currentColor] transition-transform ${
                          isSelected ? 'scale-125 ring-2 ring-white' : 'group-hover:scale-125'
                        }`}
                        style={{ backgroundColor: sat.color, color: sat.color }}
                      ></div>
                    </div>

                    {/* Satellite Floating Label */}
                    <div
                      className={`absolute top-4 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded text-[10px] font-['JetBrains_Mono'] backdrop-blur-md transition-opacity pointer-events-none ${
                        isSelected
                          ? 'bg-[#1c2b3c] text-white border border-white/40 opacity-100 shadow-[0_2px_8px_rgba(0,0,0,0.8)]'
                          : 'bg-[#051424]/80 text-[#94a3b8] opacity-80 group-hover:opacity-100'
                      }`}
                    >
                      {sat.id}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Actions Row */}
            <div className="w-full pt-4 border-t border-[#1c2b3c] flex flex-wrap items-center justify-between gap-3 z-10">
              <span className="font-['JetBrains_Mono'] text-xs text-[#94a3b8]">
                Click any satellite node to lock telemetry sensor focus
              </span>
              <button
                onClick={handleSimulateAlert}
                className="px-3 py-1 rounded bg-[#ffb4ab]/15 border border-[#ffb4ab]/40 hover:bg-[#ffb4ab]/30 text-[#ffb4ab] text-xs font-['JetBrains_Mono'] transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">crisis_alert</span>
                <span>SIMULATE DEBRIS THREAT</span>
              </button>
            </div>
          </div>

          {/* Telemetry Inspector Card (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="p-6 rounded-2xl bg-[#0d1c2d] border border-[#1c2b3c] shadow-[0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-xl flex flex-col gap-5">
              {/* Header with Satellite Identity */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#1c2b3c]">
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: selectedSat.color }}
                    ></span>
                    <h3 className="font-['Space_Grotesk'] text-2xl font-bold text-white tracking-tight">
                      {selectedSat.id}
                    </h3>
                    <span className="px-2 py-0.5 rounded bg-[#1c2b3c] text-[#7bd0ff] font-['JetBrains_Mono'] text-xs">
                      {selectedSat.regime}
                    </span>
                  </div>
                  <span className="font-['Plus_Jakarta_Sans'] text-sm text-[#94a3b8] mt-1 block">
                    {selectedSat.name} • {selectedSat.orbitType}
                  </span>
                </div>

                <div className="flex flex-col items-end">
                  <span className="font-['JetBrains_Mono'] text-xs text-[#94a3b8] uppercase">STATUS</span>
                  <span className="font-['JetBrains_Mono'] text-xs font-semibold text-[#7bd0ff] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7bd0ff] animate-pulse"></span>
                    {selectedSat.status}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#cbd5e1] leading-relaxed">
                {selectedSat.desc}
              </p>

              {/* Telemetry Grid Readouts */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-[#051424] border border-[#1c2b3c]">
                  <span className="font-['JetBrains_Mono'] text-[10px] text-[#94a3b8] uppercase tracking-wider block">
                    CURRENT ALTITUDE
                  </span>
                  <span className="font-['JetBrains_Mono'] text-lg font-bold text-white">
                    {selectedSat.altitude.toLocaleString()} <span className="text-xs text-[#7bd0ff]">km</span>
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-[#051424] border border-[#1c2b3c]">
                  <span className="font-['JetBrains_Mono'] text-[10px] text-[#94a3b8] uppercase tracking-wider block">
                    ORBITAL VELOCITY
                  </span>
                  <span className="font-['JetBrains_Mono'] text-lg font-bold text-[#ddb7ff]">
                    {selectedSat.velocity} <span className="text-xs text-[#94a3b8]">km/s</span>
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-[#051424] border border-[#1c2b3c]">
                  <span className="font-['JetBrains_Mono'] text-[10px] text-[#94a3b8] uppercase tracking-wider block">
                    SOLAR BATTERY (SOC)
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="flex-1 bg-[#1c2b3c] rounded h-2 overflow-hidden">
                      <div
                        className="bg-[#7bd0ff] h-full rounded"
                        style={{ width: `${selectedSat.battery}%` }}
                      ></div>
                    </div>
                    <span className="font-['JetBrains_Mono'] text-xs font-bold text-white">
                      {selectedSat.battery}%
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#051424] border border-[#1c2b3c]">
                  <span className="font-['JetBrains_Mono'] text-[10px] text-[#94a3b8] uppercase tracking-wider block">
                    PROPULSION FUEL
                  </span>
                  <span className="font-['JetBrains_Mono'] text-sm font-bold text-white">
                    {selectedSat.fuel}
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-[#051424] border border-[#1c2b3c]">
                  <span className="font-['JetBrains_Mono'] text-[10px] text-[#94a3b8] uppercase tracking-wider block">
                    BUS THERMAL
                  </span>
                  <span className="font-['JetBrains_Mono'] text-sm font-bold text-[#fbabff]">
                    {selectedSat.temp}
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-[#051424] border border-[#1c2b3c]">
                  <span className="font-['JetBrains_Mono'] text-[10px] text-[#94a3b8] uppercase tracking-wider block">
                    RF SIGNAL STRENGTH
                  </span>
                  <span className="font-['JetBrains_Mono'] text-sm font-bold text-[#7bd0ff]">
                    {selectedSat.signal} dBm (Locked)
                  </span>
                </div>
              </div>

              {/* Maneuver Action Button */}
              <button
                onClick={handleTriggerAvoidance}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-[#b76dff] to-[#842bd2] text-white text-sm font-['Plus_Jakarta_Sans'] font-semibold tracking-wide shadow-[0_0_20px_rgba(183,109,255,0.4)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">rocket</span>
                <span>DISPATCH STATION-KEEPING Δv BURN</span>
              </button>
            </div>

            {/* Quick Fleet Select List */}
            <div className="p-4 rounded-xl bg-[#051424] border border-[#1c2b3c] flex flex-col gap-2">
              <span className="font-['JetBrains_Mono'] text-[11px] text-[#94a3b8] uppercase tracking-wider">
                Fleet Roster Telemetry Pins
              </span>
              <div className="flex flex-col gap-1.5">
                {satellites.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleSelectSat(s)}
                    className={`flex items-center justify-between p-2 rounded-lg text-left transition-colors cursor-pointer ${
                      selectedSat.id === s.id
                        ? 'bg-[#1c2b3c] text-white border border-[#273647]'
                        : 'hover:bg-[#122131] text-[#94a3b8]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }}></span>
                      <span className="font-['JetBrains_Mono'] text-xs font-semibold">{s.id}</span>
                      <span className="text-[11px] text-[#94a3b8]">({s.regime})</span>
                    </div>
                    <span className="font-['JetBrains_Mono'] text-[11px] text-[#7bd0ff]">
                      {s.altitude.toLocaleString()} km
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
