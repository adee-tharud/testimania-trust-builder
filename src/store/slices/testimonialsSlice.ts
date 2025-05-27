
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  getTestimonials, 
  addTestimonial as addTestimonialToFirebase,
  updateTestimonialStatus as updateStatusInFirebase,
  deleteTestimonial as deleteTestimonialFromFirebase
} from '../../services/testimonialsService';

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
  error: string | null;
}

const initialState: TestimonialsState = {
  testimonials: [],
  loading: false,
  filter: 'all',
  error: null,
};

export const fetchTestimonials = createAsyncThunk(
  'testimonials/fetchTestimonials',
  async (userId?: string) => {
    return await getTestimonials(userId);
  }
);

export const addTestimonial = createAsyncThunk(
  'testimonials/addTestimonial',
  async (testimonial: Omit<Testimonial, 'id' | 'createdAt'>) => {
    const id = await addTestimonialToFirebase(testimonial);
    return { ...testimonial, id, createdAt: new Date().toISOString() };
  }
);

export const updateTestimonialStatus = createAsyncThunk(
  'testimonials/updateStatus',
  async ({ id, status }: { id: string; status: 'approved' | 'rejected' }) => {
    await updateStatusInFirebase(id, status);
    return { id, status };
  }
);

export const deleteTestimonial = createAsyncThunk(
  'testimonials/deleteTestimonial',
  async (id: string) => {
    await deleteTestimonialFromFirebase(id);
    return id;
  }
);

const testimonialsSlice = createSlice({
  name: 'testimonials',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<'all' | 'pending' | 'approved' | 'rejected'>) => {
      state.filter = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestimonials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTestimonials.fulfilled, (state, action) => {
        state.loading = false;
        state.testimonials = action.payload;
      })
      .addCase(fetchTestimonials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch testimonials';
      })
      .addCase(addTestimonial.fulfilled, (state, action) => {
        state.testimonials.unshift(action.payload);
      })
      .addCase(updateTestimonialStatus.fulfilled, (state, action) => {
        const testimonial = state.testimonials.find(t => t.id === action.payload.id);
        if (testimonial) {
          testimonial.status = action.payload.status;
        }
      })
      .addCase(deleteTestimonial.fulfilled, (state, action) => {
        state.testimonials = state.testimonials.filter(t => t.id !== action.payload);
      });
  },
});

export const { setFilter, clearError } = testimonialsSlice.actions;
export default testimonialsSlice.reducer;
