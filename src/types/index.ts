export interface PlasticHotspot {
  id: string;
  lat: number;
  lng: number;
  concentration: number; // particles per km²
  severity: 'low' | 'medium' | 'high' | 'critical';
  area: number; // km²
  detectedAt: Date;
  nasaMetadata?: {
    mgrs: string;
    utm: { zone: string; easting: number; northing: number };
    confidence: number;
    algorithm: string;
    satellites: string[];
    missionGrade: boolean;
  };
}

export interface Vessel {
  id: string;
  name: string;
  type: 'drone' | 'ship' | 'autonomous';
  lat: number;
  lng: number;
  status: 'active' | 'idle' | 'maintenance' | 'returning';
  battery: number;
  plasticCollected: number; // kg
  route: RoutePoint[];
  currentTarget?: string;
  speed: number; // knots
}

export interface RoutePoint {
  lat: number;
  lng: number;
  eta?: Date;
  completed?: boolean;
}

export interface Mission {
  id: string;
  name: string;
  status: 'planning' | 'active' | 'completed' | 'paused';
  vessels: string[];
  targets: string[];
  startDate: Date;
  estimatedCompletion: Date;
  plasticTarget: number; // kg
  plasticCollected: number; // kg
  efficiency: number; // percentage
}

export interface SatelliteData {
  timestamp: Date;
  source: string;
  coverage: number; // percentage of ocean scanned
  hotspotsDetected: number;
  avgConcentration: number;
}

// Additional type definitions for NASA-grade system
export interface NASACredentials {
  earthdataUsername: string;
  earthdataPassword: string;
  apiKey: string;
}

export interface MissionGradeCoordinates {
  latitude: number;
  longitude: number;
  mgrs: string;
  utm: {
    zone: string;
    easting: number;
    northing: number;
  };
  elevation: number;
  geoid: string;
}

export interface NASAPlasticDetection {
  id: string;
  coordinates: MissionGradeCoordinates;
  concentration: number;
  confidence: number;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  area: number;
  detectionAlgorithm: string;
  satelliteSource: string[];
  qualityFlags: number[];
  timestamp: Date;
  missionGrade: boolean;
}

export interface ActiveNASASatellite {
  noradId: number;
  name: string;
  position: {
    latitude: number;
    longitude: number;
    altitude: number;
    velocity: number;
  };
  nextPass: {
    aos: Date;
    los: Date;
    maxElevation: number;
    direction: string;
  };
  instruments: string[];
  dataQuality: number;
  missionStatus: 'OPERATIONAL' | 'DEGRADED' | 'MAINTENANCE';
}
