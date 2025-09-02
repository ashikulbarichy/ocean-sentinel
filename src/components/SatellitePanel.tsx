import React from 'react';
import { Satellite, Globe, Radar, Database, Clock, TrendingUp, Zap } from 'lucide-react';
import { SatelliteData, PlasticHotspot } from '../types';

interface SatellitePanelProps {
  satelliteData: SatelliteData;
  plasticHotspots: PlasticHotspot[];
  isScanning: boolean;
  isLoadingHotspots?: boolean;
}

const SatellitePanel: React.FC<SatellitePanelProps> = ({ 
  satelliteData, 
  plasticHotspots, 
  isScanning,
  isLoadingHotspots = false 
}) => {
  const lastScan = new Date();
  const nextScan = new Date(Date.now() + 3 * 60 * 60 * 1000); // 3 hours from now

  const dataQuality = 94.7;
  const signalStrength = 87;

  return (
    <div className="p-6 space-y-6 satellite-bg min-h-full overflow-y-auto">
      {/* Floating Satellites */}
      <div className="floating-satellite" style={{top: '15%', left: '10%'}}>🛰️</div>
      <div className="floating-satellite" style={{top: '40%', right: '15%'}}>📡</div>
      <div className="floating-satellite" style={{top: '70%', left: '20%'}}>🌌</div>
      
      {/* Floating Data Elements */}
      <div className="floating-data-element" style={{top: '20%', right: '25%'}}>
        DATA_STREAM_001: ACTIVE
      </div>
      <div className="floating-data-element" style={{top: '60%', left: '15%'}}>
        CYGNSS_SIGNAL: 94.7%
      </div>
      <div className="floating-data-element" style={{bottom: '30%', right: '20%'}}>
        ORBITAL_PASS: 127.3°
      </div>
      
      {/* Header */}
      <div className={`bg-gradient-to-r from-black to-gray-900 rounded-xl p-6 text-white border-2 border-green-400 shadow-2xl shadow-green-500/30 chart-glow ${
        isScanning || isLoadingHotspots ? 'ring-2 ring-green-400 ring-opacity-50' : ''
      }`}>
        <div className="flex items-center space-x-3 mb-4">
          <Satellite className={`h-8 w-8 ${
            isScanning || isLoadingHotspots ? 'animate-pulse text-green-300' : 'text-green-400'
          }`} />
          <div>
            <h2 className="text-2xl font-bold terminal-text">🛰️ Live NASA Satellite Data</h2>
            <div className="flex items-center space-x-2">
              <p className="text-green-300 terminal-text">
                {isLoadingHotspots ? 'Loading NASA CYGNSS data...' : 'Real-time ocean plastic monitoring'}
              </p>
              {(isScanning || isLoadingHotspots) && (
                <div className="flex items-center space-x-1 text-green-300 text-sm status-indicator">
                  <Zap className="h-4 w-4 animate-bounce" />
                  <span className="terminal-text font-bold">{isLoadingHotspots ? '⟨ LOADING ⟩' : '⟨ SCANNING ⟩'}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-black bg-opacity-70 rounded-lg p-4 border border-green-400 chart-glow">
            <div className="flex items-center space-x-2 mb-2">
              <Globe className="h-5 w-5 text-green-400" />
              <span className="text-sm font-medium terminal-text">Ocean Coverage</span>
            </div>
            <div className="text-2xl font-bold terminal-text">{satelliteData.coverage.toFixed(1)}%</div>
            <div className="text-sm text-green-300 terminal-text">🌍 Scanned today</div>
          </div>
          
          <div className="bg-black bg-opacity-70 rounded-lg p-4 border border-blue-400 chart-glow">
            <div className="flex items-center space-x-2 mb-2">
              <Radar className="h-5 w-5 text-blue-400" />
              <span className="text-sm font-medium terminal-text">Plastic Hotspots</span>
            </div>
            <div className="text-2xl font-bold terminal-text">{satelliteData.hotspotsDetected}</div>
            <div className="text-sm text-blue-300 terminal-text">
              {isScanning || isLoadingHotspots ? 'Detecting...' : 'Total detected'}
            </div>
          </div>
          
          <div className="bg-black bg-opacity-70 rounded-lg p-4 border border-purple-400 chart-glow">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="h-5 w-5 text-purple-400" />
              <span className="text-sm font-medium terminal-text">Avg Concentration</span>
            </div>
            <div className="text-2xl font-bold terminal-text">{Math.round(satelliteData.avgConcentration / 1000 * 10) / 10}k</div>
            <div className="text-sm text-purple-300 terminal-text">📊 particles/km²</div>
          </div>
        </div>
      </div>

      {/* Data Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-black bg-opacity-90 rounded-xl shadow-lg p-6 border border-green-400 chart-glow">
          <h3 className="text-xl font-bold text-green-300 mb-4 flex items-center space-x-2 terminal-text">
            <Database className="h-5 w-5 text-green-400" />
            <span>🛰️ Active Data Sources</span>
          </h3>
          
          <div className="space-y-4">
            <div className="border-l-4 border-green-500 pl-4 bg-green-900 bg-opacity-20 p-3 rounded">
              <h4 className="font-semibold text-green-300 terminal-text">🛰️ NASA CYGNSS Real-Time</h4>
              <p className="text-sm text-green-200 mb-2 terminal-text">Live Satellite GNSS-Reflectometry Plastic Detection</p>
              <div className="flex justify-between text-sm">
                <span className="terminal-text">Data Status:</span>
                <span className={`font-semibold terminal-text ${
                  isLoadingHotspots ? 'text-yellow-600' : plasticHotspots.length > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {isLoadingHotspots ? 'Connecting...' : plasticHotspots.length > 0 ? 'Real-Time Active' : 'Connection Failed'}
                </span>
              </div>
            </div>
            
            <div className="border-l-4 border-blue-500 pl-4 bg-blue-900 bg-opacity-20 p-3 rounded">
              <h4 className="font-semibold text-blue-300 terminal-text">📡 NASA MODIS Real-Time</h4>
              <p className="text-sm text-blue-200 mb-2 terminal-text">Live Ocean Color & Surface Temperature Satellite</p>
              <div className="flex justify-between text-sm">
                <span className="terminal-text">Coverage:</span>
                <span className={`font-semibold terminal-text ${satelliteData.coverage > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {satelliteData.coverage > 0 ? `${satelliteData.coverage.toFixed(1)}%` : 'No Data'}
                </span>
              </div>
            </div>
            
            <div className="border-l-4 border-purple-500 pl-4 bg-purple-900 bg-opacity-20 p-3 rounded">
              <h4 className="font-semibold text-purple-300 terminal-text">🌊 NOAA Buoy Network</h4>
              <p className="text-sm text-purple-200 mb-2 terminal-text">Live Weather & Ocean Conditions</p>
              <div className="flex justify-between text-sm">
                <span className="terminal-text">Update Frequency:</span>
                <span className="font-semibold text-purple-600 terminal-text">⏱️ 10 minutes</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scan Schedule */}
        <div className="bg-black bg-opacity-90 rounded-xl shadow-lg p-6 border border-blue-400 chart-glow">
          <h3 className="text-xl font-bold text-blue-300 mb-4 flex items-center space-x-2 terminal-text">
            <Clock className="h-5 w-5 text-blue-400" />
            <span>⏰ Scanning Schedule</span>
          </h3>
          
          <div className="space-y-4">
            <div className="bg-green-900 bg-opacity-30 border border-green-400 rounded-lg p-4 chart-glow">
              <div className="flex items-center space-x-2 mb-2">
                <div className={`w-2 h-2 rounded-full ${
                  isScanning ? 'bg-yellow-500 animate-ping' : 'bg-green-500 animate-pulse'
                }`}></div>
                <span className="font-semibold text-green-300 terminal-text">✅ Last Scan Completed</span>
              </div>
              <p className="text-sm text-green-200 terminal-text">{satelliteData.timestamp.toLocaleString()}</p>
              <p className="text-xs text-green-400 mt-1 terminal-text">
                {isScanning || isLoadingHotspots ? 'Processing NASA data...' : `${satelliteData.hotspotsDetected} hotspots detected`}
              </p>
            </div>
            
            <div className="bg-blue-900 bg-opacity-30 border border-blue-400 rounded-lg p-4 chart-glow">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="font-semibold text-blue-300 terminal-text">⏳ Next Scan Scheduled</span>
              </div>
              <p className="text-sm text-blue-200 terminal-text">{nextScan.toLocaleString()}</p>
              <p className="text-xs text-blue-400 mt-1 terminal-text">🌊 High-resolution pass over Pacific</p>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-green-400">
            <h4 className="font-semibold text-green-300 mb-3 terminal-text">⚙️ Processing Status</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="terminal-text">Raw Data Processing:</span>
                <span className={`font-semibold terminal-text ${
                  isLoadingHotspots ? 'text-yellow-600' : 'text-green-600'
                }`}>
                  {isLoadingHotspots ? 'Processing' : 'Complete'}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="terminal-text">AI Classification:</span>
                <span className={`font-semibold terminal-text ${
                  isLoadingHotspots ? 'text-yellow-600' : 'text-green-600'
                }`}>
                  {isLoadingHotspots ? 'Processing' : 'Complete'}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="terminal-text">Route Optimization:</span>
                <span className={`font-semibold terminal-text ${
                  isScanning || isLoadingHotspots ? 'text-yellow-600' : 'text-green-600'
                }`}>
                  {isScanning || isLoadingHotspots ? 'Processing' : 'Complete'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Detections */}
      <div className="bg-black bg-opacity-90 rounded-xl shadow-lg p-6 border border-green-400 chart-glow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-green-300 terminal-text">🎯 Live NASA Detections</h3>
          <div className="flex items-center space-x-2 text-sm text-green-400">
            <div className={`w-2 h-2 rounded-full ${
              isLoadingHotspots ? 'bg-yellow-500 animate-pulse' : 'bg-green-500 animate-pulse'
            }`}></div>
            <span className="terminal-text">{isLoadingHotspots ? '⟨ Loading... ⟩' : '⟨ Live Feed ⟩'}</span>
          </div>
        </div>
        
        {isLoadingHotspots ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400"></div>
            <span className="ml-3 text-green-400 terminal-text">🛰️ Processing NASA satellite data...</span>
          </div>
        ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-green-400">
                <th className="text-left py-3 px-2 text-green-300 terminal-text">TARGET ID</th>
                <th className="text-left py-3 px-2 text-green-300 terminal-text">COORDINATES</th>
                <th className="text-left py-3 px-2 text-green-300 terminal-text">CONCENTRATION</th>
                <th className="text-left py-3 px-2 text-green-300 terminal-text">THREAT LEVEL</th>
                <th className="text-left py-3 px-2 text-green-300 terminal-text">AREA</th>
                <th className="text-left py-3 px-2 text-green-300 terminal-text">CONFIDENCE</th>
                <th className="text-left py-3 px-2 text-green-300 terminal-text">DETECTION TIME</th>
              </tr>
            </thead>
            <tbody>
              {plasticHotspots && plasticHotspots.length > 0 ? plasticHotspots.slice(0, 6).map((hotspot) => (
                <tr key={hotspot.id} className="border-b border-green-800 hover:bg-green-900 hover:bg-opacity-20">
                  <td className="py-3 px-2 font-mono text-xs text-green-400 terminal-text">{hotspot.id.toUpperCase()}</td>
                  <td className="py-3 px-2 text-green-200 terminal-text">
                    {hotspot.lat.toFixed(2)}°, {hotspot.lng.toFixed(2)}°
                  </td>
                  <td className="py-3 px-2 text-yellow-300 terminal-text">{(hotspot.concentration / 1000).toFixed(1)}k</td>
                  <td className="py-3 px-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium terminal-text ${
                      hotspot.severity === 'critical' ? 'bg-red-100 text-red-800' :
                      hotspot.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                      hotspot.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {hotspot.severity}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-blue-300 terminal-text">{hotspot.area} km²</td>
                  <td className="py-3 px-2">
                    <span className="font-bold text-green-400 terminal-text">
                      {hotspot.nasaMetadata?.confidence || 95}%
                    </span>
                  </td>
                  <td className="py-3 px-2 text-gray-300 terminal-text">
                    {hotspot.detectedAt.toLocaleDateString()}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-green-500 terminal-text">
                    No NASA satellite data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        )}
      </div>
    </div>
  );
};

export default SatellitePanel;