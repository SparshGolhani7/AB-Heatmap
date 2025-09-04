
'use client';

import Link from 'next/link';
import { AnalyticsTracker } from '@/lib/analytics';

export default function VariantA() {
  const tracker = AnalyticsTracker.getInstance();

  const handleConversion = (type: string) => {
    tracker.trackConversion('A', type);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div 
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.8), rgba(99, 102, 241, 0.8)), url('https://readdy.ai/api/search-image?query=Modern%20business%20professional%20working%20on%20laptop%20in%20bright%20office%20space%20with%20large%20windows%2C%20clean%20minimalist%20design%2C%20soft%20natural%20lighting%2C%20productivity%20and%20success%20theme%2C%20corporate%20environment%20background&width=1920&height=1080&seq=hero-variant-a&orientation=landscape')`
        }}
      >
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="text-center text-white">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              Transform Your 
              <span className="text-yellow-300 block">Business Today</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
              Join 50,000+ companies using our revolutionary platform to boost productivity by 300% and increase revenue streams through intelligent automation and data-driven insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button 
                onClick={() => handleConversion('primary_cta')}
                className="bg-yellow-400 hover:bg-yellow-500 text-black px-12 py-4 rounded-full text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl whitespace-nowrap cursor-pointer flex items-center"
              >
                <i className="ri-rocket-line w-6 h-6 mr-3 flex items-center justify-center"></i>
                Start Free Trial
              </button>
              <button 
                onClick={() => handleConversion('secondary_cta')}
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-12 py-4 rounded-full text-xl font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer flex items-center"
              >
                <i className="ri-play-circle-line w-6 h-6 mr-3 flex items-center justify-center"></i>
                Watch Demo
              </button>
            </div>
            <div className="mt-12 flex items-center justify-center gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">50K+</div>
                <div className="text-sm opacity-75">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">99.9%</div>
                <div className="text-sm opacity-75">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">24/7</div>
                <div className="text-sm opacity-75">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Why Industry Leaders Choose Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the powerful features that make us the #1 choice for forward-thinking businesses worldwide.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div 
                className="w-32 h-32 mx-auto mb-8 rounded-2xl bg-cover bg-center shadow-2xl"
                style={{
                  backgroundImage: `url('https://readdy.ai/api/search-image?query=AI%20artificial%20intelligence%20brain%20neural%20network%20glowing%20blue%20digital%20technology%20innovation%20abstract%20concept%2C%20futuristic%20machine%20learning%20visualization%2C%20clean%20minimal%20background&width=400&height=400&seq=feature-ai-variant-a&orientation=squarish')`
                }}
              ></div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">AI-Powered Analytics</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Advanced machine learning algorithms analyze your data in real-time, providing actionable insights that drive growth and optimize performance across all business metrics.
              </p>
            </div>
            
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div 
                className="w-32 h-32 mx-auto mb-8 rounded-2xl bg-cover bg-center shadow-2xl"
                style={{
                  backgroundImage: `url('https://readdy.ai/api/search-image?query=Cloud%20computing%20security%20shield%20protection%20data%20encryption%20cybersecurity%20concept%2C%20digital%20fortress%20safeguarding%20information%2C%20professional%20tech%20illustration%2C%20blue%20gradient%20background&width=400&height=400&seq=feature-security-variant-a&orientation=squarish')`
                }}
              ></div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Enterprise Security</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Bank-level encryption and multi-layer security protocols ensure your sensitive data remains protected with 99.99% security uptime and compliance with international standards.
              </p>
            </div>
            
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div 
                className="w-32 h-32 mx-auto mb-8 rounded-2xl bg-cover bg-center shadow-2xl"
                style={{
                  backgroundImage: `url('https://readdy.ai/api/search-image?query=Team%20collaboration%20workspace%20multiple%20people%20working%20together%20on%20projects%2C%20diverse%20professionals%20brainstorming%2C%20modern%20office%20teamwork%20environment%2C%20productivity%20and%20communication%20concept&width=400&height=400&seq=feature-collab-variant-a&orientation=squarish')`
                }}
              ></div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Seamless Integration</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Connect with 500+ tools and platforms instantly. Our robust API ecosystem ensures smooth workflows and eliminates data silos for maximum operational efficiency.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by Industry Giants</h2>
            <p className="text-xl text-gray-600">Join thousands of satisfied customers worldwide</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            {['Google', 'Microsoft', 'Amazon', 'Tesla', 'Apple', 'Netflix', 'Spotify', 'Adobe'].map((company, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-gray-700">{company}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">What Our Customers Say</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "CEO, TechCorp",
                content: "This platform revolutionized our operations. We saw 400% growth in just 6 months. The AI insights are incredibly accurate and actionable.",
                rating: 5
              },
              {
                name: "Michael Chen",
                role: "CTO, Innovation Labs",
                content: "The best investment we've made. Security is top-notch and integration was seamless. Our team productivity increased by 250%.",
                rating: 5
              },
              {
                name: "Emily Rodriguez",
                role: "VP Marketing, GrowthCo",
                content: "Outstanding results! The analytics helped us optimize our campaigns and increase ROI by 300%. Highly recommend to any serious business.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <div key={i} className="w-5 h-5 flex items-center justify-center">
                      <i className="ri-star-fill text-yellow-400"></i>
                    </div>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">"{testimonial.content}"</p>
                <div>
                  <div className="font-bold text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join 50,000+ companies already using our platform. Start your free trial today.
          </p>
          <button 
            onClick={() => handleConversion('final_cta')}
            className="bg-yellow-400 hover:bg-yellow-500 text-black px-12 py-4 rounded-full text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl whitespace-nowrap cursor-pointer flex items-center mx-auto"
          >
            <div className="w-6 h-6 mr-3 flex items-center justify-center">
              <i className="ri-arrow-right-line"></i>
            </div>
            Get Started Free
          </button>
          <p className="text-sm mt-4 opacity-75">No credit card required • 14-day free trial • Cancel anytime</p>
        </div>
      </div>
    </div>
  );
}
