import React from 'react';
import { playSound } from '../utils/audio';

export default function FeatureModal({ feature, onClose, onLaunchConsole }) {
  if (!feature) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#010f1f]/85 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#0d1c2d] border border-[#a855f7]/50 shadow-[0_0_50px_rgba(168,85,247,0.3)] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-5 bg-[#122131] border-b border-[#1c2b3c] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg ${feature.iconBg} flex items-center justify-center ${feature.iconColor}`}>
              <span className="material-symbols-outlined text-[24px]">{feature.icon}</span>
            </div>
            <div>
              <h3 className="font-['Space_Grotesk'] text-xl font-bold text-white">
                {feature.title}
              </h3>
              <span className="font-['JetBrains_Mono'] text-xs text-[#7bd0ff]">
                SUBSYSTEM SPEC // {feature.badgeLabel}: {feature.badgeValue}
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              playSound('click');
              onClose();
            }}
            className="w-8 h-8 rounded-lg bg-[#1c2b3c] hover:bg-[#273647] text-[#94a3b8] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex flex-col gap-6">
          <div>
            <h4 className="font-['Space_Grotesk'] text-sm font-semibold text-[#ddb7ff] uppercase tracking-wider mb-2">
              Operational Architecture Overview
            </h4>
            <p className="font-['Plus_Jakarta_Sans'] text-sm text-[#cbd5e1] leading-relaxed">
              {feature.desc} Designed with triple-redundant Byzantine fault tolerance, providing continuous real-time orbital computation even in harsh space radiation environments.
            </p>
          </div>

          {/* Capabilities Grid */}
          <div className="p-4 rounded-xl bg-[#051424] border border-[#1c2b3c] flex flex-col gap-3">
            <span className="font-['JetBrains_Mono'] text-xs text-[#7bd0ff] uppercase tracking-wider">
              Validated Flight Capabilities
            </span>
            <ul className="flex flex-col gap-2 font-['Plus_Jakarta_Sans'] text-xs text-[#d4e4fa]">
              {feature.bullets.map((b) => (
                <li key={b} className="flex items-center gap-2">
                  <span className={`material-symbols-outlined ${feature.iconColor} text-[16px]`}>
                    check_circle
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Telemetry Readout */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-lg bg-[#051424] border border-[#1c2b3c]">
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#94a3b8] uppercase block">
                PRIMARY TIMING
              </span>
              <span className="font-['JetBrains_Mono'] text-sm font-bold text-white">
                {feature.stat1}
              </span>
            </div>
            <div className="p-3 rounded-lg bg-[#051424] border border-[#1c2b3c]">
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#94a3b8] uppercase block">
                FLIGHT STATUS
              </span>
              <span className={`font-['JetBrains_Mono'] text-sm font-bold ${feature.stat2Color}`}>
                {feature.stat2}
              </span>
            </div>
            <div className="p-3 rounded-lg bg-[#051424] border border-[#1c2b3c]">
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#94a3b8] uppercase block">
                QUALIFICATION
              </span>
              <span className="font-['JetBrains_Mono'] text-sm font-bold text-[#ddb7ff]">
                TRL-9 Flight Proven
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#122131] border-t border-[#1c2b3c] flex items-center justify-between">
          <span className="font-['JetBrains_Mono'] text-xs text-[#94a3b8]">
            {feature.footerStatus}
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onLaunchConsole?.('flight-sim');
              }}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#b76dff] to-[#842bd2] text-white text-xs font-['Plus_Jakarta_Sans'] font-semibold tracking-wide shadow-[0_0_16px_rgba(183,109,255,0.4)] hover:brightness-110 transition-all cursor-pointer"
            >
              Test In Flight Deck Console
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
