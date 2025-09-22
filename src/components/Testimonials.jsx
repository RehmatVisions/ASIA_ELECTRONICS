import React from 'react';
import { motion } from 'framer-motion';

const Testimonials = () => {
  // Sample testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Tech Enthusiast",
      location: "New York, USA",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b29c?w=150&h=150&fit=crop&crop=face",
      review: "Amazing quality products and lightning-fast delivery! The customer service team went above and beyond to help me choose the perfect laptop.",
      rating: 5,
      verified: true
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Software Developer",
      location: "San Francisco, USA",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      review: "Best tech store online! Ordered my gaming setup and everything arrived perfectly packaged. The deals are unbeatable and shipping was free.",
      rating: 5,
      verified: true
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Content Creator",
      location: "Los Angeles, USA",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      review: "Love shopping here! The product descriptions are detailed and accurate. My camera equipment was exactly as described and arrived in pristine condition.",
      rating: 5,
      verified: true
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Business Owner",
      location: "London, UK",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      review: "Exceptional service and premium quality products. The team helped me set up our entire office with the latest tech. Highly recommended!",
      rating: 5,
      verified: true
    },
    {
      id: 5,
      name: "Jessica Park",
      role: "Digital Designer",
      location: "Toronto, Canada",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      review: "The user experience on this site is fantastic! Easy to navigate, secure checkout, and my MacBook Pro arrived faster than expected.",
      rating: 5,
      verified: true
    },
    {
      id: 6,
      name: "Alex Kumar",
      role: "Student",
      location: "Mumbai, India",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      review: "Great prices for students! Got my tablet and accessories with amazing discounts. Customer support was patient and helped me track my order.",
      rating: 4,
      verified: true
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const headerVariants = {
    hidden: { 
      opacity: 0, 
      y: -30 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  // Function to render star rating
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <motion.span
        key={index}
        className={`text-lg ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          delay: 0.5 + index * 0.1,
          duration: 0.3,
          type: "spring",
          stiffness: 200
        }}
      >
        ⭐
      </motion.span>
    ));
  };

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <motion.div 
          className="text-center mb-20"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
            What Our
            <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Customers Say
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Trusted by thousands of happy shoppers worldwide. Here's what our customers 
            have to say about their experience with us.
          </p>
          
          {/* Trust indicators */}
          <div className="flex items-center justify-center gap-8 mt-8 text-slate-500">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⭐</span>
              <span className="font-semibold">4.9/5</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span className="font-semibold">10,000+ Reviews</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-500">🛡️</span>
              <span className="font-semibold">Verified Purchases</span>
            </div>
          </div>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={cardVariants}
              className="group relative"
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
            >
              {/* Main Card */}
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 group-hover:border-slate-200 h-full">
                
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 text-4xl text-blue-200 group-hover:text-blue-300 transition-colors duration-300">
                  "
                </div>

                {/* Customer Info */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                      loading="lazy"
                    />
                    {testimonial.verified && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors duration-300">
                      {testimonial.name}
                    </h4>
                    <p className="text-slate-600 text-sm">
                      {testimonial.role}
                    </p>
                    <p className="text-slate-500 text-xs">
                      📍 {testimonial.location}
                    </p>
                  </div>
                </div>

                {/* Review Text */}
                <blockquote className="text-slate-700 text-base leading-relaxed mb-6 italic">
                  "{testimonial.review}"
                </blockquote>

                {/* Rating */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {renderStars(testimonial.rating)}
                  </div>
                  {testimonial.verified && (
                    <span className="text-xs text-green-600 font-semibold bg-green-50 px-2 py-1 rounded-full">
                      Verified Purchase
                    </span>
                  )}
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>

              {/* External Glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/20 via-indigo-400/20 to-purple-400/20 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500 -z-10"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-slate-600 mb-6">
            Join thousands of satisfied customers today!
          </p>
          <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 hover:scale-105 hover:shadow-xl">
            <span className="flex items-center gap-2">
              Start Shopping
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
