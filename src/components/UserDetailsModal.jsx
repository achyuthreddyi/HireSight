import React, { useState } from 'react';
import { X, Calendar, User, Mail, Building, Clock, Send, MessageCircle } from 'lucide-react';
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
          <div className="space-y-6">
            {/* Email Communication */}
            <div className="bg-white rounded-xl border p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Mail className="w-5 h-5 mr-2 text-blue-500" />
                Send Email
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter email subject"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Type your message here..."
                  />
                </div>
                <button
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                  onClick={() => {
                    // Handle email sending
                    alert('Email sent successfully!');
                  }}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Email
                </button>
              </div>
            </div>

            {/* WhatsApp Communication */}
            <div className="bg-white rounded-xl border p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <svg 
                  viewBox="0 0 24 24" 
                  className="w-5 h-5 mr-2 text-green-500"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                WhatsApp Message
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                    placeholder="Type your WhatsApp message here..."
                  />
                </div>
                <button
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                  onClick={() => {
                    // Handle WhatsApp message
                    // You can use WhatsApp API or deep linking
                    const phone = user.phone.replace(/\D/g, ''); // Remove non-digits
                    window.open(`https://wa.me/${phone}`, '_blank');
                  }}
                >
                  <svg 
                    viewBox="0 0 24 24" 
                    className="w-4 h-4 mr-2"
                    fill="currentColor"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
                  </svg>
                  Send WhatsApp Message
                </button>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600 mt-2">
                <MessageCircle className="w-4 h-4" />
                <span>{user.phone}</span>
              </div>
            </div>
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