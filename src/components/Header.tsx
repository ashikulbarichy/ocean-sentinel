import React, { useState, useEffect, useRef, memo } from 'react';
import { Recycle, Satellite, Activity, Target, Wifi, Waves, Menu, X, ChevronDown, Globe, Zap, Shield, HelpCircle } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isLive?: boolean;
  lastUpdate?: Date;
  onShowHelp?: () => void;
}

const Header: React.FC<HeaderProps> = memo(({ activeTab, onTabChange, isLive = true, lastUpdate, onShowHelp }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [missionStats, setMissionStats] = useState({
    plasticRemoved: 5010,
    activeVessels: 4,
    satellitesOnline: 15,
    aiAccuracy: 96.8
  });

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate real-time stats updates
  useEffect(() => {
    const statsTimer = setInterval(() => {
      setMissionStats(prev => ({
        ...prev,
        plasticRemoved: prev.plasticRemoved + Math.floor(Math.random() * 5),
        aiAccuracy: 96.8 + (Math.random() - 0.5) * 0.4
      }));
    }, 30000); // Update every 30 seconds
    return () => clearInterval(statsTimer);
  }, []);

  const tabs = [
    { id: 'map', label: 'Ocean Map', icon: Waves, description: 'Real-time mission tracking' },
    { id: 'satellites', label: 'Satellite Data', icon: Satellite, description: 'NASA live feeds' },
    { id: 'missions', label: 'Active Missions', icon: Target, description: 'Fleet management' },
    { id: 'analytics', label: 'Analytics', icon: Activity, description: 'Performance metrics' },
    { id: 'about', label: '📖 About', icon: Globe, description: 'Project information' },
    { id: 'advanced', label: '🏆 NASA GRADE', icon: Shield, description: 'Advanced systems' }
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
          
          {/* Enhanced Live Status with Mission Stats */}
          <div className="hidden sm:flex items-center space-x-4">
            {/* Mission Stats Ticker */}
            <div className="flex items-center space-x-6 text-xs bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-green-400/50">
              <div className="flex items-center space-x-1">
                <Recycle className="h-3 w-3 text-green-400" />
                <span className="text-green-300 font-mono">{missionStats.plasticRemoved.toLocaleString()}kg</span>
              </div>
              <div className="flex items-center space-x-1">
                <Target className="h-3 w-3 text-blue-400" />
                <span className="text-blue-300 font-mono">{missionStats.activeVessels} vessels</span>
              </div>
              <div className="flex items-center space-x-1">
                <Satellite className="h-3 w-3 text-purple-400" />
                <span className="text-purple-300 font-mono">{missionStats.satellitesOnline} sats</span>
              </div>
              <div className="flex items-center space-x-1">
                <Zap className="h-3 w-3 text-yellow-400" />
                <span className="text-yellow-300 font-mono">{missionStats.aiAccuracy.toFixed(1)}%</span>
              </div>
            </div>
            
            {/* Live Status */}
            <div className="flex items-center space-x-2 text-sm bg-black/50 backdrop-blur-sm px-3 py-2 rounded-lg border border-green-400/50">
              <div className={`flex items-center space-x-1 ${isLive ? 'text-green-300' : 'text-red-300'} status-indicator`}>
                <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
                <span className="terminal-text font-bold">{isLive ? 'MISSION ACTIVE' : 'OFFLINE'}</span>
              </div>
              {lastUpdate && (
                <span className="text-green-300 text-xs terminal-text">
                  🔄 {lastUpdate.toLocaleTimeString()}
                </span>
              )}
            </div>
          </div>

          {/* Help Button */}
          {onShowHelp && (
            <button
              onClick={onShowHelp}
              className="p-2 rounded-full bg-blue-500/20 hover:bg-blue-500/40 text-blue-300 hover:text-white transition-colors border border-blue-500/30 hover:border-blue-400"
              title="Show Tutorial"
            >
              <HelpCircle size={20} />
            </button>
          )}
          
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