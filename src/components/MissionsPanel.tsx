import React, { useState } from 'react';
import { Target, Play, Pause, RotateCcw, Plus, Ship, Zap, Activity } from 'lucide-react';
import { Mission, Vessel } from '../types';

interface MissionsPanelProps {
  missions: Mission[];
  vessels: Vessel[];
}

const MissionsPanel: React.FC<MissionsPanelProps> = ({ missions, vessels }) => {
  const [selectedMission, setSelectedMission] = useState<string | null>(null);

  const getMissionVessels = (missionVessels: string[]): Vessel[] => {
    return vessels.filter(vessel => missionVessels.includes(vessel.id));
  };

  const getMissionProgress = (mission: Mission): number => {
    return Math.round((mission.plasticCollected / mission.plasticTarget) * 100);
  };

  const getStatusColor = (status: Mission['status']) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'planning': return 'text-blue-600 bg-blue-100';
      case 'completed': return 'text-gray-600 bg-gray-100';
      case 'paused': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: Mission['status']) => {
    switch (status) {
      case 'active': return <Play className="h-4 w-4" />;
      case 'planning': return <Target className="h-4 w-4" />;
      case 'completed': return <Target className="h-4 w-4" />;
      case 'paused': return <Pause className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6 missions-bg h-full overflow-y-auto">
      {/* Fleet Formation */}
      <div className="fleet-formation">
        <span style={{fontSize: '24px', marginRight: '20px'}}>🚢</span>
        <span style={{fontSize: '20px', marginRight: '15px'}}>⛵</span>
        <span style={{fontSize: '18px'}}>🛥️</span>
      </div>
      
      {/* Floating Data Elements */}
      <div className="floating-data-element" style={{top: '25%', right: '20%'}}>
        MISSION_STATUS: ACTIVE
      </div>
      <div className="floating-data-element" style={{top: '55%', left: '10%'}}>
        FLEET_COUNT: {vessels.filter(v => v.status === 'active').length}
      </div>
      <div className="floating-data-element" style={{bottom: '35%', right: '15%'}}>
        CLEANUP_RATE: +{Math.floor(Math.random() * 50 + 20)}kg/hr
      </div>
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-green-300 terminal-text">🎯 Mission Control Center</h2>
          <p className="text-green-400 terminal-text">🚢 Manage active cleanup operations</p>
        </div>
        <button className="bg-green-600 bg-opacity-80 hover:bg-green-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors border border-green-400 shadow-lg shadow-green-500/30">
          <Plus className="h-5 w-5" />
          <span className="terminal-text">⚡ New Mission</span>
        </button>
      </div>

      {/* Mission Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-900 to-green-700 rounded-xl p-6 text-white border-2 border-green-400 chart-glow">
          <div className="flex items-center space-x-3 mb-4">
            <Activity className="h-8 w-8 text-green-300 animate-pulse" />
            <div>
              <h3 className="text-lg font-semibold terminal-text">Active Missions</h3>
              <p className="text-green-200 text-sm terminal-text">⚡ Currently running</p>
            </div>
          </div>
          <div className="text-3xl font-bold terminal-text status-indicator">{missions.filter(m => m.status === 'active').length}</div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-900 to-blue-700 rounded-xl p-6 text-white border-2 border-blue-400 chart-glow">
          <div className="flex items-center space-x-3 mb-4">
            <Ship className="h-8 w-8 text-blue-300 animate-pulse" />
            <div>
              <h3 className="text-lg font-semibold terminal-text">Deployed Vessels</h3>
              <p className="text-blue-200 text-sm terminal-text">🚢 In operation</p>
            </div>
          </div>
          <div className="text-3xl font-bold terminal-text status-indicator">{vessels.filter(v => v.status === 'active').length}</div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-900 to-purple-700 rounded-xl p-6 text-white border-2 border-purple-400 chart-glow">
          <div className="flex items-center space-x-3 mb-4">
            <Target className="h-8 w-8 text-purple-300 animate-pulse" />
            <div>
              <h3 className="text-lg font-semibold terminal-text">Total Plastic Collected</h3>
              <p className="text-purple-200 text-sm terminal-text">🎯 All missions</p>
            </div>
          </div>
          <div className="text-3xl font-bold terminal-text status-indicator">
            {missions.reduce((total, mission) => total + mission.plasticCollected, 0).toLocaleString()} kg
          </div>
        </div>
      </div>

      {/* Mission List */}
      <div className="bg-black bg-opacity-90 rounded-xl shadow-lg overflow-hidden border border-green-400 chart-glow">
        <div className="px-6 py-4 border-b border-green-400">
          <h3 className="text-xl font-bold text-green-300 terminal-text">🚀 Active Missions</h3>
        </div>
        
        <div className="divide-y divide-green-800">
          {missions.map((mission) => (
            <div 
              key={mission.id} 
              className={`p-6 hover:bg-green-900 hover:bg-opacity-20 cursor-pointer transition-colors ${
                selectedMission === mission.id ? 'bg-green-900 bg-opacity-30' : ''
              }`}
              onClick={() => setSelectedMission(
                selectedMission === mission.id ? null : mission.id
              )}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${getStatusColor(mission.status)}`}>
                    {getStatusIcon(mission.status)}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-green-300 terminal-text">{mission.name}</h4>
                    <p className="text-sm text-green-400 terminal-text">
                      🚢 {getMissionVessels(mission.vessels).length} vessels • 🎯 {mission.targets.length} targets
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm text-green-400 terminal-text">Progress</div>
                  <div className="text-2xl font-bold text-green-300 terminal-text">{getMissionProgress(mission)}%</div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-green-400 mb-1 terminal-text">
                  <span>🗑️ Plastic Collected</span>
                  <span>{mission.plasticCollected.toLocaleString()} / {mission.plasticTarget.toLocaleString()} kg</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2 border border-green-600">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-300 shadow-lg shadow-green-500/50"
                    style={{ width: `${getMissionProgress(mission)}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Mission Details (Expandable) */}
              {selectedMission === mission.id && (
                <div className="border-t border-green-600 pt-4 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-semibold text-green-300 mb-3 terminal-text">🚢 Assigned Vessels</h5>
                      <div className="space-y-2">
                        {getMissionVessels(mission.vessels).map((vessel) => (
                          <div key={vessel.id} className="flex items-center justify-between bg-gray-900 bg-opacity-50 rounded-lg p-3 border border-green-600">
                            <div>
                              <div className="font-medium text-green-300 terminal-text">{vessel.name}</div>
                              <div className="text-sm text-green-400 terminal-text">{vessel.type}</div>
                            </div>
                            <div className="text-right">
                              <div className={`text-sm font-medium ${
                                vessel.status === 'active' ? 'text-green-600' :
                                vessel.status === 'idle' ? 'text-gray-600' : 'text-yellow-600'
                              } terminal-text`}>
                                {vessel.status}
                              </div>
                              <div className="text-xs text-green-500 terminal-text">🔋 {vessel.battery}%</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold text-green-300 mb-3 terminal-text">⏰ Mission Timeline</h5>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-green-400 terminal-text">Start Date:</span>
                          <span className="font-medium text-green-300 terminal-text">{mission.startDate.toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-green-400 terminal-text">Est. Completion:</span>
                          <span className="font-medium text-green-300 terminal-text">{mission.estimatedCompletion.toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-green-400 terminal-text">Efficiency:</span>
                          <span className="font-medium text-green-300 terminal-text">{mission.efficiency}%</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-green-600">
                        <div className="flex space-x-2">
                          <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors border border-green-400 terminal-text">
                            <Play className="h-4 w-4 inline mr-1" />
                            Resume
                          </button>
                          <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm transition-colors border border-yellow-400 terminal-text">
                            <Pause className="h-4 w-4 inline mr-1" />
                            Pause
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm transition-colors border border-gray-400 terminal-text">
                            <RotateCcw className="h-4 w-4 inline mr-1" />
                            Reset
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MissionsPanel;