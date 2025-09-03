import React, { useState } from 'react';
import {
  Save,
  Edit3,
  Calendar,
  Mail,
  Upload,
  Download,
  Bell,
  Shield,
  Database,
  Clock,
  CheckCircle,
  AlertTriangle,
  Settings,
  RefreshCw
} from 'lucide-react';
import { SystemSettings } from '../../types';

const SystemSettingsModule: React.FC = () => {
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [showSaveNotification, setShowSaveNotification] = useState(false);

  const [settings, setSettings] = useState<SystemSettings>({
    id: '1',
    currentAcademicYear: '2024-2025',
    activeSemesters: ['First Semester', 'Second Semester'],
    defensePeriods: {
      firstSemester: {
        start: '2024-10-01',
        end: '2025-02-28'
      },
      secondSemester: {
        start: '2025-03-01',
        end: '2025-07-31'
      }
    },
    emailSettings: {
      universityDomain: '@university.edu.ph',
      curiEmail: 'curi@uz.edu.ph',
      autoNotifications: true,
      approvalReminderInterval: 3
    },
    fileUploadSettings: {
      maxFileSize: 50,
      allowedFormats: ['PDF', 'DOCX', 'DOC'],
      storageLocation: 'Firebase Storage'
    },
    updatedAt: '2024-01-15T10:30:00Z'
  });

  const handleSave = (section: string) => {
    setSettings(prev => ({
      ...prev,
      updatedAt: new Date().toISOString()
    }));
    setEditingSection(null);
    setShowSaveNotification(true);
    setTimeout(() => setShowSaveNotification(false), 3000);
  };

  const updateAcademicYear = (year: string) => {
    setSettings(prev => ({ ...prev, currentAcademicYear: year }));
  };

  const toggleSemester = (semester: string) => {
    setSettings(prev => ({
      ...prev,
      activeSemesters: prev.activeSemesters.includes(semester)
        ? prev.activeSemesters.filter(s => s !== semester)
        : [...prev.activeSemesters, semester]
    }));
  };

  const updateDefensePeriod = (semester: 'firstSemester' | 'secondSemester', field: 'start' | 'end', value: string) => {
    setSettings(prev => ({
      ...prev,
      defensePeriods: {
        ...prev.defensePeriods,
        [semester]: {
          ...prev.defensePeriods[semester],
          [field]: value
        }
      }
    }));
  };

  const updateEmailSettings = (field: keyof typeof settings.emailSettings, value: string | boolean | number) => {
    setSettings(prev => ({
      ...prev,
      emailSettings: {
        ...prev.emailSettings,
        [field]: value
      }
    }));
  };

  const updateFileSettings = (field: keyof typeof settings.fileUploadSettings, value: any) => {
    setSettings(prev => ({
      ...prev,
      fileUploadSettings: {
        ...prev.fileUploadSettings,
        [field]: value
      }
    }));
  };

  const toggleFileFormat = (format: string) => {
    setSettings(prev => ({
      ...prev,
      fileUploadSettings: {
        ...prev.fileUploadSettings,
        allowedFormats: prev.fileUploadSettings.allowedFormats.includes(format)
          ? prev.fileUploadSettings.allowedFormats.filter(f => f !== format)
          : [...prev.fileUploadSettings.allowedFormats, format]
      }
    }));
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">General System Configuration</h2>
        <div className="flex items-center space-x-3">
          {showSaveNotification && (
            <div className="flex items-center space-x-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm">Settings saved successfully!</span>
            </div>
          )}
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <RefreshCw className="w-4 h-4" />
            <span>Sync Settings</span>
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {/* Academic Year Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-blue-500" />
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">Academic Year Settings</h3>
              </div>
              {editingSection === 'academic' ? (
                <button
                  onClick={() => handleSave('academic')}
                  className="flex items-center space-x-2 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                >
                  <Save className="w-3 h-3" />
                  <span>Save</span>
                </button>
              ) : (
                <button
                  onClick={() => setEditingSection('academic')}
                  className="flex items-center space-x-2 px-3 py-1 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>Edit</span>
                </button>
              )}
            </div>
          </div>
          
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Current Academic Year
                </label>
                {editingSection === 'academic' ? (
                  <select
                    value={settings.currentAcademicYear}
                    onChange={(e) => updateAcademicYear(e.target.value)}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-gray-200"
                  >
                    <option value="2024-2025">2024-2025</option>
                    <option value="2025-2026">2025-2026</option>
                    <option value="2023-2024">2023-2024</option>
                  </select>
                ) : (
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="font-medium text-gray-800 dark:text-gray-200">{settings.currentAcademicYear}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Active Semesters
                </label>
                <div className="space-y-2">
                  {['First Semester', 'Second Semester'].map(semester => (
                    <label key={semester} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={settings.activeSemesters.includes(semester)}
                        onChange={() => editingSection === 'academic' && toggleSemester(semester)}
                        disabled={editingSection !== 'academic'}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{semester}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Defense Periods
              </label>
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">First Semester:</span>
                  {editingSection === 'academic' ? (
                    <>
                      <input
                        type="date"
                        value={settings.defensePeriods.firstSemester.start}
                        onChange={(e) => updateDefensePeriod('firstSemester', 'start', e.target.value)}
                        className="p-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-gray-200"
                      />
                      <input
                        type="date"
                        value={settings.defensePeriods.firstSemester.end}
                        onChange={(e) => updateDefensePeriod('firstSemester', 'end', e.target.value)}
                        className="p-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-gray-200"
                      />
                    </>
                  ) : (
                    <span className="col-span-2 text-sm text-gray-700 dark:text-gray-300">
                      Oct 2024 - Feb 2025
                    </span>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Second Semester:</span>
                  {editingSection === 'academic' ? (
                    <>
                      <input
                        type="date"
                        value={settings.defensePeriods.secondSemester.start}
                        onChange={(e) => updateDefensePeriod('secondSemester', 'start', e.target.value)}
                        className="p-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-gray-200"
                      />
                      <input
                        type="date"
                        value={settings.defensePeriods.secondSemester.end}
                        onChange={(e) => updateDefensePeriod('secondSemester', 'end', e.target.value)}
                        className="p-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 dark:text-gray-200"
                      />
                    </>
                  ) : (
                    <span className="col-span-2 text-sm text-gray-700 dark:text-gray-300">
                      Mar 2025 - Jul 2025
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Email & Notification Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-green-500" />
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">Email & Notification Settings</h3>
              </div>
              {editingSection === 'email' ? (
                <button
                  onClick={() => handleSave('email')}
                  className="flex items-center space-x-2 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                >
                  <Save className="w-3 h-3" />
                  <span>Save</span>
                </button>
              ) : (
                <button
                  onClick={() => setEditingSection('email')}
                  className="flex items-center space-x-2 px-3 py-1 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>Edit</span>
                </button>
              )}
            </div>
          </div>
          
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  University Email Domain
                </label>
                {editingSection === 'email' ? (
                  <input
                    type="text"
                    value={settings.emailSettings.universityDomain}
                    onChange={(e) => updateEmailSettings('universityDomain', e.target.value)}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 dark:text-gray-200"
                    placeholder="@university.edu.ph"
                  />
                ) : (
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="font-mono text-gray-800 dark:text-gray-200">{settings.emailSettings.universityDomain}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  CURI Contact Email
                </label>
                {editingSection === 'email' ? (
                  <input
                    type="email"
                    value={settings.emailSettings.curiEmail}
                    onChange={(e) => updateEmailSettings('curiEmail', e.target.value)}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 dark:text-gray-200"
                    placeholder="curi@uz.edu.ph"
                  />
                ) : (
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="font-mono text-gray-800 dark:text-gray-200">{settings.emailSettings.curiEmail}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bell className="w-5 h-5 text-blue-500" />
                  <div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Auto-notifications</span>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Send automatic email notifications for system events</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.emailSettings.autoNotifications}
                    onChange={(e) => editingSection === 'email' && updateEmailSettings('autoNotifications', e.target.checked)}
                    disabled={editingSection !== 'email'}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Approval Reminders</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Send reminders for pending approvals</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Every</span>
                  {editingSection === 'email' ? (
                    <input
                      type="number"
                      min="1"
                      max="30"
                      value={settings.emailSettings.approvalReminderInterval}
                      onChange={(e) => updateEmailSettings('approvalReminderInterval', parseInt(e.target.value) || 3)}
                      className="w-16 px-2 py-1 text-center border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 dark:text-gray-200"
                    />
                  ) : (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded font-medium text-gray-800 dark:text-gray-200">
                      {settings.emailSettings.approvalReminderInterval}
                    </span>
                  )}
                  <span className="text-xs text-gray-500 dark:text-gray-400">days</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* File Upload Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Upload className="w-5 h-5 text-purple-500" />
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">File Upload Settings</h3>
              </div>
              {editingSection === 'files' ? (
                <button
                  onClick={() => handleSave('files')}
                  className="flex items-center space-x-2 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                >
                  <Save className="w-3 h-3" />
                  <span>Save</span>
                </button>
              ) : (
                <button
                  onClick={() => setEditingSection('files')}
                  className="flex items-center space-x-2 px-3 py-1 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>Edit</span>
                </button>
              )}
            </div>
          </div>
          
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Max File Size (MB)
                </label>
                {editingSection === 'files' ? (
                  <input
                    type="number"
                    min="1"
                    max="500"
                    value={settings.fileUploadSettings.maxFileSize}
                    onChange={(e) => updateFileSettings('maxFileSize', parseInt(e.target.value) || 50)}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 dark:text-gray-200"
                  />
                ) : (
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <span className="font-medium text-gray-800 dark:text-gray-200">{settings.fileUploadSettings.maxFileSize} MB</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Storage Location
                </label>
                {editingSection === 'files' ? (
                  <select
                    value={settings.fileUploadSettings.storageLocation}
                    onChange={(e) => updateFileSettings('storageLocation', e.target.value)}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 dark:text-gray-200"
                  >
                    <option value="Firebase Storage">Firebase Storage</option>
                    <option value="AWS S3">AWS S3</option>
                    <option value="Local Storage">Local Storage</option>
                  </select>
                ) : (
                  <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Database className="w-4 h-4 text-purple-500" />
                      <span className="font-medium text-gray-800 dark:text-gray-200">{settings.fileUploadSettings.storageLocation}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Allowed Formats
              </label>
              <div className="flex flex-wrap gap-2">
                {['PDF', 'DOCX', 'DOC', 'XLSX', 'PPTX', 'TXT', 'RTF'].map(format => (
                  <label key={format} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={settings.fileUploadSettings.allowedFormats.includes(format)}
                      onChange={() => editingSection === 'files' && toggleFileFormat(format)}
                      disabled={editingSection !== 'files'}
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300 font-mono">{format}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <Settings className="w-5 h-5 text-gray-500" />
              <h3 className="font-semibold text-gray-800 dark:text-gray-200">System Status</h3>
            </div>
          </div>
          
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div>
                  <span className="text-sm font-medium text-green-800 dark:text-green-200">System Status</span>
                  <p className="text-xs text-green-600 dark:text-green-400">Operational</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Clock className="w-5 h-5 text-blue-500" />
                <div>
                  <span className="text-sm font-medium text-blue-800 dark:text-blue-200">Last Updated</span>
                  <p className="text-xs text-blue-600 dark:text-blue-400">
                    {new Date(settings.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <Shield className="w-5 h-5 text-purple-500" />
                <div>
                  <span className="text-sm font-medium text-purple-800 dark:text-purple-200">Security</span>
                  <p className="text-xs text-purple-600 dark:text-purple-400">SSL Enabled</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettingsModule;