
import React from 'react';
import { useAppSelector } from '../hooks/redux';
import StatsCard from '../components/Dashboard/StatsCard';
import { MessageSquare, CheckCircle, Clock, TrendingUp, Star } from 'lucide-react';

const Dashboard = () => {
  const { testimonials } = useAppSelector((state) => state.testimonials);
  
  const stats = {
    total: testimonials.length,
    approved: testimonials.filter(t => t.status === 'approved').length,
    pending: testimonials.filter(t => t.status === 'pending').length,
    avgRating: testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length || 0,
  };

  const recentTestimonials = testimonials.slice(0, 3);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Overview of your testimonial management</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Testimonials"
          value={stats.total}
          icon={MessageSquare}
          trend={{ value: 12, label: 'from last month' }}
          color="blue"
        />
        <StatsCard
          title="Approved"
          value={stats.approved}
          icon={CheckCircle}
          trend={{ value: 8, label: 'from last month' }}
          color="green"
        />
        <StatsCard
          title="Pending Review"
          value={stats.pending}
          icon={Clock}
          color="yellow"
        />
        <StatsCard
          title="Average Rating"
          value={stats.avgRating.toFixed(1)}
          icon={Star}
          trend={{ value: 0.2, label: 'from last month' }}
          color="blue"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Testimonials</h3>
          <div className="space-y-4">
            {recentTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{testimonial.customerName}</p>
                  <p className="text-sm text-gray-600 truncate">{testimonial.message}</p>
                  <div className="flex items-center mt-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-xs text-gray-500">{testimonial.rating}/5</span>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  testimonial.status === 'approved' ? 'bg-green-100 text-green-800' :
                  testimonial.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {testimonial.status}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
              <div className="font-medium text-blue-900">Create Collection Form</div>
              <div className="text-sm text-blue-600">Generate a new testimonial request form</div>
            </button>
            <button className="w-full text-left p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
              <div className="font-medium text-green-900">Customize Widget</div>
              <div className="text-sm text-green-600">Update your testimonial display widget</div>
            </button>
            <button className="w-full text-left p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
              <div className="font-medium text-purple-900">View Analytics</div>
              <div className="text-sm text-purple-600">Check your testimonial performance</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
