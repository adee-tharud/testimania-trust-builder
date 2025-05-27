
// import { db } from '../lib/firebase';
// import { 
//   collection, 
//   addDoc, 
//   getDocs, 
//   doc, 
//   updateDoc, 
//   deleteDoc,
//   query,
//   where,
//   orderBy,
//   serverTimestamp,
//   enableNetwork
// } from 'firebase/firestore';
// import { Testimonial } from '../store/slices/testimonialsSlice';

// const TESTIMONIALS_COLLECTION = 'testimonials';

// // Ensure Firestore is connected before operations
// const ensureConnection = async () => {
//   try {
//     await enableNetwork(db);
//   } catch (error) {
//     console.warn("Firestore network already enabled or connection issue:", error);
//   }
// };

// export const addTestimonial = async (testimonial: Omit<Testimonial, 'id' | 'createdAt'>) => {
//   try {
//     await ensureConnection();
//     const docRef = await addDoc(collection(db, TESTIMONIALS_COLLECTION), {
//       ...testimonial,
//       createdAt: serverTimestamp(),
//     });
//     return docRef.id;
//   } catch (error) {
//     console.error("Error adding testimonial:", error);
//     throw new Error("Failed to add testimonial. Please check your internet connection and try again.");
//   }
// };

// export const getTestimonials = async (userId?: string) => {
//   try {
//     await ensureConnection();
    
//     let q;
//     if (userId) {
//       // Use simple query with userId filter only, then sort in memory
//       q = query(collection(db, TESTIMONIALS_COLLECTION), where('userId', '==', userId));
//     } else {
//       // For public queries, just order by createdAt
//       q = query(collection(db, TESTIMONIALS_COLLECTION), orderBy('createdAt', 'desc'));
//     }
    
//     const querySnapshot = await getDocs(q);
//     const testimonials: Testimonial[] = [];
    
//     querySnapshot.forEach((doc) => {
//       const data = doc.data();
//       testimonials.push({
//         id: doc.id,
//         customerName: data.customerName,
//         customerEmail: data.customerEmail,
//         rating: data.rating,
//         message: data.message,
//         status: data.status || 'pending',
//         createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
//         category: data.category,
//       });
//     });
    
//     // Sort in memory if we filtered by userId
//     if (userId) {
//       testimonials.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
//     }
    
//     return testimonials;
//   } catch (error) {
//     console.error("Error fetching testimonials:", error);
//     throw new Error("Failed to fetch testimonials. Please check your internet connection and try again.");
//   }
// };

// export const updateTestimonialStatus = async (id: string, status: 'approved' | 'rejected') => {
//   try {
//     await ensureConnection();
//     await updateDoc(doc(db, TESTIMONIALS_COLLECTION, id), {
//       status,
//     });
//   } catch (error) {
//     console.error("Error updating testimonial status:", error);
//     throw new Error("Failed to update testimonial status. Please try again.");
//   }
// };

// export const deleteTestimonial = async (id: string) => {
//   try {
//     await ensureConnection();
//     await deleteDoc(doc(db, TESTIMONIALS_COLLECTION, id));
//   } catch (error) {
//     console.error("Error deleting testimonial:", error);
//     throw new Error("Failed to delete testimonial. Please try again.");
//   }
// };

import { db } from '../lib/firebase';
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
  serverTimestamp,
  enableNetwork,
  DocumentData
} from 'firebase/firestore';
import { Testimonial } from '../store/slices/testimonialsSlice';

const TESTIMONIALS_COLLECTION = 'testimonials';

// Type for Firestore document data
interface TestimonialDocumentData extends DocumentData {
  customerName: string;
  customerEmail: string;
  rating: number;
  message: string;
  status?: 'pending' | 'approved' | 'rejected';
  createdAt?: {
    toDate?: () => Date;
  };
  category?: string;
  userId?: string;
}

// Type guard to check if data is a valid testimonial
const isValidTestimonialData = (data: unknown): data is TestimonialDocumentData => {
  if (!data || typeof data !== 'object') return false;
  
  const testimonialData = data as Record<string, unknown>;
  
  return (
    typeof testimonialData.customerName === 'string' &&
    typeof testimonialData.customerEmail === 'string' &&
    typeof testimonialData.rating === 'number' &&
    typeof testimonialData.message === 'string'
  );
};

// Ensure Firestore is connected before operations
const ensureConnection = async () => {
  try {
    await enableNetwork(db);
  } catch (error) {
    console.warn("Firestore network already enabled or connection issue:", error);
  }
};

export const addTestimonial = async (testimonial: Omit<Testimonial, 'id' | 'createdAt'>) => {
  try {
    await ensureConnection();
    const docRef = await addDoc(collection(db, TESTIMONIALS_COLLECTION), {
      ...testimonial,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding testimonial:", error);
    throw new Error("Failed to add testimonial. Please check your internet connection and try again.");
  }
};

export const getTestimonials = async (userId?: string) => {
  try {
    await ensureConnection();
    
    let q;
    if (userId) {
      // Use simple query with userId filter only, then sort in memory
      q = query(collection(db, TESTIMONIALS_COLLECTION), where('userId', '==', userId));
    } else {
      // For public queries, just order by createdAt
      q = query(collection(db, TESTIMONIALS_COLLECTION), orderBy('createdAt', 'desc'));
    }
    
    const querySnapshot = await getDocs(q);
    const testimonials: Testimonial[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      
      // Validate the data structure
      if (!isValidTestimonialData(data)) {
        console.warn(`Invalid testimonial data for document ${doc.id}:`, data);
        return; // Skip this document
      }
      
      testimonials.push({
        id: doc.id,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        rating: data.rating,
        message: data.message,
        status: data.status || 'pending',
        createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        category: data.category,
      });
    });
    
    // Sort in memory if we filtered by userId
    if (userId) {
      testimonials.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    
    return testimonials;
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    throw new Error("Failed to fetch testimonials. Please check your internet connection and try again.");
  }
};

export const updateTestimonialStatus = async (id: string, status: 'approved' | 'rejected') => {
  try {
    await ensureConnection();
    await updateDoc(doc(db, TESTIMONIALS_COLLECTION, id), {
      status,
    });
  } catch (error) {
    console.error("Error updating testimonial status:", error);
    throw new Error("Failed to update testimonial status. Please try again.");
  }
};

export const deleteTestimonial = async (id: string) => {
  try {
    await ensureConnection();
    await deleteDoc(doc(db, TESTIMONIALS_COLLECTION, id));
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    throw new Error("Failed to delete testimonial. Please try again.");
  }
};