export class AnalyticsTracker {
  private static instance: AnalyticsTracker;
  private heatmapData: Array<{x: number, y: number, intensity: number, timestamp: number}> = [];
  
  static getInstance(): AnalyticsTracker {
    if (!AnalyticsTracker.instance) {
      AnalyticsTracker.instance = new AnalyticsTracker();
    }
    return AnalyticsTracker.instance;
  }

  // Track click events with coordinates
  trackClick(x: number, y: number, element: string, variant: 'A' | 'B') {
    const clickData = {
      x,
      y,
      intensity: 1,
      timestamp: Date.now(),
      element,
      variant,
      sessionId: this.getSessionId()
    };

    this.heatmapData.push(clickData);
    
    // Store in localStorage for persistence
    const existingData = localStorage.getItem('heatmap_data');
    const allData = existingData ? JSON.parse(existingData) : [];
    allData.push(clickData);
    localStorage.setItem('heatmap_data', JSON.stringify(allData));

    // Send to analytics service (replace with your preferred service)
    this.sendToAnalytics('click_tracked', clickData);
  }

  // Track conversion events
  trackConversion(variant: 'A' | 'B', conversionType: string) {
    const conversionData = {
      variant,
      conversionType,
      timestamp: Date.now(),
      sessionId: this.getSessionId()
    };

    // Store conversion in localStorage
    const existingConversions = localStorage.getItem('conversions');
    const conversions = existingConversions ? JSON.parse(existingConversions) : [];
    conversions.push(conversionData);
    localStorage.setItem('conversions', JSON.stringify(conversions));

    this.sendToAnalytics('conversion', conversionData);
    console.log(`🎯 Conversion tracked: ${conversionType} for Variant ${variant}`);
  }

  // Get heatmap data for visualization
  getHeatmapData(): Array<{x: number, y: number, intensity: number}> {
    const data = localStorage.getItem('heatmap_data');
    if (!data) return [];
    
    const parsed = JSON.parse(data);
    
    // Aggregate clicks by proximity (within 50px radius)
    const aggregated: {[key: string]: {x: number, y: number, intensity: number}} = {};
    
    parsed.forEach((click: any) => {
      const gridX = Math.floor(click.x / 50) * 50;
      const gridY = Math.floor(click.y / 50) * 50;
      const key = `${gridX}-${gridY}`;
      
      if (aggregated[key]) {
        aggregated[key].intensity += 1;
      } else {
        aggregated[key] = {
          x: gridX,
          y: gridY,
          intensity: 1
        };
      }
    });

    return Object.values(aggregated);
  }

  // Generate session ID
  private getSessionId(): string {
    let sessionId = localStorage.getItem('session_id');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('session_id', sessionId);
    }
    return sessionId;
  }

  // Send data to analytics service
  private sendToAnalytics(event: string, data: any) {
    // Integration with multiple analytics services
    
    // 1. Vercel Analytics
    if (typeof window !== 'undefined' && (window as any).va) {
      (window as any).va.track(event, data);
    }

    // 2. Custom API endpoint (you can create this)
    fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event,
        data,
        timestamp: Date.now()
      })
    }).catch(err => console.log('Analytics error:', err));

    // 3. Google Analytics (if you have gtag)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event, data);
    }
  }

  // Get A/B test statistics
  getABTestStats() {
    const data = localStorage.getItem('heatmap_data');
    const conversionsData = localStorage.getItem('conversions');
    
    if (!data) return { variantA: 0, variantB: 0, conversions: { A: 0, B: 0 } };
    
    const parsed = JSON.parse(data);
    const conversions = conversionsData ? JSON.parse(conversionsData) : [];
    
    const stats = {
      variantA: 0,
      variantB: 0,
      conversions: { A: 0, B: 0 }
    };

    // Count visitors (unique sessions per variant)
    const uniqueSessionsA = new Set();
    const uniqueSessionsB = new Set();
    
    parsed.forEach((item: any) => {
      if (item.variant === 'A') {
        uniqueSessionsA.add(item.sessionId);
      }
      if (item.variant === 'B') {
        uniqueSessionsB.add(item.sessionId);
      }
    });

    stats.variantA = uniqueSessionsA.size;
    stats.variantB = uniqueSessionsB.size;

    // Count conversions
    conversions.forEach((conversion: any) => {
      if (conversion.variant === 'A') stats.conversions.A++;
      if (conversion.variant === 'B') stats.conversions.B++;
    });

    return stats;
  }
}