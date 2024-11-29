// src/components/Dashboard.jsx

import React, { useState } from 'react';
import { 
  User,
  LogOut,
  Users,
  Briefcase,
  Building,
  Mail,
  Calendar,
  Search,
  Phone,
  Star,
  Filter
} from 'lucide-react';
import UserDetailsModal from './UserDetailsModal';
import MOCK_DATA from '../data/mockData';

const Dashboard = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roundFilter, setRoundFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const handleJobSelect = (job) => {
    setSelectedJob(job);
    setSelectedCandidate(null);
  };

  const handleCandidateSelect = (candidate) => {
    setSelectedCandidate(candidate);
    setShowUserModal(true);
  };

  const filteredCandidates = MOCK_DATA.candidates
    .filter(c => selectedJob ? c.jobId === selectedJob.id : true)
    .filter(c => 
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(c => statusFilter === 'all' ? true : c.status.toLowerCase() === statusFilter.toLowerCase())
    .filter(c => roundFilter === 'all' ? true : c.currentRound === parseInt(roundFilter));

  const getRoundRating = (rounds) => {
    const lastRound = rounds[rounds.length - 1];
    return lastRound.status === 'Passed' ? '4.5/5' : 'Pending';
  };

  const getCandidateCount = (jobId) => {
    return MOCK_DATA.candidates.filter(c => c.jobId === jobId).length;
  };

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'hire':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'onhold':
        return 'bg-yellow-100 text-yellow-800';
      case 'in progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const FiltersSection = () => (
    <div className={`bg-white rounded-lg shadow-sm border p-4 mb-4 ${showFilters ? '' : 'hidden'}`}>
      <div className="grid grid-cols-2 gap-4">
        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="all">All Statuses</option>
            <option value="in progress">In Progress</option>
            <option value="hire">Hire</option>
            <option value="rejected">Rejected</option>
            <option value="onhold">On Hold</option>
          </select>
        </div>

        {/* Round Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Interview Round
          </label>
          <select
            value={roundFilter}
            onChange={(e) => setRoundFilter(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="all">All Rounds</option>
            {[1, 2, 3, 4, 5].map(round => (
              <option key={round} value={round}>Round {round}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm fixed w-full top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">ConvinEdge</div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm font-medium">Sarah Wilson</span>
            </div>
            <LogOut className="w-5 h-5 cursor-pointer text-gray-500 hover:text-gray-700" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 pb-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-12 gap-6">
            {/* Jobs List - Updated */}
            <div className="col-span-3 bg-white rounded-lg shadow-sm border h-[calc(100vh-7rem)] sticky top-20">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
                  Open Positions
                </h2>
              </div>
              <div className="overflow-y-auto h-[calc(100%-4rem)]">
                {MOCK_DATA.jobs.map(job => (
                  <div
                    key={job.id}
                    onClick={() => handleJobSelect(job)}
                    className={`p-4 cursor-pointer transition-colors border-l-4 ${
                      selectedJob?.id === job.id 
                        ? 'bg-blue-50 border-l-blue-500' 
                        : 'border-l-transparent hover:bg-gray-50'
                    }`}
                  >
                    <div className="font-medium text-gray-900">{job.title}</div>
                    <div className="mt-1 flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <Building className="w-4 h-4 mr-1" />
                        {job.department}
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center" title="Open positions">
                          <Briefcase className="w-4 h-4 mr-1" />
                          {job.openings}
                        </div>
                        <div className="flex items-center" title="Total candidates">
                          <Users className="w-4 h-4 mr-1" />
                          {getCandidateCount(job.id)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Candidates List - Updated */}
            <div className="col-span-9">
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-4">
                  <div className="flex justify-between items-center mb-6">
                    <div className="space-y-1">
                      <h2 className="text-lg font-semibold flex items-center">
                        <Users className="w-5 h-5 mr-2 text-blue-600" />
                        Candidates {selectedJob && `for ${selectedJob.title}`}
                      </h2>
                      {selectedJob && (
                        <p className="text-sm text-gray-500">
                          {getCandidateCount(selectedJob.id)} candidates for {selectedJob.openings} openings
                        </p>
                      )}
                    </div>
                    <div className="flex items-center space-x-4">
                      {/* Search Input */}
                      <div className="relative">
                        <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search candidates..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      {/* Filter Button */}
                      <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`p-2 rounded-lg border ${
                          showFilters || statusFilter !== 'all' || roundFilter !== 'all'
                            ? 'bg-blue-50 border-blue-500 text-blue-600'
                            : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <Filter className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Add Filters Section */}
                  <FiltersSection />

                  {/* Table Header */}
                  <div className="grid grid-cols-12 gap-4 px-4 py-2 bg-gray-50 rounded-t-lg text-sm font-medium text-gray-500">
                    <div className="col-span-2">Candidate</div>
                    <div className="col-span-2">Role</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-2">Contact</div>
                    <div className="col-span-2">Round</div>
                    <div className="col-span-2">Score</div>
                  </div>

                  {/* Candidates List */}
                  <div className="divide-y">
                    {filteredCandidates.map(candidate => (
                      <div
                        key={candidate.id}
                        onClick={() => handleCandidateSelect(candidate)}
                        className="grid grid-cols-12 gap-4 px-4 py-3 items-center hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        {/* Candidate Name & Image */}
                        <div className="col-span-2 flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center">
                            <User className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="truncate">
                            <div className="font-medium text-gray-900">{candidate.name}</div>
                            <div className="text-sm text-gray-500 truncate">
                              {candidate.email}
                            </div>
                          </div>
                        </div>

                        {/* Role */}
                        <div className="col-span-2 text-sm text-gray-600">
                          {candidate.role}
                        </div>

                        {/* Status */}
                        <div className="col-span-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(candidate.status)}`}>
                            {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                          </span>
                        </div>

                        {/* Contact Info */}
                        <div className="col-span-2 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <span>{candidate.phone}</span>
                          </div>
                        </div>

                        {/* Interview Round */}
                        <div className="col-span-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                              <span className="text-sm font-medium text-blue-600">R{candidate.currentRound}</span>
                            </div>
                            <span className="text-sm text-gray-600">
                              Round {candidate.currentRound}
                            </span>
                          </div>
                        </div>

                        {/* Overall Score */}
                        <div className="col-span-2">
                          <div className="flex items-center space-x-2">
                            <div className={`h-2 w-16 rounded-full ${
                              candidate.overallScore >= 75 ? 'bg-green-500' :
                              candidate.overallScore >= 50 ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}>
                              <div 
                                className="h-full rounded-full bg-opacity-50"
                                style={{ width: `${candidate.overallScore}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium text-gray-600">
                              {candidate.overallScore}%
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
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