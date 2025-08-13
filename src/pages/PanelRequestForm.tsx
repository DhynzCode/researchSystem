import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  AlertTriangle, 
  Upload, 
  Save, 
  Send
} from 'lucide-react';
import { PanelRequest, StudentGroup, ProgramLevel, Department, DefenseType, Faculty, PanelRole } from '../types';
import StudentGroupsPanel from '../components/StudentGroupsPanel';
import PanelMembersDetailsTable, { PanelMemberDetail } from '../components/PanelMembersDetailsTable';
import Breadcrumb from '../components/Breadcrumb';
import FeeStructureLegend from '../components/FeeStructureLegend';

const PanelRequestForm: React.FC = () => {
  const location = useLocation();
  const [formData, setFormData] = useState<Partial<PanelRequest>>({
    programChair: '',
    programLevel: 'Tertiary Level (College & Off-site branches)',
    department: 'SEICT',
    program: '',
    semester: 'First Semester',
    defenseType: 'Pre-Oral',
    schoolYear: '2024-2025',
    studentGroups: [],
    panelMembers: [],
    status: 'Draft'
  });

  const [studentGroups, setStudentGroups] = useState<StudentGroup[]>([]);
  const [animationClass, setAnimationClass] = useState('opacity-0 translate-y-4');
  const [sectionAnimations, setSectionAnimations] = useState<boolean[]>([]);

  // Animation effects on mount
  useEffect(() => {
    // Main page animation
    const timer = setTimeout(() => {
      setAnimationClass('opacity-100 translate-y-0');
    }, 100);

    // Staggered section animations
    const sectionTimers = [0, 1, 2, 3, 4].map((index) => 
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
    if (location.pathname === '/defense-form') {
      return [
        { label: 'Request Defense' },
        { label: 'Submit Request' }
      ];
    }
    return [
      { label: 'Panel Request Form' }
    ];
  };

  const programsByDepartment = {
    'SAM': [
      'Bachelor of Science in Nursing (BSN)',
      'Bachelor of Science in Pharmacy (BSPh)',
      'Bachelor of Science in Medical Technology (BSMT)',
      'Bachelor of Science in Physical Therapy (BSPT)'
    ],
    'SEICT': [
      'Bachelor of Science in Electronics Engineering (BSECE)',
      'Bachelor of Science in Information Technology (BSIT)',
      'Bachelor of Science in Computer Science (BSCS)',
      'Bachelor of Science in Computer Engineering (BSCpE)'
    ],
    'SLAS': [
      'Bachelor of Arts in English (BAE)',
      'Bachelor of Arts in Psychology (BAP)',
      'Bachelor of Science in Mathematics (BSM)',
      'Bachelor of Science in Biology (BSB)'
    ],
    'SOE': [
      'Bachelor of Elementary Education (BEEd)',
      'Bachelor of Secondary Education (BSEd)',
      'Bachelor of Physical Education (BPEd)',
      'Bachelor of Special Needs Education (BSNEd)'
    ],
    'SBM': [
      'Bachelor of Science in Business Administration (BSBA)',
      'Bachelor of Science in Accountancy (BSA)',
      'Bachelor of Science in Entrepreneurship (BSE)',
      'Bachelor of Science in Tourism Management (BSTM)'
    ],
    'SCJ': [
      'Bachelor of Science in Criminology (BSC)',
      'Bachelor of Laws (LLB)',
      'Bachelor of Science in Legal Management (BSLM)'
    ]
  };

  const mockFaculty: Faculty[] = [
    { 
      id: '1', 
      name: 'Dr. Maria Santos', 
      department: 'SEICT', 
      totalAppearances: 8,
      currentSemesterAppearances: 4,
      rolesPlayed: ['Chairperson', 'Panel Member'] as PanelRole[],
      isFlagged: true 
    },
    { 
      id: '2', 
      name: 'Prof. Juan dela Cruz', 
      department: 'SAM', 
      totalAppearances: 3,
      currentSemesterAppearances: 2,
      rolesPlayed: ['Language Editor', 'Panel Member'] as PanelRole[],
      isFlagged: false 
    },
    { 
      id: '3', 
      name: 'Dr. Ana Reyes', 
      department: 'SLAS', 
      totalAppearances: 5,
      currentSemesterAppearances: 3,
      rolesPlayed: ['Statistician', 'Panel Member'] as PanelRole[],
      isFlagged: false 
    },
    { 
      id: '4', 
      name: 'Prof. Carlos Mendez', 
      department: 'SOE', 
      totalAppearances: 2,
      currentSemesterAppearances: 1,
      rolesPlayed: ['Adviser', 'Panel Member'] as PanelRole[],
      isFlagged: false 
    },
    { 
      id: '5', 
      name: 'Dr. Elena Rodriguez', 
      department: 'SBM', 
      totalAppearances: 4,
      currentSemesterAppearances: 2,
      rolesPlayed: ['Validator', 'Panel Member'] as PanelRole[],
      isFlagged: false 
    }
  ];

  const hasFlaggedMembers = studentGroups.some(group => 
    group.panelMembers.some(member => member.isFlagged)
  );

  // Generate panel member details for the table
  const generatePanelMemberDetails = (): PanelMemberDetail[] => {
    const memberDetailsMap = new Map<string, PanelMemberDetail>();

    studentGroups.forEach((group, groupIndex) => {
      group.panelMembers.forEach((member) => {
        member.roles.forEach((role) => {
          const key = `${member.id}-${role}`;
          const groupAssignment = `Grp ${groupIndex + 1}`;
          
          // Calculate compensation based on role
          const getCompensationRate = (role: PanelRole): number => {
            switch (role) {
              case 'Advisor': return 800;
              case 'Chairperson': return 450;
              case 'Statistician': return 500;
              case 'Panel Member': return 400;
              case 'Adviser': return 350;
              case 'Validator': return 300;
              case 'Secretary': return 250;
              case 'Language Editor': return 300;
              default: return 400;
            }
          };

          if (memberDetailsMap.has(key)) {
            const existing = memberDetailsMap.get(key)!;
            existing.requestAppearances += 1;
            existing.totalAppearances = existing.currentAppearances + existing.requestAppearances;
            existing.compensation = getCompensationRate(role as PanelRole) * existing.requestAppearances;
            existing.isFlagged = existing.totalAppearances > 5;
            // Update group assignment to show multiple groups
            if (!existing.groupAssignment!.includes(groupAssignment)) {
              existing.groupAssignment += `, ${groupAssignment}`;
            }
          } else {
            const compensation = getCompensationRate(role as PanelRole);
            memberDetailsMap.set(key, {
              id: key,
              name: member.name,
              groupAssignment: groupAssignment,
              role: role as PanelRole | 'Advisor',
              currentAppearances: member.currentAppearances,
              requestAppearances: 1,
              totalAppearances: member.currentAppearances + 1,
              compensation: compensation,
              isFlagged: (member.currentAppearances + 1) > 5
            });
          }
        });
      });
    });

    return Array.from(memberDetailsMap.values());
  };

  const panelMemberDetails = generatePanelMemberDetails();

  return (
    <div className="max-w-6xl mx-auto space-y-6 px-4 sm:px-0">
      <Breadcrumb items={getBreadcrumbItems()} />
      <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-all duration-700 ease-out ${animationClass}`}>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-200 animate-fade-in-up">
          {location.pathname === '/defense-form' ? 'Submit Request' : 'Panel Request Form'}
        </h1>
        <div className="flex space-x-3 animate-fade-in-right" style={{ animationDelay: '200ms' }}>
          <button className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-gray-600 dark:bg-gray-600 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <Save className="w-4 h-4 transition-transform duration-300 hover:rotate-12" />
            <span className="hidden sm:inline">Save Draft</span>
            <span className="sm:hidden">Save</span>
          </button>
          <button className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 hover:scale-105 hover:shadow-lg text-sm">
            <Send className="w-4 h-4 transition-transform duration-300 hover:rotate-12" />
            <span className="hidden sm:inline">Submit Request</span>
            <span className="sm:hidden">Submit</span>
          </button>
        </div>
      </div>

      {/* Fee Structure Legend */}
      <div className={`transform transition-all duration-700 ease-out ${
        sectionAnimations[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <FeeStructureLegend className="mb-6" />
      </div>

      {/* Research Details Section */}
      <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transform transition-all duration-700 ease-out hover:shadow-xl hover:-translate-y-2 ${
        sectionAnimations[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4 animate-fade-in-right" style={{ animationDelay: '100ms' }}>Research Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Program Chair / Research Teacher</label>
            <input
              type="text"
              value={formData.programChair || ''}
              onChange={(e) => setFormData({...formData, programChair: e.target.value})}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 dark:text-gray-200 transition-all duration-300 hover:border-green-400 focus:scale-[1.02] focus:shadow-lg animate-fade-in-up"
              placeholder="Enter name"
              style={{ animationDelay: '200ms' }}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Program Level</label>
            <select
              value={formData.programLevel || ''}
              onChange={(e) => setFormData({...formData, programLevel: e.target.value as ProgramLevel})}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 dark:text-gray-200 transition-all duration-300 hover:border-green-400 focus:scale-[1.02] focus:shadow-lg animate-fade-in-up"
              style={{ animationDelay: '300ms' }}
            >
              <option value="Basic Education">Basic Education</option>
              <option value="Tertiary Level (College & Off-site branches)">Tertiary Level (College & Off-site branches)</option>
              <option value="SGS Masters & FS">SGS Masters & FS</option>
              <option value="SGS Doctorate Program">SGS Doctorate Program</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Department</label>
            <select
              value={formData.department || ''}
              onChange={(e) => setFormData({...formData, department: e.target.value as Department, program: ''})}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 dark:text-gray-200 transition-all duration-300 hover:border-green-400 focus:scale-[1.02] focus:shadow-lg animate-fade-in-up"
              style={{ animationDelay: '400ms' }}
            >
              <option value="SAM">SAM</option>
              <option value="SEICT">SEICT</option>
              <option value="SLAS">SLAS</option>
              <option value="SOE">SOE</option>
              <option value="SBM">SBM</option>
              <option value="SCJ">SCJ</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Program</label>
            <select
              value={formData.program || ''}
              onChange={(e) => setFormData({...formData, program: e.target.value})}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 dark:text-gray-200 transition-all duration-300 hover:border-green-400 focus:scale-[1.02] focus:shadow-lg animate-fade-in-up"
              style={{ animationDelay: '500ms' }}
            >
              <option value="">Select Program</option>
              {formData.department && programsByDepartment[formData.department].map(program => (
                <option key={program} value={program}>{program}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Semester</label>
            <select
              value={formData.semester || ''}
              onChange={(e) => setFormData({...formData, semester: e.target.value})}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 dark:text-gray-200 transition-all duration-300 hover:border-green-400 focus:scale-[1.02] focus:shadow-lg animate-fade-in-up"
              style={{ animationDelay: '600ms' }}
            >
              <option value="First Semester">First Semester</option>
              <option value="Second Semester">Second Semester</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Defense Type</label>
            <select
              value={formData.defenseType || ''}
              onChange={(e) => setFormData({...formData, defenseType: e.target.value as DefenseType})}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 dark:text-gray-200 transition-all duration-300 hover:border-green-400 focus:scale-[1.02] focus:shadow-lg animate-fade-in-up"
              style={{ animationDelay: '700ms' }}
            >
              <option value="Pre-Oral">Pre-Oral</option>
              <option value="Final">Final</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">School Year</label>
            <select
              value={formData.schoolYear || ''}
              onChange={(e) => setFormData({...formData, schoolYear: e.target.value})}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 dark:text-gray-200 transition-all duration-300 hover:border-green-400 focus:scale-[1.02] focus:shadow-lg animate-fade-in-up"
              style={{ animationDelay: '800ms' }}
            >
              <option value="">Select school year</option>
              <option value="2022-2023">2022-2023</option>
              <option value="2023-2024">2023-2024</option>
              <option value="2024-2025">2024-2025</option>
              <option value="2025-2026">2025-2026</option>
              <option value="2026-2027">2026-2027</option>
              <option value="2027-2028">2027-2028</option>
            </select>
          </div>
        </div>
      </div>

      {/* Student Groups Section - New Component */}
      <div className={`transform transition-all duration-700 ease-out ${
        sectionAnimations[2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <StudentGroupsPanel
          studentGroups={studentGroups}
          onStudentGroupsChange={setStudentGroups}
          mockFaculty={mockFaculty}
        />
      </div>

      {/* Panel Members Details Table */}
      {panelMemberDetails.length > 0 && (
        <div className={`transform transition-all duration-700 ease-out ${
          sectionAnimations[3] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <PanelMembersDetailsTable 
            panelMembers={panelMemberDetails}
            className="mt-6"
          />
        </div>
      )}


      {/* Justification Letter Section */}
      {hasFlaggedMembers && (
        <div className={`bg-red-50 border border-red-200 rounded-lg p-6 transform transition-all duration-700 ease-out hover:shadow-xl hover:border-red-300 ${
          sectionAnimations[4] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="flex items-center space-x-3 mb-4 animate-fade-in-up">
            <AlertTriangle className="w-6 h-6 text-red-600 animate-pulse" />
            <h2 className="text-xl font-bold text-red-800">Justification Letter Required</h2>
          </div>
          <p className="text-red-700 mb-4">
            One or more panel members have exceeded the 5-appearance limit. Please upload a justification letter for VPAA approval.
          </p>
          <div className="flex items-center space-x-4 animate-fade-in-right" style={{ animationDelay: '300ms' }}>
            <div className="flex-1">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="w-full p-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300 hover:border-red-400 focus:scale-[1.02] focus:shadow-lg"
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <Upload className="w-4 h-4 transition-transform duration-300 hover:rotate-12" />
              <span>Upload</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PanelRequestForm;