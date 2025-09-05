import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // Debug environment variable loading
  console.log("ENV CHECK:", process.env.PERPLEXITY_API_KEY ? "✅ Found" : "❌ Missing");
  
  try {
    const { prompt, maxTokens = 1000, temperature = 0.1 } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.PERPLEXITY_API_KEY;
    console.log('🔑 API Key exists?', !!apiKey);
    console.log('🔑 API Key (first 10 chars):', apiKey ? apiKey.substring(0, 10) + '...' : 'NOT FOUND');
    
    if (!apiKey) {
      console.error('❌ PERPLEXITY_API_KEY not found in environment variables');
      return NextResponse.json(
        { error: 'Perplexity API key not configured' },
        { status: 500 }
      );
    }

    console.log('🚀 Server-side Perplexity API call:', prompt.substring(0, 100) + '...');

    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'sonar-pro',
        messages: [
          { role: 'user', content: prompt }
        ],
        max_tokens: maxTokens,
        temperature: temperature,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Perplexity API Error:', response.status, errorText);
      return NextResponse.json(
        { error: `Perplexity API error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('✅ Perplexity API Response received');

    return NextResponse.json(data);
  } catch (error) {
    console.error('❌ Server API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
