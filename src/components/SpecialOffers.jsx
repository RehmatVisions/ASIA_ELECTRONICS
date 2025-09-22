import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const SpecialOffers = () => {
  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30
  });

  // Countdown timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        let { hours, minutes, seconds } = prevTime;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          seconds = 59;
          minutes--;
        } else if (hours > 0) {
          seconds = 59;
          minutes = 59;
          hours--;
        } else {
          // Reset timer when it reaches 00:00:00
          return { hours: 23, minutes: 59, seconds: 59 };
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Animation variants
  const bannerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  };

  const headingVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  const subheadingVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.3,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 0.5,
        ease: "easeOut"
      }
    }
  };

  const timerVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.4,
        ease: "easeOut"
      }
    }
  };

  // Background gradient animation
  const backgroundVariants = {
    animate: {
      background: [
        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      ],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-20">
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0"
        variants={backgroundVariants}
        animate="animate"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        }}
      />
      
      {/* Background overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-48 h-48 bg-white/10 rounded-full blur-xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        {/* Floating icons */}
        <motion.div 
          className="absolute top-1/4 left-1/4 text-4xl"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          ⚡
        </motion.div>
        <motion.div 
          className="absolute top-1/3 right-1/4 text-3xl"
          animate={{
            y: [0, 15, 0],
            rotate: [0, -10, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          🎉
        </motion.div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 max-w-6xl relative z-10">
        <motion.div 
          className="text-center"
          variants={bannerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Main Heading */}
          <motion.h2 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight"
            variants={headingVariants}
          >
            <span className="inline-block">🔥</span>
            <span className="block sm:inline"> Deals of the Day</span>
            <span className="block bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 bg-clip-text text-transparent drop-shadow-lg">
              Up to 50% OFF!
            </span>
          </motion.h2>

          {/* Subheading */}
          <motion.p 
            className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed"
            variants={subheadingVariants}
          >
            Limited-time offers you don't want to miss. Premium electronics at unbeatable prices.
            <span className="block mt-2 text-yellow-300 font-semibold">⏰ Hurry! Offer ends soon!</span>
          </motion.p>

          {/* Countdown Timer */}
          <motion.div 
            className="flex items-center justify-center gap-4 mb-10"
            variants={timerVariants}
          >
            <div className="text-white/80 text-lg font-semibold">Offer ends in:</div>
            <div className="flex items-center gap-2">
              {/* Hours */}
              <motion.div 
                className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/30"
                key={timeLeft.hours}
                initial={{ scale: 1.1, opacity: 0.8 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
                <div className="text-xs text-white/70 font-medium">HRS</div>
              </motion.div>
              
              <div className="text-white text-2xl font-bold">:</div>
              
              {/* Minutes */}
              <motion.div 
                className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/30"
                key={timeLeft.minutes}
                initial={{ scale: 1.1, opacity: 0.8 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
                <div className="text-xs text-white/70 font-medium">MIN</div>
              </motion.div>
              
              <div className="text-white text-2xl font-bold">:</div>
              
              {/* Seconds */}
              <motion.div 
                className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/30"
                key={timeLeft.seconds}
                initial={{ scale: 1.1, opacity: 0.8 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
                <div className="text-xs text-white/70 font-medium">SEC</div>
              </motion.div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            variants={buttonVariants}
          >
            <motion.div
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 25px 50px rgba(251, 146, 60, 0.5)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                to="/products"
                className="group relative px-10 py-5 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white font-bold text-lg rounded-2xl overflow-hidden shadow-2xl shadow-orange-500/30 inline-flex items-center justify-center"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  🛒 Shop Now
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-orange-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 blur-lg opacity-30 group-hover:opacity-60 transition-opacity duration-300 -z-10"></div>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ 
                scale: 1.05
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                to="/products"
                className="group relative px-10 py-5 border-2 border-white/40 text-white font-bold text-lg rounded-2xl backdrop-blur-sm bg-white/10 overflow-hidden shadow-2xl hover:border-white/80 hover:bg-white/20 transition-all duration-200 inline-flex items-center justify-center"
              >
                <span className="relative z-10 group-hover:text-yellow-300 transition-colors duration-300">
                  View All Deals
                </span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Additional offer details */}
          <motion.div 
            className="mt-10 flex flex-wrap justify-center gap-6 text-white/80"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span className="text-sm font-medium">Free Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span className="text-sm font-medium">30-Day Returns</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <span className="text-sm font-medium">24/7 Support</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SpecialOffers;
