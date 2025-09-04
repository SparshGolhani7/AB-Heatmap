# 🤖 Anthropic Claude AI Integration Setup

## 🆓 Free API Access

**Yes! Anthropic offers free API credits for new users!**

- **Free Credits**: New users get free API credits to test and develop
- **Tier System**: After using free credits, you can purchase more
- **Cost-Effective**: Using Claude Haiku model for analytics (very affordable)

## 🚀 Quick Setup

### 1. Get Your API Key
1. Go to [Anthropic Console](https://console.anthropic.com/)
2. Sign up for a free account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key (starts with `sk-ant-...`)

### 2. Add Environment Variable
Create a `.env.local` file in your project root:

```bash
# Anthropic Claude API Key
NEXT_PUBLIC_ANTHROPIC_API_KEY=sk-ant-your-api-key-here
```

### 3. Install Dependencies
```bash
npm install @anthropic-ai/sdk
```

### 4. Start Using AI Analytics!
The AI Analytics Dashboard will automatically appear in the top-right corner of your A/B testing platform.

## 🎯 What You Get

### AI-Powered Features:
- **Smart A/B Test Analysis**: Claude analyzes your test data and determines the winner
- **Confidence Scoring**: AI provides confidence levels for test results
- **Key Findings**: Automated insights from your data
- **Optimization Recommendations**: AI suggests specific improvements
- **Heatmap Analysis**: Intelligent interpretation of user behavior
- **Conversion Analysis**: Deep dive into conversion funnel performance

### Example AI Insights:
```
🏆 Winner: Variant B (87% confidence)
📊 Key Findings:
- Variant B has 23% higher conversion rate
- Users spend 40% more time on Variant B
- CTA button placement is more effective in Variant B

🚀 Recommendations:
- Test green CTA buttons on Variant A
- Move testimonials above the fold
- Optimize mobile layout for better engagement
```

## 💰 Cost Breakdown

- **Claude Haiku**: ~$0.25 per 1M input tokens, ~$1.25 per 1M output tokens
- **Typical Analysis**: ~$0.001-0.005 per analysis
- **Free Tier**: Usually covers 100+ analyses for free

## 🔧 Advanced Configuration

### Custom Models
You can switch to more powerful models in `lib/ai-analytics.ts`:

```typescript
// For more detailed analysis (higher cost)
model: 'claude-3-sonnet-20240229'

// For fastest analysis (lowest cost)
model: 'claude-3-haiku-20240307' // Default
```

### Custom Prompts
Modify the analysis prompts in `lib/ai-analytics.ts` to focus on specific metrics or business goals.

## 🛡️ Security Notes

- API key is stored in environment variables (secure)
- No sensitive data is sent to Anthropic
- All analysis happens server-side
- Fallback insights provided if API is unavailable

## 🎉 Ready to Go!

Once you add your API key, the AI Analytics Dashboard will:
1. ✅ Appear in the top-right corner
2. ✅ Analyze your A/B test data with Claude
3. ✅ Provide intelligent insights and recommendations
4. ✅ Update in real-time as you collect more data

**Your A/B testing platform is now powered by AI! 🚀**
