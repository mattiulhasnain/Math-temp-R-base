import React, { useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCloseButton?: boolean;
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md',
  showCloseButton = true 
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Handle escape key press
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscapeKey);
    
    return () => {
      window.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);
  
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node) && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, modalRef]);
  
  // Determine width based on size prop
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl'
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop with blur effect */}
      <div 
        className="fixed inset-0 transition-opacity bg-butterfly-blue-900/70 backdrop-blur-sm"
        aria-hidden="true"
      />
      
      {/* Modal container */}
      <div className="flex items-center justify-center min-h-screen p-4">
        {/* Modal panel with animations */}
        <div 
          ref={modalRef}
          className={`${sizeClasses[size]} w-full transform overflow-hidden rounded-xl 
                     bg-butterfly-blue-800/90 backdrop-blur-md border border-butterfly-blue-700/50
                     shadow-2xl shadow-butterfly-purple-500/10 transition-all duration-300
                     animate-fadeIn relative`}
        >
          {/* Modal header */}
          <div className="px-6 py-4 border-b border-butterfly-blue-700/50 flex justify-between items-center">
            <h3 className="text-xl font-semibold text-white bg-gradient-to-r from-butterfly-pink-200 to-butterfly-purple-200 bg-clip-text text-transparent">
              {title}
            </h3>
            {showCloseButton && (
              <button
                type="button"
                className="text-butterfly-blue-300 bg-transparent hover:bg-butterfly-blue-700 hover:text-white rounded-lg p-1.5 ml-auto inline-flex items-center transition-colors duration-200"
                onClick={onClose}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </button>
            )}
          </div>
          
          {/* Modal body */}
          <div className="px-6 py-4">
            {children}
          </div>
          
          {/* Optional glow effect */}
          <div className="absolute -z-10 inset-0 overflow-hidden">
            <div className="absolute -z-10 -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-butterfly-purple-600/20 blur-3xl"></div>
            <div className="absolute -z-10 -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-butterfly-pink-600/20 blur-3xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal; 