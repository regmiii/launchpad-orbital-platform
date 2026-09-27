import React, { useState, useEffect, useRef } from 'react';
import { playSound } from '../utils/audio';

const INITIAL_LOGS = [
  { id: 1, time: '14:24:01.102', sat: 'SAT-401A', level: 'NOMINAL', msg: 'Star tracker attitude lock verified (Quat: [0.707, 0.000, 0.707, 0.000])' },
  { id: 2, time: '14:24:02.418', sat: 'STAR-LINK-V24', level: 'NOMINAL', msg: 'Phased array beamforming switched to Svalbard Ground Station Pass #482' },
  { id: 3, time: '14:24:03.882', sat: 'OPTIC-X9', level: 'INFO', msg: 'Inter-satellite laser cross-link locked with SAT-401A (Bit Error Rate: 1.2e-9)' },
  { id: 4, time: '14:24:05.120', sat: 'QKD-PRIME', level: 'NOMINAL', msg: 'Quantum entropy generator seeded. 1,024 key pairs generated for Perth pass' },
  { id: 5, time: '14:24:06.940', sat: 'RELAY-04B', level: 'NOMINAL', msg: 'GEO station-keeping delta-v budget nominal. 190.5kg propellant remaining' },
];

const resolveTab = (tab) => {
  if (tab === 'flight-sim') return 'thruster';
  if (tab === 'telemetry-stream') return 'telemetry';
  return tab || 'telemetry';
};

