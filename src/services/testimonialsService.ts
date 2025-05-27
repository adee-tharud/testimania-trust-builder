
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
  serverTimestamp
} from 'firebase/firestore';
import { Testimonial } from '../store/slices/testimonialsSlice';

const TESTIMONIALS_COLLECTION = 'testimonials';

export const addTestimonial = async (testimonial: Omit<Testimonial, 'id' | 'createdAt'>) => {
  try {
    const docRef = await addDoc(collection(db, TESTIMONIALS_COLLECTION), {
      ...testimonial,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const getTestimonials = async (userId?: string) => {
  try {
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
        status: data.status,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
        category: data.category,
      });
    });
    
    return testimonials;
  } catch (error) {
    throw error;
  }
};

export const updateTestimonialStatus = async (id: string, status: 'approved' | 'rejected') => {
  try {
    await updateDoc(doc(db, TESTIMONIALS_COLLECTION, id), {
      status,
    });
  } catch (error) {
    throw error;
  }
};

export const deleteTestimonial = async (id: string) => {
  try {
    await deleteDoc(doc(db, TESTIMONIALS_COLLECTION, id));
  } catch (error) {
    throw error;
  }
};
