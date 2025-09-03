import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  Filter,
  Download,
  Plus,
  Calendar,
  GraduationCap,
  Users,
  Banknote,
  Eye,
  Edit3,
  Trash2,
  AlertTriangle,
  X
} from 'lucide-react';

// Types for Appearances Table
interface AppearanceRecord {
  id: string;
  schoolYear: string;
  semester: '1st Semester' | '2nd Semester';
  defenseType: 'Pre-Oral' | 'Final';
  totalAppearances: number;
  totalConsolidated: number;
  facultyCount: number;
  createdAt: string;
  status: 'Active' | 'Completed' | 'Draft';
}

// Animated Counter Component
const AnimatedCounter: React.FC<{ 
  value: number; 
  duration?: number; 
  prefix?: string; 
  suffix?: string;
  formatNumber?: boolean;
}> = ({ value, duration = 1500, prefix = '', suffix = '', formatNumber = false }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Use easeOutQuart for smooth animation
      const easedProgress = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(easedProgress * value);
      
      setDisplayValue(currentValue);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [value, duration]);

  const formattedValue = formatNumber ? displayValue.toLocaleString() : displayValue.toString();
  
  return <span>{prefix}{formattedValue}{suffix}</span>;
};

const Appearances: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [filterSemester, setFilterSemester] = useState('');
  const [filterDefenseType, setFilterDefenseType] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSchoolYear, setNewSchoolYear] = useState('');
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<AppearanceRecord | null>(null);
  const [animatedCards, setAnimatedCards] = useState<boolean[]>([false, false, false, false]);
  const [animatedFilters, setAnimatedFilters] = useState<boolean[]>([false, false, false, false, false]);
  const [animatedTable, setAnimatedTable] = useState(false);
  const [animatedHeader, setAnimatedHeader] = useState(false);

  // Sample data for the appearances table
  const [appearanceData, setAppearanceData] = useState<AppearanceRecord[]>([
    {
      id: '1',
      schoolYear: '2024-2025',
      semester: '1st Semester',
      defenseType: 'Pre-Oral',
      totalAppearances: 45,
      totalConsolidated: 89750,
      facultyCount: 12,
      createdAt: '2024-08-15',
      status: 'Active'
    },
    {
      id: '2',
      schoolYear: '2024-2025',
      semester: '1st Semester',
      defenseType: 'Final',
      totalAppearances: 38,
      totalConsolidated: 152600,
      facultyCount: 15,
      createdAt: '2024-08-15',
      status: 'Active'
    },
    {
      id: '3',
      schoolYear: '2024-2025',
      semester: '2nd Semester',
      defenseType: 'Pre-Oral',
      totalAppearances: 52,
      totalConsolidated: 104800,
      facultyCount: 18,
      createdAt: '2024-01-10',
      status: 'Completed'
    },
    {
      id: '4',
      schoolYear: '2024-2025',
      semester: '2nd Semester',
      defenseType: 'Final',
      totalAppearances: 41,
      totalConsolidated: 167450,
      facultyCount: 14,
      createdAt: '2024-01-10',
      status: 'Completed'
    },
    {
      id: '5',
      schoolYear: '2023-2024',
      semester: '1st Semester',
      defenseType: 'Pre-Oral',
      totalAppearances: 48,
      totalConsolidated: 92400,
      facultyCount: 16,
      createdAt: '2023-08-20',
      status: 'Completed'
    },
    {
      id: '6',
      schoolYear: '2023-2024',
      semester: '1st Semester',
      defenseType: 'Final',
      totalAppearances: 35,
      totalConsolidated: 143750,
      facultyCount: 13,
      createdAt: '2023-08-20',
      status: 'Completed'
    },
    {
      id: '7',
      schoolYear: '2023-2024',
      semester: '2nd Semester',
      defenseType: 'Pre-Oral',
      totalAppearances: 43,
      totalConsolidated: 86650,
      facultyCount: 15,
      createdAt: '2023-01-15',
      status: 'Completed'
    },
    {
      id: '8',
      schoolYear: '2023-2024',
      semester: '2nd Semester',
      defenseType: 'Final',
      totalAppearances: 39,
      totalConsolidated: 158250,
      facultyCount: 12,
      createdAt: '2023-01-15',
      status: 'Completed'
    }
  ]);

  // Filtered data
  const filteredData = useMemo(() => {
    return appearanceData.filter(record => {
      const matchesSearch = 
        record.schoolYear.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.semester.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.defenseType.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesYear = !filterYear || record.schoolYear === filterYear;
      const matchesSemester = !filterSemester || record.semester === filterSemester;
      const matchesDefenseType = !filterDefenseType || record.defenseType === filterDefenseType;
      
      return matchesSearch && matchesYear && matchesSemester && matchesDefenseType;
    });
  }, [appearanceData, searchTerm, filterYear, filterSemester, filterDefenseType]);

  // Get unique values for filters
  const uniqueYears = [...new Set(appearanceData.map(record => record.schoolYear))];
  const uniqueSemesters = [...new Set(appearanceData.map(record => record.semester))];
  const uniqueDefenseTypes = [...new Set(appearanceData.map(record => record.defenseType))];

  // Calculate totals
  const totalAppearances = filteredData.reduce((sum, record) => sum + record.totalAppearances, 0);
  const totalConsolidated = filteredData.reduce((sum, record) => sum + record.totalConsolidated, 0);
  const totalFacultyInvolved = filteredData.reduce((sum, record) => sum + record.facultyCount, 0);

  // Animation effect for header, cards, filters, and table on mount
  useEffect(() => {
    // Header animation (starts immediately)
    const headerTimer = setTimeout(() => {
      setAnimatedHeader(true);
    }, 200);

    // Cards animation
    const cardTimers = [0, 1, 2, 3].map((index) => 
      setTimeout(() => {
        setAnimatedCards(prev => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      }, 400 + (index * 150)) // Stagger animations by 150ms, start after header
    );

    // Filters animation (starts after cards)
    const filterTimers = [0, 1, 2, 3, 4].map((index) => 
      setTimeout(() => {
        setAnimatedFilters(prev => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      }, 1200 + (index * 100)) // Start after cards, stagger by 100ms
    );

    // Table animation (starts after filters)
    const tableTimer = setTimeout(() => {
      setAnimatedTable(true);
    }, 1800);

    return () => {
      clearTimeout(headerTimer);
      cardTimers.forEach(clearTimeout);
      filterTimers.forEach(clearTimeout);
      clearTimeout(tableTimer);
    };
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Draft':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Function to handle view details
  const handleViewDetails = (record: AppearanceRecord) => {
    setSelectedRecord(record);
    setShowViewModal(true);
  };

  // Function to add new school year with all combinations
  const handleAddNewSchoolYear = () => {
    if (!newSchoolYear.trim()) {
      alert('Please enter a school year');
      return;
    }

    // Check if school year already exists
    const yearExists = appearanceData.some(record => record.schoolYear === newSchoolYear);
    if (yearExists) {
      alert('This school year already exists in the appearances');
      return;
    }

    // Create 4 new records for all combinations
    const newRecords: AppearanceRecord[] = [
      {
        id: `${Date.now()}-1`,
        schoolYear: newSchoolYear,
        semester: '1st Semester',
        defenseType: 'Pre-Oral',
        totalAppearances: 0,
        totalConsolidated: 0,
        facultyCount: 0,
        createdAt: new Date().toISOString(),
        status: 'Draft'
      },
      {
        id: `${Date.now()}-2`,
        schoolYear: newSchoolYear,
        semester: '1st Semester',
        defenseType: 'Final',
        totalAppearances: 0,
        totalConsolidated: 0,
        facultyCount: 0,
        createdAt: new Date().toISOString(),
        status: 'Draft'
      },
      {
        id: `${Date.now()}-3`,
        schoolYear: newSchoolYear,
        semester: '2nd Semester',
        defenseType: 'Pre-Oral',
        totalAppearances: 0,
        totalConsolidated: 0,
        facultyCount: 0,
        createdAt: new Date().toISOString(),
        status: 'Draft'
      },
      {
        id: `${Date.now()}-4`,
        schoolYear: newSchoolYear,
        semester: '2nd Semester',
        defenseType: 'Final',
        totalAppearances: 0,
        totalConsolidated: 0,
        facultyCount: 0,
        createdAt: new Date().toISOString(),
        status: 'Draft'
      }
    ];

    // Add new records to the existing data
    setAppearanceData(prevData => [...prevData, ...newRecords]);
    
    // Reset form and close modal
    setNewSchoolYear('');
    setShowAddModal(false);
    
    // Show success message
    alert(`Successfully added ${newSchoolYear} with all semester and defense type combinations!`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`flex items-center justify-between transform transition-all duration-800 ease-out ${
        animatedHeader ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`}>
        <div className="transform transition-all duration-500 hover:scale-105">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 transition-colors duration-300 hover:text-green-600 dark:hover:text-green-400">
            Appearances
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1 transition-colors duration-300 hover:text-gray-800 dark:hover:text-gray-300">
            Comprehensive view of faculty appearances and consolidateds by academic period
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 hover:shadow-lg transform hover:scale-105 active:scale-95"
          >
            <Plus className="w-4 h-4 transition-transform duration-300 hover:rotate-180" />
            <span>Add New Period</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Total Records Card */}
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-blue-500 transform transition-all duration-700 ease-out hover:scale-105 hover:shadow-xl hover:border-l-8 ${
          animatedCards[0] 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 transition-colors duration-300">Total Records</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-gray-200 transition-all duration-500">
                <AnimatedCounter value={filteredData.length} duration={1200} />
              </p>
            </div>
            <Calendar className="w-8 h-8 text-blue-500 transition-all duration-300 hover:rotate-12 hover:scale-110" />
          </div>
          <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-2 transition-all duration-300 hover:bg-blue-100 dark:hover:bg-blue-900/30">
            <p className="text-xs text-blue-700 dark:text-blue-300 font-medium">Active Records System</p>
          </div>
        </div>

        {/* Total Appearances Card */}
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-green-500 transform transition-all duration-700 ease-out hover:scale-105 hover:shadow-xl hover:border-l-8 ${
          animatedCards[1] 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 transition-colors duration-300">Total Appearances</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-gray-200 transition-all duration-500">
                <AnimatedCounter value={totalAppearances} duration={1400} />
              </p>
            </div>
            <Users className="w-8 h-8 text-green-500 transition-all duration-300 hover:rotate-12 hover:scale-110" />
          </div>
          <div className="mt-4 bg-green-50 dark:bg-green-900/20 rounded-lg p-2 transition-all duration-300 hover:bg-green-100 dark:hover:bg-green-900/30">
            <p className="text-xs text-green-700 dark:text-green-300 font-medium">Faculty Engagements</p>
          </div>
        </div>

        {/* Total Consolidated Card */}
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-purple-500 transform transition-all duration-700 ease-out hover:scale-105 hover:shadow-xl hover:border-l-8 ${
          animatedCards[2] 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 transition-colors duration-300">Total Consolidated</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-gray-200 transition-all duration-500">
                <AnimatedCounter value={totalConsolidated} duration={1600} prefix="₱" formatNumber={true} />
              </p>
            </div>
            <Banknote className="w-8 h-8 text-purple-500 transition-all duration-300 hover:rotate-12 hover:scale-110" />
          </div>
          <div className="mt-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg p-2 transition-all duration-300 hover:bg-purple-100 dark:hover:bg-purple-900/30">
            <p className="text-xs text-purple-700 dark:text-purple-300 font-medium">Philippine Pesos</p>
          </div>
        </div>

        {/* Faculty Involved Card */}
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-orange-500 transform transition-all duration-700 ease-out hover:scale-105 hover:shadow-xl hover:border-l-8 ${
          animatedCards[3] 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 transition-colors duration-300">Faculty Involved</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-gray-200 transition-all duration-500">
                <AnimatedCounter value={totalFacultyInvolved} duration={1800} />
              </p>
            </div>
            <GraduationCap className="w-8 h-8 text-orange-500 transition-all duration-300 hover:rotate-12 hover:scale-110" />
          </div>
          <div className="mt-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg p-2 transition-all duration-300 hover:bg-orange-100 dark:hover:bg-orange-900/30">
            <p className="text-xs text-orange-700 dark:text-orange-300 font-medium">Academic Personnel</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transform transition-all duration-700 ease-out ${
        animatedTable ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        <div className="flex items-center space-x-2 mb-4">
          <Filter className="w-5 h-5 text-gray-500 transition-all duration-300 hover:rotate-180 hover:text-blue-500" />
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 transition-colors duration-300">Filters & Search</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Search */}
          <div className={`relative transform transition-all duration-500 ease-out ${
            animatedFilters[0] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
          }`}>
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3 transition-all duration-300 hover:text-blue-500 hover:scale-110" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400 transition-all duration-300 hover:shadow-md focus:shadow-lg transform focus:scale-[1.02]"
              placeholder="Search records..."
            />
            {searchTerm && (
              <div className="absolute inset-0 rounded-lg bg-blue-50 dark:bg-blue-900/10 -z-10 animate-pulse"></div>
            )}
          </div>

          {/* School Year Filter */}
          <div className={`transform transition-all duration-500 ease-out ${
            animatedFilters[1] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
          }`}>
            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 dark:text-gray-200 transition-all duration-300 hover:shadow-md focus:shadow-lg transform hover:scale-[1.02] focus:scale-[1.02]"
            >
              <option value="">All School Years</option>
              {uniqueYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            {filterYear && (
              <div className="absolute inset-0 rounded-lg bg-green-50 dark:bg-green-900/10 -z-10 animate-pulse"></div>
            )}
          </div>

          {/* Semester Filter */}
          <div className={`transform transition-all duration-500 ease-out ${
            animatedFilters[2] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
          }`}>
            <select
              value={filterSemester}
              onChange={(e) => setFilterSemester(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 dark:text-gray-200 transition-all duration-300 hover:shadow-md focus:shadow-lg transform hover:scale-[1.02] focus:scale-[1.02]"
            >
              <option value="">All Semesters</option>
              {uniqueSemesters.map(semester => (
                <option key={semester} value={semester}>{semester}</option>
              ))}
            </select>
            {filterSemester && (
              <div className="absolute inset-0 rounded-lg bg-purple-50 dark:bg-purple-900/10 -z-10 animate-pulse"></div>
            )}
          </div>

          {/* Defense Type Filter */}
          <div className={`transform transition-all duration-500 ease-out ${
            animatedFilters[3] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
          }`}>
            <select
              value={filterDefenseType}
              onChange={(e) => setFilterDefenseType(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 dark:text-gray-200 transition-all duration-300 hover:shadow-md focus:shadow-lg transform hover:scale-[1.02] focus:scale-[1.02]"
            >
              <option value="">All Defense Types</option>
              {uniqueDefenseTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {filterDefenseType && (
              <div className="absolute inset-0 rounded-lg bg-orange-50 dark:bg-orange-900/10 -z-10 animate-pulse"></div>
            )}
          </div>

          {/* Clear Filters */}
          <div className={`transform transition-all duration-500 ease-out ${
            animatedFilters[4] ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
          }`}>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterYear('');
                setFilterSemester('');
                setFilterDefenseType('');
              }}
              className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-300 hover:shadow-lg transform hover:scale-105 active:scale-95 hover:rotate-1 active:rotate-0"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Main Data Table */}
      <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transform transition-all duration-700 ease-out ${
        animatedTable ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 transition-colors duration-300">
                Appearance Records
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 transition-all duration-500">
                <AnimatedCounter value={filteredData.length} duration={800} suffix=" records found" />
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-500 dark:text-gray-400">Live Data</span>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  School Year
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Semester
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Defense Type
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Total Appearances
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Total Consolidated
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Faculty Count
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredData.map((record, index) => (
                <tr 
                  key={record.id} 
                  className={`hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 hover:shadow-lg hover:scale-[1.01] transform ${
                    index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700/50'
                  } ${
                    animatedTable 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 translate-x-4'
                  }`}
                  style={{ 
                    transitionDelay: `${Math.min(index * 50, 500)}ms`,
                    animationDelay: `${Math.min(index * 50, 500)}ms`
                  }}
                >
                  {/* School Year */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                        {record.schoolYear}
                      </span>
                    </div>
                  </td>

                  {/* Semester */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      record.semester === '1st Semester' 
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' 
                        : 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
                    }`}>
                      {record.semester}
                    </span>
                  </td>

                  {/* Defense Type */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      record.defenseType === 'Pre-Oral' 
                        ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400' 
                        : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    }`}>
                      {record.defenseType}
                    </span>
                  </td>

                  {/* Total Appearances */}
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center">
                      <Users className="w-4 h-4 text-gray-400 mr-1" />
                      <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                        {record.totalAppearances}
                      </span>
                    </div>
                  </td>

                  {/* Total Consolidated */}
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center">
                      <Banknote className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                        ₱{record.totalConsolidated.toLocaleString()}
                      </span>
                    </div>
                  </td>

                  {/* Faculty Count */}
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center">
                      <GraduationCap className="w-4 h-4 text-blue-500 mr-1" />
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {record.facultyCount}
                      </span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(record.status)}`}>
                      {record.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => handleViewDetails(record)}
                        className="p-1.5 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-all duration-300 hover:shadow-md transform hover:scale-110 hover:rotate-12 active:scale-95"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4 transition-transform duration-300" />
                      </button>
                      <button
                        className="p-1.5 text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-all duration-300 hover:shadow-md transform hover:scale-110 hover:-rotate-12 active:scale-95"
                        title="Edit Record"
                      >
                        <Edit3 className="w-4 h-4 transition-transform duration-300" />
                      </button>
                      <button
                        className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all duration-300 hover:shadow-md transform hover:scale-110 hover:rotate-12 active:scale-95"
                        title="Delete Record"
                      >
                        <Trash2 className="w-4 h-4 transition-transform duration-300 hover:animate-pulse" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            {/* Table Footer with Totals */}
            <tfoot className={`bg-gray-100 dark:bg-gray-700 transition-all duration-700 ${
              animatedTable ? 'opacity-100' : 'opacity-0'
            }`}>
              <tr className="hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300">
                <td colSpan={3} className="px-6 py-4 text-sm font-medium text-gray-800 dark:text-gray-200 transition-colors duration-300">
                  <strong>
                    TOTALS (<AnimatedCounter value={filteredData.length} duration={600} /> records)
                  </strong>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center transition-all duration-300 hover:scale-105">
                    <Users className="w-4 h-4 text-gray-500 mr-1 transition-all duration-300 hover:text-blue-500 hover:rotate-12" />
                    <span className="text-sm font-bold text-gray-800 dark:text-gray-200 transition-colors duration-300">
                      <AnimatedCounter value={totalAppearances} duration={800} />
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center transition-all duration-300 hover:scale-105">
                    <Banknote className="w-4 h-4 text-green-600 mr-1 transition-all duration-300 hover:text-green-700 hover:rotate-12" />
                    <span className="text-sm font-bold text-green-600 dark:text-green-400 transition-colors duration-300">
                      <AnimatedCounter value={totalConsolidated} duration={1000} prefix="₱" formatNumber={true} />
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center transition-all duration-300 hover:scale-105">
                    <GraduationCap className="w-4 h-4 text-blue-600 mr-1 transition-all duration-300 hover:text-blue-700 hover:rotate-12" />
                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400 transition-colors duration-300">
                      <AnimatedCounter value={totalFacultyInvolved} duration={900} />
                    </span>
                  </div>
                </td>
                <td colSpan={2} className="px-6 py-4"></td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Empty State */}
        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">No records found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              No appearance records match your current filters.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterYear('');
                setFilterSemester('');
                setFilterDefenseType('');
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* Add New School Year Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Add New School Year
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Enter a school year to automatically create records for all semester and defense type combinations.
            </p>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                School Year
              </label>
              <input
                type="text"
                value={newSchoolYear}
                onChange={(e) => setNewSchoolYear(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 dark:text-gray-200"
                placeholder="e.g., 2025-2026"
                autoFocus
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Format: YYYY-YYYY (e.g., 2025-2026)
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                This will create 4 records:
              </h4>
              <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
                <li>• 1st Semester - Pre-Oral Defense</li>
                <li>• 1st Semester - Final Defense</li>
                <li>• 2nd Semester - Pre-Oral Defense</li>
                <li>• 2nd Semester - Final Defense</li>
              </ul>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleAddNewSchoolYear}
                disabled={!newSchoolYear.trim()}
                className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                  newSchoolYear.trim()
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                }`}
              >
                Add School Year
              </button>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setNewSchoolYear('');
                }}
                className="flex-1 px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {showViewModal && selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-7xl max-h-[95vh] overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                    CERTIFIED HONORARIUM REQUEST
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium">RESEARCH {selectedRecord.defenseType.toUpperCase()} DEFENSE</span>
                    <span>•</span>
                    <span>{selectedRecord.schoolYear}</span>
                    <span>•</span>
                    <span>{selectedRecord.semester}</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-auto max-h-[calc(95vh-120px)]">
              {/* Honorarium Table */}
              <div className="mb-6 overflow-x-auto">
                <table className="w-full border-collapse border border-gray-400 dark:border-gray-500 text-sm">
                  {/* Table Headers */}
                  <thead>
                    {/* First Header Row - Committee Roles */}
                    <tr className="bg-gray-100 dark:bg-gray-700">
                      <th className="border border-gray-400 dark:border-gray-500 px-3 py-2 text-center font-bold text-gray-800 dark:text-gray-200 w-32" rowSpan={2}>
                        Name
                      </th>
                      <th className="border border-gray-400 dark:border-gray-500 px-2 py-2 text-center font-bold text-blue-800 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30" colSpan={4}>
                        Chairman
                      </th>
                      <th className="border border-gray-400 dark:border-gray-500 px-2 py-2 text-center font-bold text-green-800 dark:text-green-300 bg-green-50 dark:bg-green-900/30" colSpan={4}>
                        Adviser
                      </th>
                      <th className="border border-gray-400 dark:border-gray-500 px-2 py-2 text-center font-bold text-yellow-800 dark:text-yellow-300 bg-yellow-50 dark:bg-yellow-900/30" colSpan={4}>
                        Panel Member
                      </th>
                      <th className="border border-gray-400 dark:border-gray-500 px-2 py-2 text-center font-bold text-purple-800 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/30" colSpan={4}>
                        Validator
                      </th>
                      <th className="border border-gray-400 dark:border-gray-500 px-2 py-2 text-center font-bold text-pink-800 dark:text-pink-300 bg-pink-50 dark:bg-pink-900/30" colSpan={4}>
                        Statistician
                      </th>
                      <th className="border border-gray-400 dark:border-gray-500 px-2 py-2 text-center font-bold text-indigo-800 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/30" colSpan={4}>
                        Secretary
                      </th>
                      <th className="border border-gray-400 dark:border-gray-500 px-2 py-2 text-center font-bold text-orange-800 dark:text-orange-300 bg-orange-50 dark:bg-orange-900/30" colSpan={4}>
                        Reader
                      </th>
                      <th className="border border-gray-400 dark:border-gray-500 px-2 py-2 text-center font-bold text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-900/30" rowSpan={2}>
                        Total Appearances
                      </th>
                      <th className="border border-gray-400 dark:border-gray-500 px-2 py-2 text-center font-bold text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-900/30" rowSpan={2}>
                        Total Consolidated
                      </th>
                    </tr>
                    {/* Second Header Row - Program Levels */}
                    <tr className="bg-gray-50 dark:bg-gray-600">
                      {/* Repeat for each role: Chairman, Adviser, Panel Member, Validator, Statistician, Secretary, Reader */}
                      {Array.from({ length: 7 }, (_, roleIndex) => (
                        <React.Fragment key={roleIndex}>
                          <th className="border border-gray-400 dark:border-gray-500 px-1 py-1 text-center font-medium text-gray-700 dark:text-gray-300 text-xs w-16">Doctorate</th>
                          <th className="border border-gray-400 dark:border-gray-500 px-1 py-1 text-center font-medium text-gray-700 dark:text-gray-300 text-xs w-16">Master</th>
                          <th className="border border-gray-400 dark:border-gray-500 px-1 py-1 text-center font-medium text-gray-700 dark:text-gray-300 text-xs w-16">Tertiary</th>
                          <th className="border border-gray-400 dark:border-gray-500 px-1 py-1 text-center font-medium text-gray-700 dark:text-gray-300 text-xs w-16">Basic</th>
                        </React.Fragment>
                      ))}
                    </tr>
                  </thead>
                  
                  {/* Table Body with Sample Data */}
                  <tbody>
                    {[
                      { name: "Dr. Maria Santos", data: [2, 0, 1, 0, 1, 0, 0, 0, 3, 0, 0, 1, 0, 2, 0, 0, 1, 0, 2, 0, 0, 0, 1, 0, 0, 1, 0, 0] },
                      { name: "Prof. Juan Dela Cruz", data: [0, 1, 0, 2, 0, 0, 2, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 1, 0, 0, 0, 2, 0, 0, 1] },
                      { name: "Dr. Ana Reyes", data: [1, 0, 0, 0, 2, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0] },
                      { name: "Mr. Carlos Garcia", data: [0, 0, 2, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 0, 2, 0, 1, 0, 0, 0, 0, 1, 0, 2, 0, 0] },
                      { name: "Ms. Elena Flores", data: [0, 2, 0, 0, 0, 0, 1, 0, 1, 0, 0, 2, 0, 0, 0, 1, 0, 0, 0, 1, 0, 2, 0, 0, 1, 0, 0, 0] },
                      { name: "Dr. Roberto Martinez", data: [1, 0, 0, 1, 0, 0, 0, 2, 0, 0, 2, 0, 1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1] },
                      { name: "Prof. Carmen Torres", data: [0, 0, 1, 0, 1, 2, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 2, 0, 0, 0, 0, 1, 2, 0] },
                      { name: "Dr. Luis Hernandez", data: [2, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 2, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2, 0, 0, 0, 1] },
                      { name: "Ms. Patricia Ramos", data: [0, 1, 0, 0, 0, 1, 2, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0] },
                      { name: "Mr. Francisco Lopez", data: [0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0] }
                    ].map((faculty, rowIndex) => (
                      <tr key={rowIndex} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        {/* Faculty Name */}
                        <td className="border border-gray-400 dark:border-gray-500 px-3 py-2 font-medium text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-600">
                          {faculty.name}
                        </td>
                        {/* Data cells - 28 cells for 7 roles × 4 degrees each */}
                        {faculty.data.map((value, cellIndex) => (
                          <td key={cellIndex} className="border border-gray-400 dark:border-gray-500 px-2 py-2 text-center text-gray-700 dark:text-gray-300">
                            {value > 0 ? value : ''}
                          </td>
                        ))}
                        {/* Total Appearances */}
                        <td className="border border-gray-400 dark:border-gray-500 px-3 py-2 text-center font-bold text-blue-800 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20">
                          {faculty.data.reduce((sum, value) => sum + value, 0)}
                        </td>
                        {/* Total Consolidated - Calculate based on appearances and role rates */}
                        <td className="border border-gray-400 dark:border-gray-500 px-3 py-2 text-center font-bold text-green-800 dark:text-green-300 bg-green-50 dark:bg-green-900/20">
                          ₱{(() => {
                            // Base rates per role per appearance (in PHP)
                            const roleRates = [4000, 3500, 3000, 2500, 3500, 2500, 2000]; // Chairman, Adviser, Panel, Validator, Statistician, Secretary, Reader
                            const levelMultipliers = [1.5, 1.3, 1.1, 1.0]; // Doctorate, Master, Tertiary, Basic
                            
                            let totalConsolidated = 0;
                            faculty.data.forEach((appearances, index) => {
                              if (appearances > 0) {
                                const roleIndex = Math.floor(index / 4);
                                const levelIndex = index % 4;
                                const baseRate = roleRates[roleIndex] || 2000;
                                const multiplier = levelMultipliers[levelIndex] || 1.0;
                                totalConsolidated += appearances * baseRate * multiplier;
                              }
                            });
                            
                            return totalConsolidated.toLocaleString();
                          })()}
                        </td>
                      </tr>
                    ))}
                    
                    {/* Total Row */}
                    <tr className="bg-yellow-100 dark:bg-yellow-900/30 font-bold">
                      <td className="border border-gray-400 dark:border-gray-500 px-3 py-2 text-center font-bold text-gray-800 dark:text-gray-200">
                        TOTAL
                      </td>
                      {/* Calculate totals for each column */}
                      {Array.from({ length: 28 }, (_, colIndex) => {
                        const total = [
                          { name: "Dr. Maria Santos", data: [2, 0, 1, 0, 1, 0, 0, 0, 3, 0, 0, 1, 0, 2, 0, 0, 1, 0, 2, 0, 0, 0, 1, 0, 0, 1, 0, 0] },
                          { name: "Prof. Juan Dela Cruz", data: [0, 1, 0, 2, 0, 0, 2, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 1, 0, 0, 0, 2, 0, 0, 1] },
                          { name: "Dr. Ana Reyes", data: [1, 0, 0, 0, 2, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0] },
                          { name: "Mr. Carlos Garcia", data: [0, 0, 2, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 0, 2, 0, 1, 0, 0, 0, 0, 1, 0, 2, 0, 0] },
                          { name: "Ms. Elena Flores", data: [0, 2, 0, 0, 0, 0, 1, 0, 1, 0, 0, 2, 0, 0, 0, 1, 0, 0, 0, 1, 0, 2, 0, 0, 1, 0, 0, 0] },
                          { name: "Dr. Roberto Martinez", data: [1, 0, 0, 1, 0, 0, 0, 2, 0, 0, 2, 0, 1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1] },
                          { name: "Prof. Carmen Torres", data: [0, 0, 1, 0, 1, 2, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 2, 0, 0, 0, 0, 1, 2, 0] },
                          { name: "Dr. Luis Hernandez", data: [2, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 2, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2, 0, 0, 0, 1] },
                          { name: "Ms. Patricia Ramos", data: [0, 1, 0, 0, 0, 1, 2, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0] },
                          { name: "Mr. Francisco Lopez", data: [0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0] }
                        ].reduce((sum, faculty) => sum + faculty.data[colIndex], 0);
                        
                        return (
                          <td key={colIndex} className="border border-gray-400 dark:border-gray-500 px-2 py-2 text-center font-bold text-gray-800 dark:text-gray-200">
                            {total > 0 ? total : ''}
                          </td>
                        );
                      })}
                      {/* Grand Total Appearances */}
                      <td className="border border-gray-400 dark:border-gray-500 px-3 py-2 text-center font-bold text-blue-900 dark:text-blue-200 bg-blue-100 dark:bg-blue-900/40">
                        {(() => {
                          const facultyData = [
                            { name: "Dr. Maria Santos", data: [2, 0, 1, 0, 1, 0, 0, 0, 3, 0, 0, 1, 0, 2, 0, 0, 1, 0, 2, 0, 0, 0, 1, 0, 0, 1, 0, 0] },
                            { name: "Prof. Juan Dela Cruz", data: [0, 1, 0, 2, 0, 0, 2, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 1, 0, 0, 0, 2, 0, 0, 1] },
                            { name: "Dr. Ana Reyes", data: [1, 0, 0, 0, 2, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0] },
                            { name: "Mr. Carlos Garcia", data: [0, 0, 2, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 0, 2, 0, 1, 0, 0, 0, 0, 1, 0, 2, 0, 0] },
                            { name: "Ms. Elena Flores", data: [0, 2, 0, 0, 0, 0, 1, 0, 1, 0, 0, 2, 0, 0, 0, 1, 0, 0, 0, 1, 0, 2, 0, 0, 1, 0, 0, 0] },
                            { name: "Dr. Roberto Martinez", data: [1, 0, 0, 1, 0, 0, 0, 2, 0, 0, 2, 0, 1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1] },
                            { name: "Prof. Carmen Torres", data: [0, 0, 1, 0, 1, 2, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 2, 0, 0, 0, 0, 1, 2, 0] },
                            { name: "Dr. Luis Hernandez", data: [2, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 2, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2, 0, 0, 0, 1] },
                            { name: "Ms. Patricia Ramos", data: [0, 1, 0, 0, 0, 1, 2, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0] },
                            { name: "Mr. Francisco Lopez", data: [0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0] }
                          ];
                          return facultyData.reduce((total, faculty) => 
                            total + faculty.data.reduce((sum, value) => sum + value, 0), 0
                          );
                        })()}
                      </td>
                      {/* Grand Total Consolidated */}
                      <td className="border border-gray-400 dark:border-gray-500 px-3 py-2 text-center font-bold text-green-900 dark:text-green-200 bg-green-100 dark:bg-green-900/40">
                        ₱{(() => {
                          const facultyData = [
                            { name: "Dr. Maria Santos", data: [2, 0, 1, 0, 1, 0, 0, 0, 3, 0, 0, 1, 0, 2, 0, 0, 1, 0, 2, 0, 0, 0, 1, 0, 0, 1, 0, 0] },
                            { name: "Prof. Juan Dela Cruz", data: [0, 1, 0, 2, 0, 0, 2, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 1, 0, 0, 0, 2, 0, 0, 1] },
                            { name: "Dr. Ana Reyes", data: [1, 0, 0, 0, 2, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0] },
                            { name: "Mr. Carlos Garcia", data: [0, 0, 2, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 0, 2, 0, 1, 0, 0, 0, 0, 1, 0, 2, 0, 0] },
                            { name: "Ms. Elena Flores", data: [0, 2, 0, 0, 0, 0, 1, 0, 1, 0, 0, 2, 0, 0, 0, 1, 0, 0, 0, 1, 0, 2, 0, 0, 1, 0, 0, 0] },
                            { name: "Dr. Roberto Martinez", data: [1, 0, 0, 1, 0, 0, 0, 2, 0, 0, 2, 0, 1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1] },
                            { name: "Prof. Carmen Torres", data: [0, 0, 1, 0, 1, 2, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 2, 0, 0, 0, 0, 1, 2, 0] },
                            { name: "Dr. Luis Hernandez", data: [2, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 2, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2, 0, 0, 0, 1] },
                            { name: "Ms. Patricia Ramos", data: [0, 1, 0, 0, 0, 1, 2, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0] },
                            { name: "Mr. Francisco Lopez", data: [0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0] }
                          ];
                          
                          const roleRates = [4000, 3500, 3000, 2500, 3500, 2500, 2000];
                          const levelMultipliers = [1.5, 1.3, 1.1, 1.0];
                          
                          let grandTotal = 0;
                          facultyData.forEach(faculty => {
                            faculty.data.forEach((appearances, index) => {
                              if (appearances > 0) {
                                const roleIndex = Math.floor(index / 4);
                                const levelIndex = index % 4;
                                const baseRate = roleRates[roleIndex] || 2000;
                                const multiplier = levelMultipliers[levelIndex] || 1.0;
                                grandTotal += appearances * baseRate * multiplier;
                              }
                            });
                          });
                          
                          return grandTotal.toLocaleString();
                        })()}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Summary Information */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Defense Information</h4>
                  <div className="space-y-1 text-sm text-blue-700 dark:text-blue-400">
                    <p><span className="font-medium">Type:</span> {selectedRecord.defenseType}</p>
                    <p><span className="font-medium">Period:</span> {selectedRecord.schoolYear}</p>
                    <p><span className="font-medium">Semester:</span> {selectedRecord.semester}</p>
                  </div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">Statistics</h4>
                  <div className="space-y-1 text-sm text-green-700 dark:text-green-400">
                    <p><span className="font-medium">Total Appearances:</span> {selectedRecord.totalAppearances}</p>
                    <p><span className="font-medium">Faculty Count:</span> {selectedRecord.facultyCount}</p>
                    <p><span className="font-medium">Status:</span> {selectedRecord.status}</p>
                  </div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">Consolidated</h4>
                  <div className="space-y-1 text-sm text-purple-700 dark:text-purple-400">
                    <p><span className="font-medium">Total Amount:</span> ₱{selectedRecord.totalConsolidated.toLocaleString()}</p>
                    <p><span className="font-medium">Created:</span> {new Date(selectedRecord.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowViewModal(false)}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Print Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appearances;