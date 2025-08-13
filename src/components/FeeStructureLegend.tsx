import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronRight, 
  DollarSign, 
  Users, 
  Crown, 
  Calculator,
  FileText,
  UserCheck,
  Edit,
  Shield,
  AlertTriangle,
  Package
} from 'lucide-react';

interface FeeStructureLegendProps {
  className?: string;
}

const FeeStructureLegend: React.FC<FeeStructureLegendProps> = ({ className = '' }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const feeStructure = [
    {
      role: 'Adviser\'s Fee',
      icon: Users,
      preOral: '₱800.00',
      finalDefense: '₱800.00',
      description: 'Research adviser compensation'
    },
    {
      role: 'Chairman\'s Fee',
      icon: Crown,
      preOral: '₱400.00',
      finalDefense: '₱400.00',
      description: 'Panel chairperson compensation'
    },
    {
      role: 'Panel Member 1',
      icon: UserCheck,
      preOral: '₱300.00',
      finalDefense: '₱300.00',
      description: 'First panel member compensation'
    },
    {
      role: 'Panel Member 2',
      icon: UserCheck,
      preOral: '₱300.00',
      finalDefense: '₱300.00',
      description: 'Second panel member compensation'
    },
    {
      role: 'Panel Member 3',
      icon: UserCheck,
      preOral: '₱300.00',
      finalDefense: '₱300.00',
      description: 'Third panel member compensation'
    },
    {
      role: 'Panel Member 4',
      icon: UserCheck,
      preOral: '₱300.00',
      finalDefense: '₱300.00',
      description: 'Fourth panel member compensation'
    },
    {
      role: 'Statistician\'s Fee',
      icon: Calculator,
      preOral: '₱500.00',
      finalDefense: '₱500.00',
      description: 'Statistical analysis expert fee'
    },
    {
      role: 'Language Editor',
      icon: Edit,
      preOral: '₱1,500.00',
      finalDefense: '₱1,500.00',
      description: 'Language editing and proofreading'
    },
    {
      role: 'Secretary\'s Fee',
      icon: FileText,
      preOral: '₱200.00',
      finalDefense: '₱200.00',
      description: 'Administrative support fee'
    },
    {
      role: 'Validator\'s Fee',
      icon: Shield,
      preOral: '-',
      finalDefense: '₱5,100.00',
      description: 'Final validation (Final defense only)'
    }
  ];

  const packageOptions = [
    {
      type: 'Pure Quantitative',
      preOral: '₱2,000.00',
      finalDefense: '₱5,100.00',
      description: 'Complete quantitative research package'
    },
    {
      type: 'Pure Qualitative',
      preOral: '₱2,000.00',
      finalDefense: '₱4,600.00',
      description: 'Complete qualitative research package'
    },
    {
      type: 'Student Groups (3-5 members)',
      preOral: '₱666.66 per student',
      finalDefense: '₱1,533.33 per student',
      description: 'Group research project rates'
    }
  ];

  return (
    <div className={`bg-gradient-to-r from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-800 border border-blue-200 dark:border-gray-600 rounded-xl shadow-lg ${className}`}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-blue-100 dark:hover:bg-gray-700 rounded-t-xl transition-all duration-200"
      >
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-500 rounded-lg">
            <DollarSign className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              2022 Revised Standardized Research Fees - Tertiary Level
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Click to view detailed fee structure and package options
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {isExpanded ? 'Hide' : 'Show'} Details
          </span>
          {isExpanded ? (
            <ChevronDown className="w-5 h-5 text-gray-500 transform transition-transform duration-200" />
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-500 transform transition-transform duration-200" />
          )}
        </div>
      </button>

      {/* Expandable Content */}
      {isExpanded && (
        <div className="px-4 pb-4 space-y-6 animate-fade-in-up">
          {/* Fee Structure Table */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Individual Role Fees</span>
              </h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">Role</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-600 dark:text-gray-400">Pre-Oral Defense</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-600 dark:text-gray-400">Final Defense</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {feeStructure.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-3">
                            <div className="p-1.5 bg-blue-100 dark:bg-blue-900 rounded-md">
                              <IconComponent className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-800 dark:text-gray-200">{item.role}</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">{item.description}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`font-semibold ${item.preOral === '-' ? 'text-gray-400' : 'text-green-600 dark:text-green-400'}`}>
                            {item.preOral}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`font-semibold ${item.finalDefense === '-' ? 'text-gray-400' : 'text-green-600 dark:text-green-400'}`}>
                            {item.finalDefense}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Package Options */}
          <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 flex items-center space-x-2">
                <Package className="w-4 h-4" />
                <span>Package Options</span>
              </h4>
            </div>
            <div className="p-4 space-y-3">
              {packageOptions.map((pkg, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-800 dark:text-gray-200">{pkg.type}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{pkg.description}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600 dark:text-gray-400">Pre-Oral: <span className="font-semibold text-blue-600 dark:text-blue-400">{pkg.preOral}</span></div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Final: <span className="font-semibold text-green-600 dark:text-green-400">{pkg.finalDefense}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
              <div className="space-y-2">
                <h4 className="font-semibold text-amber-800 dark:text-amber-200">Important Notes</h4>
                <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
                  <li>• Fees are automatically calculated based on selected roles and defense type</li>
                  <li>• Total compensation will be displayed in the Panel Members Details section</li>
                  <li>• Package rates may offer savings compared to individual role fees</li>
                  <li>• All fees are based on 2022 Revised Standardized Research Fees</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeeStructureLegend;