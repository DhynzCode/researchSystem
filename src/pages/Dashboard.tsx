import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Users, 
  AlertTriangle, 
  Banknote, 
  Award,
  Clock,
  BarChart3,
  Building2,
  TrendingUp
} from 'lucide-react';
import BudgetChart from '../components/BudgetChart';
import { useAuth } from '../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [animationClass, setAnimationClass] = useState('opacity-0 translate-y-4');
  const [cardAnimations, setCardAnimations] = useState<boolean[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationClass('opacity-100 translate-y-0');
    }, 100);

    // Animate cards with staggered delay
    const cardTimers = [0, 1, 2, 3].map((index) => 
      setTimeout(() => {
        setCardAnimations(prev => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      }, 200 + (index * 100))
    );

    return () => {
      clearTimeout(timer);
      cardTimers.forEach(clearTimeout);
    };
  }, []);

  const stats = {
    totalRequests: 45,
    preOralRequests: 28,
    finalRequests: 17,
    flaggedRequests: 8,
    approvedRequests: 37,
    totalBudget: 125000
  };

  const topFaculty = [
    { name: 'Dr. Maria Santos', department: 'SEICT', appearances: 8, isFlagged: true },
    { name: 'Prof. Juan dela Cruz', department: 'SAM', appearances: 6, isFlagged: true },
    { name: 'Dr. Ana Reyes', department: 'SLAS', appearances: 5, isFlagged: false },
    { name: 'Prof. Carlos Mendez', department: 'SOE', appearances: 4, isFlagged: false },
    { name: 'Dr. Elena Rodriguez', department: 'SBM', appearances: 4, isFlagged: false }
  ];

  const budgetByProgram = [
    { program: 'Undergraduate', budget: 45000, requests: 20 },
    { program: 'Masters', budget: 52000, requests: 15 },
    { program: 'Doctorate', budget: 28000, requests: 10 }
  ];

  const recentRequests = [
    { id: 'REQ-2024-001', title: 'Mobile App Development Research', status: 'Pending', department: 'SEICT', date: '2024-01-15' },
    { id: 'REQ-2024-002', title: 'Nursing Care Study', status: 'Flagged', department: 'SAM', date: '2024-01-14' },
    { id: 'REQ-2024-003', title: 'Environmental Impact Assessment', status: 'Approved', department: 'SOE', date: '2024-01-13' },
    { id: 'REQ-2024-004', title: 'Marketing Strategy Analysis', status: 'Pending', department: 'SBM', date: '2024-01-12' }
  ];


  // Check if current user is CURI
  const isCURI = user?.role === 'research_director';

  return (
    <div className="space-y-6">
      <div className={`flex items-center justify-between transition-all duration-700 ease-out ${animationClass}`}>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-blue-500 transform transition-all duration-500 ease-out hover:shadow-lg hover:-translate-y-1 hover:scale-105 ${
          cardAnimations[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 transition-colors duration-300">Total Panel Requests</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-gray-200 transition-all duration-300 hover:text-blue-600">{stats.totalRequests}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-500 transition-transform duration-300 hover:scale-110 hover:rotate-12" />
          </div>
          <div className="mt-4 flex items-center space-x-4 text-sm transition-opacity duration-300 hover:opacity-80">
            <span className="text-green-600">Pre-Oral: {stats.preOralRequests}</span>
            <span className="text-orange-600">Final: {stats.finalRequests}</span>
          </div>
        </div>

        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-green-500 transform transition-all duration-500 ease-out hover:shadow-lg hover:-translate-y-1 hover:scale-105 ${
          cardAnimations[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 transition-colors duration-300">Approved Requests</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-gray-200 transition-all duration-300 hover:text-green-600">{stats.approvedRequests}</p>
            </div>
            <Users className="w-8 h-8 text-green-500 transition-transform duration-300 hover:scale-110 hover:rotate-12" />
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-600 dark:text-gray-400 transition-opacity duration-300 hover:opacity-80">
              {((stats.approvedRequests / stats.totalRequests) * 100).toFixed(1)}% approval rate
            </span>
          </div>
        </div>

        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-red-500 transform transition-all duration-500 ease-out hover:shadow-lg hover:-translate-y-1 hover:scale-105 ${
          cardAnimations[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 transition-colors duration-300">Flagged Requests</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-gray-200 transition-all duration-300 hover:text-red-600">{stats.flaggedRequests}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-500 transition-transform duration-300 hover:scale-110 hover:animate-pulse" />
          </div>
          <div className="mt-4">
            <span className="text-sm text-red-600 transition-all duration-300 hover:text-red-700">Needs VPAA Approval</span>
          </div>
        </div>

        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-purple-500 transform transition-all duration-500 ease-out hover:shadow-lg hover:-translate-y-1 hover:scale-105 ${
          cardAnimations[3] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 transition-colors duration-300">Total Consolidated</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-gray-200 transition-all duration-300 hover:text-purple-600">₱{stats.totalBudget.toLocaleString()}</p>
            </div>
            <Banknote className="w-8 h-8 text-purple-500 transition-transform duration-300 hover:scale-110 hover:rotate-12" />
          </div>
          <div className="mt-4">
            <span className="text-sm text-gray-600 dark:text-gray-400 transition-opacity duration-300 hover:opacity-80">Current semester</span>
          </div>
        </div>
      </div>

      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 transition-all duration-700 ease-out delay-300 ${
        animationClass
      }`}>
        {/* Top Faculty by Appearances */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transform transition-all duration-500 hover:shadow-lg hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 transition-colors duration-300">Top Faculty Appearances</h2>
            <Award className="w-6 h-6 text-gray-400 dark:text-gray-500 transition-transform duration-300 hover:scale-110 hover:text-yellow-500" />
          </div>
          <div className="space-y-3">
            {topFaculty.map((faculty, index) => (
              <div key={faculty.name} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg transform transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-600 hover:scale-102 hover:shadow-md animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-green-200 hover:scale-110">
                    <span className="text-sm font-bold text-green-600">{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-200 transition-colors duration-300 hover:text-blue-600">{faculty.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">{faculty.department}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-gray-800 dark:text-gray-200 transition-all duration-300 hover:text-green-600">{faculty.appearances}</span>
                  {faculty.isFlagged && (
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium transition-all duration-300 hover:bg-red-200 animate-pulse">
                      Flagged
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Budget Summary by Program - Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transform transition-all duration-500 hover:shadow-lg hover:-translate-y-1">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 transition-colors duration-300">Consolidated Summary by Program Level</h2>
            <BarChart3 className="w-6 h-6 text-gray-400 dark:text-gray-500 transition-transform duration-300 hover:scale-110 hover:text-blue-500" />
          </div>
          <BudgetChart 
            data={budgetByProgram} 
            totalBudget={stats.totalBudget}
            chartType="doughnut"
          />
        </div>
      </div>

      {/* Department Breakdown */}
      <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transform transition-all duration-700 ease-out delay-400 hover:shadow-lg hover:-translate-y-1 ${
        animationClass
      }`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 transition-colors duration-300">Department Breakdown</h2>
          <Building2 className="w-6 h-6 text-gray-400 dark:text-gray-500 transition-transform duration-300 hover:scale-110 hover:text-indigo-500" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            {
              department: 'SEICT',
              fullName: 'School of Engineering, Information and Communication Technology',
              requests: 15,
              totalBudget: 487500,
              facultyCount: 8,
              color: 'blue',
              trend: '+12%'
            },
            {
              department: 'SAM',
              fullName: 'School of Allied Medicine',
              requests: 8,
              totalBudget: 312000,
              facultyCount: 6,
              color: 'green',
              trend: '+8%'
            },
            {
              department: 'SLAS',
              fullName: 'School of Liberal Arts and Sciences',
              requests: 12,
              totalBudget: 398750,
              facultyCount: 7,
              color: 'purple',
              trend: '+15%'
            },
            {
              department: 'SBM',
              fullName: 'School of Business and Management',
              requests: 10,
              totalBudget: 356250,
              facultyCount: 5,
              color: 'orange',
              trend: '+5%'
            },
            {
              department: 'SOE',
              fullName: 'School of Education',
              requests: 6,
              totalBudget: 243750,
              facultyCount: 4,
              color: 'pink',
              trend: '+3%'
            }
          ].map((dept, index) => (
            <div 
              key={dept.department} 
              className={`p-4 rounded-lg border-l-4 transition-all duration-300 hover:shadow-md hover:scale-105 animate-fade-in-up bg-${dept.color}-50 dark:bg-${dept.color}-900/20 border-${dept.color}-500`}
              style={{ animationDelay: `${index * 100 + 600}ms` }}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className={`font-bold text-lg text-${dept.color}-700 dark:text-${dept.color}-300`}>
                  {dept.department}
                </h3>
                <div className={`flex items-center space-x-1 text-xs font-medium text-${dept.color}-600 dark:text-${dept.color}-400`}>
                  <TrendingUp className="w-3 h-3" />
                  <span>{dept.trend}</span>
                </div>
              </div>
              
              <div className={`space-y-2 text-sm text-${dept.color}-700 dark:text-${dept.color}-300`}>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Requests:</span>
                  <span className="font-bold">{dept.requests}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Budget:</span>
                  <span className="font-bold">₱{dept.totalBudget.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Faculty:</span>
                  <span className="font-bold">{dept.facultyCount}</span>
                </div>
              </div>
              
              <div className={`mt-3 pt-2 border-t border-${dept.color}-200 dark:border-${dept.color}-700`}>
                <p className={`text-xs text-${dept.color}-600 dark:text-${dept.color}-400 truncate`} title={dept.fullName}>
                  {dept.fullName}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-600">
              <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">51</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Requests</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-600">
              <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">₱1,798,250</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Department Budget</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-600">
              <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">30</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Active Faculty</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Requests - Hidden for CURI */}
      {!isCURI && (
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transform transition-all duration-700 ease-out delay-500 hover:shadow-lg hover:-translate-y-1 ${
          animationClass
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 transition-colors duration-300">Recent Panel Requests</h2>
            <Clock className="w-6 h-6 text-gray-400 dark:text-gray-500 transition-transform duration-300 hover:scale-110 hover:text-blue-500" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400 transition-colors duration-300 hover:text-gray-800 dark:hover:text-gray-200">Request ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400 transition-colors duration-300 hover:text-gray-800 dark:hover:text-gray-200">Research Title</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400 transition-colors duration-300 hover:text-gray-800 dark:hover:text-gray-200">Department</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400 transition-colors duration-300 hover:text-gray-800 dark:hover:text-gray-200">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400 transition-colors duration-300 hover:text-gray-800 dark:hover:text-gray-200">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentRequests.map((request, index) => (
                  <tr key={request.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-101 animate-fade-in-up" style={{ animationDelay: `${index * 100 + 1000}ms` }}>
                    <td className="py-3 px-4 font-medium text-gray-800 dark:text-gray-200 transition-colors duration-300 hover:text-blue-600">{request.id}</td>
                    <td className="py-3 px-4 text-gray-800 dark:text-gray-200 transition-colors duration-300">{request.title}</td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400 transition-colors duration-300">{request.department}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium transition-all duration-300 hover:scale-110 ${
                        request.status === 'Approved' ? 'bg-green-100 text-green-800 hover:bg-green-200' :
                        request.status === 'Flagged' ? 'bg-red-100 text-red-800 hover:bg-red-200 animate-pulse' :
                        'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                      }`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400 transition-colors duration-300">{new Date(request.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default Dashboard;