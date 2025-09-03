import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Users, 
  Banknote, 
  Calendar,
  BookOpen,
  GraduationCap,
  CheckCircle,
  RotateCcw,
  AlertTriangle,
  Clock,
  UserCheck,
  Award,
  Trash2
} from 'lucide-react';
import { PanelRequest, RequestStatus } from '../types';
import { ButtonLoader } from '../components/Loading';

const RequestDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const requestId = id;
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'consolidated' | 'groups'>('overview');
  const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({});

  const setLoading = (action: string, isLoading: boolean) => {
    setLoadingStates(prev => ({ ...prev, [action]: isLoading }));
  };

  // Get the same mock data as ApprovalCenter - this should match exactly
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
        },
        {
          id: '3',
          students: ['Michael Chen', 'Sarah Rodriguez', 'James Park'],
          researchTitle: 'IoT-Based Smart Home Security System',
          panelMembers: []
        },
        {
          id: '4',
          students: ['Emma Thompson', 'Ryan Mitchell'],
          researchTitle: 'Machine Learning for Stock Price Prediction',
          panelMembers: []
        },
        {
          id: '5',
          students: ['Olivia Martinez', 'Noah Anderson', 'Sophie Taylor'],
          researchTitle: 'Mobile Application for Mental Health Support',
          panelMembers: []
        },
        {
          id: '6',
          students: ['Lucas Garcia', 'Maya Patel'],
          researchTitle: 'Cybersecurity Framework for Small Businesses',
          panelMembers: []
        },
        {
          id: '7',
          students: ['Isabella Wong', 'Ethan Kim', 'Zoe Johnson'],
          researchTitle: 'E-commerce Platform with Augmented Reality',
          panelMembers: []
        },
        {
          id: '8',
          students: ['Alexander Lee', 'Chloe Davis'],
          researchTitle: 'Cloud-Based Disaster Recovery System',
          panelMembers: []
        },
        {
          id: '9',
          students: ['Grace Liu', 'Mason Rodriguez', 'Lily Chen'],
          researchTitle: 'Web-Based Learning Management System with Gamification',
          panelMembers: []
        }
      ],
      panelMembers: [
        // Group 1 Panel
        { id: '1', name: 'Prof. Anna Garcia', roles: ['Adviser'], currentAppearances: 3, totalAppearances: 4, compensation: 800, isFlagged: false, group: 1 },
        { id: '2', name: 'Dr. Michael Chen', roles: ['Chairman'], currentAppearances: 2, totalAppearances: 3, compensation: 400, isFlagged: false, group: 1 },
        { id: '3', name: 'Dr. Maria Santos', roles: ['Panel Member'], currentAppearances: 3, totalAppearances: 4, compensation: 300, isFlagged: false, group: 1 },
        { id: '4', name: 'Dr. Roberto Silva', roles: ['Panel Member'], currentAppearances: 3, totalAppearances: 4, compensation: 300, isFlagged: false, group: 1 },
        
        // Group 2 Panel  
        { id: '5', name: 'Prof. Juan Cruz', roles: ['Adviser'], currentAppearances: 2, totalAppearances: 3, compensation: 800, isFlagged: false, group: 2 },
        { id: '6', name: 'Dr. Ana Reyes', roles: ['Chairman'], currentAppearances: 3, totalAppearances: 4, compensation: 400, isFlagged: false, group: 2 },
        { id: '7', name: 'Dr. Elena Rodriguez', roles: ['Panel Member'], currentAppearances: 1, totalAppearances: 2, compensation: 300, isFlagged: false, group: 2 },
        { id: '8', name: 'Prof. Carlos Mendez', roles: ['Panel Member'], currentAppearances: 4, totalAppearances: 5, compensation: 300, isFlagged: false, group: 2 },
        
        // Group 3 Panel
        { id: '9', name: 'Dr. Lisa Wang', roles: ['Adviser'], currentAppearances: 2, totalAppearances: 3, compensation: 800, isFlagged: false, group: 3 },
        { id: '10', name: 'Prof. Sarah Lee', roles: ['Chairman'], currentAppearances: 1, totalAppearances: 2, compensation: 400, isFlagged: false, group: 3 },
        { id: '11', name: 'Dr. James Wilson', roles: ['Panel Member'], currentAppearances: 3, totalAppearances: 4, compensation: 300, isFlagged: false, group: 3 },
        { id: '12', name: 'Prof. Maria Fernandez', roles: ['Panel Member'], currentAppearances: 2, totalAppearances: 3, compensation: 300, isFlagged: false, group: 3 },
        
        // Group 4 Panel
        { id: '13', name: 'Dr. Kevin Thompson', roles: ['Adviser'], currentAppearances: 4, totalAppearances: 5, compensation: 800, isFlagged: false, group: 4 },
        { id: '14', name: 'Prof. Diana Martinez', roles: ['Chairman'], currentAppearances: 3, totalAppearances: 4, compensation: 400, isFlagged: false, group: 4 },
        { id: '15', name: 'Dr. Alex Rodriguez', roles: ['Panel Member'], currentAppearances: 2, totalAppearances: 3, compensation: 300, isFlagged: false, group: 4 },
        { id: '16', name: 'Prof. Rachel Kim', roles: ['Panel Member'], currentAppearances: 1, totalAppearances: 2, compensation: 300, isFlagged: false, group: 4 },
        
        // Group 5 Panel
        { id: '17', name: 'Dr. Steven Park', roles: ['Adviser'], currentAppearances: 3, totalAppearances: 4, compensation: 800, isFlagged: false, group: 5 },
        { id: '18', name: 'Prof. Amanda Garcia', roles: ['Chairman'], currentAppearances: 2, totalAppearances: 3, compensation: 400, isFlagged: false, group: 5 },
        { id: '19', name: 'Dr. Brian Lee', roles: ['Panel Member'], currentAppearances: 4, totalAppearances: 5, compensation: 300, isFlagged: false, group: 5 },
        { id: '20', name: 'Prof. Jessica Wong', roles: ['Panel Member'], currentAppearances: 1, totalAppearances: 2, compensation: 300, isFlagged: false, group: 5 },
        
        // Group 6 Panel
        { id: '21', name: 'Dr. Michelle Davis', roles: ['Adviser'], currentAppearances: 3, totalAppearances: 4, compensation: 800, isFlagged: false, group: 6 },
        { id: '22', name: 'Prof. Daniel Chen', roles: ['Chairman'], currentAppearances: 2, totalAppearances: 3, compensation: 400, isFlagged: false, group: 6 },
        { id: '23', name: 'Dr. Laura Johnson', roles: ['Panel Member'], currentAppearances: 3, totalAppearances: 4, compensation: 300, isFlagged: false, group: 6 },
        { id: '24', name: 'Prof. Mark Anderson', roles: ['Panel Member'], currentAppearances: 2, totalAppearances: 3, compensation: 300, isFlagged: false, group: 6 },
        
        // Group 7 Panel
        { id: '25', name: 'Dr. Sophia Taylor', roles: ['Adviser'], currentAppearances: 4, totalAppearances: 5, compensation: 800, isFlagged: false, group: 7 },
        { id: '26', name: 'Prof. Nathan Brown', roles: ['Chairman'], currentAppearances: 1, totalAppearances: 2, compensation: 400, isFlagged: false, group: 7 },
        { id: '27', name: 'Dr. Emma Wilson', roles: ['Panel Member'], currentAppearances: 3, totalAppearances: 4, compensation: 300, isFlagged: false, group: 7 },
        { id: '28', name: 'Prof. Ryan Miller', roles: ['Panel Member'], currentAppearances: 2, totalAppearances: 3, compensation: 300, isFlagged: false, group: 7 },
        
        // Group 8 Panel
        { id: '29', name: 'Dr. Olivia Garcia', roles: ['Adviser'], currentAppearances: 2, totalAppearances: 3, compensation: 800, isFlagged: false, group: 8 },
        { id: '30', name: 'Prof. Lucas Martinez', roles: ['Chairman'], currentAppearances: 3, totalAppearances: 4, compensation: 400, isFlagged: false, group: 8 },
        { id: '31', name: 'Dr. Isabella Rodriguez', roles: ['Panel Member'], currentAppearances: 1, totalAppearances: 2, compensation: 300, isFlagged: false, group: 8 },
        { id: '32', name: 'Prof. Ethan Kim', roles: ['Panel Member'], currentAppearances: 4, totalAppearances: 5, compensation: 300, isFlagged: false, group: 8 },
        
        // Group 9 Panel
        { id: '33', name: 'Dr. Grace Liu', roles: ['Adviser'], currentAppearances: 3, totalAppearances: 4, compensation: 800, isFlagged: false, group: 9 },
        { id: '34', name: 'Prof. Mason Thompson', roles: ['Chairman'], currentAppearances: 2, totalAppearances: 3, compensation: 400, isFlagged: false, group: 9 },
        { id: '35', name: 'Dr. Lily Chen', roles: ['Panel Member'], currentAppearances: 3, totalAppearances: 4, compensation: 300, isFlagged: false, group: 9 },
        { id: '36', name: 'Prof. Jacob Davis', roles: ['Panel Member'], currentAppearances: 2, totalAppearances: 3, compensation: 300, isFlagged: false, group: 9 },
        
        // Shared Support Staff (across groups)
        { id: '37', name: 'Ms. Jennifer Kim', roles: ['Secretary'], currentAppearances: 15, totalAppearances: 24, compensation: 4800, isFlagged: false, group: 0 },
        { id: '38', name: 'Prof. Michael Santos', roles: ['Statistician'], currentAppearances: 20, totalAppearances: 27, compensation: 13500, isFlagged: false, group: 0 }
      ],
      createdAt: '2024-01-15T09:00:00Z',
      updatedAt: '2024-01-15T09:00:00Z'
    },
    // Add other requests for completeness
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
        }
      ],
      panelMembers: [],
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
        },
        {
          id: '3',
          students: ['Sarah Johnson', 'Michael Davis', 'Jennifer Lee'],
          researchTitle: 'Psychological Effects of Remote Learning on College Students',
          panelMembers: []
        },
        {
          id: '4',
          students: ['Carlos Mendez', 'Anna Rodriguez'],
          researchTitle: 'Family Therapy Approaches in Treating Adolescent Depression',
          panelMembers: []
        }
      ],
      panelMembers: [
        // Group 1 Panel - The Impact of Social Media on Adolescent Mental Health
        {
          id: '1',
          name: 'Dr. Rachel Williams',
          roles: ['Adviser'],
          currentAppearances: 6,
          requestAppearances: 1,
          totalAppearances: 7,
          compensation: 800,
          isFlagged: true, // Exceeds 5-appearance limit
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
          currentAppearances: 5,
          requestAppearances: 1,
          totalAppearances: 6,
          compensation: 300,
          isFlagged: true, // Exceeds 5-appearance limit
          group: 1
        },
        {
          id: '4',
          name: 'Prof. Carlos Lopez',
          roles: ['Panel Member'],
          currentAppearances: 6,
          requestAppearances: 1,
          totalAppearances: 7,
          compensation: 300,
          isFlagged: true, // Exceeds 5-appearance limit
          group: 1
        },
        // Group 2 Panel - Cognitive Behavioral Therapy Effectiveness in Anxiety Disorders
        {
          id: '5',
          name: 'Prof. Diana Kim',
          roles: ['Adviser'],
          currentAppearances: 8,
          requestAppearances: 1,
          totalAppearances: 9,
          compensation: 800,
          isFlagged: true, // Exceeds 5-appearance limit
          group: 2
        },
        {
          id: '6',
          name: 'Dr. Roberto Silva',
          roles: ['Chairman'],
          currentAppearances: 7,
          requestAppearances: 1,
          totalAppearances: 8,
          compensation: 400,
          isFlagged: true, // Exceeds 5-appearance limit
          group: 2
        },
        {
          id: '7',
          name: 'Dr. Jennifer Wong',
          roles: ['Panel Member'],
          currentAppearances: 6,
          requestAppearances: 1,
          totalAppearances: 7,
          compensation: 300,
          isFlagged: true, // Exceeds 5-appearance limit
          group: 2
        },
        {
          id: '8',
          name: 'Prof. Amanda Brown',
          roles: ['Panel Member'],
          currentAppearances: 5,
          requestAppearances: 1,
          totalAppearances: 6,
          compensation: 300,
          isFlagged: true, // Exceeds 5-appearance limit
          group: 2
        },
        // Group 3 Panel - Psychological Effects of Remote Learning on College Students
        {
          id: '9',
          name: 'Dr. Patricia Davis',
          roles: ['Adviser'],
          currentAppearances: 9,
          requestAppearances: 1,
          totalAppearances: 10,
          compensation: 800,
          isFlagged: true, // Exceeds 5-appearance limit
          group: 3
        },
        {
          id: '10',
          name: 'Prof. James Wilson',
          roles: ['Chairman'],
          currentAppearances: 6,
          requestAppearances: 1,
          totalAppearances: 7,
          compensation: 400,
          isFlagged: true, // Exceeds 5-appearance limit
          group: 3
        },
        {
          id: '11',
          name: 'Dr. Maria Santos',
          roles: ['Panel Member'],
          currentAppearances: 8,
          requestAppearances: 1,
          totalAppearances: 9,
          compensation: 300,
          isFlagged: true, // Exceeds 5-appearance limit
          group: 3
        },
        {
          id: '12',
          name: 'Prof. Lisa Garcia',
          roles: ['Panel Member'],
          currentAppearances: 7,
          requestAppearances: 1,
          totalAppearances: 8,
          compensation: 300,
          isFlagged: true, // Exceeds 5-appearance limit
          group: 3
        },
        // Group 4 Panel - Family Therapy Approaches in Treating Adolescent Depression
        {
          id: '13',
          name: 'Dr. Catherine Williams',
          roles: ['Adviser'],
          currentAppearances: 10,
          requestAppearances: 1,
          totalAppearances: 11,
          compensation: 800,
          isFlagged: true, // Exceeds 5-appearance limit
          group: 4
        },
        {
          id: '14',
          name: 'Prof. Michael Johnson',
          roles: ['Chairman'],
          currentAppearances: 8,
          requestAppearances: 1,
          totalAppearances: 9,
          compensation: 400,
          isFlagged: true, // Exceeds 5-appearance limit
          group: 4
        },
        {
          id: '15',
          name: 'Dr. Sarah Thompson',
          roles: ['Panel Member'],
          currentAppearances: 9,
          requestAppearances: 1,
          totalAppearances: 10,
          compensation: 300,
          isFlagged: true, // Exceeds 5-appearance limit
          group: 4
        },
        {
          id: '16',
          name: 'Prof. David Lee',
          roles: ['Panel Member'],
          currentAppearances: 6,
          requestAppearances: 1,
          totalAppearances: 7,
          compensation: 300,
          isFlagged: true, // Exceeds 5-appearance limit
          group: 4
        },
        // Shared Statistician - Available for all groups
        {
          id: '17',
          name: 'Prof. Michael Santos',
          roles: ['Statistician'],
          currentAppearances: 12,
          requestAppearances: 4, // For all 4 groups
          totalAppearances: 16,
          compensation: 2000, // 500 * 4 groups
          isFlagged: false, // Statistician has higher limit (30 appearances)
          group: 0 // Shared across all groups
        },
        // Shared Secretary - Available for all groups
        {
          id: '18',
          name: 'Ms. Jennifer Kim',
          roles: ['Secretary'],
          currentAppearances: 8,
          requestAppearances: 4, // For all 4 groups
          totalAppearances: 12,
          compensation: 800, // 200 * 4 groups
          isFlagged: false, // Secretary has higher limit
          group: 0 // Shared across all groups
        }
      ],
      justificationLetter: 'justification-BAP-SLAS-REQ-2024-003.pdf',
      createdAt: '2024-01-20T16:15:00Z',
      updatedAt: '2024-01-20T16:15:00Z'
    }
  ];

  const request = mockRequests.find(req => req.id === requestId);
  
  // Debug logging - remove this in production
  console.log('RequestDetails - requestId from URL:', requestId);
  console.log('RequestDetails - available request IDs:', mockRequests.map(r => r.id));
  console.log('RequestDetails - found request:', request ? request.id : 'NOT FOUND');

  if (!request) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Request Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">The requested panel request could not be found.</p>
          <button
            onClick={() => navigate('/approval-center')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Return to Defense Request
          </button>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: RequestStatus) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'Returned': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Pending': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Flagged': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
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

  const handleApprove = async () => {
    setLoading('approve', true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    // In real app, update request status
    setLoading('approve', false);
    navigate('/approval-center');
  };

  const handleReturn = async () => {
    setLoading('return', true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    // In real app, update request status
    setLoading('return', false);
    navigate('/approval-center');
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this defense request? This action cannot be undone.')) {
      setLoading('delete', true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      // In real app, delete the request
      setLoading('delete', false);
      navigate('/approval-center');
    }
  };

  // Calculate totals
  const totalAppearances = request.panelMembers.reduce((sum, member) => 
    sum + (member.totalAppearances || member.currentAppearances || 0), 0
  );
  const totalCompensation = request.panelMembers.reduce((sum, member) => 
    sum + (member.compensation || 0), 0
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/approval-center')}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Defense Request</span>
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(request.status)}`}>
                {getStatusIcon(request.status)}
                <span className="ml-2">{request.status}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Request Overview */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          {/* Summary Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Users className="w-6 h-6 text-blue-600" />
                <div>
                  <div className="text-sm text-blue-600 dark:text-blue-400">Total Appearances</div>
                  <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{totalAppearances}</div>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Banknote className="w-6 h-6 text-green-600" />
                <div>
                  <div className="text-sm text-green-600 dark:text-green-400">Total Consolidated</div>
                  <div className="text-2xl font-bold text-green-900 dark:text-green-100">₱{totalCompensation.toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                {request.program}
              </h1>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <GraduationCap className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Research Teacher:</span> {request.programChair}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <BookOpen className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Department:</span> {request.department}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium">School year:</span> {request.schoolYear}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Semester:</span> {request.semester}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium">Defense Type:</span> {request.defenseType} Defense
                  </span>
                </div>
              </div>
            </div>
            
            {/* Noted By Section */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100 w-20 flex-shrink-0">Noted by:</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-900 dark:text-gray-100">
                        {request.department === 'SEICT' ? (request.programChair || 'Engr. Roberto Martinez') : 
                         request.department === 'SLAS' ? (request.programChair || 'Dr. Sarah Martinez') : 
                         (request.programChair || 'Engr. Roberto Martinez')}
                      </span>
                      <span className="text-sm text-green-600 dark:text-green-400 font-medium">APPROVED</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      PROGRAM CHAIR
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100 w-20 flex-shrink-0">Noted by:</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-900 dark:text-gray-100">
                        {request.department === 'SEICT' ? 'Engr. Michael Anderson' : 
                         request.department === 'SLAS' ? 'Dr. Maria Elena Rodriguez' : 
                         'Engr. Michael Anderson'}
                      </span>
                      <span className="text-sm text-green-600 dark:text-green-400 font-medium">APPROVED</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      Dean, {request.department}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { key: 'overview', label: 'Overview', icon: BookOpen },
              { key: 'consolidated', label: 'Research Committee Consolidated', icon: Banknote },
              { key: 'groups', label: 'Research Committee Appearance', icon: Users }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as any)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === key
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'overview' && (
            <>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Request Summary</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">{request.studentGroups.length}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Student Groups</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                      {request.studentGroups.reduce((sum, group) => sum + group.students.length, 0)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Total Students</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">{request.panelMembers.length}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Research Committee</div>
                  </div>
                </div>
              </div>

              {/* Student group and research appearance of Committee */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
                  <UserCheck className="w-5 h-5 mr-2 text-green-600" />
                  Student group and research appearance of Committee
                </h2>
                
                {/* Group Panel Members */}
                {Array.from({ length: 9 }, (_, i) => i + 1).map((groupNum) => {
                  const groupMembers = request.panelMembers.filter(member => member.group === groupNum);
                  const sharedStaff = request.panelMembers.filter(member => member.group === 0);
                  const allGroupMembers = [...groupMembers, ...sharedStaff];
                  const groupInfo = request.studentGroups.find(group => parseInt(group.id) === groupNum);
                  if (groupMembers.length === 0) return null;
                  
                  return (
                    <div key={groupNum} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                          Group {groupNum} Research Committee
                        </h3>
                        
                        {/* Group Information */}
                        {groupInfo && (
                          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
                            <div className="space-y-2">
                              <div>
                                <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">Research Title:</h4>
                                <p className="text-sm text-blue-900 dark:text-blue-100 font-medium">{groupInfo.researchTitle}</p>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">Students:</h4>
                                <p className="text-sm text-blue-900 dark:text-blue-100">{groupInfo.students.join(', ')}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Role</th>
                              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Current Appearance</th>
                              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total Appearance</th>
                              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total Fee</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                            {allGroupMembers.map((member) => (
                              <tr key={member.id} className={`hover:bg-gray-50 dark:hover:bg-gray-700 ${member.isFlagged ? 'bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500' : ''}`}>
                                <td className={`px-4 py-3 text-sm font-medium ${member.isFlagged ? 'text-red-900 dark:text-red-100' : 'text-gray-900 dark:text-gray-100'}`}>
                                  {member.name}
                                  {member.isFlagged && (
                                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200">
                                      FLAGGED
                                    </span>
                                  )}
                                </td>
                                <td className={`px-4 py-3 text-sm ${member.isFlagged ? 'text-red-700 dark:text-red-300' : 'text-gray-700 dark:text-gray-300'}`}>
                                  {member.roles.join(', ')}
                                </td>
                                <td className={`px-4 py-3 text-sm text-center ${member.isFlagged ? 'text-red-700 dark:text-red-300' : 'text-gray-700 dark:text-gray-300'}`}>
                                  {member.currentAppearances}
                                </td>
                                <td className={`px-4 py-3 text-sm text-center font-medium ${member.isFlagged ? 'text-red-900 dark:text-red-100' : 'text-gray-900 dark:text-gray-100'}`}>
                                  {member.currentAppearances + 1}
                                  {member.isFlagged && (member.currentAppearances + 1) > 5 && (
                                    <span className="ml-1 text-red-600 dark:text-red-400 font-bold">
                                      (Exceeds Limit: 5)
                                    </span>
                                  )}
                                </td>
                                <td className={`px-4 py-3 text-sm text-center font-medium ${member.isFlagged ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                                  ₱{(member.compensation || 0).toLocaleString()}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        
                        {/* Group Consolidated Total */}
                        <div className="mt-4 flex justify-end">
                          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg px-4 py-3">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium text-green-800 dark:text-green-200">
                                Group {groupNum} Consolidated Total:
                              </span>
                              <span className="text-lg font-bold text-green-900 dark:text-green-100">
                                ₱{allGroupMembers.reduce((sum, member) => sum + (member.compensation || 0), 0).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

            </>
          )}

          {activeTab === 'consolidated' && (
            <div className="space-y-8">
              {/* Breakdown of Fees */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                  <Banknote className="w-5 h-5 mr-2 text-green-600" />
                  Breakdown of Fees
                </h2>
                
                {request.department === 'SEICT' ? (
                  <div className="overflow-x-auto">
                    <table className="w-full border border-gray-300 dark:border-gray-600">
                      <thead>
                        <tr className="bg-green-600 text-white">
                          <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-sm font-medium">
                            {request.department} Research Committee
                          </th>
                          <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center text-sm font-medium min-w-[100px]">ADVISER</th>
                          <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center text-sm font-medium min-w-[100px]">CHAIR PANEL</th>
                          <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center text-sm font-medium min-w-[100px]">PANEL MEMBER</th>
                          <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center text-sm font-medium min-w-[100px]">SECRETARY</th>
                          <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center text-sm font-medium min-w-[100px]">TOTAL</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800">
                        {request.panelMembers.map((member, index) => {
                          const role = member.roles[0];
                          const roleKey = role === 'Adviser' ? 'ADVISER' : 
                                        role === 'Chairman' || role === 'Chairperson' ? 'CHAIR PANEL' :
                                        role === 'Panel Member' ? 'PANEL MEMBER' :
                                        role === 'Secretary' ? 'SECRETARY' : '';
                          
                          return (
                            <tr key={member.id} className={`${member.isFlagged ? 'bg-red-50 dark:bg-red-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
                              <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-sm">
                                <span className="font-medium text-gray-900 dark:text-gray-100">
                                  {index + 1}. {member.name.replace('Dr. ', 'Engr. ').replace('Prof. ', 'Engr. ')}
                                </span>
                              </td>
                              <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-sm">
                                {roleKey === 'ADVISER' ? `₱${member.compensation?.toLocaleString() || '800'}` : ''}
                              </td>
                              <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-sm">
                                {roleKey === 'CHAIR PANEL' ? `₱${member.compensation?.toLocaleString() || '400'}` : ''}
                              </td>
                              <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-sm">
                                {roleKey === 'PANEL MEMBER' ? `₱${member.compensation?.toLocaleString() || '300'}` : ''}
                              </td>
                              <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-sm">
                                {roleKey === 'SECRETARY' ? `₱${member.compensation?.toLocaleString() || '300'}` : ''}
                              </td>
                              <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-sm font-medium">
                                ₱{member.compensation?.toLocaleString() || '0'}
                              </td>
                            </tr>
                          );
                        })}
                        {/* Total Row */}
                        <tr className="bg-green-600 text-white font-bold">
                          <td colSpan={5} className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-sm">
                            Total Amount Requested
                          </td>
                          <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-sm">
                            ₱{request.panelMembers.reduce((sum, m) => sum + (m.compensation || 0), 0).toLocaleString()}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ) : (
                  /* Non-SEICT departments - different format */
                  <div className="overflow-x-auto">
                    <table className="w-full border border-gray-300 dark:border-gray-600">
                      <thead>
                        <tr className="bg-green-600 text-white">
                          <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-sm font-medium">Faculty Member</th>
                          <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center text-sm font-medium">Role</th>
                          <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center text-sm font-medium">Group</th>
                          <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center text-sm font-medium">Fee</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-gray-800">
                        {request.panelMembers.map((member, index) => (
                          <tr key={member.id} className={`${member.isFlagged ? 'bg-red-50 dark:bg-red-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">
                              {index + 1}. {member.name}
                              {member.isFlagged && <span className="ml-2 text-red-500 font-bold">⚠️</span>}
                            </td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-sm">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                member.roles[0] === 'Adviser' ? 'bg-yellow-100 text-yellow-800' :
                                member.roles[0] === 'Chairman' ? 'bg-green-100 text-green-800' :
                                member.roles[0] === 'Panel Member' ? 'bg-blue-100 text-blue-800' :
                                member.roles[0] === 'Statistician' ? 'bg-purple-100 text-purple-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {member.roles[0]}
                              </span>
                            </td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-sm">
                              {member.group && member.group > 0 ? `Group ${member.group}` : 'All Groups'}
                            </td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-sm font-medium">
                              ₱{member.compensation?.toLocaleString() || '0'}
                            </td>
                          </tr>
                        ))}
                        <tr className="bg-green-600 text-white font-bold">
                          <td colSpan={3} className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-right text-sm">
                            Total Amount Requested:
                          </td>
                          <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-sm">
                            ₱{request.panelMembers.reduce((sum, m) => sum + (m.compensation || 0), 0).toLocaleString()}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'groups' && (
            <div className="space-y-8">
              {/* Research Committee Appearance Table */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
                  <UserCheck className="w-5 h-5 mr-2 text-green-600" />
                  Research Committee Appearance
                </h2>
                
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-300 dark:border-gray-600">
                    <thead>
                      <tr className="bg-green-600 text-white">
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-left text-sm font-medium">
                          {request.department} Research Committee
                        </th>
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center text-sm font-medium min-w-[100px]">ADVISER</th>
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center text-sm font-medium min-w-[100px]">CHAIR PANEL</th>
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center text-sm font-medium min-w-[100px]">PANEL MEMBER</th>
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center text-sm font-medium min-w-[100px]">SECRETARY</th>
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center text-sm font-medium min-w-[100px]">STATISTICIAN</th>
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center text-sm font-medium min-w-[100px]">TOTAL</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800">
                      {request.panelMembers.map((member, index) => {
                        const role = member.roles[0];
                        const roleKey = role === 'Adviser' ? 'ADVISER' : 
                                      role === 'Chairman' || role === 'Chairperson' ? 'CHAIR PANEL' :
                                      role === 'Panel Member' ? 'PANEL MEMBER' :
                                      role === 'Secretary' ? 'SECRETARY' :
                                      role === 'Statistician' ? 'STATISTICIAN' : '';
                        
                        return (
                          <tr key={member.id} className={`${member.isFlagged ? 'bg-red-50 dark:bg-red-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-sm">
                              <span className="font-medium text-gray-900 dark:text-gray-100">
                                {index + 1}. {member.name.replace('Dr. ', 'Engr. ').replace('Prof. ', 'Engr. ')}
                              </span>
                              {member.isFlagged && (
                                <span className="ml-2 text-red-500 font-bold">⚠️ FLAGGED</span>
                              )}
                            </td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-sm">
                              {roleKey === 'ADVISER' ? (member.currentAppearances + 1) : ''}
                            </td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-sm">
                              {roleKey === 'CHAIR PANEL' ? (member.currentAppearances + 1) : ''}
                            </td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-sm">
                              {roleKey === 'PANEL MEMBER' ? (member.currentAppearances + 1) : ''}
                            </td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-sm">
                              {roleKey === 'SECRETARY' ? 9 : ''}
                            </td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-sm">
                              {roleKey === 'STATISTICIAN' ? 9 : ''}
                            </td>
                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-sm font-medium">
                              {role === 'Secretary' ? 9 : role === 'Statistician' ? 9 : (member.currentAppearances + 1)}
                              {member.isFlagged && (
                                <div className="text-xs text-red-600 mt-1">Exceeds Limit</div>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                      {/* Total Row */}
                      <tr className="bg-green-600 text-white font-bold">
                        <td colSpan={6} className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-sm">
                          Total Appearances Requested
                        </td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center text-sm">
                          {request.panelMembers.reduce((sum, m) => {
                            const role = m.roles[0];
                            return sum + (role === 'Secretary' ? 9 : role === 'Statistician' ? 9 : (m.currentAppearances + 1));
                          }, 0)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Justification Letter Section */}
        {(request.status === 'Flagged' && request.justificationLetter) && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Justification Letter
            </h3>
            
            {/* Justification Info */}
            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 mb-4">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h4 className="text-sm font-semibold text-purple-800 dark:text-purple-200">
                    Required for Flagged Requests
                  </h4>
                  <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">
                    This request has been flagged and requires a justification letter explaining why the faculty members with excessive appearances should continue to participate in the defense panels.
                  </p>
                </div>
              </div>
            </div>

            {/* Document Info and Actions */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                    <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">
                      {request.justificationLetter || 'justification-BAP-SLAS-REQ-2024-003.pdf'}
                    </h4>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      DOCX Document • 2.3 MB • Uploaded {new Date(request.updatedAt).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      Contains justification for {request.panelMembers.filter(member => member.isFlagged).length} flagged faculty members
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      // Open document viewer modal
                      document.getElementById('justification-modal')?.classList.remove('hidden');
                    }}
                    className="flex items-center space-x-2 px-3 py-2 text-sm text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-150"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span>View Letter</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      // Download document
                      const link = document.createElement('a');
                      link.href = '/documents/samples/justification_letter_sample.docx';
                      link.download = request.justificationLetter || 'justification-letter.docx';
                      link.click();
                    }}
                    className="flex items-center space-x-2 px-3 py-2 text-sm text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-all duration-150"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Document Preview Section */}
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Document Summary</h5>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <p><strong>Subject:</strong> Justification for Faculty Panel Appearance Limit Exemption - Psychology Program</p>
                <p><strong>Reason:</strong> Specialized expertise required for psychology research methodology and clinical assessment techniques</p>
                <p><strong>Affected Faculty:</strong> {request.panelMembers.filter(member => member.isFlagged).length} members with {Math.max(...request.panelMembers.filter(member => member.isFlagged).map(member => member.totalAppearances))} total appearances</p>
                <p><strong>Duration:</strong> Current semester only, subject to review</p>
              </div>
            </div>
          </div>
        )}

        {/* Justification Document Viewer Modal */}
        <div id="justification-modal" className="fixed inset-0 z-50 hidden overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"></div>
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 w-full max-w-4xl max-h-[90vh] overflow-hidden">
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200">
                    Justification Letter - {request.program}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {request.justificationLetter || 'justification-BAP-SLAS-REQ-2024-003.pdf'}
                  </p>
                </div>
                <button
                  onClick={() => document.getElementById('justification-modal')?.classList.add('hidden')}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Modal Body - Document Content */}
              <div className="px-6 py-4 overflow-y-auto max-h-[70vh]">
                <div className="bg-white dark:bg-gray-900 p-8 rounded-lg border shadow-inner">
                  {/* Document Header */}
                  <div className="text-center mb-8 border-b pb-4">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">JUSTIFICATION LETTER</h1>
                    <h2 className="text-lg text-gray-700 dark:text-gray-300 mt-2">Faculty Panel Appearance Limit Exemption Request</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Bachelor of Arts in Psychology Program - SLAS Department</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">Date: {new Date(request.updatedAt).toLocaleDateString()}</p>
                  </div>

                  {/* Document Content */}
                  <div className="space-y-6 text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
                    <p className="font-medium">To: Vice President for Academic Affairs</p>
                    <p className="font-medium">From: Dr. Sarah Martinez, Program Chair - Psychology Department</p>
                    <p className="font-medium">Subject: Request for Faculty Panel Appearance Exemption - AY 2024-2025</p>

                    <div className="space-y-4">
                      <p>Dear VPAA,</p>
                      
                      <p>I am writing to request an exemption from the standard 5-appearance limit per semester for several faculty members in our Psychology program who are essential for the upcoming thesis defense panels.</p>
                      
                      <p><strong>Background:</strong></p>
                      <p>The Psychology program requires specialized expertise in clinical assessment, research methodology, and statistical analysis that is not readily available across all faculty members. The following faculty members possess unique qualifications that make them indispensable for our students' thesis defenses:</p>
                      
                      <div className="ml-4">
                        {request.panelMembers.filter(member => member.isFlagged).map((member, index) => (
                          <p key={member.id} className="mb-2">
                            <strong>{index + 1}. {member.name}</strong> ({member.roles.join(', ')}) - {member.totalAppearances} appearances
                          </p>
                        ))}
                      </div>
                      
                      <p><strong>Justification:</strong></p>
                      <p>1. <strong>Specialized Expertise:</strong> These faculty members have advanced training in psychological assessment techniques and research methodologies that are critical for evaluating psychology thesis projects.</p>
                      
                      <p>2. <strong>Student Quality Assurance:</strong> Our psychology students' research topics require evaluators who understand clinical psychology, developmental psychology, and advanced statistical methods.</p>
                      
                      <p>3. <strong>Limited Available Faculty:</strong> The Psychology department has a smaller faculty pool compared to other programs, making it necessary to rely more heavily on our most qualified members.</p>
                      
                      <p>4. <strong>Temporary Situation:</strong> This is a one-time request for the current semester due to an unusually high number of thesis defenses (4 groups) scheduled within the same period.</p>
                      
                      <p><strong>Mitigation Measures:</strong></p>
                      <p>• We will ensure these faculty members receive additional compensation as per university policy</p>
                      <p>• We are actively recruiting additional qualified faculty for future semesters</p>
                      <p>• We will distribute the workload more evenly in subsequent academic periods</p>
                      
                      <p>I respectfully request your approval for this exemption to ensure the quality and integrity of our students' thesis defense process. The total additional budget impact is ₱15,600 for all affected faculty members.</p>
                      
                      <p>Thank you for your consideration. I am available to discuss this matter further at your convenience.</p>
                      
                      <p className="mt-8">
                        Respectfully,<br/>
                        <strong>Dr. Sarah Martinez</strong><br/>
                        Program Chair, Psychology Department<br/>
                        School of Liberal Arts and Sciences
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                <button
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = '/documents/samples/justification_letter_sample.docx';
                    link.download = request.justificationLetter || 'justification-letter.docx';
                    link.click();
                  }}
                  className="flex items-center space-x-2 px-4 py-2 text-sm text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors duration-150"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Download Original</span>
                </button>
                
                <button
                  onClick={() => document.getElementById('justification-modal')?.classList.add('hidden')}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors duration-150"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {(request.status === 'Pending' || request.status === 'Flagged') && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Review Actions</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Review the request details and take appropriate action.
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleDelete}
                  disabled={loadingStates.delete}
                  className="flex items-center space-x-2 px-6 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 dark:text-red-400 dark:border-red-600 dark:hover:bg-red-900/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loadingStates.delete ? (
                    <ButtonLoader className="w-4 h-4" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                  <span>Delete Request</span>
                </button>
                <button
                  onClick={handleReturn}
                  disabled={loadingStates.return}
                  className="flex items-center space-x-2 px-6 py-2 border border-orange-300 text-orange-700 rounded-lg hover:bg-orange-50 dark:text-orange-400 dark:border-orange-600 dark:hover:bg-orange-900/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loadingStates.return ? (
                    <ButtonLoader className="w-4 h-4" />
                  ) : (
                    <RotateCcw className="w-4 h-4" />
                  )}
                  <span>Return for Corrections</span>
                </button>
                <button
                  onClick={handleApprove}
                  disabled={loadingStates.approve}
                  className="flex items-center space-x-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loadingStates.approve ? (
                    <ButtonLoader className="w-4 h-4" />
                  ) : (
                    <CheckCircle className="w-4 h-4" />
                  )}
                  <span>Approve Request</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestDetails;