// src/components/Dashboard.jsx

import React, { useState } from 'react';
import { 
  User,
  LogOut,
  Calendar,
  MessageCircle,
  Clock,
  Users,
  ChevronRight
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import UserDetailsModal from './UserDetailsModal';

// Mock data for development
const MOCK_DATA = {
  jobs: [
    { id: 1, title: 'Senior Frontend Developer', department: 'Engineering', openings: 3 },
    { id: 2, title: 'Product Manager', department: 'Product', openings: 2 },
    { id: 3, title: 'DevOps Engineer', department: 'Infrastructure', openings: 1 }
  ],
  candidates: [
    { 
      id: 1, 
      name: 'John Doe',
      email: 'john.doe@email.com', 
      jobId: 1,
      status: 'In Progress',
      rounds: [
        { 
          id: 1, 
          type: 'Technical Round 1',
          interviewer: 'Alice Smith',
          date: '2024-11-25',
          comments: 'Strong fundamentals in React. Good problem-solving skills.',
          status: 'Passed'
        },
        { 
          id: 2, 
          type: 'System Design',
          interviewer: 'Bob Johnson',
          date: '2024-11-27',
          comments: 'Demonstrated good understanding of scalability concepts.',
          status: 'Scheduled'
        }
      ]
    },
    { 
      id: 2, 
      name: 'Jane Smith',
      email: 'jane.smith@email.com', 
      jobId: 1,
      status: 'Scheduled',
      rounds: [
        { 
          id: 1, 
          type: 'Technical Round 1',
          interviewer: 'Carol Williams',
          date: '2024-11-26',
          comments: 'Excellent JavaScript knowledge. Clear communication.',
          status: 'Passed'
        }
      ]
    }
  ],
  interviewers: [
    { id: 1, name: 'Alice Smith', department: 'Engineering' },
    { id: 2, name: 'Bob Johnson', department: 'Engineering' },
    { id: 3, name: 'Carol Williams', department: 'Product' }
  ],
  roundTypes: [
    'Technical Round 1',
    'Technical Round 2',
    'System Design',
    'Culture Fit',
    'HR Round'
  ]
};

const Dashboard = () => {
  // State management
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isInterviewActive, setIsInterviewActive] = useState(false);
  const [selectedRoundType, setSelectedRoundType] = useState('');
  const [selectedInterviewer, setSelectedInterviewer] = useState('');
  const [showUserModal, setShowUserModal] = useState(false);

  // Handler functions
  const handleJobSelect = (job) => {
    setSelectedJob(job);
    setSelectedCandidate(null);
  };

  const handleCandidateSelect = (candidate) => {
    setSelectedCandidate(candidate);
    setShowUserModal(true);
  };

  const handleStartInterview = () => {
    setIsInterviewActive(true);
  };

  const handleEndInterview = () => {
    setIsInterviewActive(false);
  };

  const handleScheduleInterview = () => {
    if (!selectedRoundType || !selectedInterviewer) {
      alert('Please select both round type and interviewer');
      return;
    }
    // Here you would typically make an API call to schedule the interview
    alert('Interview scheduled successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">ConvinEdge</div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span className="text-sm">Sarah Wilson</span>
            </div>
            <LogOut className="w-5 h-5 cursor-pointer text-gray-500 hover:text-gray-700" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Jobs List */}
          <div className="col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Open Positions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {MOCK_DATA.jobs.map(job => (
                    <div
                      key={job.id}
                      onClick={() => handleJobSelect(job)}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedJob?.id === job.id 
                          ? 'bg-blue-50 border border-blue-200' 
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="font-medium">{job.title}</div>
                      <div className="text-sm text-gray-500 flex items-center justify-between">
                        <span>{job.department}</span>
                        <span className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {job.openings}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Candidates List */}
          <div className="col-span-4">
            {selectedJob && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Candidates</CardTitle>
                </CardHeader>
                <CardContent>
                  {MOCK_DATA.candidates
                    .filter(c => c.jobId === selectedJob.id)
                    .map(candidate => (
                      <div
                        key={candidate.id}
                        onClick={() => handleCandidateSelect(candidate)}
                        className={`p-4 border-b last:border-b-0 cursor-pointer hover:bg-gray-50`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">{candidate.name}</div>
                            <div className="text-sm text-gray-500">
                              {candidate.email}
                            </div>
                            <div className="text-sm text-gray-500">
                              Latest Round: {candidate.rounds[candidate.rounds.length - 1].type}
                            </div>
                          </div>
                          <span className={`text-sm px-2 py-1 rounded ${
                            candidate.status === 'In Progress' 
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-green-100 text-green-700'
                          }`}>
                            {candidate.status}
                          </span>
                        </div>
                      </div>
                    ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Candidate Details & Interview Interface */}
          <div className="col-span-5">
            {selectedCandidate && (
              <div className="space-y-6">
                {/* Previous Rounds */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Interview History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedCandidate.rounds.map((round, index) => (
                        <div key={round.id} className="border-l-2 border-blue-200 pl-4 pb-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium">{round.type}</div>
                              <div className="text-sm text-gray-500">
                                Interviewer: {round.interviewer}
                              </div>
                              <div className="text-sm text-gray-500 flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {round.date}
                              </div>
                            </div>
                            <span className={`text-sm px-2 py-1 rounded ${
                              round.status === 'Passed' 
                                ? 'bg-green-100 text-green-700'
                                : 'bg-blue-100 text-blue-700'
                            }`}>
                              {round.status}
                            </span>
                          </div>
                          <div className="mt-2 text-sm">
                            <div className="font-medium">Comments:</div>
                            <p className="text-gray-600">{round.comments}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Schedule Next Round */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Schedule Next Round</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Round Type
                          </label>
                          <Select onValueChange={setSelectedRoundType}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select round type" />
                            </SelectTrigger>
                            <SelectContent>
                              {MOCK_DATA.roundTypes.map(type => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Interviewer
                          </label>
                          <Select onValueChange={setSelectedInterviewer}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select interviewer" />
                            </SelectTrigger>
                            <SelectContent>
                              {MOCK_DATA.interviewers.map(interviewer => (
                                <SelectItem 
                                  key={interviewer.id} 
                                  value={interviewer.id.toString()}
                                >
                                  {interviewer.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <button 
                        onClick={handleScheduleInterview}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Schedule Interview
                      </button>
                    </div>
                  </CardContent>
                </Card>

                {/* Interview Interface */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Interview Interface</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg h-64 overflow-y-auto">
                        {isInterviewActive ? (
                          <div className="text-center text-green-600">
                            Interview in progress...
                          </div>
                        ) : (
                          <div className="text-gray-400 text-center">
                            Click "Start Interview" to begin recording and transcription
                          </div>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <button 
                          onClick={handleStartInterview}
                          disabled={isInterviewActive}
                          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Start Interview
                        </button>
                        <button 
                          onClick={handleEndInterview}
                          disabled={!isInterviewActive}
                          className="flex-1 border border-blue-600 text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Clock className="w-4 h-4 mr-2" />
                          End Interview
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </main>

      {showUserModal && selectedCandidate && (
        <UserDetailsModal 
          user={selectedCandidate} 
          onClose={() => setShowUserModal(false)} 
        />
      )}
    </div>
  );
};

export default Dashboard;