
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WidgetConfig {
  theme: 'light' | 'dark';
  layout: 'carousel' | 'grid' | 'list';
  showRating: boolean;
  showDate: boolean;
  primaryColor: string;
  backgroundColor: string;
  textColor: string;
  borderRadius: number;
  maxTestimonials: number;
}

interface WidgetState {
  config: WidgetConfig;
  embedCode: string;
}

const initialState: WidgetState = {
  config: {
    theme: 'light',
    layout: 'carousel',
    showRating: true,
    showDate: true,
    primaryColor: '#3b82f6',
    backgroundColor: '#ffffff',
    textColor: '#1f2937',
    borderRadius: 8,
    maxTestimonials: 5,
  },
  embedCode: '',
};

const widgetSlice = createSlice({
  name: 'widget',
  initialState,
  reducers: {
    updateConfig: (state, action: PayloadAction<Partial<WidgetConfig>>) => {
      state.config = { ...state.config, ...action.payload };
    },
    generateEmbedCode: (state) => {
      state.embedCode = `<script src="https://testimonials.app/widget.js" data-widget-id="your-widget-id"></script>`;
    },
  },
});

export const { updateConfig, generateEmbedCode } = widgetSlice.actions;
export default widgetSlice.reducer;
