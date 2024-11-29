import React from 'react';
import { X, Star, Award, Users, Calendar, Clock, Target, Brain, User, TrendingUp } from 'lucide-react';

const InterviewerDetailsModal = ({ interviewer, onClose }) => {
  // Mock metrics for the interviewer
  const metrics = {
    totalInterviews: Math.floor(Math.random() * 50) + 30,
    interviewsThisMonth: Math.floor(Math.random() * 10) + 5,
    averageRating: (4 + Math.random()).toFixed(1),
    candidatesHired: Math.floor(Math.random() * 20) + 10,
    averageDuration: '45 mins',
    coreSkills: [
      { name: 'System Design', level: 95 },
      { name: 'Data Structures', level: 90 },
      { name: 'Problem Solving', level: 88 },
      { name: 'Communication', level: 92 }
    ],
    recentFeedback: [
      'Excellent at making candidates comfortable',
      'Very thorough technical assessment',
      'Clear and concise communication',
      'Good at evaluating problem-solving skills'
    ]
  };

  // Add graph data
  const graphData = {
    monthlyInterviews: [
      { month: 'Jan', count: 34 },
      { month: 'Feb', count: 56 },
      { month: 'Mar', count: 56 },
      { month: 'Apr', count: 25 },
      { month: 'May', count: 89 },
      { month: 'Jun', count: 56 }
    ],
    candidateOutcomes: {
      hired: 45,
      rejected: 30,
      onHold: 15,
      inProgress: 10
    },
    feedbackDistribution: [
      { skill: 'Technical', score: 92 },
      { skill: 'Communication', score: 88 },
      { skill: 'Problem Solving', score: 95 },
      { skill: 'Culture Fit', score: 90 }
    ]
  };

  // Get max value for scaling
  const maxInterviews = Math.max(...graphData.monthlyInterviews.map(d => d.count));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[70]">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b bg-gray-50">
          <div>
            <h2 className="text-2xl font-semibold">{interviewer.name}</h2>
            <div className="text-sm text-gray-600 mt-1">
              {interviewer.role} • {interviewer.department}
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Profile Section */}
          <div className="flex items-start space-x-6">
            <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
              {interviewer.image ? (
                <img 
                  src={interviewer.image} 
                  alt={interviewer.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-blue-100 flex items-center justify-center">
                  <User className="w-12 h-12 text-blue-600" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-sm text-gray-500">Seniority Level</div>
                  <div className="font-medium">{interviewer.seniority}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-gray-500">Interview Panels</div>
                  <div className="flex flex-wrap gap-2">
                    {interviewer.interviewPanels?.map((panel, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs"
                      >
                        {panel}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-700">{metrics.totalInterviews}</div>
              <div className="text-sm text-blue-600">Total Interviews</div>
            </div>
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <Award className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-700">{metrics.averageRating}</div>
              <div className="text-sm text-green-600">Average Rating</div>
            </div>
            <div className="bg-purple-50 rounded-xl p-4 text-center">
              <Target className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-700">{metrics.candidatesHired}</div>
              <div className="text-sm text-purple-600">Candidates Hired</div>
            </div>
            <div className="bg-orange-50 rounded-xl p-4 text-center">
              <Calendar className="w-6 h-6 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-700">{metrics.interviewsThisMonth}</div>
              <div className="text-sm text-orange-600">This Month</div>
            </div>
          </div>

          {/* Add this after the metrics grid and before core skills */}
          <div className="grid grid-cols-2 gap-6 mt-8">
            {/* Monthly Interview Trend */}
            <div className="bg-white rounded-xl border p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                Monthly Interviews
              </h3>
              <div className="h-48 flex items-end space-x-2">
                {graphData.monthlyInterviews.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-blue-500 rounded-t-lg transition-all duration-300 hover:bg-blue-600"
                      style={{ 
                        height: `${(data.count / maxInterviews) * 100}%`,
                        minHeight: '20px'
                      }}
                    />
                    <div className="text-xs text-gray-600 mt-2">{data.month}</div>
                    <div className="text-xs font-medium">{data.count}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Candidate Outcome Distribution */}
            <div className="bg-white rounded-xl border p-6">
              <h3 className="text-lg font-semibold mb-4">Candidate Outcomes</h3>
              <div className="space-y-4">
                {Object.entries(graphData.candidateOutcomes).map(([key, value], index) => (
                  <div key={key} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span>{value}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          key === 'hired' ? 'bg-green-500' :
                          key === 'rejected' ? 'bg-red-500' :
                          key === 'onHold' ? 'bg-yellow-500' :
                          'bg-blue-500'
                        }`}
                        style={{ width: `${value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Feedback Radar Chart (Simplified Version) */}
          <div className="mt-8 bg-white rounded-xl border p-6">
            <h3 className="text-lg font-semibold mb-4">Feedback Distribution</h3>
            <div className="grid grid-cols-2 gap-4">
              {graphData.feedbackDistribution.map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">{item.skill}</span>
                    <span className="text-sm text-gray-600">{item.score}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-full bg-blue-500 rounded-full transition-all duration-300"
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Skills */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Brain className="w-5 h-5 mr-2 text-blue-600" />
              Core Skills
            </h3>
            <div className="space-y-4">
              {metrics.coreSkills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-gray-600">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div 
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Feedback */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Star className="w-5 h-5 mr-2 text-yellow-500" />
              Recent Feedback
            </h3>
            <div className="space-y-3">
              {metrics.recentFeedback.map((feedback, index) => (
                <div 
                  key={index}
                  className="bg-gray-50 p-3 rounded-lg text-sm text-gray-600"
                >
                  {feedback}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewerDetailsModal; 