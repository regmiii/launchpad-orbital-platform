import React, { useState, useEffect } from 'react';
import { playSound } from '../utils/audio';

const GROUND_STATIONS = [
  {
    id: 'GS-SVALBARD',
    name: 'Svalbard Arctic Hub',
    location: 'Spitsbergen, Norway (78.2° N)',
    band: 'Ka/X-Band & Optical',
    status: 'Tracking Pass',
    azimuth: '142.4°',
    elevation: '48.2°',
    snr: '26.4 dB',
    downlinkRate: '12.4 Gbps',
    dailyData: '4.8 TB',
    nextPass: 'ACTIVE NOW',
    activeSatellite: 'SAT-401A (AURA-ALPHA)',
    antennaDiameter: '13.0m Radome',
    color: '#7bd0ff'
  },
  {
    id: 'GS-KOUROU',
    name: 'Guiana Space Center',
    location: 'Kourou, French Guiana (5.2° N)',
    band: 'Ka-Band / S-Band TT&C',
    status: 'Acquiring Signal',
    azimuth: '088.1°',
    elevation: '22.6°',
    snr: '19.8 dB',
    downlinkRate: '8.2 Gbps',
    dailyData: '3.1 TB',
    nextPass: 'T-00:03:42',
    activeSatellite: 'STAR-LINK-V24',
    antennaDiameter: '15.0m Deep Space Dish',
    color: '#ddb7ff'
  },
  {
    id: 'GS-WHITE-SANDS',
    name: 'White Sands Complex',
    location: 'New Mexico, USA (32.3° N)',
    band: 'X/Ku-Band Relay',
    status: 'Tracking Pass',
    azimuth: '210.5°',
    elevation: '64.1°',
    snr: '28.2 dB',
    downlinkRate: '15.6 Gbps',
    dailyData: '5.9 TB',
    nextPass: 'ACTIVE NOW',
    activeSatellite: 'OPTIC-X9',
    antennaDiameter: '18.0m Multi-Band',
    color: '#fbabff'
  },
  {
    id: 'GS-HARTEBEEST',
    name: 'Hartebeesthoek Radio Observatory',
    location: 'Gauteng, South Africa (25.8° S)',
    band: 'S/X-Band Cryo Receiver',
    status: 'Standby / Ready',
    azimuth: '340.0°',
    elevation: '12.0°',
    snr: '21.0 dB',
    downlinkRate: '6.4 Gbps',
    dailyData: '2.4 TB',
    nextPass: 'T-00:14:18',
    activeSatellite: 'Next: RELAY-04B',
    antennaDiameter: '26.0m Parabolic',
    color: '#38bdf8'
  },
  {
    id: 'GS-PERTH',
    name: 'Perth Deep Space Facility',
    location: 'Western Australia (31.8° S)',
    band: 'Optical Laser Downlink',
    status: 'Tracking Pass',
    azimuth: '195.3°',
    elevation: '55.7°',
    snr: '32.1 dB (Laser SNR)',
    downlinkRate: '20.0 Gbps (Optical)',
    dailyData: '7.8 TB',
    nextPass: 'ACTIVE NOW',
    activeSatellite: 'QKD-PRIME',
    antennaDiameter: '1.2m Optical Telescope',
    color: '#c084fc'
  }
];

