import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  ChevronDown,
  Calendar,
  Book,
  Users,
  CheckCircle,
  Circle,
  XCircle
} from 'lucide-react';
import { DefenseRequest, DefenseRequestStatus, DefenseType } from '../types';
import Breadcrumb from '../components/Breadcrumb';

const RequestDefense: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<DefenseRequestStatus | 'All'>('All');
  const [defenseTypeFilter, setDefenseTypeFilter] = useState<DefenseType | 'All'>('All');
  const [semesterFilter, setSemesterFilter] = useState<string | 'All'>('All');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  const [animationClass, setAnimationClass] = useState('opacity-0 translate-y-4');
  const [sectionAnimations, setSectionAnimations] = useState<boolean[]>([]);

  useEffect(() => {
    // Main page animation
    const timer = setTimeout(() => {
      setAnimationClass('opacity-100 translate-y-0');
    }, 100);

    // Staggered section animations
    const sectionTimers = [0, 1, 2, 3].map((index) => 
      setTimeout(() => {
        setSectionAnimations(prev => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      }, 300 + (index * 200))
    );

    return () => {
      clearTimeout(timer);
      sectionTimers.forEach(clearTimeout);
    };
  }, []);

  // Determine breadcrumb based on current route
  const getBreadcrumbItems = () => {
    if (location.pathname === '/defense-records') {
      return [
        { label: 'Request Defense' },
        { label: 'View Requests' }
      ];
    }
    return [
      { label: 'Request Defense' }
    ];
  };

  // Progress/Status Steps
  const getProgressSteps = () => {
    return [
      { 
        key: 'dean', 
        label: 'Dean', 
        status: 'Dean Approved',
        description: 'Dean approval'
      },
      { 
        key: 'research', 
        label: 'Research Center', 
        status: 'Research Center Approved',
        description: 'Research center review'
      },
      { 
        key: 'vpaa', 
        label: 'VPAA', 
        status: 'VPAA Approved',
        description: 'VPAA approval'
      },
      { 
        key: 'budget', 
        label: 'Budget', 
        status: 'Budget Approved',
        description: 'Budget finalization'
      }
    ];
  };

  const getStepStatus = (stepStatus: DefenseRequestStatus, currentStatus: DefenseRequestStatus) => {
    const statusOrder: DefenseRequestStatus[] = [
      'Dean Approved',
      'Research Center Approved', 
      'VPAA Approved',
      'Budget Approved'
    ];
    
    const currentIndex = statusOrder.indexOf(currentStatus);
    const stepIndex = statusOrder.indexOf(stepStatus);
    
    // Handle special cases
    if (currentStatus === 'Rejected' || currentStatus === 'Returned for Corrections') {
      return stepIndex <= currentIndex ? 'error' : 'pending';
    }
    
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'active';
    return 'pending';
  };

  const ProgressStepper = ({ status }: { status: DefenseRequestStatus }) => {
    const steps = getProgressSteps();
    
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 transform transition-all duration-500 hover:shadow-xl">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 animate-fade-in-up">Request Progress</h3>
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const stepStatus = getStepStatus(step.status, status);
            const isLast = index === steps.length - 1;
            
            return (
              <div 
                key={step.key} 
                className="flex items-center flex-1 animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 hover:scale-110 ${
                    stepStatus === 'completed' 
                      ? (step.status === 'Budget Approved' ? 'bg-green-500 border-green-500 text-white shadow-lg' : 'bg-green-500 border-green-500 text-white shadow-lg')
                      : stepStatus === 'active'
                      ? (step.status === 'Budget Approved' ? 'bg-green-500 border-green-500 text-white shadow-lg animate-pulse' : 'bg-blue-500 border-blue-500 text-white shadow-lg animate-pulse')
                      : stepStatus === 'error'
                      ? 'bg-red-500 border-red-500 text-white shadow-lg'
                      : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500'
                  }`}>
                    {stepStatus === 'completed' ? (
                      <CheckCircle className="w-5 h-5 transition-transform duration-300 hover:rotate-12" />
                    ) : stepStatus === 'error' ? (
                      <XCircle className="w-5 h-5 transition-transform duration-300 hover:rotate-12" />
                    ) : (
                      <Circle className="w-5 h-5 transition-transform duration-300 hover:rotate-12" />
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <p className={`text-xs font-medium ${
                      stepStatus === 'active' 
                        ? (step.status === 'Budget Approved' ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400')
                        : stepStatus === 'completed'
                        ? 'text-green-600 dark:text-green-400'
                        : stepStatus === 'error'
                        ? 'text-red-600 dark:text-red-400'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {step.label}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 max-w-20 truncate">
                      {step.description}
                    </p>
                  </div>
                </div>
                {!isLast && (
                  <div className={`flex-1 h-0.5 mx-4 ${
                    stepStatus === 'completed' || (index < steps.findIndex(s => getStepStatus(s.status, status) === 'active'))
                      ? 'bg-green-500'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
        
        {/* Status Message */}
        <div className="mt-4 text-center">
          {status === 'Rejected' && (
            <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg">
              ❌ Request has been rejected
            </p>
          )}
          {status === 'Returned for Corrections' && (
            <p className="text-sm text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 px-3 py-2 rounded-lg">
              ⚠️ Request returned for corrections
            </p>
          )}
          {status === 'Budget Approved' && (
            <p className="text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-3 py-2 rounded-lg">
              ✅ Request fully approved and processed
            </p>
          )}
          {status === 'Draft' && (
            <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20 px-3 py-2 rounded-lg">
              📝 Request in draft status - not yet in approval process
            </p>
          )}
        </div>
      </div>
    );
  };

  const mockRequests: DefenseRequest[] = [
    {
      id: 'REQ-2024-001',
      program: 'Bachelor of Science in Information Technology (BSIT)',
      defenseType: 'Final',
      schoolYear: '2024-2025',
      semester: 'First Semester',
      status: 'Research Center Approved',
      isFlagged: false,
      createdAt: '2024-01-15T09:00:00Z',
      updatedAt: '2024-01-15T09:00:00Z',
      requesterId: 'rt001',
      requesterName: 'Dr. Roberto Martinez'
    },
    {
      id: '1',
      program: 'Bachelor of Science in Information Technology (BSIT)',
      defenseType: 'Pre-Oral',
      schoolYear: '2024-2025',
      semester: 'First Semester',
      status: 'Draft',
      isFlagged: false,
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-15T10:30:00Z',
      requesterId: 'rt001',
      requesterName: 'Dr. Maria Santos'
    },
    {
      id: '2',
      program: 'Bachelor of Science in Computer Science (BSCS)',
      defenseType: 'Final',
      schoolYear: '2024-2025',
      semester: 'First Semester',
      status: 'Research Center Approved',
      isFlagged: true,
      createdAt: '2024-01-10T09:15:00Z',
      updatedAt: '2024-01-20T14:45:00Z',
      requesterId: 'rt001',
      requesterName: 'Dr. Maria Santos'
    },
    {
      id: '3',
      program: 'Bachelor of Science in Electronics Engineering (BSECE)',
      defenseType: 'Pre-Oral',
      schoolYear: '2024-2025',
      semester: 'Second Semester',
      status: 'VPAA Approved',
      isFlagged: false,
      createdAt: '2024-01-05T11:20:00Z',
      updatedAt: '2024-01-25T16:30:00Z',
      requesterId: 'rt001',
      requesterName: 'Dr. Maria Santos'
    },
    {
      id: '4',
      program: 'Bachelor of Science in Computer Engineering (BSCpE)',
      defenseType: 'Final',
      schoolYear: '2023-2024',
      semester: 'Second Semester',
      status: 'Budget Approved',
      isFlagged: false,
      createdAt: '2023-12-20T08:45:00Z',
      updatedAt: '2024-02-01T12:15:00Z',
      requesterId: 'rt001',
      requesterName: 'Dr. Maria Santos'
    },
    {
      id: '5',
      program: 'Bachelor of Science in Information Technology (BSIT)',
      defenseType: 'Pre-Oral',
      schoolYear: '2024-2025',
      semester: 'First Semester',
      status: 'Returned for Corrections',
      isFlagged: true,
      createdAt: '2024-01-08T13:10:00Z',
      updatedAt: '2024-01-30T10:20:00Z',
      requesterId: 'rt001',
      requesterName: 'Dr. Maria Santos'
    }
  ];

  const getStatusBadge = (status: DefenseRequestStatus) => {
    const statusConfig = {
      'Draft': { bg: 'bg-gray-100', text: 'text-gray-800 dark:text-gray-200', label: 'Draft' },
      'Research Center Approved': { bg: 'bg-blue-100', text: 'text-blue-800', label: 'RC Approved' },
      'VPAA Approved': { bg: 'bg-indigo-100', text: 'text-indigo-800', label: 'VPAA Approved' },
      'Dean Approved': { bg: 'bg-purple-100', text: 'text-purple-800', label: 'Dean Approved' },
      'Budget Approved': { bg: 'bg-green-100', text: 'text-green-800', label: 'Budget Approved' },
      'Returned for Corrections': { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Returned' },
      'Rejected': { bg: 'bg-red-100', text: 'text-red-800', label: 'Rejected' }
    };

    const config = statusConfig[status];
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const canEdit = (status: DefenseRequestStatus) => {
    return status === 'Draft' || status === 'Returned for Corrections';
  };

  const filteredRequests = useMemo(() => {
    return mockRequests.filter(request => {
      const matchesSearch = request.program.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           request.defenseType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           request.schoolYear.includes(searchTerm) ||
                           request.semester.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'All' || request.status === statusFilter;
      const matchesDefenseType = defenseTypeFilter === 'All' || request.defenseType === defenseTypeFilter;
      const matchesSemester = semesterFilter === 'All' || request.semester === semesterFilter;
      
      return matchesSearch && matchesStatus && matchesDefenseType && matchesSemester;
    });
  }, [searchTerm, statusFilter, defenseTypeFilter, semesterFilter, mockRequests]);

  const sortedRequests = useMemo(() => {
    return [...filteredRequests].sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  }, [filteredRequests]);

  const handleView = (id: string) => {
    // Use the current path structure to determine the correct navigation
    if (location.pathname === '/defense-records') {
      navigate(`/defense-records/${id}`);
    } else {
      navigate(`/request-defense/${id}`);
    }
  };

  const handleEdit = (id: string) => {
    // Use the current path structure to determine the correct navigation
    if (location.pathname === '/defense-records') {
      navigate(`/defense-records/${id}/edit`);
    } else {
      navigate(`/request-defense/${id}/edit`);
    }
  };

  const handleDelete = (id: string) => {
    // Show confirmation dialog and delete
    console.log('Delete request:', id);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 px-4 sm:px-0">
      <div className={`transition-all duration-500 ease-out ${animationClass}`}>
        <Breadcrumb items={getBreadcrumbItems()} />
      </div>
      <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-all duration-700 ease-out delay-200 ${animationClass}`}>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-200 animate-fade-in-up">
          {location.pathname === '/defense-records' ? 'View Requests' : 'Request Defense'}
        </h1>
        <div className="text-sm text-gray-600 dark:text-gray-400 animate-fade-in-right" style={{ animationDelay: '300ms' }}>
          Showing {sortedRequests.length} of {mockRequests.length} requests
        </div>
      </div>

      {/* Progress Stepper - Show for selected request */}
      {selectedRequestId && (() => {
        const selectedRequest = mockRequests.find(r => r.id === selectedRequestId);
        return selectedRequest ? (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Progress for: {selectedRequest.program}
              </h2>
              <button
                onClick={() => setSelectedRequestId(null)}
                className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-lg transition-colors"
              >
                ✕ Close
              </button>
            </div>
            <ProgressStepper status={selectedRequest.status} />
          </div>
        ) : null;
      })()}

      {/* Search and Filters */}
      <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transform transition-all duration-700 ease-out hover:shadow-xl hover:-translate-y-2 ${
        sectionAnimations[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <Search className="w-4 h-4 text-gray-400 dark:text-gray-500 absolute left-3 top-3 transition-colors duration-300 hover:text-green-500" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400 transition-all duration-300 hover:border-green-400 focus:scale-[1.02] focus:shadow-lg"
                placeholder="Search by program, defense type, school year, or semester..."
              />
            </div>
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 dark:bg-gray-700 transition-all duration-300 hover:scale-105 hover:shadow-md animate-fade-in-right"
            style={{ animationDelay: '200ms' }}
          >
            <Filter className="w-4 h-4 transition-transform duration-300 hover:rotate-12" />
            <span>Filters</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 animate-fade-in-up">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as DefenseRequestStatus | 'All')}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 dark:text-gray-200 transition-all duration-300 hover:border-green-400 focus:scale-[1.02] focus:shadow-lg"
                >
                  <option value="All">All Statuses</option>
                  <option value="Draft">Draft</option>
                  <option value="Research Center Approved">Research Center Approved</option>
                  <option value="VPAA Approved">VPAA Approved</option>
                  <option value="Dean Approved">Dean Approved</option>
                  <option value="Budget Approved">Budget Approved</option>
                  <option value="Returned for Corrections">Returned for Corrections</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Defense Type</label>
                <select
                  value={defenseTypeFilter}
                  onChange={(e) => setDefenseTypeFilter(e.target.value as DefenseType | 'All')}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 dark:text-gray-200 transition-all duration-300 hover:border-green-400 focus:scale-[1.02] focus:shadow-lg"
                >
                  <option value="All">All Types</option>
                  <option value="Pre-Oral">Pre-Oral</option>
                  <option value="Final">Final</option>
                </select>
              </div>

              <div className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Semester</label>
                <select
                  value={semesterFilter}
                  onChange={(e) => setSemesterFilter(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 dark:text-gray-200 transition-all duration-300 hover:border-green-400 focus:scale-[1.02] focus:shadow-lg"
                >
                  <option value="All">All Semesters</option>
                  <option value="First Semester">First Semester</option>
                  <option value="Second Semester">Second Semester</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Requests Table */}
      <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transform transition-all duration-700 ease-out hover:shadow-xl hover:-translate-y-2 ${
        sectionAnimations[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Defense Type</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">School Year</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Semester</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedRequests.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 px-4 text-center text-gray-500">
                    No requests found matching your criteria.
                  </td>
                </tr>
              ) : (
                sortedRequests.map((request, index) => (
                  <tr 
                    key={request.id} 
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 dark:bg-gray-700 transition-all duration-300 hover:scale-[1.01] hover:shadow-md animate-fade-in-up"
                    style={{ animationDelay: `${200 + (index * 100)}ms` }}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <div>
                          <span className="text-sm text-gray-800 dark:text-gray-200">{request.defenseType}</span>
                          {request.isFlagged && (
                            <div className="text-xs text-red-600 font-medium">
                              Flagged Request
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-800 dark:text-gray-200">{request.schoolYear}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-800 dark:text-gray-200">{request.semester}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => setSelectedRequestId(selectedRequestId === request.id ? null : request.id)}
                        className="hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg p-1 transition-colors"
                        title="Click to show/hide progress"
                      >
                        {getStatusBadge(request.status)}
                      </button>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleView(request.id)}
                          className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-md"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4 transition-transform duration-300 hover:rotate-12" />
                        </button>
                        {canEdit(request.status) && (
                          <button
                            onClick={() => handleEdit(request.id)}
                            className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-md"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4 transition-transform duration-300 hover:rotate-12" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(request.id)}
                          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-md"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 transition-transform duration-300 hover:rotate-12" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RequestDefense;