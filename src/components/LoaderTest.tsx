import React from 'react';
import { useLoading } from '../contexts/LoadingContext';
import { showPageReloadLoader, hidePageReloadLoader } from '../utils/loadingUtils';

const LoaderTest: React.FC = () => {
  const { showLoading, hideLoading } = useLoading();

  const testGlobalLoader = () => {
    showLoading('Testing 3D Loader...');
    setTimeout(() => {
      hideLoading();
    }, 3000);
  };

  const testPageReloadLoader = () => {
    showPageReloadLoader();
    setTimeout(() => {
      hidePageReloadLoader();
    }, 3000);
  };

  const testPageRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border">
      <div className="text-sm font-semibold mb-2">Loader Test Panel</div>
      
      {/* Direct CSS Test */}
      <div className="mb-4 p-2 bg-gray-100 dark:bg-gray-700 rounded">
        <div className="text-xs mb-2">Direct CSS Test:</div>
        <div className="loader"></div>
      </div>
      
      <div className="flex flex-col space-y-2">
        <button 
          onClick={testGlobalLoader}
          className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
        >
          Test Global Loader
        </button>
        <button 
          onClick={testPageReloadLoader}
          className="px-3 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600"
        >
          Test Page Reload Loader
        </button>
        <button 
          onClick={testPageRefresh}
          className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
        >
          Test Page Refresh
        </button>
        <a 
          href="/loader-test.html" 
          target="_blank"
          className="px-3 py-1 bg-purple-500 text-white rounded text-xs hover:bg-purple-600 text-center"
        >
          Test Standalone HTML
        </a>
      </div>
    </div>
  );
};

export default LoaderTest;