export default function MissionControlConsole({ isOpen, onClose, initialTab = 'telemetry' }) {
  const [activeTab, setActiveTab] = useState(() => resolveTab(initialTab));
  const [logs, setLogs] = useState(INITIAL_LOGS);
  const [streamActive, setStreamActive] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [selectedSat, setSelectedSat] = useState('SAT-401A');
  
  // Thruster solver state
  const [dvPrograde, setDvPrograde] = useState(0.4);
  const [dvNormal, setDvNormal] = useState(0.0);
  const [dvRadial, setDvRadial] = useState(0.0);
  const [isFiring, setIsFiring] = useState(false);
  const [burnResult, setBurnResult] = useState(null);

  // Subsystems diagnostic state
  const [subsystems, setSubsystems] = useState([
    { name: 'Attitude Determination (ADCS)', status: 'Nominal', temp: '+14.2°C', health: 99, icon: 'explore' },
    { name: 'Electrical Power (EPS / Solar)', status: 'Nominal', temp: '+22.8°C', health: 97, icon: 'solar_power' },
    { name: 'Ka/X-Band Phased Array RF', status: 'Locked', temp: '+31.4°C', health: 98, icon: 'sensors' },
    { name: 'Optical Laser Transceiver', status: 'Locked', temp: '-08.2°C', health: 100, icon: 'flare' },
    { name: 'Cold-Gas & Xenon Propulsion', status: 'Armed', temp: '+12.0°C', health: 96, icon: 'rocket' },
    { name: 'Avionics Core & Radiation HSM', status: 'Nominal', temp: '+19.6°C', health: 100, icon: 'memory' },
  ]);
  const [diagRunning, setDiagRunning] = useState(false);

  // Terminal CLI state
  const [terminalHistory, setTerminalHistory] = useState([
    'LaunchPad Orbital OS v4.2 [Production Environment]',
    'Type "help" for a list of available flight telemetry commands.',
    '----------------------------------------------------------------',
  ]);
  const [terminalInput, setTerminalInput] = useState('');
  const terminalEndRef = useRef(null);
  const logsEndRef = useRef(null);

  // Periodic Telemetry packet injection
  useEffect(() => {
    if (!isOpen || !streamActive) return;

    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = `${now.toTimeString().split(' ')[0]}.${String(now.getMilliseconds()).padStart(3, '0')}`;
      const sats = ['SAT-401A', 'STAR-LINK-V24', 'OPTIC-X9', 'QKD-PRIME', 'RELAY-04B'];
      const randomSat = sats[Math.floor(Math.random() * sats.length)];
      const msgs = [
        `Downlink telemetry beacon: Bus Voltage=${(28.1 + Math.random() * 0.4).toFixed(2)}V, Batt=${(92 + Math.random() * 6).toFixed(1)}%`,
        `Reaction wheel #2 RPM=${Math.floor(2400 + Math.random() * 200)} [TORQUE_BALANCED]`,
        `Conjunction window evaluated: 0 potential targets within 30km safety volume`,
        `Optical cross-link packet frames acknowledged: CRC32 valid (0 drops)`,
        `Ground station carrier track locked: Doppler shift +14.2 kHz compensation applied`,
      ];
      const randomMsg = msgs[Math.floor(Math.random() * msgs.length)];

      setLogs((prev) => [
        ...prev.slice(-40),
        {
          id: Date.now(),
          time: timeStr,
          sat: randomSat,
          level: 'NOMINAL',
          msg: randomMsg,
        },
      ]);

      if (audioEnabled) {
        playSound('telemetry');
      }
    }, 2800);

    return () => clearInterval(interval);
  }, [isOpen, streamActive, audioEnabled]);

  // Auto-scroll logs
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Auto-scroll terminal
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalHistory]);

  if (!isOpen) return null;

  // Handle Thruster Test Fire
  const handleFireThruster = () => {
    if (isFiring) return;
    setIsFiring(true);
    if (audioEnabled) playSound('burn');

    const totalDv = Math.sqrt(
      dvPrograde * dvPrograde + dvNormal * dvNormal + dvRadial * dvRadial
    ).toFixed(3);

    setTimeout(() => {
      if (audioEnabled) playSound('beep');
      setIsFiring(false);
      setBurnResult({
        totalDv,
        apogeeChange: +(dvPrograde * 1.85).toFixed(2),
        perigeeChange: +(dvPrograde * 0.62).toFixed(2),
        fuelUsed: +(totalDv * 0.12).toFixed(3),
        target: selectedSat,
        timestamp: new Date().toLocaleTimeString(),
      });

      // Add to logs
      setLogs((prev) => [
        ...prev,
        {
          id: Date.now(),
          time: new Date().toLocaleTimeString(),
          sat: selectedSat,
          level: 'EXECUTION',
          msg: `[RCS THRUSTER EXECUTED] Δv=${totalDv} m/s (Prograde=${dvPrograde}m/s, Normal=${dvNormal}m/s, Radial=${dvRadial}m/s)`,
        },
      ]);
    }, 1800);
  };

  // Run Subsystem Diagnostics
  const handleRunDiagnostics = () => {
    if (diagRunning) return;
    setDiagRunning(true);
    if (audioEnabled) playSound('telemetry');

    setTimeout(() => {
      setSubsystems((prev) =>
        prev.map((sub) => ({
          ...sub,
          health: 98 + Math.floor(Math.random() * 3),
          status: 'Passed (100% Nominal)',
        }))
      );
      setDiagRunning(false);
      if (audioEnabled) playSound('beep');
    }, 1600);
  };

  // Handle Terminal Commands
  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    const cmd = terminalInput.trim();
    if (!cmd) return;

    if (audioEnabled) playSound('click');
    const parts = cmd.toLowerCase().split(' ');
    const mainCmd = parts[0];

    let response = '';

    switch (mainCmd) {
      case 'help':
        response = [
          'Available Commands:',
          '  status               - Display overall constellation & telemetry status',
          '  satellites           - List active spacecraft in fleet',
          '  burn <dv>            - Simulate delta-v maneuver burn (e.g. burn 1.5)',
          '  ping <station>       - Ping ground tracking station',
          '  diagnostics          - Run avionics health check',
          '  clear                - Clear terminal console',
          '  abort                - Engage safe-hold stabilization mode',
        ];
        break;
      case 'status':
        response = [
          '[FLEET STATUS: NOMINAL]',
          'Spacecraft Active: 5 / 5 Nominal',
          'Ground Links: 85 Terrestrial Stations Connected',
          'Carrier Lock: 99.98% Phase Coherence',
          'Conjunction Hazards: 0 Pending Threats',
        ];
        break;
      case 'satellites':
        response = [
          'Active Spacecraft Nodes:',
          '  - SAT-401A (Aura Alpha)     [LEO: 542km] - Nominal',
          '  - STAR-LINK-V24 (Mesh)      [LEO: 550km] - Nominal',
          '  - OPTIC-X9 (Laser Relay)    [MEO: 20,200km] - Nominal',
          '  - QKD-PRIME (Quantum Cipher)[LEO: 510km] - Nominal',
          '  - RELAY-04B (Centauri GEO)  [GEO: 35,786km] - Nominal',
        ];
        break;
      case 'burn':
        const amount = parts[1] || '0.5';
        if (audioEnabled) playSound('burn');
        response = [
          `[THRUSTER BURN INITIATED] Target: ${selectedSat}`,
          `Calculated Delta-V: ${amount} m/s`,
          'Propellant valve opened: 420ms RCS pulse',
          'Orbit raised. Trajectory telemetry verified.',
        ];
        break;
      case 'ping':
        const station = parts[1] || 'svalbard';
        response = [
          `Pinging Ground Station [${station.toUpperCase()}]...`,
          'Reply from 185.220.101.4: bytes=64 time=8.2ms TTL=54',
          'Ground Station Uplink SNR: 26.4 dB (Optimal)',
        ];
        break;
      case 'diagnostics':
        response = [
          '[DIAGNOSTIC MATRIX EXECUTED]',
          'GN&C Subsystem: 100% Passed',
          'Solar Bus Regulators: 100% Passed',
          'Xenon Flow Controllers: 100% Passed',
          'Radiation Checksum: 0 Single-Event Upsets (SEUs)',
        ];
        break;
      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;
      case 'abort':
        if (audioEnabled) playSound('alert');
        response = [
          '!!! SAFE-HOLD RECOVERY MODE ENGAGED !!!',
          'Disabling high-energy transmitters.',
          'Sun-pointing attitude acquired via coarse Sun sensors.',
          'Awaiting Flight Director manual override.',
        ];
        break;
      default:
        response = `Command not recognized: "${cmd}". Type "help" for command directory.`;
    }

    setTerminalHistory((prev) => [
      ...prev,
      `lp-orbit> ${cmd}`,
      ...(Array.isArray(response) ? response : [response]),
    ]);
    setTerminalInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-[#010f1f]/90 backdrop-blur-2xl animate-fadeIn">
      <div className="relative w-full max-w-6xl h-[92vh] max-h-[900px] rounded-2xl bg-[#051424] border border-[#a855f7]/60 shadow-[0_0_60px_rgba(168,85,247,0.35)] flex flex-col overflow-hidden">
        {/* Console Flight Deck Header */}
        <div className="px-6 py-4 bg-[#0d1c2d] border-b border-[#1c2b3c] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#842bd2] to-[#7bd0ff] p-[1px] flex items-center justify-center shadow-[0_0_12px_rgba(168,85,247,0.5)]">
              <div className="w-full h-full bg-[#051424] rounded-[7px] flex items-center justify-center">
                <span className="material-symbols-outlined text-[#ddb7ff] text-[18px]">terminal</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-['Space_Grotesk'] text-lg font-bold text-white tracking-tight">
                  LaunchPad Mission Control Deck
                </h2>
                <span className="px-2 py-0.5 rounded bg-[#1c2b3c] text-[#7bd0ff] font-['JetBrains_Mono'] text-[11px] font-bold">
                  ORBIT-v4.2 // LIVE
                </span>
              </div>
              <span className="font-['JetBrains_Mono'] text-xs text-[#94a3b8]">
                FLIGHT-DIRECTOR CONSOLE • CALLSIGN: ALPHA-7 • DEFCON 5
              </span>
            </div>
          </div>

          {/* Quick Actions & Settings */}
          <div className="flex items-center gap-3">
            {/* Audio Toggle */}
            <button
              onClick={() => {
                setAudioEnabled(!audioEnabled);
                if (!audioEnabled) playSound('beep');
              }}
              className={`p-2 rounded-lg border text-xs font-['JetBrains_Mono'] flex items-center gap-1.5 transition-colors cursor-pointer ${
                audioEnabled
                  ? 'bg-[#1c2b3c] border-[#a855f7]/50 text-[#ddb7ff]'
                  : 'bg-[#0d1c2d] border-[#1c2b3c] text-[#94a3b8]'
              }`}
              title="Toggle Audio Feedback"
            >
              <span className="material-symbols-outlined text-[18px]">
                {audioEnabled ? 'volume_up' : 'volume_off'}
              </span>
              <span className="hidden sm:inline">{audioEnabled ? 'AUDIO ON' : 'AUDIO OFF'}</span>
            </button>

            {/* Close Console */}
            <button
              onClick={() => {
                playSound('click');
                onClose();
              }}
              className="w-9 h-9 rounded-lg bg-[#1c2b3c] hover:bg-[#ffb4ab]/20 hover:text-[#ffb4ab] border border-[#273647] text-[#94a3b8] flex items-center justify-center transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 py-2.5 bg-[#122131]/80 border-b border-[#1c2b3c] flex items-center gap-3 overflow-x-auto">
          {[
            { id: 'telemetry', label: 'Live Telemetry Stream', icon: 'sensors' },
            { id: 'thruster', label: 'RCS Thruster & Δv Solver', icon: 'rocket' },
            { id: 'diagnostics', label: 'Subsystems Health Matrix', icon: 'health_and_safety' },
            { id: 'terminal', label: 'Flight Command CLI', icon: 'terminal' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                playSound('click');
                setActiveTab(tab.id);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-['JetBrains_Mono'] font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-[#a855f7] text-white shadow-[0_0_16px_rgba(168,85,247,0.4)]'
                  : 'text-[#94a3b8] hover:text-white hover:bg-[#1c2b3c]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Console Workspace Viewport */}
        <div className="flex-1 p-4 md:p-6 overflow-y-auto bg-[#051424]">
          {/* TAB 1: LIVE TELEMETRY STREAM */}
          {activeTab === 'telemetry' && (
            <div className="flex flex-col h-full gap-4">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-[#1c2b3c]">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#7bd0ff] animate-ping"></span>
                  <span className="font-['JetBrains_Mono'] text-xs font-bold text-white">
                    INCOMING PACKET STREAM (CCSDS 102.0-B-5)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setStreamActive(!streamActive)}
                    className="px-3 py-1 rounded bg-[#1c2b3c] hover:bg-[#273647] text-xs font-['JetBrains_Mono'] text-[#7bd0ff] transition-colors cursor-pointer"
                  >
                    {streamActive ? 'PAUSE INGEST' : 'RESUME INGEST'}
                  </button>
                  <button
                    onClick={() => setLogs([])}
                    className="px-3 py-1 rounded bg-[#1c2b3c] hover:bg-[#273647] text-xs font-['JetBrains_Mono'] text-[#94a3b8] transition-colors cursor-pointer"
                  >
                    CLEAR LOGS
                  </button>
                </div>
              </div>

              {/* Logs Display Screen */}
              <div className="flex-1 rounded-xl bg-[#010f1f] border border-[#1c2b3c] p-4 font-['JetBrains_Mono'] text-xs overflow-y-auto min-h-[350px] shadow-inner flex flex-col gap-1.5">
                {logs.length === 0 ? (
                  <div className="m-auto text-[#94a3b8]">Stream buffer cleared. Listening for new ground frames...</div>
                ) : (
                  logs.map((log) => (
                    <div key={log.id} className="flex items-start gap-3 py-1 border-b border-[#1c2b3c]/30 hover:bg-[#122131]/40 px-2 rounded">
                      <span className="text-[#94a3b8] select-none">{log.time}</span>
                      <span className="px-1.5 py-0.2 rounded bg-[#1c2b3c] text-[#7bd0ff] font-bold text-[10px]">
                        {log.sat}
                      </span>
                      <span
                        className={`text-[10px] font-bold ${
                          log.level === 'EXECUTION'
                            ? 'text-[#fbabff]'
                            : log.level === 'INFO'
                            ? 'text-[#ddb7ff]'
                            : 'text-[#38bdf8]'
                        }`}
                      >
                        [{log.level}]
                      </span>
                      <span className="text-[#d4e4fa] flex-1">{log.msg}</span>
                    </div>
                  ))
                )}
                <div ref={logsEndRef} />
              </div>

              {/* Ingest Stats Footer Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-lg bg-[#0d1c2d] border border-[#1c2b3c]">
                  <span className="font-['JetBrains_Mono'] text-[10px] text-[#94a3b8] uppercase block">INGEST RATE</span>
                  <span className="font-['JetBrains_Mono'] text-sm font-bold text-[#7bd0ff]">1.24M pkts/sec</span>
                </div>
                <div className="p-3 rounded-lg bg-[#0d1c2d] border border-[#1c2b3c]">
                  <span className="font-['JetBrains_Mono'] text-[10px] text-[#94a3b8] uppercase block">CARRIER LOCK</span>
                  <span className="font-['JetBrains_Mono'] text-sm font-bold text-[#ddb7ff]">100% Phase Lock</span>
                </div>
                <div className="p-3 rounded-lg bg-[#0d1c2d] border border-[#1c2b3c]">
                  <span className="font-['JetBrains_Mono'] text-[10px] text-[#94a3b8] uppercase block">PACKET LOSS</span>
                  <span className="font-['JetBrains_Mono'] text-sm font-bold text-white">0.0000%</span>
                </div>
                <div className="p-3 rounded-lg bg-[#0d1c2d] border border-[#1c2b3c]">
                  <span className="font-['JetBrains_Mono'] text-[10px] text-[#94a3b8] uppercase block">GROUND STATION</span>
                  <span className="font-['JetBrains_Mono'] text-sm font-bold text-[#fbabff]">Svalbard Ka-2</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: RCS THRUSTER & DELTA-V SOLVER */}
          {activeTab === 'thruster' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Controls Column (7 Cols) */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div className="p-6 rounded-xl bg-[#0d1c2d] border border-[#1c2b3c] flex flex-col gap-6">
                  <div>
                    <h3 className="font-['Space_Grotesk'] text-xl font-bold text-white">
                      RCS Orbital Maneuver &amp; Delta-V Solver
                    </h3>
                    <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#94a3b8] mt-1">
                      Calculate impulsive burn vectors along spacecraft orbital frame axes.
                    </p>
                  </div>

                  {/* Satellite Selector */}
                  <div className="flex flex-col gap-2">
                    <span className="font-['JetBrains_Mono'] text-xs text-[#94a3b8] uppercase">Target Spacecraft</span>
                    <select
                      value={selectedSat}
                      onChange={(e) => setSelectedSat(e.target.value)}
                      className="w-full p-2.5 rounded-lg bg-[#051424] border border-[#1c2b3c] font-['JetBrains_Mono'] text-xs text-white"
                    >
                      <option value="SAT-401A">SAT-401A (Aura Alpha - LEO 542km)</option>
                      <option value="STAR-LINK-V24">STAR-LINK-V24 (Mesh - LEO 550km)</option>
                      <option value="OPTIC-X9">OPTIC-X9 (Laser Relay - MEO 20,200km)</option>
                      <option value="QKD-PRIME">QKD-PRIME (Quantum - LEO 510km)</option>
                    </select>
                  </div>

                  {/* Prograde / Retrograde Slider */}
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-xs font-['JetBrains_Mono']">
                      <span className="text-[#94a3b8]">PROGRADE (+) / RETROGRADE (-) [Δv_x]</span>
                      <span className="text-[#7bd0ff] font-bold">{dvPrograde > 0 ? `+${dvPrograde}` : dvPrograde} m/s</span>
                    </div>
                    <input
                      type="range"
                      min="-2.0"
                      max="2.0"
                      step="0.05"
                      value={dvPrograde}
                      onChange={(e) => setDvPrograde(parseFloat(e.target.value))}
                      className="w-full accent-[#7bd0ff] cursor-pointer"
                    />
                  </div>

                  {/* Normal / Anti-Normal Slider */}
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-xs font-['JetBrains_Mono']">
                      <span className="text-[#94a3b8]">NORMAL / ANTI-NORMAL (Inclination) [Δv_y]</span>
                      <span className="text-[#ddb7ff] font-bold">{dvNormal > 0 ? `+${dvNormal}` : dvNormal} m/s</span>
                    </div>
                    <input
                      type="range"
                      min="-1.0"
                      max="1.0"
                      step="0.05"
                      value={dvNormal}
                      onChange={(e) => setDvNormal(parseFloat(e.target.value))}
                      className="w-full accent-[#a855f7] cursor-pointer"
                    />
                  </div>

                  {/* Radial-In / Out Slider */}
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-xs font-['JetBrains_Mono']">
                      <span className="text-[#94a3b8]">RADIAL IN / OUT (Eccentricity) [Δv_z]</span>
                      <span className="text-[#fbabff] font-bold">{dvRadial > 0 ? `+${dvRadial}` : dvRadial} m/s</span>
                    </div>
                    <input
                      type="range"
                      min="-1.0"
                      max="1.0"
                      step="0.05"
                      value={dvRadial}
                      onChange={(e) => setDvRadial(parseFloat(e.target.value))}
                      className="w-full accent-[#fbabff] cursor-pointer"
                    />
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={handleFireThruster}
                    disabled={isFiring}
                    className="w-full py-3.5 rounded-lg bg-gradient-to-r from-[#b76dff] to-[#842bd2] text-white text-sm font-semibold tracking-wide shadow-[0_0_24px_rgba(183,109,255,0.4)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {isFiring ? 'mode_heat' : 'local_fire_department'}
                    </span>
                    <span>{isFiring ? 'EXECUTING RCS BURN PULSE...' : 'FIRE RCS THRUSTER PULSE'}</span>
                  </button>
                </div>
              </div>

              {/* Maneuver HUD Visualizer (5 Cols) */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                <div className="p-6 rounded-xl bg-[#0d1c2d] border border-[#1c2b3c] flex flex-col gap-4">
                  <span className="font-['JetBrains_Mono'] text-xs text-[#ddb7ff] uppercase tracking-wider">
                    Calculated Orbital Mechanics Output
                  </span>

                  {/* Thruster Plume Animation Display */}
                  <div className="relative w-full h-44 rounded-lg bg-[#051424] border border-[#1c2b3c] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
                    
                    {/* Satellite icon */}
                    <div className="relative flex items-center gap-4">
                      {isFiring && (
                        <div className="absolute -left-12 flex items-center animate-pulse">
                          <span className="text-2xl">🔥</span>
                          <div className="w-12 h-2 bg-gradient-to-l from-[#a855f7] to-transparent rounded-full blur-xs"></div>
                        </div>
                      )}
                      <span className="material-symbols-outlined text-[#7bd0ff] text-[48px]">
                        satellite_alt
                      </span>
                    </div>

                    <span className="absolute bottom-2 left-2 text-[10px] font-['JetBrains_Mono'] text-[#94a3b8]">
                      THRUSTER: 4x 1N HYDRAZINE/XENON RCS
                    </span>
                  </div>

                  {burnResult && (
                    <div className="p-4 rounded-lg bg-[#051424] border border-[#a855f7]/40 flex flex-col gap-2 font-['JetBrains_Mono'] text-xs animate-fadeIn">
                      <div className="flex justify-between text-[#7bd0ff] font-bold">
                        <span>MANEUVER EXECUTED</span>
                        <span>{burnResult.timestamp}</span>
                      </div>
                      <div className="text-white">Total Δv: {burnResult.totalDv} m/s</div>
                      <div className="text-[#ddb7ff]">Apogee Delta: +{burnResult.apogeeChange} km</div>
                      <div className="text-[#fbabff]">Perigee Delta: +{burnResult.perigeeChange} km</div>
                      <div className="text-[#94a3b8]">Propellant Expended: {burnResult.fuelUsed} kg</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SUBSYSTEMS HEALTH MATRIX */}
          {activeTab === 'diagnostics' && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#1c2b3c]">
                <div>
                  <h3 className="font-['Space_Grotesk'] text-xl font-bold text-white">
                    Spacecraft Subsystem Health Matrix
                  </h3>
                  <span className="font-['JetBrains_Mono'] text-xs text-[#7bd0ff]">
                    Target: {selectedSat} • Triple Modular Redundant (TMR) Bus
                  </span>
                </div>

                <button
                  onClick={handleRunDiagnostics}
                  disabled={diagRunning}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#842bd2] to-[#b76dff] text-white text-xs font-['JetBrains_Mono'] font-bold uppercase tracking-wider transition-all cursor-pointer disabled:opacity-50"
                >
                  {diagRunning ? 'Running Self-Test...' : 'RUN SUBSYSTEM DIAGNOSTICS'}
                </button>
              </div>

              {/* Subsystems Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {subsystems.map((sub) => (
                  <div key={sub.name} className="p-5 rounded-xl bg-[#0d1c2d] border border-[#1c2b3c] flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#ddb7ff] text-[22px]">{sub.icon}</span>
                        <h4 className="font-['Space_Grotesk'] text-sm font-bold text-white">{sub.name}</h4>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-[#1c2b3c] text-[#7bd0ff] font-['JetBrains_Mono'] text-[10px] font-bold">
                        {sub.status}
                      </span>
                    </div>

                    <div className="mt-2 flex items-center justify-between font-['JetBrains_Mono'] text-xs">
                      <span className="text-[#94a3b8]">Thermal: {sub.temp}</span>
                      <span className="text-white font-bold">{sub.health}% Health</span>
                    </div>

                    <div className="w-full bg-[#1c2b3c] rounded h-1.5 overflow-hidden">
                      <div className="bg-[#7bd0ff] h-full rounded" style={{ width: `${sub.health}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: FLIGHT COMMAND CLI */}
          {activeTab === 'terminal' && (
            <div className="flex flex-col h-full gap-4">
              <div className="flex-1 rounded-xl bg-[#010f1f] border border-[#1c2b3c] p-4 font-['JetBrains_Mono'] text-xs overflow-y-auto min-h-[380px] shadow-inner flex flex-col gap-1 text-[#d4e4fa]">
                {terminalHistory.map((line, i) => (
                  <div key={i} className="leading-relaxed">
                    {line.startsWith('lp-orbit>') ? (
                      <span className="text-[#7bd0ff] font-bold">{line}</span>
                    ) : line.startsWith('!') ? (
                      <span className="text-[#ffb4ab] font-bold">{line}</span>
                    ) : (
                      line
                    )}
                  </div>
                ))}
                <div ref={terminalEndRef} />
              </div>

              {/* Command Input Form */}
              <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2">
                <span className="font-['JetBrains_Mono'] text-xs text-[#7bd0ff] font-bold">lp-orbit&gt;</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder="Type a command ('help', 'status', 'satellites', 'burn 0.8', 'ping svalbard', 'clear')..."
                  className="flex-1 px-4 py-2.5 rounded-lg bg-[#0d1c2d] border border-[#1c2b3c] font-['JetBrains_Mono'] text-xs text-white placeholder-[#94a3b8] focus:outline-none focus:border-[#a855f7]"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-lg bg-[#a855f7] text-white text-xs font-['JetBrains_Mono'] font-bold uppercase transition-colors cursor-pointer hover:bg-[#b76dff]"
                >
                  SEND
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
