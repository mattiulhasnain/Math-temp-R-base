import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ButterflyAnimation from './ButterflyAnimation';

const Layout: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [showButterflies, setShowButterflies] = useState(true);

  const toggleButterflies = () => {
    setShowButterflies(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-butterfly-green-900 to-butterfly-blue-900 text-white">
      {/* Background Gradient Orbs - Only visible on larger screens */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 hidden lg:block">
        <div className="absolute -top-1/4 -right-1/4 w-[60rem] h-[60rem] bg-butterfly-purple-900/20 rounded-full mix-blend-normal filter blur-[128px] opacity-40 animate-pulse-slow"></div>
        <div className="absolute -bottom-1/4 -left-1/4 w-[60rem] h-[60rem] bg-butterfly-pink-900/20 rounded-full mix-blend-normal filter blur-[128px] opacity-30 animate-pulse-slow" style={{ animationDelay: "2s" }}></div>
        <div className="absolute top-1/2 left-1/3 w-[30rem] h-[30rem] bg-butterfly-green-700/10 rounded-full mix-blend-normal filter blur-[90px] opacity-30 animate-pulse-slow" style={{ animationDelay: "3s" }}></div>
      </div>
      
      {/* Decorative Butterflies - Only visible on larger screens */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 hidden lg:block">
        {/* Top right butterfly */}
        <div className="absolute top-24 right-10 w-8 h-8 opacity-60 animate-float" style={{ animationDelay: "0s" }}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4C10.5 1 8 2 8 4C8 6 10 7 12 7C14 7 16 6 16 4C16 2 13.5 1 12 4Z" fill="#f9a8d4" />
            <path d="M12 4C13.5 1 16 2 16 4C16 6 14 7 12 7C10 7 8 6 8 4C8 2 10.5 1 12 4Z" fill="#c4b5fd" />
            <path d="M12 7V18" stroke="#f9a8d4" strokeWidth="0.5" />
            <path d="M12 18C10.5 21 8 20 8 18C8 16 10 15 12 15C14 15 16 16 16 18C16 20 13.5 21 12 18Z" fill="#f9a8d4" />
            <path d="M12 18C13.5 21 16 20 16 18C16 16 14 15 12 15C10 15 8 16 8 18C8 20 10.5 21 12 18Z" fill="#c4b5fd" />
          </svg>
        </div>
        
        {/* Bottom left butterfly */}
        <div className="absolute bottom-24 left-10 w-6 h-6 opacity-40 animate-float" style={{ animationDelay: "2s" }}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4C10.5 1 8 2 8 4C8 6 10 7 12 7C14 7 16 6 16 4C16 2 13.5 1 12 4Z" fill="#f472b6" />
            <path d="M12 4C13.5 1 16 2 16 4C16 6 14 7 12 7C10 7 8 6 8 4C8 2 10.5 1 12 4Z" fill="#6ee7b7" />
            <path d="M12 7V18" stroke="#f472b6" strokeWidth="0.5" />
            <path d="M12 18C10.5 21 8 20 8 18C8 16 10 15 12 15C14 15 16 16 16 18C16 20 13.5 21 12 18Z" fill="#f472b6" />
            <path d="M12 18C13.5 21 16 20 16 18C16 16 14 15 12 15C10 15 8 16 8 18C8 20 10.5 21 12 18Z" fill="#6ee7b7" />
          </svg>
        </div>
        
        {/* Middle right butterfly */}
        <div className="absolute top-1/2 right-20 w-5 h-5 opacity-30 animate-float" style={{ animationDelay: "4s" }}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4C10.5 1 8 2 8 4C8 6 10 7 12 7C14 7 16 6 16 4C16 2 13.5 1 12 4Z" fill="#a78bfa" />
            <path d="M12 4C13.5 1 16 2 16 4C16 6 14 7 12 7C10 7 8 6 8 4C8 2 10.5 1 12 4Z" fill="#f9a8d4" />
            <path d="M12 7V18" stroke="#a78bfa" strokeWidth="0.5" />
            <path d="M12 18C10.5 21 8 20 8 18C8 16 10 15 12 15C14 15 16 16 16 18C16 20 13.5 21 12 18Z" fill="#a78bfa" />
            <path d="M12 18C13.5 21 16 20 16 18C16 16 14 15 12 15C10 15 8 16 8 18C8 20 10.5 21 12 18Z" fill="#f9a8d4" />
          </svg>
        </div>
      </div>
      
      {/* Animated Butterflies */}
      {showButterflies && <ButterflyAnimation count={15} interactive={true} />}
      
      {/* Grid Pattern Background */}
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBzdHJva2U9IiM0MzQ2NTYiIHN0cm9rZS13aWR0aD0iMC41IiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIG9wYWNpdHk9Ii4xIj48cGF0aCBkPSJNMCAwaDYwdjYwSDB6Ii8+PC9nPjwvc3ZnPg==')] bg-no-repeat bg-fixed opacity-20 pointer-events-none z-0"></div>
      
      {/* Toggle button for butterflies */}
      <button 
        onClick={toggleButterflies} 
        className="fixed bottom-4 right-4 z-50 bg-butterfly-purple-500/80 hover:bg-butterfly-purple-600 text-white p-3 rounded-full shadow-lg backdrop-blur-sm"
        title={showButterflies ? "Hide butterflies" : "Show butterflies"}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          {showButterflies ? (
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          ) : (
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
          )}
        </svg>
      </button>
      
      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <main className={`container mx-auto px-4 ${isHomePage ? '' : 'py-8'}`}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout; 