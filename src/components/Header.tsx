import React, { useState, useEffect, useRef, memo } from 'react';
import { Recycle, Satellite, Activity, Target, Wifi, Waves, Menu, X, ChevronDown } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isLive?: boolean;
  lastUpdate?: Date;
}

const Header: React.FC<HeaderProps> = memo(({ activeTab, onTabChange, isLive = true, lastUpdate }) => {
  const tabs = [
    { id: 'map', label: 'Ocean Map', icon: Waves },
    { id: 'satellites', label: 'Satellite Data', icon: Satellite },
    { id: 'missions', label: 'Active Missions', icon: Target },
    { id: 'analytics', label: 'Analytics', icon: Activity },
    { id: 'advanced', label: '🏆 NASA GRADE', icon: Activity }
  ];

  return (
    <header className="mission-control-header text-white shadow-2xl relative z-10">
      {/* Floating Satellites */}
      <div className="floating-satellite" style={{top: '10%', left: '5%'}}>🛰️</div>
      <div className="floating-satellite" style={{top: '60%', right: '10%'}}>🚀</div>
      <div className="floating-satellite" style={{top: '30%', left: '50%'}}>🌍</div>
      
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-12 sm:h-16 relative z-20">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="bg-gradient-to-br from-green-400 to-blue-400 p-1 sm:p-2 rounded-lg animate-float border-2 border-green-300 shadow-lg shadow-green-500/50">
              <Recycle className="h-6 w-6 sm:h-8 sm:w-8 text-black animate-pulse" />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-green-300 to-blue-300 bg-clip-text text-transparent terminal-text truncate">
                <span className="hidden sm:inline">🤖 AI Ocean Plastic Cleanup</span>
                <span className="sm:hidden">🤖 Ocean Cleanup</span>
              </h1>
              <p className="text-xs sm:text-sm text-green-300 terminal-text truncate">
                <span className="hidden sm:inline">🛰️ NASA Satellite AI • Autonomous Plastic Removal System</span>
                <span className="sm:hidden">🛰️ NASA AI System</span>
              </p>
            </div>
          </div>
          
          {/* Live Status Indicator */}
          <div className="hidden sm:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm bg-black bg-opacity-50 px-3 py-1 rounded-lg border border-green-400">
              <div className={`flex items-center space-x-1 ${isLive ? 'text-green-300' : 'text-red-300'} status-indicator`}>
                <Wifi className={`h-4 w-4 ${isLive ? 'animate-pulse' : ''} drop-shadow-lg`} />
                <span className="terminal-text font-bold">{isLive ? 'MISSION ACTIVE' : 'OFFLINE'}</span>
              </div>
              {lastUpdate && (
                <span className="text-green-300 text-xs terminal-text">
                  🔄 {lastUpdate.toLocaleTimeString()}
                </span>
              )}
            </div>
          </div>
          
          <nav className="flex space-x-0 sm:space-x-1 relative z-30">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex items-center justify-center space-x-1 sm:space-x-2 px-1 sm:px-4 py-1 sm:py-2 rounded-lg font-medium transition-all duration-200 border touch-manipulation ${
                    activeTab === tab.id
                      ? 'bg-green-500 bg-opacity-20 text-green-300 shadow-lg transform scale-105 border-green-400 shadow-green-500/50'
                      : 'text-green-200 hover:bg-green-600 hover:bg-opacity-20 hover:text-green-300 border-green-600 hover:border-green-400'
                  }`}
                >
                  <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${activeTab === tab.id ? 'animate-pulse' : ''}`} />
                  <span className="hidden md:block terminal-text text-xs sm:text-sm">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
});

export default Header;