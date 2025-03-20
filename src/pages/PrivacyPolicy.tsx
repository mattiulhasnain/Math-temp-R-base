import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-butterfly-purple-500 to-butterfly-pink-500 text-transparent bg-clip-text">
        Privacy Policy
      </h1>
      
      <div className="bg-butterfly-blue-900/30 p-6 rounded-xl backdrop-blur-sm border border-butterfly-blue-700/50">
        <p className="text-gray-400 mb-6">Last Updated: March 20, 2024</p>
        
        <div className="space-y-6 text-gray-300">
          <p>
            Your privacy is important to us. This Privacy Policy explains how our website ("we", "us", or "our") collects, uses, and protects your personal information when you visit or use our services.
          </p>
          
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-2 text-white">1. Information We Collect</h2>
              <ul className="list-disc list-inside space-y-1 pl-4">
                <li><span className="font-medium">Personal Data:</span> When you sign up or contact us, we may collect your name, email address, and any other information you voluntarily provide.</li>
                <li><span className="font-medium">Usage Data:</span> We collect information automatically through cookies and similar technologies, such as your IP address, browser type, pages visited, and other usage data.</li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-2 text-white">2. How We Use Your Information</h2>
              <ul className="list-disc list-inside space-y-1 pl-4">
                <li><span className="font-medium">To Provide Services:</span> We use your information to operate and maintain the website, process your requests, and deliver customer support.</li>
                <li><span className="font-medium">Improvement:</span> Data collected may be used to enhance user experience and improve our website functionality.</li>
                <li><span className="font-medium">Communication:</span> We may use your email address to send you service-related notices or promotional messages (if you opt in).</li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-2 text-white">3. Sharing Your Information</h2>
              <p>We do not sell or share your personal data with third parties except as necessary to operate our website or comply with legal obligations.</p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-2 text-white">4. Cookies and Tracking</h2>
              <p>Our website uses cookies to track user activity and improve your browsing experience. You can control cookie settings through your browser preferences.</p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-2 text-white">5. Data Security</h2>
              <p>We implement appropriate security measures to protect your data from unauthorized access, alteration, disclosure, or destruction.</p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-2 text-white">6. Your Rights</h2>
              <p>You have the right to access, update, or delete your personal information. Contact us using the details provided below to exercise these rights.</p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-2 text-white">7. Changes to This Policy</h2>
              <p>We may update this Privacy Policy periodically. Please review it regularly to stay informed about any changes.</p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-2 text-white">8. Contact Us</h2>
              <p>If you have any questions regarding this Privacy Policy, please reach out at:</p>
              <p className="mt-2">Email: <a href="mailto:m.mattiulhasnain@gmail.com" className="text-butterfly-purple-400 hover:text-butterfly-purple-300">m.mattiulhasnain@gmail.com</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 