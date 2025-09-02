import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, Activity, Target, Clock, Zap, Satellite } from 'lucide-react';
import { Mission, Vessel, SatelliteData } from '../types';

interface AnalyticsPanelProps {
  missions: Mission[];
  vessels: Vessel[];
  satelliteData: SatelliteData;
}

const AnalyticsPanel: React.FC<AnalyticsPanelProps> = ({ missions, vessels, satelliteData }) => {
  // Mock data for charts
  const plasticCollectionData = [
    { month: 'Jan', collected: 12500, target: 15000 },
    { month: 'Feb', collected: 18200, target: 18000 },
    { month: 'Mar', collected: 22100, target: 20000 },
    { month: 'Apr', collected: 19800, target: 22000 },
    { month: 'May', collected: 24500, target: 24000 },
    { month: 'Jun', collected: 28900, target: 26000 },
  ];

  const hotspotsOverTime = [
    { date: '2024-01-15', count: 18 },
    { date: '2024-01-16', count: 22 },
    { date: '2024-01-17', count: 19 },
    { date: '2024-01-18', count: 25 },
    { date: '2024-01-19', count: 21 },
    { date: '2024-01-20', count: 28 },
    { date: '2024-01-21', count: 23 },
  ];

  // Use real vessel data
  const vesselEfficiency = vessels.map(vessel => ({
    name: vessel.name,
    efficiency: vessel.status === 'active' ? Math.floor(vessel.battery * 0.9) : 0,
    collected: vessel.plasticCollected
  }));

  const regionData = [
    { name: 'Pacific', value: 45, color: '#0ea5e9' },
    { name: 'Atlantic', value: 28, color: '#14b8a6' },
    { name: 'Indian', value: 18, color: '#8b5cf6' },
    { name: 'Mediterranean', value: 9, color: '#f59e0b' },
  ];

  // Calculate real-time impact metrics
  const totalPlasticCollected = vessels.reduce((sum, vessel) => sum + vessel.plasticCollected, 0);
  const activeVessels = vessels.filter(v => v.status === 'active').length;
  const avgEfficiency = missions.reduce((sum, mission) => sum + mission.efficiency, 0) / missions.length;
  
  const impactData = [
    { 
      metric: 'Total Plastic Collected', 
      value: `${totalPlasticCollected.toLocaleString()} kg`, 
      change: '+' + Math.floor(Math.random() * 20 + 10) + '%', 
      trend: 'up' 
    },
    { 
      metric: 'Active Vessels', 
      value: activeVessels.toString(), 
      change: vessels.length > activeVessels ? '+' + (vessels.length - activeVessels) : '±0', 
      trend: 'up' 
    },
    { 
      metric: 'Mission Efficiency', 
      value: `${avgEfficiency.toFixed(1)}%`, 
      change: '+' + (Math.random() * 5).toFixed(1) + '%', 
      trend: 'up' 
    },
    { 
      metric: 'Satellite Coverage', 
      value: `${satelliteData.coverage.toFixed(1)}%`, 
      change: satelliteData.coverage > 90 ? '+5%' : '+2%', 
      trend: 'up' 
    },
  ];

  return (
    <div className="p-6 space-y-6 analytics-bg min-h-full overflow-y-auto">
      {/* Floating Data Elements */}
      <div className="floating-data-element" style={{top: '15%', right: '20%'}}>
        ANALYSIS_ACTIVE: TRUE
      </div>
      <div className="floating-data-element" style={{top: '45%', left: '10%'}}>
        DATA_POINTS: {plasticCollectionData.length * 1000}
      </div>
      <div className="floating-data-element" style={{bottom: '25%', right: '15%'}}>
        PROCESSING_RATE: 2.4GB/s
      </div>
      
      {/* Header */}
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-green-300 terminal-text">📊 Real-Time Analytics</h2>
            <p className="text-green-400 terminal-text">⚡ Live performance monitoring and insights</p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-green-400 bg-black bg-opacity-50 px-3 py-1 rounded-lg border border-green-400">
            <Satellite className="h-4 w-4 animate-pulse" />
            <span className="terminal-text">⟨ Live Data Feed ⟩</span>
          </div>
        </div>
      </div>

      {/* Impact Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {impactData.map((metric, index) => (
          <div key={index} className="bg-black bg-opacity-90 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-green-400 chart-glow">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-green-400 terminal-text">{metric.metric}</div>
              <div className={`flex items-center space-x-1 text-sm ${
                metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                <span className="terminal-text">{metric.change}</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-green-300 terminal-text status-indicator">{metric.value}</div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Plastic Collection Trends */}
        <div className="bg-black bg-opacity-90 rounded-xl shadow-lg p-6 chart-glow border border-green-400">
          <h3 className="text-xl font-bold text-green-300 mb-4 flex items-center space-x-2 terminal-text">
            <Target className="h-5 w-5 text-green-400" />
            <span>🎯 Plastic Collection vs Targets</span>
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={plasticCollectionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#22c55e" strokeOpacity={0.3} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value.toLocaleString()} kg`, '']} />
              <Bar dataKey="target" fill="#374151" name="Target" />
              <Bar dataKey="collected" fill="#22c55e" name="Collected" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Hotspot Detection Trends */}
        <div className="bg-black bg-opacity-90 rounded-xl shadow-lg p-6 chart-glow border border-blue-400">
          <h3 className="text-xl font-bold text-blue-300 mb-4 flex items-center space-x-2 terminal-text">
            <Activity className="h-5 w-5 text-blue-400" />
            <span>📡 Hotspot Detections</span>
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={hotspotsOverTime}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3b82f6" strokeOpacity={0.3} />
              <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString()} />
              <YAxis />
              <Tooltip labelFormatter={(value) => new Date(value).toLocaleDateString()} />
              <Area type="monotone" dataKey="count" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Vessel Efficiency */}
        <div className="bg-black bg-opacity-90 rounded-xl shadow-lg p-6 chart-glow border border-purple-400">
          <h3 className="text-xl font-bold text-purple-300 mb-4 flex items-center space-x-2 terminal-text">
            <Zap className="h-5 w-5 text-purple-400" />
            <span>⚡ Vessel Efficiency</span>
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={vesselEfficiency} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#a855f7" strokeOpacity={0.3} />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis dataKey="name" type="category" width={100} />
              <Tooltip formatter={(value) => [`${value}%`, 'Efficiency']} />
              <Bar dataKey="efficiency" fill="#a855f7" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Regional Distribution */}
        <div className="bg-black bg-opacity-90 rounded-xl shadow-lg p-6 chart-glow border border-yellow-400">
          <h3 className="text-xl font-bold text-yellow-300 mb-4 flex items-center space-x-2 terminal-text">
            <Clock className="h-5 w-5 text-yellow-400" />
            <span>🌍 Cleanup by Region</span>
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={regionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {regionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Analytics Table */}
      <div className="bg-black bg-opacity-90 rounded-xl shadow-lg overflow-hidden border border-green-400 chart-glow">
        <div className="px-6 py-4 border-b border-green-400">
          <h3 className="text-xl font-bold text-green-300 terminal-text">🚢 Vessel Performance Details</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-900 bg-opacity-50">
              <tr>
                <th className="text-left py-3 px-6 text-green-300 terminal-text">VESSEL</th>
                <th className="text-left py-3 px-6 text-green-300 terminal-text">TYPE</th>
                <th className="text-left py-3 px-6 text-green-300 terminal-text">EFFICIENCY</th>
                <th className="text-left py-3 px-6 text-green-300 terminal-text">COLLECTED</th>
                <th className="text-left py-3 px-6 text-green-300 terminal-text">HOURS</th>
                <th className="text-left py-3 px-6 text-green-300 terminal-text">FUEL</th>
                <th className="text-left py-3 px-6 text-green-300 terminal-text">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-green-800">
              {vesselEfficiency.map((vessel, index) => (
                <tr key={index} className="hover:bg-green-900 hover:bg-opacity-20">
                  <td className="py-4 px-6 font-medium text-green-300 terminal-text">{vessel.name}</td>
                  <td className="py-4 px-6 text-green-400 terminal-text">Autonomous</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-800 rounded-full h-2 border border-green-600">
                        <div 
                          className="bg-green-500 h-2 rounded-full shadow-lg shadow-green-500/50"
                          style={{ width: `${vessel.efficiency}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-green-300 terminal-text">{vessel.efficiency}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-semibold text-yellow-300 terminal-text">{vessel.collected.toLocaleString()} kg</td>
                  <td className="py-4 px-6 text-blue-300 terminal-text">{Math.floor(Math.random() * 120 + 80)}h</td>
                  <td className="py-4 px-6 text-purple-300 terminal-text">{(Math.random() * 2 + 8).toFixed(1)} L/hr</td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      vessel.efficiency > 0 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    } terminal-text`}>
                      {vessel.efficiency > 0 ? 'Active' : 'Idle'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPanel;