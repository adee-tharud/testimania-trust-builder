
import React from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { setFilter } from '../store/slices/testimonialsSlice';
import TestimonialCard from '../components/Testimonials/TestimonialCard';
import { Button } from '../components/ui/button';
import { Plus, Filter } from 'lucide-react';

const TestimonialsPage = () => {
  const dispatch = useAppDispatch();
  const { testimonials, filter } = useAppSelector((state) => state.testimonials);
  
  const filteredTestimonials = testimonials.filter(testimonial => {
    if (filter === 'all') return true;
    return testimonial.status === filter;
  });

  const filterButtons = [
    { key: 'all', label: 'All', count: testimonials.length },
    { key: 'pending', label: 'Pending', count: testimonials.filter(t => t.status === 'pending').length },
    { key: 'approved', label: 'Approved', count: testimonials.filter(t => t.status === 'approved').length },
    { key: 'rejected', label: 'Rejected', count: testimonials.filter(t => t.status === 'rejected').length },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Testimonials</h1>
          <p className="text-gray-600">Manage and organize your customer testimonials</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Form
        </Button>
      </div>
      
      <div className="flex items-center space-x-2">
        <Filter className="w-4 h-4 text-gray-500" />
        <div className="flex space-x-2">
          {filterButtons.map((filterButton) => (
            <Button
              key={filterButton.key}
              variant={filter === filterButton.key ? 'default' : 'outline'}
              size="sm"
              onClick={() => dispatch(setFilter(filterButton.key as any))}
              className="relative"
            >
              {filterButton.label}
              <span className="ml-2 bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-xs">
                {filterButton.count}
              </span>
            </Button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTestimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
      
      {filteredTestimonials.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No testimonials found</h3>
          <p className="text-gray-600 mb-4">
            {filter === 'all' 
              ? 'Start collecting testimonials from your customers'
              : `No ${filter} testimonials at the moment`
            }
          </p>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Create Collection Form
          </Button>
        </div>
      )}
    </div>
  );
};

export default TestimonialsPage;
