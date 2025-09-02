import React, { useState, useEffect, useRef } from 'react';
import { 
  Brain, Cpu, Zap, Activity, TrendingUp, Globe, Satellite, 
  BarChart3, Target, Microscope, Network, Eye
} from 'lucide-react';

interface AdvancedDashboardProps {
  aiMetrics: AIPerformanceMetrics;
  edgeComputingStats: EdgeComputingStats;
  sensorNetworkData: SensorNetworkData;
}

interface AIPerformanceMetrics {
  cnnAccuracy: number;
  lstmPredictionError: number;
  transformerConfidence: number;
  edgeProcessingSpeed: number;
  gpuUtilization: number;
  inferenceLatency: number;
  modelsActive?: number;
  totalInferences?: number;
}

interface EdgeComputingStats {
  activeWorkers: number;
  processingCapacity: number;
  latency: number;
  throughput: number;
  gpuAcceleration: boolean;
  distributedNodes: number;
  memoryUsage?: number;
  cpuUsage?: number;
}

interface SensorNetworkData {
  totalSensors: number;
  activeSensors: number;
  networkHealth: number;
  dataQuality: number;
  coverage: number;
  meshConnectivity: number;
  batteryLevel?: number;
  signalStrength?: number;
}

const AdvancedDashboard: React.FC<AdvancedDashboardProps> = ({
  aiMetrics,
  edgeComputingStats,
  sensorNetworkData
}) => {
  const [realTimeMetrics, setRealTimeMetrics] = useState({
    totalOperations: 0,
    successRate: 99.7,
    systemUptime: 99.95,
    dataProcessed: 0
  });
  const intervalRef = useRef<number>();

  // Optimize real-time updates with longer intervals
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setRealTimeMetrics(prev => ({
        totalOperations: prev.totalOperations + Math.floor(Math.random() * 100),
        successRate: 99.5 + Math.random() * 0.5,
        systemUptime: 99.9 + Math.random() * 0.1,
        dataProcessed: prev.dataProcessed + Math.random() * 10
      }));
    }, 5000); // Increased from 2000ms to 5000ms for better performance

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
      <div className="p-6 space-y-6 relative">
        {/* Floating Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute top-32 right-20 w-24 h-24 bg-green-500 rounded-full opacity-10 animate-bounce"></div>
          <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-purple-500 rounded-full opacity-10 animate-ping"></div>
        </div>

        <div className="relative z-10 p-6">
          {/* Header Section */}
          <div className="bg-black bg-opacity-50 rounded-xl p-6 border border-blue-800 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-blue-400 terminal-text">🚀 Advanced NASA Dashboard</h2>
                <p className="text-blue-300 terminal-text">Real-time system monitoring and advanced analytics</p>
              </div>
              <div className="flex items-center space-x-2 text-sm text-blue-400 bg-black bg-opacity-50 px-3 py-1 rounded-lg border border-blue-400">
                <Activity className="h-4 w-4 animate-pulse" />
                <span className="terminal-text">⟨ LIVE FEED ⟩</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Panel - 3D Visualization */}
          <div className="lg:col-span-2 bg-black bg-opacity-50 rounded-xl p-6 border border-blue-800">
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <Eye className="mr-2 h-6 w-6" />
              Advanced Visualization
            </h3>
            <div className="h-96 rounded-lg overflow-hidden border border-blue-700 bg-gradient-to-br from-blue-900 to-black flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🌊</div>
                <h4 className="text-xl font-bold text-blue-400">Ocean Digital Twin</h4>
                <p className="text-blue-300">Real-time 3D Ocean Simulation</p>
                <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-lg font-bold text-blue-400">128</div>
                    <div className="text-gray-400">Active Models</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-green-400">99.2%</div>
                    <div className="text-gray-400">Accuracy</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-purple-400">25ms</div>
                    <div className="text-gray-400">Latency</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{realTimeMetrics.dataProcessed.toFixed(1)}TB</div>
                <div className="text-gray-400">Data Processed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">96.8%</div>
                <div className="text-gray-400">AI Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">47ms</div>
                <div className="text-gray-400">Response Time</div>
              </div>
            </div>
          </div>

          {/* Right Panel - Advanced Metrics */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Performance Metrics */}
            <div className="bg-black bg-opacity-50 rounded-xl p-6 border border-green-800">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Brain className="mr-2 h-5 w-5 text-green-400" />
                🧠 Advanced AI Performance
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>CNN Accuracy</span>
                    <span className="text-green-400">{aiMetrics.cnnAccuracy.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${Math.min(100, aiMetrics.cnnAccuracy)}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>LSTM Prediction</span>
                    <span className="text-blue-400">{Math.max(0, 100 - aiMetrics.lstmPredictionError).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${Math.max(0, Math.min(100, 100 - aiMetrics.lstmPredictionError))}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>GPU Utilization</span>
                    <span className="text-purple-400">{aiMetrics.gpuUtilization.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-purple-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${Math.min(100, aiMetrics.gpuUtilization)}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Inference Speed</span>
                    <span className="text-yellow-400">{aiMetrics.inferenceLatency.toFixed(0)}ms</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-yellow-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${Math.max(0, Math.min(100, 100 - aiMetrics.inferenceLatency))}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Edge Computing */}
            <div className="bg-black bg-opacity-50 rounded-xl p-6 border border-red-800">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <Cpu className="mr-2 h-5 w-5 text-red-400" />
                ⚡ Edge Computing
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Active Workers</span>
                  <span className="text-red-400 font-bold">{edgeComputingStats.activeWorkers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Capacity</span>
                  <span className="text-green-400 font-bold">{edgeComputingStats.processingCapacity.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Latency</span>
                  <span className="text-blue-400 font-bold">{edgeComputingStats.latency.toFixed(1)}ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">GPU Accel</span>
                  <span className={`font-bold ${edgeComputingStats.gpuAcceleration ? 'text-green-400' : 'text-gray-400'}`}>
                    {edgeComputingStats.gpuAcceleration ? 'ENABLED' : 'DISABLED'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Panel - IoT Sensor Network */}
        <div className="relative z-10 p-6">
          <div className="bg-black bg-opacity-50 rounded-xl p-6 border border-blue-800">
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <Network className="mr-2 h-6 w-6 text-blue-400" />
              🌐 Smart Ocean Sensor Network
            </h3>
            <div className="grid grid-cols-6 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">{sensorNetworkData.totalSensors}</div>
                <div className="text-sm text-gray-400">Total Sensors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">{sensorNetworkData.activeSensors}</div>
                <div className="text-sm text-gray-400">Active</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">{(sensorNetworkData.networkHealth * 100).toFixed(1)}%</div>
                <div className="text-sm text-gray-400">Network Health</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">{(sensorNetworkData.dataQuality * 100).toFixed(1)}%</div>
                <div className="text-sm text-gray-400">Data Quality</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-400">{(sensorNetworkData.coverage * 100).toFixed(1)}%</div>
                <div className="text-sm text-gray-400">Coverage</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-400">{(sensorNetworkData.meshConnectivity * 100).toFixed(1)}%</div>
                <div className="text-sm text-gray-400">Connectivity</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedDashboard;