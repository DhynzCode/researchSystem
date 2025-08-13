import React from 'react';

interface LoadingProps {
  size?: 'small' | 'medium' | 'large';
  text?: string;
  overlay?: boolean;
  className?: string;
  showDots?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ 
  size = 'medium', 
  text = 'Loading...', 
  overlay = false,
  className = '',
  showDots = true
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'w-5 h-5';
      case 'large':
        return 'w-24 h-24';
      default:
        return 'w-20 h-20';
    }
  };

  const LoaderSpinner = () => (
    <div className="loader-container" style={{
      position: 'relative',
      width: size === 'small' ? '32px' : size === 'large' ? '80px' : '64px',
      height: size === 'small' ? '32px' : size === 'large' ? '80px' : '64px',
    }}>
      {/* Outer orbital rings */}
      <div className="loader-ring-outer"></div>
      <div className="loader-ring-middle"></div>
      
      {/* Main 3D loader */}
      <div className={`loader ${className}`} style={{ 
        width: size === 'small' ? '32px' : size === 'large' ? '80px' : '64px',
        height: size === 'small' ? '32px' : size === 'large' ? '80px' : '64px'
      }}>
      </div>
    </div>
  );

  const LoadingDots = () => (
    <div className="loading-dots">
      <div className="loading-dot"></div>
      <div className="loading-dot"></div>
      <div className="loading-dot"></div>
    </div>
  );

  if (overlay) {
    return (
      <div className="loading-overlay">
        <LoaderSpinner />
        {text && (
          <div className="loading-text">
            {text}
          </div>
        )}
        {showDots && <LoadingDots />}
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <LoaderSpinner />
      {text && (
        <div className="loading-text">
          {text}
        </div>
      )}
      {showDots && <LoadingDots />}
    </div>
  );
};

// Small inline loader for buttons
export const ButtonLoader: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`loader-small ${className}`}></div>
);

// Page transition loader
export const PageLoader: React.FC<{ isLoading: boolean; text?: string }> = ({ 
  isLoading, 
  text = 'Loading...' 
}) => {
  if (!isLoading) return null;

  return (
    <div className={`loading-overlay ${isLoading ? '' : 'fade-out'}`}>
      <div className="loader"></div>
      <div className="loading-text">{text}</div>
      <div className="loading-dots">
        <div className="loading-dot"></div>
        <div className="loading-dot"></div>
        <div className="loading-dot"></div>
      </div>
    </div>
  );
};

// Content loading skeleton
export const ContentLoader: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`animate-pulse ${className}`}>
    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
  </div>
);

export default Loading;