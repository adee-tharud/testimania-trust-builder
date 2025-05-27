// src/api/widgetApi.ts
// This would be your API endpoint that serves widget data

import { getTestimonials } from '../services/testimonialsService';

// Types for the API response
interface WidgetApiResponse {
  testimonials: Array<{
    id: string;
    customerName: string;
    rating: number;
    message: string;
    status: string;
    createdAt: string;
  }>;
  config: {
    theme: string;
    layout: string;
    showRating: boolean;
    showDate: boolean;
    primaryColor: string;
    backgroundColor: string;
    textColor: string;
    borderRadius: number;
    maxTestimonials: number;
  };
}

// In-memory storage for widget configurations (in production, use a database)
const widgetConfigs = new Map<string, any>();

// Store widget configuration when user customizes it
export const saveWidgetConfig = (widgetId: string, config: any, userId: string) => {
  widgetConfigs.set(widgetId, { ...config, userId });
};

// API endpoint to get widget data
export const getWidgetData = async (widgetId: string): Promise<WidgetApiResponse | null> => {
  try {
    // Get widget configuration
    const widgetConfig = widgetConfigs.get(widgetId);
    
    if (!widgetConfig) {
      console.error(`Widget configuration not found for ID: ${widgetId}`);
      return null;
    }

    // Fetch testimonials for the user who owns this widget
    const allTestimonials = await getTestimonials(widgetConfig.userId);
    
    // Filter only approved testimonials
    const approvedTestimonials = allTestimonials
      .filter(testimonial => testimonial.status === 'approved')
      .slice(0, widgetConfig.maxTestimonials || 5)
      .map(testimonial => ({
        id: testimonial.id,
        customerName: testimonial.customerName,
        rating: testimonial.rating,
        message: testimonial.message,
        status: testimonial.status,
        createdAt: testimonial.createdAt,
      }));

    return {
      testimonials: approvedTestimonials,
      config: {
        theme: widgetConfig.theme || 'light',
        layout: widgetConfig.layout || 'carousel',
        showRating: widgetConfig.showRating !== false,
        showDate: widgetConfig.showDate !== false,
        primaryColor: widgetConfig.primaryColor || '#3b82f6',
        backgroundColor: widgetConfig.backgroundColor || '#ffffff',
        textColor: widgetConfig.textColor || '#1f2937',
        borderRadius: widgetConfig.borderRadius || 8,
        maxTestimonials: widgetConfig.maxTestimonials || 5,
      }
    };
    
  } catch (error) {
    console.error('Error fetching widget data:', error);
    return null;
  }
};



// React hook to save widget config when user customizes it
import { useAppSelector } from '../hooks/redux';
import { useEffect } from 'react';

export const useWidgetConfigSync = () => {
  const { config, widgetId } = useAppSelector((state) => state.widget);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user && widgetId) {
      // Save the current widget configuration
      saveWidgetConfig(widgetId, config, user.id);
    }
  }, [config, widgetId, user]);
};



