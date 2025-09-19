import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Play, Pause, Info, Lightbulb, Target, Satellite, Map } from 'lucide-react';

interface TutorialStep {
  title: string;
  description: string;
  icon: any;
  target?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

interface HelpTutorialProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HelpTutorial({ isOpen, onClose }: HelpTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [tutorialMode, setTutorialMode] = useState<'overview' | 'guided'>('overview');

  const overviewSteps: TutorialStep[] = [
    {
      title: "🌊 Welcome to Ocean Sentinel",
      description: "Discover how NASA satellite technology powers the world's most advanced ocean plastic cleanup system. This revolutionary AI platform uses real-time space data to identify and remove plastic pollution.",
      icon: Satellite
    },
    {
      title: "🛰️ NASA Data Integration",
      description: "Our system processes live feeds from multiple NASA missions: CYGNSS for plastic detection, MODIS for ocean color analysis, and Sentinel-1 SAR for high-resolution debris identification.",
      icon: Satellite
    },
    {
      title: "🤖 AI-Powered Detection",
      description: "Advanced machine learning models analyze satellite imagery with 96.8% accuracy, identifying plastic hotspots and predicting accumulation patterns using CNN and LSTM networks.",
      icon: Target
    },
    {
      title: "🗺️ Real-Time Mission Control",
      description: "Monitor autonomous vessels in real-time as they execute AI-optimized routes. Track progress, efficiency metrics, and environmental impact through our comprehensive dashboard.",
      icon: Map
    }
  ];

  const guidedSteps: TutorialStep[] = [
    {
      title: "Ocean Map Navigation",
      description: "Use the ocean map to view real-time plastic hotspots, vessel movements, and satellite coverage. Toggle between different map layers and tracking modes.",
      icon: Map,
      target: "ocean-map"
    },
    {
      title: "Satellite Data Panel",
      description: "Access live NASA data feeds, scanning schedules, and detection confidence levels. Monitor active satellites and data processing status.",
      icon: Satellite,
      target: "satellite-panel"
    },
    {
      title: "Mission Control Center",
      description: "Launch new cleanup missions, track vessel performance, and monitor plastic collection metrics. View mission efficiency and environmental impact.",
      icon: Target,
      target: "missions-panel"
    },
    {
      title: "Advanced Analytics",
      description: "Explore detailed performance metrics, AI model statistics, and predictive analytics. Access the NASA-grade advanced systems dashboard.",
      icon: Info,
      target: "analytics-panel"
    }
  ];

  const currentSteps = tutorialMode === 'overview' ? overviewSteps : guidedSteps;
  const currentStepData = currentSteps[currentStep];

  const nextStep = () => {
    if (currentStep < currentSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetTutorial = () => {
    setCurrentStep(0);
    setTutorialMode('overview');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative bg-gradient-to-br from-blue-900 to-ocean-900 rounded-2xl shadow-2xl max-w-4xl mx-4 border border-blue-500/30">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="p-6 border-b border-blue-500/30">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-blue-400 to-green-400 p-3 rounded-full">
              <Lightbulb size={32} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Ocean Sentinel Tutorial</h2>
              <p className="text-blue-200">Learn how to navigate the AI-powered ocean cleanup system</p>
            </div>
          </div>

          {/* Mode Selector */}
          <div className="flex space-x-4 mt-4">
            <button
              onClick={() => { setTutorialMode('overview'); setCurrentStep(0); }}
              className={`px-4 py-2 rounded-lg transition-colors ${
                tutorialMode === 'overview'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/10 text-blue-200 hover:bg-white/20'
              }`}
            >
              📚 Overview
            </button>
            <button
              onClick={() => { setTutorialMode('guided'); setCurrentStep(0); }}
              className={`px-4 py-2 rounded-lg transition-colors ${
                tutorialMode === 'guided'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/10 text-blue-200 hover:bg-white/20'
              }`}
            >
              🎯 Guided Tour
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-r from-blue-400 to-green-400 p-4 rounded-full">
                <currentStepData.icon size={48} className="text-white" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">{currentStepData.title}</h3>
            <p className="text-blue-100 max-w-2xl mx-auto leading-relaxed">
              {currentStepData.description}
            </p>
          </div>

          {/* Features Showcase */}
          {tutorialMode === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-center">
                  <div className="text-2xl mb-2">🛰️</div>
                  <div className="text-sm font-semibold text-white">15+ Satellites</div>
                  <div className="text-xs text-blue-200">Real-time monitoring</div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-center">
                  <div className="text-2xl mb-2">🤖</div>
                  <div className="text-sm font-semibold text-white">96.8% AI Accuracy</div>
                  <div className="text-xs text-blue-200">Machine learning</div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-center">
                  <div className="text-2xl mb-2">♻️</div>
                  <div className="text-sm font-semibold text-white">5.01T kg Removed</div>
                  <div className="text-xs text-blue-200">Environmental impact</div>
                </div>
              </div>
            </div>
          )}

          {/* Key Features List */}
          {currentStep === 0 && tutorialMode === 'overview' && (
            <div className="bg-white/5 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-white mb-3">🌟 Key Features:</h4>
              <ul className="space-y-2 text-sm text-blue-100">
                <li>• Real-time NASA satellite data integration (CYGNSS, MODIS, Sentinel)</li>
                <li>• AI-powered plastic detection with 96.8% accuracy</li>
                <li>• Autonomous vessel route optimization using genetic algorithms</li>
                <li>• Live mission control and performance monitoring</li>
                <li>• Predictive analytics for plastic accumulation patterns</li>
                <li>• Interactive 3D ocean visualization and digital twin technology</li>
              </ul>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                currentStep === 0
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              <ChevronLeft size={20} />
              <span>Previous</span>
            </button>

            {/* Step Indicators */}
            <div className="flex space-x-2">
              {currentSteps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentStep ? 'bg-blue-400' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={currentStep === currentSteps.length - 1 ? onClose : nextStep}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white transition-colors"
            >
              <span>{currentStep === currentSteps.length - 1 ? 'Start Exploring' : 'Next'}</span>
              {currentStep === currentSteps.length - 1 ? (
                <Play size={20} />
              ) : (
                <ChevronRight size={20} />
              )}
            </button>
          </div>

          {/* Progress */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-blue-200 mb-1">
              <span>{tutorialMode === 'overview' ? 'Overview' : 'Guided Tour'}</span>
              <span>{currentStep + 1} of {currentSteps.length}</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-400 to-green-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / currentSteps.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-blue-500/30 bg-white/5 rounded-b-2xl">
          <div className="flex items-center justify-between text-xs text-blue-300">
            <div>🌊 Ocean Sentinel • NASA Space Apps Challenge 2024</div>
            <button
              onClick={resetTutorial}
              className="hover:text-white transition-colors"
            >
              Reset Tutorial
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}