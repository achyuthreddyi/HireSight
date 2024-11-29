import React from 'react';
import { X, User, Calendar, Clock, MessageCircle } from 'lucide-react';

const UpcomingInterviewModal = ({ interview, onClose }) => {
  const { candidate, interviewer, roundType, date, time = '10:00 AM', round } = interview;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <div>
            <h2 className="text-2xl font-semibold">Interview Details</h2>
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
      </div>
    </div>
  );
};

export default UpcomingInterviewModal; 