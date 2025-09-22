import React from 'react'
import { motion } from 'framer-motion'

const AuthCard = ({ children, title, subtitle }) => {
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
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  }

  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-md mx-auto"
    >
      {/* Glassmorphism Card */}
      <div className="relative">
        {/* Background blur effect */}
        <div className="absolute inset-0 bg-white/20 backdrop-blur-xl rounded-3xl border border-white/30 shadow-2xl"></div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-white/10 to-transparent rounded-3xl"></div>
        
        {/* Card content */}
        <div className="relative p-8 md:p-10">
          {/* Header */}
          <motion.div 
            variants={headerVariants}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-3">
              {title}
            </h1>
            {subtitle && (
              <p className="text-slate-600 text-lg font-medium">
                {subtitle}
              </p>
            )}
          </motion.div>

          {/* Form Content */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.2
                }
              }
            }}
          >
            {children}
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full opacity-60 blur-sm"></div>
        <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-60 blur-sm"></div>
        <div className="absolute top-1/2 -right-2 w-4 h-4 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full opacity-40 blur-sm"></div>
      </div>
    </motion.div>
  )
}

export default AuthCard
