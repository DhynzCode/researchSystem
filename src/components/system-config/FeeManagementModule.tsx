import React, { useState } from 'react';
import {
  Plus,
  Edit3,
  Copy,
  Download,
  Upload,
  Save,
  X,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Calendar,
  Building2,
  Package
} from 'lucide-react';
import { FeeStructure, PanelRole, DefenseType, ProgramLevel } from '../../types';

const FeeManagementModule: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState('2024-2025');
  const [selectedLevel, setSelectedLevel] = useState('2');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingFee, setEditingFee] = useState<{role: PanelRole, defenseType: DefenseType} | null>(null);
  const [showCopyModal, setShowCopyModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState<any>(null);

  // Mock data
  const programLevels: ProgramLevel[] = [
    { id: '1', name: 'Basic Education', description: 'AEMSHS/UZ THS/UZ SHS', isActive: true, sortOrder: 1 },
    { id: '2', name: 'Tertiary Level', description: 'Colleges & Off-site branches', isActive: true, sortOrder: 2 },
    { id: '3', name: 'SGS Masters & FS', description: 'Masters and Foreign Study', isActive: true, sortOrder: 3 },
    { id: '4', name: 'SGS Doctorate Program', description: 'Doctorate Programs', isActive: true, sortOrder: 4 }
  ];

  const departments = [
    { id: '1', name: 'SAM', fullName: 'School of Allied Medicine' },
    { id: '2', name: 'SEICT', fullName: 'School of Engineering, Information and Computing Technology' },
    { id: '3', name: 'SLAS', fullName: 'School of Liberal Arts and Sciences' },
    { id: '4', name: 'SOE', fullName: 'School of Education' },
    { id: '5', name: 'SBM', fullName: 'School of Business Management' },
    { id: '6', name: 'SCJ', fullName: 'School of Criminal Justice' }
  ];

  const programs = [
    { id: '1', name: 'Bachelor of Science in Information Technology', code: 'BSIT', departmentId: '2' },
    { id: '2', name: 'Bachelor of Science in Computer Science', code: 'BSCS', departmentId: '2' },
    { id: '3', name: 'Bachelor of Science in Electronics Engineering', code: 'BSECE', departmentId: '2' },
    { id: '4', name: 'Bachelor of Science in Nursing', code: 'BSN', departmentId: '1' },
    { id: '5', name: 'Bachelor of Science in Pharmacy', code: 'BSPh', departmentId: '1' },
    { id: '6', name: 'Bachelor of Arts in Psychology', code: 'BAP', departmentId: '3' },
    { id: '7', name: 'Bachelor of Science in Biology', code: 'BSBio', departmentId: '3' }
  ];

  const [feeStructure, setFeeStructure] = useState<FeeStructure>({
    id: '1',
    academicYear: '2024-2025',
    programLevelId: '2',
    defenseType: 'Pre-Oral',
    fees: {
      'Advisor': { preOral: 800, final: 800 },
      'Chairperson': { preOral: 400, final: 400 },
      'Panel Member': { preOral: 300, final: 300 },
      'Statistician': { preOral: 500, final: 500 },
      'Language Editor': { preOral: 1500, final: 1500 },
      'Secretary': { preOral: 200, final: 200 },
      'Validator': { preOral: 0, final: 5100 }
    },
    packageOptions: {
      pureQuantitative: { preOral: 2000, final: 5100 },
      pureQualitative: { preOral: 2000, final: 4600 },
      perStudent: { preOral: 666.66, final: 1533.33 }
    },
    isActive: true,
    effectiveDate: '2024-08-01',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  });

  const roleLabels: Record<PanelRole, { label: string; icon: string }> = {
    'Advisor': { label: "Adviser's Fee", icon: '👨‍🏫' },
    'Adviser': { label: "Adviser's Fee", icon: '👨‍🏫' },
    'Chairperson': { label: "Chairman's Fee", icon: '👑' },
    'Panel Member': { label: 'Panel Member', icon: '👥' },
    'Statistician': { label: "Statistician's Fee", icon: '📊' },
    'Language Editor': { label: 'Language Editor', icon: '✏️' },
    'Secretary': { label: "Secretary's Fee", icon: '📝' },
    'Validator': { label: "Validator's Fee", icon: '✅' }
  };

  // Enhanced validation
  const validateFeeAmount = (amount: number, role: PanelRole): string[] => {
    const errors: string[] = [];
    
    if (amount < 0) errors.push('Amount cannot be negative');
    if (amount > 10000) errors.push('Amount seems too high (>₱10,000)');
    
    // Role-specific validation
    if (role === 'Statistician' || role === 'Language Editor') {
      if (amount > 2000) errors.push(`${role} fee is typically under ₱2,000`);
    } else {
      if (amount > 1000) errors.push(`${role} fee is typically under ₱1,000`);
    }
    
    return errors;
  };

  const updateFee = (role: PanelRole, defenseType: 'preOral' | 'final', amount: number) => {
    // Validate the fee amount
    const errors = validateFeeAmount(amount, role);
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }
    
    setValidationErrors([]);
    setHasUnsavedChanges(true);
    
    setFeeStructure(prev => ({
      ...prev,
      fees: {
        ...prev.fees,
        [role]: {
          ...prev.fees[role],
          [defenseType]: amount
        }
      }
    }));
  };

  // Save changes
  const handleSaveChanges = () => {
    if (!hasUnsavedChanges) return;
    
    setShowConfirmDialog({
      title: 'Save Fee Changes',
      message: 'Are you sure you want to save these fee structure changes? This will affect future calculations.',
      onConfirm: () => {
        // Simulate save operation
        console.log('Saving fee structure:', feeStructure);
        setHasUnsavedChanges(false);
        setShowConfirmDialog(null);
        
        // Show success notification
        setTimeout(() => {
          alert('Fee structure saved successfully!');
        }, 100);
      }
    });
  };

  // Copy to other levels
  const handleCopyToLevels = () => {
    setShowCopyModal(true);
  };

  // Import from previous year
  const handleImportPrevious = () => {
    setShowImportModal(true);
  };

  // Calculate total cost for a typical defense
  const calculateTypicalCost = (defenseType: 'preOral' | 'final') => {
    const totalCost = Object.entries(feeStructure.fees).reduce((total, [role, fees]) => {
      const amount = fees?.[defenseType] || 0;
      return total + amount;
    }, 0);
    return totalCost;
  };

  const updatePackageOption = (packageType: keyof typeof feeStructure.packageOptions, defenseType: 'preOral' | 'final', amount: number) => {
    setFeeStructure(prev => ({
      ...prev,
      packageOptions: {
        ...prev.packageOptions,
        [packageType]: {
          ...prev.packageOptions[packageType],
          [defenseType]: amount
        }
      }
    }));
  };

  const getSelectedLevelName = () => {
    return programLevels.find(level => level.id === selectedLevel)?.name || 'Unknown Level';
  };

  const getDepartmentPrograms = (departmentId: string) => {
    return programs.filter(p => p.departmentId === departmentId);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Fee Structure Configuration</h2>
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
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Fee Structure</span>
          </button>
        </div>
      </div>

      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <h3 className="font-medium text-red-800 dark:text-red-200">Validation Errors</h3>
          </div>
          <ul className="space-y-1">
            {validationErrors.map((error, index) => (
              <li key={index} className="text-sm text-red-700 dark:text-red-300">• {error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Cost Summary */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
          <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Pre-Oral Defense</h3>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            ₱{calculateTypicalCost('preOral').toLocaleString()}
          </p>
          <p className="text-xs text-blue-600 dark:text-blue-400">Total typical cost</p>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
          <h3 className="font-medium text-green-800 dark:text-green-200 mb-2">Final Defense</h3>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            ₱{calculateTypicalCost('final').toLocaleString()}
          </p>
          <p className="text-xs text-green-600 dark:text-green-400">Total typical cost</p>
        </div>
      </div>

      {/* Year and Level Selection */}
      <div className="flex items-center space-x-4 mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-gray-500" />
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Academic Year:</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 dark:text-gray-200"
          >
            <option value="2024-2025">2024-2025</option>
            <option value="2023-2024">2023-2024</option>
            <option value="2022-2023">2022-2023</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Program Level:</label>
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 dark:text-gray-200"
          >
            {programLevels.map(level => (
              <option key={level.id} value={level.id}>{level.name}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2 ml-auto">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs text-gray-600 dark:text-gray-400">Active</span>
          </div>
        </div>
      </div>

      {/* Program Structure Overview */}
      <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
          {getSelectedLevelName()} - Fee Configuration
        </h3>
        
        <div className="space-y-4">
          {departments.map(dept => {
            const deptPrograms = getDepartmentPrograms(dept.id);
            if (deptPrograms.length === 0) return null;

            return (
              <div key={dept.id}>
                <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center space-x-2">
                  <Building2 className="w-4 h-4" />
                  <span>{dept.name} Programs:</span>
                </h4>
                <div className="space-y-1 ml-6">
                  {deptPrograms.map(program => (
                    <div key={program.id} className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        • {program.name} ({program.code})
                      </span>
                      <button className="text-xs text-blue-600 hover:text-blue-700 px-2 py-1 rounded hover:bg-blue-50">
                        Edit
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fee Structure Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200">Individual Role Fees</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Pre-Oral Defense
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Final Defense
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
              {(['Advisor', 'Chairperson', 'Panel Member', 'Statistician', 'Language Editor', 'Secretary', 'Validator'] as PanelRole[]).map(role => {
                const roleFees = feeStructure.fees[role];
                const roleInfo = roleLabels[role];
                
                return (
                  <tr key={role} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{roleInfo.icon}</span>
                        <span className="font-medium text-gray-800 dark:text-gray-200">{roleInfo.label}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {roleFees?.preOral !== undefined && roleFees.preOral > 0 ? (
                        <div className="flex items-center justify-center space-x-2">
                          <span className="text-gray-800 dark:text-gray-200">₱</span>
                          <input
                            type="number"
                            value={roleFees.preOral}
                            onChange={(e) => updateFee(role, 'preOral', parseFloat(e.target.value) || 0)}
                            className="w-24 px-2 py-1 text-center border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 dark:text-gray-200"
                          />
                          <button
                            onClick={() => setEditingFee({role, defenseType: 'Pre-Oral'})}
                            className="p-1 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded"
                          >
                            <Edit3 className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => updateFee(role, 'preOral', 500)}
                          className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded border border-blue-300 hover:border-blue-400"
                        >
                          Add
                        </button>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {roleFees?.final !== undefined && roleFees.final > 0 ? (
                        <div className="flex items-center justify-center space-x-2">
                          <span className="text-gray-800 dark:text-gray-200">₱</span>
                          <input
                            type="number"
                            value={roleFees.final}
                            onChange={(e) => updateFee(role, 'final', parseFloat(e.target.value) || 0)}
                            className="w-24 px-2 py-1 text-center border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 dark:text-gray-200"
                          />
                          <button
                            onClick={() => setEditingFee({role, defenseType: 'Final'})}
                            className="p-1 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded"
                          >
                            <Edit3 className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => updateFee(role, 'final', 500)}
                          className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded border border-blue-300 hover:border-blue-400"
                        >
                          Add
                        </button>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                          Update
                        </button>
                        <button className="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600">
                          Copy
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

      {/* Package Options */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <Package className="w-5 h-5 text-purple-500" />
            <h3 className="font-semibold text-gray-800 dark:text-gray-200">Package Options Configuration</h3>
          </div>
        </div>
        
        <div className="p-4">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-600">
                <th className="text-left py-2 font-medium text-gray-700 dark:text-gray-300">Package Type</th>
                <th className="text-center py-2 font-medium text-gray-700 dark:text-gray-300">Pre-Oral Defense</th>
                <th className="text-center py-2 font-medium text-gray-700 dark:text-gray-300">Final Defense</th>
                <th className="text-center py-2 font-medium text-gray-700 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
              <tr>
                <td className="py-3 font-medium text-gray-800 dark:text-gray-200">Pure Quantitative:</td>
                <td className="py-3 text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <span>₱</span>
                    <input
                      type="number"
                      value={feeStructure.packageOptions.pureQuantitative.preOral}
                      onChange={(e) => updatePackageOption('pureQuantitative', 'preOral', parseFloat(e.target.value) || 0)}
                      className="w-24 px-2 py-1 text-center border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 dark:text-gray-200"
                    />
                    <button className="p-1 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded">
                      <Edit3 className="w-3 h-3" />
                    </button>
                  </div>
                </td>
                <td className="py-3 text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <span>₱</span>
                    <input
                      type="number"
                      value={feeStructure.packageOptions.pureQuantitative.final}
                      onChange={(e) => updatePackageOption('pureQuantitative', 'final', parseFloat(e.target.value) || 0)}
                      className="w-24 px-2 py-1 text-center border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 dark:text-gray-200"
                    />
                    <button className="p-1 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded">
                      <Edit3 className="w-3 h-3" />
                    </button>
                  </div>
                </td>
                <td className="py-3 text-center">
                  <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                    Update
                  </button>
                </td>
              </tr>
              
              <tr>
                <td className="py-3 font-medium text-gray-800 dark:text-gray-200">Pure Qualitative:</td>
                <td className="py-3 text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <span>₱</span>
                    <input
                      type="number"
                      value={feeStructure.packageOptions.pureQualitative.preOral}
                      onChange={(e) => updatePackageOption('pureQualitative', 'preOral', parseFloat(e.target.value) || 0)}
                      className="w-24 px-2 py-1 text-center border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 dark:text-gray-200"
                    />
                    <button className="p-1 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded">
                      <Edit3 className="w-3 h-3" />
                    </button>
                  </div>
                </td>
                <td className="py-3 text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <span>₱</span>
                    <input
                      type="number"
                      value={feeStructure.packageOptions.pureQualitative.final}
                      onChange={(e) => updatePackageOption('pureQualitative', 'final', parseFloat(e.target.value) || 0)}
                      className="w-24 px-2 py-1 text-center border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 dark:text-gray-200"
                    />
                    <button className="p-1 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded">
                      <Edit3 className="w-3 h-3" />
                    </button>
                  </div>
                </td>
                <td className="py-3 text-center">
                  <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                    Update
                  </button>
                </td>
              </tr>
              
              <tr>
                <td className="py-3 font-medium text-gray-800 dark:text-gray-200">Per Student (3-5):</td>
                <td className="py-3 text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <span>₱</span>
                    <input
                      type="number"
                      step="0.01"
                      value={feeStructure.packageOptions.perStudent.preOral}
                      onChange={(e) => updatePackageOption('perStudent', 'preOral', parseFloat(e.target.value) || 0)}
                      className="w-24 px-2 py-1 text-center border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 dark:text-gray-200"
                    />
                    <button className="p-1 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded">
                      <Edit3 className="w-3 h-3" />
                    </button>
                  </div>
                </td>
                <td className="py-3 text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <span>₱</span>
                    <input
                      type="number"
                      step="0.01"
                      value={feeStructure.packageOptions.perStudent.final}
                      onChange={(e) => updatePackageOption('perStudent', 'final', parseFloat(e.target.value) || 0)}
                      className="w-24 px-2 py-1 text-center border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 dark:text-gray-200"
                    />
                    <button className="p-1 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded">
                      <Edit3 className="w-3 h-3" />
                    </button>
                  </div>
                </td>
                <td className="py-3 text-center">
                  <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                    Update
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Enhanced Action Buttons */}
      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <div className="flex space-x-3">
          <button 
            onClick={handleCopyToLevels}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Copy className="w-4 h-4" />
            <span>Copy to Other Levels</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export Fee Structure</span>
          </button>
        </div>
        
        <button 
          onClick={handleImportPrevious}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <Upload className="w-4 h-4" />
          <span>Import from Previous Year</span>
        </button>
      </div>

      {/* Copy Modal */}
      {showCopyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Copy Fee Structure
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Select the program levels to copy the current fee structure to:
            </p>
            <div className="space-y-2 mb-6">
              {programLevels.filter(level => level.id !== selectedLevel).map(level => (
                <label key={level.id} className="flex items-center space-x-2">
                  <input type="checkbox" className="w-4 h-4 text-purple-600" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{level.name}</span>
                </label>
              ))}
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowCopyModal(false)}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Copy
              </button>
              <button
                onClick={() => setShowCopyModal(false)}
                className="flex-1 px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Import from Previous Year
            </h3>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Source Academic Year
                </label>
                <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-gray-200">
                  <option value="2023-2024">2023-2024</option>
                  <option value="2022-2023">2022-2023</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Import Options
                </label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">Individual role fees</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">Package options</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">Apply 5% inflation adjustment</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowImportModal(false)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Import
              </button>
              <button
                onClick={() => setShowImportModal(false)}
                className="flex-1 px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
              {showConfirmDialog.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              {showConfirmDialog.message}
            </p>
            <div className="flex space-x-3">
              <button
                onClick={showConfirmDialog.onConfirm}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowConfirmDialog(null)}
                className="flex-1 px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg"
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

export default FeeManagementModule;