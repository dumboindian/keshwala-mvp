'use client'

import { useState } from 'react'
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  Timestamp 
} from 'firebase/firestore'
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage'
import { db, storage } from '@/lib/firebase'

export const useFirestore = () => {
  const [loading, setLoading] = useState(false)

  const addDocument = async (collectionName: string, data: any) => {
    try {
      setLoading(true)
      const docRef = await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      })
      return { success: true, id: docRef.id }
    } catch (error: any) {
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const getDocuments = async (collectionName: string, constraints?: any[]) => {
    try {
      setLoading(true)
      const collectionRef = collection(db, collectionName)
      
      const q = constraints ? query(collectionRef, ...constraints) : collectionRef
      
      const querySnapshot = await getDocs(q)
      const documents = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      
      return { success: true, data: documents }
    } catch (error: any) {
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const updateDocument = async (collectionName: string, docId: string, data: any) => {
    try {
      setLoading(true)
      const docRef = doc(db, collectionName, docId)
      await updateDoc(docRef, {
        ...data,
        updatedAt: Timestamp.now()
      })
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const deleteDocument = async (collectionName: string, docId: string) => {
    try {
      setLoading(true)
      await deleteDoc(doc(db, collectionName, docId))
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  // Specific functions for Keshwala app
  const addBooking = async (bookingData: any) => {
    return await addDocument('bookings', bookingData)
  }

  const getBookings = async (userId?: string) => {
    const constraints = userId ? [where('userId', '==', userId)] : []
    return await getDocuments('bookings', constraints)
  }

  const addContactMessage = async (messageData: any) => {
    return await addDocument('contactMessages', messageData)
  }

  const getServices = async () => {
    return await getDocuments('services', [orderBy('createdAt', 'desc')])
  }

  const getWigs = async () => {
    return await getDocuments('wigs', [orderBy('createdAt', 'desc')])
  }

  const getTestimonials = async () => {
    return await getDocuments('testimonials', [orderBy('rating', 'desc'), limit(10)])
  }

  const getBlogPosts = async () => {
    return await getDocuments('blogPosts', [orderBy('createdAt', 'desc')])
  }

  // Firebase Storage functions
  const uploadFile = async (file: File, path: string) => {
    try {
      setLoading(true)
      if (!storage) {
        throw new Error('Storage not initialized')
      }
      
      const storageRef = ref(storage, path)
      const snapshot = await uploadBytes(storageRef, file)
      const downloadURL = await getDownloadURL(snapshot.ref)
      
      return { success: true, url: downloadURL, path: snapshot.ref.fullPath }
    } catch (error: any) {
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const deleteFile = async (path: string) => {
    try {
      setLoading(true)
      if (!storage) {
        throw new Error('Storage not initialized')
      }
      
      const storageRef = ref(storage, path)
      await deleteObject(storageRef)
      
      return { success: true }
    } catch (error: any) {
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }

  const uploadImage = async (file: File, folder: string = 'images') => {
    const timestamp = Date.now()
    const fileName = `${folder}/${timestamp}_${file.name}`
    return await uploadFile(file, fileName)
  }

  return {
    loading,
    addDocument,
    getDocuments,
    updateDocument,
    deleteDocument,
    addBooking,
    getBookings,
    addContactMessage,
    getServices,
    getWigs,
    getTestimonials,
    getBlogPosts,
    uploadFile,
    deleteFile,
    uploadImage
  }
}

