import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text' | 'success' | 'danger' | 'warning' | 'info';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  loading?: boolean;
  animateHover?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  type = 'button',
  icon,
  iconPosition = 'left',
  className = '',
  loading = false,
  animateHover = true,
}) => {
  // Variant classes
  const variantClasses = {
    primary: 'bg-gradient-to-r from-butterfly-purple-500 to-butterfly-pink-500 hover:from-butterfly-purple-600 hover:to-butterfly-pink-600 text-white shadow-md shadow-butterfly-purple-500/30 focus:ring-butterfly-purple-400',
    secondary: 'bg-butterfly-blue-800 hover:bg-butterfly-blue-700 text-white border border-butterfly-blue-700 shadow-md shadow-butterfly-blue-700/10 focus:ring-butterfly-blue-500',
    outline: 'bg-transparent hover:bg-butterfly-blue-700/20 text-white border border-butterfly-blue-600 hover:border-butterfly-purple-400 focus:ring-butterfly-blue-500',
    text: 'bg-transparent hover:bg-butterfly-blue-700/20 text-white focus:ring-butterfly-blue-500',
    success: 'bg-gradient-to-r from-butterfly-green-600 to-butterfly-teal-600 hover:from-butterfly-green-700 hover:to-butterfly-teal-700 text-white shadow-md shadow-butterfly-green-500/30 focus:ring-butterfly-green-500',
    danger: 'bg-gradient-to-r from-butterfly-red-600 to-butterfly-rose-600 hover:from-butterfly-red-700 hover:to-butterfly-rose-700 text-white shadow-md shadow-butterfly-red-500/30 focus:ring-butterfly-red-500',
    warning: 'bg-gradient-to-r from-butterfly-amber-500 to-butterfly-orange-500 hover:from-butterfly-amber-600 hover:to-butterfly-orange-600 text-white shadow-md shadow-butterfly-amber-500/30 focus:ring-butterfly-amber-500',
    info: 'bg-gradient-to-r from-butterfly-blue-600 to-butterfly-cyan-600 hover:from-butterfly-blue-700 hover:to-butterfly-cyan-700 text-white shadow-md shadow-butterfly-blue-500/30 focus:ring-butterfly-blue-500',
  };

  // Size classes
  const sizeClasses = {
    xs: 'px-2.5 py-1.5 text-xs',
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-2.5 text-lg',
    xl: 'px-6 py-3 text-xl',
  };

  // Shared classes
  const sharedClasses = `
    rounded-md font-medium transition-all duration-200 
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-butterfly-blue-900
    disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
    ${fullWidth ? 'w-full' : ''}
    ${animateHover ? 'hover:scale-105' : ''}
  `;

  // Icon size based on button size
  const iconSizeClasses = {
    xs: 'w-3.5 h-3.5',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-7 h-7',
  };

  // Loading animation
  const loadingIcon = (
    <svg 
      className={`animate-spin ${iconSizeClasses[size]} ${iconPosition === 'left' ? 'mr-2' : 'ml-2'}`} 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );

  return (
    <button
      type={type}
      className={`
        ${variantClasses[variant]} 
        ${sizeClasses[size]} 
        ${sharedClasses} 
        ${className}
      `}
      onClick={onClick}
      disabled={disabled || loading}
    >
      <span className="flex items-center justify-center">
        {loading ? (
          <>
            {iconPosition === 'left' && loadingIcon}
            {children}
            {iconPosition === 'right' && loadingIcon}
          </>
        ) : (
          <>
            {icon && iconPosition === 'left' && (
              <span className={`${iconSizeClasses[size]} mr-2`}>{icon}</span>
            )}
            {children}
            {icon && iconPosition === 'right' && (
              <span className={`${iconSizeClasses[size]} ml-2`}>{icon}</span>
            )}
          </>
        )}
      </span>
    </button>
  );
};

export default Button; 