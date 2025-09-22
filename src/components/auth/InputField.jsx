import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const InputField = ({ 
  label, 
  type = "text", 
  name, 
  value, 
  onChange, 
  error, 
  placeholder,
  required = false 
}) => {
  const [isFocused, setIsFocused] = useState(false)

  const fieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  }

  const inputVariants = {
    focus: { 
      scale: 1.02,
      transition: { duration: 0.2, ease: "easeOut" }
    },
    blur: { 
      scale: 1,
      transition: { duration: 0.2, ease: "easeOut" }
    }
  }

  const labelVariants = {
    floating: {
      y: -28,
      scale: 0.85,
      color: "#3b82f6",
      transition: { duration: 0.2, ease: "easeOut" }
    },
    resting: {
      y: 0,
      scale: 1,
      color: "#64748b",
      transition: { duration: 0.2, ease: "easeOut" }
    }
  }

  const shouldFloat = isFocused || value

  return (
    <motion.div 
      variants={fieldVariants}
      className="relative mb-6"
    >
      {/* Input Container */}
      <motion.div
        variants={inputVariants}
        animate={isFocused ? "focus" : "blur"}
        className="relative"
      >
        {/* Input Field */}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          required={required}
          className={`w-full px-4 py-4 bg-white/10 backdrop-blur-sm border-2 rounded-xl transition-all duration-300 placeholder-transparent focus:outline-none focus:placeholder-slate-400 ${
            error 
              ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200' 
              : isFocused
              ? 'border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
              : 'border-white/30 hover:border-white/50'
          } text-slate-800 font-medium`}
        />

        {/* Floating Label */}
        <motion.label
          variants={labelVariants}
          animate={shouldFloat ? "floating" : "resting"}
          htmlFor={name}
          className={`absolute left-4 top-4 pointer-events-none font-medium origin-left ${
            error ? 'text-red-500' : ''
          }`}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </motion.label>

        {/* Focus Glow Effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: isFocused ? 1 : 0,
            scale: isFocused ? 1 : 0.8
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/20 to-indigo-400/20 pointer-events-none blur-sm"
        />

        {/* Input Icon (for password field) */}
        {type === "password" && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        )}

        {type === "email" && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
            </svg>
          </div>
        )}
      </motion.div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-2 text-red-500 text-sm font-medium flex items-center gap-2"
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default InputField
