// 1. First, let's create a public API endpoint for fetching widget data
// src/api/widget.ts - This would be your API endpoint

export const getWidgetData = async (widgetId: string) => {
    try {
      // This would fetch testimonials and config for the specific widget
      const response = await fetch(`/api/widget/${widgetId}`);
      if (!response.ok) throw new Error('Failed to fetch widget data');
      return await response.json();
    } catch (error) {
      console.error('Error fetching widget data:', error);
      return null;
    }
  };
  
  // 2. Widget JavaScript that gets embedded
  // public/widget.js - This is the script that external websites would load
  
  (function() {
    'use strict';
    
    // Get the script tag that loaded this widget
    const currentScript = document.currentScript || document.querySelector('script[data-widget-id]');
    const widgetId = currentScript?.getAttribute('data-widget-id');
    
    if (!widgetId) {
      console.error('Testimonial Widget: No widget ID provided');
      return;
    }
  
    // Widget API base URL - update this to your actual domain
    const API_BASE = 'https://testimonialpro.netlify.app/api';
    
    // Create widget container
    function createWidget(data) {
      const { testimonials, config } = data;
      
      if (!testimonials || testimonials.length === 0) {
        return '<div class="testimonial-widget-empty">No testimonials available</div>';
      }
  
      const approvedTestimonials = testimonials
        .filter(t => t.status === 'approved')
        .slice(0, config.maxTestimonials || 5);
  
      if (approvedTestimonials.length === 0) {
        return '<div class="testimonial-widget-empty">No approved testimonials</div>';
      }
  
      const themeClass = config.theme === 'dark' ? 'testimonial-widget-dark' : 'testimonial-widget-light';
      
      let widgetHTML = `
        <div class="testimonial-widget ${themeClass}" style="
          background-color: ${config.backgroundColor || '#ffffff'};
          color: ${config.textColor || '#1f2937'};
          border-radius: ${config.borderRadius || 8}px;
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        ">
          <h3 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600;">Customer Testimonials</h3>
      `;
  
      if (config.layout === 'carousel') {
        widgetHTML += createCarouselLayout(approvedTestimonials, config);
      } else if (config.layout === 'grid') {
        widgetHTML += createGridLayout(approvedTestimonials, config);
      } else {
        widgetHTML += createListLayout(approvedTestimonials, config);
      }
  
      widgetHTML += '</div>';
      
      // Add CSS styles
      widgetHTML += getWidgetStyles(config);
      
      return widgetHTML;
    }
  
    function createCarouselLayout(testimonials, config) {
      const testimonial = testimonials[0]; // Show first testimonial
      let html = `<div class="testimonial-carousel">`;
      html += createTestimonialCard(testimonial, config);
      
      if (testimonials.length > 1) {
        html += '<div class="testimonial-dots" style="text-align: center; margin-top: 16px;">';
        testimonials.forEach((_, index) => {
          const activeColor = index === 0 ? config.primaryColor : '#e5e7eb';
          html += `<span class="testimonial-dot" style="
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: ${activeColor};
            margin: 0 4px;
          "></span>`;
        });
        html += '</div>';
      }
      
      html += '</div>';
      return html;
    }
  
    function createGridLayout(testimonials, config) {
      let html = '<div class="testimonial-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 16px;">';
      testimonials.forEach(testimonial => {
        html += createTestimonialCard(testimonial, config);
      });
      html += '</div>';
      return html;
    }
  
    function createListLayout(testimonials, config) {
      let html = '<div class="testimonial-list" style="display: flex; flex-direction: column; gap: 16px;">';
      testimonials.forEach(testimonial => {
        html += createTestimonialCard(testimonial, config);
      });
      html += '</div>';
      return html;
    }
  
    function createTestimonialCard(testimonial, config) {
      const cardBg = config.theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';
      const cardBorder = config.theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)';
      
      let html = `
        <div class="testimonial-card" style="
          background-color: ${cardBg};
          border: 1px solid ${cardBorder};
          border-radius: ${Math.max((config.borderRadius || 8) - 4, 4)}px;
          padding: 16px;
          transition: all 0.2s ease;
        ">
      `;
  
      // Rating stars
      if (config.showRating) {
        html += '<div class="testimonial-rating" style="margin-bottom: 8px;">';
        for (let i = 0; i < 5; i++) {
          const starColor = i < testimonial.rating ? config.primaryColor : '#e5e7eb';
          html += `<span style="color: ${starColor}; font-size: 14px;">★</span>`;
        }
        html += `<span style="margin-left: 8px; font-size: 12px; opacity: 0.8;">${testimonial.rating}/5</span>`;
        html += '</div>';
      }
  
      // Message
      html += `<p style="margin: 0 0 12px 0; font-size: 14px; line-height: 1.5;">"${testimonial.message}"</p>`;
  
      // Footer
      html += '<div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; opacity: 0.8;">';
      html += `<span style="font-weight: 500;">${testimonial.customerName}</span>`;
      
      if (config.showDate) {
        const date = new Date(testimonial.createdAt).toLocaleDateString();
        html += `<span>${date}</span>`;
      }
      
      html += '</div></div>';
      
      return html;
    }
  
    function getWidgetStyles(config) {
      return `
        <style>
          .testimonial-widget {
            max-width: 100%;
            box-sizing: border-box;
          }
          .testimonial-widget * {
            box-sizing: border-box;
          }
          .testimonial-widget-empty {
            text-align: center;
            padding: 20px;
            opacity: 0.6;
            font-style: italic;
          }
          .testimonial-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }
          @media (max-width: 768px) {
            .testimonial-grid {
              grid-template-columns: 1fr !important;
            }
          }
        </style>
      `;
    }
  
    // Fetch widget data and render
    async function loadWidget() {
      try {
        const response = await fetch(`${API_BASE}/widget/${widgetId}`);
        if (!response.ok) throw new Error('Failed to load widget');
        
        const data = await response.json();
        const widgetHTML = createWidget(data);
        
        // Insert widget after the script tag
        const container = document.createElement('div');
        container.innerHTML = widgetHTML;
        currentScript.parentNode.insertBefore(container, currentScript.nextSibling);
        
      } catch (error) {
        console.error('Testimonial Widget Error:', error);
        
        // Show error message
        const errorContainer = document.createElement('div');
        errorContainer.innerHTML = `
          <div style="
            padding: 16px;
            background-color: #fee2e2;
            border: 1px solid #fecaca;
            border-radius: 8px;
            color: #991b1b;
            font-family: sans-serif;
            font-size: 14px;
          ">
            <strong>Testimonial Widget Error:</strong> Unable to load testimonials. Please check your widget configuration.
          </div>
        `;
        currentScript.parentNode.insertBefore(errorContainer, currentScript.nextSibling);
      }
    }
  
    // Load widget when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', loadWidget);
    } else {
      loadWidget();
    }
  })();
  
  // 3. Updated Widget Slice with better embed code generation
  // src/store/slices/widgetSlice.ts - Update the generateEmbedCode action
  
  const widgetSliceUpdated = {
    // ... existing code ...
    
    reducers: {
      // ... existing reducers ...
      
      generateEmbedCode: (state) => {
        const baseUrl = window.location.origin; // Gets the current domain
        
        // Generate two types of embed code
        state.embedCode = `<!-- Testimonial Widget - Copy and paste this code into your website -->
  <script 
    src="${baseUrl}/widget.js" 
    data-widget-id="${state.widgetId}"
    async>
  </script>
  
  <!-- Alternative: Manual Integration -->
  <!-- 
  <div id="testimonial-widget-${state.widgetId}"></div>
  <script>
    (async () => {
      try {
        const response = await fetch('${baseUrl}/api/widget/${state.widgetId}');
        const data = await response.json();
        // Custom integration code here
      } catch (error) {
        console.error('Widget load error:', error);
      }
    })();
  </script>
  -->`;
      },
      
      // ... rest of reducers
    }
  };
  
  // 4. API Route to serve widget data
  // This would be your backend API endpoint (Express.js example)
  
  /*
  // api/widget/[widgetId].js
  export default async function handler(req, res) {
    const { widgetId } = req.query;
    
    try {
      // Fetch widget configuration and approved testimonials
      const widgetConfig = await getWidgetConfig(widgetId);
      const testimonials = await getApprovedTestimonials(widgetConfig.userId);
      
      // Set CORS headers for cross-origin requests
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      
      res.status(200).json({
        testimonials: testimonials.filter(t => t.status === 'approved'),
        config: widgetConfig
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch widget data' });
    }
  }
  */