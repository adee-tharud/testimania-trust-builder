
import React from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { updateTestimonialStatus, Testimonial } from '../../store/slices/testimonialsSlice';
import { Button } from '../ui/button';
import { Check, X, Star, Calendar } from 'lucide-react';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  const dispatch = useAppDispatch();

  const handleApprove = () => {
    dispatch(updateTestimonialStatus({ id: testimonial.id, status: 'approved' }));
  };

  const handleReject = () => {
    dispatch(updateTestimonialStatus({ id: testimonial.id, status: 'rejected' }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-900">{testimonial.customerName}</h3>
          <p className="text-sm text-gray-600">{testimonial.customerEmail}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(testimonial.status)}`}>
          {testimonial.status}
        </span>
      </div>
      
      <div className="flex items-center mb-3">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <span className="ml-2 text-sm text-gray-600">{testimonial.rating}/5</span>
      </div>
      
      <p className="text-gray-700 mb-4">{testimonial.message}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="w-4 h-4 mr-1" />
          {new Date(testimonial.createdAt).toLocaleDateString()}
        </div>
        
        {testimonial.status === 'pending' && (
          <div className="flex space-x-2">
            <Button size="sm" variant="outline" onClick={handleReject}>
              <X className="w-4 h-4" />
              Reject
            </Button>
            <Button size="sm" onClick={handleApprove}>
              <Check className="w-4 h-4" />
              Approve
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestimonialCard;
