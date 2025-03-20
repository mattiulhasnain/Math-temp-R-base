import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-butterfly-purple-500 to-butterfly-pink-500 text-transparent bg-clip-text">
        About CalcHub
      </h1>
      
      <div className="space-y-6 text-gray-300">
        <p>
          Welcome to our web application built using React. Our goal is to provide a seamless and efficient user experience with modern design and performance.
        </p>
        
        <div className="bg-butterfly-blue-900/30 p-6 rounded-xl backdrop-blur-sm border border-butterfly-blue-700/50">
          <h2 className="text-xl font-semibold mb-4 text-white">Our Mission</h2>
          <p>
            To build reliable and innovative web applications that meet user needs and set new standards in digital experiences.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-butterfly-blue-900/30 p-6 rounded-xl backdrop-blur-sm border border-butterfly-blue-700/50">
            <h2 className="text-xl font-semibold mb-4 text-white">What We Offer</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>User-Friendly Interface: Designed with simplicity and clarity in mind.</li>
              <li>Responsive Design: Optimized for all devices.</li>
              <li>Innovative Features: Continuously updated features to improve your experience.</li>
            </ul>
          </div>
          
          <div className="bg-butterfly-blue-900/30 p-6 rounded-xl backdrop-blur-sm border border-butterfly-blue-700/50">
            <h2 className="text-xl font-semibold mb-4 text-white">Technology</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>React with TypeScript</li>
              <li>Modern UI Components</li>
              <li>Real-time Calculations</li>
              <li>Responsive Design</li>
              <li>Progressive Web App</li>
            </ul>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <p className="text-sm text-gray-400">
            Version 4.0.0 • Made with ❤️ by Math Enthusiasts
          </p>
        </div>
      </div>
    </div>
  );
};

export default About; 