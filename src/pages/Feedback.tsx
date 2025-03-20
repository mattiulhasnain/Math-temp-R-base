import React, { useState } from 'react';
import { useToastMessages } from '../components/Toast';

interface FeedbackRating {
  category: string;
  rating: number;
}

const Feedback: React.FC = () => {
  const [ratings, setRatings] = useState<FeedbackRating[]>([
    { category: 'User Interface', rating: 0 },
    { category: 'Calculation Accuracy', rating: 0 },
    { category: 'Feature Set', rating: 0 },
    { category: 'Performance', rating: 0 },
    { category: 'Documentation', rating: 0 }
  ]);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToastMessages();

  const handleRatingChange = (category: string, rating: number) => {
    setRatings(prev => 
      prev.map(item => 
        item.category === category ? { ...item, rating } : item
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      toast.success('Thank you for your feedback!');
      
      // Reset form
      setRatings(prev => prev.map(item => ({ ...item, rating: 0 })));
      setComment('');
    } catch (error) {
      toast.error('Failed to submit feedback. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-butterfly-purple-500 to-butterfly-pink-500 text-transparent bg-clip-text">
        Your Feedback
      </h1>

      <div className="bg-butterfly-blue-900/30 p-6 rounded-xl backdrop-blur-sm border border-butterfly-blue-700/50">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4 text-white">Rate Your Experience</h2>
            <div className="space-y-4">
              {ratings.map(({ category, rating }) => (
                <div key={category}>
                  <label className="block text-sm font-medium text-gray-300 mb-2">{category}</label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRatingChange(category, star)}
                        className={`p-1 focus:outline-none transition-colors duration-200 ${
                          star <= rating
                            ? 'text-yellow-400 hover:text-yellow-300'
                            : 'text-gray-600 hover:text-gray-500'
                        }`}
                      >
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-gray-300 mb-2">
              Additional Comments
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 rounded-lg bg-butterfly-blue-800/50 border border-butterfly-blue-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-butterfly-purple-500"
              placeholder="Tell us what you think..."
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || ratings.every(r => r.rating === 0)}
            className={`w-full px-6 py-3 rounded-lg bg-gradient-to-r from-butterfly-purple-500 to-butterfly-pink-500 text-white font-medium transition-all duration-200 ${
              isSubmitting || ratings.every(r => r.rating === 0)
                ? 'opacity-75 cursor-not-allowed'
                : 'hover:from-butterfly-purple-600 hover:to-butterfly-pink-600'
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Feedback; 