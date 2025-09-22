import React from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartProvider'

const CartPage = () => {
  const { 
    cartItems, 
    cartTotal, 
    originalTotal, 
    savings, 
    updateQuantity, 
    removeFromCart,
    cartCount 
  } = useCart()

  // Cart calculations
  const subtotal = cartTotal
  const shipping = subtotal > 100 ? 0 : 15
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + shipping + tax

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

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      x: -20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      x: 20,
      scale: 0.95,
      transition: {
        duration: 0.3
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

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-8xl mb-8">🛒</div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Your cart is empty</h1>
          <p className="text-xl text-slate-600 mb-8 max-w-md mx-auto">
            Looks like you haven't added anything to your cart yet. Let's fix that!
          </p>
          <Link 
            to="/products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 hover:scale-105 hover:shadow-xl"
          >
            Start Shopping
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header Section */}
      <motion.section 
        className="py-16 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600"
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
          <div className="flex items-center justify-between text-white">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
                Shopping Cart
              </h1>
              <p className="text-xl text-blue-100">
                {cartCount} item{cartCount !== 1 ? 's' : ''} in your cart
              </p>
            </div>
            <div className="hidden md:block text-right">
              <div className="text-3xl font-bold mb-2">${total.toFixed(2)}</div>
              <div className="text-lg text-blue-100">Total</div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Cart Content */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <motion.div 
                className="space-y-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <AnimatePresence>
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.cartKey}
                      variants={itemVariants}
                      exit="exit"
                      layout
                      className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100"
                    >
                      <div className="flex flex-col sm:flex-row gap-6">
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-32 h-32 object-cover rounded-xl"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 space-y-4">
                          <div>
                            <h3 className="text-xl font-bold text-slate-900 mb-1">
                              {item.name}
                            </h3>
                            <p className="text-sm text-slate-600">{item.category}</p>
                            
                            {/* Product Variants */}
                            <div className="flex gap-4 mt-2 text-sm text-slate-600">
                              {item.variant?.color && <span>Color: {item.variant.color}</span>}
                              {item.variant?.storage && <span>Storage: {item.variant.storage}</span>}
                              {item.variant?.size && <span>Size: {item.variant.size}</span>}
                            </div>
                          </div>

                          {/* Price and Quantity Controls */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            {/* Price */}
                            <div className="flex items-center gap-2">
                              <span className="text-2xl font-bold text-slate-900">
                                ${item.price}
                              </span>
                              {item.originalPrice && (
                                <span className="text-lg text-slate-500 line-through">
                                  ${item.originalPrice}
                                </span>
                              )}
                              {item.originalPrice && (
                                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                                  Save ${item.originalPrice - item.price}
                                </span>
                              )}
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-4">
                              <div className="flex items-center border border-slate-300 rounded-lg">
                                <button
                                  onClick={() => updateQuantity(item.cartKey, item.quantity - 1)}
                                  className="w-10 h-10 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-l-lg transition-colors duration-200"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                  </svg>
                                </button>
                                <div className="w-12 h-10 flex items-center justify-center border-x border-slate-300 bg-slate-50 font-semibold">
                                  {item.quantity}
                                </div>
                                <button
                                  onClick={() => updateQuantity(item.cartKey, item.quantity + 1)}
                                  className="w-10 h-10 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-r-lg transition-colors duration-200"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                  </svg>
                                </button>
                              </div>

                              {/* Remove Button */}
                              <button
                                onClick={() => removeFromCart(item.cartKey)}
                                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
                                title="Remove item"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </div>

                          {/* Item Total */}
                          <div className="text-right">
                            <span className="text-lg font-semibold text-slate-900">
                              Subtotal: ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Continue Shopping */}
              <motion.div 
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Link 
                  to="/products"
                  className="inline-flex items-center gap-2 px-6 py-3 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Continue Shopping
                </Link>
              </motion.div>
            </div>

            {/* Order Summary */}
            <motion.div 
              className="lg:col-span-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-100 sticky top-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4">
                  {/* Subtotal */}
                  <div className="flex justify-between">
                    <span className="text-slate-600">Subtotal ({cartCount} items)</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>

                  {/* Savings */}
                  {savings > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>You save</span>
                      <span className="font-semibold">-${savings.toFixed(2)}</span>
                    </div>
                  )}

                  {/* Shipping */}
                  <div className="flex justify-between">
                    <span className="text-slate-600">Shipping</span>
                    <span className="font-semibold">
                      {shipping === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>

                  {/* Tax */}
                  <div className="flex justify-between">
                    <span className="text-slate-600">Tax</span>
                    <span className="font-semibold">${tax.toFixed(2)}</span>
                  </div>

                  <hr className="border-slate-200" />

                  {/* Total */}
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>

                  {/* Free Shipping Notice */}
                  {shipping > 0 && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700">
                      💡 Add ${(100 - subtotal).toFixed(2)} more to qualify for FREE shipping!
                    </div>
                  )}
                </div>

                {/* Checkout Button */}
                <Link 
                  to="/checkout"
                  className="w-full mt-8 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 hover:scale-105 hover:shadow-lg block text-center"
                >
                  Proceed to Checkout
                </Link>

                {/* Payment Methods */}
                <div className="mt-6 text-center">
                  <p className="text-sm text-slate-600 mb-3">We accept</p>
                  <div className="flex justify-center gap-3">
                    <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded text-white text-xs font-bold flex items-center justify-center">
                      VISA
                    </div>
                    <div className="w-12 h-8 bg-gradient-to-r from-red-600 to-red-700 rounded text-white text-xs font-bold flex items-center justify-center">
                      MC
                    </div>
                    <div className="w-12 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded text-white text-xs font-bold flex items-center justify-center">
                      PP
                    </div>
                    <div className="w-12 h-8 bg-gradient-to-r from-gray-700 to-gray-800 rounded text-white text-xs font-bold flex items-center justify-center">
                      COD
                    </div>
                  </div>
                </div>

                {/* Security Badge */}
                <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-600">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>Secure 256-bit SSL encryption</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CartPage