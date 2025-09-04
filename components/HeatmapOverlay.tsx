'use client';

import { useEffect, useState } from 'react';
import { AnalyticsTracker } from '@/lib/analytics';

interface HeatmapPoint {
  x: number;
  y: number;
  intensity: number;
}

interface HeatmapOverlayProps {
  isVisible: boolean;
}

export default function HeatmapOverlay({ isVisible }: HeatmapOverlayProps) {
  const [heatmapData, setHeatmapData] = useState<HeatmapPoint[]>([]);
  
  useEffect(() => {
    if (isVisible) {
      const tracker = AnalyticsTracker.getInstance();
      const data = tracker.getHeatmapData();
      setHeatmapData(data);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {heatmapData.map((point, index) => (
        <div
          key={index}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: point.x,
            top: point.y,
            width: Math.min(point.intensity * 20 + 20, 100),
            height: Math.min(point.intensity * 20 + 20, 100),
            backgroundColor: `rgba(255, 0, 0, ${Math.min(point.intensity * 0.2, 0.8)})`,
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            filter: 'blur(10px)',
          }}
        />
      ))}
      <div className="fixed top-4 right-4 bg-black/80 text-white px-4 py-2 rounded-lg">
        <p className="text-sm font-medium">AI Heatmap Active</p>
        <p className="text-xs opacity-75">{heatmapData.length} data points</p>
      </div>
    </div>
  );
}