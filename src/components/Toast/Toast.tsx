import React, { useEffect, useState } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
  onClose: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ 
  id, 
  message, 
  type, 
  duration = 5000, 
  onClose 
}) => {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(100);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPaused && visible) {
      const startTime = Date.now();
      const endTime = startTime + duration;
      
      const progressInterval = setInterval(() => {
        const now = Date.now();
        const remaining = endTime - now;
        const percent = (remaining / duration) * 100;
        
        if (percent <= 0) {
          clearInterval(progressInterval);
          handleClose();
        } else {
          setProgress(percent);
        }
      }, 16);
      
      return () => {
        clearInterval(progressInterval);
      };
    }
  }, [duration, visible, isPaused]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      onClose(id);
    }, 300); // Wait for exit animation
  };

  const iconByType = {
    success: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
      </svg>
    ),
    error: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
      </svg>
    ),
    warning: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
      </svg>
    ),
    info: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
      </svg>
    ),
  };

  const bgColorByType = {
    success: 'bg-gradient-to-r from-butterfly-green-600 to-butterfly-teal-600',
    error: 'bg-gradient-to-r from-butterfly-red-600 to-butterfly-rose-600',
    warning: 'bg-gradient-to-r from-butterfly-amber-500 to-butterfly-orange-500',
    info: 'bg-gradient-to-r from-butterfly-blue-600 to-butterfly-cyan-600',
  };

  const progressColorByType = {
    success: 'bg-butterfly-green-300',
    error: 'bg-butterfly-red-300',
    warning: 'bg-butterfly-amber-300',
    info: 'bg-butterfly-blue-300',
  };

  const textColorByType = {
    success: 'text-butterfly-green-400',
    error: 'text-butterfly-red-400',
    warning: 'text-butterfly-amber-400',
    info: 'text-butterfly-blue-400',
  };

  return (
    <div 
      className={`
        max-w-xs w-full ${bgColorByType[type]} backdrop-blur-sm shadow-lg rounded-lg pointer-events-auto 
        border border-butterfly-blue-700/50 overflow-hidden transition-all duration-300 transform
        ${visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      `}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className={textColorByType[type]}>
            {iconByType[type]}
          </div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            <p className="text-sm font-medium text-white">{message}</p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              className="bg-transparent rounded-md inline-flex text-butterfly-blue-300 hover:text-butterfly-blue-100 focus:outline-none focus:ring-2 focus:ring-butterfly-purple-400"
              onClick={handleClose}
            >
              <span className="sr-only">Close</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="w-full h-1 bg-butterfly-blue-800">
        <div 
          className={`h-full ${progressColorByType[type]} transition-all duration-100 ease-linear`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default Toast; 