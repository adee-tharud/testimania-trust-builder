
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Testimonial {
  id: string;
  customerName: string;
  customerEmail: string;
  rating: number;
  message: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  category?: string;
}

interface TestimonialsState {
  testimonials: Testimonial[];
  loading: boolean;
  filter: 'all' | 'pending' | 'approved' | 'rejected';
}

const initialState: TestimonialsState = {
  testimonials: [
    {
      id: '1',
      customerName: 'Sarah Johnson',
      customerEmail: 'sarah@example.com',
      rating: 5,
      message: 'Absolutely amazing service! The team went above and beyond to deliver exactly what I needed. Highly recommend!',
      status: 'approved',
      createdAt: '2024-01-15',
      category: 'Service'
    },
    {
      id: '2',
      customerName: 'Mike Chen',
      customerEmail: 'mike@example.com',
      rating: 4,
      message: 'Great experience overall. Fast delivery and excellent customer support. Will definitely use again.',
      status: 'pending',
      createdAt: '2024-01-14',
      category: 'Product'
    },
    {
      id: '3',
      customerName: 'Emily Rodriguez',
      customerEmail: 'emily@example.com',
      rating: 5,
      message: 'Outstanding quality and attention to detail. The final result exceeded my expectations completely.',
      status: 'approved',
      createdAt: '2024-01-13',
      category: 'Service'
    }
  ],
  loading: false,
  filter: 'all',
};

const testimonialsSlice = createSlice({
  name: 'testimonials',
  initialState,
  reducers: {
    addTestimonial: (state, action: PayloadAction<Testimonial>) => {
      state.testimonials.unshift(action.payload);
    },
    updateTestimonialStatus: (state, action: PayloadAction<{ id: string; status: 'approved' | 'rejected' }>) => {
      const testimonial = state.testimonials.find(t => t.id === action.payload.id);
      if (testimonial) {
        testimonial.status = action.payload.status;
      }
    },
    setFilter: (state, action: PayloadAction<'all' | 'pending' | 'approved' | 'rejected'>) => {
      state.filter = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { addTestimonial, updateTestimonialStatus, setFilter, setLoading } = testimonialsSlice.actions;
export default testimonialsSlice.reducer;
