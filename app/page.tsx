
'use client';

import { useState, useEffect } from 'react';
import ClickTracker from '@/components/ClickTracker';
import HeatmapOverlay from '@/components/HeatmapOverlay';
import ABTestDashboard from '@/components/ABTestDashboard';
import AIAnalyticsDashboard from '@/components/AIAnalyticsDashboard';
import VariantA from '@/components/VariantA';
import VariantB from '@/components/VariantB';

export default function Home() {
  const [variant, setVariant] = useState<'A' | 'B'>('A');
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showAIAnalytics, setShowAIAnalytics] = useState(false);

  // Randomly assign variant on first visit
  useEffect(() => {
    const savedVariant = localStorage.getItem('ab_test_variant');
    if (savedVariant) {
      setVariant(savedVariant as 'A' | 'B');
    } else {
      const randomVariant = Math.random() < 0.5 ? 'A' : 'B';
      setVariant(randomVariant);
      localStorage.setItem('ab_test_variant', randomVariant);
    }
  }, []);

  return (
    <div className="relative">
      {/* A/B Test Controls */}
      {showControls && (
        <div className="fixed top-4 left-4 bg-white rounded-lg shadow-2xl p-4 z-50 border">
          <div className="flex items-center gap-4 mb-3">
            <h3 className="font-bold text-gray-900">A/B Test Controls</h3>
            <button
              onClick={() => setShowControls(false)}
              className="text-gray-400 hover:text-gray-600 w-4 h-4 flex items-center justify-center"
            >
              <i className="ri-close-line w-4 h-4"></i>
            </button>
          </div>
          
          <div className="flex gap-2 mb-3">
            <button
              onClick={() => {
                setVariant('A');
                localStorage.setItem('ab_test_variant', 'A');
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                variant === 'A' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Variant A (Bold)
            </button>
            <button
              onClick={() => {
                setVariant('B');
                localStorage.setItem('ab_test_variant', 'B');
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                variant === 'B' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Variant B (Clean)
            </button>
          </div>
          
          <button
            onClick={() => setShowHeatmap(!showHeatmap)}
            className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
              showHeatmap 
                ? 'bg-orange-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <i className="ri-fire-line w-4 h-4 mr-2"></i>
            {showHeatmap ? 'Hide' : 'Show'} AI Heatmap
          </button>
        </div>
      )}

      {/* Collapsed Control Button */}
      {!showControls && (
        <button
          onClick={() => setShowControls(true)}
          className="fixed top-4 left-4 bg-white rounded-lg shadow-lg p-3 z-50 border hover:shadow-xl transition-shadow cursor-pointer"
        >
          <i className="ri-settings-3-line w-5 h-5 text-gray-600"></i>
        </button>
      )}

      {/* Heatmap Overlay */}
      <HeatmapOverlay isVisible={showHeatmap} />
      
      {/* A/B Test Dashboard */}
      {showDashboard && (
        <ABTestDashboard onClose={() => setShowDashboard(false)} />
      )}
      
      {/* Collapsed Dashboard Button */}
      {!showDashboard && (
        <button
          onClick={() => setShowDashboard(true)}
          className="fixed bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 z-50 border hover:shadow-xl transition-shadow cursor-pointer"
        >
          <i className="ri-bar-chart-line w-5 h-5 text-gray-600"></i>
        </button>
      )}
      
      {/* AI Analytics Dashboard */}
      {showAIAnalytics && (
        <AIAnalyticsDashboard onClose={() => setShowAIAnalytics(false)} />
      )}
      
      {/* Collapsed AI Analytics Button */}
      {!showAIAnalytics && (
        <button
          onClick={() => setShowAIAnalytics(true)}
          className="fixed top-4 right-4 bg-white rounded-lg shadow-lg p-3 z-50 border hover:shadow-xl transition-shadow cursor-pointer"
        >
          <i className="ri-brain-line w-5 h-5 text-purple-600"></i>
        </button>
      )}
      
      {/* Landing Page Variants */}
      <ClickTracker variant={variant}>
        {variant === 'A' ? <VariantA /> : <VariantB />}
      </ClickTracker>
    </div>
  );
}
