import React, { useState } from 'react';
import { 
  Plus, 
  X, 
  Search, 
  Trash2,
  Users,
  BookOpen,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { StudentGroup, PanelMember, PanelRole, Faculty } from '../types';

interface StudentGroupsPanelProps {
  studentGroups: StudentGroup[];
  onStudentGroupsChange: (groups: StudentGroup[]) => void;
  mockFaculty?: Faculty[];
}

const StudentGroupsPanel: React.FC<StudentGroupsPanelProps> = ({
  studentGroups,
  onStudentGroupsChange,
  mockFaculty = []
}) => {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [searchTerms, setSearchTerms] = useState<{ [groupId: string]: string }>({});

  // Default mock faculty data if not provided
  const defaultFaculty: Faculty[] = [
    { 
      id: '1', 
      name: 'Dr. Maria Santos', 
      department: 'SEICT', 
      totalAppearances: 8,
      currentSemesterAppearances: 4,
      rolesPlayed: ['Chairperson', 'Panel Member'],
      isFlagged: true 
    },
    { 
      id: '2', 
      name: 'Prof. Juan dela Cruz', 
      department: 'SAM', 
      totalAppearances: 3,
      currentSemesterAppearances: 2,
      rolesPlayed: ['Language Editor', 'Panel Member'],
      isFlagged: false 
    },
    { 
      id: '3', 
      name: 'Dr. Ana Reyes', 
      department: 'SLAS', 
      totalAppearances: 5,
      currentSemesterAppearances: 3,
      rolesPlayed: ['Statistician', 'Panel Member'],
      isFlagged: false 
    },
    { 
      id: '4', 
      name: 'Prof. Carlos Mendez', 
      department: 'SOE', 
      totalAppearances: 2,
      currentSemesterAppearances: 1,
      rolesPlayed: ['Adviser', 'Panel Member'],
      isFlagged: false 
    },
    { 
      id: '5', 
      name: 'Dr. Elena Rodriguez', 
      department: 'SBM', 
      totalAppearances: 4,
      currentSemesterAppearances: 2,
      rolesPlayed: ['Validator', 'Panel Member'],
      isFlagged: false 
    }
  ];

  const faculty = mockFaculty.length > 0 ? mockFaculty : defaultFaculty;

  const toggleGroupExpansion = (groupId: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId);
    } else {
      newExpanded.add(groupId);
    }
    setExpandedGroups(newExpanded);
  };

  const addNewGroup = () => {
    const newGroup: StudentGroup = {
      id: `group_${Date.now()}`,
      researchTitle: '',
      students: [''],
      panelMembers: []
    };
    onStudentGroupsChange([...studentGroups, newGroup]);
    setExpandedGroups(new Set([...expandedGroups, newGroup.id]));
  };

  const updateGroup = (groupId: string, updates: Partial<StudentGroup>) => {
    const updatedGroups = studentGroups.map(group => 
      group.id === groupId ? { ...group, ...updates } : group
    );
    onStudentGroupsChange(updatedGroups);
  };

  const deleteGroup = (groupId: string) => {
    const updatedGroups = studentGroups.filter(group => group.id !== groupId);
    onStudentGroupsChange(updatedGroups);
    
    // Clean up expanded state and search terms
    const newExpanded = new Set(expandedGroups);
    newExpanded.delete(groupId);
    setExpandedGroups(newExpanded);
    
    const newSearchTerms = { ...searchTerms };
    delete newSearchTerms[groupId];
    setSearchTerms(newSearchTerms);
  };

  const addStudent = (groupId: string) => {
    const group = studentGroups.find(g => g.id === groupId);
    if (group) {
      updateGroup(groupId, {
        students: [...group.students, '']
      });
    }
  };

  const updateStudent = (groupId: string, studentIndex: number, value: string) => {
    const group = studentGroups.find(g => g.id === groupId);
    if (group) {
      const updatedStudents = [...group.students];
      updatedStudents[studentIndex] = value;
      updateGroup(groupId, { students: updatedStudents });
    }
  };

  const removeStudent = (groupId: string, studentIndex: number) => {
    const group = studentGroups.find(g => g.id === groupId);
    if (group && group.students.length > 1) {
      const updatedStudents = group.students.filter((_, index) => index !== studentIndex);
      updateGroup(groupId, { students: updatedStudents });
    }
  };

  const addPanelMember = (groupId: string, facultyId: string, role: PanelRole) => {
    const group = studentGroups.find(g => g.id === groupId);
    const facultyMember = faculty.find(f => f.id === facultyId);
    
    if (group && facultyMember) {
      // Check if this faculty member is already assigned to this group
      const existingMember = group.panelMembers.find(m => m.id === facultyId);
      
      if (existingMember) {
        // Add the role if not already present
        const updatedRoles = existingMember.roles.includes(role) 
          ? existingMember.roles 
          : [...existingMember.roles, role];
          
        const updatedPanelMembers = group.panelMembers.map(member =>
          member.id === facultyId ? { ...member, roles: updatedRoles } : member
        );
        updateGroup(groupId, { panelMembers: updatedPanelMembers });
      } else {
        // Add new panel member with the role
        const newPanelMember: PanelMember = {
          id: facultyMember.id,
          name: facultyMember.name,
          roles: [role],
          currentAppearances: facultyMember.totalAppearances,
          isFlagged: facultyMember.isFlagged
        };
        
        updateGroup(groupId, {
          panelMembers: [...group.panelMembers, newPanelMember]
        });
      }
      
      // Clear search term
      setSearchTerms({ ...searchTerms, [groupId]: '' });
    }
  };

  const removePanelMember = (groupId: string, facultyId: string) => {
    const group = studentGroups.find(g => g.id === groupId);
    if (group) {
      const updatedPanelMembers = group.panelMembers.filter(member => member.id !== facultyId);
      updateGroup(groupId, { panelMembers: updatedPanelMembers });
    }
  };

  const removeRoleFromPanelMember = (groupId: string, facultyId: string, roleToRemove: PanelRole) => {
    const group = studentGroups.find(g => g.id === groupId);
    if (group) {
      const updatedPanelMembers = group.panelMembers.map(member => {
        if (member.id === facultyId) {
          const updatedRoles = member.roles.filter(role => role !== roleToRemove);
          return { ...member, roles: updatedRoles };
        }
        return member;
      }).filter(member => member.roles.length > 0); // Remove member if no roles left
      
      updateGroup(groupId, { panelMembers: updatedPanelMembers });
    }
  };

  const getFilteredFaculty = (groupId: string) => {
    const searchTerm = searchTerms[groupId] || '';
    return faculty.filter(f => 
      f.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const getRoleIcon = (roles: PanelRole[]) => {
    // Return icon based on primary role (first role) or most important role
    if (roles.includes('Chairperson')) return Users;
    if (roles.includes('Language Editor') || roles.includes('Statistician')) return BookOpen;
    return Users;
  };

  const getRoleColors = (role: PanelRole) => {
    switch (role) {
      case 'Advisor':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'Chairperson':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'Adviser':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'Statistician':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300';
      case 'Language Editor':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300';
      case 'Validator':
        return 'bg-teal-100 text-teal-800 dark:bg-teal-900/20 dark:text-teal-300';
      case 'Secretary':
        return 'bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-300';
      default: // Panel Member
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">Student Groups & Assign Panel</h2>
      
      <div className="space-y-6">
        {studentGroups.map((group, index) => {
          const isExpanded = expandedGroups.has(group.id);
          const filteredFaculty = getFilteredFaculty(group.id);
          const searchTerm = searchTerms[group.id] || '';
          
          return (
            <div key={group.id} className="border-2 border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
              {/* Group Header */}
              <div 
                className="bg-green-50 dark:bg-green-900/20 px-4 py-3 cursor-pointer"
                onClick={() => toggleGroupExpansion(group.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <BookOpen className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                      📝 Group {index + 1}
                    </h3>
                    {group.researchTitle && (
                      <span className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-md">
                        - {group.researchTitle}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      {group.students.filter(s => s.trim()).length} students, {group.panelMembers.length} panelists
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                </div>
              </div>

              {/* Group Content */}
              {isExpanded && (
                <div className="p-4 space-y-6">
                  {/* Research Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Research Title
                    </label>
                    <input
                      type="text"
                      value={group.researchTitle}
                      onChange={(e) => updateGroup(group.id, { researchTitle: e.target.value })}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 hover:border-green-400 transition-colors bg-white dark:bg-gray-700 dark:text-gray-200"
                      placeholder="Enter research title..."
                    />
                  </div>

                  {/* Students Section */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Students:
                    </label>
                    <div className="space-y-2">
                      {group.students.map((student, studentIndex) => (
                        <div key={studentIndex} className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={student}
                            onChange={(e) => updateStudent(group.id, studentIndex, e.target.value)}
                            className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 hover:border-green-400 transition-colors bg-white dark:bg-gray-700 dark:text-gray-200"
                            placeholder="Student Name"
                          />
                          {group.students.length > 1 && (
                            <button
                              onClick={() => removeStudent(group.id, studentIndex)}
                              className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        onClick={() => addStudent(group.id)}
                        className="flex items-center space-x-2 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        <span className="text-sm font-medium">Add Student</span>
                      </button>
                    </div>
                  </div>

                  {/* Panel Assignment Section */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Assigned Panelists:
                    </label>
                    
                    {/* Faculty Search */}
                    <div className="relative mb-4">
                      <Search className="w-4 h-4 text-gray-400 dark:text-gray-500 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerms({ ...searchTerms, [group.id]: e.target.value })}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 hover:border-green-400 transition-colors bg-white dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
                        placeholder="🔍 Search faculty by name..."
                      />
                      
                      {/* Faculty Search Results */}
                      {searchTerm && (
                        <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg mt-1 shadow-lg z-10 max-h-64 overflow-y-auto">
                          {filteredFaculty.map(facultyMember => {
                            const existingMember = group.panelMembers.find(m => m.id === facultyMember.id);
                            return (
                              <div key={facultyMember.id} className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <p className="font-medium text-gray-800 dark:text-gray-200">{facultyMember.name}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                      {facultyMember.department} • {facultyMember.totalAppearances} appearances
                                      {facultyMember.isFlagged && <span className="text-red-600 dark:text-red-400 ml-1">(Flagged)</span>}
                                    </p>
                                    {existingMember && (
                                      <div className="mt-2">
                                        <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-1">Current roles:</p>
                                        <div className="flex flex-wrap gap-1">
                                          {existingMember.roles.map((role) => (
                                            <span
                                              key={role}
                                              className={`px-1.5 py-0.5 rounded text-xs ${getRoleColors(role)}`}
                                            >
                                              {role}
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                  <div className="ml-3">
                                    <select
                                      onChange={(e) => {
                                        if (e.target.value) {
                                          addPanelMember(group.id, facultyMember.id, e.target.value as PanelRole);
                                          e.target.value = '';
                                        }
                                      }}
                                      className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 dark:text-gray-200 text-sm"
                                    >
                                      <option value="">
                                        {existingMember ? 'Add Role' : 'Select Role'}
                                      </option>
                                      <option value="Advisor">Advisor</option>
                                      <option value="Chairperson">Chairperson</option>
                                      <option value="Panel Member">Panel Member</option>
                                      <option value="Statistician">Statistician</option>
                                      <option value="Language Editor">Language Editor</option>
                                      <option value="Validator">Validator</option>
                                      <option value="Secretary">Secretary</option>
                                      <option value="Adviser">Adviser (Legacy)</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                          {filteredFaculty.length === 0 && (
                            <div className="p-3 text-center text-gray-500 dark:text-gray-400">
                              No faculty found
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Selected Panel Members */}
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Selected Panel Members:</p>
                      {group.panelMembers.length === 0 ? (
                        <p className="text-sm text-gray-500 dark:text-gray-400 italic">No panel members assigned yet</p>
                      ) : (
                        group.panelMembers.map((member) => {
                          const IconComponent = getRoleIcon(member.roles);
                          return (
                            <div key={member.id} className="p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg">
                              <div className="flex items-start justify-between">
                                <div className="flex items-start space-x-3 flex-1">
                                  <IconComponent className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-2">
                                      <p className="font-medium text-gray-800 dark:text-gray-200">
                                        {member.name}
                                      </p>
                                      <p className="text-sm text-gray-600 dark:text-gray-400">
                                        ({member.currentAppearances} appearances)
                                      </p>
                                      {member.isFlagged && (
                                        <span className="text-red-600 dark:text-red-400 text-sm font-medium">⚠️ Flagged</span>
                                      )}
                                    </div>
                                    
                                    {/* Multiple Role Badges */}
                                    <div className="flex flex-wrap gap-1">
                                      {member.roles.map((role) => (
                                        <div
                                          key={role}
                                          className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getRoleColors(role)}`}
                                        >
                                          <span>{role}</span>
                                          <button
                                            onClick={() => removeRoleFromPanelMember(group.id, member.id, role)}
                                            className="hover:bg-black/10 dark:hover:bg-white/10 rounded-full p-0.5 transition-colors"
                                            title={`Remove ${role} role`}
                                          >
                                            <X className="w-3 h-3" />
                                          </button>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                <button
                                  onClick={() => removePanelMember(group.id, member.id)}
                                  className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors ml-2"
                                  title="Remove entire panel member"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                  {/* Delete Group Button */}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
                    <button
                      onClick={() => deleteGroup(group.id)}
                      className="flex items-center space-x-2 px-4 py-2 text-red-600 dark:text-red-400 border border-red-300 dark:border-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete Group</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Add New Group Button */}
        <button
          onClick={addNewGroup}
          className="w-full flex items-center justify-center space-x-3 py-4 border-2 border-dashed border-green-300 dark:border-green-600 rounded-lg hover:border-green-400 dark:hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Add New Group</span>
        </button>

        {/* Summary */}
        {studentGroups.length > 0 && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Summary</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-blue-600 dark:text-blue-400 font-medium">Total Groups:</span>
                <span className="ml-2 text-blue-800 dark:text-blue-200">{studentGroups.length}</span>
              </div>
              <div>
                <span className="text-blue-600 dark:text-blue-400 font-medium">Total Students:</span>
                <span className="ml-2 text-blue-800 dark:text-blue-200">
                  {studentGroups.reduce((total, group) => total + group.students.filter(s => s.trim()).length, 0)}
                </span>
              </div>
              <div>
                <span className="text-blue-600 dark:text-blue-400 font-medium">Total Panel Assignments:</span>
                <span className="ml-2 text-blue-800 dark:text-blue-200">
                  {studentGroups.reduce((total, group) => total + group.panelMembers.length, 0)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentGroupsPanel;