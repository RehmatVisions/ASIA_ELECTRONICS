import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ProductCard from '../components/ProductCard'

const CollectionsPage = () => {
  // Sample collections data organized by category
  const collections = {
    "Smartphones": {
      title: "Smartphones & Mobile",
      subtitle: "Latest mobile technology at your fingertips",
      gradient: "from-blue-500 to-indigo-600",
      icon: "📱",
      products: [
        {
          id: 1,
          name: "iPhone 15 Pro Max",
          price: 1199,
          originalPrice: 1299,
          image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop&crop=center",
          featured: true
        },
        {
          id: 7,
          name: "Samsung Galaxy S24",
          price: 899,
          originalPrice: 999,
          image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop&crop=center"
        },
        {
          id: 14,
          name: "Google Pixel 8 Pro",
          price: 999,
          originalPrice: 1099,
          image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=400&fit=crop&crop=center"
        }
      ]
    },
    "Laptops": {
      title: "Laptops & Computers",
      subtitle: "Power up your productivity and creativity",
      gradient: "from-purple-500 to-pink-600",
      icon: "💻",
      products: [
        {
          id: 2,
          name: "MacBook Pro 16\"",
          price: 2499,
          originalPrice: 2799,
          image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop&crop=center",
          featured: true
        },
        {
          id: 13,
          name: "MacBook Air M2",
          price: 1099,
          originalPrice: 1299,
          image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop&crop=center"
        }
      ]
    },
    "Gaming": {
      title: "Gaming & Entertainment",
      subtitle: "Next-level gaming experiences",
      gradient: "from-red-500 to-orange-600",
      icon: "🎮",
      products: [
        {
          id: 8,
          name: "Gaming Laptop RTX 4080",
          price: 1899,
          originalPrice: 2199,
          image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop&crop=center",
          featured: true
        },
        {
          id: 9,
          name: "Meta Quest 3",
          price: 499,
          originalPrice: 599,
          image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=400&h=400&fit=crop&crop=center"
        },
        {
          id: 15,
          name: "Nintendo Switch OLED",
          price: 349,
          originalPrice: 399,
          image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center"
        }
      ]
    },
    "Audio": {
      title: "Audio & Sound",
      subtitle: "Premium sound experiences for audiophiles",
      gradient: "from-cyan-500 to-blue-600",
      icon: "🎧",
      products: [
        {
          id: 3,
          name: "AirPods Pro 2",
          price: 249,
          originalPrice: 299,
          image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=400&fit=crop&crop=center",
          featured: true
        },
        {
          id: 6,
          name: "Sony WH-1000XM5",
          price: 399,
          originalPrice: 449,
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center"
        },
        {
          id: 12,
          name: "Marshall Acton III",
          price: 279,
          originalPrice: 329,
          image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center"
        }
      ]
    },
    "Wearables": {
      title: "Wearables & Health",
      subtitle: "Smart devices for a connected lifestyle",
      gradient: "from-emerald-500 to-teal-600",
      icon: "⌚",
      products: [
        {
          id: 5,
          name: "Apple Watch Ultra",
          price: 799,
          originalPrice: 899,
          image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop&crop=center",
          featured: true
        }
      ]
    },
    "Cameras": {
      title: "Cameras & Photography",
      subtitle: "Capture life's precious moments",
      gradient: "from-indigo-500 to-purple-600",
      icon: "📷",
      products: [
        {
          id: 10,
          name: "Canon EOS R5",
          price: 3899,
          originalPrice: 4299,
          image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop&crop=center",
          featured: true
        },
        {
          id: 11,
          name: "DJI Mini 4 Pro",
          price: 759,
          originalPrice: 859,
          image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=400&fit=crop&crop=center"
        }
      ]
    }
  }

  const [expandedCollection, setExpandedCollection] = useState(null)

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1
      }
    }
  }

  const collectionVariants = {
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
  }

  const productVariants = {
    hidden: { 
      opacity: 0, 
      x: 20 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  }

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header Section */}
      <motion.section 
        className="py-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
          <div className="text-center text-white">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              Our Collections
            </h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Explore our curated collections of premium electronics, organized by category for your convenience
            </p>
          </div>
        </div>
      </motion.section>

      {/* Collections Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
          <motion.div 
            className="space-y-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {Object.entries(collections).map(([category, collection]) => (
              <motion.div
                key={category}
                variants={collectionVariants}
                className="relative"
              >
                {/* Collection Header */}
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`text-4xl p-4 rounded-2xl bg-gradient-to-r ${collection.gradient} text-white shadow-lg`}>
                      {collection.icon}
                    </div>
                    <div>
                      <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                        {collection.title}
                      </h2>
                      <p className="text-lg text-slate-600">
                        {collection.subtitle}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-slate-600">
                      {collection.products.length} product{collection.products.length !== 1 ? 's' : ''} available
                    </p>
                    <Link 
                      to="/products"
                      className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2 transition-colors duration-200"
                    >
                      View all in {category}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {collection.products.map((product, index) => (
                    <motion.div
                      key={product.id}
                      variants={productVariants}
                      custom={index}
                      className={product.featured ? 'relative' : ''}
                    >
                      {/* Featured Badge */}
                      {product.featured && (
                        <div className="absolute top-2 left-2 z-20">
                          <span className="px-2 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full shadow-lg">
                            ⭐ Featured
                          </span>
                        </div>
                      )}
                      
                      <ProductCard 
                        product={product} 
                        className={product.featured ? 'ring-2 ring-blue-200' : ''}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Collection Footer */}
                <div className="mt-8 text-center">
                  <Link 
                    to="/products"
                    className={`inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r ${collection.gradient} text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-200 hover:scale-105`}
                  >
                    Explore All {collection.title}
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>

                {/* Separator */}
                {Object.keys(collections).indexOf(category) < Object.keys(collections).length - 1 && (
                  <div className="mt-16 border-b border-slate-200"></div>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div 
            className="mt-20 text-center bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h3 className="text-3xl font-bold text-white mb-4">
              Can't Find What You're Looking For?
            </h3>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
              Browse our complete product catalog with advanced filters and search functionality
            </p>
            <Link 
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 hover:scale-105 hover:shadow-xl"
            >
              Browse All Products
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default CollectionsPage
