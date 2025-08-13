import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Users, 
  AlertTriangle, 
  DollarSign, 
  TrendingUp, 
  Calendar,
  Award,
  Clock,
  BarChart3
} from 'lucide-react';
import BudgetChart from '../components/BudgetChart';
import CalendarComponent from '../components/Calendar';

const Dashboard: React.FC = () => {
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

  const calendarEvents = [
    {
      id: '1',
      title: 'Pre-Oral Defense - Mobile App Research',
      date: new Date('2025-08-15'),
      type: 'defense' as const,
      description: 'John Doe - SEICT Department'
    },
    {
      id: '2',
      title: 'Final Defense - Nursing Care Study',
      date: new Date('2025-08-18'),
      type: 'defense' as const,
      description: 'Jane Smith - SAM Department'
    },
    {
      id: '3',
      title: 'Research Committee Meeting',
      date: new Date('2025-08-20'),
      type: 'meeting' as const,
      description: 'Monthly research committee meeting'
    },
    {
      id: '4',
      title: 'Thesis Submission Deadline',
      date: new Date('2025-08-25'),
      type: 'deadline' as const,
      description: 'Final deadline for thesis submissions'
    },
    {
      id: '5',
      title: 'Faculty Research Presentation',
      date: new Date('2025-08-28'),
      type: 'other' as const,
      description: 'Dr. Maria Santos presenting research findings'
    }
  ];

  const handleDateSelect = (date: Date) => {
    console.log('Selected date:', date);
  };

  const handleEventClick = (event: any) => {
    console.log('Event clicked:', event);
  };

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
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 transition-colors duration-300">Total Budget</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-gray-200 transition-all duration-300 hover:text-purple-600">₱{stats.totalBudget.toLocaleString()}</p>
            </div>
            <DollarSign className="w-8 h-8 text-purple-500 transition-transform duration-300 hover:scale-110 hover:rotate-12" />
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
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 transition-colors duration-300">Top Faculty by Panel Appearances</h2>
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
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 transition-colors duration-300">Budget Summary by Program Level</h2>
            <BarChart3 className="w-6 h-6 text-gray-400 dark:text-gray-500 transition-transform duration-300 hover:scale-110 hover:text-blue-500" />
          </div>
          <BudgetChart 
            data={budgetByProgram} 
            totalBudget={stats.totalBudget}
            chartType="doughnut"
          />
        </div>
      </div>

      {/* Calendar Section */}
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 transition-all duration-700 ease-out delay-500 ${
        animationClass
      }`}>
        <CalendarComponent 
          events={calendarEvents}
          onDateSelect={handleDateSelect}
          onEventClick={handleEventClick}
        />
        
        {/* Upcoming Events */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transform transition-all duration-500 hover:shadow-lg hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 transition-colors duration-300">Upcoming Events</h2>
            <Calendar className="w-6 h-6 text-gray-400 dark:text-gray-500 transition-transform duration-300 hover:scale-110 hover:text-blue-500" />
          </div>
          <div className="space-y-3">
            {calendarEvents
              .filter(event => event.date >= new Date())
              .sort((a, b) => a.date.getTime() - b.date.getTime())
              .slice(0, 5)
              .map((event, index) => (
                <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg transform transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-600 hover:scale-102 hover:shadow-md animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      event.type === 'defense' ? 'bg-red-500' :
                      event.type === 'meeting' ? 'bg-blue-500' :
                      event.type === 'deadline' ? 'bg-orange-500' :
                      'bg-gray-500'
                    }`} />
                    <div>
                      <p className="font-medium text-gray-800 dark:text-gray-200 transition-colors duration-300">{event.title}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">{event.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{event.date.toLocaleDateString()}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      event.type === 'defense' ? 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100' :
                      event.type === 'meeting' ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100' :
                      event.type === 'deadline' ? 'bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-100' :
                      'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-100'
                    }`}>
                      {event.type}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Recent Requests */}
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
      
    </div>
  );
};

export default Dashboard;