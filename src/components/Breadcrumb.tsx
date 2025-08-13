import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  showHome?: boolean;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, showHome = true }) => {
  const location = useLocation();

  return (
    <nav className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400 mb-6">
      {showHome && (
        <>
          <Link
            to="/"
            className="flex items-center space-x-1 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Dashboard</span>
          </Link>
          <ChevronRight className="w-4 h-4" />
        </>
      )}
      
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const isActive = item.path === location.pathname;
        
        if (isLast || !item.path) {
          return (
            <span
              key={index}
              className={`font-medium ${
                isActive 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-gray-800 dark:text-gray-200'
              }`}
            >
              {item.label}
            </span>
          );
        }
        
        return (
          <React.Fragment key={index}>
            <Link
              to={item.path}
              className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            >
              {item.label}
            </Link>
            <ChevronRight className="w-4 h-4" />
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;