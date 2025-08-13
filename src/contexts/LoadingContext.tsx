import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { PageLoader } from '../components/Loading';

interface LoadingContextType {
  isLoading: boolean;
  loadingText: string;
  showLoading: (text?: string) => void;
  hideLoading: () => void;
  setLoadingWithDelay: (text?: string, delay?: number) => Promise<void>;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('Loading...');

  const showLoading = useCallback((text: string = 'Loading...') => {
    console.log('showLoading called with text:', text);
    setLoadingText(text);
    setIsLoading(true);
  }, []);

  const hideLoading = useCallback(() => {
    console.log('hideLoading called');
    setIsLoading(false);
  }, []);

  const setLoadingWithDelay = useCallback(async (text: string = 'Loading...', delay: number = 500) => {
    showLoading(text);
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        hideLoading();
        resolve();
      }, delay);
    });
  }, [showLoading, hideLoading]);

  const value = {
    isLoading,
    loadingText,
    showLoading,
    hideLoading,
    setLoadingWithDelay,
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
      <PageLoader isLoading={isLoading} text={loadingText} />
    </LoadingContext.Provider>
  );
};