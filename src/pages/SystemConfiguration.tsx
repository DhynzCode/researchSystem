import React, { useState } from 'react';
import { 
  Settings, 
  BookOpen, 
  DollarSign, 
  Users, 
  Cog,
  ChevronRight,
  AlertCircle,
  Clock,
  Shield
} from 'lucide-react';
import AcademicProgramsModule from '../components/system-config/AcademicProgramsModule';
import FeeManagementModule from '../components/system-config/FeeManagementModule';
import AppearanceLimitsModule from '../components/system-config/AppearanceLimitsModule';
import SystemSettingsModule from '../components/system-config/SystemSettingsModule';

type ConfigurationTab = 'academic-programs' | 'fee-management' | 'appearance-limits' | 'system-settings';

const SystemConfiguration: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ConfigurationTab>('academic-programs');

  const configurationModules = [
    {
      id: 'academic-programs' as ConfigurationTab,
      title: 'Academic Programs',
      description: 'Manage program levels, departments, and academic programs',
      icon: BookOpen,
      color: 'blue',
      stats: { total: 45, active: 42, inactive: 3 }
    },
    {
      id: 'fee-management' as ConfigurationTab,
      title: 'Fee Management',
      description: 'Configure fee structures per role and academic level',
      icon: DollarSign,
      color: 'green',
      stats: { total: 8, active: 6, pending: 2 }
    },
    {
      id: 'appearance-limits' as ConfigurationTab,
      title: 'Appearance Limits',
      description: 'Set and modify appearance limits by role and level',
      icon: Users,
      color: 'purple',
      stats: { standard: 28, special: 4, total: 32 }
    },
    {
      id: 'system-settings' as ConfigurationTab,
      title: 'System Settings',
      description: 'General system configurations and preferences',
      icon: Cog,
      color: 'gray',
      stats: { lastUpdate: '2024-01-15', status: 'Active' }
    }
  ];

  const getModuleContent = () => {
    switch (activeTab) {
      case 'academic-programs':
        return <AcademicProgramsModule />;
      case 'fee-management':
        return <FeeManagementModule />;
      case 'appearance-limits':
        return <AppearanceLimitsModule />;
      case 'system-settings':
        return <SystemSettingsModule />;
      default:
        return <AcademicProgramsModule />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">System Configuration</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage all foundational settings that drive the UZEARCH system
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Shield className="w-4 h-4" />
          <span>Administrator Access Required</span>
        </div>
      </div>

      {/* Configuration Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {configurationModules.map((module) => {
          const Icon = module.icon;
          const isActive = activeTab === module.id;
          
          return (
            <div
              key={module.id}
              onClick={() => setActiveTab(module.id)}
              className={`
                cursor-pointer rounded-lg p-6 transition-all duration-300 transform hover:scale-105 hover:shadow-lg
                ${isActive 
                  ? `bg-${module.color}-50 border-2 border-${module.color}-500 dark:bg-${module.color}-900/20 dark:border-${module.color}-400`
                  : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }
              `}
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className={`w-8 h-8 ${isActive ? `text-${module.color}-600 dark:text-${module.color}-400` : 'text-gray-500'}`} />
                <ChevronRight className={`w-5 h-5 transition-transform ${isActive ? 'rotate-90' : ''} text-gray-400`} />
              </div>
              
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">{module.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{module.description}</p>
              
              <div className="space-y-1 text-xs">
                {module.id === 'academic-programs' && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Total Programs:</span>
                      <span className="font-medium">{module.stats.total}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-600">Active:</span>
                      <span className="font-medium text-green-600">{module.stats.active}</span>
                    </div>
                  </>
                )}
                
                {module.id === 'fee-management' && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Fee Structures:</span>
                      <span className="font-medium">{module.stats.total}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-orange-600">Pending Review:</span>
                      <span className="font-medium text-orange-600">{module.stats.pending}</span>
                    </div>
                  </>
                )}
                
                {module.id === 'appearance-limits' && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Standard Rules:</span>
                      <span className="font-medium">{module.stats.standard}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-600">Special Rules:</span>
                      <span className="font-medium text-purple-600">{module.stats.special}</span>
                    </div>
                  </>
                )}
                
                {module.id === 'system-settings' && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Last Updated:</span>
                      <span className="font-medium">{module.stats.lastUpdate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-600">Status:</span>
                      <span className="font-medium text-green-600">{module.stats.status}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Module Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
        {getModuleContent()}
      </div>
    </div>
  );
};

export default SystemConfiguration;