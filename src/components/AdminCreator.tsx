import React, { useState } from 'react';
import { createAdminAccount } from '../utils/createAdmin';

export const AdminCreator: React.FC = () => {
  const [creating, setCreating] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleCreateAdmin = async () => {
    setCreating(true);
    try {
      const result = await createAdminAccount();
      setResult(result);
    } catch (error) {
      setResult({ success: false, message: 'Failed to create admin account' });
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Create Admin Account</h2>
          
          <div className="mb-6 text-left bg-gray-50 rounded-md p-4">
            <h3 className="font-semibold mb-2">Admin Credentials:</h3>
            <p className="text-sm text-gray-600">Email: researchcenter@gmail.com</p>
            <p className="text-sm text-gray-600">Password: researchcenter@123</p>
            <p className="text-sm text-gray-600">Role: Research Director</p>
          </div>

          {result && (
            <div className={`mb-4 p-3 rounded-md ${
              result.success ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-red-50 border border-red-200 text-red-800'
            }`}>
              <p className="text-sm">{result.message}</p>
            </div>
          )}

          <button
            onClick={handleCreateAdmin}
            disabled={creating}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
          >
            {creating ? 'Creating Admin...' : 'Create Admin Account'}
          </button>

          <div className="text-sm text-gray-600">
            <p>This will create the admin account in Firebase.</p>
            <p className="mt-2">After creation, you can login with the credentials above.</p>
          </div>
        </div>
      </div>
    </div>
  );
};