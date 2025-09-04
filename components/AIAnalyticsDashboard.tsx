'use client';

import { useState, useEffect } from 'react';
import { AIAnalyticsService, AITestInsights } from '@/lib/ai-analytics';
import { AnalyticsTracker } from '@/lib/analytics';

interface AIAnalyticsDashboardProps {
  onClose?: () => void;
}

export default function AIAnalyticsDashboard({ onClose }: AIAnalyticsDashboardProps) {
  const [insights, setInsights] = useState<AITestInsights | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const aiService = new AIAnalyticsService();

  const analyzeData = async () => {
    setLoading(true);
    setError(null);

    try {
      const tracker = AnalyticsTracker.getInstance();
      const stats = tracker.getABTestStats();
      const heatmapData = tracker.getHeatmapData();

      console.log('🔥 Heatmap data being sent to AI:', heatmapData);
      console.log('📊 Stats being sent to AI:', stats);

      const aiInsights = await aiService.analyzeABTest(
        { visitors: stats.variantA, conversions: stats.conversions.A },
        { visitors: stats.variantB, conversions: stats.conversions.B },
        heatmapData.map(point => ({
          ...point,
          timestamp: (point as any).timestamp || Date.now(),
          element: (point as any).element || 'click',
          variant: (point as any).variant || 'A' as const
        }))
      );

      setInsights(aiInsights);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze data');
    } finally {
      setLoading(false);
    }
  };

  const getOptimizationSuggestions = async (variant: 'A' | 'B') => {
    setLoading(true);
    try {
      const suggestions = await aiService.generateOptimizationSuggestions(variant);
      setSuggestions(suggestions);
      setShowSuggestions(true);
    } catch (err) {
      setError('Failed to generate suggestions');
    } finally {
      setLoading(false);
    }
  };

  const getWinnerColor = (winner: string) => {
    switch (winner) {
      case 'A': return 'text-blue-600';
      case 'B': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getWinnerBg = (winner: string) => {
    switch (winner) {
      case 'A': return 'bg-blue-50 border-blue-200';
      case 'B': return 'bg-green-50 border-green-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="fixed top-4 right-4 bg-white rounded-lg shadow-2xl p-6 max-w-md z-50 border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 flex items-center">
          <div className="w-6 h-6 mr-2 flex items-center justify-center">
            <i className="ri-brain-line text-purple-600"></i>
          </div>
          AI Analytics
        </h3>
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
            <span className="text-sm text-gray-600">Perplexity AI</span>
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

      {!insights && !loading && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-brain-line text-2xl text-purple-600"></i>
          </div>
          <p className="text-gray-600 mb-4">Get AI-powered insights from your A/B test data</p>
          <button
            onClick={analyzeData}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 whitespace-nowrap cursor-pointer"
          >
            Analyze with AI
          </button>
        </div>
      )}

      {loading && (
        <div className="text-center py-8">
          <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Perplexity AI is analyzing your data...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <div className="flex items-center">
            <i className="ri-error-warning-line text-red-600 mr-2"></i>
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        </div>
      )}

      {insights && (
        <div className="space-y-4">
          {/* Winner Section */}
          <div className={`p-4 rounded-lg border-2 ${getWinnerBg(insights.winner)}`}>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-lg">Test Winner</h4>
              <span className={`text-2xl font-bold ${getWinnerColor(insights.winner)}`}>
                Variant {insights.winner.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2 mr-3">
                <div 
                  className="bg-purple-600 h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${insights.confidence}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-600">
                {insights.confidence}% confidence
              </span>
            </div>
          </div>

          {/* Key Findings */}
          <div>
            <h4 className="font-bold text-gray-900 mb-3 flex items-center">
              <i className="ri-lightbulb-line text-yellow-500 mr-2"></i>
              Key Findings
            </h4>
            <ul className="space-y-2">
              {insights.keyFindings.map((finding, index) => (
                <li key={index} className="flex items-start">
                  <i className="ri-check-line text-green-500 mr-2 mt-0.5"></i>
                  <span className="text-sm text-gray-700">{finding}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recommendations */}
          <div>
            <h4 className="font-bold text-gray-900 mb-3 flex items-center">
              <i className="ri-rocket-line text-blue-500 mr-2"></i>
              AI Recommendations
            </h4>
            <ul className="space-y-2">
              {insights.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start">
                  <i className="ri-arrow-right-line text-blue-500 mr-2 mt-0.5"></i>
                  <span className="text-sm text-gray-700">{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4 border-t">
            <button
              onClick={analyzeData}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 whitespace-nowrap cursor-pointer"
            >
              <i className="ri-refresh-line mr-1"></i>
              Re-analyze
            </button>
            <button
              onClick={() => getOptimizationSuggestions(insights.winner === 'A' ? 'A' : 'B')}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 whitespace-nowrap cursor-pointer"
            >
              <i className="ri-magic-line mr-1"></i>
              Get Tips
            </button>
          </div>

          {/* Test Conversion Buttons */}
          <div className="pt-4 border-t">
            <h4 className="font-bold text-gray-900 mb-3 flex items-center">
              <i className="ri-test-tube-line text-orange-500 mr-2"></i>
              Test Conversions
            </h4>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  const tracker = AnalyticsTracker.getInstance();
                  tracker.trackConversion('A', 'test_conversion');
                  alert('✅ Conversion tracked for Variant A!');
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer"
              >
                Test A
              </button>
              <button
                onClick={() => {
                  const tracker = AnalyticsTracker.getInstance();
                  tracker.trackConversion('B', 'test_conversion');
                  alert('✅ Conversion tracked for Variant B!');
                }}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer"
              >
                Test B
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Optimization Suggestions Modal */}
      {showSuggestions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4 max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">AI Optimization Tips</h3>
              <button
                onClick={() => setShowSuggestions(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="ri-close-line w-5 h-5"></i>
              </button>
            </div>
            <ul className="space-y-3">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-xs font-bold text-purple-600">{index + 1}</span>
                  </div>
                  <span className="text-sm text-gray-700">{suggestion}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setShowSuggestions(false)}
              className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              Got it!
            </button>
          </div>
        </div>
      )}

      <div className="text-xs text-gray-500 text-center mt-4 pt-4 border-t">
        <p>Powered by Perplexity AI • Real-time Analysis</p>
        <p suppressHydrationWarning={true}>Last updated: {new Date().toLocaleTimeString()}</p>
      </div>
    </div>
  );
}
