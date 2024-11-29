import React from 'react';
import { X, Star, CheckCircle, XCircle, Clock, MessageCircle, ChevronRight, BarChart } from 'lucide-react';

const CompletedInterviewModal = ({ interview, onClose }) => {
  const { roundType, round } = interview;

  // Mock analytics data (in real app, this would come from your backend)
  const analytics = {
    duration: '45 minutes',
    questionsAsked: 8,
    technicalScore: 85,
    communicationScore: 90,
    problemSolving: 82,
    codingScore: 88,
    systemDesign: 78,
    algorithmScore: 92,
    keyStrengths: ['React', 'System Design', 'Problem Solving', 'Communication', 'JavaScript', 'Data Structures'],
    areasOfImprovement: ['SQL Optimization', 'Testing Practices', 'System Scalability'],
    recommendations: 'Strong candidate with good technical foundation. Recommend focusing on advanced system design concepts.',
    interviewerRating: 4.5,
    detailedFeedback: {
      technical: 'Demonstrated strong understanding of React concepts, hooks, and state management. Good knowledge of JavaScript fundamentals.',
      communication: 'Articulates thoughts clearly and maintains professional communication throughout the interview.',
      problemSolving: 'Approaches problems methodically, asks clarifying questions, and considers edge cases.',
      attitude: 'Shows enthusiasm for learning and handles feedback constructively.'
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
      <div className="bg-white w-full max-w-[90vw] h-[90vh] rounded-lg flex flex-col">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b bg-gray-50 rounded-t-lg">
          <div>
            <h2 className="text-2xl font-semibold">Interview Analytics</h2>
            <div className="text-sm text-gray-500 mt-1">{roundType}</div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-[1400px] mx-auto space-y-8">
            {/* Top Stats */}
            <div className="grid grid-cols-4 gap-6">
              {[
                { label: 'Technical Score', value: analytics.technicalScore, color: 'blue' },
                { label: 'Communication', value: analytics.communicationScore, color: 'green' },
                { label: 'Problem Solving', value: analytics.problemSolving, color: 'purple' },
                { label: 'Overall Rating', value: analytics.interviewerRating, color: 'yellow', isRating: true }
              ].map((stat, index) => (
                <div key={index} className={`bg-${stat.color}-50 rounded-xl p-6 text-center`}>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                  <div className={`text-3xl font-bold text-${stat.color}-600 mt-2`}>
                    {stat.isRating ? `${stat.value}/5` : `${stat.value}%`}
                  </div>
                </div>
              ))}
            </div>

            {/* Detailed Scores */}
            <div className="grid grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl border p-6">
                  <h3 className="text-lg font-semibold mb-4">Technical Assessment</h3>
                  <div className="space-y-4">
                    {[
                      { label: 'Coding', score: analytics.codingScore },
                      { label: 'System Design', score: analytics.systemDesign },
                      { label: 'Algorithms', score: analytics.algorithmScore }
                    ].map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{item.label}</span>
                          <span className="font-medium">{item.score}%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500 rounded-full"
                            style={{ width: `${item.score}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl border p-6">
                  <h3 className="text-lg font-semibold mb-4">Key Strengths</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {analytics.keyStrengths.map((strength, index) => (
                      <div key={index} className="flex items-center text-sm bg-green-50 rounded-lg p-3">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        <span>{strength}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl border p-6">
                  <h3 className="text-lg font-semibold mb-4">Detailed Feedback</h3>
                  <div className="space-y-4">
                    {Object.entries(analytics.detailedFeedback).map(([key, value]) => (
                      <div key={key} className="space-y-2">
                        <h4 className="font-medium capitalize">{key}</h4>
                        <p className="text-sm text-gray-600">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl border p-6">
                  <h3 className="text-lg font-semibold mb-4">Areas for Improvement</h3>
                  <div className="space-y-3">
                    {analytics.areasOfImprovement.map((area, index) => (
                      <div key={index} className="flex items-center text-sm bg-red-50 rounded-lg p-3">
                        <XCircle className="w-4 h-4 text-red-500 mr-2 flex-shrink-0" />
                        <span>{area}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Interview Stats */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="grid grid-cols-3 gap-6">
                <div className="flex items-center space-x-3">
                  <Clock className="w-6 h-6 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-600">Duration</div>
                    <div className="font-medium">{analytics.duration}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MessageCircle className="w-6 h-6 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-600">Questions Asked</div>
                    <div className="font-medium">{analytics.questionsAsked}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <BarChart className="w-6 h-6 text-gray-400" />
                  <div>
                    <div className="text-sm text-gray-600">Overall Performance</div>
                    <div className="font-medium">Above Average</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletedInterviewModal; 