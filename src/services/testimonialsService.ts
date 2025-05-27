
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
  enableNetwork
} from 'firebase/firestore';
import { Testimonial } from '../store/slices/testimonialsSlice';

const TESTIMONIALS_COLLECTION = 'testimonials';

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
    let q = query(collection(db, TESTIMONIALS_COLLECTION), orderBy('createdAt', 'desc'));
    
    if (userId) {
      q = query(collection(db, TESTIMONIALS_COLLECTION), where('userId', '==', userId), orderBy('createdAt', 'desc'));
    }
    
    const querySnapshot = await getDocs(q);
    const testimonials: Testimonial[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
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
