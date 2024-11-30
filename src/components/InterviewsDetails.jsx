import React from 'react';
import { BarChart2, Users, Clock, Calendar, Target, Award } from 'lucide-react';
import { MOCK_DATA } from '../data/mockData';

const InterviewsDetails = () => {
  // Get the first interviewer from the team
  const interviewer = MOCK_DATA.team[0]; // Shah Rukh Khan

  // Mock performance data
  const performanceData = {
    totalInterviews: 156,
    thisMonth: 23,
    avgDuration: '45 mins',
    upcomingInterviews: 5,
    ratings: {
      technical: 4.8,
      communication: 4.9,
      thoroughness: 4.7,
      fairness: 4.8
    },
    recentInterviews: [
      { date: '2024-03-15', candidates: 3, avgScore: 85 },
      { date: '2024-03-14', candidates: 4, avgScore: 88 },
      { date: '2024-03-13', candidates: 2, avgScore: 92 },
      { date: '2024-03-12', candidates: 3, avgScore: 86 },
      { date: '2024-03-11', candidates: 4, avgScore: 89 }
    ]
  };

  // Add this after the performanceData object
  const candidatesList = [
    {
      name: 'Rahul Sharma',
      score: 92,
      role: 'Senior Frontend Developer',
      status: 'hired',
      date: '2024-03-15'
    },
    {
      name: 'Priya Patel',
      score: 78,
      role: 'Backend Engineer',
      status: 'hired',
      date: '2024-03-14'
    },
    {
      name: 'Amit Kumar',
      score: 65,
      role: 'Product Designer',
      status: 'rejected',
      date: '2024-03-14'
    },
    {
      name: 'Neha Singh',
      score: 88,
      role: 'DevOps Engineer',
      status: 'hired',
      date: '2024-03-13'
    },
    {
      name: 'Vikram Malhotra',
      score: 72,
      role: 'Full Stack Developer',
      status: 'rejected',
      date: '2024-03-12'
    },
    {
      name: 'Anjali Gupta',
      score: 95,
      role: 'UI/UX Designer',
      status: 'hired',
      date: '2024-03-12'
    },
    {
      name: 'Karan Mehta',
      score: 68,
      role: 'Backend Developer',
      status: 'rejected',
      date: '2024-03-11'
    },
    {
      name: 'Pooja Verma',
      score: 91,
      role: 'System Architect',
      status: 'hired',
      date: '2024-03-10'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6">
        {/* Interviewer Profile */}
        <div className="flex items-center space-x-6 mb-8">
          <img 
            src={interviewer.image}
            alt={interviewer.name}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h2 className="text-2xl font-semibold">{interviewer.name}</h2>
            <p className="text-gray-600">{interviewer.role}</p>
            <div className="flex items-center mt-2 text-sm text-gray-500">
              <Award className="w-4 h-4 mr-1" />
              <span>Senior Interviewer • {interviewer.department}</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-blue-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-6 h-6 text-blue-600" />
              <span className="text-xs text-blue-600 font-medium">Total</span>
            </div>
            <div className="text-2xl font-bold text-blue-700">{performanceData.totalInterviews}</div>
            <div className="text-sm text-blue-600">Interviews Conducted</div>
          </div>
          
          <div className="bg-green-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="w-6 h-6 text-green-600" />
              <span className="text-xs text-green-600 font-medium">This Month</span>
            </div>
            <div className="text-2xl font-bold text-green-700">{performanceData.thisMonth}</div>
            <div className="text-sm text-green-600">Interviews</div>
          </div>

          <div className="bg-purple-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-6 h-6 text-purple-600" />
              <span className="text-xs text-purple-600 font-medium">Average</span>
            </div>
            <div className="text-2xl font-bold text-purple-700">{performanceData.avgDuration}</div>
            <div className="text-sm text-purple-600">Interview Duration</div>
          </div>

          <div className="bg-orange-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <Target className="w-6 h-6 text-orange-600" />
              <span className="text-xs text-orange-600 font-medium">Upcoming</span>
            </div>
            <div className="text-2xl font-bold text-orange-700">{performanceData.upcomingInterviews}</div>
            <div className="text-sm text-orange-600">Scheduled Interviews</div>
          </div>
        </div>

        {/* Rating Metrics */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
          <div className="grid grid-cols-2 gap-6">
            {Object.entries(performanceData.ratings).map(([key, value]) => (
              <div key={key} className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium capitalize">{key}</span>
                  <span className="text-sm text-gray-600">{value}/5.0</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${(value/5)*100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Interviews */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Recent Interview Sessions</h3>
          <div className="space-y-4">
            {performanceData.recentInterviews.map((session, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="font-medium">{session.date}</div>
                    <div className="text-sm text-gray-500">{session.candidates} candidates</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <BarChart2 className="w-4 h-4 text-blue-500" />
                  <span className="font-medium">{session.avgScore}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Candidates List Section */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Recent Interview Outcomes</h3>
          <div className="overflow-hidden border rounded-lg">
            {/* Table Header */}
            <div className="grid grid-cols-5 gap-4 px-6 py-3 bg-gray-50 border-b text-sm font-medium text-gray-500">
              <div className="col-span-2">Candidate</div>
              <div>Role</div>
              <div>Score</div>
              <div>Status</div>
            </div>

            {/* Table Body */}
            <div className="divide-y">
              {candidatesList.map((candidate, index) => (
                <div 
                  key={index}
                  className="grid grid-cols-5 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors items-center"
                >
                  <div className="col-span-2">
                    <div className="font-medium text-gray-900">{candidate.name}</div>
                    <div className="text-sm text-gray-500">{candidate.date}</div>
                  </div>
                  <div className="text-sm text-gray-600">
                    {candidate.role}
                  </div>
                  <div className="flex items-center">
                    <div 
                      className={`h-2 w-16 rounded-full mr-2 ${
                        candidate.score >= 85 ? 'bg-green-500' :
                        candidate.score >= 70 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                    >
                      <div 
                        className="h-full rounded-full bg-opacity-50"
                        style={{ width: `${candidate.score}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-600">
                      {candidate.score}%
                    </span>
                  </div>
                  <div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      candidate.status === 'hired' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewsDetails; 