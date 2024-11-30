import React from 'react';
import { Users, Briefcase, Clock, TrendingUp, CheckCircle, XCircle } from 'lucide-react';

const DashboardContent = () => {
  // Dummy data
  const metrics = {
    totalCandidates: 248,
    activePositions: 12,
    avgTimeToHire: '45 days',
    offerAcceptanceRate: '85%',
    totalInterviews: 156,
    pendingFeedback: 8
  };

  const recentHires = [
    { name: 'John Doe', position: 'Senior Frontend Developer', date: '2024-03-15' },
    { name: 'Jane Smith', position: 'Product Manager', date: '2024-03-12' },
    { name: 'Mike Johnson', position: 'DevOps Engineer', date: '2024-03-10' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold">Dashboard Overview</h2>
          <p className="text-gray-600">Company-wide recruitment metrics and analytics</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Total Candidates</p>
                <h3 className="text-3xl font-bold text-blue-700 mt-1">{metrics.totalCandidates}</h3>
              </div>
              <Users className="w-12 h-12 text-blue-500 opacity-80" />
            </div>
            <div className="mt-4 flex items-center text-sm text-blue-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>12% increase this month</span>
            </div>
          </div>

          <div className="bg-green-50 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Active Positions</p>
                <h3 className="text-3xl font-bold text-green-700 mt-1">{metrics.activePositions}</h3>
              </div>
              <Briefcase className="w-12 h-12 text-green-500 opacity-80" />
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <CheckCircle className="w-4 h-4 mr-1" />
              <span>{metrics.offerAcceptanceRate} offer acceptance</span>
            </div>
          </div>

          <div className="bg-purple-50 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 font-medium">Avg. Time to Hire</p>
                <h3 className="text-3xl font-bold text-purple-700 mt-1">{metrics.avgTimeToHire}</h3>
              </div>
              <Clock className="w-12 h-12 text-purple-500 opacity-80" />
            </div>
            <div className="mt-4 flex items-center text-sm text-purple-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>5 days faster than last month</span>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Hiring Pipeline */}
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">Hiring Pipeline</h3>
            <div className="space-y-4">
              {[
                { stage: 'Applied', count: 150, percentage: 100 },
                { stage: 'Screening', count: 89, percentage: 60 },
                { stage: 'Interview', count: 45, percentage: 30 },
                { stage: 'Offer', count: 12, percentage: 8 },
                { stage: 'Hired', count: 8, percentage: 5 }
              ].map((stage) => (
                <div key={stage.stage}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{stage.stage}</span>
                    <span className="text-gray-600">{stage.count}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${stage.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Department Wise Hiring */}
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">Department Wise Hiring</h3>
            <div className="space-y-4">
              {[
                { dept: 'Engineering', count: 25, percentage: 45 },
                { dept: 'Product', count: 12, percentage: 25 },
                { dept: 'Design', count: 8, percentage: 15 },
                { dept: 'Marketing', count: 5, percentage: 10 },
                { dept: 'Sales', count: 3, percentage: 5 }
              ].map((dept) => (
                <div key={dept.dept}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{dept.dept}</span>
                    <span className="text-gray-600">{dept.count}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${dept.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Hires */}
        <div>
          <h3 className="text-lg font-semibold mb-4">New Joinees</h3>
          <div className="border rounded-lg divide-y">
            {recentHires.map((hire, index) => (
              <div key={index} className="p-4 flex items-center justify-between">
                <div>
                  <div className="font-medium">{hire.name}</div>
                  <div className="text-sm text-gray-600">{hire.position}</div>
                </div>
                <div className="text-sm text-gray-500">{hire.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent; 