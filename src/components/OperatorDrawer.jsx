import React, { useState } from 'react';
import { playSound } from '../utils/audio';

export default function OperatorDrawer({ isOpen, onClose, operator, onLogout, onLaunchConsole }) {
  const [copiedKey, setCopiedKey] = useState(false);
  const [apiKey, setApiKey] = useState(operator?.apiKey || 'lp_live_sec_99a84f0289bc441');

  if (!isOpen) return null;

  const handleCopyKey = () => {
    playSound('click');
    navigator.clipboard.writeText(apiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleRegenerateKey = () => {
    playSound('telemetry');
    const newKey = `lp_live_sec_${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 8)}`;
    setApiKey(newKey);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#010f1f]/80 backdrop-blur-md transition-opacity"
      ></div>

      {/* Drawer */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0d1c2d] border-l border-[#1c2b3c] shadow-2xl flex flex-col justify-between overflow-y-auto">
          {/* Header */}
          <div className="p-6 bg-[#122131] border-b border-[#1c2b3c] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#842bd2] to-[#7bd0ff] p-[2px]">
                <div className="w-full h-full bg-[#051424] rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#ddb7ff] text-[20px]">
                    person
                  </span>
                </div>
              </div>
              <div>
                <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white">
                  {operator?.name || 'Cmdr. Elena Rostova'}
                </h3>
                <span className="font-['JetBrains_Mono'] text-xs text-[#7bd0ff]">
                  CALLSIGN: {operator?.callsign || 'ALPHA-LEAD'}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                playSound('click');
                onClose();
              }}
              className="w-8 h-8 rounded-lg bg-[#1c2b3c] hover:bg-[#273647] text-[#94a3b8] flex items-center justify-center transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 flex flex-col gap-6 flex-1">
            {/* Clearance Pill */}
            <div className="p-4 rounded-xl bg-[#051424] border border-[#1c2b3c] flex flex-col gap-1.5">
              <span className="font-['JetBrains_Mono'] text-[10px] text-[#94a3b8] uppercase tracking-wider">
                SECURITY CLEARANCE
              </span>
              <span className="font-['JetBrains_Mono'] text-xs font-bold text-[#ddb7ff]">
                {operator?.clearance || 'LEVEL 4 - TOP SECRET // SAP-COSMIC'}
              </span>
              <span className="text-[11px] font-['Plus_Jakarta_Sans'] text-[#94a3b8]">
                Authorized for autonomous delta-v maneuver dispatch &amp; optical key exchanges.
              </span>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-[#051424] border border-[#1c2b3c]">
                <span className="font-['JetBrains_Mono'] text-[10px] text-[#94a3b8] uppercase block">
                  ASSIGNED FLEET
                </span>
                <span className="font-['JetBrains_Mono'] text-base font-bold text-white">
                  5 Spacecraft
                </span>
              </div>
              <div className="p-3 rounded-lg bg-[#051424] border border-[#1c2b3c]">
                <span className="font-['JetBrains_Mono'] text-[10px] text-[#94a3b8] uppercase block">
                  SESSION UPTIME
                </span>
                <span className="font-['JetBrains_Mono'] text-base font-bold text-[#7bd0ff]">
                  03:48:12 MET
                </span>
              </div>
            </div>

            {/* API Key Management */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-['JetBrains_Mono'] text-xs text-[#94a3b8] uppercase">
                  Telemetry Secret API Key
                </span>
                <button
                  onClick={handleRegenerateKey}
                  className="text-[10px] font-['JetBrains_Mono'] text-[#ddb7ff] hover:underline cursor-pointer"
                >
                  Regenerate
                </button>
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#051424] border border-[#1c2b3c]">
                <span className="font-['JetBrains_Mono'] text-xs text-[#cbd5e1] truncate flex-1">
                  {apiKey}
                </span>
                <button
                  onClick={handleCopyKey}
                  className="px-2.5 py-1 rounded bg-[#1c2b3c] hover:bg-[#273647] text-[#7bd0ff] text-xs font-['JetBrains_Mono'] transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {copiedKey ? 'done' : 'content_copy'}
                  </span>
                  <span>{copiedKey ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Telemetry Webhook Endpoint */}
            <div className="flex flex-col gap-2">
              <span className="font-['JetBrains_Mono'] text-xs text-[#94a3b8] uppercase">
                Active Webhook Hook
              </span>
              <div className="p-2.5 rounded-lg bg-[#051424] border border-[#1c2b3c] text-xs font-['JetBrains_Mono'] text-[#94a3b8] truncate">
                https://telemetry-gateway.launchpad.space/v4/hooks/prod
              </div>
            </div>

            {/* Launch Console Action */}
            <button
              onClick={() => {
                onClose();
                onLaunchConsole?.('flight-sim');
              }}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-[#b76dff] to-[#842bd2] text-white text-xs font-['Plus_Jakarta_Sans'] font-semibold tracking-wide shadow-[0_0_16px_rgba(183,109,255,0.4)] hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">terminal</span>
              <span>OPEN FLIGHT MISSION CONSOLE</span>
            </button>
          </div>

          {/* Footer with Logout */}
          <div className="p-6 bg-[#122131] border-t border-[#1c2b3c] flex items-center justify-between">
            <span className="font-['JetBrains_Mono'] text-xs text-[#94a3b8]">
              NODE: US-EAST-GOV
            </span>
            <button
              onClick={() => {
                playSound('click');
                onLogout();
                onClose();
              }}
              className="px-4 py-1.5 rounded-lg bg-[#ffb4ab]/10 hover:bg-[#ffb4ab]/20 text-[#ffb4ab] border border-[#ffb4ab]/30 text-xs font-['JetBrains_Mono'] font-bold uppercase transition-colors cursor-pointer"
            >
              DISCONNECT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
