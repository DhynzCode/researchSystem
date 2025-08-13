import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { PanelRole } from '../types';

export interface PanelMemberDetail {
  id: string;
  name: string;
  groupAssignment?: string;
  role: PanelRole | 'Advisor'; // Add Advisor to role types
  currentAppearances: number;
  requestAppearances: number;
  totalAppearances: number;
  compensation: number;
  isFlagged: boolean;
}

interface PanelMembersDetailsTableProps {
  panelMembers: PanelMemberDetail[];
  className?: string;
}

const PanelMembersDetailsTable: React.FC<PanelMembersDetailsTableProps> = ({ 
  panelMembers, 
  className = '' 
}) => {
  const getRoleIcon = (role: PanelRole | 'Advisor'): string => {
    switch (role) {
      case 'Advisor':
        return '🟡';
      case 'Chairperson':
        return '🟢';
      case 'Panel Member':
        return '🔵';
      case 'Statistician':
        return '🟣';
      case 'Language Editor':
        return '🟣';
      case 'Validator':
        return '🟣';
      case 'Secretary':
        return '🟣';
      default:
        return '🔵';
    }
  };

  const getRoleColors = (role: PanelRole | 'Advisor'): string => {
    switch (role) {
      case 'Advisor':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'Chairperson':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'Panel Member':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'Statistician':
      case 'Language Editor':
      case 'Validator':
      case 'Secretary':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const calculateGrandTotal = (): number => {
    return panelMembers.reduce((total, member) => total + member.compensation, 0);
  };

  const sortedMembers = [...panelMembers].sort((a, b) => {
    // Sort by role hierarchy: Advisor → Chairman → Panel Member → Others
    const roleOrder = {
      'Advisor': 1,
      'Chairperson': 2,
      'Panel Member': 3,
      'Statistician': 4,
      'Language Editor': 4,
      'Validator': 4,
      'Secretary': 4
    };
    
    const aOrder = roleOrder[a.role as keyof typeof roleOrder] || 5;
    const bOrder = roleOrder[b.role as keyof typeof roleOrder] || 5;
    
    if (aOrder !== bOrder) return aOrder - bOrder;
    return a.name.localeCompare(b.name);
  });

  if (panelMembers.length === 0) {
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 ${className}`}>
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          Panel Members Details
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
          No panel members assigned yet
        </p>
      </div>
    );
  }

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 ${className}`}>
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
        Panel Members Details
      </h3>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700">
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left font-semibold text-gray-800 dark:text-gray-200">
                Particular Role
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left font-semibold text-gray-800 dark:text-gray-200">
                Names
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center font-semibold text-gray-800 dark:text-gray-200">
                Current Appearance
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center font-semibold text-gray-800 dark:text-gray-200">
                Request Appearance
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center font-semibold text-gray-800 dark:text-gray-200">
                Total Appearance
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-right font-semibold text-gray-800 dark:text-gray-200">
                Compensation
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedMembers.map((member) => (
              <tr
                key={member.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg" role="img" aria-label={member.role}>
                      {getRoleIcon(member.role)}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColors(member.role)}`}
                    >
                      {member.role}
                    </span>
                  </div>
                </td>
                
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-3">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-800 dark:text-gray-200">
                      {member.name}
                    </span>
                    {member.groupAssignment && (
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        ({member.groupAssignment})
                      </span>
                    )}
                  </div>
                </td>
                
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center font-mono">
                  <span className="text-gray-800 dark:text-gray-200">
                    {member.currentAppearances}
                  </span>
                </td>
                
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center font-mono">
                  <span className="text-gray-800 dark:text-gray-200">
                    {member.requestAppearances}
                  </span>
                </td>
                
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center font-mono">
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-gray-800 dark:text-gray-200">
                      {member.totalAppearances}
                    </span>
                    {member.totalAppearances > 5 && (
                      <AlertTriangle className="w-4 h-4 text-red-500" title="Exceeds 5 appearance limit" />
                    )}
                  </div>
                </td>
                
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-right font-mono">
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    ₱{member.compensation.toLocaleString()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <td
                colSpan={5}
                className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-right font-bold text-gray-800 dark:text-gray-200"
              >
                Grand Total:
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-right font-mono font-bold text-gray-800 dark:text-gray-200">
                ₱{calculateGrandTotal().toLocaleString()}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Legend and Fee Structure */}
      <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Role Legend */}
          <div>
            <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Role Legend:
            </h4>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center space-x-1">
                <span>🟡</span>
                <span className="text-gray-600 dark:text-gray-400">Advisor</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>🟢</span>
                <span className="text-gray-600 dark:text-gray-400">Chairman</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>🔵</span>
                <span className="text-gray-600 dark:text-gray-400">Panel Member</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>🟣</span>
                <span className="text-gray-600 dark:text-gray-400">Specialist Roles</span>
              </div>
              <div className="flex items-center space-x-1">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <span className="text-gray-600 dark:text-gray-400">Exceeds 5 appearances</span>
              </div>
            </div>
          </div>

          {/* Fee Structure */}
          <div>
            <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Fee Structure (Tertiary Level):
            </h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">🟡 Advisor:</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">₱800.00 per defense</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">🟢 Chairman:</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">₱450.00 per defense</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">🔵 Panel Member:</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">₱400.00 per defense</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">🟣 Specialist:</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">₱300-500 per defense</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanelMembersDetailsTable;