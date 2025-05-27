
// import React from 'react';
// import { useAppSelector } from '../../hooks/redux';
// import { Star } from 'lucide-react';

// const WidgetPreview = () => {
//   const { config } = useAppSelector((state) => state.widget);
//   const { testimonials } = useAppSelector((state) => state.testimonials);
  
//   const approvedTestimonials = testimonials
//     .filter(t => t.status === 'approved')
//     .slice(0, config.maxTestimonials);

//   const containerStyle = {
//     backgroundColor: config.backgroundColor,
//     color: config.textColor,
//     borderRadius: `${config.borderRadius}px`,
//   };

//   return (
//     <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
//       <h3 className="text-lg font-semibold mb-4">Widget Preview</h3>
      
//       <div style={containerStyle} className="p-4 space-y-4">
//         <h4 className="font-semibold text-lg mb-3">Customer Testimonials</h4>
        
//         {config.layout === 'grid' && (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {approvedTestimonials.map((testimonial) => (
//               <TestimonialItem key={testimonial.id} testimonial={testimonial} config={config} />
//             ))}
//           </div>
//         )}
        
//         {config.layout === 'list' && (
//           <div className="space-y-4">
//             {approvedTestimonials.map((testimonial) => (
//               <TestimonialItem key={testimonial.id} testimonial={testimonial} config={config} />
//             ))}
//           </div>
//         )}
        
//         {config.layout === 'carousel' && (
//           <div className="relative">
//             {approvedTestimonials.length > 0 && (
//               <TestimonialItem testimonial={approvedTestimonials[0]} config={config} />
//             )}
//             <div className="flex justify-center mt-4 space-x-2">
//               {approvedTestimonials.map((_, index) => (
//                 <div
//                   key={index}
//                   className="w-2 h-2 rounded-full"
//                   style={{ backgroundColor: index === 0 ? config.primaryColor : '#e5e7eb' }}
//                 />
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// interface TestimonialItemProps {
//   testimonial: any;
//   config: any;
// }

// const TestimonialItem: React.FC<TestimonialItemProps> = ({ testimonial, config }) => (
//   <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
//     {config.showRating && (
//       <div className="flex items-center mb-2">
//         {[...Array(5)].map((_, i) => (
//           <Star
//             key={i}
//             className={`w-4 h-4 ${
//               i < testimonial.rating ? 'fill-current' : 'text-gray-300'
//             }`}
//             style={{ color: i < testimonial.rating ? config.primaryColor : undefined }}
//           />
//         ))}
//       </div>
//     )}
//     <p className="text-sm mb-3">{testimonial.message}</p>
//     <div className="flex justify-between items-center text-xs opacity-75">
//       <span className="font-medium">{testimonial.customerName}</span>
//       {config.showDate && <span>{new Date(testimonial.createdAt).toLocaleDateString()}</span>}
//     </div>
//   </div>
// );

// export default WidgetPreview;

import React from 'react';
import { useAppSelector } from '../../hooks/redux';
import { Star } from 'lucide-react';

