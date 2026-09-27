import React, { useState } from 'react';
import { playSound } from '../utils/audio';

export default function SecurityFAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  const securityBadges = [
    {
      icon: 'verified_user',
      title: 'ITAR & EAR Certified',
      desc: 'US Munitions List Category XV compliance for military & defense satellite programs.',
      color: '#ddb7ff'
    },
    {
      icon: 'enhanced_encryption',
      title: 'Post-Quantum Kyber-1024',
      desc: 'Hardware security module (HSM) zero-trust encryption on all spacecraft uplinks.',
      color: '#7bd0ff'
    },
    {
      icon: 'public',
      title: 'NASA CARA & ESA DISCOS',
      desc: 'Direct automated conjunction pipeline syncing with 18th Space Defense Squadron catalogs.',
      color: '#fbabff'
    },
    {
      icon: 'speed',
      title: 'CCSDS & XTCE Native',
      desc: 'Standard packet telemetry telemetry and telecommand compliance across all ground nodes.',
      color: '#38bdf8'
    }
  ];

  const faqs = [
    {
      q: 'How does automated collision avoidance calculate and execute delta-v burns?',
      a: 'LaunchPad ingests real-time Two-Line Element (TLE) and Conjunction Data Messages (CDMs) from space surveillance radars. When collision probability exceeds 1e-5 within a 72-hour window, our trajectory solver solves the optimal Hohmann transfer or phasing burn vector in <40 milliseconds, calculating delta-v magnitude, thrust vector direction, and fuel penalty, before dispatching the burn plan to the spacecraft bus.'
    },
    {
      q: 'Which telemetry protocols and downlink standards does the platform ingest?',
      a: 'The engine natively parses CCSDS (Consultative Committee for Space Data Systems) packets, XTCE (XML Telemetric and Command Exchange) telemetry databases, low-latency gRPC streams, and raw bit-level Ka/X-band IQ frames. We also provide native SDKs for Python, Rust, C++, and WebSockets.'
    },
    {
      q: 'How does LaunchPad ensure compliance with ITAR and EAR regulations?',
      a: 'LaunchPad operates dedicated air-gapped sovereign cloud regions compliant with AWS GovCloud and FedRAMP High. Access is restricted to US persons for US-origin payloads, with hardware token-based MFA, full cryptographic audit logs, and hardware security modules (FIPS 140-3 Level 4).'
    },
    {
      q: 'Can our operations team integrate hardware-in-the-loop (HIL) flight simulators?',
      a: 'Yes. Our platform provides a zero-latency synthetic telemetry simulator that connects directly to FlatSat and engineering qualification models (EQMs). Operators can test anomaly injections, reaction wheel failures, and battery degradation in a safe sandbox before flight clearance.'
    },
    {
      q: 'What fail-safes are deployed during unexpected Loss-of-Signal (LOS) events?',
      a: 'Spacecraft flight computers running the LaunchPad Onboard Agent automatically switch into safe-hold Sun-pointing mode if ground heartbeat is lost for more than three consecutive orbital periods. Automated re-acquisition protocols broadcast omnidirectional carrier beacons on emergency UHF/S-band channels.'
    }
  ];

  const toggleFAQ = (idx) => {
    playSound('click');
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="w-full py-24 px-4 md:px-8 lg:px-12 bg-[#051424] border-t border-[#1c2b3c]" id="security-faq">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <span className="font-['JetBrains_Mono'] text-xs text-[#ddb7ff] uppercase tracking-widest mb-3">
            AEROSPACE COMPLIANCE &amp; ARCHITECTURAL SPECIFICATIONS
          </span>
          <h2 className="font-['Space_Grotesk'] text-3xl md:text-4xl font-bold text-white tracking-tight">
            Built for Mission-Critical Flight Safety
          </h2>
          <p className="font-['Plus_Jakarta_Sans'] text-base text-[#94a3b8] mt-3">
            Every layer of the LaunchPad platform complies with international orbital safety treaties, national defense regulations, and rigorous space flight standards.
          </p>
        </div>

        {/* Security & Compliance Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {securityBadges.map((b) => (
            <div
              key={b.title}
              className="p-6 rounded-xl bg-[#0d1c2d] border border-[#1c2b3c] flex flex-col gap-3 shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all hover:-translate-y-1 hover:border-[#273647]"
            >
              <div
                className="w-12 h-12 rounded-lg bg-[#1c2b3c] flex items-center justify-center"
                style={{ color: b.color }}
              >
                <span className="material-symbols-outlined text-[28px]">{b.icon}</span>
              </div>
              <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white mt-1">
                {b.title}
              </h3>
              <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#94a3b8] leading-relaxed">
                {b.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Technical FAQ Accordion */}
        <div className="w-full max-w-4xl mx-auto flex flex-col gap-4">
          <span className="font-['JetBrains_Mono'] text-xs text-[#7bd0ff] uppercase tracking-wider text-center mb-2">
            Frequently Asked Technical Questions
          </span>

          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.q}
                className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-[#0d1c2d] border-[#a855f7]/60 shadow-[0_0_24px_rgba(168,85,247,0.15)]'
                    : 'bg-[#0d1c2d]/70 border-[#1c2b3c] hover:border-[#273647]'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-['Space_Grotesk'] text-base md:text-lg font-semibold text-white">
                    {faq.q}
                  </span>
                  <span
                    className={`material-symbols-outlined text-[#ddb7ff] text-[22px] transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  >
                    expand_more
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-sm font-['Plus_Jakarta_Sans'] text-[#cbd5e1] leading-relaxed border-t border-[#1c2b3c]/60 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
