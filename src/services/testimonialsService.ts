
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
  DocumentData
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Testimonial } from '../store/slices/testimonialsSlice';

// Define a type for the raw testimonial data from Firestore
interface TestimonialData {
  customerName: string;
  customerEmail: string;
  rating: number;
  message: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  category?: string;
  userId: string;
}

export const getTestimonials = async (userId?: string): Promise<Testimonial[]> => {
  try {
    console.log('Fetching testimonials for user:', userId);
    
    const testimonialsRef = collection(db, 'testimonials');
    let q;
    
    if (userId) {
      // Create separate queries to avoid composite index requirement
      q = query(testimonialsRef, where('userId', '==', userId));
    } else {
      q = query(testimonialsRef);
    }
    
    const querySnapshot = await getDocs(q);
    console.log('Query snapshot size:', querySnapshot.size);
    
    let testimonials = querySnapshot.docs.map(doc => {
      const data = doc.data() as TestimonialData;
      return {
        id: doc.id,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        rating: data.rating,
        message: data.message,
        status: data.status,
        createdAt: data.createdAt,
        category: data.category,
      } as Testimonial;
    });
    
    // Sort by createdAt in memory to avoid composite index
    testimonials = testimonials.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    
    console.log('Fetched testimonials:', testimonials);
    return testimonials;
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    throw error;
  }
};

export const addTestimonial = async (testimonial: Omit<Testimonial, 'id' | 'createdAt'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'testimonials'), {
      ...testimonial,
      createdAt: new Date().toISOString(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding testimonial:', error);
    throw error;
  }
};

export const updateTestimonialStatus = async (
  id: string,
  status: 'approved' | 'rejected'
): Promise<void> => {
  try {
    const testimonialDoc = doc(db, 'testimonials', id);
    await updateDoc(testimonialDoc, { status });
  } catch (error) {
    console.error('Error updating testimonial status:', error);
    throw error;
  }
};

export const deleteTestimonial = async (id: string): Promise<void> => {
  try {
    const testimonialDoc = doc(db, 'testimonials', id);
    await deleteDoc(testimonialDoc);
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    throw error;
  }
};
