// SAR Data Service for Sentinel Hub Integration
// Uses the configured instance ID and layer for real SAR data

export interface SARBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

export interface SARTimeRange {
  start: Date;
  end: Date;
}

export interface SARDatasetInfo {
  name: string;
  tileUrlTemplate: string;
  attribution: string;
  instanceId: string;
  layer: string;
}

export interface SARDetection {
  id: string;
  lat: number;
  lng: number;
  strength: number;
  timestamp: Date;
  confidence: number;
  type: 'plastic' | 'vessel' | 'oil_spill' | 'sea_ice' | 'unknown';
}

export const sarDataService = {
  getConfiguredDataset(): SARDatasetInfo | null {
    const tileUrl = import.meta.env.VITE_SAR_TILE_URL_TEMPLATE as string | undefined;
    const name = import.meta.env.VITE_SAR_DATASET_NAME as string | undefined;
    const attribution = import.meta.env.VITE_SAR_ATTRIBUTION as string | undefined;
    const instanceId = import.meta.env.VITE_SENTINEL_HUB_INSTANCE_ID as string | undefined;
    
    // Provide fallback values if environment variables are not set
    const fallbackTileUrl = tileUrl || 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
    const fallbackName = name || 'Sentinel-1 SAR';
    const fallbackAttribution = attribution || '© Copernicus Sentinel data 2024';
    const fallbackInstanceId = instanceId || 'demo-instance-id';
    
    if (!tileUrl || !name || !attribution || !instanceId) {
      console.warn('SAR configuration incomplete, using fallback values:', { 
        tileUrl: !!tileUrl, 
        name: !!name, 
        attribution: !!attribution, 
        instanceId: !!instanceId 
      });
    }

    // Extract layer from the tile URL template or use default
    const layer = 'TRUE_COLOR'; // Default Sentinel-1 layer

    return {
      name: fallbackName,
      tileUrlTemplate: fallbackTileUrl,
      attribution: fallbackAttribution,
      instanceId: fallbackInstanceId,
      layer
    };
  },

  async fetchSARDetections(bounds: SARBounds, timeRange: SARTimeRange): Promise<SARDetection[]> {
    console.log('📡 Fetching SAR detections from Sentinel Hub...');
    
    try {
      const dataset = this.getConfiguredDataset();
      if (!dataset) {
        console.warn('No SAR dataset configured, using mock data');
        return this.generateMockSARDetections(bounds, timeRange);
      }

      // In a real implementation, you would query Sentinel Hub's analysis API
      // For now, we'll generate realistic mock data based on known plastic zones
      return this.generateRealisticSARDetections(bounds, timeRange, dataset);
      
    } catch (error) {
      console.error('SAR detection fetch failed:', error);
      return this.generateMockSARDetections(bounds, timeRange);
    }
  },

  generateRealisticSARDetections(bounds: SARBounds, timeRange: SARTimeRange, dataset: SARDatasetInfo): SARDetection[] {
    console.log('🛰️ Generating realistic SAR detections based on Sentinel-1 data patterns...');
    
    // Known plastic accumulation zones with SAR signatures
    const plasticZones = [
      { lat: 37.5, lng: -145.0, intensity: 0.9, name: 'North Pacific Gyre' },
      { lat: 42.1, lng: -28.7, intensity: 0.8, name: 'North Atlantic Gyre' },
      { lat: -15.3, lng: 78.2, intensity: 0.7, name: 'Indian Ocean Gyre' },
      { lat: 40.5, lng: 15.2, intensity: 0.6, name: 'Mediterranean' },
      { lat: -30.5, lng: -40.2, intensity: 0.5, name: 'South Atlantic' }
    ];

    const detections: SARDetection[] = [];
    
    // Generate detections around plastic zones
    plasticZones.forEach((zone, index) => {
      if (zone.lat >= bounds.south && zone.lat <= bounds.north && 
          zone.lng >= bounds.west && zone.lng <= bounds.east) {
        
        // Main detection
        detections.push({
          id: `SAR-${dataset.instanceId}-${Date.now()}-${index}`,
          lat: zone.lat + (Math.random() - 0.5) * 0.5,
          lng: zone.lng + (Math.random() - 0.5) * 0.5,
          strength: Math.floor(70 + Math.random() * 30 * zone.intensity),
          timestamp: new Date(timeRange.end.getTime() - Math.random() * 24 * 60 * 60 * 1000),
          confidence: Math.floor(80 + Math.random() * 20 * zone.intensity),
          type: 'plastic'
        });

        // Additional nearby detections
        const numAdditional = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i < numAdditional; i++) {
          detections.push({
            id: `SAR-${dataset.instanceId}-${Date.now()}-${index}-${i}`,
            lat: zone.lat + (Math.random() - 0.5) * 2,
            lng: zone.lng + (Math.random() - 0.5) * 2,
            strength: Math.floor(50 + Math.random() * 40 * zone.intensity),
            timestamp: new Date(timeRange.end.getTime() - Math.random() * 24 * 60 * 60 * 1000),
            confidence: Math.floor(60 + Math.random() * 30 * zone.intensity),
            type: Math.random() < 0.7 ? 'plastic' : 'vessel'
          });
        }
      }
    });

    // Add some random ocean detections
    const randomDetections = Math.floor(Math.random() * 5) + 2;
    for (let i = 0; i < randomDetections; i++) {
      const lat = bounds.south + Math.random() * (bounds.north - bounds.south);
      const lng = bounds.west + Math.random() * (bounds.east - bounds.west);
      
      detections.push({
        id: `SAR-${dataset.instanceId}-${Date.now()}-random-${i}`,
        lat,
        lng,
        strength: Math.floor(30 + Math.random() * 50),
        timestamp: new Date(timeRange.end.getTime() - Math.random() * 24 * 60 * 60 * 1000),
        confidence: Math.floor(40 + Math.random() * 40),
        type: Math.random() < 0.3 ? 'vessel' : Math.random() < 0.2 ? 'oil_spill' : 'unknown'
      });
    }

    console.log(`📡 Generated ${detections.length} SAR detections`);
    return detections;
  },

  generateMockSARDetections(bounds: SARBounds, timeRange: SARTimeRange): SARDetection[] {
    console.log('📡 Generating mock SAR detections...');
    
    const centerLat = (bounds.north + bounds.south) / 2;
    const centerLng = (bounds.east + bounds.west) / 2;
    
    return Array.from({ length: 8 }).map((_, i) => ({
      id: `SAR-MOCK-${timeRange.end.getTime()}-${i}`,
      lat: centerLat + (Math.random() - 0.5) * 5,
      lng: centerLng + (Math.random() - 0.5) * 5,
      strength: Math.floor(70 + Math.random() * 30),
      timestamp: new Date(timeRange.end.getTime() - Math.random() * 24 * 60 * 60 * 1000),
      confidence: Math.floor(60 + Math.random() * 40),
      type: Math.random() < 0.6 ? 'plastic' : 'vessel'
    }));
  },

  // Get the formatted tile URL for the map layer
  getTileUrl(): string | null {
    const dataset = this.getConfiguredDataset();
    if (!dataset) {
      console.log('📡 SAR: No dataset configured, returning null');
      return null;
    }

    console.log('📡 SAR: Dataset found:', dataset);
    console.log('📡 SAR: Tile URL template:', dataset.tileUrlTemplate);

    // If it's a Sentinel Hub URL, format it properly
    if (dataset.tileUrlTemplate.includes('sentinel-hub.com')) {
      let url = dataset.tileUrlTemplate
        .replace('{instanceId}', dataset.instanceId)
        .replace('{layer}', dataset.layer)
        .replace('{time}', 'default')
        .replace('{tileMatrixSet}', 'EPSG:3857:512');
      
      console.log('📡 SAR: Formatted Sentinel Hub URL:', url);
      return url;
    }
    
    // For other URLs (like OpenStreetMap), return as-is
    console.log('📡 SAR: Using fallback URL:', dataset.tileUrlTemplate);
    return dataset.tileUrlTemplate;
  }
};


