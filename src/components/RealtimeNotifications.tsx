import React, { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, Satellite, Target, X } from 'lucide-react';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
}

interface RealtimeNotificationsProps {
  isScanning: boolean;
  vessels: any[];
  plasticHotspots: any[];
}

const RealtimeNotifications: React.FC<RealtimeNotificationsProps> = ({ 
  isScanning, 
  vessels, 
  plasticHotspots 
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Generate notifications based on real-time data changes
  useEffect(() => {
    if (isScanning) {
      const scanNotification: Notification = {
        id: `scan-${Date.now()}`,
        type: 'info',
        title: 'Satellite Scan Active',
        message: 'NASA CYGNSS scanning for new plastic concentrations...',
        timestamp: new Date()
      };
      setNotifications(prev => [scanNotification, ...prev.slice(0, 4)]);
    }
  }, [isScanning]);

  // Monitor vessel status changes
  useEffect(() => {
    const activeVessels = vessels.filter(v => v.status === 'active');
    if (activeVessels.length > 0 && Math.random() < 0.3) {
      const vessel = activeVessels[Math.floor(Math.random() * activeVessels.length)];
      const notification: Notification = {
        id: `vessel-${Date.now()}`,
        type: 'success',
        title: 'Collection Progress',
        message: `${vessel.name} collected ${Math.floor(Math.random() * 50 + 10)}kg of plastic`,
        timestamp: new Date()
      };
      setNotifications(prev => [notification, ...prev.slice(0, 4)]);
    }
  }, [vessels]);

  // Monitor new hotspot detections
  useEffect(() => {
    const recentHotspots = plasticHotspots.filter(
      h => Date.now() - h.detectedAt.getTime() < 30000 // Last 30 seconds
    );
    
    if (recentHotspots.length > 0) {
      const hotspot = recentHotspots[0];
      const notification: Notification = {
        id: `hotspot-${Date.now()}`,
        type: 'warning',
        title: 'New Hotspot Detected',
        message: `${hotspot.severity.toUpperCase()} concentration at ${hotspot.lat.toFixed(2)}°, ${hotspot.lng.toFixed(2)}°`,
        timestamp: new Date()
      };
      setNotifications(prev => [notification, ...prev.slice(0, 4)]);
    }
  }, [plasticHotspots]);

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'info': return <Satellite className="h-5 w-5 text-blue-500" />;
    }
  };

  const getBgColor = (type: Notification['type']) => {
    switch (type) {
      case 'success': return 'bg-green-50 border-green-200';
      case 'warning': return 'bg-yellow-50 border-yellow-200';
      case 'info': return 'bg-blue-50 border-blue-200';
    }
  };

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2 max-w-sm">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`${getBgColor(notification.type)} border rounded-lg p-4 shadow-lg animate-slide-in`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              {getIcon(notification.type)}
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-gray-900">{notification.title}</h4>
                <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {notification.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RealtimeNotifications;