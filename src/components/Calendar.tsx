import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface Event {
  id: string;
  title: string;
  date: Date;
  type: 'defense' | 'meeting' | 'deadline' | 'other';
  description?: string;
}

interface CalendarComponentProps {
  events?: Event[];
  onDateSelect?: (date: Date) => void;
  onEventClick?: (event: Event) => void;
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({ 
  events = [], 
  onDateSelect, 
  onEventClick 
}) => {
  const [value, setValue] = useState<Value>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (newValue: Value) => {
    setValue(newValue);
    if (newValue instanceof Date) {
      setSelectedDate(newValue);
      onDateSelect?.(newValue);
    }
  };

  const getEventsForDate = (date: Date): Event[] => {
    return events.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  const hasEventsOnDate = (date: Date): boolean => {
    return getEventsForDate(date).length > 0;
  };

  const getTileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month' && hasEventsOnDate(date)) {
      const dayEvents = getEventsForDate(date);
      return (
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-1">
            {dayEvents.slice(0, 3).map((event, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  event.type === 'defense' ? 'bg-red-500' :
                  event.type === 'meeting' ? 'bg-blue-500' :
                  event.type === 'deadline' ? 'bg-orange-500' :
                  'bg-gray-500'
                }`}
              />
            ))}
            {dayEvents.length > 3 && (
              <div className="w-2 h-2 rounded-full bg-gray-300" />
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  const getTileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const hasEvents = hasEventsOnDate(date);
      return hasEvents ? 'has-events' : '';
    }
    return '';
  };

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
          Research Calendar
        </h2>
        <CalendarIcon className="w-6 h-6 text-gray-400 dark:text-gray-500" />
      </div>

      <style jsx>{`
        .react-calendar {
          width: 100%;
          background: transparent;
          border: none;
          font-family: inherit;
        }
        
        .react-calendar__navigation {
          display: flex;
          height: 44px;
          margin-bottom: 1em;
        }
        
        .react-calendar__navigation button {
          min-width: 44px;
          background: none;
          border: none;
          font-size: 16px;
          font-weight: bold;
          color: #374151;
        }
        
        .dark .react-calendar__navigation button {
          color: #e5e7eb;
        }
        
        .react-calendar__navigation button:enabled:hover,
        .react-calendar__navigation button:enabled:focus {
          background-color: #f3f4f6;
          border-radius: 6px;
        }
        
        .dark .react-calendar__navigation button:enabled:hover,
        .dark .react-calendar__navigation button:enabled:focus {
          background-color: #374151;
        }
        
        .react-calendar__month-view__weekdays {
          text-align: center;
          text-transform: uppercase;
          font-weight: bold;
          font-size: 0.75em;
          color: #6b7280;
        }
        
        .dark .react-calendar__month-view__weekdays {
          color: #9ca3af;
        }
        
        .react-calendar__tile {
          max-width: 100%;
          padding: 10px 6px;
          background: none;
          border: none;
          font-size: 0.9em;
          position: relative;
          color: #374151;
        }
        
        .dark .react-calendar__tile {
          color: #e5e7eb;
        }
        
        .react-calendar__tile:enabled:hover,
        .react-calendar__tile:enabled:focus {
          background-color: #f3f4f6;
          border-radius: 6px;
        }
        
        .dark .react-calendar__tile:enabled:hover,
        .dark .react-calendar__tile:enabled:focus {
          background-color: #374151;
        }
        
        .react-calendar__tile--active {
          background: #10b981;
          color: white;
          border-radius: 6px;
        }
        
        .react-calendar__tile--active:enabled:hover,
        .react-calendar__tile--active:enabled:focus {
          background: #059669;
        }
        
        .react-calendar__tile.has-events {
          font-weight: bold;
        }
        
        .react-calendar__tile--neighboringMonth {
          color: #9ca3af;
        }
        
        .dark .react-calendar__tile--neighboringMonth {
          color: #6b7280;
        }
      `}</style>

      <Calendar
        onChange={handleDateChange}
        value={value}
        tileContent={getTileContent}
        tileClassName={getTileClassName}
        className="custom-calendar"
      />

      {selectedDate && selectedDateEvents.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
            Events on {selectedDate.toLocaleDateString()}
          </h3>
          <div className="space-y-2">
            {selectedDateEvents.map((event) => (
              <div
                key={event.id}
                onClick={() => onEventClick?.(event)}
                className={`p-3 rounded-lg border-l-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                  event.type === 'defense' ? 'border-red-500 bg-red-50 dark:bg-red-900/20' :
                  event.type === 'meeting' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' :
                  event.type === 'deadline' ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20' :
                  'border-gray-500 bg-gray-50 dark:bg-gray-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-800 dark:text-gray-200">
                    {event.title}
                  </h4>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    event.type === 'defense' ? 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100' :
                    event.type === 'meeting' ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100' :
                    event.type === 'deadline' ? 'bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-100' :
                    'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-100'
                  }`}>
                    {event.type}
                  </span>
                </div>
                {event.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {event.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {events.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center space-x-4 text-xs">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-gray-600 dark:text-gray-400">Defense</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-gray-600 dark:text-gray-400">Meeting</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-gray-600 dark:text-gray-400">Deadline</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
              <span className="text-gray-600 dark:text-gray-400">Other</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarComponent;