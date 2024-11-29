import React, { useState } from 'react';
import { X, Star, CheckCircle, XCircle, Clock, MessageCircle, ChevronRight, BarChart, Play } from 'lucide-react';
import InterviewTabContent from './InterviewTabContent';

const CompletedInterviewModal = ({ interview, onClose }) => {
  const { roundType, round } = interview;
  const [activeTab, setActiveTab] = useState('Overview');

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
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] overflow-hidden">
      <div className="h-full flex items-center justify-center p-4">
        <div className="bg-white rounded-lg w-full max-w-[90vw] max-h-[90vh] flex flex-col">
          {/* Header - Fixed */}
          <div className="flex justify-between items-center p-6 border-b bg-white">
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

          {/* Main Content - Scrollable */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Top Section: Video + Stats */}
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Left Column: Video + Tabs */}
                <div className="lg:w-1/2 flex flex-col">
                  {/* Video Player */}
                  <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                    <div className="w-full h-full bg-gray-800 relative group">
                      <img 
                        src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2"
                        alt="Interview Recording"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100">
                          <Play className="w-8 h-8 text-gray-900 ml-1" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tabs Section */}
                  <div className="mt-6 flex flex-col flex-1">
                    <div className="flex border-b">
                      {['Overview', 'Audio Transcript', 'Summary', 'Relevant Skills'].map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                            activeTab === tab
                              ? 'border-blue-500 text-blue-600'
                              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                    <div className="flex-1 min-h-[300px]">
                      <InterviewTabContent activeTab={activeTab} />
                    </div>
                  </div>
                </div>

                {/* Right Column: Quick Stats */}
                <div className="lg:w-1/2">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-xl p-4">
                      <div className="text-sm text-blue-600 font-medium">Duration</div>
                      <div className="text-2xl font-bold text-blue-700 mt-1">{analytics.duration}</div>
                    </div>
                    <div className="bg-green-50 rounded-xl p-4">
                      <div className="text-sm text-green-600 font-medium">Questions</div>
                      <div className="text-2xl font-bold text-green-700 mt-1">{analytics.questionsAsked}</div>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-4">
                      <div className="text-sm text-purple-600 font-medium">Technical Score</div>
                      <div className="text-2xl font-bold text-purple-700 mt-1">{analytics.technicalScore}%</div>
                    </div>
                    <div className="bg-orange-50 rounded-xl p-4">
                      <div className="text-sm text-orange-600 font-medium">Communication</div>
                      <div className="text-2xl font-bold text-orange-700 mt-1">{analytics.communicationScore}%</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Analytics Section */}
              <div className="space-y-6">
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
      </div>
    </div>
  );
};

export default CompletedInterviewModal; 