const WidgetPreview = () => {
  const { config } = useAppSelector((state) => state.widget);
  const { testimonials } = useAppSelector((state) => state.testimonials);
  
  const approvedTestimonials = testimonials
    .filter(t => t.status === 'approved')
    .slice(0, config.maxTestimonials);

  // Apply theme-based colors
  const getThemeColors = () => {
    if (config.theme === 'dark') {
      return {
        backgroundColor: config.backgroundColor || '#1f2937',
        textColor: config.textColor || '#f9fafb',
        cardBackground: 'rgba(255, 255, 255, 0.1)',
        cardBorder: 'rgba(255, 255, 255, 0.2)',
      };
    } else {
      return {
        backgroundColor: config.backgroundColor || '#ffffff',
        textColor: config.textColor || '#1f2937',
        cardBackground: 'rgba(0, 0, 0, 0.05)',
        cardBorder: 'rgba(0, 0, 0, 0.1)',
      };
    }
  };

  const themeColors = getThemeColors();

  const containerStyle = {
    backgroundColor: themeColors.backgroundColor,
    color: themeColors.textColor,
    borderRadius: `${config.borderRadius}px`,
  };

  return (
    <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
      <h3 className="text-lg font-semibold mb-4">Widget Preview</h3>
      
      <div style={containerStyle} className="p-4 space-y-4 min-h-[200px]">
        <h4 className="font-semibold text-lg mb-3" style={{ color: themeColors.textColor }}>
          Customer Testimonials
        </h4>
        
        {approvedTestimonials.length === 0 ? (
          <div className="text-center py-8" style={{ color: themeColors.textColor }}>
            <p className="text-sm opacity-75">No approved testimonials to display</p>
            <p className="text-xs opacity-60 mt-1">Add some testimonials and approve them to see the preview</p>
          </div>
        ) : (
          <>
            {config.layout === 'grid' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {approvedTestimonials.map((testimonial) => (
                  <TestimonialItem 
                    key={testimonial.id} 
                    testimonial={testimonial} 
                    config={config}
                    themeColors={themeColors}
                  />
                ))}
              </div>
            )}
            
            {config.layout === 'list' && (
              <div className="space-y-4">
                {approvedTestimonials.map((testimonial) => (
                  <TestimonialItem 
                    key={testimonial.id} 
                    testimonial={testimonial} 
                    config={config}
                    themeColors={themeColors}
                  />
                ))}
              </div>
            )}
            
            {config.layout === 'carousel' && (
              <div className="relative">
                {approvedTestimonials.length > 0 && (
                  <TestimonialItem 
                    testimonial={approvedTestimonials[0]} 
                    config={config}
                    themeColors={themeColors}
                  />
                )}
                {approvedTestimonials.length > 1 && (
                  <div className="flex justify-center mt-4 space-x-2">
                    {approvedTestimonials.map((_, index) => (
                      <div
                        key={index}
                        className="w-2 h-2 rounded-full transition-colors"
                        style={{ 
                          backgroundColor: index === 0 ? config.primaryColor : (
                            config.theme === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)'
                          )
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

interface TestimonialItemProps {
  testimonial: any;
  config: any;
  themeColors: {
    backgroundColor: string;
    textColor: string;
    cardBackground: string;
    cardBorder: string;
  };
}

const TestimonialItem: React.FC<TestimonialItemProps> = ({ testimonial, config, themeColors }) => {
  const cardStyle = {
    backgroundColor: themeColors.cardBackground,
    borderColor: themeColors.cardBorder,
    color: themeColors.textColor,
    borderRadius: `${Math.max(config.borderRadius - 4, 4)}px`,
  };

  return (
    <div 
      className="backdrop-blur-sm p-4 border transition-all duration-200 hover:shadow-sm"
      style={cardStyle}
    >
      {config.showRating && (
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 transition-colors ${
                i < testimonial.rating ? 'fill-current' : ''
              }`}
              style={{ 
                color: i < testimonial.rating 
                  ? config.primaryColor 
                  : (config.theme === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)')
              }}
            />
          ))}
          <span className="ml-2 text-xs" style={{ color: themeColors.textColor, opacity: 0.8 }}>
            {testimonial.rating}/5
          </span>
        </div>
      )}
      
      <p className="text-sm mb-3 leading-relaxed" style={{ color: themeColors.textColor }}>
        "{testimonial.message}"
      </p>
      
      <div className="flex justify-between items-center text-xs" style={{ color: themeColors.textColor, opacity: 0.8 }}>
        <span className="font-medium">{testimonial.customerName}</span>
        {config.showDate && (
          <span>{new Date(testimonial.createdAt).toLocaleDateString()}</span>
        )}
      </div>
    </div>
  );
};

export default WidgetPreview;