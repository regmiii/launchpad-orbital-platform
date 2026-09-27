import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ClientLogos from './components/ClientLogos';
import ConstellationViewer from './components/ConstellationViewer';
import FeaturesGrid from './components/FeaturesGrid';
import GroundNetwork from './components/GroundNetwork';
import TechStack from './components/TechStack';
import PricingCalculator from './components/PricingCalculator';
import SecurityFAQ from './components/SecurityFAQ';
import Footer from './components/Footer';
import MissionControlConsole from './components/MissionControlConsole';
import FeatureModal from './components/FeatureModal';
import AuthModal from './components/AuthModal';
import OperatorDrawer from './components/OperatorDrawer';
import { playSound } from './utils/audio';

function App() {
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  const [consoleInitialTab, setConsoleInitialTab] = useState('telemetry');
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isOperatorDrawerOpen, setIsOperatorDrawerOpen] = useState(false);
  
  // Authenticated operator state
  const [operator, setOperator] = useState({
    id: 'OP-77402-ALPHA',
    name: 'Cmdr. Elena Rostova',
    callsign: 'ALPHA-LEAD',
    role: 'Orbital Flight Director',
    clearance: 'LEVEL 4 - TOP SECRET // SAP-COSMIC',
    activeMissions: 5,
    apiKey: 'lp_live_sec_99a84f0289bc441',
  });

  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4000);
  };

  const handleOpenConsole = (action = 'live-console') => {
    playSound('beep');
    if (action === 'signin') {
      setIsAuthModalOpen(true);
    } else if (action === 'profile') {
      setIsOperatorDrawerOpen(true);
    } else if (action === 'flight-sim') {
      setConsoleInitialTab('thruster');
      setIsConsoleOpen(true);
    } else if (action === 'telemetry-stream') {
      setConsoleInitialTab('telemetry');
      setIsConsoleOpen(true);
    } else {
      setConsoleInitialTab('telemetry');
      setIsConsoleOpen(true);
    }
  };

  const handleLoginSuccess = (operatorData) => {
    setOperator(operatorData);
    showToast(`✓ Authentication Verified: Welcome back, ${operatorData.callsign}.`);
  };

  const handleLogout = () => {
    setOperator(null);
    showToast('Flight session terminated. Operator disconnected.');
  };

  const handleDeployMission = (planId) => {
    playSound('beep');
    showToast(`Initializing Mission Configurator for ${planId.toUpperCase()} fleet deployment...`);
    setConsoleInitialTab('terminal');
    setIsConsoleOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#051424] text-[#d4e4fa] flex flex-col selection:bg-[#b76dff] selection:text-white">
      {/* Toast Alert Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-[#122131]/95 border border-[#a855f7] shadow-[0_0_24px_rgba(168,85,247,0.4)] text-white text-xs font-['JetBrains_Mono'] flex items-center gap-3 backdrop-blur-xl animate-fadeIn">
          <span className="material-symbols-outlined text-[#7bd0ff] text-[20px]">
            notifications_active
          </span>
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage('')}
            className="text-[#94a3b8] hover:text-white ml-2"
          >
            ×
          </button>
        </div>
      )}

      {/* Main Top Navbar */}
      <Navbar onOpenConsole={handleOpenConsole} operator={operator} />

      {/* Main Page Flow */}
      <main className="flex-1 w-full pt-20">
        {/* 1. Hero Section with Live Telemetry HUD & Epoch Clock */}
        <Hero onOpenConsole={handleOpenConsole} />

        {/* 2. Client Logos / Mission Partners Bar */}
        <ClientLogos />

        {/* 3. Real-Time Constellation Viewer & Satellite Inspector */}
        <ConstellationViewer onLaunchConsole={handleOpenConsole} />

        {/* 4. Full-Spectrum Capabilities Grid */}
        <FeaturesGrid onSelectFeature={(feature) => setSelectedFeature(feature)} />

        {/* 5. Worldwide Terrestrial Ground Station Network */}
        <GroundNetwork onLaunchConsole={handleOpenConsole} />

        {/* 6. Space-Grade Developer Stack & Live Code Terminal */}
        <TechStack />

        {/* 7. Transparent Mission Pricing & Interactive Cost Configurator */}
        <PricingCalculator onDeployMission={handleDeployMission} />

        {/* 8. Aerospace Security, Compliance & Technical FAQ */}
        <SecurityFAQ />
      </main>

      {/* Footer */}
      <Footer onOpenConsole={handleOpenConsole} />

      {/* Mission Control Flight Deck Console Modal */}
      <MissionControlConsole
        key={consoleInitialTab}
        isOpen={isConsoleOpen}
        onClose={() => setIsConsoleOpen(false)}
        initialTab={consoleInitialTab}
      />

      {/* Technical Feature Deep-Dive Modal */}
      <FeatureModal
        feature={selectedFeature}
        onClose={() => setSelectedFeature(null)}
        onLaunchConsole={handleOpenConsole}
      />

      {/* Operator Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Operator Profile & API Management Flyout Drawer */}
      <OperatorDrawer
        isOpen={isOperatorDrawerOpen}
        onClose={() => setIsOperatorDrawerOpen(false)}
        operator={operator}
        onLogout={handleLogout}
        onLaunchConsole={handleOpenConsole}
      />
    </div>
  );
}

export default App;
