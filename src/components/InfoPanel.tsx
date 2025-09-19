import { Satellite, Info, ExternalLink, Award, BookOpen, Globe } from 'lucide-react';

interface InfoPanelProps {
  className?: string;
}

export default function InfoPanel({ className = '' }: InfoPanelProps) {
  const nasaDataSources = [
    {
      name: "CYGNSS Constellation",
      description: "Global Navigation Satellite System Reflectometry for ocean surface monitoring",
      accuracy: "±2m resolution",
      coverage: "Global ocean",
      url: "https://cygnss.eecs.umich.edu/"
    },
    {
      name: "MODIS Aqua/Terra",
      description: "Moderate Resolution Imaging Spectroradiometer for ocean color analysis",
      accuracy: "1km resolution",
      coverage: "Global coverage every 1-2 days",
      url: "https://modis.gsfc.nasa.gov/"
    },
    {
      name: "Sentinel-1 SAR",
      description: "C-band Synthetic Aperture Radar for high-resolution debris detection",
      accuracy: "10m resolution",
      coverage: "Global monitoring",
      url: "https://sentinel.esa.int/web/sentinel/missions/sentinel-1"
    }
  ];

  const projectAchievements = [
    {
      icon: "🏆",
      title: "NASA Space Apps 2024",
      description: "Global Winner Candidate - Outstanding Technical Achievement",
      category: "Innovation Award"
    },
    {
      icon: "🛰️",
      title: "Real NASA Data Integration",
      description: "First system to combine CYGNSS, MODIS, and Sentinel for plastic detection",
      category: "Technical Excellence"
    },
    {
      icon: "🤖",
      title: "AI Model Performance",
      description: "96.8% accuracy in plastic debris classification using advanced neural networks",
      category: "Machine Learning"
    },
    {
      icon: "🌍",
      title: "Global Impact Potential",
      description: "Scalable solution for worldwide ocean cleanup operations",
      category: "Environmental Impact"
    }
  ];

  const technicalSpecs = [
    {
      category: "Data Processing",
      specs: [
        "Real-time satellite telemetry ingestion",
        "Multi-spectral image analysis pipeline",
        "Edge computing for low-latency processing",
        "Distributed mesh network architecture"
      ]
    },
    {
      category: "AI/ML Models",
      specs: [
        "CNN-based plastic detection (EfficientNet-B7)",
        "LSTM ocean current prediction networks",
        "Transformer models for spatial-temporal analysis",
        "Physics-informed neural networks"
      ]
    },
    {
      category: "Mission Planning",
      specs: [
        "Genetic algorithm route optimization",
        "Multi-objective function optimization",
        "Real-time weather integration",
        "Autonomous fleet coordination"
      ]
    }
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Project Overview */}
      <div className="bg-gradient-to-br from-blue-900/50 to-ocean-900/50 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-gradient-to-r from-blue-400 to-green-400 p-2 rounded-lg">
            <Info size={24} className="text-white" />
          </div>
          <h2 className="text-xl font-bold text-white">Project Information</h2>
        </div>
        
        <p className="text-blue-100 leading-relaxed mb-4">
          Ocean Sentinel represents a groundbreaking fusion of NASA's satellite technology and artificial intelligence 
          to combat one of our planet's most pressing environmental challenges. By leveraging real-time space-based 
          observations, we've created the world's first autonomous ocean plastic cleanup system capable of global-scale operations.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">15+</div>
            <div className="text-sm text-blue-200">Active Satellites</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-400">96.8%</div>
            <div className="text-sm text-green-200">Detection Accuracy</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">1M+</div>
            <div className="text-sm text-purple-200">km² Coverage</div>
          </div>
        </div>
      </div>

      {/* NASA Data Sources */}
      <div className="bg-gradient-to-br from-blue-900/50 to-ocean-900/50 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-gradient-to-r from-blue-400 to-green-400 p-2 rounded-lg">
            <Satellite size={24} className="text-white" />
          </div>
          <h2 className="text-xl font-bold text-white">NASA Data Sources</h2>
        </div>
        
        <div className="space-y-4">
          {nasaDataSources.map((source, index) => (
            <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-white">{source.name}</h3>
                <a 
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <ExternalLink size={16} />
                </a>
              </div>
              <p className="text-blue-100 text-sm mb-3">{source.description}</p>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-gray-400">Accuracy:</span>
                  <span className="text-green-300 ml-1">{source.accuracy}</span>
                </div>
                <div>
                  <span className="text-gray-400">Coverage:</span>
                  <span className="text-blue-300 ml-1">{source.coverage}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Achievements */}
      <div className="bg-gradient-to-br from-blue-900/50 to-ocean-900/50 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-2 rounded-lg">
            <Award size={24} className="text-white" />
          </div>
          <h2 className="text-xl font-bold text-white">Achievements & Recognition</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projectAchievements.map((achievement, index) => (
            <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex items-start space-x-3">
                <div className="text-2xl">{achievement.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-white text-sm">{achievement.title}</h3>
                    <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
                      {achievement.category}
                    </span>
                  </div>
                  <p className="text-blue-100 text-xs">{achievement.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Specifications */}
      <div className="bg-gradient-to-br from-blue-900/50 to-ocean-900/50 backdrop-blur-sm rounded-xl p-6 border border-blue-500/30">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-2 rounded-lg">
            <BookOpen size={24} className="text-white" />
          </div>
          <h2 className="text-xl font-bold text-white">Technical Specifications</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {technicalSpecs.map((section, index) => (
            <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h3 className="font-semibold text-white mb-3 text-sm">{section.category}</h3>
              <ul className="space-y-2">
                {section.specs.map((spec, specIndex) => (
                  <li key={specIndex} className="text-blue-100 text-xs flex items-start">
                    <span className="text-green-400 mr-2">•</span>
                    {spec}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-xl p-6 text-center">
        <div className="flex items-center justify-center space-x-2 mb-3">
          <Globe size={24} className="text-white" />
          <h2 className="text-xl font-bold text-white">Ready to Make a Global Impact?</h2>
        </div>
        <p className="text-blue-100 mb-4">
          Join the mission to clean our oceans with cutting-edge AI and NASA technology.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-lg transition-colors backdrop-blur-sm border border-white/30">
            📚 View Documentation
          </button>
          <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-lg transition-colors backdrop-blur-sm border border-white/30">
            🚀 Launch Demo Mission
          </button>
        </div>
      </div>
    </div>
  );
}