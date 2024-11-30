import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, Briefcase, User as UserIcon, ArrowRight, Mail, Phone, Building, Clock, ChevronRight } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import PerformanceScorecard from './PerformanceScorecard';

const InterviewDetailsCard = ({ candidate, recommendation, scores }) => {
  const pieData = [
    { name: 'Technical', value: scores.technical },
    { name: 'Communication', value: scores.communication },
    { name: 'Problem Solving', value: scores.problemSolving },
    { name: 'Culture Fit', value: scores.cultureFit }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B'];

  const getScoreColor = (score) => {
    if (score >= 85) return 'text-green-600 bg-green-50';
    if (score >= 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const [showScorecard, setShowScorecard] = useState(false);

  return (
    <div className="space-y-6">
      {/* Candidate Details Card */}
      <div className="bg-white rounded-xl border p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Briefcase className="w-5 h-5 text-gray-500" />
              <span className="font-medium text-gray-900">{candidate.role}</span>
            </div>
            <div className="space-y-2 text-gray-600">
              <div className="flex items-center space-x-2">
                <UserIcon className="w-4 h-4" />
                <span>{candidate.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>{candidate.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>{candidate.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Building className="w-4 h-4" />
                <span>{candidate.currentCompany}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{candidate.experience} Years Experience</span>
              </div>
            </div>
          </div>
          <div>
            <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-full ${recommendation.colors}`}>
              {recommendation.icon}
              <span className="font-medium">{recommendation.status}</span>
            </div>
          </div>
        </div>

        {/* Overall Score Section */}
        <div className="mb-6 p-4 rounded-xl border">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Overall Performance</h3>
            <div className="flex items-center space-x-3">
              <div className={`text-2xl font-bold px-4 py-2 rounded-lg ${getScoreColor(candidate.overallScore)}`}>
                {candidate.overallScore}%
              </div>
              <button
                onClick={() => setShowScorecard(true)}
                className="px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center space-x-2"
              >
                <ChevronRight className="w-4 h-4" />
                <span>View Details</span>
              </button>
            </div>
          </div>
          <div className="mt-3 h-3 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${
                candidate.overallScore >= 85 ? 'bg-green-500' :
                candidate.overallScore >= 70 ? 'bg-yellow-500' :
                'bg-red-500'
              }`}
              style={{ width: `${candidate.overallScore}%` }}
            />
          </div>
          <div className="mt-2 flex justify-between text-sm text-gray-500">
            <span>Poor</span>
            <span>Average</span>
            <span>Excellent</span>
          </div>
        </div>

        {/* Cumulative Score Chart */}
        <div className="mt-6">
          <h3 className="font-semibold mb-4">Interview Performance</h3>
          <div className="flex items-center space-x-6">
            <div className="w-32 h-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={25}
                    outerRadius={40}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4">
              {pieData.map((entry, index) => (
                <div key={entry.name} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                  <div className="flex-1">
                    <div className="text-sm font-medium">{entry.name}</div>
                    <div className="text-sm text-gray-500">{entry.value}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Interview Summary */}
        <div className="mt-6 pt-6 border-t">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-3 rounded-lg bg-gray-50">
              <div className="text-sm text-gray-500">Rounds Completed</div>
              <div className="text-xl font-semibold mt-1">{candidate.completedRounds}</div>
            </div>
            <div className="p-3 rounded-lg bg-gray-50">
              <div className="text-sm text-gray-500">Total Duration</div>
              <div className="text-xl font-semibold mt-1">{candidate.totalDuration}</div>
            </div>
          </div>
        </div>
      </div>

      {showScorecard && (
        <PerformanceScorecard 
          performance={{
            overallScore: candidate.overallScore,
            technicalScore: scores.technical,
            communicationScore: scores.communication,
            problemSolving: scores.problemSolving,
            cultureFit: scores.cultureFit,
            codingScore: Math.floor(Math.random() * 15) + 80,
            systemDesign: Math.floor(Math.random() * 15) + 80,
          }}
          onClose={() => setShowScorecard(false)}
        />
      )}
    </div>
  );
};

export default InterviewDetailsCard; 