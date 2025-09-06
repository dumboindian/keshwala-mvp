'use client'

import { useState, useEffect } from 'react'
import { 
  User, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth'
import { auth } from '@/lib/firebase'

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Only run on client side and when auth is available
    if (typeof window === 'undefined' || !auth) {
      if (process.env.NODE_ENV === 'development') {
        console.log('useAuth: Skipping auth initialization -', {
          isServer: typeof window === 'undefined',
          authAvailable: !!auth
        })
      }
      setLoading(false)
      return
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('useAuth: Initializing auth state listener')
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (process.env.NODE_ENV === 'development') {
        console.log('useAuth: Auth state changed -', user ? 'User logged in' : 'No user')
      }
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    if (!auth) return { success: false, error: 'Authentication not available' }
    
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      return { success: true, user: result.user }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  const signUp = async (email: string, password: string, displayName?: string) => {
    if (!auth) return { success: false, error: 'Authentication not available' }
    
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      
      // Update display name if provided
      if (displayName && result.user) {
        await updateProfile(result.user, { displayName })
      }
      
      return { success: true, user: result.user }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  const signInWithGoogle = async () => {
    if (!auth) return { success: false, error: 'Authentication not available' }
    
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      return { success: true, user: result.user }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  const resetPassword = async (email: string) => {
    if (!auth) return { success: false, error: 'Authentication not available' }
    
    try {
      await sendPasswordResetEmail(auth, email)
      return { success: true, message: 'Password reset email sent!' }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  const logout = async () => {
    if (!auth) return { success: false, error: 'Authentication not available' }
    
    try {
      await signOut(auth)
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  return {
    user,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    resetPassword,
    logout
  }
}

