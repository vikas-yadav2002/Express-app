import React, { useState, useEffect } from 'react';
import { UserWithPayments } from '../types';
import { fetchUsersWithPayments } from '../services/api';
import UserPaymentTable from './UserPaymentTable';
import UserPaymentSummary from './UserPaymentSummary';
import { DatabaseIcon, RefreshCw } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<UserWithPayments[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchUsersWithPayments();
      setUsers(data);
    } catch (err) {
      setError('Failed to load user data. Please ensure the backend server is running.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      <header className="bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <DatabaseIcon className="h-8 w-8 text-indigo-500 mr-3" />
              <h1 className="text-2xl font-bold text-white">User Payment Dashboard</h1>
            </div>
            <button 
              onClick={loadData}
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors disabled:opacity-50"
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh Data
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded mb-6">
            <p>{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <UserPaymentSummary users={users} isLoading={isLoading} />
        </div>

        <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">User Payment Data</h2>
          <UserPaymentTable users={users} isLoading={isLoading} />
        </div>
      </main>

      <footer className="bg-gray-800 py-4 mt-auto">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-400 text-sm">
            User Payment Dashboard © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;