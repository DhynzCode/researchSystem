import React, { useState } from 'react';
import {
  Plus,
  Edit3,
  Trash2,
  Search,
  Filter,
  BookOpen,
  Building2,
  GraduationCap,
  Eye,
  EyeOff,
  Save,
  X,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { AcademicProgram, ProgramLevel, DepartmentConfig } from '../../types';

const AcademicProgramsModule: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'levels' | 'departments' | 'programs'>('levels');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [bulkActions, setBulkActions] = useState<string[]>([]);
  const [showBulkMenu, setShowBulkMenu] = useState(false);

  // Mock data
  const [programLevels] = useState<ProgramLevel[]>([
    {
      id: '1',
      name: 'Basic Education',
      description: 'AEMSHS/UZ THS/UZ SHS',
      isActive: true,
      sortOrder: 1
    },
    {
      id: '2',
      name: 'Tertiary Level',
      description: 'Colleges & Off-site branches',
      isActive: true,
      sortOrder: 2
    },
    {
      id: '3',
      name: 'SGS Masters & FS',
      description: 'Masters and Foreign Study Programs',
      isActive: true,
      sortOrder: 3
    },
    {
      id: '4',
      name: 'SGS Doctorate Program',
      description: 'Doctorate Programs',
      isActive: true,
      sortOrder: 4
    }
  ]);

  const [departments] = useState<DepartmentConfig[]>([
    {
      id: '1',
      name: 'SAM',
      code: 'SAM',
      fullName: 'School of Allied Medicine',
      isActive: true
    },
    {
      id: '2',
      name: 'SEICT',
      code: 'SEICT',
      fullName: 'School of Engineering, Information and Computing Technology',
      isActive: true
    },
    {
      id: '3',
      name: 'SLAS',
      code: 'SLAS',
      fullName: 'School of Liberal Arts and Sciences',
      isActive: true
    },
    {
      id: '4',
      name: 'SOE',
      code: 'SOE',
      fullName: 'School of Education',
      isActive: true
    },
    {
      id: '5',
      name: 'SBM',
      code: 'SBM',
      fullName: 'School of Business Management',
      isActive: true
    },
    {
      id: '6',
      name: 'SCJ',
      code: 'SCJ',
      fullName: 'School of Criminal Justice',
      isActive: true
    }
  ]);

  const [programs] = useState<AcademicProgram[]>([
    {
      id: '1',
      name: 'Bachelor of Science in Information Technology',
      code: 'BSIT',
      departmentId: '2',
      programLevelId: '2',
      isActive: true,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    },
    {
      id: '2',
      name: 'Bachelor of Science in Computer Science',
      code: 'BSCS',
      departmentId: '2',
      programLevelId: '2',
      isActive: true,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    },
    {
      id: '3',
      name: 'Bachelor of Science in Nursing',
      code: 'BSN',
      departmentId: '1',
      programLevelId: '2',
      isActive: true,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    },
    {
      id: '4',
      name: 'Bachelor of Arts in Psychology',
      code: 'BAP',
      departmentId: '3',
      programLevelId: '2',
      isActive: true,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    },
    {
      id: '5',
      name: 'Bachelor of Science in Biology',
      code: 'BSBio',
      departmentId: '3',
      programLevelId: '2',
      isActive: true,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01'
    }
  ]);

  const getDepartmentName = (departmentId: string) => {
    return departments.find(d => d.id === departmentId)?.name || 'Unknown';
  };

  const getProgramLevelName = (programLevelId: string) => {
    return programLevels.find(p => p.id === programLevelId)?.name || 'Unknown';
  };

  // Enhanced filtering and search
  const getFilteredItems = () => {
    let items: any[] = [];
    
    switch (activeSection) {
      case 'levels':
        items = programLevels;
        break;
      case 'departments':
        items = departments;
        break;
      case 'programs':
        items = programs;
        break;
    }

    // Apply search filter
    if (searchTerm) {
      items = items.filter(item => 
        item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (filterStatus !== 'all') {
      items = items.filter(item => 
        filterStatus === 'active' ? item.isActive : !item.isActive
      );
    }

    return items;
  };

  // Bulk operations
  const handleBulkAction = (action: 'activate' | 'deactivate' | 'delete') => {
    if (bulkActions.length === 0) return;
    
    switch (action) {
      case 'activate':
        console.log('Activating items:', bulkActions);
        break;
      case 'deactivate':
        console.log('Deactivating items:', bulkActions);
        break;
      case 'delete':
        setShowDeleteConfirm({ type: 'bulk', items: bulkActions });
        break;
    }
    setBulkActions([]);
    setShowBulkMenu(false);
  };

  const toggleBulkSelection = (itemId: string) => {
    setBulkActions(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const selectAllVisible = () => {
    const visibleItems = getFilteredItems();
    setBulkActions(visibleItems.map(item => item.id));
  };

  // Form validation
  const validateForm = (data: any) => {
    const errors: string[] = [];
    
    if (!data.name?.trim()) errors.push('Name is required');
    if (!data.code?.trim()) errors.push('Code is required');
    
    if (activeSection === 'programs') {
      if (!data.departmentId) errors.push('Department is required');
      if (!data.programLevelId) errors.push('Program Level is required');
    }

    return errors;
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Academic Programs Management</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New</span>
        </button>
      </div>

      {/* Section Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
        {[
          { id: 'levels', label: 'Program Levels', icon: GraduationCap },
          { id: 'departments', label: 'Departments', icon: Building2 },
          { id: 'programs', label: 'Programs', icon: BookOpen }
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveSection(id as any)}
            className={`
              flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all duration-200
              ${activeSection === id 
                ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm' 
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }
            `}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Enhanced Search and Filter */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder={`Search ${activeSection}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 dark:text-gray-200"
            />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-gray-200"
          >
            <option value="all">All Status</option>
            <option value="active">Active Only</option>
            <option value="inactive">Inactive Only</option>
          </select>
        </div>

        {/* Bulk Actions */}
        {bulkActions.length > 0 && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {bulkActions.length} selected
            </span>
            <div className="relative">
              <button
                onClick={() => setShowBulkMenu(!showBulkMenu)}
                className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
              >
                Bulk Actions
              </button>
              {showBulkMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                  <button
                    onClick={() => handleBulkAction('activate')}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 text-green-600"
                  >
                    Activate Selected
                  </button>
                  <button
                    onClick={() => handleBulkAction('deactivate')}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 text-orange-600"
                  >
                    Deactivate Selected
                  </button>
                  <button
                    onClick={() => handleBulkAction('delete')}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 text-red-600"
                  >
                    Delete Selected
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Content based on active section */}
      {activeSection === 'levels' && (
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">Program Level Configuration</h3>
            <div className="space-y-3">
              {programLevels.map((level) => (
                <div key={level.id} className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${level.isActive ? 'bg-green-500' : 'bg-gray-400'}`} />
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-gray-200">{level.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{level.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                      {level.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeSection === 'departments' && (
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">Department Management</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {departments.map((dept) => (
                <div key={dept.id} className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <Building2 className="w-5 h-5 text-blue-500" />
                      <span className="font-medium text-gray-800 dark:text-gray-200">{dept.code}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button className="p-1 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                        <Edit3 className="w-3 h-3" />
                      </button>
                      <div className={`w-2 h-2 rounded-full ${dept.isActive ? 'bg-green-500' : 'bg-gray-400'}`} />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{dept.fullName}</p>
                  <div className="mt-2 text-xs text-gray-500">
                    {programs.filter(p => p.departmentId === dept.id).length} programs
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeSection === 'programs' && (
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">Program Management by Department</h3>
            
            {departments.map((dept) => {
              const deptPrograms = programs.filter(p => p.departmentId === dept.id);
              if (deptPrograms.length === 0) return null;

              return (
                <div key={dept.id} className="mb-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <Building2 className="w-5 h-5 text-blue-500" />
                    <h4 className="font-medium text-gray-800 dark:text-gray-200">{dept.fullName} ({dept.code})</h4>
                  </div>
                  
                  <div className="space-y-2 ml-7">
                    {deptPrograms.map((program) => (
                      <div key={program.id} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
                        <div className="flex items-center space-x-3">
                          <div className={`w-2 h-2 rounded-full ${program.isActive ? 'bg-green-500' : 'bg-gray-400'}`} />
                          <div>
                            <span className="font-medium text-gray-800 dark:text-gray-200">{program.name}</span>
                            <span className="text-gray-500 ml-2">({program.code})</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                            {getProgramLevelName(program.programLevelId)}
                          </span>
                          <button className="p-1 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                            <Edit3 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Add New {activeSection.charAt(0).toUpperCase() + activeSection.slice(1, -1)}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-gray-200"
                  placeholder="Enter name..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Code</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-gray-200"
                  placeholder="Enter code..."
                />
              </div>
              
              {activeSection === 'programs' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Department</label>
                    <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-gray-200">
                      {departments.map((dept) => (
                        <option key={dept.id} value={dept.id}>{dept.fullName}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Program Level</label>
                    <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-gray-200">
                      {programLevels.map((level) => (
                        <option key={level.id} value={level.id}>{level.name}</option>
                      ))}
                    </select>
                  </div>
                </>
              )}
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save
              </button>
              <button
                onClick={() => setShowAddModal(false)}
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

export default AcademicProgramsModule;