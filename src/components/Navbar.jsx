import React, { useState } from 'react';
import { playSound } from '../utils/audio';

export default function Navbar({ onOpenConsole, operator }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('platform');

  const navItems = [
    { id: 'platform', label: 'Platform', href: '#features' },
    { id: 'constellations', label: 'Constellations', href: '#constellations' },
    { id: 'ground', label: 'Ground Network', href: '#ground-network' },
    { id: 'telemetry', label: 'Telemetry SDK', href: '#tech' },
    { id: 'pricing', label: 'Pricing', href: '#pricing' },
    { id: 'specs', label: 'Specs & FAQ', href: '#security-faq' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#010f1f]/85 backdrop-blur-xl border-b border-[#1c2b3c]/60 shadow-[0_1px_16px_rgba(0,0,0,0.4)]">
      <div className="h-20 w-full px-4 md:px-8 lg:px-12 flex items-center justify-between gap-4">
        {/* Brand Logo & Version Pill */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-[#842bd2] via-[#a855f7] to-[#7bd0ff] p-[1.5px] shadow-[0_0_16px_rgba(168,85,247,0.4)]">
              <div className="w-full h-full bg-[#051424] rounded-[7px] flex items-center justify-center">
                <span className="material-symbols-outlined text-transparent bg-clip-text bg-gradient-to-r from-[#ddb7ff] to-[#7bd0ff] text-[22px]">
                  rocket_launch
                </span>
              </div>
            </div>
            <span className="font-['Space_Grotesk'] text-xl font-bold tracking-tight text-white group-hover:text-[#ddb7ff] transition-colors">
              LaunchPad
            </span>
          </a>

          <div className="hidden xl:inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#1c2b3c]/80 border border-[#273647] text-[#7bd0ff] font-['JetBrains_Mono'] text-[11px] tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7bd0ff] animate-pulse"></span>
            ORBIT-v4.2
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={() => {
                playSound('click');
                setActiveTab(item.id);
              }}
              className={`text-sm font-semibold transition-all duration-200 relative py-1 ${
                activeTab === item.id
                  ? 'text-[#ddb7ff] font-medium'
                  : 'text-[#94a3b8] hover:text-[#d4e4fa]'
              }`}
            >
              {item.label}
              {activeTab === item.id && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#a855f7] to-[#7bd0ff] rounded-full"></span>
              )}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {operator ? (
            <button
              onClick={() => {
                playSound('click');
                onOpenConsole?.('profile');
              }}
              className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1c2b3c] border border-[#a855f7]/40 text-[#ddb7ff] font-['JetBrains_Mono'] text-xs font-semibold hover:border-[#a855f7] transition-all cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#7bd0ff] animate-ping"></span>
              <span>{operator.callsign}</span>
            </button>
          ) : (
            <button
              onClick={() => {
                playSound('click');
                onOpenConsole?.('signin');
              }}
              className="hidden sm:inline-flex font-['Plus_Jakarta_Sans'] text-sm font-medium text-[#94a3b8] hover:text-white px-3 py-2 transition-colors cursor-pointer"
            >
              Sign In
            </button>
          )}

          <button
            onClick={() => {
              playSound('beep');
              onOpenConsole?.('live-console');
            }}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-[#b76dff] to-[#842bd2] text-white text-sm font-semibold tracking-wide shadow-[0_0_20px_-2px_rgba(168,85,247,0.5),0_0_1px_1px_rgba(192,132,252,0.6)] hover:brightness-110 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">terminal</span>
            <span>Launch Console</span>
          </button>

          <button
            onClick={() => {
              playSound('click');
              onOpenConsole?.('profile');
            }}
            className="w-9 h-9 rounded-full bg-[#1c2b3c] border border-[#273647] hover:border-[#a855f7] flex items-center justify-center transition-all cursor-pointer"
            title="User Profile"
          >
            <span className="material-symbols-outlined text-[#ddb7ff] text-[18px]">person</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => {
              playSound('click');
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="lg:hidden p-2 text-[#94a3b8] hover:text-white rounded-lg hover:bg-[#1c2b3c] transition-colors"
            aria-label="Toggle Navigation"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#051424] border-b border-[#1c2b3c] px-6 py-4 flex flex-col gap-3 animate-fadeIn">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`py-2 text-base font-medium transition-colors ${
                activeTab === item.id ? 'text-[#ddb7ff]' : 'text-[#94a3b8]'
              }`}
            >
              {item.label}
            </a>
          ))}
          <div className="pt-3 border-t border-[#1c2b3c] flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsole?.(operator ? 'profile' : 'signin');
              }}
              className="w-full text-left py-2 text-sm text-[#94a3b8] hover:text-white"
            >
              {operator ? `Profile (${operator.callsign})` : 'Sign In'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
