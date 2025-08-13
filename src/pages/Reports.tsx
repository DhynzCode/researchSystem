import React, { useState } from 'react';
import { 
  Download, 
  FileBarChart, 
  Calendar, 
  Filter, 
  TrendingUp, 
  Users, 
  DollarSign,
  AlertTriangle,
  PieChart,
  BarChart3
} from 'lucide-react';

const Reports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('current-semester');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedReportType, setSelectedReportType] = useState('summary');

  const reportTypes = [
    { id: 'summary', name: 'Summary Report', description: 'Overview of all panel activities' },
    { id: 'faculty', name: 'Faculty Report', description: 'Faculty appearance and honorarium details' },
    { id: 'budget', name: 'Budget Report', description: 'Financial breakdown and expenditure' },
    { id: 'compliance', name: 'Compliance Report', description: 'Flagged requests and violations' }
  ];

  const summaryData = {
    totalRequests: 45,
    approvedRequests: 37,
    flaggedRequests: 8,
    totalBudget: 125000,
    totalFaculty: 24,
    flaggedFaculty: 4,
    departments: {
      'SEICT': { requests: 12, budget: 32000 },
      'SAM': { requests: 10, budget: 28000 },
      'SLAS': { requests: 8, budget: 22000 },
      'SOE': { requests: 7, budget: 18000 },
      'SBM': { requests: 6, budget: 15000 },
      'SCJ': { requests: 2, budget: 10000 }
    }
  };

  const facultyData = [
    { name: 'Dr. Maria Santos', department: 'SEICT', appearances: 8, honorarium: 3200, flagged: true },
    { name: 'Prof. Juan dela Cruz', department: 'SAM', appearances: 6, honorarium: 2400, flagged: true },
    { name: 'Dr. Ana Reyes', department: 'SLAS', appearances: 5, honorarium: 2000, flagged: false },
    { name: 'Prof. Carlos Mendez', department: 'SOE', appearances: 4, honorarium: 1600, flagged: false },
    { name: 'Dr. Elena Rodriguez', department: 'SBM', appearances: 7, honorarium: 2800, flagged: true }
  ];

  const generateReport = () => {
    console.log('Generating report:', { selectedPeriod, selectedDepartment, selectedReportType });
    // This would typically trigger a download or open a new window with the report
  };

  const exportData = (format: 'pdf' | 'excel' | 'csv') => {
    console.log('Exporting data in format:', format);
    // This would typically trigger a download
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Reports & Logs</h1>
        <div className="flex space-x-3">
          <button
            onClick={() => exportData('pdf')}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            <Download className="w-4 h-4" />
            <span>PDF</span>
          </button>
          <button
            onClick={() => exportData('excel')}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <Download className="w-4 h-4" />
            <span>Excel</span>
          </button>
          <button
            onClick={() => exportData('csv')}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Download className="w-4 h-4" />
            <span>CSV</span>
          </button>
        </div>
      </div>

      {/* Report Configuration */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Filter className="w-5 h-5 text-gray-500" />
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Report Configuration</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Time Period</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 dark:text-gray-200"
            >
              <option value="current-semester">Current Semester</option>
              <option value="academic-year">Academic Year 2024-2025</option>
              <option value="last-semester">Last Semester</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Department</label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 dark:text-gray-200"
            >
              <option value="all">All Departments</option>
              <option value="SEICT">SEICT</option>
              <option value="SAM">SAM</option>
              <option value="SLAS">SLAS</option>
              <option value="SOE">SOE</option>
              <option value="SBM">SBM</option>
              <option value="SCJ">SCJ</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Report Type</label>
            <select
              value={selectedReportType}
              onChange={(e) => setSelectedReportType(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 dark:text-gray-200"
            >
              {reportTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          <button
            onClick={generateReport}
            className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <FileBarChart className="w-5 h-5" />
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Requests</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{summaryData.totalRequests}</p>
            </div>
            <BarChart3 className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Approved</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{summaryData.approvedRequests}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Flagged</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">{summaryData.flaggedRequests}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Budget</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">₱{summaryData.totalBudget.toLocaleString()}</p>
            </div>
            <DollarSign className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Breakdown */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-2 mb-4">
            <PieChart className="w-5 h-5 text-gray-500" />
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Department Breakdown</h2>
          </div>
          
          <div className="space-y-3">
            {Object.entries(summaryData.departments).map(([dept, data]) => (
              <div key={dept} className="border-l-4 border-green-500 pl-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-200">{dept}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{data.requests} requests</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800 dark:text-gray-200">₱{data.budget.toLocaleString()}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{((data.requests / summaryData.totalRequests) * 100).toFixed(1)}%</p>
                  </div>
                </div>
                <div className="mt-2 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${(data.requests / summaryData.totalRequests) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Faculty by Honorarium */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Users className="w-5 h-5 text-gray-500" />
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Top Faculty by Honorarium</h2>
          </div>
          
          <div className="space-y-3">
            {facultyData
              .sort((a, b) => b.honorarium - a.honorarium)
              .slice(0, 5)
              .map((faculty, index) => (
                <div key={faculty.name} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-green-600">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 dark:text-gray-200">{faculty.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{faculty.department} • {faculty.appearances} appearances</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800 dark:text-gray-200">₱{faculty.honorarium.toLocaleString()}</p>
                    {faculty.flagged && (
                      <div className="flex items-center space-x-1 mt-1">
                        <AlertTriangle className="w-3 h-3 text-red-500" />
                        <span className="text-xs text-red-600">Flagged</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Available Reports */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-2 mb-4">
          <FileBarChart className="w-5 h-5 text-gray-500" />
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Available Reports</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reportTypes.map(type => (
            <div key={type.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-green-500 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800 dark:text-gray-200">{type.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{type.description}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity Log */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Calendar className="w-5 h-5 text-gray-500" />
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Recent Activity Log</h2>
        </div>
        
        <div className="space-y-3">
          {[
            { action: 'Panel request approved', user: 'VPAA', timestamp: '2024-01-15 14:30', details: 'REQ-2024-001' },
            { action: 'Faculty flagged for excess appearances', user: 'System', timestamp: '2024-01-15 10:15', details: 'Dr. Maria Santos' },
            { action: 'Honorarium payment processed', user: 'Finance Officer', timestamp: '2024-01-14 16:45', details: '₱2,400 to Prof. Juan dela Cruz' },
            { action: 'New panel request submitted', user: 'Research Teacher', timestamp: '2024-01-14 09:20', details: 'REQ-2024-002' },
            { action: 'Justification letter uploaded', user: 'Research Teacher', timestamp: '2024-01-13 15:10', details: 'REQ-2024-003' }
          ].map((log, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex-1">
                <p className="font-medium text-gray-800 dark:text-gray-200">{log.action}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{log.details}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 dark:text-gray-400">{log.user}</p>
                <p className="text-xs text-gray-500">{log.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;