import { useState, useCallback } from 'react';
import { useLoading } from '../contexts/LoadingContext';

interface UseAsyncOperationOptions {
  showGlobalLoader?: boolean;
  loadingText?: string;
  successMessage?: string;
  errorMessage?: string;
}

interface AsyncOperationState {
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

export const useAsyncOperation = <T extends any[], R>(
  operation: (...args: T) => Promise<R>,
  options: UseAsyncOperationOptions = {}
) => {
  const {
    showGlobalLoader = false,
    loadingText = 'Loading...',
    successMessage,
    errorMessage
  } = options;

  const { showLoading, hideLoading } = useLoading();
  
  const [state, setState] = useState<AsyncOperationState>({
    isLoading: false,
    error: null,
    success: false
  });

  const execute = useCallback(async (...args: T): Promise<R | null> => {
    setState({ isLoading: true, error: null, success: false });
    
    if (showGlobalLoader) {
      showLoading(loadingText);
    }

    try {
      const result = await operation(...args);
      setState({ isLoading: false, error: null, success: true });
      
      if (successMessage) {
        // Could integrate with a toast notification system here
        console.log(successMessage);
      }
      
      return result;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : (errorMessage || 'An error occurred');
      setState({ isLoading: false, error: errorMsg, success: false });
      
      // Could integrate with error reporting here
      console.error('Operation failed:', errorMsg);
      return null;
    } finally {
      if (showGlobalLoader) {
        hideLoading();
      }
    }
  }, [operation, showGlobalLoader, loadingText, successMessage, errorMessage, showLoading, hideLoading]);

  const reset = useCallback(() => {
    setState({ isLoading: false, error: null, success: false });
  }, []);

  return {
    ...state,
    execute,
    reset
  };
};

// Utility hook for form submissions
export const useFormSubmission = <T extends any[], R>(
  submitFunction: (...args: T) => Promise<R>,
  options: UseAsyncOperationOptions = {}
) => {
  return useAsyncOperation(submitFunction, {
    showGlobalLoader: true,
    loadingText: 'Submitting...',
    ...options
  });
};

// Utility hook for data fetching
export const useDataFetch = <T extends any[], R>(
  fetchFunction: (...args: T) => Promise<R>,
  options: UseAsyncOperationOptions = {}
) => {
  return useAsyncOperation(fetchFunction, {
    showGlobalLoader: true,
    loadingText: 'Fetching data...',
    ...options
  });
};