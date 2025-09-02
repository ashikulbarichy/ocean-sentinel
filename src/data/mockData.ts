import { PlasticHotspot, Vessel, Mission, SatelliteData } from '../types';

export const plasticHotspots: PlasticHotspot[] = [
  {
    id: 'gp-1',
    lat: 37.5,
    lng: -145.0,
    concentration: 15000,
    severity: 'critical',
    area: 1200,
    detectedAt: new Date('2024-01-15')
  },
  {
    id: 'gp-2',
    lat: 30.2,
    lng: -140.5,
    concentration: 8500,
    severity: 'high',
    area: 800,
    detectedAt: new Date('2024-01-14')
  },
  {
    id: 'at-1',
    lat: 42.1,
    lng: -28.7,
    concentration: 12000,
    severity: 'critical',
    area: 950,
    detectedAt: new Date('2024-01-16')
  },
  {
    id: 'io-1',
    lat: -15.3,
    lng: 78.2,
    concentration: 6700,
    severity: 'high',
    area: 650,
    detectedAt: new Date('2024-01-13')
  },
  {
    id: 'med-1',
    lat: 40.5,
    lng: 15.2,
    concentration: 9200,
    severity: 'high',
    area: 320,
    detectedAt: new Date('2024-01-17')
  },
  {
    id: 'pac-2',
    lat: 25.8,
    lng: -155.3,
    concentration: 4200,
    severity: 'medium',
    area: 450,
    detectedAt: new Date('2024-01-12')
  }
];

export const vessels: Vessel[] = [
  {
    id: 'os-001',
    name: 'Sentinel Alpha',
    type: 'autonomous',
    lat: 36.8,
    lng: -142.1,
    status: 'active',
    battery: 87,
    plasticCollected: 2400,
    route: [
      { lat: 36.8, lng: -142.1, completed: true },
      { lat: 37.2, lng: -143.5, completed: false },
      { lat: 37.5, lng: -145.0, completed: false }
    ],
    currentTarget: 'gp-1',
    speed: 12.5
  },
  {
    id: 'os-002',
    name: 'Ocean Guardian',
    type: 'ship',
    lat: 41.5,
    lng: -26.2,
    status: 'active',
    battery: 92,
    plasticCollected: 5200,
    route: [
      { lat: 41.5, lng: -26.2, completed: true },
      { lat: 42.0, lng: -28.0, completed: false },
      { lat: 42.1, lng: -28.7, completed: false }
    ],
    currentTarget: 'at-1',
    speed: 18.2
  },
  {
    id: 'os-003',
    name: 'Marine Drone Beta',
    type: 'drone',
    lat: 39.8,
    lng: 14.5,
    status: 'active',
    battery: 65,
    plasticCollected: 890,
    route: [
      { lat: 39.8, lng: 14.5, completed: true },
      { lat: 40.2, lng: 14.8, completed: false },
      { lat: 40.5, lng: 15.2, completed: false }
    ],
    currentTarget: 'med-1',
    speed: 8.7
  },
  {
    id: 'os-004',
    name: 'Pacific Cleaner',
    type: 'autonomous',
    lat: 28.5,
    lng: -138.2,
    status: 'idle',
    battery: 100,
    plasticCollected: 0,
    route: [],
    speed: 0
  }
];

export const missions: Mission[] = [
  {
    id: 'm-001',
    name: 'Great Pacific Cleanup Phase 3',
    status: 'active',
    vessels: ['os-001', 'os-004'],
    targets: ['gp-1', 'gp-2', 'pac-2'],
    startDate: new Date('2024-01-15'),
    estimatedCompletion: new Date('2024-02-28'),
    plasticTarget: 50000,
    plasticCollected: 2400,
    efficiency: 78
  },
  {
    id: 'm-002',
    name: 'Atlantic Intervention',
    status: 'active',
    vessels: ['os-002'],
    targets: ['at-1'],
    startDate: new Date('2024-01-16'),
    estimatedCompletion: new Date('2024-02-15'),
    plasticTarget: 25000,
    plasticCollected: 5200,
    efficiency: 85
  },
  {
    id: 'm-003',
    name: 'Mediterranean Response',
    status: 'active',
    vessels: ['os-003'],
    targets: ['med-1'],
    startDate: new Date('2024-01-17'),
    estimatedCompletion: new Date('2024-02-10'),
    plasticTarget: 15000,
    plasticCollected: 890,
    efficiency: 72
  }
];

export const satelliteData: SatelliteData = {
  timestamp: new Date(),
  source: 'NASA CYGNSS',
  coverage: 89.2,
  hotspotsDetected: 6,
  avgConcentration: 9100
};

// Route optimization algorithm simulation
export const generateOptimalRoute = (
  vessel: Vessel, 
  targets: PlasticHotspot[]
): RoutePoint[] => {
  const route: RoutePoint[] = [{ lat: vessel.lat, lng: vessel.lng, completed: true }];
  
  // Simple nearest neighbor with current consideration
  let remainingTargets = [...targets];
  let currentPos = { lat: vessel.lat, lng: vessel.lng };
  
  while (remainingTargets.length > 0) {
    let nearestTarget = remainingTargets[0];
    let minDistance = calculateDistance(currentPos, nearestTarget);
    
    for (const target of remainingTargets) {
      const distance = calculateDistance(currentPos, target);
      // Weight by severity and proximity
      const weightedDistance = distance / (target.concentration / 5000);
      
      if (weightedDistance < minDistance) {
        nearestTarget = target;
        minDistance = weightedDistance;
      }
    }
    
    route.push({
      lat: nearestTarget.lat,
      lng: nearestTarget.lng,
      completed: false,
      eta: new Date(Date.now() + route.length * 24 * 60 * 60 * 1000)
    });
    
    currentPos = { lat: nearestTarget.lat, lng: nearestTarget.lng };
    remainingTargets = remainingTargets.filter(t => t.id !== nearestTarget.id);
  }
  
  return route;
};

function calculateDistance(pos1: { lat: number; lng: number }, pos2: { lat: number; lng: number }): number {
  const R = 6371; // Earth's radius in km
  const dLat = (pos2.lat - pos1.lat) * Math.PI / 180;
  const dLng = (pos2.lng - pos1.lng) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(pos1.lat * Math.PI / 180) * Math.cos(pos2.lat * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}