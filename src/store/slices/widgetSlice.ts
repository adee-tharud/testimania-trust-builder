
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
  widgetId: string;
}

// Generate a unique widget ID
const generateWidgetId = () => {
  return 'widget_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
};

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
  widgetId: generateWidgetId(),
};

const widgetSlice = createSlice({
  name: 'widget',
  initialState,
  reducers: {
    updateConfig: (state, action: PayloadAction<Partial<WidgetConfig>>) => {
      state.config = { ...state.config, ...action.payload };
    },
    generateEmbedCode: (state) => {
      state.embedCode = `<script src="https://testimania-trust-builder.lovable.app/widget.js" data-widget-id="${state.widgetId}"></script>`;
    },
    regenerateWidgetId: (state) => {
      state.widgetId = generateWidgetId();
      // Clear embed code so user needs to regenerate it with new ID
      state.embedCode = '';
    },
  },
});

export const { updateConfig, generateEmbedCode, regenerateWidgetId } = widgetSlice.actions;
export default widgetSlice.reducer;
