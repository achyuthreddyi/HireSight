import React from 'react';
import { X, Star, CheckCircle, XCircle, Clock, Calendar, Brain, Target, Award } from 'lucide-react';

const CandidateInterviewModal = ({ interview, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[70] overflow-hidden">
      <div className="h-full flex items-center justify-center p-4">
        <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b bg-white">
            <div>
              <h2 className="text-2xl font-semibold">{interview.role}</h2>
              <div className="text-sm text-gray-500 mt-1">
                Interview on {interview.date} • {interview.duration}
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
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-8">
              {/* Quick Stats */}
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Star className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-blue-600">Overall</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-700">{interview.overallScore}%</div>
                </div>
                <div className="bg-green-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Brain className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-green-600">Technical</span>
                  </div>
                  <div className="text-2xl font-bold text-green-700">{interview.technicalScore}%</div>
                </div>
                <div className="bg-purple-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Target className="w-5 h-5 text-purple-600" />
                    <span className="text-sm text-purple-600">Problem Solving</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-700">{interview.problemSolvingScore}%</div>
                </div>
                <div className="bg-orange-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Award className="w-5 h-5 text-orange-600" />
                    <span className="text-sm text-orange-600">Communication</span>
                  </div>
                  <div className="text-2xl font-bold text-orange-700">{interview.communicationScore}%</div>
                </div>
              </div>

              {/* Strengths & Weaknesses */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Key Strengths</h3>
                  <div className="space-y-2">
                    {interview.strengths.map((strength, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <span className="text-gray-600">{strength}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Areas for Improvement</h3>
                  <div className="space-y-2">
                    {interview.weaknesses.map((weakness, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                        <span className="text-gray-600">{weakness}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Detailed Feedback */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Detailed Feedback</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                  {interview.feedback.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <h4 className="font-medium">{item.category}</h4>
                      <p className="text-gray-600">{item.comment}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interview Notes */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Interview Notes</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                  {interview.notes.map((note, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-1 h-1 rounded-full bg-gray-400 mt-2" />
                      <p className="text-gray-600">{note}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Next Steps</h3>
                <p className="text-gray-600">{interview.nextSteps}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateInterviewModal; 