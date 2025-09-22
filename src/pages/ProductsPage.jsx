import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProductCard from '../components/ProductCard'

const ProductsPage = () => {
  // All products data (expanded from the original data)
  const allProducts = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      price: 1199,
      originalPrice: 1299,
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop&crop=center",
      category: "Smartphones",
      description: "Latest Apple iPhone with titanium design and powerful A17 Pro chip"
    },
    {
      id: 2,
      name: "MacBook Pro 16\"",
      price: 2499,
      originalPrice: 2799,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop&crop=center",
      category: "Laptops",
      description: "Professional laptop with M3 Pro chip for ultimate performance"
    },
    {
      id: 3,
      name: "AirPods Pro 2",
      price: 249,
      originalPrice: 299,
      image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=400&fit=crop&crop=center",
      category: "Audio",
      description: "Premium wireless earbuds with active noise cancellation"
    },
    {
      id: 4,
      name: "iPad Pro 12.9\"",
      price: 1099,
      originalPrice: 1199,
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop&crop=center",
      category: "Tablets",
      description: "Professional tablet with M2 chip and Liquid Retina XDR display"
    },
    {
      id: 5,
      name: "Apple Watch Ultra",
      price: 799,
      originalPrice: 899,
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop&crop=center",
      category: "Wearables",
      description: "Adventure-ready smartwatch with titanium case"
    },
    {
      id: 6,
      name: "Sony WH-1000XM5",
      price: 399,
      originalPrice: 449,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center",
      category: "Audio",
      description: "Industry-leading noise canceling wireless headphones"
    },
    {
      id: 7,
      name: "Samsung Galaxy S24",
      price: 899,
      originalPrice: 999,
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop&crop=center",
      category: "Smartphones",
      description: "Android flagship with AI-powered photography"
    },
    {
      id: 8,
      name: "Gaming Laptop RTX 4080",
      price: 1899,
      originalPrice: 2199,
      image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop&crop=center",
      category: "Gaming",
      description: "High-performance gaming laptop with RTX 4080 graphics"
    },
    {
      id: 9,
      name: "Meta Quest 3",
      price: 499,
      originalPrice: 599,
      image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=400&h=400&fit=crop&crop=center",
      category: "Gaming",
      description: "Advanced VR headset with mixed reality capabilities"
    },
    {
      id: 10,
      name: "Canon EOS R5",
      price: 3899,
      originalPrice: 4299,
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop&crop=center",
      category: "Cameras",
      description: "Professional mirrorless camera with 8K video recording"
    },
    {
      id: 11,
      name: "DJI Mini 4 Pro",
      price: 759,
      originalPrice: 859,
      image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=400&fit=crop&crop=center",
      category: "Cameras",
      description: "Compact drone with 4K HDR video and omnidirectional obstacle sensing"
    },
    {
      id: 12,
      name: "Marshall Acton III",
      price: 279,
      originalPrice: 329,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&crop=center",
      category: "Audio",
      description: "Iconic wireless speaker with Marshall's signature sound"
    },
    {
      id: 13,
      name: "MacBook Air M2",
      price: 1099,
      originalPrice: 1299,
      image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop&crop=center",
      category: "Laptops",
      description: "Ultralight laptop with M2 chip and all-day battery life"
    },
    {
      id: 14,
      name: "Google Pixel 8 Pro",
      price: 999,
      originalPrice: 1099,
      image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=400&fit=crop&crop=center",
      category: "Smartphones",
      description: "AI-powered smartphone with computational photography"
    },
    {
      id: 15,
      name: "Nintendo Switch OLED",
      price: 349,
      originalPrice: 399,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center",
      category: "Gaming",
      description: "Portable gaming console with vibrant OLED screen"
    },
    {
      id: 16,
      name: "iPad Air 5th Gen",
      price: 599,
      originalPrice: 699,
      image: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&h=400&fit=crop&crop=center",
      category: "Tablets",
      description: "Versatile tablet with M1 chip and stunning display"
    }
  ]

  // State for filters and search
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('featured')

  // Get unique categories
  const categories = ['All', ...new Set(allProducts.map(product => product.category))]

  // Filter and search products
  const filteredProducts = useMemo(() => {
    let filtered = allProducts

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        // Keep original order for 'featured'
        break
    }

    return filtered
  }, [searchTerm, selectedCategory, sortBy])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.05
      }
    }
  }

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.2
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
        className="py-16 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
          <div className="text-center text-white">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              All Products
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Discover our complete collection of premium electronics and cutting-edge technology
            </p>
          </div>
        </div>
      </motion.section>

      {/* Filters and Search Section */}
      <section className="py-8 bg-white shadow-sm border-b border-slate-200">
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            
            {/* Search Bar */}
            <div className="w-full lg:w-96">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-12 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
                <svg 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white shadow-lg scale-105'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:scale-105'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-3">
              <span className="text-slate-600 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="featured">Featured</option>
                <option value="name">Name A-Z</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Results Info */}
          <div className="mt-6 text-slate-600">
            {searchTerm && (
              <p>
                Search results for "<span className="font-semibold text-slate-900">{searchTerm}</span>" 
              </p>
            )}
            <p className="text-sm">
              Showing {filteredProducts.length} of {allProducts.length} products
              {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
          <AnimatePresence mode="wait">
            <motion.div 
              key={`${selectedCategory}-${searchTerm}-${sortBy}`}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  variants={cardVariants}
                  layout
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* No Results Message */}
          {filteredProducts.length === 0 && (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">No products found</h3>
              <p className="text-slate-600 mb-6">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <button 
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('All')
                  setSortBy('featured')
                }}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Clear All Filters
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}

export default ProductsPage
