import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle, 
  RotateCcw, 
  AlertTriangle,
  Clock,
  Eye,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { PanelRequest, RequestStatus } from '../types';
import { ButtonLoader } from '../components/Loading';

const ApprovalCenter: React.FC = () => {
  console.log('ApprovalCenter component is rendering');
  const navigate = useNavigate();
  const [reviewComment, setReviewComment] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<RequestStatus | 'All'>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [animationClass, setAnimationClass] = useState('opacity-0 translate-y-4');
  const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({});
  const itemsPerPage = 5;

  const setLoading = (requestId: string, isLoading: boolean) => {
    setLoadingStates(prev => ({ ...prev, [requestId]: isLoading }));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationClass('opacity-100 translate-y-0');
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const mockRequests: PanelRequest[] = [
    {
      id: 'REQ-2024-001',
      programChair: 'Dr. Roberto Martinez',
      programLevel: 'Tertiary Level (College & Off-site branches)',
      department: 'SEICT',
      program: 'Bachelor of Science in Information Technology (BSIT)',
      semester: 'First Semester',
      defenseType: 'Final',
      schoolYear: '2024-2025',
      status: 'Pending',
      studentGroups: [
        {
          id: '1',
          students: ['Alice Johnson', 'Bob Smith', 'Carol Davis'],
          researchTitle: 'AI-Powered Student Management System',
          panelMembers: []
        },
        {
          id: '2', 
          students: ['David Wilson', 'Eva Brown'],
          researchTitle: 'Blockchain-Based Voting System',
          panelMembers: []
        }
      ],
      panelMembers: [
        {
          id: '1',
          name: 'Prof. Anna Garcia',
          roles: ['Advisor'],
          currentAppearances: 3,
          isFlagged: false
        },
        {
          id: '2',
          name: 'Dr. Michael Chen',
          roles: ['Advisor'],
          currentAppearances: 2,
          isFlagged: false
        },
        {
          id: '3',
          name: 'Dr. Maria Santos',
          roles: ['Chairperson'],
          currentAppearances: 3,
          isFlagged: false
        },
        {
          id: '4',
          name: 'Dr. Roberto Silva',
          roles: ['Chairperson'],
          currentAppearances: 3,
          isFlagged: false
        },
        {
          id: '5',
          name: 'Prof. Juan Cruz',
          roles: ['Panel Member'],
          currentAppearances: 2,
          isFlagged: false
        },
        {
          id: '6',
          name: 'Dr. Ana Reyes',
          roles: ['Panel Member'],
          currentAppearances: 3,
          isFlagged: false
        },
        {
          id: '7',
          name: 'Dr. Elena Rodriguez',
          roles: ['Panel Member'],
          currentAppearances: 1,
          isFlagged: false
        },
        {
          id: '8',
          name: 'Prof. Carlos Mendez',
          roles: ['Panel Member'],
          currentAppearances: 4,
          isFlagged: false
        },
        {
          id: '9',
          name: 'Dr. Lisa Wang',
          roles: ['Panel Member'],
          currentAppearances: 2,
          isFlagged: false
        },
        {
          id: '10',
          name: 'Prof. Sarah Lee',
          roles: ['Panel Member'],
          currentAppearances: 1,
          isFlagged: false
        }
      ],
      createdAt: '2024-01-15T09:00:00Z',
      updatedAt: '2024-01-15T09:00:00Z'
    },
    {
      id: 'REQ-2024-002',
      programChair: 'Prof. Elena Rodriguez',
      programLevel: 'SGS Masters & FS',
      department: 'SAM',
      program: 'Bachelor of Science in Nursing (BSN)',
      semester: 'Second Semester',
      defenseType: 'Pre-Oral',
      schoolYear: '2024-2025',
      status: 'Returned',
      studentGroups: [
        {
          id: '1',
          students: ['Maria Gonzalez', 'Patricia Santos', 'Jennifer Cruz'],
          researchTitle: 'Evidence-Based Practice Implementation in Clinical Nursing',
          panelMembers: []
        },
        {
          id: '2',
          students: ['Carlos Mendoza', 'Angela Torres'],
          researchTitle: 'Telehealth Nursing: Impact on Rural Healthcare Delivery',
          panelMembers: []
        }
      ],
      panelMembers: [
        // Group 1 Panel
        {
          id: '1',
          name: 'Dr. Catherine Williams',
          roles: ['Adviser'],
          currentAppearances: 8,
          requestAppearances: 1,
          totalAppearances: 9,
          compensation: 800,
          isFlagged: true, // Part of SAM 10-appearance violation
          group: 1
        },
        {
          id: '2',
          name: 'Dr. Roberto Martinez',
          roles: ['Chairman'],
          currentAppearances: 7,
          requestAppearances: 1,
          totalAppearances: 8,
          compensation: 400,
          isFlagged: true, // Part of SAM 10-appearance violation
          group: 1
        },
        {
          id: '3',
          name: 'Prof. Lisa Garcia',
          roles: ['Panel Member'],
          currentAppearances: 4,
          requestAppearances: 1,
          totalAppearances: 5,
          compensation: 300,
          isFlagged: true, // Part of SAM 10-appearance violation
          group: 1
        },
        {
          id: '4',
          name: 'Dr. Amanda Johnson',
          roles: ['Panel Member'],
          currentAppearances: 3,
          requestAppearances: 1,
          totalAppearances: 4,
          compensation: 300,
          isFlagged: true, // Part of SAM 10-appearance violation
          group: 1
        },
        // Group 2 Panel
        {
          id: '5',
          name: 'Prof. Diana Lopez',
          roles: ['Adviser'],
          currentAppearances: 6,
          requestAppearances: 1,
          totalAppearances: 7,
          compensation: 800,
          isFlagged: true, // Part of SAM 10-appearance violation
          group: 2
        },
        {
          id: '6',
          name: 'Dr. Maria Santos',
          roles: ['Chairman'],
          currentAppearances: 9,
          requestAppearances: 1,
          totalAppearances: 10,
          compensation: 400,
          isFlagged: true, // Part of SAM 10-appearance violation
          group: 2
        },
        {
          id: '7',
          name: 'Dr. James Wilson',
          roles: ['Panel Member'],
          currentAppearances: 5,
          requestAppearances: 1,
          totalAppearances: 6,
          compensation: 300,
          isFlagged: true, // Part of SAM 10-appearance violation
          group: 2
        },
        {
          id: '8',
          name: 'Prof. Sarah Davis',
          roles: ['Panel Member'],
          currentAppearances: 4,
          requestAppearances: 1,
          totalAppearances: 5,
          compensation: 300,
          isFlagged: true, // Part of SAM 10-appearance violation
          group: 2
        },
        {
          id: '9',
          name: 'Dr. Rachel Brown',
          roles: ['Panel Member'],
          currentAppearances: 2,
          requestAppearances: 1,
          totalAppearances: 3,
          compensation: 300,
          isFlagged: true, // Part of SAM 10-appearance violation
          group: 2
        },
        {
          id: '10',
          name: 'Ms. Jennifer Kim',
          roles: ['Secretary'],
          currentAppearances: 2,
          requestAppearances: 1,
          totalAppearances: 3,
          compensation: 200,
          isFlagged: true, // Part of SAM 10-appearance violation
          group: 1 // Secretary for Group 1
        },
        // Shared Statistician (not part of 10-appearance limit)
        {
          id: '11',
          name: 'Prof. Michael Santos',
          roles: ['Statistician'],
          currentAppearances: 25,
          requestAppearances: 2,
          totalAppearances: 27,
          compensation: 1000,
          isFlagged: false, // Statistician has 30-appearance limit, not part of 10-limit
          group: 0 // Shared across groups
        }
      ],
      justificationLetter: 'justification-002.pdf',
      createdAt: '2024-01-14T10:30:00Z',
      updatedAt: '2024-01-14T10:30:00Z'
    },
    {
      id: 'REQ-2024-003',
      programChair: 'Dr. Sarah Martinez',
      programLevel: 'Tertiary Level (College)',
      department: 'SLAS',
      program: 'Bachelor of Arts in Psychology (BAP)',
      semester: 'First Semester',
      defenseType: 'Final',
      schoolYear: '2024-2025',
      status: 'Flagged',
      studentGroups: [
        {
          id: '1',
          students: ['Jessica Rivera', 'Mark Thompson', 'Lisa Garcia'],
          researchTitle: 'The Impact of Social Media on Adolescent Mental Health',
          panelMembers: []
        },
        {
          id: '2',
          students: ['David Chen', 'Maria Fernandez'],
          researchTitle: 'Cognitive Behavioral Therapy Effectiveness in Anxiety Disorders',
          panelMembers: []
        }
      ],
      panelMembers: [
        // Group 1 Panel
        {
          id: '1',
          name: 'Dr. Rachel Williams',
          roles: ['Adviser'],
          currentAppearances: 3,
          requestAppearances: 1,
          totalAppearances: 4,
          compensation: 800,
          isFlagged: false,
          group: 1
        },
        {
          id: '2',
          name: 'Dr. Elena Rodriguez',
          roles: ['Chairman'],
          currentAppearances: 7,
          requestAppearances: 1,
          totalAppearances: 8,
          compensation: 400,
          isFlagged: true, // Exceeds 5-appearance limit for Chairman
          group: 1
        },
        {
          id: '3',
          name: 'Dr. Anna Martinez',
          roles: ['Panel Member'],
          currentAppearances: 2,
          requestAppearances: 1,
          totalAppearances: 3,
          compensation: 300,
          isFlagged: false,
          group: 1
        },
        {
          id: '4',
          name: 'Prof. Carlos Lopez',
          roles: ['Panel Member'],
          currentAppearances: 3,
          requestAppearances: 1,
          totalAppearances: 4,
          compensation: 300,
          isFlagged: false,
          group: 1
        },
        // Group 2 Panel
        {
          id: '5',
          name: 'Prof. Diana Kim',
          roles: ['Adviser'],
          currentAppearances: 2,
          requestAppearances: 1,
          totalAppearances: 3,
          compensation: 800,
          isFlagged: false,
          group: 2
        },
        {
          id: '6',
          name: 'Dr. Roberto Silva',
          roles: ['Chairman'],
          currentAppearances: 4,
          requestAppearances: 1,
          totalAppearances: 5,
          compensation: 400,
          isFlagged: false,
          group: 2
        },
        {
          id: '7',
          name: 'Dr. Jennifer Wong',
          roles: ['Panel Member'],
          currentAppearances: 1,
          requestAppearances: 1,
          totalAppearances: 2,
          compensation: 300,
          isFlagged: false,
          group: 2
        },
        {
          id: '8',
          name: 'Prof. Amanda Brown',
          roles: ['Panel Member'],
          currentAppearances: 2,
          requestAppearances: 1,
          totalAppearances: 3,
          compensation: 300,
          isFlagged: false,
          group: 2
        },
        // Shared Statistician
        {
          id: '9',
          name: 'Prof. Michael Santos',
          roles: ['Statistician'],
          currentAppearances: 30,
          requestAppearances: 1,
          totalAppearances: 31,
          compensation: 500,
          isFlagged: true, // Exceeds 30-appearance limit for Statistician
          group: 0 // Shared across groups
        }
      ],
      justificationLetter: 'justification-BAP-SLAS-REQ-2024-003.pdf',
      createdAt: '2024-01-20T16:15:00Z',
      updatedAt: '2024-01-20T16:15:00Z'
    },
    {
      id: 'REQ-2024-004',
      programChair: 'Prof. Sarah Thompson',
      programLevel: 'Tertiary Level (College & Off-site branches)',
      department: 'SBM',
      program: 'Bachelor of Science in Business Administration (BSBA)',
      semester: 'First Semester',
      defenseType: 'Pre-Oral',
      schoolYear: '2024-2025',
      status: 'Approved',
      studentGroups: [
        {
          id: '4',
          students: ['Alex Chen', 'Maria Rodriguez'],
          researchTitle: 'Digital Marketing Strategies for SMEs',
          panelMembers: []
        }
      ],
      panelMembers: [
        {
          id: '5',
          name: 'Dr. James Wilson',
          roles: ['Chairperson'],
          currentAppearances: 4,
          isFlagged: false
        }
      ],
      createdAt: '2024-01-12T11:00:00Z',
      updatedAt: '2024-01-16T15:30:00Z'
    },
    {
      id: 'REQ-2024-005',
      programChair: 'Dr. Ana Garcia',
      programLevel: 'SGS Masters & FS',
      department: 'SOE',
      program: 'Master of Arts in Education (MAEd)',
      semester: 'Second Semester',
      defenseType: 'Final',
      schoolYear: '2024-2025',
      status: 'Approved',
      studentGroups: [
        {
          id: '5',
          students: ['Jennifer Lee', 'Michael Brown'],
          researchTitle: 'Technology Integration in Elementary Education',
          panelMembers: []
        }
      ],
      panelMembers: [
        {
          id: '6',
          name: 'Dr. Patricia Davis',
          roles: ['Panel Member'],
          currentAppearances: 3,
          isFlagged: false
        }
      ],
      createdAt: '2024-01-11T08:45:00Z',
      updatedAt: '2024-01-17T10:20:00Z'
    }
  ];

  const [requests, setRequests] = useState<PanelRequest[]>(mockRequests);

  const handleApprove = async (requestId: string) => {
    setLoading(requestId, true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setRequests(requests.map(req => 
      req.id === requestId ? { ...req, status: 'Approved' as RequestStatus } : req
    ));
    setReviewComment('');
    setLoading(requestId, false);
  };

  const handleReturn = async (requestId: string) => {
    setLoading(requestId, true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setRequests(requests.map(req => 
      req.id === requestId ? { ...req, status: 'Returned' as RequestStatus } : req
    ));
    setReviewComment('');
    setLoading(requestId, false);
  };

  const pendingRequests = requests.filter(req => req.status === 'Flagged' || req.status === 'Pending');
  const approvedRequests = requests.filter(req => req.status === 'Approved');
  const returnedRequests = requests.filter(req => req.status === 'Returned');

  // Filter and search logic
  const filteredRequests = useMemo(() => {
    let filtered = requests;
    
    // Apply status filter
    if (statusFilter !== 'All') {
      filtered = filtered.filter(req => req.status === statusFilter);
    }
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(req => 
        req.program.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.defenseType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.schoolYear.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.semester.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.department.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  }, [requests, statusFilter, searchQuery]);

  // Pagination logic
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, filteredRequests.length);

  const getStatusColor = (status: RequestStatus) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Returned': return 'bg-orange-100 text-orange-800';
      case 'Pending': return 'bg-blue-100 text-blue-800';
      case 'Flagged': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status: RequestStatus) => {
    switch (status) {
      case 'Approved': return <CheckCircle className="w-4 h-4" />;
      case 'Returned': return <RotateCcw className="w-4 h-4" />;
      case 'Pending': return <Clock className="w-4 h-4" />;
      case 'Flagged': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusText = (status: RequestStatus) => {
    switch (status) {
      case 'Pending': return 'Pending Review';
      case 'Flagged': return 'Flagged';
      case 'Approved': return 'Approved';
      case 'Returned': return 'Returned';
      default: return status;
    }
  };


  return (
    <div className="space-y-6">
      <div className={`flex items-center justify-between transition-all duration-700 ease-out ${animationClass}`}>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Approval Center</h1>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          VPAA Review Dashboard
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-700 ease-out delay-200 ${animationClass}`}>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-yellow-500 transform transition-all duration-500 ease-out hover:shadow-lg hover:-translate-y-1 hover:scale-105 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 transition-colors duration-300">⏳ Pending Review</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-gray-200 transition-all duration-300 hover:text-yellow-600">{pendingRequests.length}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-500 transition-transform duration-300 hover:scale-110 hover:animate-pulse" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-green-500 transform transition-all duration-500 ease-out hover:shadow-lg hover:-translate-y-1 hover:scale-105 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 transition-colors duration-300">✅ Approved</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-gray-200 transition-all duration-300 hover:text-green-600">{approvedRequests.length}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500 transition-transform duration-300 hover:scale-110 hover:rotate-12" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-orange-500 transform transition-all duration-500 ease-out hover:shadow-lg hover:-translate-y-1 hover:scale-105 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 transition-colors duration-300">🔄 Returned</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-gray-200 transition-all duration-300 hover:text-orange-600">{returnedRequests.length}</p>
            </div>
            <RotateCcw className="w-8 h-8 text-orange-500 transition-transform duration-300 hover:scale-110 hover:rotate-180" />
          </div>
        </div>
      </div>

      {/* Defense Requests Table */}
      <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md transform transition-all duration-700 ease-out delay-400 hover:shadow-lg hover:-translate-y-1 ${animationClass}`}>
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 transition-colors duration-300">Defense Requests</h2>
            <div className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
              Showing {filteredRequests.length > 0 ? startItem : 0} to {endItem} of {filteredRequests.length} requests
            </div>
          </div>
          
          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by program, defense type, school year, or semester..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400 transition-all duration-300 focus:scale-101"
              />
            </div>
            <div className="relative">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105 hover:shadow-md"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>
              {showFilters && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                  <div className="p-3">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value as RequestStatus | 'All')}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-gray-200"
                    >
                      <option value="All">All Status</option>
                      <option value="Pending">Pending Review</option>
                      <option value="Flagged">Flagged</option>
                      <option value="Approved">Approved</option>
                      <option value="Returned">Returned</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Program
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Defense Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  School Year
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Semester
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedRequests.map((request, index) => (
                <tr key={request.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-101 animate-fade-in-up" style={{ animationDelay: `${index * 100 + 800}ms` }}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-200 transition-colors duration-300 hover:text-blue-600">
                      {request.program}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
                      {request.department}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-gray-200 transition-colors duration-300">{request.defenseType}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-gray-200 transition-colors duration-300">{request.schoolYear}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-gray-200 transition-colors duration-300">{request.semester}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-all duration-300 hover:scale-110 ${getStatusColor(request.status)}`}>
                      <span className="transition-transform duration-300 hover:scale-110">{getStatusIcon(request.status)}</span>
                      <span className="ml-1">{getStatusText(request.status)}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => navigate(`/approval-center/request/${request.id}`)}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 transition-all duration-300 hover:scale-110"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4 transition-transform duration-300 hover:scale-110" />
                      </button>
                      {(request.status === 'Flagged' || request.status === 'Pending') && (
                        <>
                          <button
                            onClick={() => handleApprove(request.id)}
                            disabled={loadingStates[request.id]}
                            className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Approve"
                          >
                            {loadingStates[request.id] ? (
                              <ButtonLoader className="w-4 h-4" />
                            ) : (
                              <CheckCircle className="w-4 h-4 transition-transform duration-300 hover:scale-110 hover:rotate-12" />
                            )}
                          </button>
                          <button
                            onClick={() => handleReturn(request.id)}
                            disabled={loadingStates[request.id]}
                            className="text-orange-600 hover:text-orange-900 dark:text-orange-400 dark:hover:text-orange-300 transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Return for Corrections"
                          >
                            {loadingStates[request.id] ? (
                              <ButtonLoader className="w-4 h-4" />
                            ) : (
                              <RotateCcw className="w-4 h-4 transition-transform duration-300 hover:scale-110 hover:rotate-180" />
                            )}
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="flex items-center space-x-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>
              
              <div className="flex items-center space-x-2">
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
        )}
      </div>
    </div>
  );
};

export default ApprovalCenter;
