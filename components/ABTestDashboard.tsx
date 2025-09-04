'use client';

import { useState, useEffect } from 'react';
import { AnalyticsTracker } from '@/lib/analytics';

interface ABTestDashboardProps {
  onClose?: () => void;
}

export default function ABTestDashboard({ onClose }: ABTestDashboardProps) {
  const [stats, setStats] = useState({
    variantA: 0,
    variantB: 0,
    conversions: { A: 0, B: 0 }
  });
  const [heatmapData, setHeatmapData] = useState<Array<{x: number, y: number, intensity: number}>>([]);

  useEffect(() => {
    const tracker = AnalyticsTracker.getInstance();
    const currentStats = tracker.getABTestStats();
    const currentHeatmap = tracker.getHeatmapData();
    
    setStats(currentStats);
    setHeatmapData(currentHeatmap);

    // Update stats every 5 seconds
    const interval = setInterval(() => {
      const newStats = tracker.getABTestStats();
      const newHeatmap = tracker.getHeatmapData();
      setStats(newStats);
      setHeatmapData(newHeatmap);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const conversionRateA = stats.variantA > 0 ? (stats.conversions.A / stats.variantA * 100).toFixed(2) : '0.00';
  const conversionRateB = stats.variantB > 0 ? (stats.conversions.B / stats.variantB * 100).toFixed(2) : '0.00';

  return (
    <div className="fixed bottom-4 left-4 bg-white rounded-lg shadow-2xl p-6 max-w-md z-50 border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">A/B Test Dashboard</h3>
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600">Live</span>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 w-4 h-4 flex items-center justify-center"
            >
              <i className="ri-close-line w-4 h-4"></i>
            </button>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">A</div>
          <div className="text-sm text-gray-600">Visitors: {stats.variantA}</div>
          <div className="text-sm text-gray-600">Conversions: {stats.conversions.A}</div>
          <div className="text-lg font-semibold text-blue-600">{conversionRateA}%</div>
        </div>
        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">B</div>
          <div className="text-sm text-gray-600">Visitors: {stats.variantB}</div>
          <div className="text-sm text-gray-600">Conversions: {stats.conversions.B}</div>
          <div className="text-lg font-semibold text-green-600">{conversionRateB}%</div>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Heatmap Data Points</span>
          <span>{heatmapData.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-orange-500 h-2 rounded-full transition-all duration-500" 
            style={{ width: `${Math.min(heatmapData.length / 10 * 100, 100)}%` }}
          ></div>
        </div>
      </div>
      
      <div className="text-xs text-gray-500 text-center">
        <p>Real-time AI analytics tracking</p>
        <p suppressHydrationWarning={true}>Updated: {new Date().toLocaleTimeString()}</p>
      </div>
    </div>
  );
}