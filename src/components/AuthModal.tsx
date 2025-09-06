'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ArrowRight,
  X,
  AlertCircle,
  CheckCircle
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  defaultMode?: 'signin' | 'signup'
}

const AuthModal = ({ isOpen, onClose, defaultMode = 'signin' }: AuthModalProps) => {
  const [mode, setMode] = useState<'signin' | 'signup' | 'reset'>(defaultMode)
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  
  const { signIn, signUp, signInWithGoogle, resetPassword } = useAuth()

  const schema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    name: mode === 'signup' ? yup.string().required('Name is required') : yup.string(),
  })

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: any) => {
    setIsSubmitting(true)
    setMessage(null)

    try {
      let result
      
      if (mode === 'signin') {
        result = await signIn(data.email, data.password)
      } else if (mode === 'signup') {
        result = await signUp(data.email, data.password, data.name)
      } else if (mode === 'reset') {
        result = await resetPassword(data.email)
      }

      if (result?.success) {
        setMessage({ type: 'success', text: result.message || 'Success!' })
        if (mode === 'signin' || mode === 'signup') {
          setTimeout(() => onClose(), 1500)
        }
      } else {
        setMessage({ type: 'error', text: result?.error || 'Something went wrong' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An unexpected error occurred' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsSubmitting(true)
    setMessage(null)

    try {
      const result = await signInWithGoogle()
      if (result.success) {
        setMessage({ type: 'success', text: 'Signed in successfully!' })
        setTimeout(() => onClose(), 1500)
      } else {
        setMessage({ type: 'error', text: result.error })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Google sign-in failed' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    reset()
    setMessage(null)
    setShowPassword(false)
  }

  const switchMode = (newMode: 'signin' | 'signup' | 'reset') => {
    setMode(newMode)
    resetForm()
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-montserrat font-bold text-maroon">
              {mode === 'signin' && 'Sign In'}
              {mode === 'signup' && 'Create Account'}
              {mode === 'reset' && 'Reset Password'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Message */}
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-center p-3 rounded-lg mb-4 ${
                  message.type === 'success' 
                    ? 'bg-green-50 text-green-700 border border-green-200' 
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}
              >
                {message.type === 'success' ? (
                  <CheckCircle className="w-5 h-5 mr-2" />
                ) : (
                  <AlertCircle className="w-5 h-5 mr-2" />
                )}
                {message.text}
              </motion.div>
            )}

            {/* Temporarily disabled Google Sign In - Enable in Firebase Console */}
            {/* 
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGoogleSignIn}
              disabled={isSubmitting}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 mb-4"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </motion.button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with email</span>
              </div>
            </div>
            */}

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name field for signup */}
              {mode === 'signup' && (
                <div>
                  <label className="block text-sm font-medium text-maroon mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Full Name
                  </label>
                  <input
                    {...register('name')}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon focus:border-transparent transition-colors"
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-maroon mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email Address
                </label>
                <input
                  {...register('email')}
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon focus:border-transparent transition-colors"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Password (not for reset mode) */}
              {mode !== 'reset' && (
                <div>
                  <label className="block text-sm font-medium text-maroon mb-2">
                    <Lock className="w-4 h-4 inline mr-2" />
                    Password
                  </label>
                  <div className="relative">
                    <input
                      {...register('password')}
                      type={showPassword ? 'text' : 'password'}
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-maroon focus:border-transparent transition-colors"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                  )}
                </div>
              )}

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className="w-full bg-maroon text-white py-3 rounded-lg font-medium hover:bg-maroon/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    {mode === 'signin' && 'Sign In'}
                    {mode === 'signup' && 'Create Account'}
                    {mode === 'reset' && 'Send Reset Email'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Mode Switcher */}
            <div className="mt-6 text-center space-y-2">
              {mode === 'signin' && (
                <>
                  <button
                    onClick={() => switchMode('reset')}
                    className="text-sm text-maroon hover:underline"
                  >
                    Forgot your password?
                  </button>
                  <p className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <button
                      onClick={() => switchMode('signup')}
                      className="text-maroon hover:underline font-medium"
                    >
                      Sign up
                    </button>
                  </p>
                </>
              )}
              
              {mode === 'signup' && (
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <button
                    onClick={() => switchMode('signin')}
                    className="text-maroon hover:underline font-medium"
                  >
                    Sign in
                  </button>
                </p>
              )}
              
              {mode === 'reset' && (
                <p className="text-sm text-gray-600">
                  Remember your password?{' '}
                  <button
                    onClick={() => switchMode('signin')}
                    className="text-maroon hover:underline font-medium"
                  >
                    Sign in
                  </button>
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default AuthModal
