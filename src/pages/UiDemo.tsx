import React, { useState } from 'react';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { useToastMessages } from '../components/Toast';

const UiDemo: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'buttons' | 'modals' | 'toasts'>('buttons');
  const toast = useToastMessages();

  const showToastDemo = (type: 'success' | 'error' | 'warning' | 'info') => {
    const messages = {
      success: 'Operation completed successfully!',
      error: 'An error occurred while processing your request.',
      warning: 'Please review your input before continuing.',
      info: 'This feature will be available soon.'
    };
    
    toast[type](messages[type]);
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-butterfly-purple-500 to-butterfly-pink-500 text-transparent bg-clip-text">
        UI Component Demo
      </h1>
      
      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className="bg-butterfly-blue-900/70 p-1 rounded-xl backdrop-blur-sm border border-butterfly-blue-700/50 shadow-md">
          <div className="flex space-x-1">
            {(['buttons', 'modals', 'toasts'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`
                  px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
                  ${selectedTab === tab 
                    ? 'bg-gradient-to-r from-butterfly-purple-500 to-butterfly-pink-500 text-white shadow-lg shadow-butterfly-purple-500/30' 
                    : 'text-butterfly-blue-200 hover:bg-butterfly-blue-800/50 hover:text-white'}
                `}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Component Showcase */}
      <div className="p-6 rounded-xl bg-butterfly-blue-900/70 backdrop-blur-md border border-butterfly-blue-800/50 shadow-lg">
        {/* Buttons Section */}
        {selectedTab === 'buttons' && (
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-butterfly-purple-300">Buttons</h2>
            
            <div className="space-y-8">
              {/* Button Variants */}
              <div>
                <h3 className="text-lg font-medium mb-4 text-butterfly-blue-200">Variants</h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="text">Text</Button>
                  <Button variant="success">Success</Button>
                  <Button variant="danger">Danger</Button>
                  <Button variant="warning">Warning</Button>
                  <Button variant="info">Info</Button>
                </div>
              </div>
              
              {/* Button Sizes */}
              <div>
                <h3 className="text-lg font-medium mb-4 text-butterfly-blue-200">Sizes</h3>
                <div className="flex flex-wrap items-center gap-4">
                  <Button size="xs" variant="primary">Extra Small</Button>
                  <Button size="sm" variant="primary">Small</Button>
                  <Button size="md" variant="primary">Medium</Button>
                  <Button size="lg" variant="primary">Large</Button>
                  <Button size="xl" variant="primary">Extra Large</Button>
                </div>
              </div>
              
              {/* Button with Icons */}
              <div>
                <h3 className="text-lg font-medium mb-4 text-butterfly-blue-200">With Icons</h3>
                <div className="flex flex-wrap gap-4">
                  <Button 
                    variant="primary" 
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                      </svg>
                    }
                  >
                    Add Item
                  </Button>
                  <Button 
                    variant="secondary" 
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    }
                  >
                    Information
                  </Button>
                  <Button 
                    variant="outline" 
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    }
                  >
                    Download
                  </Button>
                  <Button 
                    variant="success" 
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    }
                  >
                    Confirm
                  </Button>
                </div>
              </div>
              
              {/* Loading State */}
              <div>
                <h3 className="text-lg font-medium mb-4 text-butterfly-blue-200">Loading State</h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary" loading>Loading</Button>
                  <Button variant="secondary" loading>Processing</Button>
                  <Button variant="success" loading>Saving</Button>
                  <Button variant="danger" loading>Deleting</Button>
                </div>
              </div>
              
              {/* Disabled State */}
              <div>
                <h3 className="text-lg font-medium mb-4 text-butterfly-blue-200">Disabled State</h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary" disabled>Disabled</Button>
                  <Button variant="secondary" disabled>Disabled</Button>
                  <Button variant="outline" disabled>Disabled</Button>
                  <Button variant="text" disabled>Disabled</Button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Modals Section */}
        {selectedTab === 'modals' && (
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-butterfly-purple-300">Modals</h2>
            
            <div className="space-y-8">
              {/* Modal Triggers */}
              <div>
                <h3 className="text-lg font-medium mb-4 text-butterfly-blue-200">Modal Demo</h3>
                <div className="flex flex-wrap gap-4">
                  <Button 
                    variant="primary"
                    onClick={() => setIsModalOpen(true)}
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                    }
                  >
                    Open Modal
                  </Button>
                </div>
                
                {/* Sample Modal */}
                <Modal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  title="Sample Modal"
                  size="md"
                >
                  <div className="space-y-4">
                    <p className="text-butterfly-blue-100">
                      This is a sample modal component with a customizable title, size, and content.
                    </p>
                    <p className="text-butterfly-blue-200 text-sm">
                      You can close this modal by:
                    </p>
                    <ul className="list-disc list-inside text-butterfly-blue-200 text-sm space-y-1">
                      <li>Clicking the X button in the top-right</li>
                      <li>Clicking outside the modal</li>
                      <li>Pressing the Escape key</li>
                      <li>Clicking the close button below</li>
                    </ul>
                    <div className="pt-4 flex justify-end space-x-3">
                      <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                      <Button variant="primary" onClick={() => {
                        setIsModalOpen(false);
                        toast.success('Modal action completed!');
                      }}>Confirm</Button>
                    </div>
                  </div>
                </Modal>
                
                <div className="mt-6 bg-butterfly-blue-800/30 rounded-lg p-4 border border-butterfly-blue-700/50">
                  <h4 className="text-sm font-medium mb-2 text-butterfly-blue-100">Modal Features</h4>
                  <ul className="list-disc list-inside text-butterfly-blue-200 text-sm space-y-1">
                    <li>Focus trap for accessibility</li>
                    <li>Keyboard navigation (Escape key to close)</li>
                    <li>Click outside to close</li>
                    <li>Prevents background scrolling when open</li>
                    <li>Customizable sizes: sm, md, lg, xl</li>
                    <li>Backdrop blur effect</li>
                    <li>Smooth animations</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Toasts Section */}
        {selectedTab === 'toasts' && (
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-butterfly-purple-300">Toast Notifications</h2>
            
            <div className="space-y-8">
              {/* Toast Types */}
              <div>
                <h3 className="text-lg font-medium mb-4 text-butterfly-blue-200">Toast Types</h3>
                <div className="flex flex-wrap gap-4">
                  <Button 
                    variant="success" 
                    onClick={() => showToastDemo('success')}
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    }
                  >
                    Success Toast
                  </Button>
                  
                  <Button 
                    variant="danger" 
                    onClick={() => showToastDemo('error')}
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    }
                  >
                    Error Toast
                  </Button>
                  
                  <Button 
                    variant="warning" 
                    onClick={() => showToastDemo('warning')}
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    }
                  >
                    Warning Toast
                  </Button>
                  
                  <Button 
                    variant="info" 
                    onClick={() => showToastDemo('info')}
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    }
                  >
                    Info Toast
                  </Button>
                </div>
                
                <div className="mt-6 bg-butterfly-blue-800/30 rounded-lg p-4 border border-butterfly-blue-700/50">
                  <h4 className="text-sm font-medium mb-2 text-butterfly-blue-100">Toast Features</h4>
                  <ul className="list-disc list-inside text-butterfly-blue-200 text-sm space-y-1">
                    <li>Automatic dismissal with configurable duration</li>
                    <li>Progress bar indicating time remaining</li>
                    <li>Pause on hover</li>
                    <li>Customizable position (configured at the provider level)</li>
                    <li>Four different types: success, error, warning, info</li>
                    <li>Smooth enter/exit animations</li>
                    <li>Can be manually dismissed</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UiDemo; 