
'use client';

import Link from 'next/link';
import { AnalyticsTracker } from '@/lib/analytics';

export default function VariantB() {
  const tracker = AnalyticsTracker.getInstance();

  const handleConversion = (type: string) => {
    tracker.trackConversion('B', type);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="font-['Pacifico'] text-2xl text-green-600">logo</div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-green-600 font-medium">Features</a>
              <a href="#pricing" className="text-gray-700 hover:text-green-600 font-medium">Pricing</a>
              <a href="#testimonials" className="text-gray-700 hover:text-green-600 font-medium">Reviews</a>
              <button className="text-gray-700 hover:text-green-600 font-medium">Login</button>
              <button 
                onClick={() => handleConversion('nav_signup')}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 whitespace-nowrap cursor-pointer"
              >
                Sign Up Free
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="py-20 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <div className="w-4 h-4 mr-2 flex items-center justify-center">
                  <i className="ri-medal-line"></i>
                </div>
                #1 Business Platform 2024
              </div>
              <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Grow Your Business
                <span className="text-green-600 block">10x Faster</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                The all-in-one platform trusted by 100,000+ businesses worldwide. Automate workflows, analyze data, and scale your operations with our intelligent business suite.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button 
                  onClick={() => handleConversion('primary_cta')}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap cursor-pointer flex items-center justify-center"
                >
                  Get Started Free
                  <div className="w-5 h-5 ml-2 flex items-center justify-center">
                    <i className="ri-arrow-right-line"></i>
                  </div>
                </button>
                <button 
                  onClick={() => handleConversion('secondary_cta')}
                  className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer flex items-center justify-center"
                >
                  <div className="w-5 h-5 mr-2 flex items-center justify-center">
                    <i className="ri-calendar-line"></i>
                  </div>
                  Book Demo
                </button>
              </div>
              
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <div className="w-4 h-4 text-green-600 mr-1 flex items-center justify-center">
                    <i className="ri-check-line"></i>
                  </div>
                  No setup fees
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 text-green-600 mr-1 flex items-center justify-center">
                    <i className="ri-check-line"></i>
                  </div>
                  14-day free trial
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 text-green-600 mr-1 flex items-center justify-center">
                    <i className="ri-check-line"></i>
                  </div>
                  Cancel anytime
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div 
                className="w-full h-96 lg:h-[500px] rounded-2xl shadow-2xl bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://readdy.ai/api/search-image?query=Modern%20business%20dashboard%20analytics%20interface%20showing%20growth%20charts%20and%20metrics%2C%20clean%20professional%20UI%20design%2C%20data%20visualization%20screens%2C%20productivity%20software%20concept%2C%20bright%20minimalist%20workspace%20environment&width=800&height=600&seq=hero-dashboard-variant-b&orientation=landscape')`
                }}
              ></div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl">
                <div className="text-2xl font-bold text-green-600">+347%</div>
                <div className="text-sm text-gray-600">Revenue Growth</div>
              </div>
              <div className="absolute -top-6 -right-6 bg-white p-6 rounded-xl shadow-xl">
                <div className="text-2xl font-bold text-blue-600">100K+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logo Carousel */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-gray-500 mb-8">Trusted by leading companies worldwide</p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center opacity-50">
            {['Shopify', 'Slack', 'Zoom', 'Dropbox', 'Stripe', 'Mailchimp'].map((company, index) => (
              <div key={index} className="text-center font-bold text-gray-600 text-lg">
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive tools and features designed to streamline your business operations and accelerate growth.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "ri-line-chart-line",
                title: "Advanced Analytics",
                description: "Real-time insights and detailed reports to make data-driven decisions."
              },
              {
                icon: "ri-team-line",
                title: "Team Collaboration",
                description: "Built-in tools for seamless team communication and project management."
              },
              {
                icon: "ri-shield-check-line",
                title: "Enterprise Security",
                description: "Bank-grade security with end-to-end encryption and compliance."
              },
              {
                icon: "ri-smartphone-line",
                title: "Mobile App",
                description: "Full-featured mobile apps for iOS and Android to work anywhere."
              },
              {
                icon: "ri-api-line",
                title: "Powerful API",
                description: "Robust API and 500+ integrations with your favorite tools."
              },
              {
                icon: "ri-customer-service-2-line",
                title: "24/7 Support",
                description: "Round-the-clock expert support to help you succeed."
              },
              {
                icon: "ri-rocket-line",
                title: "Fast Performance",
                description: "Lightning-fast platform built for scale and reliability."
              },
              {
                icon: "ri-bar-chart-box-line",
                title: "Custom Reports",
                description: "Create custom dashboards and reports tailored to your needs."
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 text-green-600 flex items-center justify-center">
                    <i className={feature.icon}></i>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div id="pricing" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Choose the perfect plan for your business needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Starter",
                price: "$29",
                description: "Perfect for small teams getting started",
                features: ["Up to 10 users", "Basic analytics", "Email support", "5GB storage", "Mobile app access"]
              },
              {
                name: "Professional",
                price: "$79",
                popular: true,
                description: "Best for growing businesses",
                features: ["Up to 50 users", "Advanced analytics", "Priority support", "100GB storage", "API access", "Custom integrations"]
              },
              {
                name: "Enterprise",
                price: "$199",
                description: "For large organizations",
                features: ["Unlimited users", "Premium analytics", "24/7 phone support", "Unlimited storage", "Custom features", "Dedicated manager"]
              }
            ].map((plan, index) => (
              <div key={index} className={`bg-white p-8 rounded-2xl shadow-lg ${plan.popular ? 'ring-2 ring-green-600 relative' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-green-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    {plan.price}
                    <span className="text-xl text-gray-500">/month</span>
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <div className="w-5 h-5 text-green-600 mr-3 flex items-center justify-center">
                        <i className="ri-check-line"></i>
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => handleConversion('pricing_' + plan.name.toLowerCase())}
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-colors duration-200 whitespace-nowrap cursor-pointer ${
                    plan.popular 
                      ? 'bg-green-600 hover:bg-green-700 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div id="testimonials" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Loved by Businesses Everywhere
            </h2>
            <p className="text-xl text-gray-600">
              See what our customers have to say about their experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: "Alex Thompson",
                role: "Founder, TechStart",
                content: "Game-changer for our startup. We scaled from 5 to 50 employees using this platform. The automation features saved us countless hours.",
                avatar: "AT",
                rating: 5
              },
              {
                name: "Maria Garcia",
                role: "Operations Director, RetailCorp",
                content: "Incredible ROI. We increased efficiency by 300% and reduced operational costs significantly. Best business investment we've made.",
                avatar: "MG",
                rating: 5
              },
              {
                name: "David Kim",
                role: "CEO, GrowthLabs",
                content: "The analytics insights are phenomenal. We discovered growth opportunities we never knew existed. Highly recommend to any serious business.",
                avatar: "DK",
                rating: 5
              },
              {
                name: "Lisa Chen",
                role: "Marketing Manager, BrandCo",
                content: "Outstanding platform with excellent support. The team collaboration features transformed how we work together across departments.",
                avatar: "LC",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-2xl">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <div key={i} className="w-5 h-5 text-yellow-400 flex items-center justify-center">
                      <i className="ri-star-fill"></i>
                    </div>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-24 bg-green-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join 100,000+ businesses already growing with our platform
          </p>
          <button 
            onClick={() => handleConversion('final_cta')}
            className="bg-white text-green-600 hover:bg-gray-100 px-12 py-4 rounded-xl text-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap cursor-pointer flex items-center mx-auto"
          >
            Start Your Free Trial
            <div className="w-6 h-6 ml-3 flex items-center justify-center">
              <i className="ri-arrow-right-line"></i>
            </div>
          </button>
          <p className="text-sm mt-4 opacity-75">
            No credit card required • Setup in under 5 minutes
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="font-['Pacifico'] text-2xl text-green-400 mb-4">logo</div>
              <p className="text-gray-400 mb-4">
                The all-in-one business platform trusted by companies worldwide.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Integrations</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Community</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Status</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Your Company. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
