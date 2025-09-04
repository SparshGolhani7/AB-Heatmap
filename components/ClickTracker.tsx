'use client';

import { useEffect, useRef } from 'react';
import { AnalyticsTracker } from '@/lib/analytics';

interface ClickTrackerProps {
  children: React.ReactNode;
  variant: 'A' | 'B';
}

export default function ClickTracker({ children, variant }: ClickTrackerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tracker = AnalyticsTracker.getInstance();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX;
      const y = e.clientY;
      
      // Get element that was clicked
      const element = (e.target as HTMLElement).tagName.toLowerCase();
      const elementClass = (e.target as HTMLElement).className;
      const elementId = (e.target as HTMLElement).id;
      
      const elementInfo = `${element}${elementClass ? '.' + elementClass.split(' ')[0] : ''}${elementId ? '#' + elementId : ''}`;
      
      tracker.trackClick(x, y, elementInfo, variant);
    };

    container.addEventListener('click', handleClick);
    
    return () => {
      container.removeEventListener('click', handleClick);
    };
  }, [variant, tracker]);

  return (
    <div ref={containerRef} className="min-h-screen">
      {children}
    </div>
  );
}