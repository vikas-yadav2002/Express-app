import React from 'react';
import { UserWithPayments } from '../types';
import { Users, CreditCard, DollarSign } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

interface UserPaymentSummaryProps {
  users: UserWithPayments[];
  isLoading: boolean;
}

const UserPaymentSummary: React.FC<UserPaymentSummaryProps> = ({ users, isLoading }) => {
  // Calculate summary statistics
  const totalUsers = users.length;
  const totalPayments = users.reduce((count, user) => count + (user.payments?.length || 0), 0);
  const totalAmount = users.reduce((sum, user) => {
    return sum + (user.payments?.reduce((paymentSum, payment) => paymentSum + payment.amount, 0) || 0);
  }, 0);

  const statCards = [
    {
      title: 'Total Users',
      value: totalUsers,
      icon: <Users className="h-8 w-8 text-blue-400" />,
      color: 'from-blue-600 to-blue-800',
    },
    {
      title: 'Total Payments',
      value: totalPayments,
      icon: <CreditCard className="h-8 w-8 text-green-400" />,
      color: 'from-green-600 to-green-800',
    },
    {
      title: 'Total Amount',
      value: formatCurrency(totalAmount),
      icon: <DollarSign className="h-8 w-8 text-purple-400" />,
      color: 'from-purple-600 to-purple-800',
    },
  ];

  if (isLoading) {
    return (
      <>
        {statCards.map((_, index) => (
          <div key={index} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="animate-pulse p-6">
              <div className="h-8 bg-gray-700 rounded w-1/2 mb-4"></div>
              <div className="h-10 bg-gray-700 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      {statCards.map((card, index) => (
        <div 
          key={index}
          className={`bg-gradient-to-br ${card.color} rounded-lg shadow-lg overflow-hidden 
            transform transition-all duration-300 hover:scale-105 hover:shadow-xl`}
        >
          <div className="p-6 flex items-center">
            <div className="mr-4 bg-black/20 p-3 rounded-full">
              {card.icon}
            </div>
            <div>
              <p className="text-gray-200 text-sm font-medium">{card.title}</p>
              <p className="text-white text-2xl font-bold">{card.value}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default UserPaymentSummary;