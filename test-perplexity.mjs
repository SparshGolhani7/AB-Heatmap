// Simple test script to verify Perplexity API integration
// Run with: node test-perplexity.js

import { perplexity } from '@ai-sdk/perplexity';
import { generateText } from 'ai';

async function testPerplexityAPI() {
  try {
    console.log('🧪 Testing Perplexity API integration...');
    
    const { text } = await generateText({
      model: perplexity('sonar-pro'),
      prompt: 'Analyze this A/B test data: Variant A has 100 visitors and 5 conversions (5% rate), Variant B has 120 visitors and 8 conversions (6.67% rate). Which variant is winning and why?',
      maxTokens: 500,
      temperature: 0.1,
      apiKey: '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'
    });
    
    console.log('✅ Perplexity API Response:');
    console.log('📊 Analysis:', text);
    console.log('\n🎉 API integration working perfectly!');
    
  } catch (error) {
    console.error('❌ API Test Failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Check if your API key is valid');
    console.log('2. Ensure you have credits in your Perplexity account');
    console.log('3. Verify network connectivity');
    console.log('4. Make sure NEXT_PUBLIC_PERPLEXITY_API_KEY is set in .env.local');
  }
}

// Run the test
testPerplexityAPI();
