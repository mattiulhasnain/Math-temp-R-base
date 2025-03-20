import React, { useState } from 'react';
import { useToastMessages } from '../components/Toast';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToastMessages();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare email content
      const subject = encodeURIComponent(`CalcHub Contact Form: ${formData.subject}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      
      // Open user's email client with prefilled data
      window.open(`mailto:m.mattiulhasnain@gmail.com?subject=${subject}&body=${body}`);
      
      // Show success message
      toast.success('Thank you for your message! Your email client should open with your message details.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      toast.error('Failed to send message. Please try again later or email us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-butterfly-purple-500 to-butterfly-pink-500 text-transparent bg-clip-text">
        Contact Us
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="bg-butterfly-blue-900/30 p-6 rounded-xl backdrop-blur-sm border border-butterfly-blue-700/50">
            <h2 className="text-xl font-semibold mb-4 text-white">Get in Touch</h2>
            <p className="text-gray-300 mb-6">
              Have questions or suggestions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center text-gray-300">
                <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:m.mattiulhasnain@gmail.com" className="text-butterfly-purple-400 hover:text-butterfly-purple-300">
                  m.mattiulhasnain@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-butterfly-blue-900/30 p-6 rounded-xl backdrop-blur-sm border border-butterfly-blue-700/50">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-butterfly-blue-800/50 border border-butterfly-blue-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-butterfly-purple-500"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-butterfly-blue-800/50 border border-butterfly-blue-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-butterfly-purple-500"
                placeholder="your@email.com"
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">Subject</label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-butterfly-blue-800/50 border border-butterfly-blue-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-butterfly-purple-500"
              >
                <option value="">Select a subject</option>
                <option value="general">General Inquiry</option>
                <option value="support">Technical Support</option>
                <option value="feedback">Feedback</option>
                <option value="bug">Report a Bug</option>
                <option value="feature">Feature Request</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2 rounded-lg bg-butterfly-blue-800/50 border border-butterfly-blue-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-butterfly-purple-500"
                placeholder="Your message..."
              />
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full px-6 py-3 rounded-lg bg-gradient-to-r from-butterfly-purple-500 to-butterfly-pink-500 text-white font-medium transition-all duration-200 ${
                isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:from-butterfly-purple-600 hover:to-butterfly-pink-600'
              }`}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact; 