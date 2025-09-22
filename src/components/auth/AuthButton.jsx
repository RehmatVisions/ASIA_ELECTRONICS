import React, { useState } from 'react'
import { motion } from 'framer-motion'

const AuthButton = ({ 
  children, 
  onClick, 
  type = "button", 
  disabled = false, 
  loading = false,
  variant = "primary" 
}) => {
  const [ripples, setRipples] = useState([])

  const handleClick = (e) => {
    if (disabled || loading) return

    // Create ripple effect
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const newRipple = {
      id: Date.now(),
      x,
      y
    }
    
    setRipples(prev => [...prev, newRipple])
    
    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id))
    }, 600)

    if (onClick) onClick(e)
  }

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    },
    hover: { 
      scale: 1.02,
      transition: { duration: 0.2, ease: "easeOut" }
    },
    tap: { 
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  }

  const getButtonStyles = () => {
    const baseStyles = "relative w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 overflow-hidden focus:outline-none focus:ring-4 focus:ring-offset-2"
    
    if (variant === "primary") {
      return `${baseStyles} bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 focus:ring-blue-300 shadow-lg hover:shadow-xl ${
        disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      }`
    }
    
    if (variant === "secondary") {
      return `${baseStyles} bg-white/20 backdrop-blur-sm border-2 border-white/30 text-slate-700 hover:bg-white/30 hover:border-white/50 focus:ring-slate-300 ${
        disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      }`
    }
    
    return baseStyles
  }

  return (
    <motion.button
      variants={buttonVariants}
      whileHover={!disabled && !loading ? "hover" : undefined}
      whileTap={!disabled && !loading ? "tap" : undefined}
      type={type}
      onClick={handleClick}
      disabled={disabled || loading}
      className={getButtonStyles()}
    >
      {/* Button Content */}
      <span className="relative z-10 flex items-center justify-center gap-3">
        {loading && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
          />
        )}
        {children}
      </span>

      {/* Gradient Overlay for Hover Effect */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-transparent"
      />

      {/* Ripple Effects */}
      {ripples.map(ripple => (
        <motion.div
          key={ripple.id}
          initial={{ 
            scale: 0, 
            opacity: 0.6,
            x: ripple.x,
            y: ripple.y
          }}
          animate={{ 
            scale: 4, 
            opacity: 0
          }}
          transition={{ 
            duration: 0.6, 
            ease: "easeOut" 
          }}
          className="absolute w-4 h-4 bg-white rounded-full pointer-events-none"
          style={{
            left: -8,
            top: -8,
          }}
        />
      ))}

      {/* Shimmer Effect */}
      <motion.div
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
      />
    </motion.button>
  )
}

export default AuthButton
