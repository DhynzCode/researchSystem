import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  AlertTriangle, 
  User, 
  Award, 
  TrendingUp,
  Eye,
  Download
} from 'lucide-react';
import { Faculty, Department, PanelRole } from '../types';

const FacultyTracker: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState<Department | 'All'>('All');
  const [filterProgram, setFilterProgram] = useState('All');
  const [showFlaggedOnly, setShowFlaggedOnly] = useState(false);

  const mockFaculty: Faculty[] = [
    {
      id: '1',
      name: 'Dr. Maria Santos',
      department: 'SEICT',
      totalAppearances: 8,
      currentSemesterAppearances: 6,
      rolesPlayed: ['Chairperson', 'Panel Member', 'Validator'],
      isFlagged: true
    },
    {
      id: '2',
      name: 'Prof. Juan dela Cruz',
      department: 'SAM',
      totalAppearances: 6,
      currentSemesterAppearances: 4,
      rolesPlayed: ['Adviser', 'Panel Member'],
      isFlagged: true
    },
    {
      id: '3',
      name: 'Dr. Ana Reyes',
      department: 'SLAS',
      totalAppearances: 5,
      currentSemesterAppearances: 3,
      rolesPlayed: ['Statistician', 'Panel Member'],
      isFlagged: false
    },
    {
      id: '4',
      name: 'Prof. Carlos Mendez',
      department: 'SOE',
      totalAppearances: 4,
      currentSemesterAppearances: 2,
      rolesPlayed: ['Adviser', 'Language Editor'],
      isFlagged: false
    },
    {
      id: '5',
      name: 'Dr. Elena Rodriguez',
      department: 'SBM',
      totalAppearances: 7,
      currentSemesterAppearances: 5,
      rolesPlayed: ['Chairperson', 'Panel Member', 'Secretary'],
      isFlagged: true
    },
    {
      id: '6',
      name: 'Prof. Michael Torres',
      department: 'SCJ',
      totalAppearances: 3,
      currentSemesterAppearances: 2,
      rolesPlayed: ['Panel Member', 'Validator'],
      isFlagged: false
    },
    {
      id: '7',
      name: 'Dr. Carmen Villanueva',
      department: 'SEICT',
      totalAppearances: 9,
      currentSemesterAppearances: 7,
      rolesPlayed: ['Chairperson', 'Statistician', 'Panel Member'],
      isFlagged: true
    },
    {
      id: '8',
      name: 'Prof. Robert Garcia',
      department: 'SAM',
      totalAppearances: 2,
      currentSemesterAppearances: 1,
      rolesPlayed: ['Panel Member'],
      isFlagged: false
    }
  ];

  const filteredFaculty = mockFaculty.filter(faculty => {
    const matchesSearch = faculty.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'All' || faculty.department === filterDepartment;
    const matchesFlagged = !showFlaggedOnly || faculty.isFlagged;
    
    return matchesSearch && matchesDepartment && matchesFlagged;
  });

  const totalFaculty = mockFaculty.length;
  const flaggedFaculty = mockFaculty.filter(f => f.isFlagged).length;
  const averageAppearances = mockFaculty.reduce((sum, f) => sum + f.currentSemesterAppearances, 0) / totalFaculty;

  const roleIcons = {
    'Adviser': User,
    'Chairperson': Award,
    'Statistician': TrendingUp,
    'Panel Member': User,
    'Validator': Eye,
    'Secretary': User,
    'Language Editor': User
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Faculty Appearance Tracker</h1>
        <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
          <Download className="w-4 h-4" />
          <span>Export Report</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Faculty</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">{totalFaculty}</p>
            </div>
            <User className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Flagged Faculty</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">{flaggedFaculty}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
          <div className="mt-4">
            <span className="text-sm text-red-600">Exceeded 5 appearances</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Average Appearances</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">{averageAppearances.toFixed(1)}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">Current semester</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Compliance Rate</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">{((totalFaculty - flaggedFaculty) / totalFaculty * 100).toFixed(1)}%</p>
            </div>
            <Award className="w-8 h-8 text-purple-500" />
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">Within limit</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-4 mb-4">
          <Filter className="w-5 h-5 text-gray-500" />
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Filters</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 dark:text-gray-500 absolute left-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
              placeholder="Search faculty..."
            />
          </div>

          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value as Department | 'All')}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 dark:text-gray-200"
          >
            <option value="All">All Departments</option>
            <option value="SAM">SAM</option>
            <option value="SEICT">SEICT</option>
            <option value="SLAS">SLAS</option>
            <option value="SOE">SOE</option>
            <option value="SBM">SBM</option>
            <option value="SCJ">SCJ</option>
          </select>

          <select
            value={filterProgram}
            onChange={(e) => setFilterProgram(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 dark:text-gray-200"
          >
            <option value="All">All Programs</option>
            <option value="Undergraduate">Undergraduate</option>
            <option value="Masters">Masters</option>
            <option value="Doctorate">Doctorate</option>
          </select>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showFlaggedOnly}
              onChange={(e) => setShowFlaggedOnly(e.target.checked)}
              className="w-4 h-4 text-green-600 border-gray-300 dark:border-gray-600 rounded focus:ring-green-500"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Show flagged only</span>
          </label>
        </div>
      </div>

      {/* Faculty Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Faculty List ({filteredFaculty.length})</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Faculty Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Department</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Total Appearances</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Current Semester</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Roles Played</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredFaculty.map((faculty) => (
                <tr key={faculty.id} className="border-b border-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 dark:bg-gray-700">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 dark:text-gray-200">{faculty.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">ID: {faculty.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                      {faculty.department}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">{faculty.totalAppearances}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-lg font-semibold ${
                      faculty.currentSemesterAppearances > 5 ? 'text-red-600' : 'text-gray-800 dark:text-gray-200'
                    }`}>
                      {faculty.currentSemesterAppearances}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {faculty.rolesPlayed.map((role, index) => {
                        const IconComponent = roleIcons[role];
                        return (
                          <div key={index} className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded-full">
                            <IconComponent className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                            <span className="text-xs text-gray-700 dark:text-gray-300">{role}</span>
                          </div>
                        );
                      })}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {faculty.isFlagged ? (
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                          Flagged
                        </span>
                      </div>
                    ) : (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                        OK
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FacultyTracker;