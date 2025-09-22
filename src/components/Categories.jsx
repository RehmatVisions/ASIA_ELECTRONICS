import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Categories = () => {
  // Sample categories data
  const categories = [
    {
      id: 1,
      title: "Smartphones",
      subtitle: "Latest mobile technology",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=400&fit=crop&crop=center",
      productCount: "250+ Products",
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      id: 2,
      title: "Laptops & PCs",
      subtitle: "Power up your productivity",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=400&fit=crop&crop=center",
      productCount: "180+ Products",
      gradient: "from-purple-500 to-pink-600"
    },
    {
      id: 3,
      title: "Audio & Headphones",
      subtitle: "Premium sound experience",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=400&fit=crop&crop=center",
      productCount: "120+ Products",
      gradient: "from-cyan-500 to-blue-600"
    },
    {
      id: 4,
      title: "Smart Watches",
      subtitle: "Wearable innovation",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=400&fit=crop&crop=center",
      productCount: "85+ Products",
      gradient: "from-emerald-500 to-teal-600"
    },
    {
      id: 5,
      title: "Gaming",
      subtitle: "Next-level gaming gear",
      image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=500&h=400&fit=crop&crop=center",
      productCount: "300+ Products",
      gradient: "from-red-500 to-orange-600"
    },
    {
      id: 6,
      title: "Cameras",
      subtitle: "Capture every moment",
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&h=400&fit=crop&crop=center",
      productCount: "95+ Products",
      gradient: "from-indigo-500 to-purple-600"
    },
    {
      id: 7,
      title: "Home & Smart",
      subtitle: "Connected living solutions",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=400&fit=crop&crop=center",
      productCount: "150+ Products",
      gradient: "from-green-500 to-emerald-600"
    },
    {
      id: 8,
      title: "Accessories",
      subtitle: "Essential tech add-ons",
      image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&h=400&fit=crop&crop=center",
      productCount: "400+ Products",
      gradient: "from-pink-500 to-rose-600"
    }
  ];

  // Optimized animation variants
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

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
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

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
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
            Shop by
            <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Categories
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Find the products you love, organized by category. Discover premium electronics 
            across our curated collections of cutting-edge technology.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={cardVariants}
              className="group relative"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Link 
                to="/collections" 
                className="block cursor-pointer"
              >
              {/* Main Card */}
              <div className="relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-100 group-hover:border-slate-200">
                
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-60 group-hover:opacity-40 transition-opacity duration-500`}></div>
                  
                  {/* Product Count Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-slate-700 text-xs font-semibold rounded-full shadow-lg">
                      {category.productCount}
                    </span>
                  </div>

                  {/* Explore Icon */}
                  <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {category.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                    {category.subtitle}
                  </p>
                  
                  {/* Explore Button */}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center text-sm font-semibold text-blue-600 group-hover:text-blue-700 transition-colors duration-200">
                      Explore Collection
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}></div>
                
                {/* Border Glow */}
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-blue-200/50 transition-all duration-300"></div>
              </div>

              {/* External Glow */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10`}></div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-slate-600 mb-6">
            Can't find what you're looking for?
          </p>
          <Link 
            to="/products"
            className="group px-8 py-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white font-semibold rounded-xl hover:from-slate-800 hover:to-slate-700 transition-all duration-200 hover:scale-105 hover:shadow-xl inline-flex items-center"
          >
            <span className="flex items-center gap-2">
              Browse All Products
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Categories;
