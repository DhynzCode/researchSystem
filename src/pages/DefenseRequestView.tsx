import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Calendar, Book, Users, User, FileText, CheckCircle, RotateCcw } from 'lucide-react';
import { DefenseRequest, DefenseRequestStatus } from '../types';
import ProgressStepper from '../components/ProgressStepper';
import PanelMembersDetailsTable, { PanelMemberDetail } from '../components/PanelMembersDetailsTable';

const DefenseRequestView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const requestId = id || '2';
  const [loading, setLoading] = useState(false);
  
  // Get mock data based on request ID
  const getMockRequest = (reqId: string) => {
    if (reqId === 'REQ-2024-001') {
      return {
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
        requesterName: 'Dr. Roberto Martinez',
        programChair: 'Dr. Roberto Martinez',
        department: 'SEICT',
        studentGroups: [
          {
            id: '1',
            researchTitle: 'Mobile Application for Campus Navigation',
            adviser: 'Dr. John Doe',
            students: ['John Doe', 'Jane Smith']
          }
        ],
        panelMembers: [
          {
            id: '1',
            name: 'Dr. Maria Santos',
            role: 'Chairperson',
            isFlagged: false,
            currentAppearances: 3,
            requestAppearances: 1,
            compensation: 450,
            group: 1
          },
          {
            id: '2',
            name: 'Prof. Carlos Mendez',
            role: 'Panel Member',
            isFlagged: false,
            currentAppearances: 3,
            requestAppearances: 1,
            compensation: 400,
            group: 1
          }
        ],
        panelAssignments: [
          {
            groupId: '1',
            chairman: 'Dr. Maria Santos',
            panelMembers: ['Prof. Carlos Mendez']
          }
        ]
      };
    }
    // Default mock request for other IDs
    return {
      id: '2',
      program: 'Bachelor of Science in Information Technology (BSIT)',
      defenseType: 'Final',
      schoolYear: '2023-2024',
      semester: 'Second Semester',
      status: 'Budget Approved',
      isFlagged: false,
      createdAt: '2024-01-10T09:15:00Z',
      updatedAt: '2024-01-20T14:45:00Z',
      requesterId: 'rt001',
      requesterName: 'engr. Maria Santos',
      programChair: 'enr. Maria Santos',
      department: 'SEICT',
      studentGroups: [
        {
          id: '1',
          researchTitle: 'AI-Powered Student Management System',
          adviser: 'Dr. John Doe',
          students: ['Alice Johnson', 'Bob Smith', 'Carol Davis']
        },
        {
          id: '2',
          researchTitle: 'Blockchain-Based Voting System',
          adviser: 'Prof. Jane Smith',
          students: ['David Wilson', 'Eva Brown']
        }
      ],
      panelMembers: [
        {
          id: '1',
          name: 'Dr. Michael Chen',
          role: 'Advisor',
          isFlagged: false,
          currentAppearances: 2,
          requestAppearances: 1,
          compensation: 800,
          group: 1
        },
        {
          id: '2',
          name: 'Dr. Maria Santos',
          role: 'Chairperson',
          isFlagged: false,
          currentAppearances: 3,
          requestAppearances: 1,
          compensation: 450,
          group: 1
        },
        {
          id: '3',
          name: 'Prof. Juan dela Cruz',
          role: 'Panel Member',
          isFlagged: false,
          currentAppearances: 2,
          requestAppearances: 1,
          compensation: 400,
          group: 1
        },
        {
          id: '4',
          name: 'Dr. Ana Reyes',
          role: 'Panel Member',
          isFlagged: false,
          currentAppearances: 1,
          requestAppearances: 1,
          compensation: 400,
          group: 1
        },
        {
          id: '5',
          name: 'Dr. Elena Rodriguez',
          role: 'Panel Member',
          isFlagged: false,
          currentAppearances: 1,
          requestAppearances: 1,
          compensation: 400,
          group: 1
        },
        {
          id: '6',
          name: 'Prof. Carlos Mendez',
          role: 'Panel Member',
          isFlagged: false,
          currentAppearances: 3,
          requestAppearances: 1,
          compensation: 400,
          group: 1
        },
        {
          id: '7',
          name: 'Prof. Sarah Lee',
          role: 'Advisor',
          isFlagged: false,
          currentAppearances: 1,
          requestAppearances: 1,
          compensation: 800,
          group: 2
        },
        {
          id: '8',
          name: 'Dr. Roberto Silva',
          role: 'Chairperson',
          isFlagged: false,
          currentAppearances: 2,
          requestAppearances: 1,
          compensation: 450,
          group: 2
        },
        {
          id: '9',
          name: 'Prof. Lisa Garcia',
          role: 'Panel Member',
          isFlagged: false,
          currentAppearances: 1,
          requestAppearances: 1,
          compensation: 400,
          group: 2
        },
        {
          id: '10',
          name: 'Dr. Michael Torres',
          role: 'Panel Member',
          isFlagged: false,
          currentAppearances: 2,
          requestAppearances: 1,
          compensation: 400,
          group: 2
        },
        {
          id: '11',
          name: 'Prof. Sarah Kim',
          role: 'Panel Member',
          isFlagged: false,
          currentAppearances: 1,
          requestAppearances: 1,
          compensation: 400,
          group: 2
        },
        {
          id: '12',
          name: 'Dr. James Wilson',
          role: 'Panel Member',
          isFlagged: false,
          currentAppearances: 3,
          requestAppearances: 1,
          compensation: 400,
          group: 2
        }
      ],
      panelAssignments: [
        {
          groupId: '1',
          chairman: 'Dr. Maria Santos',
          panelMembers: ['Prof. Juan dela Cruz', 'Dr. Ana Reyes', 'Dr. Elena Rodriguez', 'Prof. Carlos Mendez']
        },
        {
          groupId: '2',
          chairman: 'Dr. Roberto Silva',
          panelMembers: ['Prof. Lisa Garcia', 'Dr. Michael Torres', 'Prof. Sarah Kim', 'Dr. James Wilson']
        }
      ]
    };
  };
  
  // Mock data - in real app, this would be fetched based on requestId
  const mockRequest: DefenseRequest & {
    programChair: string;
    department: string;
    studentGroups: Array<{
      id: string;
      researchTitle: string;
      adviser: string;
      students: string[];
    }>;
    panelMembers: Array<{
      id: string;
      name: string;
      role: string;
      isFlagged: boolean;
      currentAppearances: number;
      requestAppearances: number;
      compensation: number;
      group?: number;
    }>;
    panelAssignments: Array<{
      groupId: string;
      chairman: string;
      panelMembers: string[];
    }>;
  } = getMockRequest(requestId) as any;

  const getStatusBadge = (status: DefenseRequestStatus) => {
    const statusConfig = {
      'Draft': { bg: 'bg-gray-100', text: 'text-gray-800 dark:text-gray-200', label: 'Draft' },
      'Research Center Approved': { bg: 'bg-blue-100', text: 'text-blue-800', label: 'RC Approved' },
      'VPAA Approved': { bg: 'bg-indigo-100', text: 'text-indigo-800', label: 'VPAA Approved' },
      'Budget Approved': { bg: 'bg-green-100', text: 'text-green-800', label: 'Budget Approved' },
      'Returned for Corrections': { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Returned' },
      'Rejected': { bg: 'bg-red-100', text: 'text-red-800', label: 'Rejected' }
    };

    const config = statusConfig[status];
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const canEdit = (status: DefenseRequestStatus) => {
    return status === 'Draft' || status === 'Returned for Corrections';
  };

  const handleBack = () => {
    navigate('/request-defense');
  };

  const handleEdit = () => {
    navigate(`/request-defense/${requestId}/edit`);
  };

  const handleApprove = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Request approved:', requestId);
    setLoading(false);
    // Could redirect or show success message
  };

  const handleReturn = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Request returned for corrections:', requestId);
    setLoading(false);
    // Could redirect or show success message
  };

  // Convert mock data to PanelMemberDetail format
  const convertToPanelMemberDetails = (): PanelMemberDetail[] => {
    return mockRequest.panelMembers.map(member => ({
      id: member.id,
      name: member.name,
      groupAssignment: member.group ? `Grp ${member.group}` : undefined,
      role: member.role as any, // Cast to include Advisor
      currentAppearances: member.currentAppearances,
      requestAppearances: member.requestAppearances,
      totalAppearances: member.currentAppearances + member.requestAppearances,
      compensation: member.compensation,
      isFlagged: member.currentAppearances + member.requestAppearances > 5
    }));
  };

  const panelMemberDetails = convertToPanelMemberDetails();

  return (
    <div className="max-w-6xl mx-auto space-y-6 px-4 sm:px-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleBack}
            className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-200">Defense Request Details</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Request ID: {mockRequest.id}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {getStatusBadge(mockRequest.status)}
          {canEdit(mockRequest.status) && (
            <button
              onClick={handleEdit}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Edit className="w-4 h-4" />
              <span>Edit Request</span>
            </button>
          )}
        </div>
      </div>

      {/* Request Information */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Request Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <User className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Program Chair / Research Teacher</p>
                <p className="text-gray-800 dark:text-gray-200">{mockRequest.programChair}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Book className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Program</p>
                <p className="text-gray-800 dark:text-gray-200">{mockRequest.program}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Users className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Defense Type</p>
                <p className="text-gray-800 dark:text-gray-200">{mockRequest.defenseType}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">School Year</p>
                <p className="text-gray-800 dark:text-gray-200">{mockRequest.schoolYear}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Semester</p>
                <p className="text-gray-800 dark:text-gray-200">{mockRequest.semester}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Department</p>
                <p className="text-gray-800 dark:text-gray-200">{mockRequest.department}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Student Groups */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Student Groups & Research Titles</h2>
        
        {/* Panel Requirements Info */}
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Panel Composition Requirements</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-blue-700 dark:text-blue-300"><strong>Chairman:</strong> 1 required</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-blue-700 dark:text-blue-300"><strong>Panel Members:</strong> 4 required</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-blue-700 dark:text-blue-300"><strong>Total:</strong> 5 panelists per group</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {mockRequest.studentGroups.map((group, index) => {
            const assignment = mockRequest.panelAssignments.find(a => a.groupId === group.id);
            return (
              <div key={group.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4 text-lg">Group {index + 1}</h3>
                
                <div className="space-y-4">
                  {/* Basic Info */}
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Research Title</p>
                    <p className="text-gray-800 dark:text-gray-200 font-medium">{group.researchTitle}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Research Adviser</p>
                      <p className="text-gray-800 dark:text-gray-200">{group.adviser}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Students</p>
                      <p className="text-gray-800 dark:text-gray-200">{group.students.join(', ')}</p>
                    </div>
                  </div>

                  {/* Panel Composition */}
                  {assignment && (
                    <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Panel Composition</h4>
                      <div className="space-y-2">
                        {/* Chairman */}
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">C</span>
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Chairman: </span>
                            <span className="text-gray-800 dark:text-gray-200">{assignment.chairman}</span>
                          </div>
                        </div>
                        
                        {/* Panel Members */}
                        <div className="ml-9 space-y-1">
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Panel Members:</span>
                          {assignment.panelMembers.map((member, idx) => (
                            <div key={idx} className="flex items-center space-x-2 ml-2">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                              <span className="text-gray-800 dark:text-gray-200 text-sm">{member}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Panel Members Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Panel Members Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{mockRequest.panelMembers.length}</div>
            <div className="text-sm text-blue-700 dark:text-blue-300">Total Panel Members</div>
            <div className="text-xs text-blue-600 dark:text-blue-400">(across {mockRequest.studentGroups.length} groups)</div>
          </div>
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              {mockRequest.panelMembers.filter(m => m.currentAppearances + m.requestAppearances > 5).length}
            </div>
            <div className="text-sm text-red-700 dark:text-red-300">Flagged Faculty</div>
            <div className="text-xs text-red-600 dark:text-red-400">(exceeding 5 appearances)</div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              ₱{mockRequest.panelMembers.reduce((sum, m) => sum + m.compensation, 0).toLocaleString()}
            </div>
            <div className="text-sm text-green-700 dark:text-green-300">Total Compensation</div>
            <div className="text-xs text-green-600 dark:text-green-400">for this request</div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              ₱{(mockRequest.panelMembers.reduce((sum, m) => sum + m.compensation, 0) / 
                mockRequest.studentGroups.reduce((sum, g) => sum + g.students.length, 0)).toLocaleString()}
            </div>
            <div className="text-sm text-purple-700 dark:text-purple-300">Per-Student Share</div>
            <div className="text-xs text-purple-600 dark:text-purple-400">
              ({mockRequest.studentGroups.reduce((sum, g) => sum + g.students.length, 0)} students total)
            </div>
          </div>
        </div>
      </div>

      {/* Panel Members Details Table - Updated Component */}
      <PanelMembersDetailsTable 
        panelMembers={panelMemberDetails}
      />

      {/* Action Buttons */}
      {mockRequest.status === 'Research Center Approved' && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Review Actions</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleApprove}
              disabled={loading}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 hover:shadow-lg flex-1"
            >
              <CheckCircle className="w-5 h-5" />
              <span>{loading ? 'Processing...' : 'Approve Request'}</span>
            </button>
            <button
              onClick={handleReturn}
              disabled={loading}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 hover:shadow-lg flex-1"
            >
              <RotateCcw className="w-5 h-5" />
              <span>{loading ? 'Processing...' : 'Return for Corrections'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Progress Stepper */}
      <ProgressStepper 
        currentStatus={mockRequest.status}
        isFlagged={mockRequest.isFlagged}
      />
    </div>
  );
};

export default DefenseRequestView;