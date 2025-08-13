import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  Book, 
  Users, 
  User, 
  FileText, 
  CheckCircle, 
  RotateCcw, 
  MessageSquare,
  GraduationCap,
  Clock,
  DollarSign,
  Flag,
  AlertTriangle,
  Download,
  Eye,
  Share,
  ExternalLink
} from 'lucide-react';
import { PanelRequest, RequestStatus } from '../types';
import { ButtonLoader } from '../components/Loading';

const ApprovalRequestView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [reviewComment, setReviewComment] = useState('');

  // Mock data - same as ApprovalCenter
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
          requestAppearances: 1,
          totalAppearances: 4,
          compensation: 800,
          isFlagged: false,
          group: 1
        },
        {
          id: '2',
          name: 'Dr. Michael Chen',
          roles: ['Advisor'],
          currentAppearances: 2,
          requestAppearances: 1,
          totalAppearances: 3,
          compensation: 800,
          isFlagged: false,
          group: 2
        },
        {
          id: '3',
          name: 'Dr. Maria Santos',
          roles: ['Chairperson'],
          currentAppearances: 3,
          requestAppearances: 1,
          totalAppearances: 4,
          compensation: 400,
          isFlagged: false,
          group: 1
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
          isFlagged: true,
          group: 1
        },
        {
          id: '11',
          name: 'Prof. Michael Santos',
          roles: ['Statistician'],
          currentAppearances: 25,
          requestAppearances: 2,
          totalAppearances: 27,
          compensation: 1000,
          isFlagged: false,
          group: 0
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
    }
  ];

  const request = mockRequests.find(r => r.id === id);

  if (!request) {
    return (
      <div className="max-w-6xl mx-auto space-y-6 px-4 sm:px-0">
        <div className="text-center py-12">
          <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Request not found</p>
        </div>
      </div>
    );
  }

  const handleBack = () => {
    navigate('/approval-center');
  };

  const handleApprove = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Request approved:', id);
    setLoading(false);
    navigate('/approval-center');
  };

  const handleReturn = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Request returned for corrections:', id);
    setLoading(false);
    navigate('/approval-center');
  };

  const getStatusBadge = (status: RequestStatus) => {
    const statusConfig = {
      'Pending': { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending Review' },
      'Approved': { bg: 'bg-green-100', text: 'text-green-800', label: 'Approved' },
      'Returned': { bg: 'bg-orange-100', text: 'text-orange-800', label: 'Returned' },
      'Flagged': { bg: 'bg-red-100', text: 'text-red-800', label: 'Flagged' }
    };

    const config = statusConfig[status];
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

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
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-200">Request Details</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Request ID: {request.id}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {getStatusBadge(request.status)}
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
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Program Chair</p>
                <p className="text-gray-800 dark:text-gray-200">{request.programChair}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Book className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Program</p>
                <p className="text-gray-800 dark:text-gray-200">{request.program}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Users className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Defense Type</p>
                <p className="text-gray-800 dark:text-gray-200">{request.defenseType}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">School Year</p>
                <p className="text-gray-800 dark:text-gray-200">{request.schoolYear}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Semester</p>
                <p className="text-gray-800 dark:text-gray-200">{request.semester}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Department</p>
                <p className="text-gray-800 dark:text-gray-200">{request.department}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Student Groups */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Student Groups & Research Titles</h2>
        <div className="space-y-6">
          {request.studentGroups.map((group, index) => (
            <div key={group.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4 text-lg">Group {index + 1}</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Research Title</p>
                  <p className="text-gray-800 dark:text-gray-200 font-medium">{group.researchTitle}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Students</p>
                  <p className="text-gray-800 dark:text-gray-200">{group.students.join(', ')}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Panel Members Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Panel Members Summary</h2>
        
        {/* SAM Department Special Warning */}
        {request.department === 'SAM' && (
          <div className="mb-4 p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
            <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2 flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5" />
              <span>SAM Department 10-Appearance Total Limit</span>
            </h4>
            <p className="text-sm text-orange-700 dark:text-orange-300">
              The combined total appearances for Adviser + Panel Chair + Panel Member + Secretary + Validators cannot exceed <strong>10 appearances</strong> according to the university's research appearances matrix.
            </p>
          </div>
        )}

        {/* SLAS Department Special Warning */}
        {request.department === 'SLAS' && request.status === 'Flagged' && (
          <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <h4 className="font-semibold text-red-800 dark:text-red-200 mb-3 flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5" />
              <span>⚠️ Flagged Faculty Issues (SLAS Department)</span>
            </h4>
            <div className="space-y-2 text-sm text-red-700 dark:text-red-300">
              {request.panelMembers.filter(m => m.isFlagged).map((member) => (
                <div key={member.id} className="flex items-start space-x-2">
                  <span className="text-red-600">🚨</span>
                  <div>
                    <strong>{member.name} ({member.roles[0]}): {member.totalAppearances}/{member.roles[0] === 'Statistician' ? '30' : '5'} appearances</strong>
                    {member.roles[0] === 'Chairman' && member.totalAppearances > 5 && (
                      <div className="text-xs mt-1">
                        EXCEEDS LIMIT by {member.totalAppearances - 5}<br/>
                        Department Limit: 5 appearances for Chairman position<br/>
                        Justification Required: Specialized expertise in adolescent psychology
                      </div>
                    )}
                    {member.roles[0] === 'Statistician' && member.totalAppearances > 30 && (
                      <div className="text-xs mt-1">
                        EXCEEDS LIMIT by {member.totalAppearances - 30}<br/>
                        Role Limit: 30 appearances for Statistician position<br/>
                        Justification Required: Only certified statistician available for psychology research
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div className="mt-3 pt-2 border-t border-red-300">
                <strong>FLAGGING SEVERITY: MODERATE</strong> - Requires detailed justification for both faculty
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{request.panelMembers.length}</div>
            <div className="text-sm text-blue-700 dark:text-blue-300">Total Panel Members</div>
            <div className="text-xs text-blue-600 dark:text-blue-400">(across {request.studentGroups.length} groups)</div>
          </div>
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              {request.panelMembers.filter(m => m.isFlagged).length}
            </div>
            <div className="text-sm text-red-700 dark:text-red-300">Flagged Faculty</div>
            <div className="text-xs text-red-600 dark:text-red-400">exceeds appearance limits</div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              ₱{request.panelMembers.reduce((sum, m) => sum + (m.compensation || 300), 0).toLocaleString()}
            </div>
            <div className="text-sm text-green-700 dark:text-green-300">Total Compensation</div>
            <div className="text-xs text-green-600 dark:text-green-400">for this request</div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              ₱{(() => {
                const totalCompensation = request.panelMembers.reduce((sum, m) => sum + (m.compensation || 300), 0);
                const totalStudents = request.studentGroups.reduce((sum, g) => sum + g.students.length, 0);
                return (totalCompensation / totalStudents).toLocaleString();
              })()}
            </div>
            <div className="text-sm text-purple-700 dark:text-purple-300">Per-Student Share</div>
            <div className="text-xs text-purple-600 dark:text-purple-400">
              ({request.studentGroups.reduce((sum, g) => sum + g.students.length, 0)} students total)
            </div>
          </div>
        </div>

        {/* Panel Members Details Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 dark:border-gray-600 rounded-lg">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Role</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Current</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Request</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Total</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Compensation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
              {request.panelMembers.map((member) => {
                const roleColor = {
                  'Adviser': 'text-yellow-600 bg-yellow-50',
                  'Chairman': 'text-green-600 bg-green-50',
                  'Panel Member': 'text-blue-600 bg-blue-50',
                  'Secretary': 'text-purple-600 bg-purple-50',
                  'Statistician': 'text-indigo-600 bg-indigo-50',
                  'Advisor': 'text-yellow-600 bg-yellow-50',
                  'Chairperson': 'text-green-600 bg-green-50'
                };
                const roleEmoji = {
                  'Adviser': '🟡',
                  'Chairman': '🟢',
                  'Panel Member': '🔵',
                  'Secretary': '📝',
                  'Statistician': '📊',
                  'Advisor': '🟡',
                  'Chairperson': '🟢'
                };
                const role = member.roles[0];
                const totalAppearances = member.totalAppearances || (member.currentAppearances + (member.requestAppearances || 1));
                
                return (
                  <tr key={member.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${roleColor[role as keyof typeof roleColor] || 'text-gray-600 bg-gray-50'}`}>
                        {roleEmoji[role as keyof typeof roleEmoji] || '⚪'}
                        <span className="ml-1">{role}</span>
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-800 dark:text-gray-200">{member.name}</span>
                        {member.isFlagged && (
                          <Flag className="w-4 h-4 text-red-500" title="Flagged for violation" />
                        )}
                        {member.group && member.group > 0 && (
                          <span className="text-xs px-1.5 py-0.5 bg-gray-200 dark:bg-gray-600 rounded text-gray-700 dark:text-gray-300">
                            Grp {member.group}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-200">{member.currentAppearances}</td>
                    <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-200">{member.requestAppearances || 1}</td>
                    <td className="px-4 py-3">
                      <span className={`text-sm ${member.isFlagged ? 'text-red-600 font-bold' : 'text-gray-800 dark:text-gray-200'}`}>
                        {totalAppearances}
                        {role === 'Statistician' && request.department === 'SAM' && totalAppearances <= 30 && '/30 ✅'}
                        {role === 'Statistician' && request.department === 'SLAS' && totalAppearances <= 30 && '/30 ✅'}
                        {role === 'Chairman' && request.department === 'SLAS' && totalAppearances <= 5 && '/5 ✅'}
                        {role === 'Adviser' && request.department === 'SLAS' && totalAppearances <= 5 && '/5 ✅'}
                        {role === 'Panel Member' && request.department === 'SLAS' && totalAppearances <= 5 && '/5 ✅'}
                        {member.isFlagged && role === 'Statistician' && request.department === 'SLAS' && '/30 ⚠️'}
                        {member.isFlagged && role === 'Chairman' && request.department === 'SLAS' && '/5 ⚠️'}
                        {member.isFlagged && role !== 'Statistician' && request.department === 'SAM' && ' ⚠️'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800 dark:text-gray-200">
                      ₱{(member.compensation || 300).toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="mt-2 text-right">
            <span className="text-sm font-bold text-gray-800 dark:text-gray-200">
              Grand Total: ₱{request.panelMembers.reduce((sum, m) => sum + (m.compensation || 300), 0).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Justification Documents - Enhanced for BAP/SLAS */}
      {request.justificationLetter && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>📎 Justification Documents</span>
          </h2>
          
          <div className="space-y-4">
            {/* Document Header */}
            <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center space-x-3">
                <FileText className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{request.justificationLetter}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Uploaded: Jan 20, 2024 4:15 PM | Size: 2.7 MB<br/>
                    Submitted by: Dr. Sarah Martinez (Program Chair)
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <Eye className="w-4 h-4" />
                  <span className="text-sm">View in Google Docs</span>
                </button>
                <button className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Download className="w-4 h-4" />
                  <span className="text-sm">Download PDF</span>
                </button>
                <button className="flex items-center space-x-2 px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                  <Share className="w-4 h-4" />
                  <span className="text-sm">Share Link</span>
                </button>
              </div>
            </div>

            {/* Flagged Faculty Justifications Summary */}
            {request.department === 'SLAS' && request.status === 'Flagged' && (
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Flagged Faculty Justifications:</h4>
                <div className="space-y-2 text-sm text-yellow-700 dark:text-yellow-300">
                  <div>• <strong>Dr. Elena Rodriguez (Chairman) - 8/5 appearances</strong><br/>
                    Reason: Only faculty with dual expertise in adolescent psychology and research methods</div>
                  <div>• <strong>Prof. Michael Santos (Statistician) - 31/30 appearances</strong><br/>
                    Reason: Only certified statistician available for psychology research in SLAS</div>
                </div>
              </div>
            )}

            {/* Justification Letter Preview */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>📄 Justification Letter Content Preview</span>
              </h3>
              <div className="text-sm text-gray-700 dark:text-gray-300 space-y-3 font-mono bg-white dark:bg-gray-800 p-4 rounded border max-h-96 overflow-y-auto">
                <div className="text-center font-bold">
                  UNIVERSIDAD DE ZAMBOANGA<br/>
                  SCHOOL OF LIBERAL ARTS AND SCIENCES (SLAS)
                </div>
                <div className="text-center font-semibold">
                  JUSTIFICATION LETTER FOR PANEL MEMBER APPEARANCE LIMIT EXCEPTION
                </div>
                <div>
                  Date: January 20, 2024<br/>
                  To: Research Director<br/>
                  From: Dr. Sarah Martinez, Program Chair - Psychology<br/>
                  Re: Request for Faculty Appearance Limit Exception - BAP Final Defense
                </div>
                <div>
                  <strong>REQUEST DETAILS:</strong><br/>
                  - Request ID: REQ-2024-003<br/>
                  - Program: Bachelor of Arts in Psychology (BAP)<br/>
                  - Defense Type: Final Defense<br/>
                  - Academic Year: 2024-2025, First Semester
                </div>
                <div>
                  <strong>JUSTIFICATION FOR EXCEEDING APPEARANCE LIMITS:</strong>
                </div>
                <div>
                  <strong>1. Dr. Elena Rodriguez (Chairman - 8/5 appearances):</strong><br/>
                  Dr. Rodriguez is the only faculty member in SLAS with specialized expertise in both adolescent psychology and advanced research methodology. Her doctoral background from University of the Philippines in Developmental Psychology and 15 years of research experience make her irreplaceable for evaluating the "Impact of Social Media on Adolescent Mental Health" research project.
                </div>
                <div>
                  <strong>Alternative Options Explored:</strong><br/>
                  - Contacted external psychology experts: None available for the defense dates<br/>
                  - Reviewed other SLAS faculty: No equivalent expertise in adolescent psychology<br/>
                  - Considered postponement: Would delay graduation by one semester
                </div>
                <div>
                  <strong>2. Prof. Michael Santos (Statistician - 31/30 appearances):</strong><br/>
                  Prof. Santos is the only certified statistician in the university qualified to handle complex psychological research statistical analysis. His expertise in SPSS, R programming, and psychological research statistics is essential for evaluating both research projects which employ advanced statistical methods.
                </div>
                <div>
                  <strong>Alternative Options Explored:</strong><br/>
                  - External statistician consultants: Budget constraints prevent hiring<br/>
                  - Faculty from other departments: No psychology research statistics expertise<br/>
                  - Statistical software training for other faculty: Would take 6+ months
                </div>
                <div>
                  <strong>IMPACT ASSESSMENT:</strong><br/>
                  - Academic Quality: Maintaining high evaluation standards requires expert assessment<br/>
                  - Student Timeline: Alternative arrangements would delay graduation<br/>
                  - Faculty Development: Currently training additional faculty in specialized areas
                </div>
                <div>
                  <strong>MITIGATION MEASURES:</strong><br/>
                  - Reduced Dr. Rodriguez's appearances in subsequent requests<br/>
                  - Recruitment of additional psychology faculty approved for next academic year<br/>
                  - Training program initiated for statistical analysis certification
                </div>
                <div>
                  Respectfully submitted,<br/>
                  Dr. Sarah Martinez<br/>
                  Program Chair - Psychology Department, SLAS
                </div>
                <div className="text-center text-xs text-gray-500">
                  [Full document continues with additional supporting documentation...]
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Review Actions */}
      {(request.status === 'Flagged' || request.status === 'Pending') && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span>🎯 Research Director Review Actions</span>
          </h2>

          {/* SLAS Department Compliance Review */}
          {request.department === 'SLAS' && request.status === 'Flagged' && (
            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">SLAS Department Compliance Review:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <span className="text-red-600">❌</span>
                  <span className="text-gray-700 dark:text-gray-300">2 faculty members exceed appearance limits</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-600">✅</span>
                  <span className="text-gray-700 dark:text-gray-300">Comprehensive justification letter provided</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-600">✅</span>
                  <span className="text-gray-700 dark:text-gray-300">Alternative options documented and explored</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-600">⚠️</span>
                  <span className="text-gray-700 dark:text-gray-300">Requires careful consideration of academic quality vs. policy compliance</span>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded border">
                <h5 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Recommendation Guidelines:</h5>
                <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span>Verify no other qualified faculty available in university</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span>Confirm student graduation timeline impact</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span>Review mitigation measures for future requests</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span>Consider precedent implications for other departments</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Comments/Notes:</label>
            <textarea
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-gray-200"
              rows={4}
              placeholder={request.department === 'SLAS' && request.status === 'Flagged' 
                ? "This request demonstrates exceptional circumstances requiring specialized expertise. The justification clearly outlines the necessity and provides concrete mitigation plans. Recommend approval with monitoring of future appearance distributions." 
                : "Add any comments or notes for this review..."}
              defaultValue={request.department === 'SLAS' && request.status === 'Flagged' 
                ? "This request demonstrates exceptional circumstances requiring specialized expertise. The justification clearly outlines the necessity and provides concrete mitigation plans. Recommend approval with monitoring of future appearance distributions." 
                : ""}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleApprove}
              disabled={loading}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 hover:shadow-lg flex-1"
            >
              {loading ? (
                <ButtonLoader />
              ) : (
                <CheckCircle className="w-5 h-5" />
              )}
              <span>{loading ? 'Approving...' : '✅ Approve Request'}</span>
            </button>
            <button
              onClick={handleReturn}
              disabled={loading}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 hover:shadow-lg flex-1"
            >
              {loading ? (
                <ButtonLoader />
              ) : (
                <RotateCcw className="w-5 h-5" />
              )}
              <span>{loading ? 'Processing...' : '🔄 Return for Corrections'}</span>
            </button>
            <button className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-lg flex-1">
              <MessageSquare className="w-5 h-5" />
              <span>💬 Add Comments</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApprovalRequestView;