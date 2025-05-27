
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface WidgetConfig {
//   theme: 'light' | 'dark';
//   layout: 'carousel' | 'grid' | 'list';
//   showRating: boolean;
//   showDate: boolean;
//   primaryColor: string;
//   backgroundColor: string;
//   textColor: string;
//   borderRadius: number;
//   maxTestimonials: number;
// }

// interface WidgetState {
//   config: WidgetConfig;
//   embedCode: string;
//   widgetId: string;
// }

// // Generate a unique widget ID
// const generateWidgetId = () => {
//   return 'widget_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
// };

// const initialState: WidgetState = {
//   config: {
//     theme: 'light',
//     layout: 'carousel',
//     showRating: true,
//     showDate: true,
//     primaryColor: '#3b82f6',
//     backgroundColor: '#ffffff',
//     textColor: '#1f2937',
//     borderRadius: 8,
//     maxTestimonials: 5,
//   },
//   embedCode: '',
//   widgetId: generateWidgetId(),
// };

// const widgetSlice = createSlice({
//   name: 'widget',
//   initialState,
//   reducers: {
//     updateConfig: (state, action: PayloadAction<Partial<WidgetConfig>>) => {
//       state.config = { ...state.config, ...action.payload };
//     },
//     generateEmbedCode: (state) => {
//       state.embedCode = `<script src="https://testimonialpro.netlify.app/widget.js" data-widget-id="${state.widgetId}"></script>`;
//     },
//     regenerateWidgetId: (state) => {
//       state.widgetId = generateWidgetId();
//       // Clear embed code so user needs to regenerate it with new ID
//       state.embedCode = '';
//     },
//   },
// });

// export const { updateConfig, generateEmbedCode, regenerateWidgetId } = widgetSlice.actions;
// export default widgetSlice.reducer;


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
      // Clear embed code when config changes so user knows to regenerate
      state.embedCode = '';
    },
    generateEmbedCode: (state) => {
      // Use current domain for the widget script
      const baseUrl = typeof window !== 'undefined' ? window.location.origin : '/https://testimonialpro.netlify.app';
      
      state.embedCode = `<!-- Testimonial Widget Embed Code -->
<!-- Copy and paste this code where you want the testimonials to appear -->
<script 
  src="${baseUrl}/widget.js" 
  data-widget-id="${state.widgetId}"
  data-theme="${state.config.theme}"
  data-layout="${state.config.layout}"
  async>
</script>

<!-- Alternative: iFrame Embed (more reliable cross-domain) -->
<!-- 
<iframe 
  src="${baseUrl}/widget/${state.widgetId}" 
  width="100%" 
  height="400"
  frameborder="0"
  style="border-radius: ${state.config.borderRadius}px;">
</iframe>
-->

<!-- Manual Integration Example -->
<!-- 
<div id="testimonial-widget-${state.widgetId}"></div>
<script>
(async function() {
  try {
    const response = await fetch('${baseUrl}/api/widget/${state.widgetId}');
    const data = await response.json();
    
    // You can now use data.testimonials and data.config
    // to build your own custom testimonial display
    console.log('Widget data:', data);
    
  } catch (error) {
    console.error('Failed to load testimonials:', error);
  }
})();
</script>
-->`;
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