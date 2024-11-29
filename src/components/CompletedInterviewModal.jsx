import React from 'react';
import { X, Star, CheckCircle, XCircle, Clock, MessageCircle } from 'lucide-react';

const CompletedInterviewModal = ({ interview, onClose }) => {
  const { roundType, round } = interview;

  // Mock analytics data (in real app, this would come from your backend)
  const analytics = {
    duration: '45 minutes',
    questionsAsked: 8,
    technicalScore: 85,
    communicationScore: 90,
    problemSolving: 82,
    keyStrengths: ['React', 'System Design', 'Problem Solving'],
    areasOfImprovement: ['SQL Optimization', 'Testing Practices'],
    recommendations: 'Strong candidate with good technical foundation. Recommend focusing on advanced system design concepts.',
    interviewerRating: 4.5,
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <div>
            <h2 className="text-2xl font-semibold">Interview Analytics</h2>
            <div className="text-sm text-gray-500 mt-1">{roundType}</div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {/* Performance Metrics */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-sm text-gray-600">Technical Score</div>
              <div className="text-2xl font-semibold text-blue-600 mt-1">{analytics.technicalScore}%</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="text-sm text-gray-600">Communication</div>
              <div className="text-2xl font-semibold text-green-600 mt-1">{analytics.communicationScore}%</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <div className="text-sm text-gray-600">Problem Solving</div>
              <div className="text-2xl font-semibold text-purple-600 mt-1">{analytics.problemSolving}%</div>
            </div>
          </div>

          {/* Interview Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium mb-2">Key Strengths</h4>
              <div className="space-y-2">
                {analytics.keyStrengths.map((strength, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    {strength}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium mb-2">Areas for Improvement</h4>
              <div className="space-y-2">
                {analytics.areasOfImprovement.map((area, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <XCircle className="w-4 h-4 text-red-500 mr-2" />
                    {area}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interviewer's Assessment */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium mb-2">Interviewer's Assessment</h4>
            <div className="flex items-center mb-2">
              <Star className="w-5 h-5 text-yellow-400 mr-1" />
              <span className="text-lg font-medium">{analytics.interviewerRating}</span>
              <span className="text-sm text-gray-500 ml-2">out of 5</span>
            </div>
            <p className="text-sm text-gray-600">{analytics.recommendations}</p>
          </div>

          {/* Interview Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-600">Duration: {analytics.duration}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-600">Questions Asked: {analytics.questionsAsked}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletedInterviewModal; 