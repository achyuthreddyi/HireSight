import React, { useState } from 'react';
import { X, Calendar, User, Mail, Building, Clock, Send, MessageCircle, Eye, Download, FileText, Archive } from 'lucide-react';
import UpcomingInterviewModal from './UpcomingInterviewModal';
import CompletedInterviewModal from './CompletedInterviewModal';
import MOCK_DATA from '../data/mockData';

const TABS = [
  { id: 'rounds', label: 'Interview Rounds' },
  { id: 'conversation', label: 'Conversation' },
  { id: 'schedule', label: 'Schedule Interview' },
  { id: 'User Details', label: 'User Details' },
  { id: 'Documents', label: 'Documents' }
];

const UserDetailsModal = ({ user, onClose }) => {
  const [activeTab, setActiveTab] = useState('rounds');
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [selectedInterviewer, setSelectedInterviewer] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');

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

  const generateTimeSlots = () => {
    // Generate random time slots for the next 5 days
    const slots = [];
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const times = ['10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'];

    days.forEach(day => {
      // Randomly select 2-3 time slots for each day
      const availableTimes = times.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 2) + 2);
      availableTimes.forEach(time => {
        slots.push({
          label: `${day} - ${time}`,
          value: `${day} - ${time}`
        });
      });
    });

    return slots;
  };

  const renderUserDetails = () => (
    <div className="space-y-6">
      {/* Personal Information */}
      <div className="bg-white rounded-lg border p-4">
        <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600">Full Name</label>
            <div className="font-medium">{user.name}</div>
          </div>
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <div className="font-medium">{user.email}</div>
          </div>
          <div>
            <label className="text-sm text-gray-600">Phone</label>
            <div className="font-medium">{user.phone}</div>
          </div>
          <div>
            <label className="text-sm text-gray-600">Location</label>
            <div className="font-medium">Bangalore, India</div>
          </div>
        </div>
      </div>

      {/* Professional Information */}
      <div className="bg-white rounded-lg border p-4">
        <h3 className="text-lg font-semibold mb-4">Professional Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600">Current Company</label>
            <div className="font-medium">TechCorp Solutions</div>
          </div>
          <div>
            <label className="text-sm text-gray-600">Total Experience</label>
            <div className="font-medium">5 years 3 months</div>
          </div>
          <div>
            <label className="text-sm text-gray-600">Current Role</label>
            <div className="font-medium">Senior Frontend Developer</div>
          </div>
          <div>
            <label className="text-sm text-gray-600">Notice Period</label>
            <div className="font-medium">60 days</div>
          </div>
        </div>
      </div>

      {/* Compensation Details */}
      <div className="bg-white rounded-lg border p-4">
        <h3 className="text-lg font-semibold mb-4">Compensation Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600">Current CTC</label>
            <div className="font-medium">₹18,00,000 per annum</div>
          </div>
          <div>
            <label className="text-sm text-gray-600">Expected CTC</label>
            <div className="font-medium">₹25,00,000 per annum</div>
          </div>
          <div>
            <label className="text-sm text-gray-600">Last Hike</label>
            <div className="font-medium">15% (6 months ago)</div>
          </div>
          <div>
            <label className="text-sm text-gray-600">Expected Joining Time</label>
            <div className="font-medium">After notice period</div>
          </div>
        </div>
      </div>

      {/* Skills & Expertise */}
      <div className="bg-white rounded-lg border p-4">
        <h3 className="text-lg font-semibold mb-4">Skills & Expertise</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Primary Skills</label>
            <div className="flex flex-wrap gap-2 mt-1">
              {['React', 'JavaScript', 'TypeScript', 'Node.js', 'Redux'].map((skill) => (
                <span 
                  key={skill}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-600">Secondary Skills</label>
            <div className="flex flex-wrap gap-2 mt-1">
              {['AWS', 'Docker', 'MongoDB', 'GraphQL', 'Jest'].map((skill) => (
                <span 
                  key={skill}
                  className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="bg-white rounded-lg border p-4">
        <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600">Preferred Work Location</label>
            <div className="font-medium">Bangalore, Hybrid</div>
          </div>
          <div>
            <label className="text-sm text-gray-600">Willing to Relocate</label>
            <div className="font-medium">Yes</div>
          </div>
          <div>
            <label className="text-sm text-gray-600">Other Offers</label>
            <div className="font-medium">2 offers in hand</div>
          </div>
          <div>
            <label className="text-sm text-gray-600">Reason for Change</label>
            <div className="font-medium">Career Growth</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDocuments = () => (
    <div className="space-y-6">
      {/* Resume Section */}
      <div className="bg-white rounded-lg border p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Resume</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => window.open('/resume.pdf', '_blank')}
              className="px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center"
            >
              <Eye className="w-4 h-4 mr-1.5" />
              View
            </button>
            <button
              onClick={() => {/* Handle download */}}
              className="px-3 py-1.5 text-sm bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors flex items-center"
            >
              <Download className="w-4 h-4 mr-1.5" />
              Download
            </button>
          </div>
        </div>
        
        {/* Resume Preview */}
        <div className="border rounded-lg p-4 bg-gray-50">
          <div className="aspect-[3/4] bg-white rounded-lg shadow-sm border relative">
            <div className="absolute inset-0 p-4">
              {/* Resume Preview Content */}
              <div className="space-y-4">
                <div className="border-b pb-2">
                  <h4 className="font-bold text-lg">{user.name}</h4>
                  <p className="text-sm text-gray-600">{user.role}</p>
                </div>
                <div className="text-sm text-gray-700 space-y-1">
                  <p>📧 {user.email}</p>
                  <p>📱 {user.phone}</p>
                  <p>📍 Bangalore, India</p>
                </div>
                {/* Add more resume content preview */}
              </div>
            </div>
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
          </div>
        </div>
      </div>

      {/* Other Documents */}
      <div className="bg-white rounded-lg border p-4">
        <h3 className="text-lg font-semibold mb-4">Other Documents</h3>
        <div className="space-y-3">
          {[
            { name: 'Experience Certificate.pdf', size: '2.4 MB', type: 'PDF' },
            { name: 'Previous Offer Letter.pdf', size: '1.8 MB', type: 'PDF' },
            { name: 'Certifications.zip', size: '5.2 MB', type: 'ZIP' },
          ].map((doc, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-100 rounded">
                  {doc.type === 'PDF' ? (
                    <FileText className="w-5 h-5 text-red-500" />
                  ) : (
                    <Archive className="w-5 h-5 text-blue-500" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-sm">{doc.name}</p>
                  <p className="text-xs text-gray-500">{doc.size}</p>
                </div>
              </div>
              <button
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => {/* Handle download */}}
              >
                <Download className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

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
          <div className="space-y-6">
            <div className="bg-white rounded-xl border p-6">
              <h3 className="text-lg font-semibold mb-6 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                Schedule New Interview
              </h3>

              {/* Interviewer Selection */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Interviewer
                  </label>
                  <select
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    onChange={(e) => {
                      const selectedInterviewer = MOCK_DATA.interviewers.find(
                        i => i.id === parseInt(e.target.value)
                      );
                      setSelectedInterviewer(selectedInterviewer);
                    }}
                  >
                    <option value="">Choose an interviewer</option>
                    {MOCK_DATA.interviewers.map(interviewer => (
                      <option key={interviewer.id} value={interviewer.id}>
                        {interviewer.name} - {interviewer.role}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Time Slots */}
                {selectedInterviewer && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Available Time Slots
                    </label>
                    <select
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      onChange={(e) => setSelectedTimeSlot(e.target.value)}
                    >
                      <option value="">Select a time slot</option>
                      {generateTimeSlots().map((slot, index) => (
                        <option key={index} value={slot.value}>
                          {slot.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Schedule Button */}
                <button
                  className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!selectedInterviewer || !selectedTimeSlot}
                  onClick={() => {
                    alert(`Interview scheduled with ${selectedInterviewer.name} at ${selectedTimeSlot}`);
                    // Handle scheduling logic here
                  }}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Interview
                </button>
              </div>

              {/* Selected Details */}
              {selectedInterviewer && selectedTimeSlot && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-sm text-gray-700 mb-2">Selected Details</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      <span>
                        {selectedInterviewer.name} ({selectedInterviewer.role})
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{selectedTimeSlot}</span>
                    </div>
                    <div className="flex items-center">
                      <Building className="w-4 h-4 mr-2" />
                      <span>{selectedInterviewer.department}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'User Details':
        return renderUserDetails();

      case 'Documents':
        return renderDocuments();

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