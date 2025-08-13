import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  FileText, 
  Shield,
  Grid3X3,
  Users, 
  CheckCircle, 
  Calculator, 
  FileBarChart,
  X,
  ChevronDown,
  ChevronUp,
  Plus,
  List,
  BookOpen,
  Users2
} from 'lucide-react';
import { UserRole } from '../types';

interface SidebarProps {
  currentRole: UserRole;
  isMobileMenuOpen: boolean;
  onMobileMenuClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentRole, isMobileMenuOpen, onMobileMenuClose }) => {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState<Set<string>>(new Set());
  const [animatedItems, setAnimatedItems] = useState<boolean[]>([]);

  // Animation effect for menu items on mount
  useEffect(() => {
    const filteredItems = menuItems.filter(item => item.roles.includes(currentRole));
    const timers = filteredItems.map((_, index) => 
      setTimeout(() => {
        setAnimatedItems(prev => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      }, index * 100)
    );

    return () => timers.forEach(clearTimeout);
  }, [currentRole]);

  const toggleMenu = (menuKey: string) => {
    const newExpandedMenus = new Set(expandedMenus);
    if (newExpandedMenus.has(menuKey)) {
      newExpandedMenus.delete(menuKey);
    } else {
      newExpandedMenus.add(menuKey);
    }
    setExpandedMenus(newExpandedMenus);
  };

  const menuItems = [
    { path: '/', icon: BarChart3, label: 'Dashboard', roles: ['Research Teacher', 'Research Director', 'VPAA', 'Finance Officer'] },
    { path: '/matrix', icon: Grid3X3, label: 'Matrix Table', roles: ['Research Director', 'VPAA'] },
    { path: '/approval-center', icon: CheckCircle, label: 'Approval Center', roles: ['VPAA'] },
    {
      key: 'request-defense',
      icon: Shield,
      label: 'Request Defense',
      roles: ['Research Teacher', 'Research Director'],
      hasDropdown: true,
      subItems: [
        { path: '/defense-form', icon: Plus, label: 'Defense Form', roles: ['Research Teacher', 'Research Director'] },
        { path: '/defense-records', icon: List, label: 'Defense Records', roles: ['Research Teacher', 'Research Director'] },
        { path: '/approval-center', icon: CheckCircle, label: 'Approval Center', roles: ['Research Director'] }
      ]
    },
    {
      key: 'repository',
      icon: BookOpen,
      label: 'Repository',
      roles: ['Research Teacher', 'Research Director', 'VPAA'],
      hasDropdown: true,
      subItems: [
        { path: '/repository/thesis-submissions', icon: BookOpen, label: 'Thesis Submissions' },
        { path: '/repository/student-clearance', icon: Users2, label: 'Student Clearance Status' }
      ]
    },
    { path: '/faculty-tracker', icon: Users, label: 'Faculty Tracker', roles: ['Research Teacher', 'Research Director'] },
    { path: '/honorarium', icon: Calculator, label: 'Honorarium Calculator', roles: ['Finance Officer'] },
    { path: '/reports', icon: FileBarChart, label: 'Reports & Logs', roles: ['Research Director', 'VPAA', 'Finance Officer'] },
  ];

  const isPathActive = (path: string) => location.pathname === path;
  
  const isDropdownActive = (subItems: any[]) => {
    return subItems?.some(subItem => location.pathname === subItem.path);
  };


  return (
    <>
      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onMobileMenuClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        w-64 bg-white dark:bg-gray-800 shadow-lg fixed h-full left-0 top-0 z-50 pt-20 transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:z-30
      `}>
        {/* Mobile close button */}
        <div className="lg:hidden absolute top-6 right-4">
          <button
            onClick={onMobileMenuClose}
            className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item: any, index) => {
              if (!item.roles.includes(currentRole)) return null;
              
              const Icon = item.icon;
              const filteredIndex = menuItems.filter((menuItem, i) => 
                i <= index && menuItem.roles.includes(currentRole)
              ).length - 1;
              const isAnimated = animatedItems[filteredIndex];
              
              // Handle dropdown menu items
              if (item.hasDropdown) {
                const isExpanded = expandedMenus.has(item.key);
                const isActive = isDropdownActive(item.subItems);
                
                return (
                  <li key={item.key} className={`transform transition-all duration-500 ease-out ${
                    isAnimated 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 -translate-x-8'
                  }`}>
                    {/* Main dropdown trigger */}
                    <button
                      onClick={() => toggleMenu(item.key)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-md ${
                        isActive 
                          ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-r-4 border-green-600 dark:border-green-400 shadow-lg nav-item-active' 
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:translate-x-1'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="w-5 h-5 transition-transform duration-300 hover:rotate-12 hover:scale-110" />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 transition-transform duration-300" />
                      ) : (
                        <ChevronDown className="w-4 h-4 transition-transform duration-300" />
                      )}
                    </button>
                    
                    {/* Dropdown submenu */}
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <ul className="mt-2 ml-6 space-y-1">
                        {item.subItems.filter((subItem: any) => 
                          !subItem.roles || subItem.roles.includes(currentRole)
                        ).map((subItem: any, subIndex: number) => {
                          const SubIcon = subItem.icon;
                          const isSubActive = isPathActive(subItem.path);
                          
                          return (
                            <li key={subItem.path} className={`transform transition-all duration-300 ease-out ${
                              isExpanded 
                                ? 'opacity-100 translate-x-0' 
                                : 'opacity-0 translate-x-2'
                            }`} style={{ transitionDelay: `${subIndex * 100}ms` }}>
                              <Link
                                to={subItem.path}
                                onClick={onMobileMenuClose}
                                className={`flex items-center space-x-3 p-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                                  isSubActive
                                    ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 border-l-2 border-green-600 dark:border-green-400 pl-3 shadow-md'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-gray-800 dark:hover:text-gray-300 hover:translate-x-1'
                                }`}
                              >
                                <SubIcon className="w-4 h-4 transition-transform duration-300 hover:rotate-12 hover:scale-110" />
                                <span className="font-medium text-sm">{subItem.label}</span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </li>
                );
              }
              
              // Handle regular menu items
              const isActive = isPathActive(item.path);
              
              return (
                <li key={item.path} className={`transform transition-all duration-500 ease-out ${
                  isAnimated 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 -translate-x-8'
                }`}>
                  <Link
                    to={item.path}
                    onClick={onMobileMenuClose}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-md ${
                      isActive 
                        ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-r-4 border-green-600 dark:border-green-400 shadow-lg nav-item-active' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:translate-x-1'
                    }`}
                  >
                    <Icon className="w-5 h-5 transition-transform duration-300 hover:rotate-12 hover:scale-110" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;