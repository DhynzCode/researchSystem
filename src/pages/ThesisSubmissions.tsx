import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Download,
  Eye,
  CheckCircle,
  RotateCcw,
  Mail,
  FileText,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Clock,
  GraduationCap,
  User,
  Calendar
} from 'lucide-react';

interface ThesisSubmission {
  id: string;
  studentId: string;
  studentName: string;
  program: string;
  researchTitle: string;
  status: 'pending' | 'approved' | 'needs-revision' | 'cleared';
  submissionDate: string;
  graduationBatch: string;
  documents: {
    finalThesis: { uploaded: boolean; filename?: string; uploadDate?: string; };
    abstract: { uploaded: boolean; filename?: string; uploadDate?: string; };
    copyrightForm: { uploaded: boolean; filename?: string; uploadDate?: string; };
  };
  defenseStatus: 'completed' | 'pending';
  defenseDate?: string;
  advisorName: string;
  reviewComments?: string;
}

const ThesisSubmissions: React.FC = () => {
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

  // Mock data for thesis submissions
  const mockSubmissions: ThesisSubmission[] = [
    {
      id: 'TS-2024-001',
      studentId: '2020-1234',
      studentName: 'Alice Johnson',
      program: 'BSIT',
      researchTitle: 'AI-Powered Student Management System',
      status: 'pending',
      submissionDate: '2024-03-20T10:30:00Z',
      graduationBatch: 'May 2024',
      documents: {
        finalThesis: { uploaded: true, filename: 'alice_johnson_final_thesis.pdf', uploadDate: '2024-03-20T10:30:00Z' },
        abstract: { uploaded: true, filename: 'alice_johnson_abstract.pdf', uploadDate: '2024-03-20T10:35:00Z' },
        copyrightForm: { uploaded: false }
      },
      defenseStatus: 'completed',
      defenseDate: '2024-03-15T14:00:00Z',
      advisorName: 'Dr. Roberto Martinez'
    },
    {
      id: 'TS-2024-002',
      studentId: '2020-1235',
      studentName: 'Bob Smith',
      program: 'BSIT',
      researchTitle: 'Blockchain-Based Voting System',
      status: 'approved',
      submissionDate: '2024-03-18T09:15:00Z',
      graduationBatch: 'May 2024',
      documents: {
        finalThesis: { uploaded: true, filename: 'bob_smith_final_thesis.pdf', uploadDate: '2024-03-18T09:15:00Z' },
        abstract: { uploaded: true, filename: 'bob_smith_abstract.pdf', uploadDate: '2024-03-18T09:20:00Z' },
        copyrightForm: { uploaded: true, filename: 'bob_smith_copyright.pdf', uploadDate: '2024-03-18T09:25:00Z' }
      },
      defenseStatus: 'completed',
      defenseDate: '2024-03-12T16:00:00Z',
      advisorName: 'Dr. Maria Santos'
    },
    {
      id: 'TS-2024-003',
      studentId: '2020-5678',
      studentName: 'Maria Gonzalez',
      program: 'BSN',
      researchTitle: 'Music Therapy in Pain Management',
      status: 'needs-revision',
      submissionDate: '2024-03-22T11:45:00Z',
      graduationBatch: 'May 2024',
      documents: {
        finalThesis: { uploaded: true, filename: 'maria_gonzalez_final_thesis.pdf', uploadDate: '2024-03-22T11:45:00Z' },
        abstract: { uploaded: false },
        copyrightForm: { uploaded: true, filename: 'maria_gonzalez_copyright.pdf', uploadDate: '2024-03-22T11:50:00Z' }
      },
      defenseStatus: 'completed',
      defenseDate: '2024-03-18T10:00:00Z',
      advisorName: 'Prof. Elena Rodriguez',
      reviewComments: 'Abstract needs to be submitted. Final thesis formatting needs correction on page 45-50.'
    },
    {
      id: 'TS-2024-004',
      studentId: '2020-3456',
      studentName: 'Carlos Mendoza',
      program: 'BSCE',
      researchTitle: 'Sustainable Building Materials Analysis',
      status: 'cleared',
      submissionDate: '2024-03-10T14:20:00Z',
      graduationBatch: 'May 2024',
      documents: {
        finalThesis: { uploaded: true, filename: 'carlos_mendoza_final_thesis.pdf', uploadDate: '2024-03-10T14:20:00Z' },
        abstract: { uploaded: true, filename: 'carlos_mendoza_abstract.pdf', uploadDate: '2024-03-10T14:25:00Z' },
        copyrightForm: { uploaded: true, filename: 'carlos_mendoza_copyright.pdf', uploadDate: '2024-03-10T14:30:00Z' }
      },
      defenseStatus: 'completed',
      defenseDate: '2024-03-05T13:00:00Z',
      advisorName: 'Dr. Ana Garcia'
    },
    {
      id: 'TS-2024-005',
      studentId: '2020-7890',
      studentName: 'Jennifer Cruz',
      program: 'BSN',
      researchTitle: 'Telehealth Implementation in Rural Areas',
      status: 'pending',
      submissionDate: '2024-03-25T08:30:00Z',
      graduationBatch: 'May 2024',
      documents: {
        finalThesis: { uploaded: false },
        abstract: { uploaded: false },
        copyrightForm: { uploaded: false }
      },
      defenseStatus: 'pending',
      advisorName: 'Prof. Diana Lopez'
    }
  ];

  const filteredSubmissions = useMemo(() => {
    return mockSubmissions.filter(submission => {
      const matchesSearch = 
        submission.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        submission.studentId.includes(searchQuery) ||
        submission.program.toLowerCase().includes(searchQuery.toLowerCase()) ||
        submission.researchTitle.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'All' || submission.status === statusFilter;
      const matchesProgram = programFilter === 'All' || submission.program === programFilter;
      const matchesBatch = graduationBatchFilter === 'All' || submission.graduationBatch === graduationBatchFilter;

      return matchesSearch && matchesStatus && matchesProgram && matchesBatch;
    });
  }, [searchQuery, statusFilter, programFilter, graduationBatchFilter]);

  const totalPages = Math.ceil(filteredSubmissions.length / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, filteredSubmissions.length);
  const paginatedSubmissions = filteredSubmissions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'pending': { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock, label: 'Pending Review' },
      'approved': { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle, label: 'Approved' },
      'needs-revision': { bg: 'bg-orange-100', text: 'text-orange-800', icon: RotateCcw, label: 'Needs Revision' },
      'cleared': { bg: 'bg-blue-100', text: 'text-blue-800', icon: GraduationCap, label: 'Cleared' }
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

  const getDocumentStatus = (submission: ThesisSubmission) => {
    const { finalThesis, abstract, copyrightForm } = submission.documents;
    const totalDocs = 3;
    const uploadedDocs = [finalThesis.uploaded, abstract.uploaded, copyrightForm.uploaded].filter(Boolean).length;
    
    if (uploadedDocs === totalDocs) {
      return <span className="text-green-600 text-xs">✅ Complete ({uploadedDocs}/{totalDocs})</span>;
    } else {
      return <span className="text-orange-600 text-xs">⚠️ Incomplete ({uploadedDocs}/{totalDocs})</span>;
    }
  };

  const handleApprove = (submissionId: string) => {
    console.log('Approve submission:', submissionId);
  };

  const handleRequestRevision = (submissionId: string) => {
    console.log('Request revision:', submissionId);
  };

  const handleSendMessage = (submissionId: string) => {
    console.log('Send message to student:', submissionId);
  };

  const handleViewSubmission = (submissionId: string) => {
    console.log('View submission details:', submissionId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-all duration-700 ease-out ${animationClass}`}>
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Repository - Thesis Submissions</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Student Clearance System - Final Thesis Document Management</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export List</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className={`grid grid-cols-1 md:grid-cols-4 gap-6 transition-all duration-700 ease-out delay-200 ${animationClass}`}>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Review</p>
              <p className="text-2xl font-bold text-yellow-600">{mockSubmissions.filter(s => s.status === 'pending').length}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Approved</p>
              <p className="text-2xl font-bold text-green-600">{mockSubmissions.filter(s => s.status === 'approved').length}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Needs Revision</p>
              <p className="text-2xl font-bold text-orange-600">{mockSubmissions.filter(s => s.status === 'needs-revision').length}</p>
            </div>
            <RotateCcw className="w-8 h-8 text-orange-500" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Cleared</p>
              <p className="text-2xl font-bold text-blue-600">{mockSubmissions.filter(s => s.status === 'cleared').length}</p>
            </div>
            <GraduationCap className="w-8 h-8 text-blue-500" />
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
                placeholder="Search by student name, ID, program, or thesis title..."
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-gray-200"
                >
                  <option value="All">All Statuses</option>
                  <option value="pending">Pending Review</option>
                  <option value="approved">Approved</option>
                  <option value="needs-revision">Needs Revision</option>
                  <option value="cleared">Cleared</option>
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

      {/* Submissions Table */}
      <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-700 ease-out delay-400 ${animationClass}`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Student Info</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Program</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Thesis Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Documents</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedSubmissions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 px-4 text-center text-gray-500">
                    No thesis submissions found matching your criteria.
                  </td>
                </tr>
              ) : (
                paginatedSubmissions.map((submission, index) => (
                  <tr key={submission.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <User className="w-5 h-5 text-gray-400" />
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-200">{submission.studentName}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">ID: {submission.studentId}</div>
                          <div className="text-xs text-gray-400">{submission.graduationBatch}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {submission.program}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 dark:text-gray-200 max-w-xs truncate" title={submission.researchTitle}>
                        {submission.researchTitle}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Advisor: {submission.advisorName}
                      </div>
                      {submission.defenseStatus === 'completed' && submission.defenseDate && (
                        <div className="text-xs text-green-600 mt-1">
                          ✅ Defense: {new Date(submission.defenseDate).toLocaleDateString()}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        {getDocumentStatus(submission)}
                        <div className="text-xs text-gray-500">
                          Submitted: {new Date(submission.submissionDate).toLocaleDateString()}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(submission.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewSubmission(submission.id)}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {submission.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleApprove(submission.id)}
                              className="text-green-600 hover:text-green-900 transition-colors"
                              title="Approve"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleRequestRevision(submission.id)}
                              className="text-orange-600 hover:text-orange-900 transition-colors"
                              title="Request Revision"
                            >
                              <RotateCcw className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleSendMessage(submission.id)}
                          className="text-purple-600 hover:text-purple-900 transition-colors"
                          title="Send Message"
                        >
                          <Mail className="w-4 h-4" />
                        </button>
                        {(submission.documents.finalThesis.uploaded || 
                          submission.documents.abstract.uploaded || 
                          submission.documents.copyrightForm.uploaded) && (
                          <button
                            className="text-gray-600 hover:text-gray-900 transition-colors"
                            title="View Documents"
                          >
                            <FileText className="w-4 h-4" />
                          </button>
                        )}
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
                Showing {startItem} to {endItem} of {filteredSubmissions.length} results
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

export default ThesisSubmissions;