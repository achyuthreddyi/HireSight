import React, { useState, useRef } from 'react';
import { X, Star, CheckCircle, XCircle, Clock, MessageCircle, ChevronRight, BarChart, Play, Pause, Volume2, VolumeX, ThumbsUp, ThumbsDown, Briefcase, User as UserIcon, ArrowRight } from 'lucide-react';
import InterviewTabContent from './InterviewTabContent';
import { MOCK_DATA } from '../data/mockData';
import InterviewDetailsCard from './InterviewDetailsCard';

const CompletedInterviewModal = ({ interview, onClose }) => {
  const { roundType, round } = interview;
  const [activeTab, setActiveTab] = useState('Overview');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);

  // Add back the selectedVideo state
  const [selectedVideo] = useState(() => {
    const videos = [MOCK_DATA.interviewVideos.video1, MOCK_DATA.interviewVideos.video2];
    return videos[Math.floor(Math.random() * videos.length)];
  });

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

  // Move getRecommendationDetails before it's used
  const getRecommendationDetails = (confidence) => {
    if (confidence >= 75) {
      return {
        status: 'Strong Hire',
        icon: <ThumbsUp className="w-5 h-5" />,
        colors: 'bg-green-100 text-green-700'
      };
    } else if (confidence >= 50) {
      return {
        status: 'Consider Other Role',
        icon: <ArrowRight className="w-5 h-5" />,
        colors: 'bg-yellow-100 text-yellow-700'
      };
    } else {
      return {
        status: 'Do Not Hire',
        icon: <ThumbsDown className="w-5 h-5" />,
        colors: 'bg-red-100 text-red-700'
      };
    }
  };

  // Generate random values once when component mounts
  const [initialValues] = useState(() => ({
    confidence: Math.floor(Math.random() * 40) + 40,
    skillScores: {
      hardSkills: {
        'System Design': Math.floor(Math.random() * 20) + 80,
        'Data Structures': Math.floor(Math.random() * 15) + 80,
        'Algorithms': Math.floor(Math.random() * 15) + 80,
        'Problem Solving': Math.floor(Math.random() * 15) + 80,
        'Coding': Math.floor(Math.random() * 15) + 80,
      },
      softSkills: {
        'Communication': Math.floor(Math.random() * 15) + 80,
        'Leadership': Math.floor(Math.random() * 20) + 75,
        'Team Collaboration': Math.floor(Math.random() * 15) + 80,
        'Adaptability': Math.floor(Math.random() * 20) + 75,
      }
    }
  }));

  // Now we can use getRecommendationDetails
  const recommendation = getRecommendationDetails(initialValues.confidence);

  // Update the skills section to use initialValues
  const renderSkillsAssessment = () => (
    <div className="space-y-6">
      {/* Hard Skills */}
      <div className="bg-blue-50 rounded-xl p-4">
        <h3 className="font-semibold mb-4">Technical Skills Assessment</h3>
        <div className="space-y-3">
          {Object.entries(initialValues.skillScores.hardSkills).map(([skill, score]) => (
            <div key={skill}>
              <div className="flex justify-between text-sm mb-1">
                <span>{skill}</span>
                <span className="font-medium">{score}%</span>
              </div>
              <div className="h-2 bg-blue-100 rounded-full">
                <div 
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Soft Skills */}
      <div className="bg-purple-50 rounded-xl p-4">
        <h3 className="font-semibold mb-4">Behavioral Skills Assessment</h3>
        <div className="space-y-3">
          {Object.entries(initialValues.skillScores.softSkills).map(([skill, score]) => (
            <div key={skill}>
              <div className="flex justify-between text-sm mb-1">
                <span>{skill}</span>
                <span className="font-medium">{score}%</span>
              </div>
              <div className="h-2 bg-purple-100 rounded-full">
                <div 
                  className="h-full bg-purple-500 rounded-full"
                  style={{ width: `${score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVideoError = () => {
    if (videoRef.current) {
      const currentVideo = videoRef.current.src;
      const videos = Object.values(MOCK_DATA.interviewVideos);
      const alternateVideo = videos.find(v => v !== currentVideo);
      if (alternateVideo) {
        videoRef.current.src = alternateVideo;
        videoRef.current.load();
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(Math.floor(videoRef.current.currentTime));
    }
  };

  // Inside the component, add mock candidate data
  const candidateData = {
    name: "John Smith",
    role: "Senior Frontend Developer",
    email: "john.smith@email.com",
    phone: "+1 234 567 8900",
    currentCompany: "Tech Solutions Inc.",
    experience: 8,
    completedRounds: 3,
    totalDuration: "2h 15m",
    overallScore: 88
  };

  const scores = {
    technical: 85,
    communication: 92,
    problemSolving: 88,
    cultureFit: 90
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
              {/* First Row: Video + Stats */}
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Left Column: Video + Tabs */}
                <div className="lg:w-1/2 flex flex-col">
                  {/* Video Player */}
                  <div className="h-[30vh] bg-gray-900 rounded-lg overflow-hidden relative group">
                    <video
                      ref={videoRef}
                      className="w-full h-full object-cover"
                      src={selectedVideo}
                      onEnded={() => setIsPlaying(false)}
                      onError={handleVideoError}
                      onTimeUpdate={handleTimeUpdate}
                    >
                      Your browser does not support the video tag.
                    </video>

                    {/* Video Controls - Show on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                      <div className="w-full p-4 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={handlePlayPause}
                            className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                          >
                            {isPlaying ? (
                              <Pause className="w-6 h-6 text-white" />
                            ) : (
                              <Play className="w-6 h-6 text-white ml-1" />
                            )}
                          </button>
                          <div className="text-white text-sm">
                            Video {selectedVideo.includes('video1') ? '1' : '2'}
                          </div>
                        </div>

                        <button
                          onClick={handleMuteToggle}
                          className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                        >
                          {isMuted ? (
                            <VolumeX className="w-6 h-6 text-white" />
                          ) : (
                            <Volume2 className="w-6 h-6 text-white" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Play Button Overlay - Show when not playing */}
                    {!isPlaying && (
                      <div 
                        className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer"
                        onClick={handlePlayPause}
                      >
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                          <Play className="w-8 h-8 text-white ml-1" />
                        </div>
                      </div>
                    )}
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
                      <InterviewTabContent 
                        activeTab={activeTab} 
                        currentTime={currentTime}
                        isPlaying={isPlaying}
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column: Interview Details and Skills */}
                <div className="lg:w-1/2">
                  {/* Interview Details Card */}
                  <InterviewDetailsCard 
                    candidate={candidateData}
                    recommendation={recommendation}
                    scores={scores}
                  />

                  {/* Skills Assessment */}
                  {renderSkillsAssessment()}
                </div>
              </div>

              {/* Update the detailed analytics section */}
              <div className="space-y-8">
                {/* Quick Stats Grid - Full Width */}
                <div className="bg-white rounded-xl border p-6">
                  <div className="grid grid-cols-4 gap-6">
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

                {/* Performance Overview */}
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

                {/* Interview Summary Stats */}
                <div className="bg-white rounded-xl border p-6">
                  <div className="grid grid-cols-3 gap-8">
                    <div className="flex items-center space-x-4">
                      <Clock className="w-8 h-8 text-gray-400" />
                      <div>
                        <div className="text-sm text-gray-500">Duration</div>
                        <div className="text-lg font-medium mt-1">{analytics.duration}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <MessageCircle className="w-8 h-8 text-gray-400" />
                      <div>
                        <div className="text-sm text-gray-500">Questions Asked</div>
                        <div className="text-lg font-medium mt-1">{analytics.questionsAsked}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <BarChart className="w-8 h-8 text-gray-400" />
                      <div>
                        <div className="text-sm text-gray-500">Overall Performance</div>
                        <div className="text-lg font-medium mt-1">Above Average</div>
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