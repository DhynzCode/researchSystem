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
  ChevronRight,
  Users,
  Banknote,
  FileText,
  Download,
  X,
  Trash2
} from 'lucide-react';
import { PanelRequest, RequestStatus } from '../types';
import { ButtonLoader } from '../components/Loading';

const DefenseRequest: React.FC = () => {
  console.log('DefenseRequest component is rendering');
  const navigate = useNavigate();
  const [reviewComment, setReviewComment] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<RequestStatus | 'All'>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [animationClass, setAnimationClass] = useState('opacity-0 translate-y-4');
  const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({});
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [showDocuments, setShowDocuments] = useState<string | null>(null);
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

  // Close modal when pressing Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenModal(null);
        setShowDocuments(null);
      }
    };

    if (openModal || showDocuments) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = 'unset';
      };
    }
  }, [openModal, showDocuments]);

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
        {
          id: '1',
          name: 'Prof. Anna Garcia',
          roles: ['Adviser'],
          currentAppearances: 3,
          totalAppearances: 4,
          compensation: 800,
          isFlagged: false,
          group: 1
        },
        {
          id: '2',
          name: 'Dr. Michael Chen',
          roles: ['Chairman'],
          currentAppearances: 2,
          totalAppearances: 3,
          compensation: 400,
          isFlagged: false,
          group: 1
        },
        {
          id: '3',
          name: 'Dr. Maria Santos',
          roles: ['Panel Member'],
          currentAppearances: 3,
          totalAppearances: 4,
          compensation: 300,
          isFlagged: false,
          group: 1
        },
        {
          id: '4',
          name: 'Dr. Roberto Silva',
          roles: ['Panel Member'],
          currentAppearances: 3,
          totalAppearances: 4,
          compensation: 300,
          isFlagged: false,
          group: 1
        },
        // Group 2 Panel
        {
          id: '5',
          name: 'Prof. Juan Cruz',
          roles: ['Adviser'],
          currentAppearances: 2,
          totalAppearances: 3,
          compensation: 800,
          isFlagged: false,
          group: 2
        },
        {
          id: '6',
          name: 'Dr. Ana Reyes',
          roles: ['Chairman'],
          currentAppearances: 3,
          totalAppearances: 4,
          compensation: 400,
          isFlagged: false,
          group: 2
        },
        {
          id: '7',
          name: 'Dr. Elena Rodriguez',
          roles: ['Panel Member'],
          currentAppearances: 1,
          totalAppearances: 2,
          compensation: 300,
          isFlagged: false,
          group: 2
        },
        {
          id: '8',
          name: 'Prof. Carlos Mendez',
          roles: ['Panel Member'],
          currentAppearances: 4,
          totalAppearances: 5,
          compensation: 300,
          isFlagged: false,
          group: 2
        },
        // Group 3 Panel
        {
          id: '9',
          name: 'Dr. Lisa Wang',
          roles: ['Adviser'],
          currentAppearances: 2,
          totalAppearances: 3,
          compensation: 800,
          isFlagged: false,
          group: 3
        },
        {
          id: '10',
          name: 'Prof. Sarah Lee',
          roles: ['Chairman'],
          currentAppearances: 1,
          totalAppearances: 2,
          compensation: 400,
          isFlagged: false,
          group: 3
        },
        {
          id: '11',
          name: 'Dr. James Wilson',
          roles: ['Panel Member'],
          currentAppearances: 3,
          totalAppearances: 4,
          compensation: 300,
          isFlagged: false,
          group: 3
        },
        {
          id: '12',
          name: 'Prof. Maria Fernandez',
          roles: ['Panel Member'],
          currentAppearances: 2,
          totalAppearances: 3,
          compensation: 300,
          isFlagged: false,
          group: 3
        },
        // Group 4 Panel
        {
          id: '13',
          name: 'Dr. Kevin Thompson',
          roles: ['Adviser'],
          currentAppearances: 4,
          totalAppearances: 5,
          compensation: 800,
          isFlagged: false,
          group: 4
        },
        {
          id: '14',
          name: 'Prof. Diana Martinez',
          roles: ['Chairman'],
          currentAppearances: 3,
          totalAppearances: 4,
          compensation: 400,
          isFlagged: false,
          group: 4
        },
        {
          id: '15',
          name: 'Dr. Alex Rodriguez',
          roles: ['Panel Member'],
          currentAppearances: 2,
          totalAppearances: 3,
          compensation: 300,
          isFlagged: false,
          group: 4
        },
        {
          id: '16',
          name: 'Prof. Rachel Kim',
          roles: ['Panel Member'],
          currentAppearances: 1,
          totalAppearances: 2,
          compensation: 300,
          isFlagged: false,
          group: 4
        },
        // Group 5 Panel
        {
          id: '17',
          name: 'Dr. Steven Park',
          roles: ['Adviser'],
          currentAppearances: 3,
          totalAppearances: 4,
          compensation: 800,
          isFlagged: false,
          group: 5
        },
        {
          id: '18',
          name: 'Prof. Amanda Garcia',
          roles: ['Chairman'],
          currentAppearances: 2,
          totalAppearances: 3,
          compensation: 400,
          isFlagged: false,
          group: 5
        },
        {
          id: '19',
          name: 'Dr. Brian Lee',
          roles: ['Panel Member'],
          currentAppearances: 4,
          totalAppearances: 5,
          compensation: 300,
          isFlagged: false,
          group: 5
        },
        {
          id: '20',
          name: 'Prof. Jessica Wong',
          roles: ['Panel Member'],
          currentAppearances: 1,
          totalAppearances: 2,
          compensation: 300,
          isFlagged: false,
          group: 5
        },
        // Group 6 Panel
        {
          id: '21',
          name: 'Dr. Michelle Davis',
          roles: ['Adviser'],
          currentAppearances: 3,
          totalAppearances: 4,
          compensation: 800,
          isFlagged: false,
          group: 6
        },
        {
          id: '22',
          name: 'Prof. Daniel Chen',
          roles: ['Chairman'],
          currentAppearances: 2,
          totalAppearances: 3,
          compensation: 400,
          isFlagged: false,
          group: 6
        },
        {
          id: '23',
          name: 'Dr. Laura Johnson',
          roles: ['Panel Member'],
          currentAppearances: 3,
          totalAppearances: 4,
          compensation: 300,
          isFlagged: false,
          group: 6
        },
        {
          id: '24',
          name: 'Prof. Mark Anderson',
          roles: ['Panel Member'],
          currentAppearances: 2,
          totalAppearances: 3,
          compensation: 300,
          isFlagged: false,
          group: 6
        },
        // Group 7 Panel
        {
          id: '25',
          name: 'Dr. Sophia Taylor',
          roles: ['Adviser'],
          currentAppearances: 4,
          totalAppearances: 5,
          compensation: 800,
          isFlagged: false,
          group: 7
        },
        {
          id: '26',
          name: 'Prof. Nathan Brown',
          roles: ['Chairman'],
          currentAppearances: 1,
          totalAppearances: 2,
          compensation: 400,
          isFlagged: false,
          group: 7
        },
        {
          id: '27',
          name: 'Dr. Emma Wilson',
          roles: ['Panel Member'],
          currentAppearances: 3,
          totalAppearances: 4,
          compensation: 300,
          isFlagged: false,
          group: 7
        },
        {
          id: '28',
          name: 'Prof. Ryan Miller',
          roles: ['Panel Member'],
          currentAppearances: 2,
          totalAppearances: 3,
          compensation: 300,
          isFlagged: false,
          group: 7
        },
        // Group 8 Panel
        {
          id: '29',
          name: 'Dr. Olivia Garcia',
          roles: ['Adviser'],
          currentAppearances: 2,
          totalAppearances: 3,
          compensation: 800,
          isFlagged: false,
          group: 8
        },
        {
          id: '30',
          name: 'Prof. Lucas Martinez',
          roles: ['Chairman'],
          currentAppearances: 3,
          totalAppearances: 4,
          compensation: 400,
          isFlagged: false,
          group: 8
        },
        {
          id: '31',
          name: 'Dr. Isabella Rodriguez',
          roles: ['Panel Member'],
          currentAppearances: 1,
          totalAppearances: 2,
          compensation: 300,
          isFlagged: false,
          group: 8
        },
        {
          id: '32',
          name: 'Prof. Ethan Kim',
          roles: ['Panel Member'],
          currentAppearances: 4,
          totalAppearances: 5,
          compensation: 300,
          isFlagged: false,
          group: 8
        },
        // Group 9 Panel
        {
          id: '33',
          name: 'Dr. Grace Liu',
          roles: ['Adviser'],
          currentAppearances: 3,
          totalAppearances: 4,
          compensation: 800,
          isFlagged: false,
          group: 9
        },
        {
          id: '34',
          name: 'Prof. Mason Thompson',
          roles: ['Chairman'],
          currentAppearances: 2,
          totalAppearances: 3,
          compensation: 400,
          isFlagged: false,
          group: 9
        },
        {
          id: '35',
          name: 'Dr. Lily Chen',
          roles: ['Panel Member'],
          currentAppearances: 3,
          totalAppearances: 4,
          compensation: 300,
          isFlagged: false,
          group: 9
        },
        {
          id: '36',
          name: 'Prof. Jacob Davis',
          roles: ['Panel Member'],
          currentAppearances: 2,
          totalAppearances: 3,
          compensation: 300,
          isFlagged: false,
          group: 9
        },
        // Shared Support Staff (across groups)
        {
          id: '37',
          name: 'Ms. Jennifer Kim',
          roles: ['Secretary'],
          currentAppearances: 15,
          totalAppearances: 24,
          compensation: 4800, // 200 * 24 appearances
          isFlagged: false,
          group: 0 // Shared across all groups
        },
        {
          id: '38',
          name: 'Prof. Michael Santos',
          roles: ['Statistician'],
          currentAppearances: 20,
          totalAppearances: 27,
          compensation: 13500, // 500 * 27 appearances
          isFlagged: false,
          group: 0 // Shared across all groups
        }
      ],
      documents: [
        {
          id: 'doc-001',
          name: 'Panel Request Form.pdf',
          type: 'PDF',
          size: '2.1 MB',
          uploadDate: '2024-01-15T09:00:00Z'
        },
        {
          id: 'doc-002',
          name: 'Research Proposal.docx',
          type: 'DOCX',
          size: '1.5 MB',
          uploadDate: '2024-01-15T08:30:00Z'
        },
        {
          id: 'doc-003',
          name: 'Budget Breakdown.xlsx',
          type: 'XLSX',
          size: '856 KB',
          uploadDate: '2024-01-15T08:45:00Z'
        },
        {
          id: 'doc-004',
          name: 'Approval Letter.pdf',
          type: 'PDF',
          size: '1.2 MB',
          uploadDate: '2024-01-15T10:00:00Z'
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

  const handleDelete = async (requestId: string) => {
    if (confirm('Are you sure you want to delete this defense request? This action cannot be undone.')) {
      setLoading(requestId, true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setRequests(requests.filter(req => req.id !== requestId));
      setReviewComment('');
      setLoading(requestId, false);
    }
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
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Defense Request</h1>
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
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by program, type, year..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400 transition-all duration-300 focus:scale-[1.02] text-sm"
              />
            </div>
            <div className="relative sm:w-auto w-full">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center justify-center space-x-2 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105 hover:shadow-md w-full sm:w-auto"
              >
                <Filter className="w-4 h-4" />
                <span className="text-sm">Filters</span>
                {statusFilter !== 'All' && (
                  <span className="ml-1 w-2 h-2 bg-blue-500 rounded-full"></span>
                )}
              </button>
              {showFilters && (
                <div className="absolute right-0 mt-2 w-full sm:w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-20">
                  <div className="p-3">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Filter by Status</label>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value as RequestStatus | 'All')}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-gray-200 text-sm"
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

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Program
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  School Year
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Defense Type
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Semester
                </th>
                <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Total Consolidated
                </th>
                <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedRequests.map((request, index) => (
                <tr key={request.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: `${index * 100 + 800}ms` }}>
                  {/* Program */}
                  <td className="px-4 py-3">
                    <div className="text-xs font-medium text-gray-900 dark:text-gray-200 transition-colors duration-300 hover:text-blue-600 truncate max-w-xs">
                      {request.program}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">
                      {request.department}
                    </div>
                  </td>
                  {/* School Year */}
                  <td className="px-3 py-3">
                    <div className="text-sm text-gray-900 dark:text-gray-200">{request.schoolYear}</div>
                  </td>
                  {/* Defense Type */}
                  <td className="px-3 py-3">
                    <div className="text-sm text-gray-900 dark:text-gray-200">{request.defenseType}</div>
                  </td>
                  {/* Semester */}
                  <td className="px-3 py-3">
                    <div className="text-sm text-gray-900 dark:text-gray-200">{request.semester}</div>
                  </td>
                  {/* Status */}
                  <td className="px-3 py-3 text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                      {getStatusIcon(request.status)}
                      <span className="ml-1">{getStatusText(request.status)}</span>
                    </span>
                  </td>
                  {/* Total Consolidated */}
                  <td className="px-3 py-3 text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <Banknote className="w-3 h-3 text-green-500" />
                      <span className="text-xs font-semibold text-green-800 dark:text-green-300 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
                        ₱{(() => {
                          let totalCompensation = 0;
                          request.panelMembers.forEach(member => {
                            if (member.compensation) {
                              totalCompensation += member.compensation;
                            } else {
                              const roleRates = {
                                'Advisor': 800, 'Adviser': 800, 'Chairman': 400, 'Chairperson': 400,
                                'Panel Member': 300, 'Statistician': 500, 'Secretary': 200, 'Validator': 350
                              };
                              member.roles.forEach(role => {
                                const rate = roleRates[role as keyof typeof roleRates] || 300;
                                const appearances = member.totalAppearances || member.currentAppearances || 1;
                                totalCompensation += rate * appearances;
                              });
                            }
                          });
                          return totalCompensation.toLocaleString();
                        })()}
                      </span>
                    </div>
                  </td>
                  {/* Actions */}
                  <td className="px-3 py-3 text-center">
                    <button 
                      onClick={() => setOpenModal(request.id)}
                      className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden space-y-4">
          {paginatedRequests.map((request, index) => (
            <div 
              key={request.id} 
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-4 transform transition-all duration-300 hover:shadow-lg animate-fade-in-up"
              style={{ animationDelay: `${index * 100 + 800}ms` }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-200 truncate">
                    {request.program}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {request.department} • {request.defenseType}
                  </p>
                </div>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ml-2 ${getStatusColor(request.status)}`}>
                  {getStatusIcon(request.status)}
                  <span className="ml-1">{getStatusText(request.status)}</span>
                </span>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">School Year</div>
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-200">{request.schoolYear}</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Semester</div>
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-200">{request.semester}</div>
                </div>
              </div>

              {/* Appearances and Compensation */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                  <Users className="w-4 h-4 text-blue-500" />
                  <div>
                    <div className="text-xs text-blue-600 dark:text-blue-400">Total Appearances</div>
                    <div className="text-sm font-bold text-blue-800 dark:text-blue-300">
                      {(() => {
                        let totalAppearances = 0;
                        request.panelMembers.forEach(member => {
                          if (member.totalAppearances) {
                            totalAppearances += member.totalAppearances;
                          } else if (member.currentAppearances) {
                            totalAppearances += member.currentAppearances;
                          }
                        });
                        return totalAppearances;
                      })()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                  <Banknote className="w-4 h-4 text-green-500" />
                  <div>
                    <div className="text-xs text-green-600 dark:text-green-400">Total Consolidated</div>
                    <div className="text-sm font-bold text-green-800 dark:text-green-300">
                      ₱{(() => {
                        let totalCompensation = 0;
                        request.panelMembers.forEach(member => {
                          if (member.compensation) {
                            totalCompensation += member.compensation;
                          } else {
                            const roleRates = {
                              'Advisor': 800, 'Adviser': 800, 'Chairman': 400, 'Chairperson': 400,
                              'Panel Member': 300, 'Statistician': 500, 'Secretary': 200, 'Validator': 350
                            };
                            member.roles.forEach(role => {
                              const rate = roleRates[role as keyof typeof roleRates] || 300;
                              const appearances = member.totalAppearances || member.currentAppearances || 1;
                              totalCompensation += rate * appearances;
                            });
                          }
                        });
                        return totalCompensation.toLocaleString();
                      })()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-600">
                <button
                  onClick={() => navigate(`/approval-center/request/${request.id}`)}
                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 transition-all duration-300 hover:scale-105"
                >
                  <Eye className="w-4 h-4" />
                  <span className="text-sm font-medium">View Details</span>
                </button>
                
                {(request.status === 'Flagged' || request.status === 'Pending') && (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleApprove(request.id)}
                      disabled={loadingStates[request.id]}
                      className="flex items-center space-x-1 px-3 py-1.5 text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 bg-green-50 dark:bg-green-900/20 rounded-md transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loadingStates[request.id] ? (
                        <ButtonLoader className="w-4 h-4" />
                      ) : (
                        <CheckCircle className="w-4 h-4" />
                      )}
                      <span className="text-xs font-medium">Approve</span>
                    </button>
                    <button
                      onClick={() => handleReturn(request.id)}
                      disabled={loadingStates[request.id]}
                      className="flex items-center space-x-1 px-3 py-1.5 text-orange-600 hover:text-orange-900 dark:text-orange-400 dark:hover:text-orange-300 bg-orange-50 dark:bg-orange-900/20 rounded-md transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loadingStates[request.id] ? (
                        <ButtonLoader className="w-4 h-4" />
                      ) : (
                        <RotateCcw className="w-4 h-4" />
                      )}
                      <span className="text-xs font-medium">Return</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
            {/* Mobile Pagination */}
            <div className="flex items-center justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="flex items-center space-x-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Prev</span>
              </button>
              
              <div className="flex items-center space-x-1">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Page {currentPage} of {totalPages}
                </span>
              </div>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="flex items-center space-x-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Desktop Pagination */}
            <div className="hidden sm:flex items-center justify-between">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="flex items-center space-x-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>
              
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let page;
                  if (totalPages <= 5) {
                    page = i + 1;
                  } else if (currentPage <= 3) {
                    page = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    page = totalPages - 4 + i;
                  } else {
                    page = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                        currentPage === page
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="flex items-center space-x-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Actions Modal */}
      {openModal && (
        <div className="fixed inset-0 z-[100] overflow-y-auto">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
            onClick={() => setOpenModal(null)}
          ></div>
          
          {/* Modal */}
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 w-full max-w-md transform transition-all duration-300 scale-100">
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200">
                  Request Actions
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Choose an action for request {openModal}
                </p>
              </div>
              
              {/* Modal Body */}
              <div className="px-6 py-4 space-y-2">
                <button
                  onClick={() => {
                    navigate(`/approval-center/request/${openModal}`);
                    setOpenModal(null);
                  }}
                  className="flex items-center w-full px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-150"
                >
                  <Eye className="w-5 h-5 mr-3 text-blue-500" />
                  <div className="text-left">
                    <div className="font-medium">View Details</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">See full request information</div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setShowDocuments(openModal);
                    setOpenModal(null);
                  }}
                  className="flex items-center w-full px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-150"
                >
                  <FileText className="w-5 h-5 mr-3 text-purple-500" />
                  <div className="text-left">
                    <div className="font-medium">View Documents</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Browse uploaded documents</div>
                  </div>
                </button>
                
                {(() => {
                  const currentRequest = requests.find(req => req.id === openModal);
                  if (currentRequest && (currentRequest.status === 'Flagged' || currentRequest.status === 'Pending')) {
                    return (
                      <>
                        <button
                          onClick={() => {
                            handleApprove(openModal!);
                            setOpenModal(null);
                          }}
                          disabled={loadingStates[openModal!]}
                          className="flex items-center w-full px-4 py-3 text-sm text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {loadingStates[openModal!] ? (
                            <ButtonLoader className="w-5 h-5 mr-3" />
                          ) : (
                            <CheckCircle className="w-5 h-5 mr-3 text-green-500" />
                          )}
                          <div className="text-left">
                            <div className="font-medium">Approve Request</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Mark this request as approved</div>
                          </div>
                        </button>
                        
                        <button
                          onClick={() => {
                            handleReturn(openModal!);
                            setOpenModal(null);
                          }}
                          disabled={loadingStates[openModal!]}
                          className="flex items-center w-full px-4 py-3 text-sm text-orange-700 dark:text-orange-300 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {loadingStates[openModal!] ? (
                            <ButtonLoader className="w-5 h-5 mr-3" />
                          ) : (
                            <RotateCcw className="w-5 h-5 mr-3 text-orange-500" />
                          )}
                          <div className="text-left">
                            <div className="font-medium">Return Request</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Send back for revisions</div>
                          </div>
                        </button>
                      </>
                    );
                  }
                  return null;
                })()}

                <button
                  onClick={() => {
                    handleDelete(openModal!);
                    setOpenModal(null);
                  }}
                  disabled={loadingStates[openModal!]}
                  className="flex items-center w-full px-4 py-3 text-sm text-red-700 dark:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loadingStates[openModal!] ? (
                    <ButtonLoader className="w-5 h-5 mr-3" />
                  ) : (
                    <Trash2 className="w-5 h-5 mr-3 text-red-500" />
                  )}
                  <div className="text-left">
                    <div className="font-medium">Delete Request</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Permanently remove this request</div>
                  </div>
                </button>
              </div>
              
              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setOpenModal(null)}
                  className="w-full px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors duration-150"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Documents Modal */}
      {showDocuments && (
        <div className="fixed inset-0 z-[100] overflow-y-auto">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
            onClick={() => setShowDocuments(null)}
          ></div>
          
          {/* Modal */}
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 w-full max-w-2xl transform transition-all duration-300 scale-100 max-h-[80vh] overflow-hidden">
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200">
                    Request Documents
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Documents for request {showDocuments}
                  </p>
                </div>
                <button
                  onClick={() => setShowDocuments(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Modal Body */}
              <div className="px-6 py-4 overflow-y-auto max-h-[60vh]">
                {(() => {
                  const currentRequest = requests.find(req => req.id === showDocuments);
                  if (currentRequest?.documents && currentRequest.documents.length > 0) {
                    return (
                      <div className="space-y-3">
                        {currentRequest.documents.map((doc: any) => (
                          <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
                                {doc.type === 'PDF' && <FileText className="w-6 h-6 text-red-500" />}
                                {doc.type === 'DOCX' && <FileText className="w-6 h-6 text-blue-500" />}
                                {doc.type === 'XLSX' && <FileText className="w-6 h-6 text-green-500" />}
                                {!['PDF', 'DOCX', 'XLSX'].includes(doc.type) && <FileText className="w-6 h-6 text-gray-500" />}
                              </div>
                              <div>
                                <div className="font-medium text-gray-900 dark:text-gray-200">
                                  {doc.name}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  {doc.size} • {doc.type} • {new Date(doc.uploadDate).toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                            <button 
                              className="flex items-center space-x-2 px-3 py-2 text-sm text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-150"
                              onClick={() => {
                                // Simulate document download/view
                                alert(`Opening ${doc.name}...`);
                              }}
                            >
                              <Download className="w-4 h-4" />
                              <span>View</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    );
                  } else {
                    return (
                      <div className="text-center py-12">
                        <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-200 mb-2">
                          No Documents Available
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400">
                          No documents have been uploaded for this request yet.
                        </p>
                      </div>
                    );
                  }
                })()}
              </div>
              
              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setShowDocuments(null)}
                  className="w-full px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors duration-150"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DefenseRequest;
