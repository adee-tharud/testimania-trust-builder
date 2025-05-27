import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { getWidgetData } from '../api/widgetApi';
import { getWidgetData } from '@/api/WidgetApi';

const WidgetStandalone = () => {
  const { widgetId } = useParams<{ widgetId: string }>();
  const [widgetData, setWidgetData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWidget = async () => {
      if (!widgetId) return;
      
      try {
        const data = await getWidgetData(widgetId);
        if (data) {
          setWidgetData(data);
        } else {
          setError('Widget not found');
        }
      } catch (err) {
        setError('Failed to load widget');
      } finally {
        setLoading(false);
      }
    };

    loadWidget();
  }, [widgetId]);

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        Loading testimonials...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: '#ef4444' }}>
        {error}
      </div>
    );
  }

  if (!widgetData) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        No testimonials available
      </div>
    );
  }

  // Render the widget using the same logic as WidgetPreview
  return (
    <div style={{
      backgroundColor: widgetData.config.backgroundColor,
      color: widgetData.config.textColor,
      borderRadius: `${widgetData.config.borderRadius}px`,
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      minHeight: '200px'
    }}>
      {/* Widget content here - same as WidgetPreview component */}
    </div>
  );
};
