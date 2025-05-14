import React, { useState } from 'react';
import { UserWithPayments } from '../types';
import { formatDate, formatCurrency } from '../utils/formatters';

interface UserPaymentTableProps {
  users: UserWithPayments[];
  isLoading: boolean;
}

const UserPaymentTable: React.FC<UserPaymentTableProps> = ({ users, isLoading }) => {
  const [sortField, setSortField] = useState<'name' | 'email' | 'paymentCount' | 'totalAmount'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: 'name' | 'email' | 'paymentCount' | 'totalAmount') => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedUsers = [...users].sort((a, b) => {
    let compareValueA: string | number;
    let compareValueB: string | number;

    switch (sortField) {
      case 'name':
        compareValueA = a.name;
        compareValueB = b.name;
        break;
      case 'email':
        compareValueA = a.email;
        compareValueB = b.email;
        break;
      case 'paymentCount':
        compareValueA = a.payments?.length || 0;
        compareValueB = b.payments?.length || 0;
        break;
      case 'totalAmount':
        compareValueA = a.payments?.reduce((sum, payment) => sum + payment.amount, 0) || 0;
        compareValueB = b.payments?.reduce((sum, payment) => sum + payment.amount, 0) || 0;
        break;
      default:
        compareValueA = a.name;
        compareValueB = b.name;
    }

    if (compareValueA < compareValueB) {
      return sortDirection === 'asc' ? -1 : 1;
    }
    if (compareValueA > compareValueB) {
      return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  });

  if (isLoading) {
    return (
      <div className="w-full flex justify-center p-8">
        <div className="animate-pulse flex flex-col w-full max-w-4xl">
          <div className="h-8 bg-gray-700 rounded w-full mb-4"></div>
          {[...Array(5)].map((_, index) => (
            <div key={index} className="h-16 bg-gray-800 rounded w-full mb-2"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-lg shadow">
      <table className="w-full text-left">
        <thead className="bg-gray-800 text-gray-200">
          <tr>
            <th 
              className="px-6 py-3 cursor-pointer hover:bg-gray-700 transition-colors" 
              onClick={() => handleSort('name')}
            >
              <div className="flex items-center">
                User Name
                {sortField === 'name' && (
                  <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </div>
            </th>
            <th 
              className="px-6 py-3 cursor-pointer hover:bg-gray-700 transition-colors" 
              onClick={() => handleSort('email')}
            >
              <div className="flex items-center">
                Email
                {sortField === 'email' && (
                  <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </div>
            </th>
            <th 
              className="px-6 py-3 cursor-pointer hover:bg-gray-700 transition-colors" 
              onClick={() => handleSort('paymentCount')}
            >
              <div className="flex items-center">
                Payment Count
                {sortField === 'paymentCount' && (
                  <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </div>
            </th>
            <th 
              className="px-6 py-3 cursor-pointer hover:bg-gray-700 transition-colors" 
              onClick={() => handleSort('totalAmount')}
            >
              <div className="flex items-center">
                Total Amount
                {sortField === 'totalAmount' && (
                  <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </div>
            </th>
            <th className="px-6 py-3">Details</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.length === 0 ? (
            <tr className="bg-gray-900">
              <td colSpan={5} className="px-6 py-4 text-center text-gray-400">
                No users found
              </td>
            </tr>
          ) : (
            sortedUsers.map((user) => (
              <UserRow key={user._id} user={user} />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

interface UserRowProps {
  user: UserWithPayments;
}

const UserRow: React.FC<UserRowProps> = ({ user }) => {
  const [expanded, setExpanded] = useState(false);
  const totalAmount = user.payments?.reduce((sum, payment) => sum + payment.amount, 0) || 0;

  return (
    <>
      <tr className="bg-gray-900 border-b border-gray-800 hover:bg-gray-800 transition-colors">
        <td className="px-6 py-4 font-medium text-gray-200">
          {user.name}
        </td>
        <td className="px-6 py-4 text-gray-300">
          {user.email}
        </td>
        <td className="px-6 py-4 text-gray-300">
          {user.payments?.length || 0}
        </td>
        <td className="px-6 py-4 text-gray-300">
          {formatCurrency(totalAmount)}
        </td>
        <td className="px-6 py-4">
          <button
            onClick={() => setExpanded(!expanded)}
            className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
          >
            {expanded ? 'Hide' : 'View'}
          </button>
        </td>
      </tr>
      {expanded && user.payments && user.payments.length > 0 && (
        <tr className="bg-gray-800">
          <td colSpan={5} className="px-6 py-4">
            <div className="animate-fadeIn">
              <h4 className="text-gray-200 font-medium mb-2">Payment History</h4>
              <table className="w-full text-sm">
                <thead className="bg-gray-700 text-gray-200">
                  <tr>
                    <th className="px-4 py-2 text-left">Date</th>
                    <th className="px-4 py-2 text-left">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {user.payments.map((payment) => (
                    <tr key={payment._id} className="hover:bg-gray-700">
                      <td className="px-4 py-2 text-gray-300">{formatDate(payment.date)}</td>
                      <td className="px-4 py-2 text-gray-300">{formatCurrency(payment.amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </td>
        </tr>
      )}
      {expanded && (!user.payments || user.payments.length === 0) && (
        <tr className="bg-gray-800">
          <td colSpan={5} className="px-6 py-4">
            <div className="text-gray-400 italic">No payment records found</div>
          </td>
        </tr>
      )}
    </>
  );
};

export default UserPaymentTable;