export default function GroundNetwork({ onLaunchConsole }) {
  const [stations, setStations] = useState(GROUND_STATIONS);
  const [selectedStation, setSelectedStation] = useState(GROUND_STATIONS[0]);
  const [isAligning, setIsAligning] = useState(false);
  const [lockStatus, setLockStatus] = useState('CARRIER LOCK NOMINAL');

  // Periodic simulated SNR jitter
  useEffect(() => {
    const timer = setInterval(() => {
      setStations((prev) =>
        prev.map((s) => ({
          ...s,
          snr: `${(parseFloat(s.snr) + (Math.random() - 0.5) * 0.4).toFixed(1)} dB`,
        }))
      );
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const handleAlignAntenna = () => {
    playSound('telemetry');
    setIsAligning(true);
    setLockStatus('SLEWING ANTENNA AZIMUTH...');
    setTimeout(() => {
      playSound('beep');
      setIsAligning(false);
      setLockStatus('PHASED ARRAY CARRIER LOCKED (99.98% SNR)');
      setTimeout(() => setLockStatus('CARRIER LOCK NOMINAL'), 4000);
    }, 1500);
  };

  return (
    <section className="w-full py-24 px-4 md:px-8 lg:px-12 bg-[#051424] border-t border-[#1c2b3c]" id="ground-network">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#1c2b3c]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#1c2b3c] border border-[#273647] text-[#ddb7ff] font-['JetBrains_Mono'] text-xs font-semibold uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-[#ddb7ff] animate-pulse"></span>
              GLOBAL TERRESTRIAL DOWNLINK NETWORK
            </div>
            <h2 className="font-['Space_Grotesk'] text-3xl md:text-4xl font-bold text-white tracking-tight">
              85+ Redundant Ground Stations Worldwide
            </h2>
            <p className="font-['Plus_Jakarta_Sans'] text-base text-[#94a3b8] mt-2 max-w-2xl">
              High-throughput Ka/X-band and optical laser ground terminals delivering sub-second polar and equatorial contact passes with zero gap windows.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-[#0d1c2d] border border-[#1c2b3c] flex flex-col">
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#94a3b8] uppercase">Global Throughput</span>
              <span className="font-['JetBrains_Mono'] text-lg font-bold text-[#7bd0ff]">48.2 Gbps Live</span>
            </div>
            <div className="p-3 rounded-xl bg-[#0d1c2d] border border-[#1c2b3c] flex flex-col">
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#94a3b8] uppercase">Contact Pass Uptime</span>
              <span className="font-['JetBrains_Mono'] text-lg font-bold text-[#ddb7ff]">99.999%</span>
            </div>
          </div>
        </div>

        {/* Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Station Roster (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <span className="font-['JetBrains_Mono'] text-xs text-[#94a3b8] uppercase tracking-wider mb-1">
              Select Active Ground Station
            </span>
            {stations.map((stn) => {
              const isSelected = selectedStation.id === stn.id;
              return (
                <div
                  key={stn.id}
                  onClick={() => {
                    playSound('click');
                    setSelectedStation(stn);
                  }}
                  className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#122131] border-[#a855f7]/60 shadow-[0_0_20px_rgba(168,85,247,0.25)] ring-1 ring-[#a855f7]/40'
                      : 'bg-[#0d1c2d]/70 hover:bg-[#122131]/80 border-[#1c2b3c]'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: stn.color }}
                        ></span>
                        <h4 className="font-['Space_Grotesk'] text-base font-bold text-white">
                          {stn.name}
                        </h4>
                      </div>
                      <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#94a3b8] mt-0.5 block">
                        {stn.location}
                      </span>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-['JetBrains_Mono'] font-semibold ${
                        stn.status === 'Tracking Pass'
                          ? 'bg-[#00354a] text-[#7bd0ff] border border-[#7bd0ff]/30'
                          : stn.status === 'Acquiring Signal'
                          ? 'bg-[#400071] text-[#ddb7ff] border border-[#ddb7ff]/30'
                          : 'bg-[#1c2b3c] text-[#94a3b8]'
                      }`}
                    >
                      {stn.status}
                    </span>
                  </div>

                  <div className="mt-3 pt-2 border-t border-[#1c2b3c]/60 flex items-center justify-between text-xs font-['JetBrains_Mono'] text-[#94a3b8]">
                    <span>Band: <span className="text-white">{stn.band}</span></span>
                    <span className="text-[#ddb7ff]">{stn.nextPass}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Station Diagnostics & Antenna HUD (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="p-6 rounded-2xl bg-[#0d1c2d] border border-[#1c2b3c] shadow-[0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-xl flex flex-col gap-6">
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#1c2b3c]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#7bd0ff] text-[24px]">
                      settings_input_antenna
                    </span>
                    <h3 className="font-['Space_Grotesk'] text-2xl font-bold text-white">
                      {selectedStation.name}
                    </h3>
                  </div>
                  <span className="font-['JetBrains_Mono'] text-xs text-[#7bd0ff] mt-1 block">
                    IDENT: {selectedStation.id} • {selectedStation.antennaDiameter}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#7bd0ff] animate-ping"></span>
                  <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#ddb7ff]">
                    {lockStatus}
                  </span>
                </div>
              </div>

              {/* Antenna Aiming & Polar Display Graphic */}
              <div className="w-full rounded-xl bg-[#051424] border border-[#1c2b3c] p-6 flex flex-col md:flex-row items-center justify-around gap-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none"></div>

                {/* Radar Elevation & Azimuth Dial */}
                <div className="relative w-40 h-40 rounded-full border border-[#1c2b3c] flex items-center justify-center">
                  {/* Concentric rings */}
                  <div className="absolute w-28 h-28 rounded-full border border-[#7bd0ff]/20"></div>
                  <div className="absolute w-16 h-16 rounded-full border border-[#a855f7]/20"></div>
                  {/* Crosshairs */}
                  <div className="absolute w-full h-[1px] bg-[#1c2b3c]"></div>
                  <div className="absolute h-full w-[1px] bg-[#1c2b3c]"></div>

                  {/* Slew Beam line */}
                  <div
                    className="absolute w-18 h-[2px] bg-gradient-to-r from-transparent to-[#7bd0ff] origin-left transition-transform duration-1000"
                    style={{
                      transform: `rotate(${parseFloat(selectedStation.azimuth)}deg)`,
                    }}
                  ></div>

                  {/* Dish center icon */}
                  <span className="material-symbols-outlined text-[#ddb7ff] text-[28px] z-10">
                    radar
                  </span>

                  <span className="absolute bottom-1 right-2 text-[9px] font-['JetBrains_Mono'] text-[#94a3b8]">
                    AZ: {selectedStation.azimuth}
                  </span>
                  <span className="absolute top-1 left-2 text-[9px] font-['JetBrains_Mono'] text-[#7bd0ff]">
                    EL: {selectedStation.elevation}
                  </span>
                </div>

                {/* Telemetry Target Info */}
                <div className="flex flex-col gap-2 z-10 max-w-xs">
                  <span className="font-['JetBrains_Mono'] text-[11px] text-[#94a3b8] uppercase">
                    ACTIVE CONTACT VECTOR
                  </span>
                  <span className="font-['Space_Grotesk'] text-lg font-bold text-white">
                    {selectedStation.activeSatellite}
                  </span>
                  <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#cbd5e1] leading-relaxed">
                    Downlinking raw multispectral payload frames with automated forward error correction (FEC) and Reed-Solomon de-interleaving.
                  </p>
                </div>
              </div>

              {/* Station Telemetry Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-lg bg-[#051424] border border-[#1c2b3c]">
                  <span className="font-['JetBrains_Mono'] text-[10px] text-[#94a3b8] uppercase block">
                    SNR RATIO
                  </span>
                  <span className="font-['JetBrains_Mono'] text-base font-bold text-[#7bd0ff]">
                    {selectedStation.snr}
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-[#051424] border border-[#1c2b3c]">
                  <span className="font-['JetBrains_Mono'] text-[10px] text-[#94a3b8] uppercase block">
                    DOWNLINK
                  </span>
                  <span className="font-['JetBrains_Mono'] text-base font-bold text-[#ddb7ff]">
                    {selectedStation.downlinkRate}
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-[#051424] border border-[#1c2b3c]">
                  <span className="font-['JetBrains_Mono'] text-[10px] text-[#94a3b8] uppercase block">
                    DAILY VOLUME
                  </span>
                  <span className="font-['JetBrains_Mono'] text-base font-bold text-white">
                    {selectedStation.dailyData}
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-[#051424] border border-[#1c2b3c]">
                  <span className="font-['JetBrains_Mono'] text-[10px] text-[#94a3b8] uppercase block">
                    RF BAND
                  </span>
                  <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#fbabff]">
                    {selectedStation.band.split(' ')[0]}
                  </span>
                </div>
              </div>

              {/* Station Action Button */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleAlignAntenna}
                  disabled={isAligning}
                  className="flex-1 py-3 px-4 rounded-lg bg-gradient-to-r from-[#842bd2] to-[#b76dff] text-white text-sm font-semibold tracking-wide shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {isAligning ? 'sync' : 'tune'}
                  </span>
                  <span>
                    {isAligning ? 'CALIBRATING PHASE ANGLE...' : 'RE-CALIBRATE TRACKING DISH'}
                  </span>
                </button>

                <button
                  onClick={() => onLaunchConsole?.('telemetry-stream')}
                  className="py-3 px-4 rounded-lg bg-[#1c2b3c] hover:bg-[#273647] border border-[#273647] text-[#7bd0ff] text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">terminal</span>
                  <span>VIEW RAW TELEMETRY FRAMES</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
