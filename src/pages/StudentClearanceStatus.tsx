import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Download,
  Eye,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  GraduationCap,
  User,
  Calendar,
  FileText,
  ChevronLeft,
  ChevronRight,
  Mail
} from 'lucide-react';

interface StudentClearance {
  id: string;
  studentId: string;
  studentName: string;
  program: string;
  graduationBatch: string;
  clearanceStatus: 'complete' | 'pending' | 'incomplete';
  requirements: {
    academicRequirements: { completed: boolean; date?: string; };
    finalDefense: { completed: boolean; date?: string; };
    thesisSubmission: { completed: boolean; date?: string; };
    libraryClearance: { completed: boolean; date?: string; };
    registrarClearance: { completed: boolean; date?: string; };
    financialClearance: { completed: boolean; date?: string; };
  };
  overallProgress: number;
  expectedGraduation: string;
  advisorName: string;
  lastUpdate: string;
  notes?: string;
}

const StudentClearanceStatus: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [programFilter, setProgramFilter] = useState<string>('All');
  const [graduationBatchFilter, setGraduationBatchFilter] = useState<string>('All');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [animationClass, setAnimationClass] = useState('opacity-0 translate-y-4');
  const itemsPerPage = 10;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationClass('opacity-100 translate-y-0');
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Mock data for student clearance status
  const mockClearances: StudentClearance[] = [
    {
      id: 'CL-2024-001',
      studentId: '2020-1234',
      studentName: 'Alice Johnson',
      program: 'BSIT',
      graduationBatch: 'May 2024',
      clearanceStatus: 'pending',
      requirements: {
        academicRequirements: { completed: true, date: '2024-02-15T00:00:00Z' },
        finalDefense: { completed: true, date: '2024-03-15T14:00:00Z' },
        thesisSubmission: { completed: true, date: '2024-03-20T10:30:00Z' },
        libraryClearance: { completed: false },
        registrarClearance: { completed: false },
        financialClearance: { completed: true, date: '2024-03-10T09:00:00Z' }
      },
      overallProgress: 67,
      expectedGraduation: '2024-05-15T00:00:00Z',
      advisorName: 'Dr. Roberto Martinez',
      lastUpdate: '2024-03-22T15:30:00Z',
      notes: 'Awaiting library and registrar clearance. All documents submitted.'
    },
    {
      id: 'CL-2024-002',
      studentId: '2020-1235',
      studentName: 'Bob Smith',
      program: 'BSIT',
      graduationBatch: 'May 2024',
      clearanceStatus: 'complete',
      requirements: {
        academicRequirements: { completed: true, date: '2024-02-10T00:00:00Z' },
        finalDefense: { completed: true, date: '2024-03-12T16:00:00Z' },
        thesisSubmission: { completed: true, date: '2024-03-18T09:15:00Z' },
        libraryClearance: { completed: true, date: '2024-03-25T11:00:00Z' },
        registrarClearance: { completed: true, date: '2024-03-26T14:00:00Z' },
        financialClearance: { completed: true, date: '2024-03-05T10:00:00Z' }
      },
      overallProgress: 100,
      expectedGraduation: '2024-05-15T00:00:00Z',
      advisorName: 'Dr. Maria Santos',
      lastUpdate: '2024-03-26T14:00:00Z',
      notes: 'All requirements completed. Ready for graduation.'
    },
    {
      id: 'CL-2024-003',
      studentId: '2020-5678',
      studentName: 'Maria Gonzalez',
      program: 'BSN',
      graduationBatch: 'May 2024',
      clearanceStatus: 'incomplete',
      requirements: {
        academicRequirements: { completed: true, date: '2024-02-20T00:00:00Z' },
        finalDefense: { completed: true, date: '2024-03-18T10:00:00Z' },
        thesisSubmission: { completed: false },
        libraryClearance: { completed: false },
        registrarClearance: { completed: false },
        financialClearance: { completed: false }
      },
      overallProgress: 33,
      expectedGraduation: '2024-05-15T00:00:00Z',
      advisorName: 'Prof. Elena Rodriguez',
      lastUpdate: '2024-03-24T09:15:00Z',
      notes: 'Thesis needs revision. Financial and other clearances pending.'
    },
    {
      id: 'CL-2024-004',
      studentId: '2020-3456',
      studentName: 'Carlos Mendoza',
      program: 'BSCE',
      graduationBatch: 'May 2024',
      clearanceStatus: 'complete',
      requirements: {
        academicRequirements: { completed: true, date: '2024-01-30T00:00:00Z' },
        finalDefense: { completed: true, date: '2024-03-05T13:00:00Z' },
        thesisSubmission: { completed: true, date: '2024-03-10T14:20:00Z' },
        libraryClearance: { completed: true, date: '2024-03-20T16:00:00Z' },
        registrarClearance: { completed: true, date: '2024-03-22T10:00:00Z' },
        financialClearance: { completed: true, date: '2024-02-28T15:00:00Z' }
      },
      overallProgress: 100,
      expectedGraduation: '2024-05-15T00:00:00Z',
      advisorName: 'Dr. Ana Garcia',
      lastUpdate: '2024-03-22T10:00:00Z',
      notes: 'Exemplary completion of all requirements. Ready for graduation.'
    },
    {
      id: 'CL-2024-005',
      studentId: '2020-7890',
      studentName: 'Jennifer Cruz',
      program: 'BSN',
      graduationBatch: 'May 2024',
      clearanceStatus: 'incomplete',
      requirements: {
        academicRequirements: { completed: true, date: '2024-02-25T00:00:00Z' },
        finalDefense: { completed: false },
        thesisSubmission: { completed: false },
        libraryClearance: { completed: false },
        registrarClearance: { completed: true, date: '2024-03-01T11:00:00Z' },
        financialClearance: { completed: false }
      },
      overallProgress: 33,
      expectedGraduation: '2024-05-15T00:00:00Z',
      advisorName: 'Prof. Diana Lopez',
      lastUpdate: '2024-03-25T08:30:00Z',
      notes: 'Defense not yet scheduled. Multiple requirements still pending.'
    }
  ];

  const filteredClearances = useMemo(() => {
    return mockClearances.filter(clearance => {
      const matchesSearch = 
        clearance.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        clearance.studentId.includes(searchQuery) ||
        clearance.program.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'All' || clearance.clearanceStatus === statusFilter;
      const matchesProgram = programFilter === 'All' || clearance.program === programFilter;
      const matchesBatch = graduationBatchFilter === 'All' || clearance.graduationBatch === graduationBatchFilter;

      return matchesSearch && matchesStatus && matchesProgram && matchesBatch;
    });
  }, [searchQuery, statusFilter, programFilter, graduationBatchFilter]);

  const totalPages = Math.ceil(filteredClearances.length / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, filteredClearances.length);
  const paginatedClearances = filteredClearances.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'complete': { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle, label: 'Complete' },
      'pending': { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock, label: 'Pending' },
      'incomplete': { bg: 'bg-red-100', text: 'text-red-800', icon: XCircle, label: 'Incomplete' }
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    const IconComponent = config.icon;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        <IconComponent className="w-3 h-3 mr-1" />
        {config.label}
      </span>
    );
  };

  const getProgressBar = (progress: number) => {
    const getProgressColor = (progress: number) => {
      if (progress === 100) return 'bg-green-500';
      if (progress >= 67) return 'bg-yellow-500';
      return 'bg-red-500';
    };

    return (
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(progress)}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    );
  };

  const getRequirementStatus = (requirement: { completed: boolean; date?: string }) => {
    if (requirement.completed) {
      return <CheckCircle className="w-4 h-4 text-green-500" title={`Completed: ${requirement.date ? new Date(requirement.date).toLocaleDateString() : 'N/A'}`} />;
    }
    return <XCircle className="w-4 h-4 text-red-500" title="Not completed" />;
  };

  const handleViewDetails = (clearanceId: string) => {
    console.log('View clearance details:', clearanceId);
  };

  const handleSendMessage = (clearanceId: string) => {
    console.log('Send message to student:', clearanceId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-all duration-700 ease-out ${animationClass}`}>
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Repository - Student Clearance Status</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Track graduation requirements and clearance progress</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-700 ease-out delay-200 ${animationClass}`}>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Complete Clearance</p>
              <p className="text-2xl font-bold text-green-600">{mockClearances.filter(c => c.clearanceStatus === 'complete').length}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Clearance</p>
              <p className="text-2xl font-bold text-yellow-600">{mockClearances.filter(c => c.clearanceStatus === 'pending').length}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Incomplete</p>
              <p className="text-2xl font-bold text-red-600">{mockClearances.filter(c => c.clearanceStatus === 'incomplete').length}</p>
            </div>
            <XCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-700 ease-out delay-300 ${animationClass}`}>
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-gray-200"
                placeholder="Search by student name, ID, or program..."
              />
            </div>
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-gray-200"
                >
                  <option value="All">All Statuses</option>
                  <option value="complete">Complete</option>
                  <option value="pending">Pending</option>
                  <option value="incomplete">Incomplete</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Program</label>
                <select
                  value={programFilter}
                  onChange={(e) => setProgramFilter(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-gray-200"
                >
                  <option value="All">All Programs</option>
                  <option value="BSIT">BSIT</option>
                  <option value="BSN">BSN</option>
                  <option value="BSCE">BSCE</option>
                  <option value="BSBA">BSBA</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Graduation Batch</label>
                <select
                  value={graduationBatchFilter}
                  onChange={(e) => setGraduationBatchFilter(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-gray-200"
                >
                  <option value="All">All Batches</option>
                  <option value="May 2024">May 2024</option>
                  <option value="October 2024">October 2024</option>
                  <option value="March 2025">March 2025</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Clearance Table */}
      <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-700 ease-out delay-400 ${animationClass}`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Student Info</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Progress</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Requirements</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedClearances.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 px-4 text-center text-gray-500">
                    No student clearance records found matching your criteria.
                  </td>
                </tr>
              ) : (
                paginatedClearances.map((clearance, index) => (
                  <tr key={clearance.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <User className="w-5 h-5 text-gray-400" />
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-200">{clearance.studentName}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">ID: {clearance.studentId}</div>
                          <div className="text-xs text-gray-400">{clearance.program} • {clearance.graduationBatch}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Progress</span>
                          <span className="text-sm font-medium">{clearance.overallProgress}%</span>
                        </div>
                        {getProgressBar(clearance.overallProgress)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="grid grid-cols-3 gap-2">
                        <div className="flex items-center space-x-1" title="Academic Requirements">
                          {getRequirementStatus(clearance.requirements.academicRequirements)}
                          <span className="text-xs text-gray-500">Academic</span>
                        </div>
                        <div className="flex items-center space-x-1" title="Final Defense">
                          {getRequirementStatus(clearance.requirements.finalDefense)}
                          <span className="text-xs text-gray-500">Defense</span>
                        </div>
                        <div className="flex items-center space-x-1" title="Thesis Submission">
                          {getRequirementStatus(clearance.requirements.thesisSubmission)}
                          <span className="text-xs text-gray-500">Thesis</span>
                        </div>
                        <div className="flex items-center space-x-1" title="Library Clearance">
                          {getRequirementStatus(clearance.requirements.libraryClearance)}
                          <span className="text-xs text-gray-500">Library</span>
                        </div>
                        <div className="flex items-center space-x-1" title="Registrar Clearance">
                          {getRequirementStatus(clearance.requirements.registrarClearance)}
                          <span className="text-xs text-gray-500">Registrar</span>
                        </div>
                        <div className="flex items-center space-x-1" title="Financial Clearance">
                          {getRequirementStatus(clearance.requirements.financialClearance)}
                          <span className="text-xs text-gray-500">Financial</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        {getStatusBadge(clearance.clearanceStatus)}
                        <div className="text-xs text-gray-500">
                          Updated: {new Date(clearance.lastUpdate).toLocaleDateString()}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewDetails(clearance.id)}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleSendMessage(clearance.id)}
                          className="text-purple-600 hover:text-purple-900 transition-colors"
                          title="Send Message"
                        >
                          <Mail className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700 dark:text-gray-300">
                Showing {startItem} to {endItem} of {filteredClearances.length} results
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="flex items-center space-x-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
                
                <div className="flex space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-2 text-sm font-medium rounded-md ${
                        currentPage === page
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="flex items-center space-x-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentClearanceStatus;