import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => {
  // Optimized Animation variants - lightweight and fast
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1
      }
    }
  };

  const fadeInUp = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const fadeInUpDelayed = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.2,
        ease: "easeOut"
      }
    }
  };

  const slideInRight = {
    hidden: { 
      opacity: 0, 
      x: 30
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Simple gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-blue-900/90 to-indigo-900/95"></div>
      
      {/* Hero Content Container */}
      <motion.div 
        className="relative z-10 container mx-auto px-6 lg:px-8 max-w-7xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-screen py-20 lg:py-0">
          
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Main Headline */}
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
              variants={fadeInUp}
            >
              <span className="block">Discover the</span>
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
                Future of Tech
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p 
              className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0"
              variants={fadeInUpDelayed}
            >
              Experience premium electronics that blend cutting-edge innovation with elegant design. 
              Your gateway to tomorrow's technology, today.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4"
              variants={fadeInUpDelayed}
            >
              <Link
                to="/products"
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 hover:scale-105 hover:shadow-xl shadow-blue-500/25 inline-flex items-center justify-center"
              >
                <span className="flex items-center justify-center gap-2">
                  Shop Now
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>

              <Link
                to="/collections"
                className="px-8 py-4 border-2 border-slate-400 text-white font-semibold rounded-xl hover:border-blue-400 hover:text-blue-400 transition-all duration-200 hover:scale-105 inline-flex items-center justify-center"
              >
                Browse Collection
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="pt-8 grid grid-cols-3 gap-6 text-center lg:text-left"
              variants={fadeInUpDelayed}
            >
              <div>
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">1000+</div>
                <div className="text-sm text-slate-400">Products</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">50K+</div>
                <div className="text-sm text-slate-400">Customers</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">24/7</div>
                <div className="text-sm text-slate-400">Support</div>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Hero Image */}
          <motion.div 
            className="relative flex items-center justify-center"
            variants={slideInRight}
          >
            {/* Main Product Image Container */}
            <div className="relative max-w-lg w-full">
              {/* Hero Image Background */}
              <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-3xl p-8 backdrop-blur-sm border border-white/10 shadow-2xl">
                
                {/* Product Image Area */}
                <div className="relative w-full h-96 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 rounded-2xl flex items-center justify-center overflow-hidden">
                  
                  {/* Device Mockup - Simplified */}
                  <div className="w-48 h-80 bg-gradient-to-b from-slate-900 to-black rounded-3xl shadow-2xl border-4 border-slate-700 relative overflow-hidden">
                    {/* Screen */}
                    <div className="absolute inset-3 bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 rounded-2xl">
                      {/* Simple Interface */}
                      <div className="p-6 space-y-6">
                        {/* Header */}
                        <div className="flex justify-between items-center">
                          <div className="w-12 h-3 bg-white/30 rounded-full"></div>
                          <div className="flex gap-1">
                            <div className="w-1 h-1 bg-white/50 rounded-full"></div>
                            <div className="w-1 h-1 bg-white/50 rounded-full"></div>
                            <div className="w-1 h-1 bg-white/50 rounded-full"></div>
                          </div>
                        </div>
                        
                        {/* Content Grid */}
                        <div className="grid grid-cols-3 gap-4">
                          {[...Array(6)].map((_, i) => (
                            <div
                              key={i}
                              className="w-full h-12 bg-white/20 rounded-xl backdrop-blur-sm border border-white/30"
                            />
                          ))}
                        </div>
                        
                        {/* Bottom Bar */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-white/30 rounded-full"></div>
                      </div>
                    </div>
                    
                    {/* Device Details */}
                    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-20 h-2 bg-slate-800 rounded-full"></div>
                  </div>
                  
                  {/* Subtle Glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/5 to-pink-500/10 rounded-2xl"></div>
                </div>
                
                {/* Product Info */}
                <div className="text-center space-y-3 mt-6">
                  <h3 className="text-xl font-bold text-white">Premium Smartphone</h3>
                  <p className="text-slate-400">Latest innovation in mobile technology</p>
                  
                  {/* Price */}
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-2xl font-bold text-green-400">$299</span>
                    <span className="text-slate-500 line-through">$399</span>
                    <span className="px-2 py-1 bg-red-500/20 text-red-400 text-sm font-semibold rounded-full">
                      25% OFF
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Simple floating action buttons */}
              <div className="absolute -bottom-4 -right-4 flex gap-3">
                <button className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform duration-200">
                  🛒
                </button>
                <button className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform duration-200">
                  ❤️
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
