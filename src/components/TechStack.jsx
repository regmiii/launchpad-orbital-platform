import React, { useState } from 'react';
import { playSound } from '../utils/audio';

export default function TechStack() {
  const [activeLang, setActiveLang] = useState('python');
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [queryOutput, setQueryOutput] = useState(null);

  const codeSnippets = {
    python: `import launchpad_orbit as lp

# Initialize flight controller uplink
session = lp.Session(client_id="ORB-882", token="sec_prod_99x")
constellation = session.get_constellation("AURA-FLEET")

# Real-time automated conjunction avoidance calculation
for satellite in constellation.active_nodes():
    vector = satellite.calculate_trajectory(window_hrs=48)
    conjunction = satellite.predict_debris_collision(vector)
    
    if conjunction.probability > 1e-6:
        burn_plan = satellite.compute_delta_v(avoidance_target=conjunction)
        satellite.execute_burn_window(burn_plan.optimal_burn)
        print(f"[AVOIDANCE DISPATCHED] Δv: {burn_plan.dv_ms} m/s")`,
    rust: `use launchpad_orbit::{Session, TrajectoryEngine, TelemetryStream};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let session = Session::connect("grpc://node-alpha7.launchpad.space:443").await?;
    let mut stream = session.stream_telemetry("AURA-FLEET").await?;

    while let Some(packet) = stream.next().await {
        if packet.conjunction_risk() > 1e-6 {
            let maneuver = packet.calculate_optimal_burn(3600)?;
            session.dispatch_burn_vector(&maneuver).await?;
        }
    }
    Ok(())
}`,
    cpp: `#include <launchpad/orbit.hpp>
#include <iostream>

int main() {
    launchpad::Client client("sec_prod_99x");
    auto fleet = client.get_constellation("AURA-FLEET");

    fleet.on_telemetry_frame([](const auto& frame) {
        if (frame.has_conjunction_alert()) {
            auto delta_v = frame.solve_burn_vector();
            delta_v.execute_rcs_burn();
            std::cout << "[AVOIDANCE EXECUTED] Delta-V: " << delta_v.magnitude() << std::endl;
        }
    });
    return 0;
}`,
    typescript: `import { LaunchPadClient, OrbitStream } from '@launchpad/space-sdk';

const client = new LaunchPadClient({
  apiKey: process.env.LAUNCHPAD_KEY,
  endpoint: 'https://telemetry.launchpad.space/v4'
});

const subscription = client.telemetry.subscribe({
  fleetId: 'AURA-FLEET',
  onConjunctionAlert: async (event) => {
    console.warn(\`[DEBRIS ALERT] Spacecraft \${event.spacecraftId} at risk!\`);
    const burnVector = await client.solver.computeDeltaV(event.hazardVector);
    await client.uplink.dispatchBurnCommand(event.spacecraftId, burnVector);
  }
});`
  };

  const handleCopy = () => {
    playSound('click');
    navigator.clipboard.writeText(codeSnippets[activeLang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunQuery = () => {
    playSound('telemetry');
    setIsRunning(true);
    setQueryOutput(null);

    setTimeout(() => {
      playSound('beep');
      setIsRunning(false);
      setQueryOutput({
        timestamp: new Date().toISOString(),
        status: '200 OK (gRPC STREAM_ESTABLISHED)',
        latency: '7.8ms',
        target: 'AURA-FLEET // SAT-401A',
        conjunctionRisk: '0.000004%',
        optimalDv: '0.084 m/s (Prograde vector: [0.082, 0.012, -0.004])',
        uplinkCarrier: 'Svalbard Ka-Band Dish-2 (Locked)',
      });
    }, 1200);
  };

  return (
    <section className="w-full py-24 px-4 md:px-8 lg:px-12 bg-[#010f1f]" id="tech">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Copy & Details */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <span className="font-['JetBrains_Mono'] text-xs text-[#7bd0ff] uppercase tracking-widest">
            SPACE-GRADE DEVELOPER STACK
          </span>
          <h2 className="font-['Space_Grotesk'] text-3xl md:text-4xl font-bold text-white leading-tight">
            Unified Telemetry API &amp; Flight-Ready SDKs
          </h2>
          <p className="font-['Plus_Jakarta_Sans'] text-base text-[#94a3b8] leading-relaxed">
            Integrate spacecraft bus telemetry directly into your ground control station or web dashboard. Run Python, Rust, C++, or TypeScript drivers with deterministic sub-millisecond execution and ISO-certified aerospace compliance.
          </p>

          <div className="flex flex-col gap-3 mt-2">
            <div className="flex items-center gap-4 p-3.5 rounded-lg bg-[#0d1c2d] border border-[#1c2b3c]">
              <span className="material-symbols-outlined text-[#ddb7ff] text-[24px]">terminal</span>
              <div>
                <span className="font-['Plus_Jakarta_Sans'] text-sm text-white font-semibold block">
                  gRPC &amp; REST Event Streaming
                </span>
                <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#94a3b8]">
                  Real-time bi-directional telemetry sockets with automatic failover.
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 p-3.5 rounded-lg bg-[#0d1c2d] border border-[#1c2b3c]">
              <span className="material-symbols-outlined text-[#7bd0ff] text-[24px]">lock</span>
              <div>
                <span className="font-['Plus_Jakarta_Sans'] text-sm text-white font-semibold block">
                  Post-Quantum ITAR Encryption
                </span>
                <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#94a3b8]">
                  Zero-trust cryptographic key exchange with hardware security modules.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Code Snippet & Live Monitor Mockup */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Interactive Code Terminal Card */}
          <div className="w-full rounded-xl bg-[#0d1c2d] border border-[#1c2b3c] shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden">
            {/* Terminal Header */}
            <div className="px-4 py-3 bg-[#122131] border-b border-[#1c2b3c] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ffb4ab]"></span>
                <span className="w-3 h-3 rounded-full bg-[#2c3a4c]"></span>
                <span className="w-3 h-3 rounded-full bg-[#7bd0ff]"></span>
                <span className="font-['JetBrains_Mono'] text-xs text-[#94a3b8] ml-2">
                  telemetry_flight_loop.{activeLang === 'python' ? 'py' : activeLang === 'rust' ? 'rs' : activeLang === 'cpp' ? 'cpp' : 'ts'}
                </span>
              </div>

              {/* Language Switcher & Copy */}
              <div className="flex items-center gap-2">
                {(['python', 'rust', 'cpp', 'typescript']).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      playSound('click');
                      setActiveLang(lang);
                    }}
                    className={`px-2 py-0.5 rounded text-[11px] font-['JetBrains_Mono'] uppercase transition-colors cursor-pointer ${
                      activeLang === lang
                        ? 'bg-[#a855f7] text-white font-bold'
                        : 'text-[#94a3b8] hover:text-white'
                    }`}
                  >
                    {lang === 'typescript' ? 'TS' : lang}
                  </button>
                ))}

                <button
                  onClick={handleCopy}
                  className="ml-2 flex items-center gap-1 text-[11px] font-['JetBrains_Mono'] text-[#7bd0ff] hover:text-white px-2 py-0.5 rounded bg-[#1c2b3c] transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {copied ? 'done' : 'content_copy'}
                  </span>
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>

                <button
                  onClick={handleRunQuery}
                  disabled={isRunning}
                  className="ml-1 flex items-center gap-1 text-[11px] font-['JetBrains_Mono'] font-bold text-white px-2.5 py-0.5 rounded bg-gradient-to-r from-[#b76dff] to-[#842bd2] shadow-[0_0_10px_rgba(168,85,247,0.4)] hover:brightness-110 transition-all cursor-pointer disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {isRunning ? 'sync' : 'play_arrow'}
                  </span>
                  <span>{isRunning ? 'Running...' : 'Run Query'}</span>
                </button>
              </div>
            </div>

            {/* Code Body */}
            <pre className="p-6 font-['JetBrains_Mono'] text-xs text-[#d4e4fa] overflow-x-auto leading-relaxed bg-[#051424] max-h-[290px]">
              <code>{codeSnippets[activeLang]}</code>
            </pre>

            {/* Live Query Execution Result Drawer */}
            {queryOutput && (
              <div className="p-4 bg-[#010f1f] border-t border-[#1c2b3c] flex flex-col gap-2 animate-fadeIn font-['JetBrains_Mono'] text-xs">
                <div className="flex items-center justify-between text-[#7bd0ff]">
                  <span className="font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#7bd0ff] animate-ping"></span>
                    UPLINK EXECUTION RESULT
                  </span>
                  <span className="text-[#94a3b8] text-[10px]">{queryOutput.timestamp}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-[#cbd5e1] mt-1">
                  <div>Status: <span className="text-[#ddb7ff]">{queryOutput.status}</span></div>
                  <div>Round-Trip Latency: <span className="text-[#7bd0ff] font-bold">{queryOutput.latency}</span></div>
                  <div>Target Constellation: <span className="text-white">{queryOutput.target}</span></div>
                  <div>Solved Burn Vector: <span className="text-[#fbabff] font-bold">{queryOutput.optimalDv}</span></div>
                </div>
              </div>
            )}
          </div>

          {/* Metric Stream Bar */}
          <div className="p-4 rounded-xl bg-[#122131]/80 border border-[#1c2b3c] backdrop-blur-md flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#7bd0ff] text-[20px] animate-spin">sync</span>
              <span className="font-['JetBrains_Mono'] text-xs text-white">TELEMETRY INGEST: 1.2M EPS</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#ddb7ff] text-[20px]">speed</span>
              <span className="font-['JetBrains_Mono'] text-xs text-white">SOLVER JITTER: 0.12ms</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#fbabff] text-[20px]">verified</span>
              <span className="font-['JetBrains_Mono'] text-xs text-white">ITAR COMPLIANT</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
