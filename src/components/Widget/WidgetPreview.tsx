
import React from 'react';
import { useAppSelector } from '../../hooks/redux';
import { Star } from 'lucide-react';

const WidgetPreview = () => {
  const { config } = useAppSelector((state) => state.widget);
  const { testimonials } = useAppSelector((state) => state.testimonials);
  
  const approvedTestimonials = testimonials
    .filter(t => t.status === 'approved')
    .slice(0, config.maxTestimonials);

  const containerStyle = {
    backgroundColor: config.backgroundColor,
    color: config.textColor,
    borderRadius: `${config.borderRadius}px`,
  };

  return (
    <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
      <h3 className="text-lg font-semibold mb-4">Widget Preview</h3>
      
      <div style={containerStyle} className="p-4 space-y-4">
        <h4 className="font-semibold text-lg mb-3">Customer Testimonials</h4>
        
        {config.layout === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {approvedTestimonials.map((testimonial) => (
              <TestimonialItem key={testimonial.id} testimonial={testimonial} config={config} />
            ))}
          </div>
        )}
        
        {config.layout === 'list' && (
          <div className="space-y-4">
            {approvedTestimonials.map((testimonial) => (
              <TestimonialItem key={testimonial.id} testimonial={testimonial} config={config} />
            ))}
          </div>
        )}
        
        {config.layout === 'carousel' && (
          <div className="relative">
            {approvedTestimonials.length > 0 && (
              <TestimonialItem testimonial={approvedTestimonials[0]} config={config} />
            )}
            <div className="flex justify-center mt-4 space-x-2">
              {approvedTestimonials.map((_, index) => (
                <div
                  key={index}
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: index === 0 ? config.primaryColor : '#e5e7eb' }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface TestimonialItemProps {
  testimonial: any;
  config: any;
}

const TestimonialItem: React.FC<TestimonialItemProps> = ({ testimonial, config }) => (
  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
    {config.showRating && (
      <div className="flex items-center mb-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < testimonial.rating ? 'fill-current' : 'text-gray-300'
            }`}
            style={{ color: i < testimonial.rating ? config.primaryColor : undefined }}
          />
        ))}
      </div>
    )}
    <p className="text-sm mb-3">{testimonial.message}</p>
    <div className="flex justify-between items-center text-xs opacity-75">
      <span className="font-medium">{testimonial.customerName}</span>
      {config.showDate && <span>{new Date(testimonial.createdAt).toLocaleDateString()}</span>}
    </div>
  </div>
);

export default WidgetPreview;
