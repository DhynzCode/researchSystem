import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon,
  Plus,
  Eye,
  Edit2,
  Trash2,
  Clock,
  MapPin,
  Users,
  AlertTriangle,
  CheckCircle,
  Filter,
  Search,
  X
} from 'lucide-react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useAuth } from '../contexts/AuthContext';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  type: 'defense' | 'meeting' | 'deadline' | 'other';
  description?: string;
  location?: string;
  attendees?: string[];
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  program?: string;
  department?: string;
  panelMembers?: string[];
}

const CalendarPage: React.FC = () => {
  const { user } = useAuth();
  const [value, setValue] = useState<Value>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [eventTypeFilter, setEventTypeFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [animationClass, setAnimationClass] = useState('opacity-0 translate-y-4');

  // Animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationClass('opacity-100 translate-y-0');
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Sample events data
  useEffect(() => {
    const sampleEvents: Event[] = [
      {
        id: '1',
        title: 'Psychology Thesis Defense - Group 1',
        date: new Date(2024, 11, 15, 9, 0), // December 15, 2024, 9:00 AM
        time: '09:00 AM',
        type: 'defense',
        description: 'Final defense for "The Impact of Social Media on Adolescent Mental Health"',
        location: 'Room 301, SLAS Building',
        status: 'scheduled',
        program: 'Bachelor of Arts in Psychology (BAP)',
        department: 'SLAS',
        attendees: ['Jessica Rivera', 'Mark Thompson', 'Lisa Garcia'],
        panelMembers: ['Dr. Rachel Williams', 'Dr. Elena Rodriguez', 'Dr. Anna Martinez', 'Prof. Carlos Lopez']
      },
      {
        id: '2',
        title: 'Psychology Thesis Defense - Group 2',
        date: new Date(2024, 11, 15, 1, 30), // December 15, 2024, 1:30 PM
        time: '01:30 PM',
        type: 'defense',
        description: 'Final defense for "Cognitive Behavioral Therapy Effectiveness in Anxiety Disorders"',
        location: 'Room 301, SLAS Building',
        status: 'scheduled',
        program: 'Bachelor of Arts in Psychology (BAP)',
        department: 'SLAS',
        attendees: ['David Chen', 'Maria Fernandez'],
        panelMembers: ['Prof. Diana Kim', 'Dr. Roberto Silva', 'Dr. Jennifer Wong', 'Prof. Amanda Brown']
      },
      {
        id: '3',
        title: 'Research Committee Meeting',
        date: new Date(2024, 11, 10, 10, 0), // December 10, 2024, 10:00 AM
        time: '10:00 AM',
        type: 'meeting',
        description: 'Monthly research committee meeting - Review of pending defense requests',
        location: 'Conference Room A, Administration Building',
        status: 'scheduled',
        attendees: ['Dr. Sarah Martinez', 'Prof. Elena Rodriguez', 'Dr. Roberto Silva']
      },
      {
        id: '4',
        title: 'Defense Schedule Submission Deadline',
        date: new Date(2024, 11, 5, 23, 59), // December 5, 2024, 11:59 PM
        time: '11:59 PM',
        type: 'deadline',
        description: 'Final deadline for submitting defense schedules for first semester',
        status: 'completed'
      },
      {
        id: '5',
        title: 'Psychology Thesis Defense - Group 3',
        date: new Date(2024, 11, 18, 9, 0), // December 18, 2024, 9:00 AM
        time: '09:00 AM',
        type: 'defense',
        description: 'Final defense for "Psychological Effects of Remote Learning on College Students"',
        location: 'Room 302, SLAS Building',
        status: 'scheduled',
        program: 'Bachelor of Arts in Psychology (BAP)',
        department: 'SLAS',
        attendees: ['Sarah Johnson', 'Michael Davis', 'Jennifer Lee'],
        panelMembers: ['Dr. Patricia Davis', 'Prof. James Wilson', 'Dr. Maria Santos', 'Prof. Lisa Garcia']
      },
      {
        id: '6',
        title: 'Psychology Thesis Defense - Group 4',
        date: new Date(2024, 11, 18, 1, 30), // December 18, 2024, 1:30 PM
        time: '01:30 PM',
        type: 'defense',
        description: 'Final defense for "Family Therapy Approaches in Treating Adolescent Depression"',
        location: 'Room 302, SLAS Building',
        status: 'scheduled',
        program: 'Bachelor of Arts in Psychology (BAP)',
        department: 'SLAS',
        attendees: ['Carlos Mendez', 'Anna Rodriguez'],
        panelMembers: ['Dr. Catherine Williams', 'Prof. Michael Johnson', 'Dr. Sarah Thompson', 'Prof. David Lee']
      },
      {
        id: '7',
        title: 'Faculty Panel Assignment Review',
        date: new Date(2024, 11, 12, 14, 0), // December 12, 2024, 2:00 PM
        time: '02:00 PM',
        type: 'meeting',
        description: 'Review flagged faculty members and appearance limits',
        location: 'VPAA Office',
        status: 'scheduled',
        attendees: ['VPAA', 'Dr. Sarah Martinez', 'Research Director']
      }
    ];

    setEvents(sampleEvents);
    setFilteredEvents(sampleEvents);
  }, []);

  // Filter events based on search and type filter
  useEffect(() => {
    let filtered = events;

    if (eventTypeFilter !== 'all') {
      filtered = filtered.filter(event => event.type === eventTypeFilter);
    }

    if (searchQuery) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.program?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.department?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredEvents(filtered);
  }, [events, eventTypeFilter, searchQuery]);

  const handleDateChange = (newValue: Value) => {
    setValue(newValue);
    if (newValue instanceof Date) {
      setSelectedDate(newValue);
    }
  };

  const getEventsForDate = (date: Date): Event[] => {
    return filteredEvents.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  const hasEventsOnDate = (date: Date): boolean => {
    return getEventsForDate(date).length > 0;
  };

  const getTileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month' && hasEventsOnDate(date)) {
      const dayEvents = getEventsForDate(date);
      const defenseCount = dayEvents.filter(e => e.type === 'defense').length;
      const meetingCount = dayEvents.filter(e => e.type === 'meeting').length;
      const deadlineCount = dayEvents.filter(e => e.type === 'deadline').length;

      return (
        <div className="flex flex-wrap gap-1 mt-1">
          {defenseCount > 0 && (
            <div className="w-2 h-2 bg-blue-500 rounded-full" title={`${defenseCount} defense(s)`}></div>
          )}
          {meetingCount > 0 && (
            <div className="w-2 h-2 bg-green-500 rounded-full" title={`${meetingCount} meeting(s)`}></div>
          )}
          {deadlineCount > 0 && (
            <div className="w-2 h-2 bg-red-500 rounded-full" title={`${deadlineCount} deadline(s)`}></div>
          )}
        </div>
      );
    }
    return null;
  };

  const getTileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month' && hasEventsOnDate(date)) {
      return 'has-events';
    }
    return null;
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'defense': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'meeting': return 'bg-green-100 text-green-800 border-green-200';
      case 'deadline': return 'bg-red-100 text-red-800 border-red-200';
      case 'other': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled': return <Clock className="w-4 h-4 text-blue-500" />;
      case 'in-progress': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'cancelled': return <X className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const selectedDateEvents = getEventsForDate(selectedDate);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`flex items-center justify-between transition-all duration-700 ease-out ${animationClass}`}>
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Calendar</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Schedule and manage defense dates, meetings, and deadlines
          </p>
        </div>
        <button
          onClick={() => setShowAddEventModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Event</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-700 ease-out delay-200 ${animationClass}`}>
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-gray-200"
            />
          </div>
          
          {/* Type Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={eventTypeFilter}
              onChange={(e) => setEventTypeFilter(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-gray-200"
            >
              <option value="all">All Events</option>
              <option value="defense">Defense</option>
              <option value="meeting">Meeting</option>
              <option value="deadline">Deadline</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className={`lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-700 ease-out delay-300 ${animationClass}`}>
          <div className="calendar-container">
            <style>{`
              .react-calendar {
                width: 100%;
                background: transparent;
                border: none;
                font-family: inherit;
              }
              .react-calendar__tile {
                background: none;
                border: 1px solid #e5e7eb;
                color: inherit;
                position: relative;
              }
              .react-calendar__tile--active {
                background: #3b82f6 !important;
                color: white !important;
              }
              .react-calendar__tile--now {
                background: #fef3c7;
              }
              .react-calendar__tile.has-events {
                background: #f0f9ff;
              }
              .dark .react-calendar__tile {
                border-color: #374151;
                color: #e5e7eb;
              }
              .dark .react-calendar__tile--now {
                background: #451a03;
                color: #fbbf24;
              }
              .dark .react-calendar__tile.has-events {
                background: #1e3a8a;
              }
            `}</style>
            <Calendar
              onChange={handleDateChange}
              value={value}
              tileContent={getTileContent}
              tileClassName={getTileClassName}
              className="w-full"
            />
          </div>
        </div>

        {/* Events for Selected Date */}
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-700 ease-out delay-400 ${animationClass}`}>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
            <CalendarIcon className="w-5 h-5 mr-2" />
            {selectedDate.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </h3>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {selectedDateEvents.length > 0 ? (
              selectedDateEvents.map((event, index) => (
                <div
                  key={event.id}
                  className="p-3 border rounded-lg cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-102"
                  onClick={() => {
                    setSelectedEvent(event);
                    setShowEventDetails(true);
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(event.status)}
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getEventTypeColor(event.type)}`}>
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {event.time}
                    </span>
                  </div>
                  
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                    {event.title}
                  </h4>
                  
                  {event.location && (
                    <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                      <MapPin className="w-3 h-3 mr-1" />
                      {event.location}
                    </div>
                  )}
                  
                  {event.attendees && event.attendees.length > 0 && (
                    <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
                      <Users className="w-3 h-3 mr-1" />
                      {event.attendees.length} attendee{event.attendees.length !== 1 ? 's' : ''}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <CalendarIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No events scheduled for this date</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Event Details Modal */}
      {showEventDetails && selectedEvent && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"></div>
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 w-full max-w-2xl">
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200">
                  Event Details
                </h3>
                <button
                  onClick={() => setShowEventDetails(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Modal Body */}
              <div className="px-6 py-4">
                <div className="space-y-4">
                  {/* Title and Type */}
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      {getStatusIcon(selectedEvent.status)}
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getEventTypeColor(selectedEvent.type)}`}>
                        {selectedEvent.type.charAt(0).toUpperCase() + selectedEvent.type.slice(1)}
                      </span>
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                      {selectedEvent.title}
                    </h4>
                  </div>
                  
                  {/* Date and Time */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Date</label>
                      <p className="text-gray-900 dark:text-gray-100">
                        {selectedEvent.date.toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Time</label>
                      <p className="text-gray-900 dark:text-gray-100">{selectedEvent.time}</p>
                    </div>
                  </div>
                  
                  {/* Location */}
                  {selectedEvent.location && (
                    <div>
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Location</label>
                      <div className="flex items-center mt-1">
                        <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                        <p className="text-gray-900 dark:text-gray-100">{selectedEvent.location}</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Description */}
                  {selectedEvent.description && (
                    <div>
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Description</label>
                      <p className="text-gray-700 dark:text-gray-300 mt-1">{selectedEvent.description}</p>
                    </div>
                  )}
                  
                  {/* Program and Department */}
                  {(selectedEvent.program || selectedEvent.department) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedEvent.program && (
                        <div>
                          <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Program</label>
                          <p className="text-gray-900 dark:text-gray-100">{selectedEvent.program}</p>
                        </div>
                      )}
                      {selectedEvent.department && (
                        <div>
                          <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Department</label>
                          <p className="text-gray-900 dark:text-gray-100">{selectedEvent.department}</p>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Attendees */}
                  {selectedEvent.attendees && selectedEvent.attendees.length > 0 && (
                    <div>
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Students</label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {selectedEvent.attendees.map((attendee, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded text-sm">
                            {attendee}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Panel Members */}
                  {selectedEvent.panelMembers && selectedEvent.panelMembers.length > 0 && (
                    <div>
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Panel Members</label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {selectedEvent.panelMembers.map((member, index) => (
                          <span key={index} className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded text-sm">
                            {member}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                <div className="flex space-x-2">
                  <button className="flex items-center space-x-2 px-3 py-2 text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                    <Edit2 className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                  <button className="flex items-center space-x-2 px-3 py-2 text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </div>
                <button
                  onClick={() => setShowEventDetails(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Event Modal Placeholder */}
      {showAddEventModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"></div>
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 w-full max-w-md">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200">
                  Add New Event
                </h3>
                <button
                  onClick={() => setShowAddEventModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="px-6 py-4">
                <p className="text-gray-600 dark:text-gray-400">
                  Add event functionality will be implemented here.
                </p>
              </div>
              <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setShowAddEventModal(false)}
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
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

export default CalendarPage;