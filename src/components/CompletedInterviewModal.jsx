import React, { useState, useRef } from 'react';
import { X, Star, CheckCircle, XCircle, Clock, MessageCircle, ChevronRight, BarChart, Play, Pause, Volume2, VolumeX, ThumbsUp, ThumbsDown, Briefcase, User as UserIcon, ArrowRight, IndianRupee } from 'lucide-react';
import InterviewTabContent from './InterviewTabContent';
import { MOCK_DATA } from '../data/mockData';
import InterviewDetailsCard from './InterviewDetailsCard';
import PerformanceScorecard from './PerformanceScorecard';

const CompletedInterviewModal = ({ interview, onClose }) => {
  const { roundType, round } = interview;
  const [activeTab, setActiveTab] = useState('Overview');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [showScorecard, setShowScorecard] = useState(false);

  // Helper functions for random value generation
  const generateRandomScore = () => {
    return Math.floor(Math.random() * 55) + 40;
  };

  const generateRandomSalary = (min, max) => {
    const lakhs = Math.floor(Math.random() * (max - min + 1)) + min;
    const thousands = Math.floor(Math.random() * 100);
    return `₹${lakhs},${thousands.toString().padStart(2, '0')},000`;
  };

  // Add this function after the generateRandomSalary function
  const getRecommendationDetails = (overallScore) => {
    if (overallScore >= 85) {
      return {
        status: 'Strong Hire',
        icon: <ThumbsUp className="w-5 h-5" />,
        colors: 'bg-green-100 text-green-700',
        message: 'Excellent candidate with strong technical and soft skills.'
      };
    } else if (overallScore >= 70) {
      return {
        status: 'Consider Hire',
        icon: <ArrowRight className="w-5 h-5" />,
        colors: 'bg-blue-100 text-blue-700',
        message: 'Good potential, some areas need development.'
      };
    } else if (overallScore >= 50) {
      return {
        status: 'Consider Other Role',
        icon: <ArrowRight className="w-5 h-5" />,
        colors: 'bg-yellow-100 text-yellow-700',
        message: 'May be better suited for a different position.'
      };
    } else {
      return {
        status: 'Do Not Hire',
        icon: <ThumbsDown className="w-5 h-5" />,
        colors: 'bg-red-100 text-red-700',
        message: 'Does not meet minimum requirements.'
      };
    }
  };

  // Generate all random values once when component mounts
  const [interviewData] = useState(() => {
    const overallScore = generateRandomScore();
    return {
      overallScore,
      scores: {
        technical: Math.min(overallScore + Math.floor(Math.random() * 10), 98),
        communication: Math.min(overallScore + Math.floor(Math.random() * 10), 98),
        problemSolving: Math.min(overallScore + Math.floor(Math.random() * 10), 98),
        cultureFit: Math.min(overallScore + Math.floor(Math.random() * 10), 98)
      },
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
      },
      salaries: {
        expected: generateRandomSalary(25, 35),
        recommended: generateRandomSalary(22, 32),
        budgetMin: generateRandomSalary(20, 30),
        budgetMax: generateRandomSalary(25, 35)
      },
      keyStrengthScores: Array(6).fill(0).map(() => Math.floor(Math.random() * 10) + 85),
      improvementScores: Array(3).fill(0).map(() => Math.floor(Math.random() * 15) + 35)
    };
  });

  const [selectedVideo] = useState(() => {
    const videos = [MOCK_DATA.interviewVideos.video1, MOCK_DATA.interviewVideos.video2];
    return videos[Math.floor(Math.random() * videos.length)];
  });

  const candidateData = {
    name: "John Smith",
    role: "Senior Frontend Developer",
    email: "john.smith@email.com",
    phone: "+1 234 567 8900",
    currentCompany: "Tech Solutions Inc.",
    experience: 8,
    completedRounds: 3,
    totalDuration: "2h 15m",
    overallScore: interviewData.overallScore
  };

  const scores = interviewData.scores;

  // Mock analytics data
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

  const renderSkillsAssessment = () => (
    <div className="grid grid-cols-2 gap-8">
      {/* Hard Skills */}
      <div className="bg-blue-50 rounded-xl p-6">
        <h3 className="font-semibold mb-4 text-blue-700">Technical Skills Assessment</h3>
        <div className="space-y-4">
          {Object.entries(interviewData.skillScores.hardSkills).map(([skill, score]) => (
            <div key={skill}>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">{skill}</span>
                <span className="font-medium">{score}%</span>
              </div>
              <div className="h-2 bg-blue-100 rounded-full">
                <div 
                  className="h-full bg-blue-500 rounded-full transition-all duration-300"
                  style={{ width: `${score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Soft Skills */}
      <div className="bg-purple-50 rounded-xl p-6">
        <h3 className="font-semibold mb-4 text-purple-700">Behavioral Skills Assessment</h3>
        <div className="space-y-4">
          {Object.entries(interviewData.skillScores.softSkills).map(([skill, score]) => (
            <div key={skill}>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">{skill}</span>
                <span className="font-medium">{score}%</span>
              </div>
              <div className="h-2 bg-purple-100 rounded-full">
                <div 
                  className="h-full bg-purple-500 rounded-full transition-all duration-300"
                  style={{ width: `${score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] overflow-hidden">
      <div className="h-full flex items-center justify-center p-4">
        <div className="bg-white rounded-lg w-full max-w-[90vw] max-h-[90vh] flex flex-col">
          {/* Header */}
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

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Video and Details Section */}
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Left Column */}
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

                    {/* Video Controls */}
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

                    {/* Play Button Overlay */}
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

                  {/* Tabs */}
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

                {/* Right Column */}
                <div className="lg:w-1/2">
                  <InterviewDetailsCard 
                    candidate={candidateData}
                    recommendation={getRecommendationDetails(interviewData.overallScore)}
                    scores={scores}
                  />
                </div>
              </div>

              {/* Compensation Analysis */}
              <div className="bg-white rounded-xl border p-6">
                <h3 className="text-xl font-semibold mb-6 flex items-center">
                  <IndianRupee className="w-6 h-6 mr-2 text-green-600" />
                  Compensation Analysis
                </h3>
                <div className="grid grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">Expected CTC</div>
                    <div className="text-xl font-bold text-gray-900">
                      {interviewData.salaries.expected} <span className="text-sm font-normal">per annum</span>
                    </div>
                    <div className="text-xs text-gray-500">As per candidate's expectation</div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">Recommended CTC</div>
                    <div className="text-xl font-bold text-blue-600">
                      {interviewData.salaries.recommended} <span className="text-sm font-normal">per annum</span>
                    </div>
                    <div className="text-xs text-gray-500">Based on performance & experience</div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">Budget Range</div>
                    <div className="text-xl font-bold text-purple-600">
                      {interviewData.salaries.budgetMin} - {interviewData.salaries.budgetMax}
                    </div>
                    <div className="text-xs text-gray-500">Approved budget for this role</div>
                  </div>
                </div>

                {/* Compensation Insights */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <h4 className="font-medium text-blue-800 mb-2">AI Compensation Insights</h4>
                  <div className="text-sm text-blue-700">
                    Based on the candidate's performance (
                    <span className="font-medium">{candidateData.overallScore}%</span>
                    ), market standards, and internal parity, the recommended CTC is optimal. 
                    {candidateData.overallScore >= 85 
                      ? " Consider offering at the higher end of the budget range given the exceptional performance."
                      : candidateData.overallScore >= 70
                      ? " The recommended CTC aligns well with the candidate's demonstrated skills and experience."
                      : " Consider negotiating towards the lower end of the budget range."}
                  </div>
                </div>
              </div>

              {/* Skills Assessment */}
              <div className="bg-white rounded-xl border p-6">
                <h3 className="text-xl font-semibold mb-6">Skills Assessment</h3>
                {renderSkillsAssessment()}
              </div>

              {/* Key Strengths and Areas for Improvement */}
              <div className="grid grid-cols-2 gap-6">
                {/* Key Strengths */}
                <div className="bg-white rounded-xl border p-6">
                  <h3 className="text-lg font-semibold mb-4">Key Strengths</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {analytics.keyStrengths.map((strength, index) => (
                      <div key={index} className="flex items-center justify-between text-sm bg-green-50 rounded-md p-2">
                        <div className="flex items-center">
                          <CheckCircle className="w-3.5 h-3.5 text-green-500 mr-2 flex-shrink-0" />
                          <span className="text-xs text-gray-700">{strength}</span>
                        </div>
                        <span className="text-xs font-medium text-green-600">{interviewData.keyStrengthScores[index]}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Areas for Improvement */}
                <div className="bg-white rounded-xl border p-6">
                  <h3 className="text-lg font-semibold mb-4">Areas for Improvement</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {analytics.areasOfImprovement.map((area, index) => (
                      <div key={index} className="flex items-center justify-between text-sm bg-red-50 rounded-md p-2">
                        <div className="flex items-center">
                          <XCircle className="w-3.5 h-3.5 text-red-500 mr-2 flex-shrink-0" />
                          <span className="text-xs text-gray-700">{area}</span>
                        </div>
                        <span className="text-xs font-medium text-red-600">{interviewData.improvementScores[index]}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Previous Rounds Comments and Current Feedback */}
              <div className="grid grid-cols-2 gap-6">
                {/* Previous Comments */}
                <div className="bg-[#fffbeb] rounded-xl border border-amber-200 p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-amber-600" />
                    Previous Round Comments
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div className="border-b border-amber-200 pb-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <UserIcon className="w-4 h-4 text-amber-600" />
                            <div>
                              <span className="font-medium text-amber-800">Technical Round</span>
                              <div className="text-xs text-amber-600">by Amitabh Bachchan (Senior Architecture Lead)</div>
                            </div>
                          </div>
                          <span className="text-xs text-amber-600">2 days ago</span>
                        </div>
                        <p className="text-sm text-amber-900 font-[cursive]">
                          Excellent problem-solving approach. Demonstrated strong understanding of system design principles. 
                          Could improve on SQL query optimization. Overall, a strong candidate with good potential.
                        </p>
                      </div>

                      <div className="border-b border-amber-200 pb-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-amber-600" />
                            <div>
                              <span className="font-medium text-amber-800">HR Round</span>
                              <div className="text-xs text-amber-600">by Madhuri Dixit (Product Lead)</div>
                            </div>
                          </div>
                          <span className="text-xs text-amber-600">4 days ago</span>
                        </div>
                        <p className="text-sm text-amber-900 font-[cursive]">
                          Great cultural fit! Shows enthusiasm for learning and teamwork. 
                          Communication skills are top-notch. Previous project experience aligns well with our needs.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Current Round Feedback Form */}
                <div className="bg-white rounded-xl border p-6">
                  <h3 className="text-lg font-semibold mb-4">Add Your Feedback</h3>
                  <div className="space-y-4">
                    {/* Comment Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Feedback Type
                      </label>
                      <select 
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        defaultValue="technical"
                      >
                        <option value="technical">Technical Assessment</option>
                        <option value="behavioral">Behavioral Assessment</option>
                        <option value="cultural">Cultural Fit</option>
                        <option value="overall">Overall Feedback</option>
                      </select>
                    </div>

                    {/* Detailed Comments */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Detailed Comments
                      </label>
                      <textarea 
                        className="w-full h-32 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        placeholder="Enter your detailed feedback here..."
                      />
                    </div>

                    {/* Rating */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Overall Rating
                      </label>
                      <div className="flex items-center space-x-2">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <button
                            key={rating}
                            className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                          >
                            {rating}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                    >
                      Submit Feedback
                    </button>
                  </div>
                </div>
              </div>

              {/* Interview Summary Stats - Moved to the end */}
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

      {showScorecard && (
        <PerformanceScorecard 
          performance={analytics}
          onClose={() => setShowScorecard(false)}
        />
      )}
    </div>
  );
};

export default CompletedInterviewModal; 