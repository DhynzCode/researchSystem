// Utility functions for handling loading states during page reloads and navigation

export const showPageReloadLoader = () => {
  console.log('Showing page reload loader');
  
  // Create and show a loading overlay for page reloads
  const existingOverlay = document.getElementById('page-reload-loader');
  if (existingOverlay) {
    console.log('Loader already exists');
    return;
  }

  const overlay = document.createElement('div');
  overlay.id = 'page-reload-loader';
  overlay.className = 'loading-overlay';
  overlay.innerHTML = `
    <div class="loader"></div>
    <div class="loading-text">Refreshing...</div>
    <div class="loading-dots">
      <div class="loading-dot"></div>
      <div class="loading-dot"></div>
      <div class="loading-dot"></div>
    </div>
  `;
  
  document.body.appendChild(overlay);
  console.log('Page reload loader added to DOM');
  
  // Auto-hide after a maximum time to prevent stuck loaders
  setTimeout(() => {
    hidePageReloadLoader();
  }, 10000);
};

export const hidePageReloadLoader = () => {
  const overlay = document.getElementById('page-reload-loader');
  if (overlay) {
    overlay.classList.add('fade-out');
    setTimeout(() => {
      document.body.removeChild(overlay);
    }, 300);
  }
};

export const setupPageReloadHandler = () => {
  console.log('Setting up page reload handler');
  let isNavigating = false;

  // Show loader only for actual page reloads (F5, Ctrl+R) or browser refresh
  window.addEventListener('beforeunload', (event) => {
    console.log('beforeunload event triggered, isNavigating:', isNavigating);
    // Only show loader for actual page refresh, not navigation
    if (!isNavigating) {
      showPageReloadLoader();
    }
  });

  // Hide loader when page is fully loaded
  window.addEventListener('load', () => {
    console.log('page load event triggered');
    setTimeout(() => {
      hidePageReloadLoader();
    }, 500);
  });

  // Mark navigation as happening to prevent showing loader
  // This will be called by React Router navigation
  window.addEventListener('popstate', () => {
    console.log('popstate event triggered');
    isNavigating = true;
    setTimeout(() => {
      isNavigating = false;
    }, 100);
  });

  // Also listen for keyboard shortcuts for page refresh
  window.addEventListener('keydown', (event) => {
    // F5 or Ctrl+R
    if (event.key === 'F5' || (event.ctrlKey && event.key === 'r')) {
      console.log('Page refresh keyboard shortcut detected');
      showPageReloadLoader();
    }
  });
};

// Enhanced navigation with loading
export const navigateWithLoader = (url: string, loadingText: string = 'Navigating...') => {
  // Create temporary loading overlay
  const overlay = document.createElement('div');
  overlay.className = 'loading-overlay';
  overlay.innerHTML = `
    <div class="loader"></div>
    <div class="loading-text">${loadingText}</div>
    <div class="loading-dots">
      <div class="loading-dot"></div>
      <div class="loading-dot"></div>
      <div class="loading-dot"></div>
    </div>
  `;
  
  document.body.appendChild(overlay);
  
  // Navigate after short delay to show loader
  setTimeout(() => {
    window.location.href = url;
  }, 300);
};

// Utility for handling slow network connections
export const handleSlowConnection = () => {
  const connection = (navigator as any).connection;
  if (connection) {
    // Show extended loading for slow connections
    if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
      return 3000; // 3 seconds for slow connections
    } else if (connection.effectiveType === '3g') {
      return 2000; // 2 seconds for 3g
    }
  }
  return 1000; // Default 1 second
};

// Progress bar utilities
export const createProgressBar = (containerId: string) => {
  const container = document.getElementById(containerId);
  if (!container) return null;

  const progressBar = document.createElement('div');
  progressBar.className = 'w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2';
  progressBar.innerHTML = `
    <div class="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out" style="width: 0%"></div>
  `;
  
  container.appendChild(progressBar);
  
  return {
    setProgress: (percentage: number) => {
      const bar = progressBar.querySelector('div');
      if (bar) {
        (bar as HTMLElement).style.width = `${Math.min(100, Math.max(0, percentage))}%`;
      }
    },
    complete: () => {
      const bar = progressBar.querySelector('div');
      if (bar) {
        (bar as HTMLElement).style.width = '100%';
        setTimeout(() => {
          progressBar.style.opacity = '0';
          setTimeout(() => {
            container.removeChild(progressBar);
          }, 300);
        }, 500);
      }
    },
    remove: () => {
      if (container.contains(progressBar)) {
        container.removeChild(progressBar);
      }
    }
  };
};