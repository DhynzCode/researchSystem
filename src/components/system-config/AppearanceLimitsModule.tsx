import React, { useState } from 'react';
import {
  Plus,
  Edit3,
  Save,
  X,
  Users,
  AlertTriangle,
  CheckCircle,
  Building2,
  FileText,
  Clock,
  Shield,
  Info
} from 'lucide-react';
import { AppearanceLimitRule, PanelRole, ProgramLevel, DepartmentConfig } from '../../types';

const AppearanceLimitsModule: React.FC = () => {
  const [showAddRuleModal, setShowAddRuleModal] = useState(false);
  const [editingRule, setEditingRule] = useState<AppearanceLimitRule | null>(null);
  const [activeTab, setActiveTab] = useState<'standard' | 'special'>('standard');
  const [showBatchUpdateModal, setShowBatchUpdateModal] = useState(false);
  const [selectedRules, setSelectedRules] = useState<string[]>([]);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState<any>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Mock data
  const programLevels: ProgramLevel[] = [
    { id: '1', name: 'Basic Education', description: 'AEMSHS/UZ THS/UZ SHS', isActive: true, sortOrder: 1 },
    { id: '2', name: 'Tertiary', description: 'Colleges & Off-site branches', isActive: true, sortOrder: 2 },
    { id: '3', name: 'Masters', description: 'Masters Programs', isActive: true, sortOrder: 3 },
    { id: '4', name: 'Doctorate', description: 'Doctorate Programs', isActive: true, sortOrder: 4 }
  ];

  const departments: DepartmentConfig[] = [
    { id: '1', name: 'SAM', code: 'SAM', fullName: 'School of Allied Medicine', isActive: true },
    { id: '2', name: 'SEICT', code: 'SEICT', fullName: 'School of Engineering, Information and Computing Technology', isActive: true },
    { id: '3', name: 'SLAS', code: 'SLAS', fullName: 'School of Liberal Arts and Sciences', isActive: true },
    { id: '4', name: 'SOE', code: 'SOE', fullName: 'School of Education', isActive: true },
    { id: '5', name: 'SBM', code: 'SBM', fullName: 'School of Business Management', isActive: true },
    { id: '6', name: 'SCJ', code: 'SCJ', fullName: 'School of Criminal Justice', isActive: true }
  ];

  const roles: PanelRole[] = ['Advisor', 'Chairperson', 'Panel Member', 'Statistician', 'Language Editor', 'Secretary', 'Validator'];

  const [standardLimits, setStandardLimits] = useState<AppearanceLimitRule[]>([
    {
      id: '1',
      role: 'Advisor',
      programLevelId: '1',
      limit: 5,
      isSpecialRule: false,
      effectiveDate: '2024-08-01',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    },
    {
      id: '2',
      role: 'Advisor',
      programLevelId: '2',
      limit: 5,
      isSpecialRule: false,
      effectiveDate: '2024-08-01',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    },
    {
      id: '3',
      role: 'Advisor',
      programLevelId: '3',
      limit: 2,
      isSpecialRule: false,
      effectiveDate: '2024-08-01',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    },
    {
      id: '4',
      role: 'Advisor',
      programLevelId: '4',
      limit: 2,
      isSpecialRule: false,
      effectiveDate: '2024-08-01',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    },
    // Chairperson limits
    {
      id: '5',
      role: 'Chairperson',
      programLevelId: '1',
      limit: 5,
      isSpecialRule: false,
      effectiveDate: '2024-08-01',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    },
    {
      id: '6',
      role: 'Chairperson',
      programLevelId: '2',
      limit: 5,
      isSpecialRule: false,
      effectiveDate: '2024-08-01',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    },
    {
      id: '7',
      role: 'Chairperson',
      programLevelId: '3',
      limit: 2,
      isSpecialRule: false,
      effectiveDate: '2024-08-01',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    },
    {
      id: '8',
      role: 'Chairperson',
      programLevelId: '4',
      limit: 2,
      isSpecialRule: false,
      effectiveDate: '2024-08-01',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    },
    // Panel Member limits
    {
      id: '9',
      role: 'Panel Member',
      programLevelId: '1',
      limit: 5,
      isSpecialRule: false,
      effectiveDate: '2024-08-01',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    },
    {
      id: '10',
      role: 'Panel Member',
      programLevelId: '2',
      limit: 5,
      isSpecialRule: false,
      effectiveDate: '2024-08-01',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    },
    {
      id: '11',
      role: 'Panel Member',
      programLevelId: '3',
      limit: 3,
      isSpecialRule: false,
      effectiveDate: '2024-08-01',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    },
    {
      id: '12',
      role: 'Panel Member',
      programLevelId: '4',
      limit: 3,
      isSpecialRule: false,
      effectiveDate: '2024-08-01',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    },
    // Other roles with higher limits
    {
      id: '13',
      role: 'Statistician',
      programLevelId: '1',
      limit: 30,
      isSpecialRule: false,
      effectiveDate: '2024-08-01',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    },
    {
      id: '14',
      role: 'Language Editor',
      programLevelId: '1',
      limit: 30,
      isSpecialRule: false,
      effectiveDate: '2024-08-01',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    },
    {
      id: '15',
      role: 'Secretary',
      programLevelId: '1',
      limit: 5,
      isSpecialRule: false,
      effectiveDate: '2024-08-01',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    },
    {
      id: '16',
      role: 'Validator',
      programLevelId: '1',
      limit: 5,
      isSpecialRule: false,
      effectiveDate: '2024-08-01',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    }
  ]);

  const [specialRules] = useState<AppearanceLimitRule[]>([
    {
      id: '100',
      role: 'Advisor',
      programLevelId: '2',
      departmentId: '1',
      limit: 10,
      isSpecialRule: true,
      description: 'Total Combined Limit: 10 appearances (Adviser + Chairman + Panel Member + Secretary + Validators)',
      effectiveDate: '2024-08-01',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    },
    {
      id: '101',
      role: 'Statistician',
      programLevelId: '2',
      departmentId: '1',
      limit: 30,
      isSpecialRule: true,
      description: '30 appearances (separate tracking from combined limit)',
      effectiveDate: '2024-08-01',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    },
    {
      id: '102',
      role: 'Language Editor',
      programLevelId: '2',
      departmentId: '1',
      limit: 30,
      isSpecialRule: true,
      description: '30 appearances (separate tracking from combined limit)',
      effectiveDate: '2024-08-01',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    }
  ]);

  const getProgramLevelName = (programLevelId: string) => {
    return programLevels.find(p => p.id === programLevelId)?.name || 'Unknown';
  };

  const getDepartmentName = (departmentId?: string) => {
    if (!departmentId) return 'All Departments';
    return departments.find(d => d.id === departmentId)?.name || 'Unknown';
  };

  const updateStandardLimit = (ruleId: string, newLimit: number) => {
    if (newLimit < 1 || newLimit > 100) {
      alert('Limit must be between 1 and 100');
      return;
    }
    
    setHasUnsavedChanges(true);
    setStandardLimits(prev => 
      prev.map(rule => 
        rule.id === ruleId 
          ? { ...rule, limit: newLimit, updatedAt: new Date().toISOString() }
          : rule
      )
    );
  };

  // Batch operations
  const handleBatchUpdate = (operation: 'increase' | 'decrease' | 'set', value?: number) => {
    if (selectedRules.length === 0) return;

    setShowConfirmDialog({
      title: 'Batch Update Limits',
      message: `This will ${operation} limits for ${selectedRules.length} selected rules. Continue?`,
      onConfirm: () => {
        setStandardLimits(prev => 
          prev.map(rule => {
            if (!selectedRules.includes(rule.id)) return rule;
            
            let newLimit = rule.limit;
            switch (operation) {
              case 'increase':
                newLimit = Math.min(rule.limit + (value || 1), 100);
                break;
              case 'decrease':
                newLimit = Math.max(rule.limit - (value || 1), 1);
                break;
              case 'set':
                newLimit = value || rule.limit;
                break;
            }
            
            return { ...rule, limit: newLimit, updatedAt: new Date().toISOString() };
          })
        );
        
        setSelectedRules([]);
        setHasUnsavedChanges(true);
        setShowConfirmDialog(null);
      }
    });
  };

  const toggleRuleSelection = (ruleId: string) => {
    setSelectedRules(prev => 
      prev.includes(ruleId) 
        ? prev.filter(id => id !== ruleId)
        : [...prev, ruleId]
    );
  };

  const selectAllByRole = (role: PanelRole) => {
    const roleRules = standardLimits.filter(rule => rule.role === role).map(rule => rule.id);
    setSelectedRules(prev => [...new Set([...prev, ...roleRules])]);
  };

  // Save changes
  const handleSaveChanges = () => {
    if (!hasUnsavedChanges) return;
    
    setShowConfirmDialog({
      title: 'Save Changes',
      message: 'Are you sure you want to save all appearance limit changes?',
      onConfirm: () => {
        console.log('Saving appearance limits...');
        setHasUnsavedChanges(false);
        setShowConfirmDialog(null);
        alert('Appearance limits saved successfully!');
      }
    });
  };

  // History tracking
  const viewChangeHistory = (ruleId: string) => {
    setShowHistoryModal(true);
    // In real implementation, fetch history for this rule
  };

  const roleIcons: Record<PanelRole, string> = {
    'Advisor': '👨‍🏫',
    'Adviser': '👨‍🏫',
    'Chairperson': '👑',
    'Panel Member': '👥',
    'Statistician': '📊',
    'Language Editor': '✏️',
    'Secretary': '📝',
    'Validator': '✅'
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Appearance Limits Configuration</h2>
          {hasUnsavedChanges && (
            <p className="text-sm text-orange-600 dark:text-orange-400 mt-1">
              You have unsaved changes
            </p>
          )}
        </div>
        <div className="flex items-center space-x-3">
          {hasUnsavedChanges && (
            <button
              onClick={handleSaveChanges}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          )}
          {selectedRules.length > 0 && (
            <button
              onClick={() => setShowBatchUpdateModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Edit3 className="w-4 h-4" />
              <span>Batch Update ({selectedRules.length})</span>
            </button>
          )}
          <button
            onClick={() => setShowAddRuleModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Special Rule</span>
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('standard')}
          className={`
            flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all duration-200
            ${activeTab === 'standard' 
              ? 'bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 shadow-sm' 
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
            }
          `}
        >
          <Users className="w-4 h-4" />
          <span>Standard Limits</span>
        </button>
        <button
          onClick={() => setActiveTab('special')}
          className={`
            flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all duration-200
            ${activeTab === 'special' 
              ? 'bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 shadow-sm' 
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
            }
          `}
        >
          <Shield className="w-4 h-4" />
          <span>Special Rules</span>
        </button>
      </div>

      {activeTab === 'standard' && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200">Standard Appearance Limits by Academic Level</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              These limits apply to all departments unless overridden by special rules
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={selectedRules.length === standardLimits.length}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedRules(standardLimits.map(rule => rule.id));
                        } else {
                          setSelectedRules([]);
                        }
                      }}
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Basic Ed.
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Tertiary
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Masters
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Doctorate
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                {roles.map(role => {
                  const roleLimits = standardLimits.filter(limit => limit.role === role && !limit.isSpecialRule);
                  const limitsByLevel = programLevels.reduce((acc, level) => {
                    const limit = roleLimits.find(l => l.programLevelId === level.id);
                    acc[level.name] = limit;
                    return acc;
                  }, {} as Record<string, AppearanceLimitRule | undefined>);

                  return (
                    <tr key={role} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => selectAllByRole(role)}
                          className="text-xs text-purple-600 hover:text-purple-700 hover:bg-purple-50 px-2 py-1 rounded"
                        >
                          Select All
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{roleIcons[role]}</span>
                          <span className="font-medium text-gray-800 dark:text-gray-200">{role}</span>
                        </div>
                      </td>
                      
                      {programLevels.map(level => {
                        const limit = limitsByLevel[level.name];
                        return (
                          <td key={level.id} className="px-6 py-4 text-center">
                            {limit ? (
                              <div className="flex items-center justify-center space-x-1">
                                <input
                                  type="checkbox"
                                  checked={selectedRules.includes(limit.id)}
                                  onChange={() => toggleRuleSelection(limit.id)}
                                  className="w-3 h-3 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                                />
                                <input
                                  type="number"
                                  min="1"
                                  max="100"
                                  value={limit.limit}
                                  onChange={(e) => updateStandardLimit(limit.id, parseInt(e.target.value) || 1)}
                                  className="w-16 px-2 py-1 text-center border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 dark:text-gray-200"
                                />
                                <button 
                                  onClick={() => viewChangeHistory(limit.id)}
                                  className="p-1 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded"
                                  title="View history"
                                >
                                  <Clock className="w-3 h-3" />
                                </button>
                              </div>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>
                        );
                      })}
                      
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <button className="px-3 py-1 text-sm bg-purple-600 text-white rounded hover:bg-purple-700">
                            Update
                          </button>
                          <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                            Log
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'special' && (
        <div className="space-y-6">
          {/* SAM Special Rules */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg">
                    <span className="text-red-600 dark:text-red-400 font-bold">🏥</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">SAM (School of Allied Medicine) - Special Rules</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Department-specific appearance limits that override standard rules</p>
                  </div>
                </div>
                <button className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded border border-blue-300">
                  Edit Rules
                </button>
              </div>
            </div>
            
            <div className="p-4 space-y-4">
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-medium text-amber-800 dark:text-amber-200">Combined Limit Rule</h4>
                    <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                      Total Combined Limit: <strong>10 appearances</strong>
                      <br />
                      (Adviser + Chairman + Panel Member + Secretary + Validators)
                    </p>
                    <div className="flex items-center space-x-4 mt-3">
                      <button className="px-3 py-1 text-sm bg-amber-600 text-white rounded hover:bg-amber-700">
                        Edit
                      </button>
                      <span className="text-xs text-amber-600 dark:text-amber-400">Effective: Aug 2024</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">📊</span>
                    <div>
                      <h5 className="font-medium text-green-800 dark:text-green-200">Statistician</h5>
                      <p className="text-sm text-green-700 dark:text-green-300">30 appearances (separate tracking)</p>
                    </div>
                    <button className="ml-auto px-2 py-1 text-xs text-green-600 hover:text-green-700 hover:bg-green-100 rounded">
                      Edit
                    </button>
                  </div>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">✏️</span>
                    <div>
                      <h5 className="font-medium text-blue-800 dark:text-blue-200">Language Editor</h5>
                      <p className="text-sm text-blue-700 dark:text-blue-300">30 appearances (separate tracking)</p>
                    </div>
                    <button className="ml-auto px-2 py-1 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-100 rounded">
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Other Departments */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {departments.filter(dept => dept.name !== 'SAM').map(dept => (
              <div key={dept.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Building2 className="w-5 h-5 text-gray-500" />
                    <span className="font-medium text-gray-800 dark:text-gray-200">{dept.name}</span>
                  </div>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  Standard individual role limits apply
                </p>
                <button className="w-full px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded border border-gray-300 dark:border-gray-600">
                  Edit Rules
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info Panel */}
      <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Info className="w-5 h-5 text-blue-500 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Important Notes</h4>
            <ul className="space-y-1 text-sm text-blue-700 dark:text-blue-300">
              <li>• Appearance limits are calculated per semester and academic year</li>
              <li>• Special department rules override standard limits when applicable</li>
              <li>• Combined limits (like SAM's rule) track multiple roles together</li>
              <li>• Changes take effect immediately for new requests</li>
              <li>• Historical data remains unchanged when limits are modified</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Add Special Rule Modal */}
      {showAddRuleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Add Special Rule</h3>
              <button
                onClick={() => setShowAddRuleModal(false)}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Department</label>
                <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 dark:text-gray-200">
                  {departments.map(dept => (
                    <option key={dept.id} value={dept.id}>{dept.fullName}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role</label>
                <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 dark:text-gray-200">
                  {roles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Program Level</label>
                <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 dark:text-gray-200">
                  {programLevels.map(level => (
                    <option key={level.id} value={level.id}>{level.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Limit</label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 dark:text-gray-200"
                  placeholder="Enter limit..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                <textarea
                  rows={3}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 dark:text-gray-200"
                  placeholder="Explain the special rule..."
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddRuleModal(false)}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Save Rule
              </button>
              <button
                onClick={() => setShowAddRuleModal(false)}
                className="flex-1 px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppearanceLimitsModule;