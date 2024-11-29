import React, { useState } from 'react';
import { X, Calendar, User, Mail, Building, Clock } from 'lucide-react';
import UpcomingInterviewModal from './UpcomingInterviewModal';
import CompletedInterviewModal from './CompletedInterviewModal';
import MOCK_DATA from '../data/mockData';

const TABS = [
  { id: 'rounds', label: 'Interview Rounds' },
  { id: 'conversation', label: 'Conversation' },
  { id: 'schedule', label: 'Schedule Interview' }
];

const UserDetailsModal = ({ user, onClose }) => {
  const [activeTab, setActiveTab] = useState('rounds');
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState(null);

  const handleInterviewClick = (round) => {
    const interviewer = MOCK_DATA.interviewers.find(i => i.name === round.interviewer) || 
      MOCK_DATA.interviewers[Math.floor(Math.random() * MOCK_DATA.interviewers.length)];

    setSelectedInterview({
      candidate: user,
      interviewer,
      roundType: round.type,
      date: round.date,
      time: '10:00 AM',
      round: round
    });
    setShowInterviewModal(true);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'rounds':
        return (
          <div className="space-y-4">
            {user.rounds.map((round) => (
              <div 
                key={round.id}
                className="border rounded-lg p-4 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors"
                onClick={() => handleInterviewClick(round)}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-medium">{round.type}</h4>
                    <p className="text-sm text-gray-600">
                      Interviewer: {round.interviewer}
                    </p>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
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
                <div className="mt-2">
                  <p className="text-sm text-gray-700">{round.comments}</p>
                </div>
              </div>
            ))}
          </div>
        );

      case 'conversation':
        return (
          <div className="p-4 text-center text-gray-500">
            Communication features will be implemented here
          </div>
        );

      case 'schedule':
        return (
          <div className="p-4 text-center text-gray-500">
            Interview scheduling features will be implemented here
          </div>
        );

      default:
        return null;
    }
  };

  if (!user) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          {/* Modal Header */}
          <div className="flex justify-between items-center p-6 border-b">
            <div>
              <h2 className="text-2xl font-semibold">{user.name}</h2>
              <div className="flex items-center mt-1 text-gray-500 text-sm">
                <Mail className="w-4 h-4 mr-1" />
                {user.email}
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Tabs */}
          <div className="border-b">
            <div className="flex">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 text-sm font-medium border-b-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>

      {/* Interview Modal */}
      {showInterviewModal && selectedInterview && (
        selectedInterview.round.status === 'Passed' || selectedInterview.round.status === 'Failed' ? (
          <CompletedInterviewModal 
            interview={selectedInterview}
            onClose={() => setShowInterviewModal(false)}
          />
        ) : (
          <UpcomingInterviewModal 
            interview={selectedInterview}
            onClose={() => setShowInterviewModal(false)}
          />
        )
      )}
    </>
  );
};

export default UserDetailsModal; 