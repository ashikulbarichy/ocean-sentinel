import { useState, Suspense, lazy } from 'react';
import Header from './components/Header';
import OceanMap from './components/OceanMap';
import SatellitePanel from './components/SatellitePanel';
import MissionsPanel from './components/MissionsPanel';
import { useRealTimeData } from './hooks/useRealTimeData';
import { useAdvancedSystemMetrics } from './hooks/useAdvancedSystemMetrics';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load heavy components for better performance
const AdvancedDashboard = lazy(() => import('./components/AdvancedDashboard'));
const AnalyticsPanel = lazy(() => import('./components/AnalyticsPanel'));

function App() {
  const [activeTab, setActiveTab] = useState('map');
  const { 
    plasticHotspots, 
    vessels, 
    missions, 
    satelliteData, 
    lastUpdate,
    isLoading,
    error,
    isSimulating,
    startSimulation,
    stopSimulation,
    resetVesselTrails,
    sarEnabled,
    setSarEnabled,
    sarDetections
  } = useRealTimeData();
  
  const { metrics } = useAdvancedSystemMetrics();

  // Enhanced error handling with retry capability
  if (error && plasticHotspots.length === 0 && !isLoading) {
    return (
      <div className="min-h-screen bg-ocean-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md">
          <h2 className="text-xl font-bold text-red-600 mb-4">🛰️ NASA Data Connection Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <p className="text-sm text-gray-500">
            The system is attempting to reconnect to NASA satellites. 
            Mission-critical backup systems are operational.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 bg-ocean-600 text-white px-4 py-2 rounded hover:bg-ocean-700"
          >
            🔄 Reconnect to NASA Systems
          </button>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    try {
      switch (activeTab) {
        case 'map':
          return (
            <OceanMap 
              plasticHotspots={plasticHotspots} 
              vessels={vessels} 
              isSimulating={isSimulating}
              onStartSimulation={startSimulation}
              onStopSimulation={stopSimulation}
              onResetTrails={resetVesselTrails}
              sarEnabled={sarEnabled}
              onToggleSar={setSarEnabled}
              sarDetections={sarDetections}
            />
          );
        case 'satellites':
          return <SatellitePanel 
            satelliteData={satelliteData} 
            plasticHotspots={plasticHotspots} 
            isScanning={false}
            isLoadingHotspots={false} // Assuming isLoadingHotspots is no longer needed or replaced
          />;
        case 'missions':
          return <MissionsPanel missions={missions} vessels={vessels} />;
        case 'analytics':
          return (
            <Suspense fallback={<div>Loading Analytics...</div>}>
              <AnalyticsPanel 
                missions={missions} 
                vessels={vessels} 
                satelliteData={satelliteData} 
              />
            </Suspense>
          );
        case 'advanced':
          return (
            <Suspense fallback={<div>Loading Advanced Dashboard...</div>}>
              <AdvancedDashboard 
                aiMetrics={metrics?.ai || {
                  cnnAccuracy: 96.8,
                  lstmPredictionError: 2.1,
                  transformerConfidence: 94.5,
                  edgeProcessingSpeed: 450,
                  gpuUtilization: 75.2,
                  inferenceLatency: 35,
                  modelsActive: 12,
                  totalInferences: 125000
                }}
                edgeComputingStats={metrics?.edgeComputing || {
                  activeWorkers: 8,
                  processingCapacity: 85.3,
                  latency: 25.4,
                  throughput: 1250,
                  gpuAcceleration: true,
                  distributedNodes: 16,
                  memoryUsage: 65.2,
                  cpuUsage: 58.7
                }}
                sensorNetworkData={metrics?.sensorNetwork || {
                  totalSensors: 50,
                  activeSensors: 47,
                  networkHealth: 0.94,
                  dataQuality: 0.96,
                  coverage: 0.89,
                  meshConnectivity: 0.92,
                  batteryLevel: 87.3,
                  signalStrength: 94.2
                }}
              />
            </Suspense>
          );
        default:
          return (
            <OceanMap 
              plasticHotspots={plasticHotspots} 
              vessels={vessels} 
              isSimulating={isSimulating}
              onStartSimulation={startSimulation}
              onStopSimulation={stopSimulation}
              onResetTrails={resetVesselTrails}
              sarEnabled={sarEnabled}
              onToggleSar={setSarEnabled}
              sarDetections={sarDetections}
            />
          );
      }
    } catch (error) {
      console.error('Error rendering content:', error);
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🛰️ NASA Panel Loading Error</h3>
            <p className="text-gray-600 mb-4">Mission control panel temporarily unavailable</p>
            <button 
              onClick={() => setActiveTab('map')}
              className="bg-ocean-600 text-white px-4 py-2 rounded hover:bg-ocean-700"
            >
              🗺️ Return to Mission Map
            </button>
          </div>
        </div>
      );
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-ocean-50 touch-pan-x touch-pan-y">
        <Header 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          isLive={true} 
          lastUpdate={lastUpdate} 
        />
        <main className={`h-[calc(100vh-3rem)] sm:h-[calc(100vh-4rem)] ${
          activeTab === 'map' ? 'overflow-hidden' : 'overflow-y-auto'
        }`}>
          {renderContent()}
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;