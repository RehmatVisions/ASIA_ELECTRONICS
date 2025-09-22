import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Create Cart Context
const CartContext = createContext()

// Cart Action Types
const CART_ACTIONS = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  LOAD_CART: 'LOAD_CART'
}

// Cart Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_TO_CART: {
      const { product, quantity = 1, variant = {} } = action.payload
      const cartKey = `${product.id}-${JSON.stringify(variant)}`
      
      const existingItem = state.items.find(item => item.cartKey === cartKey)
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.cartKey === cartKey
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        }
      } else {
        const newItem = {
          ...product,
          cartKey,
          quantity,
          variant,
          addedAt: Date.now()
        }
        return {
          ...state,
          items: [...state.items, newItem]
        }
      }
    }

    case CART_ACTIONS.REMOVE_FROM_CART: {
      return {
        ...state,
        items: state.items.filter(item => item.cartKey !== action.payload.cartKey)
      }
    }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { cartKey, quantity } = action.payload
      
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => item.cartKey !== cartKey)
        }
      }
      
      return {
        ...state,
        items: state.items.map(item =>
          item.cartKey === cartKey
            ? { ...item, quantity }
            : item
        )
      }
    }

    case CART_ACTIONS.CLEAR_CART: {
      return {
        ...state,
        items: []
      }
    }

    case CART_ACTIONS.LOAD_CART: {
      return {
        ...state,
        items: action.payload.items || []
      }
    }

    default:
      return state
  }
}

// Initial cart state
const initialState = {
  items: []
}

// Toast Component
const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  const bgColor = type === 'success' ? 'from-green-500 to-emerald-500' : 'from-red-500 to-rose-500'
  const icon = type === 'success' ? '✓' : '✕'

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`fixed top-4 right-4 z-50 bg-gradient-to-r ${bgColor} text-white px-6 py-4 rounded-xl shadow-2xl backdrop-blur-sm border border-white/20 max-w-sm`}
    >
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">
          {icon}
        </div>
        <p className="font-medium">{message}</p>
        <button
          onClick={onClose}
          className="ml-auto text-white/80 hover:text-white transition-colors duration-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </motion.div>
  )
}

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)
  const [toasts, setToasts] = React.useState([])

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('ecommerce-cart')
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart)
        dispatch({
          type: CART_ACTIONS.LOAD_CART,
          payload: { items: parsedCart.items }
        })
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error)
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('ecommerce-cart', JSON.stringify(state))
    } catch (error) {
      console.error('Error saving cart to localStorage:', error)
    }
  }, [state])

  // Toast management
  const showToast = (message, type = 'success') => {
    const id = Date.now()
    const newToast = { id, message, type }
    setToasts(prev => [...prev, newToast])
  }

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  // Cart actions
  const addToCart = (product, quantity = 1, variant = {}) => {
    dispatch({
      type: CART_ACTIONS.ADD_TO_CART,
      payload: { product, quantity, variant }
    })
    
    showToast(`${product.name} added to cart!`, 'success')
  }

  const removeFromCart = (cartKey) => {
    const item = state.items.find(item => item.cartKey === cartKey)
    if (item) {
      dispatch({
        type: CART_ACTIONS.REMOVE_FROM_CART,
        payload: { cartKey }
      })
      showToast(`${item.name} removed from cart`, 'success')
    }
  }

  const updateQuantity = (cartKey, quantity) => {
    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { cartKey, quantity }
    })
  }

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART })
    showToast('Cart cleared', 'success')
  }

  // Cart calculations
  const cartCount = state.items.reduce((total, item) => total + item.quantity, 0)
  const cartTotal = state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
  const originalTotal = state.items.reduce((total, item) => {
    const originalPrice = item.originalPrice || item.price
    return total + (originalPrice * item.quantity)
  }, 0)
  const savings = originalTotal - cartTotal

  // Get item by cartKey
  const getCartItem = (cartKey) => {
    return state.items.find(item => item.cartKey === cartKey)
  }

  // Check if product is in cart
  const isInCart = (productId, variant = {}) => {
    const cartKey = `${productId}-${JSON.stringify(variant)}`
    return state.items.some(item => item.cartKey === cartKey)
  }

  // Get quantity of specific product in cart
  const getCartQuantity = (productId, variant = {}) => {
    const cartKey = `${productId}-${JSON.stringify(variant)}`
    const item = state.items.find(item => item.cartKey === cartKey)
    return item ? item.quantity : 0
  }

  const contextValue = {
    // State
    cartItems: state.items,
    cartCount,
    cartTotal,
    originalTotal,
    savings,
    
    // Actions
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    
    // Utilities
    getCartItem,
    isInCart,
    getCartQuantity,
    showToast
  }

  return (
    <CartContext.Provider value={contextValue}>
      {children}
      
      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        <AnimatePresence>
          {toasts.map(toast => (
            <Toast
              key={toast.id}
              message={toast.message}
              type={toast.type}
              onClose={() => removeToast(toast.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </CartContext.Provider>
  )
}

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export default CartProvider
