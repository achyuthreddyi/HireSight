import React from 'react';
import { X, User, Calendar, Clock, MessageCircle, TrendingUp, Star, CheckCircle, XCircle } from 'lucide-react';

const InterviewModal = ({ interview, onClose }) => {
  const { candidate, interviewer, roundType, date, time = '10:00 AM', round } = interview;
  const isCompletedRound = round?.status === 'Passed' || round?.status === 'Failed';

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

  const renderMetrics = () => (
    <div className="space-y-6">
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
  );

  const renderUpcomingInterview = () => (
    <div className="space-y-6">
      {/* Interview Info */}
      <div className="grid grid-cols-2 gap-6">
        {/* Candidate Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Candidate</h3>
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">{candidate.name}</div>
                <div className="text-sm text-gray-500">{candidate.email}</div>
              </div>
            </div>
            <div className="mt-3 text-sm text-gray-600">
              <div>Role: {candidate.role}</div>
              <div className="mt-1">Current Round: {candidate.currentRound}</div>
              <div className="mt-1">Overall Score: {candidate.overallScore}%</div>
            </div>
          </div>
        </div>

        {/* Interviewer Info */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Interviewer</h3>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <User className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">{interviewer.name}</div>
                <div className="text-sm text-gray-500">{interviewer.role}</div>
              </div>
            </div>
            <div className="mt-3 text-sm text-gray-600">
              <div>Department: {interviewer.department}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Interview Schedule */}
      <div className="bg-gray-50 rounded-lg p-4 space-y-4">
        <h3 className="text-lg font-medium">Interview Schedule</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-gray-400" />
            <span className="text-gray-600">{date}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-gray-400" />
            <span className="text-gray-600">{time}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MessageCircle className="w-5 h-5 text-gray-400" />
            <span className="text-gray-600">{roundType}</span>
          </div>
        </div>
      </div>

      {/* Round Details */}
      {round && (
        <div className="bg-gray-50 rounded-lg p-4 space-y-4">
          <h3 className="text-lg font-medium">Round Details</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Status</span>
              <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                round.status === 'Passed' 
                  ? 'bg-green-100 text-green-700'
                  : 'bg-blue-100 text-blue-700'
              }`}>
                {round.status}
              </span>
            </div>
            {round.comments && (
              <div>
                <span className="text-gray-600">Comments:</span>
                <p className="mt-1 text-sm text-gray-700">{round.comments}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button 
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
          onClick={() => {/* Handle join interview */}}
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Join Interview
        </button>
        <button 
          className="flex-1 border border-blue-600 text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center"
          onClick={() => {/* Handle reschedule */}}
        >
          <Calendar className="w-4 h-4 mr-2" />
          Reschedule
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <div>
            <h2 className="text-2xl font-semibold">
              {isCompletedRound ? 'Interview Analytics' : 'Interview Details'}
            </h2>
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
        <div className="p-6">
          {isCompletedRound ? renderMetrics() : renderUpcomingInterview()}
        </div>
      </div>
    </div>
  );
};

export default InterviewModal; 