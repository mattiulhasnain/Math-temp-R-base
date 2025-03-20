import React from 'react';

const TermsOfService: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-butterfly-purple-500 to-butterfly-pink-500 text-transparent bg-clip-text">
        Terms of Service
      </h1>
      
      <div className="bg-butterfly-blue-900/30 p-6 rounded-xl backdrop-blur-sm border border-butterfly-blue-700/50">
        <p className="text-gray-400 mb-6">Last Updated: March 20, 2024</p>
        
        <div className="space-y-6 text-gray-300">
          <p>
            By using our website, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our website.
          </p>
          
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-2 text-white">1. Acceptance of Terms</h2>
              <p>Your access and use of the website is subject to these Terms of Service and all applicable laws and regulations.</p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-2 text-white">2. Use of the Website</h2>
              <ul className="list-disc list-inside space-y-1 pl-4">
                <li>You agree to use the website for lawful purposes only. Any misuse or unauthorized activity is prohibited.</li>
                <li>We reserve the right to modify or terminate services without prior notice.</li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-2 text-white">3. Intellectual Property</h2>
              <p>All content on this website, including text, images, logos, and designs, is the property of the developer or its licensors. You may not reproduce, distribute, or modify any content without prior written permission.</p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-2 text-white">4. User-Generated Content</h2>
              <p>You are responsible for the content you post. By posting, you grant us a non-exclusive license to use, display, and distribute your content on the website.</p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-2 text-white">5. Disclaimer of Warranties</h2>
              <p>The website is provided on an "as is" basis without warranties of any kind. We do not guarantee that the service will be uninterrupted or error-free.</p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-2 text-white">6. Limitation of Liability</h2>
              <p>In no event shall we be liable for any damages arising out of or in connection with your use of the website.</p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-2 text-white">7. Governing Law</h2>
              <p>These Terms are governed by the laws of the jurisdiction in which the developer operates.</p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-2 text-white">8. Changes to Terms</h2>
              <p>We reserve the right to update or change these Terms at any time. Continued use of the website signifies acceptance of any modifications.</p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-2 text-white">9. Contact Us</h2>
              <p>For any questions regarding these Terms of Service, please contact:</p>
              <p className="mt-2">Email: <a href="mailto:m.mattiulhasnain@gmail.com" className="text-butterfly-purple-400 hover:text-butterfly-purple-300">m.mattiulhasnain@gmail.com</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService; 