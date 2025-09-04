import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Log analytics data (you can integrate with your preferred analytics service)
    console.log('Analytics Event:', {
      event: body.event,
      data: body.data,
      timestamp: body.timestamp,
      userAgent: request.headers.get('user-agent'),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
    });

    // Here you could integrate with:
    // - Google Analytics 4
    // - Mixpanel
    // - Amplitude
    // - Custom database
    // - Webhook to external service

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process analytics data' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Analytics API is running',
    endpoints: {
      POST: '/api/analytics - Send analytics events'
    }
  });
}
