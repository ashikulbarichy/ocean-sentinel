import { Satellite, Loader } from 'lucide-react';

interface LoadingScreenProps {
  message?: string;
  progress?: number;
}

export default function LoadingScreen({ message = "Initializing NASA Systems...", progress }: LoadingScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-ocean-900 flex items-center justify-center">
      <div className="text-center text-white space-y-8">
        {/* Animated Logo */}
        <div className="relative">
          <div className="absolute inset-0 animate-ping">
            <div className="bg-gradient-to-r from-blue-400 to-green-400 p-6 rounded-full">
              <Satellite size={48} className="text-white opacity-75" />
            </div>
          </div>
          <div className="relative bg-gradient-to-r from-blue-400 to-green-400 p-6 rounded-full">
            <Satellite size={48} className="text-white animate-pulse" />
          </div>
        </div>

        {/* Loading Animation */}
        <div className="flex items-center justify-center space-x-3">
          <Loader size={24} className="animate-spin text-blue-400" />
          <h2 className="text-2xl font-bold">{message}</h2>
        </div>

        {/* Progress Bar */}
        {progress !== undefined && (
          <div className="w-64 mx-auto">
            <div className="bg-white/20 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-400 to-green-400 h-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-blue-200 mt-2">{progress}% Complete</p>
          </div>
        )}

        {/* Status Messages */}
        <div className="space-y-2 text-sm text-blue-200 max-w-md mx-auto">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Connecting to NASA Earthdata...</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Loading CYGNSS satellite data...</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <span>Initializing AI models...</span>
          </div>
        </div>

        {/* Footer */}
        <div className="text-xs text-blue-300 mt-8">
          Ocean Sentinel • NASA Space Apps Challenge 2024
        </div>
      </div>
    </div>
  );
}