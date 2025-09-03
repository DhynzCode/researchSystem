import React, { useState } from 'react';
import { createResearchTeacherAccount, createResearchDirectorAccount, createVPAAAccount, createBudgetOfficeAccount, createDeanAccount } from '../utils/createTestAccounts';

export const AccountCreator: React.FC = () => {
  const [creating, setCreating] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const handleCreateTeacher = async () => {
    setCreating(true);
    try {
      const result = await createResearchTeacherAccount();
      setResults(prev => [...prev, { type: 'Teacher', ...result }]);
    } catch (error) {
      setResults(prev => [...prev, { type: 'Teacher', success: false, message: 'Failed to create account' }]);
    } finally {
      setCreating(false);
    }
  };

  const handleCreateDirector = async () => {
    setCreating(true);
    try {
      const result = await createResearchDirectorAccount();
      setResults(prev => [...prev, { type: 'Director', ...result }]);
    } catch (error) {
      setResults(prev => [...prev, { type: 'Director', success: false, message: 'Failed to create account' }]);
    } finally {
      setCreating(false);
    }
  };

  const handleCreateVPAA = async () => {
    setCreating(true);
    try {
      const result = await createVPAAAccount();
      setResults(prev => [...prev, { type: 'VPAA', ...result }]);
    } catch (error) {
      setResults(prev => [...prev, { type: 'VPAA', success: false, message: 'Failed to create account' }]);
    } finally {
      setCreating(false);
    }
  };

  const handleCreateBudget = async () => {
    setCreating(true);
    try {
      const result = await createBudgetOfficeAccount();
      setResults(prev => [...prev, { type: 'Budget Office', ...result }]);
    } catch (error) {
      setResults(prev => [...prev, { type: 'Budget Office', success: false, message: 'Failed to create account' }]);
    } finally {
      setCreating(false);
    }
  };

  const handleCreateDean = async () => {
    setCreating(true);
    try {
      const result = await createDeanAccount();
      setResults(prev => [...prev, { type: 'Dean', ...result }]);
    } catch (error) {
      setResults(prev => [...prev, { type: 'Dean', success: false, message: 'Failed to create account' }]);
    } finally {
      setCreating(false);
    }
  };

  const clearResults = () => {
    setResults([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Create Test Accounts</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            {/* Research Teacher */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Research Teacher</h3>
              <div className="text-sm text-blue-800 mb-3">
                <p>Email: teacher@gmail.com</p>
                <p>Password: teacher123!</p>
                <p>Status: Pending Approval</p>
                <p>Department: SEICT</p>
              </div>
              <button
                onClick={handleCreateTeacher}
                disabled={creating}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {creating ? 'Creating...' : 'Create Teacher'}
              </button>
            </div>

            {/* Research Director */}
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">Research Director</h3>
              <div className="text-sm text-green-800 mb-3">
                <p>Email: director@gmail.com</p>
                <p>Password: director123!</p>
                <p>Status: Active</p>
                <p>Department: Research Center</p>
              </div>
              <button
                onClick={handleCreateDirector}
                disabled={creating}
                className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 disabled:opacity-50"
              >
                {creating ? 'Creating...' : 'Create Director'}
              </button>
            </div>

            {/* VPAA */}
            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 mb-2">VPAA</h3>
              <div className="text-sm text-purple-800 mb-3">
                <p>Email: vpaa@gmail.com</p>
                <p>Password: vpaa123!</p>
                <p>Status: Active</p>
                <p>Department: Academic Affairs</p>
              </div>
              <button
                onClick={handleCreateVPAA}
                disabled={creating}
                className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 disabled:opacity-50"
              >
                {creating ? 'Creating...' : 'Create VPAA'}
              </button>
            </div>

            {/* Budget Office */}
            <div className="bg-orange-50 rounded-lg p-4">
              <h3 className="font-semibold text-orange-900 mb-2">Budget Office</h3>
              <div className="text-sm text-orange-800 mb-3">
                <p>Email: budget@gmail.com</p>
                <p>Password: budget123!</p>
                <p>Status: Active</p>
                <p>Department: Budget Office</p>
              </div>
              <button
                onClick={handleCreateBudget}
                disabled={creating}
                className="w-full bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700 disabled:opacity-50"
              >
                {creating ? 'Creating...' : 'Create Budget'}
              </button>
            </div>

            {/* Dean */}
            <div className="bg-indigo-50 rounded-lg p-4">
              <h3 className="font-semibold text-indigo-900 mb-2">Dean</h3>
              <div className="text-sm text-indigo-800 mb-3">
                <p>Email: dean@gmail.com</p>
                <p>Password: dean123!</p>
                <p>Status: Active</p>
                <p>Department: Dean Office</p>
              </div>
              <button
                onClick={handleCreateDean}
                disabled={creating}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 disabled:opacity-50"
              >
                {creating ? 'Creating...' : 'Create Dean'}
              </button>
            </div>
          </div>

          {/* Results */}
          {results.length > 0 && (
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Results:</h3>
                <button
                  onClick={clearResults}
                  className="text-sm text-gray-600 hover:text-gray-800 underline"
                >
                  Clear
                </button>
              </div>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {results.map((result, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-md text-sm ${
                      result.success
                        ? 'bg-green-50 border border-green-200 text-green-800'
                        : 'bg-red-50 border border-red-200 text-red-800'
                    }`}
                  >
                    <p className="font-medium">{result.type}: {result.message}</p>
                    {result.success && result.credentials && (
                      <div className="mt-1 text-xs">
                        <p>Email: {result.credentials.email}</p>
                        <p>Password: {result.credentials.password}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Instructions:</h3>
            <ol className="list-decimal list-inside text-sm text-gray-700 space-y-1">
              <li>Click the buttons above to create test accounts</li>
              <li>Use the credentials shown to login</li>
              <li>Research Teachers will need approval from Research Director</li>
              <li>Research Directors have full access immediately</li>
            </ol>
          </div>

          {/* Go to Login */}
          <div className="mt-6 text-center">
            <button
              onClick={() => window.location.reload()}
              className="bg-gray-600 text-white py-2 px-6 rounded hover:bg-gray-700"
            >
              Go to Login Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};