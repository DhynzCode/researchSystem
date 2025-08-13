import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  AlertTriangle, 
  Filter, 
  Download, 
  Info,
  Users,
  Calendar,
  Award,
  Search,
  Edit,
  Trash2
} from 'lucide-react';
import { MatrixCategory, FacultyAppearance, MatrixTableRow, MatrixPanelRole, MatrixProgramLevel, DefenseType } from '../types';

const MatrixTable: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [filterRole, setFilterRole] = useState<MatrixPanelRole | 'All'>('All');
  const [filterExceeded, setFilterExceeded] = useState(false);
  const [searchFaculty, setSearchFaculty] = useState('');
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState<Partial<MatrixCategory>>({
    schoolYear: '2024-2025',
    semester: '1st Semester',
    defenseType: 'Pre-Oral',
    programLevel: 'tertiary'
  });

  // Mock data for demonstration
  const [categories, setCategories] = useState<MatrixCategory[]>([
    {
      id: 'cat-1',
      schoolYear: '2024-2025',
      semester: '2nd Semester',
      defenseType: 'Pre-Oral',
      programLevel: 'tertiary'
    },
    {
      id: 'cat-2',
      schoolYear: '2024-2025',
      semester: '2nd Semester',
      defenseType: 'Pre-Oral',
      programLevel: 'MA'
    },
    {
      id: 'cat-3',
      schoolYear: '2024-2025',
      semester: '1st Semester',
      defenseType: 'Final',
      programLevel: 'PhD'
    }
  ]);

  const [appearances, setAppearances] = useState<FacultyAppearance[]>([
    { facultyId: '1', facultyName: 'Engr. Gadingan', categoryId: 'cat-1', role: 'Advisor', count: 1, isExceeded: false },
    { facultyId: '1', facultyName: 'Engr. Gadingan', categoryId: 'cat-1', role: 'Panel Chairman', count: 1, isExceeded: false },
    { facultyId: '1', facultyName: 'Engr. Gadingan', categoryId: 'cat-1', role: 'Panel Member', count: 1, isExceeded: false },
    { facultyId: '2', facultyName: 'Dr. Locson', categoryId: 'cat-1', role: 'Advisor', count: 5, isExceeded: false },
    { facultyId: '2', facultyName: 'Dr. Locson', categoryId: 'cat-2', role: 'Panel Member', count: 5, isExceeded: false },
    { facultyId: '3', facultyName: 'Dr. Lajabujan', categoryId: 'cat-1', role: 'Panel Chairman', count: 5, isExceeded: false },
    { facultyId: '3', facultyName: 'Dr. Lajabujan', categoryId: 'cat-1', role: 'Panel Member', count: 5, isExceeded: false },
    { facultyId: '4', facultyName: 'Dr. Locson', categoryId: 'cat-2', role: 'Panel Chairman', count: 5, isExceeded: false },
    { facultyId: '4', facultyName: 'Dr. Locson', categoryId: 'cat-2', role: 'Advisor', count: 5, isExceeded: false },
    { facultyId: '5', facultyName: 'Dr. Monggapa', categoryId: 'cat-1', role: 'Panel Member', count: 5, isExceeded: false },
    { facultyId: '6', facultyName: 'Engr. Gadingan', categoryId: 'cat-2', role: 'Advisor', count: 5, isExceeded: false },
    { facultyId: '6', facultyName: 'Engr. Gadingan', categoryId: 'cat-2', role: 'Panel Chairman', count: 5, isExceeded: false },
    { facultyId: '7', facultyName: 'Engr. Gadingan', categoryId: 'cat-3', role: 'Panel Member', count: 5, isExceeded: false },
    // Exceeded examples
    { facultyId: '8', facultyName: 'Dr. Santos', categoryId: 'cat-1', role: 'Advisor', count: 6, isExceeded: true },
    { facultyId: '9', facultyName: 'Prof. Cruz', categoryId: 'cat-2', role: 'Panel Chairman', count: 7, isExceeded: true },
  ]);

  const programLevelLabels: Record<MatrixProgramLevel, string> = {
    'basic education': 'Basic Education',
    'tertiary': 'Tertiary',
    'MA': 'Masters',
    'PhD': 'Doctorate'
  };

  const roleLabels: Record<MatrixPanelRole, string> = {
    'Advisor': 'Advisor',
    'Panel Chairman': 'Panel Chairman',
    'Panel Member': 'Panel Member'
  };

  const compensationRates: Record<MatrixPanelRole, number> = {
    'Advisor': 350,
    'Panel Chairman': 450,
    'Panel Member': 400
  };

  // Calculate matrix table data
  const matrixData = useMemo(() => {
    const facultyMap = new Map<string, MatrixTableRow>();

    appearances.forEach(appearance => {
      const key = appearance.facultyName;
      
      if (!facultyMap.has(key)) {
        facultyMap.set(key, {
          facultyName: appearance.facultyName,
          appearances: {},
          totalAppearances: 0,
          totalCompensation: 0,
          hasExceededLimit: false
        });
      }

      const faculty = facultyMap.get(key)!;
      
      if (!faculty.appearances[appearance.categoryId]) {
        faculty.appearances[appearance.categoryId] = {};
      }
      
      faculty.appearances[appearance.categoryId][appearance.role] = appearance.count;
      faculty.totalAppearances += appearance.count;
      faculty.totalCompensation += appearance.count * compensationRates[appearance.role];
      
      if (appearance.isExceeded || appearance.count > 5) {
        faculty.hasExceededLimit = true;
      }
    });

    return Array.from(facultyMap.values());
  }, [appearances]);

  // Filter data
  const filteredData = useMemo(() => {
    return matrixData.filter(row => {
      const matchesSearch = row.facultyName.toLowerCase().includes(searchFaculty.toLowerCase());
      const matchesExceeded = !filterExceeded || row.hasExceededLimit;
      
      if (filterRole === 'All') {
        return matchesSearch && matchesExceeded;
      }
      
      const hasRole = Object.values(row.appearances).some(categoryAppearances => 
        categoryAppearances[filterRole] && categoryAppearances[filterRole]! > 0
      );
      
      return matchesSearch && matchesExceeded && hasRole;
    });
  }, [matrixData, searchFaculty, filterExceeded, filterRole]);

  const addCategory = () => {
    if (newCategory.schoolYear && newCategory.semester && newCategory.defenseType && newCategory.programLevel) {
      const category: MatrixCategory = {
        id: `cat-${Date.now()}`,
        schoolYear: newCategory.schoolYear,
        semester: newCategory.semester,
        defenseType: newCategory.defenseType,
        programLevel: newCategory.programLevel
      };
      
      setCategories([...categories, category]);
      setNewCategory({
        schoolYear: '2024-2025',
        semester: '1st Semester',
        defenseType: 'Pre-Oral',
        programLevel: 'tertiary'
      });
      setShowAddCategory(false);
    }
  };

  const removeCategory = (categoryId: string) => {
    setCategories(categories.filter(cat => cat.id !== categoryId));
    setAppearances(appearances.filter(app => app.categoryId !== categoryId));
  };

  const updateAppearanceCount = (facultyName: string, categoryId: string, role: MatrixPanelRole, newCount: number) => {
    const existingIndex = appearances.findIndex(
      app => app.facultyName === facultyName && app.categoryId === categoryId && app.role === role
    );

    if (existingIndex >= 0) {
      const updatedAppearances = [...appearances];
      updatedAppearances[existingIndex] = {
        ...updatedAppearances[existingIndex],
        count: newCount,
        isExceeded: newCount > 5
      };
      setAppearances(updatedAppearances);
    } else if (newCount > 0) {
      const newAppearance: FacultyAppearance = {
        facultyId: Date.now().toString(),
        facultyName,
        categoryId,
        role,
        count: newCount,
        isExceeded: newCount > 5
      };
      setAppearances([...appearances, newAppearance]);
    }
  };

  const getAppearanceCount = (facultyName: string, categoryId: string, role: MatrixPanelRole): number => {
    const appearance = appearances.find(
      app => app.facultyName === facultyName && app.categoryId === categoryId && app.role === role
    );
    return appearance?.count || 0;
  };

  const isExceeded = (facultyName: string, categoryId: string, role: MatrixPanelRole): boolean => {
    const appearance = appearances.find(
      app => app.facultyName === facultyName && app.categoryId === categoryId && app.role === role
    );
    return appearance?.isExceeded || false;
  };

  const totalExceededFaculty = matrixData.filter(row => row.hasExceededLimit).length;
  const totalAppearances = matrixData.reduce((sum, row) => sum + row.totalAppearances, 0);
  const totalCompensation = matrixData.reduce((sum, row) => sum + row.totalCompensation, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Faculty Appearance Matrix</h1>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowAddCategory(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Defense</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Download className="w-4 h-4" />
            <span>Export Matrix</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Categories</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">{categories.length}</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Exceeded Limit</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">{totalExceededFaculty}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Appearances</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">{totalAppearances}</p>
            </div>
            <Users className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Compensation</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">₱{totalCompensation.toLocaleString()}</p>
            </div>
            <Award className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Add Category Modal */}
      {showAddCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Add New Defense Category</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">School Year</label>
                <input
                  type="text"
                  value={newCategory.schoolYear || ''}
                  onChange={(e) => setNewCategory({...newCategory, schoolYear: e.target.value})}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 dark:text-gray-200"
                  placeholder="e.g., 2024-2025"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Semester</label>
                <select
                  value={newCategory.semester || ''}
                  onChange={(e) => setNewCategory({...newCategory, semester: e.target.value as '1st Semester' | '2nd Semester'})}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 dark:text-gray-200"
                >
                  <option value="1st Semester">1st Semester</option>
                  <option value="2nd Semester">2nd Semester</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Defense Type</label>
                <select
                  value={newCategory.defenseType || ''}
                  onChange={(e) => setNewCategory({...newCategory, defenseType: e.target.value as DefenseType})}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 dark:text-gray-200"
                >
                  <option value="Pre-Oral">Pre-Oral</option>
                  <option value="Final">Final</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Program Level</label>
                <select
                  value={newCategory.programLevel || ''}
                  onChange={(e) => setNewCategory({...newCategory, programLevel: e.target.value as MatrixProgramLevel})}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 dark:text-gray-200"
                >
                  <option value="basic education">Basic Education</option>
                  <option value="tertiary">Tertiary</option>
                  <option value="MA">Masters</option>
                  <option value="PhD">Doctorate</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={addCategory}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Add Category
              </button>
              <button
                onClick={() => setShowAddCategory(false)}
                className="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-7000 text-white rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Filter className="w-5 h-5 text-gray-500" />
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Filters & Search</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 dark:text-gray-500 absolute left-3 top-3" />
            <input
              type="text"
              value={searchFaculty}
              onChange={(e) => setSearchFaculty(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
              placeholder="Search faculty..."
            />
          </div>

          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value as MatrixPanelRole | 'All')}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 dark:text-gray-200"
          >
            <option value="All">All Roles</option>
            <option value="Advisor">Advisor</option>
            <option value="Panel Chairman">Panel Chairman</option>
            <option value="Panel Member">Panel Member</option>
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 dark:text-gray-200"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.defenseType} - {category.semester} - {category.schoolYear} - {programLevelLabels[category.programLevel]}
              </option>
            ))}
          </select>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={filterExceeded}
              onChange={(e) => setFilterExceeded(e.target.checked)}
              className="w-4 h-4 text-green-600 border-gray-300 dark:border-gray-600 rounded focus:ring-green-500"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Show exceeded only</span>
          </label>
        </div>
      </div>

      {/* Categories Management */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Defense Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map(category => (
            <div key={category.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      category.defenseType === 'Pre-Oral' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {category.defenseType}
                    </span>
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{category.semester}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{category.schoolYear}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{programLevelLabels[category.programLevel]}</p>
                </div>
                <button
                  onClick={() => removeCategory(category.id)}
                  className="p-1 text-red-500 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Matrix Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Faculty Appearance Matrix</h2>
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Info className="w-4 h-4" />
            <span>Red cells indicate exceeded limit (&gt;5 appearances)</span>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="border border-gray-300 dark:border-gray-600 p-3 text-left font-medium text-gray-700 dark:text-gray-300">Faculty Name</th>
                {categories.map(category => (
                  <th key={category.id} className="border border-gray-300 dark:border-gray-600 p-2 text-center">
                    <div className="space-y-1">
                      <div className={`px-2 py-1 rounded text-xs font-medium ${
                        category.defenseType === 'Pre-Oral' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {category.defenseType}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">{category.semester}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">{category.schoolYear}</div>
                      <div className="text-xs font-medium text-gray-700 dark:text-gray-300">{programLevelLabels[category.programLevel]}</div>
                      <div className="grid grid-cols-3 gap-1 text-xs">
                        <div className="text-center font-medium">Adv</div>
                        <div className="text-center font-medium">Chr</div>
                        <div className="text-center font-medium">Mem</div>
                      </div>
                    </div>
                  </th>
                ))}
                <th className="border border-gray-300 dark:border-gray-600 p-3 text-center font-medium text-gray-700 dark:text-gray-300">Total<br/>Appearances</th>
                <th className="border border-gray-300 dark:border-gray-600 p-3 text-center font-medium text-gray-700 dark:text-gray-300">Total<br/>Compensation</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, index) => (
                <tr key={index} className={row.hasExceededLimit ? 'bg-red-50' : 'hover:bg-gray-50 dark:hover:bg-gray-700 dark:bg-gray-700'}>
                  <td className="border border-gray-300 dark:border-gray-600 p-3 font-medium text-gray-800 dark:text-gray-200">
                    <div className="flex items-center space-x-2">
                      <span>{row.facultyName}</span>
                      {row.hasExceededLimit && (
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                  </td>
                  {categories.map(category => (
                    <td key={category.id} className="border border-gray-300 dark:border-gray-600 p-1">
                      <div className="grid grid-cols-3 gap-1">
                        {(['Advisor', 'Panel Chairman', 'Panel Member'] as MatrixPanelRole[]).map(role => {
                          const count = getAppearanceCount(row.facultyName, category.id, role);
                          const exceeded = isExceeded(row.facultyName, category.id, role);
                          return (
                            <input
                              key={role}
                              type="number"
                              min="0"
                              max="10"
                              value={count || ''}
                              onChange={(e) => updateAppearanceCount(
                                row.facultyName, 
                                category.id, 
                                role, 
                                parseInt(e.target.value) || 0
                              )}
                              className={`w-full text-center text-xs p-1 border rounded ${
                                exceeded 
                                  ? 'bg-red-100 border-red-300 text-red-800' 
                                  : 'border-gray-300 dark:border-gray-600'
                              }`}
                              placeholder="0"
                            />
                          );
                        })}
                      </div>
                    </td>
                  ))}
                  <td className="border border-gray-300 dark:border-gray-600 p-3 text-center font-semibold">
                    {row.totalAppearances}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-600 p-3 text-center font-semibold">
                    ₱{row.totalCompensation.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Legend & Rules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Role Abbreviations</h3>
            <div className="space-y-1 text-sm">
              <div><strong>Adv:</strong> Advisor (₱350 per appearance)</div>
              <div><strong>Chr:</strong> Panel Chairman (₱450 per appearance)</div>
              <div><strong>Mem:</strong> Panel Member (₱400 per appearance)</div>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Limit Rules</h3>
            <div className="space-y-1 text-sm">
              <div>• Maximum 5 appearances per role per category</div>
              <div>• Categories reset by: School Year, Semester, Defense Type, Program Level</div>
              <div>• <span className="bg-red-100 text-red-800 px-1 rounded">Red cells</span> indicate exceeded limits</div>
              <div>• Exceeded assignments require VPAA approval</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatrixTable;