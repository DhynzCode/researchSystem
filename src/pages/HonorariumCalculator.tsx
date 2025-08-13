import React, { useState } from 'react';
import { 
  Calculator, 
  DollarSign, 
  Users, 
  FileText, 
  Download,
  Award,
  TrendingUp
} from 'lucide-react';
import { PanelRole, DefenseType, HonorariumRate } from '../types';

const HonorariumCalculator: React.FC = () => {
  const [selectedDefenseType, setSelectedDefenseType] = useState<DefenseType>('Final');
  const [numberOfStudents, setNumberOfStudents] = useState<number>(1);
  const [selectedPanelMembers, setSelectedPanelMembers] = useState<{role: PanelRole; count: number}[]>([]);

  const honorariumRates: HonorariumRate[] = [
    { role: 'Advisor', rate: 800 },
    { role: 'Chairperson', rate: 450 },
    { role: 'Statistician', rate: 500 },
    { role: 'Panel Member', rate: 400 },
    { role: 'Adviser', rate: 350 },
    { role: 'Validator', rate: 300 },
    { role: 'Secretary', rate: 250 },
    { role: 'Language Editor', rate: 300 }
  ];

  const defenseMultipliers = {
    'Pre-Oral': 0.8,
    'Final': 1.0
  };

  const addPanelMember = (role: PanelRole) => {
    const existing = selectedPanelMembers.find(member => member.role === role);
    if (existing) {
      setSelectedPanelMembers(
        selectedPanelMembers.map(member =>
          member.role === role ? { ...member, count: member.count + 1 } : member
        )
      );
    } else {
      setSelectedPanelMembers([...selectedPanelMembers, { role, count: 1 }]);
    }
  };

  const removePanelMember = (role: PanelRole) => {
    setSelectedPanelMembers(
      selectedPanelMembers.map(member =>
        member.role === role ? { ...member, count: Math.max(0, member.count - 1) } : member
      ).filter(member => member.count > 0)
    );
  };

  const calculateTotalHonorarium = () => {
    const multiplier = defenseMultipliers[selectedDefenseType];
    return selectedPanelMembers.reduce((total, member) => {
      const rate = honorariumRates.find(r => r.role === member.role)?.rate || 0;
      return total + (rate * member.count * multiplier);
    }, 0);
  };

  const calculatePerStudentFee = () => {
    return numberOfStudents > 0 ? calculateTotalHonorarium() / numberOfStudents : 0;
  };

  const mockPaymentHistory = [
    { id: 'PAY-2024-001', facultyName: 'Dr. Maria Santos', role: 'Chairperson', amount: 450, date: '2024-01-15', status: 'Paid' },
    { id: 'PAY-2024-002', facultyName: 'Prof. Juan dela Cruz', role: 'Panel Member', amount: 400, date: '2024-01-14', status: 'Pending' },
    { id: 'PAY-2024-003', facultyName: 'Dr. Ana Reyes', role: 'Statistician', amount: 500, date: '2024-01-13', status: 'Paid' },
    { id: 'PAY-2024-004', facultyName: 'Prof. Carlos Mendez', role: 'Adviser', amount: 350, date: '2024-01-12', status: 'Paid' },
    { id: 'PAY-2024-005', facultyName: 'Dr. Elena Rodriguez', role: 'Secretary', amount: 250, date: '2024-01-11', status: 'Pending' }
  ];

  const totalPaid = mockPaymentHistory.filter(p => p.status === 'Paid').reduce((sum, p) => sum + p.amount, 0);
  const totalPending = mockPaymentHistory.filter(p => p.status === 'Pending').reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Honorarium Calculator</h1>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Paid</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">₱{totalPaid.toLocaleString()}</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Payment</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">₱{totalPending.toLocaleString()}</p>
            </div>
            <Award className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Budget</p>
              <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">₱{(totalPaid + totalPending).toLocaleString()}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calculator */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Calculator className="w-6 h-6 text-green-600" />
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Fee Calculator</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Defense Type</label>
              <select
                value={selectedDefenseType}
                onChange={(e) => setSelectedDefenseType(e.target.value as DefenseType)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 dark:text-gray-200"
              >
                <option value="Pre-Oral">Pre-Oral (80% rate)</option>
                <option value="Final">Final (100% rate)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Number of Students</label>
              <input
                type="number"
                min="1"
                value={numberOfStudents}
                onChange={(e) => setNumberOfStudents(parseInt(e.target.value) || 1)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 dark:text-gray-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Panel Members</label>
              <div className="space-y-2">
                {honorariumRates.map((rate) => (
                  <div key={rate.role} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-gray-800 dark:text-gray-200">{rate.role}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">₱{rate.rate} per member</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => removePanelMember(rate.role)}
                        className="w-8 h-8 bg-red-100 text-red-600 rounded-full hover:bg-red-200 flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-medium">
                        {selectedPanelMembers.find(m => m.role === rate.role)?.count || 0}
                      </span>
                      <button
                        onClick={() => addPanelMember(rate.role)}
                        className="w-8 h-8 bg-green-100 text-green-600 rounded-full hover:bg-green-200 flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Calculation Results</h2>
          
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 mb-2">Total Honorarium</h3>
              <p className="text-3xl font-bold text-green-600">₱{calculateTotalHonorarium().toLocaleString()}</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">Per Student Fee</h3>
              <p className="text-2xl font-bold text-blue-600">₱{calculatePerStudentFee().toLocaleString()}</p>
            </div>

            {selectedPanelMembers.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Breakdown by Role</h3>
                <div className="space-y-2">
                  {selectedPanelMembers.map((member) => {
                    const rate = honorariumRates.find(r => r.role === member.role)?.rate || 0;
                    const multiplier = defenseMultipliers[selectedDefenseType];
                    const totalForRole = rate * member.count * multiplier;
                    
                    return (
                      <div key={member.role} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {member.role} ({member.count}x)
                        </span>
                        <span className="font-medium text-gray-800 dark:text-gray-200">₱{totalForRole.toLocaleString()}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Defense Type Multiplier</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {selectedDefenseType}: {(defenseMultipliers[selectedDefenseType] * 100)}% of base rate
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Recent Payment History</h2>
          <Users className="w-6 h-6 text-gray-400" />
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Payment ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Faculty Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Role</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockPaymentHistory.map((payment) => (
                <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50 dark:bg-gray-700">
                  <td className="py-3 px-4 font-medium text-gray-800 dark:text-gray-200">{payment.id}</td>
                  <td className="py-3 px-4 text-gray-800 dark:text-gray-200">{payment.facultyName}</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{payment.role}</td>
                  <td className="py-3 px-4 font-semibold text-gray-800 dark:text-gray-200">₱{payment.amount.toLocaleString()}</td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{new Date(payment.date).toLocaleDateString()}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      payment.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HonorariumCalculator;