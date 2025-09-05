// Using direct API calls instead of SDK

export interface AITestInsights {
  winner: 'A' | 'B' | 'inconclusive';
  confidence: number;
  keyFindings: string[];
  recommendations: string[];
  heatmapAnalysis: string;
  conversionAnalysis: string;
}

export interface HeatmapData {
  x: number;
  y: number;
  intensity: number;
  timestamp: number;
  element?: string;
  variant?: 'A' | 'B';
}

export class AIAnalyticsService {
  constructor() {
    console.log('🤖 AIAnalyticsService initialized - using secure server-side API');
  }

  async analyzeABTest(
    variantAStats: { visitors: number; conversions: number },
    variantBStats: { visitors: number; conversions: number },
    heatmapData: HeatmapData[]
  ): Promise<AITestInsights> {

    const conversionRateA =
      variantAStats.visitors > 0
        ? ((variantAStats.conversions / variantAStats.visitors) * 100).toFixed(2)
        : '0.00';

    const conversionRateB =
      variantBStats.visitors > 0
        ? ((variantBStats.conversions / variantBStats.visitors) * 100).toFixed(2)
        : '0.00';

    // Analyze heatmap patterns
    console.log('🤖 AI Service received heatmap data:', heatmapData);
    const heatmapAnalysis = this.analyzeHeatmapPatterns(heatmapData);
    console.log('📈 Generated heatmap analysis:', heatmapAnalysis);

    const prompt = `
You are an expert UX/UI analyst specializing in heatmap data analysis. Analyze this A/B test data and provide actionable insights:

A/B TEST DATA:
- Variant A: ${variantAStats.visitors} visitors, ${variantAStats.conversions} conversions (${conversionRateA}% conversion rate)
- Variant B: ${variantBStats.visitors} visitors, ${variantBStats.conversions} conversions (${conversionRateB}% conversion rate)

HEATMAP DATA ANALYSIS:
${heatmapAnalysis}

FOCUS ON HEATMAP INSIGHTS:
- Where are users clicking most? (hotspots)
- What elements are getting the most attention?
- Are there any dead zones (areas with no clicks)?
- How does user behavior differ between variants?
- What does the click pattern tell us about user intent?

Provide actionable insights based on the heatmap data patterns, not just conversion numbers.

Format your response as JSON with these exact keys:
{
  "winner": "A" | "B" | "inconclusive",
  "confidence": number,
  "keyFindings": ["heatmap finding 1", "heatmap finding 2", "heatmap finding 3"],
  "recommendations": ["specific UI/UX recommendation 1", "specific UI/UX recommendation 2", "specific UI/UX recommendation 3"],
  "heatmapAnalysis": "detailed analysis of click patterns and user behavior",
  "conversionAnalysis": "analysis of why conversions are low and how heatmap data can help"
}
`;

    try {
      console.log('🚀 Calling secure server-side API with prompt:', prompt.substring(0, 200) + '...');
      
      // Call our secure API route
      const response = await fetch('/api/perplexity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          maxTokens: 1000,
          temperature: 0.1,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API call failed: ${response.status} - ${errorData.error}`);
      }

      const data = await response.json();
      console.log('✅ Secure API Response received');

      const text = data.choices[0]?.message?.content;
      if (!text) {
        throw new Error('No response content from API');
      }

      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const result = JSON.parse(jsonMatch[0]);
        console.log('🎯 Parsed AI Insights:', result);
        return result;
      }

      throw new Error('No valid JSON found in response');
    } catch (error) {
      console.error('❌ Secure API Error:', error);
      console.log('🔄 Falling back to basic insights');
      return this.getFallbackInsights(variantAStats, variantBStats);
    }
  }

  private analyzeHeatmapPatterns(heatmapData: HeatmapData[]): string {
    if (heatmapData.length === 0) {
      return 'No heatmap data available yet.';
    }

    const variantAData = heatmapData.filter((d) => d.variant === 'A');
    const variantBData = heatmapData.filter((d) => d.variant === 'B');

    // Find hotspots (areas with high intensity)
    const hotspots = heatmapData
      .filter((d) => d.intensity > 2)
      .sort((a, b) => b.intensity - a.intensity)
      .slice(0, 10);

    // Analyze click distribution
    const topHalf = heatmapData.filter(d => d.y < 400); // Above fold
    const bottomHalf = heatmapData.filter(d => d.y >= 400); // Below fold
    const leftSide = heatmapData.filter(d => d.x < 400); // Left side
    const rightSide = heatmapData.filter(d => d.x >= 400); // Right side

    // Find dead zones (areas with no clicks)
    const deadZones = this.findDeadZones(heatmapData);

    return `
DETAILED HEATMAP ANALYSIS:
- Total clicks tracked: ${heatmapData.length}
- Variant A clicks: ${variantAData.length} (${((variantAData.length / heatmapData.length) * 100).toFixed(1)}%)
- Variant B clicks: ${variantBData.length} (${((variantBData.length / heatmapData.length) * 100).toFixed(1)}%)

CLICK DISTRIBUTION:
- Above fold clicks: ${topHalf.length} (${((topHalf.length / heatmapData.length) * 100).toFixed(1)}%)
- Below fold clicks: ${bottomHalf.length} (${((bottomHalf.length / heatmapData.length) * 100).toFixed(1)}%)
- Left side clicks: ${leftSide.length} (${((leftSide.length / heatmapData.length) * 100).toFixed(1)}%)
- Right side clicks: ${rightSide.length} (${((rightSide.length / heatmapData.length) * 100).toFixed(1)}%)

TOP HOTSPOTS (High Engagement Areas):
${hotspots.map((h, i) => `${i + 1}. Position (${h.x}, ${h.y}) - Intensity: ${h.intensity} clicks`).join('\n')}

DEAD ZONES (No Clicks):
${deadZones.length > 0 ? deadZones.map(zone => `- ${zone}`).join('\n') : 'No significant dead zones detected'}

AVERAGE CLICK INTENSITY: ${(heatmapData.reduce((sum, d) => sum + d.intensity, 0) / heatmapData.length).toFixed(2)}
MAX INTENSITY: ${Math.max(...heatmapData.map(d => d.intensity))}
MIN INTENSITY: ${Math.min(...heatmapData.map(d => d.intensity))}
`;
  }

  private findDeadZones(heatmapData: HeatmapData[]): string[] {
    const zones: string[] = [];
    const gridSize = 200; // 200px grid
    
    // Check common areas for dead zones
    const commonAreas = [
      { name: 'Top-left corner', x: [0, 200], y: [0, 200] },
      { name: 'Top-right corner', x: [600, 800], y: [0, 200] },
      { name: 'Bottom-left corner', x: [0, 200], y: [400, 600] },
      { name: 'Bottom-right corner', x: [600, 800], y: [400, 600] },
      { name: 'Center area', x: [300, 500], y: [200, 400] }
    ];

    commonAreas.forEach(area => {
      const clicksInArea = heatmapData.filter(d => 
        d.x >= area.x[0] && d.x <= area.x[1] && 
        d.y >= area.y[0] && d.y <= area.y[1]
      );
      
      if (clicksInArea.length === 0) {
        zones.push(area.name);
      }
    });

    return zones;
  }

  private getFallbackInsights(
    variantAStats: { visitors: number; conversions: number },
    variantBStats: { visitors: number; conversions: number }
  ): AITestInsights {
    const conversionRateA =
      variantAStats.visitors > 0
        ? (variantAStats.conversions / variantAStats.visitors) * 100
        : 0;

    const conversionRateB =
      variantBStats.visitors > 0
        ? (variantBStats.conversions / variantBStats.visitors) * 100
        : 0;

    let winner: 'A' | 'B' | 'inconclusive' = 'inconclusive';
    let confidence = 0;

    if (Math.abs(conversionRateA - conversionRateB) > 1) {
      winner = conversionRateA > conversionRateB ? 'A' : 'B';
      confidence = Math.min(
        Math.abs(conversionRateA - conversionRateB) * 10,
        95
      );
    }

    return {
      winner,
      confidence,
      keyFindings: [
        `Variant A conversion rate: ${conversionRateA.toFixed(2)}%`,
        `Variant B conversion rate: ${conversionRateB.toFixed(2)}%`,
        `Total visitors: ${variantAStats.visitors + variantBStats.visitors}`,
        `Total conversions: ${
          variantAStats.conversions + variantBStats.conversions
        }`,
      ],
      recommendations: [
        'Collect more data for statistical significance',
        'Test different CTA button colors',
        'Optimize above-the-fold content',
        'A/B test different headlines',
        'Improve mobile responsiveness',
      ],
      heatmapAnalysis:
        'AI analysis temporarily unavailable. Collecting more heatmap data...',
      conversionAnalysis:
        'AI analysis temporarily unavailable. Please check back later.',
    };
  }

  async generateOptimizationSuggestions(
    variant: 'A' | 'B'
  ): Promise<string[]> {

    const prompt = `
You are a conversion optimization expert. Provide 5 specific, actionable suggestions to improve conversion rates for a landing page variant ${variant}.

Focus on:
- UI/UX improvements
- Copy optimization
- Technical optimizations
- Psychological triggers
- Mobile experience

Return as a JSON array of strings: ["suggestion1", "suggestion2", ...]
`;

    try {
      const response = await fetch('/api/perplexity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          maxTokens: 500,
          temperature: 0.1,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API call failed: ${response.status} - ${errorData.error}`);
      }

      const data = await response.json();
      const text = data.choices[0]?.message?.content;

      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (error) {
      console.error('Secure API Suggestions Error:', error);
    }

    return [
      'Optimize CTA button placement',
      'Test different color schemes',
      'Improve page loading speed',
      'Add social proof elements',
      'Simplify the conversion funnel',
    ];
  }
}
