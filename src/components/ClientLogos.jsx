import React from 'react';

export default function ClientLogos() {
  const clients = [
    { name: 'Aether Dynamics', icon: 'satellite_alt', color: 'hover:text-[#7bd0ff]' },
    { name: 'Nova Aerospace', icon: 'public', color: 'hover:text-[#ddb7ff]' },
    { name: 'OrbitalX', icon: 'near_me', color: 'hover:text-[#7bd0ff]' },
    { name: 'Starlight SatCom', icon: 'hub', color: 'hover:text-[#fbabff]' },
    { name: 'Vanguard Space', icon: 'token', color: 'hover:text-[#ddb7ff]' },
    { name: 'Hyperion Propulsion', icon: 'bolt', color: 'hover:text-[#7bd0ff]' },
  ];

  return (
    <section className="w-full py-12 bg-[#010f1f]/60 border-y border-[#1c2b3c]/50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 flex flex-col items-center">
        <span className="font-['JetBrains_Mono'] text-[11px] text-[#94a3b8] uppercase tracking-widest text-center mb-6">
          Trusted by leading orbital launch providers, space agencies &amp; satellite operators
        </span>
        <div className="w-full flex flex-wrap items-center justify-center gap-8 md:gap-12 text-[#94a3b8]">
          {clients.map((client) => (
            <div
              key={client.name}
              className={`flex items-center gap-2 ${client.color} transition-all duration-300 cursor-default hover:scale-105`}
            >
              <span className="material-symbols-outlined text-[24px]">{client.icon}</span>
              <span className="font-['Space_Grotesk'] text-lg md:text-xl font-semibold tracking-tight">
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
