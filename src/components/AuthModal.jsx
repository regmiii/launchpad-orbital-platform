import React, { useState } from 'react';
import { playSound } from '../utils/audio';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [authMethod, setAuthMethod] = useState('passkey');
  const [operatorId, setOperatorId] = useState('OP-77402-ALPHA');
  const [passcode, setPasscode] = useState('••••••••••••');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  if (!isOpen) return null;

  const handleAuthenticate = (e) => {
    e.preventDefault();
    setIsAuthenticating(true);
    playSound('telemetry');

    setTimeout(() => {
      playSound('beep');
      setIsAuthenticating(false);
      onLoginSuccess({
        id: operatorId,
        name: 'Cmdr. Elena Rostova',
        callsign: 'ALPHA-LEAD',
        role: 'Orbital Flight Director',
        clearance: 'LEVEL 4 - TOP SECRET // SAP-COSMIC',
        activeMissions: 5,
        apiKey: 'lp_live_sec_99a84f0289bc441',
      });
      onClose();
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#010f1f]/85 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-md rounded-2xl bg-[#0d1c2d] border border-[#a855f7]/60 shadow-[0_0_50px_rgba(168,85,247,0.3)] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 bg-[#122131] border-b border-[#1c2b3c] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#b76dff]/20 flex items-center justify-center text-[#ddb7ff]">
              <span className="material-symbols-outlined text-[22px]">shield</span>
            </div>
            <div>
              <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white">
                Flight Deck Authentication
              </h3>
              <span className="font-['JetBrains_Mono'] text-xs text-[#7bd0ff]">
                ITAR RESTRICTED CONSOLE // 2FA REQUIRED
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

        {/* Body */}
        <div className="p-6 flex flex-col gap-6">
          {/* Auth Method Selector */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'passkey', label: 'Passkey', icon: 'fingerprint' },
              { id: 'cac', label: 'CAC / PIV', icon: 'badge' },
              { id: 'sso', label: 'Gov SSO', icon: 'key' },
            ].map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => {
                  playSound('click');
                  setAuthMethod(m.id);
                }}
                className={`py-2 px-1 rounded-lg border text-center flex flex-col items-center gap-1 transition-all cursor-pointer ${
                  authMethod === m.id
                    ? 'bg-[#1c2b3c] border-[#a855f7] text-white shadow-[0_0_12px_rgba(168,85,247,0.3)]'
                    : 'bg-[#051424] border-[#1c2b3c] text-[#94a3b8] hover:text-white'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{m.icon}</span>
                <span className="text-[11px] font-['JetBrains_Mono']">{m.label}</span>
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleAuthenticate} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-['JetBrains_Mono'] text-[#94a3b8] uppercase mb-1">
                Flight Operator ID
              </label>
              <input
                type="text"
                value={operatorId}
                onChange={(e) => setOperatorId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#051424] border border-[#1c2b3c] font-['JetBrains_Mono'] text-xs text-white focus:outline-none focus:border-[#a855f7]"
                placeholder="OP-XXXXX-CALLSIGN"
              />
            </div>

            <div>
              <label className="block text-xs font-['JetBrains_Mono'] text-[#94a3b8] uppercase mb-1">
                Cryptographic Token / PIN
              </label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#051424] border border-[#1c2b3c] font-['JetBrains_Mono'] text-xs text-white focus:outline-none focus:border-[#a855f7]"
                placeholder="••••••••••••"
              />
            </div>

            <div className="p-3 rounded-lg bg-[#051424] border border-[#1c2b3c] flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#7bd0ff] text-[18px]">verified</span>
              <span className="text-[11px] font-['Plus_Jakarta_Sans'] text-[#94a3b8]">
                Post-Quantum Kyber-1024 cryptographic handshake verified.
              </span>
            </div>

            <button
              type="submit"
              disabled={isAuthenticating}
              className="mt-2 w-full py-3 rounded-lg bg-gradient-to-r from-[#b76dff] to-[#842bd2] text-white text-sm font-semibold tracking-wide shadow-[0_0_20px_rgba(183,109,255,0.4)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[18px]">
                {isAuthenticating ? 'sync' : 'lock_open'}
              </span>
              <span>{isAuthenticating ? 'VERIFYING CREDENTIALS...' : 'AUTHENTICATE FLIGHT DECK'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
