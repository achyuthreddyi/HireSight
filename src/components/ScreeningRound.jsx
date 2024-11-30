import React, { useState } from 'react';
import { Phone, Calendar, AlertCircle, ThumbsUp, ThumbsDown, ArrowRight, Search, Filter, ArrowUpDown, Check } from 'lucide-react';
import MOCK_DATA from '../data/mockData';

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'scheduled':
      return 'bg-blue-100 text-blue-700';
    case 'rejected':
      return 'bg-red-100 text-red-700';
    case 'upcoming':
      return 'bg-yellow-100 text-yellow-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};

const getTypeIcon = (type) => {
  switch (type.toLowerCase()) {
    case 'reminder':
      return <Calendar className="w-4 h-4 text-blue-500" />;
    case 'profiling':
      return <Phone className="w-4 h-4 text-green-500" />;
    case 'feedback':
      return <AlertCircle className="w-4 h-4 text-purple-500" />;
    default:
      return null;
  }
};

const getRecommendationIcon = (recommendation) => {
  switch (recommendation.toLowerCase()) {
    case 'hire':
      return <ThumbsUp className="w-4 h-4 text-green-500" />;
    case 'strong hire':
      return <ThumbsUp className="w-4 h-4 text-blue-500" />;
    case 'rejected':
      return <ThumbsDown className="w-4 h-4 text-red-500" />;
    case 'try':
      return <ArrowRight className="w-4 h-4 text-yellow-500" />;
    default:
      return null;
  }
};

// Add this component for the notification
const Notification = ({ message, onClose }) => (
  <div className="fixed bottom-4 right-4 bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2">
    <Check className="w-5 h-5" />
    <span>{message}</span>
  </div>
);

// Add getActionButton helper function
const getActionButton = (nextSteps, onAction) => {
  switch (nextSteps) {
    case 'scheduled':
      return (
        <button
          onClick={() => onAction('Candidate scheduled successfully')}
          className="px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
        >
          Schedule
        </button>
      );
    case 'rejected':
      return (
        <button
          onClick={() => onAction('Candidate rejected successfully')}
          className="px-3 py-1.5 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
        >
          Reject
        </button>
      );
    case 'upcoming':
      return (
        <button
          onClick={() => onAction('Reminder set successfully')}
          className="px-3 py-1.5 text-sm bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100 transition-colors"
        >
          Remind
        </button>
      );
    default:
      return null;
  }
};

const ScreeningRound = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [nextStepsFilter, setNextStepsFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' or 'desc'
  const [roleFilter, setRoleFilter] = useState('all');
  const [notification, setNotification] = useState(null);

  const handleAction = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000); // Hide after 3 seconds
  };

  // Filter and sort the candidates
  const filteredCandidates = MOCK_DATA.screeningCandidates
    .filter(candidate => 
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.role.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(candidate => typeFilter === 'all' ? true : candidate.type === typeFilter)
    .filter(candidate => nextStepsFilter === 'all' ? true : candidate.nextSteps === nextStepsFilter)
    .filter(candidate => roleFilter === 'all' ? true : candidate.role === roleFilter)
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.score - b.score;
      }
      return b.score - a.score;
    });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border">
        {/* Header */}
        <div className="px-6 pt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Voice Bot Screening Results</h2>
          </div>
        </div>

        {/* Search and Filters Section */}
        <div className="px-6 py-4 border-b">
          <div className="flex flex-wrap items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 min-w-[240px]">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search candidates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Filters Group */}
            <div className="flex flex-wrap items-center gap-4">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="profiling">Profiling</option>
                <option value="reminder">Reminder</option>
                <option value="feedback">Feedback</option>
              </select>

              <select
                value={nextStepsFilter}
                onChange={(e) => setNextStepsFilter(e.target.value)}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Steps</option>
                <option value="scheduled">Scheduled</option>
                <option value="upcoming">Upcoming</option>
                <option value="rejected">Rejected</option>
              </select>

              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Roles</option>
                <option value="Senior Frontend Developer">Frontend</option>
                <option value="Product Manager">Product</option>
                <option value="DevOps Engineer">DevOps</option>
                <option value="UI/UX Designer">Design</option>
                <option value="Backend Developer">Backend</option>
                <option value="Data Scientist">Data Science</option>
                <option value="Full Stack Developer">Full Stack</option>
                <option value="System Architect">Architecture</option>
                <option value="QA Engineer">QA</option>
                <option value="Mobile Developer">Mobile</option>
              </select>

              {/* Sort Toggle */}
              <button
                onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                className="flex items-center space-x-2 px-3 py-2 border rounded-lg hover:bg-gray-50"
              >
                <ArrowUpDown className="w-4 h-4" />
                <span>Score {sortOrder === 'asc' ? '↑' : '↓'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Table Content */}
        <div className="p-6">
          {/* Results Summary */}
          <div className="mb-4 text-sm text-gray-500">
            Showing {filteredCandidates.length} results
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Candidate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Next Steps
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Recommendation
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCandidates.map((candidate) => (
                  <tr key={candidate.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-blue-600 font-medium">
                              {candidate.name.charAt(0)}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {candidate.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {candidate.email}
                          </div>
                          <div className="text-xs text-blue-600 mt-1">
                            {candidate.role}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {candidate.score}%
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(candidate.nextSteps)}`}>
                        {candidate.nextSteps}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getTypeIcon(candidate.type)}
                        <span className="ml-2 text-sm text-gray-900">{candidate.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getRecommendationIcon(candidate.recommendation)}
                        <span className="ml-2 text-sm text-gray-900">{candidate.recommendation}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      {getActionButton(candidate.nextSteps, handleAction)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add notification */}
      {notification && (
        <Notification 
          message={notification} 
          onClose={() => setNotification(null)} 
        />
      )}
    </div>
  );
};

export default ScreeningRound; 