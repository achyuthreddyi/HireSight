import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle, AlertCircle, User, Building } from 'lucide-react';
import CandidateInterviewModal from './CandidateInterviewModal';
import OfferDetailsModal from './OfferDetailsModal';

const CandidatesDashboard = () => {
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [selectedOffer, setSelectedOffer] = useState(null);

  // Mock data for interviews
  const interviews = {
    scheduled: [
      {
        id: 1,
        role: 'Senior Frontend Developer',
        company: 'TechCorp',
        date: '2024-03-20',
        time: '10:00 AM',
        interviewer: 'John Doe',
        round: 'Technical Round'
      },
      {
        id: 2,
        role: 'Full Stack Engineer',
        company: 'InnovateTech',
        date: '2024-03-22',
        time: '2:30 PM',
        interviewer: 'Jane Smith',
        round: 'System Design'
      }
    ],
    completed: [
      {
        id: 3,
        role: 'Frontend Developer',
        company: 'WebTech Solutions',
        date: '2024-03-15',
        duration: '45 minutes',
        interviewer: 'Mike Johnson',
        round: 'Technical Round',
        overallScore: 88,
        technicalScore: 85,
        problemSolvingScore: 90,
        communicationScore: 92,
        strengths: [
          'Strong understanding of React and state management',
          'Excellent problem-solving approach',
          'Clear communication skills',
          'Good system design knowledge'
        ],
        weaknesses: [
          'Could improve on optimization techniques',
          'More focus needed on testing strategies',
          'Room for improvement in SQL queries'
        ],
        feedback: [
          {
            category: 'Technical Skills',
            comment: 'Demonstrated strong knowledge of frontend technologies and frameworks.'
          },
          {
            category: 'Problem Solving',
            comment: 'Methodical approach to breaking down complex problems.'
          },
          {
            category: 'Communication',
            comment: 'Articulated thoughts clearly and asked relevant questions.'
          }
        ],
        notes: [
          'Implemented efficient solution for the coding challenge',
          'Good understanding of React hooks and lifecycle methods',
          'Showed enthusiasm for learning new technologies',
          'Asked thoughtful questions about the team and culture'
        ],
        nextSteps: 'Moving forward to the final round with the engineering manager.'
      },
      // Add more completed interviews...
    ],
    offers: [
      {
        id: 4,
        role: 'Senior Software Engineer',
        company: 'TechGrowth',
        salary: '$120,000',
        status: 'Pending',
        deadline: '2024-03-25'
      }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Scheduled Interviews</h3>
            <Calendar className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-3xl font-bold mt-2">{interviews.scheduled.length}</p>
          <p className="text-sm text-gray-500 mt-1">Upcoming interviews</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Completed Interviews</h3>
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-3xl font-bold mt-2">{interviews.completed.length}</p>
          <p className="text-sm text-gray-500 mt-1">Past interviews</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Offers in Hand</h3>
            <AlertCircle className="w-5 h-5 text-purple-500" />
          </div>
          <p className="text-3xl font-bold mt-2">{interviews.offers.length}</p>
          <p className="text-sm text-gray-500 mt-1">Active offers</p>
        </div>
      </div>

      {/* Interview Cards */}
      <div className="space-y-6">
        {/* Scheduled Interviews */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4">Upcoming Interviews</h3>
          <div className="space-y-4">
            {interviews.scheduled.map(interview => (
              <div key={interview.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{interview.role}</h4>
                    <p className="text-sm text-gray-500">{interview.company}</p>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{interview.date}</span>
                    <Clock className="w-4 h-4 ml-2" />
                    <span>{interview.time}</span>
                  </div>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <User className="w-4 h-4 mr-1" />
                  <span>{interview.interviewer}</span>
                  <span className="mx-2">•</span>
                  <span>{interview.round}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Completed Interviews */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4">Past Interviews</h3>
          <div className="space-y-4">
            {interviews.completed.map(interview => (
              <div 
                key={interview.id} 
                className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelectedInterview(interview)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{interview.role}</h4>
                    <p className="text-sm text-gray-500">{interview.company}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      interview.overallScore >= 85 ? 'bg-green-100 text-green-800' :
                      interview.overallScore >= 70 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      Score: {interview.overallScore}%
                    </div>
                  </div>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{interview.date}</span>
                  <span className="mx-2">•</span>
                  <span>{interview.round}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Offers */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4">Active Offers</h3>
          <div className="space-y-4">
            {interviews.offers.map(offer => (
              <div 
                key={offer.id} 
                className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelectedOffer(offer)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{offer.role}</h4>
                    <p className="text-sm text-gray-500">{offer.company}</p>
                  </div>
                  <div className="px-2 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-medium">
                    {offer.status}
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <div className="text-gray-500">
                    <Building className="w-4 h-4 inline mr-1" />
                    Salary: {offer.salary}
                  </div>
                  <div className="text-gray-500">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Deadline: {offer.deadline}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interview Details Modal */}
      {selectedInterview && (
        <CandidateInterviewModal
          interview={selectedInterview}
          onClose={() => setSelectedInterview(null)}
        />
      )}

      {/* Offer Details Modal */}
      {selectedOffer && (
        <OfferDetailsModal
          offer={selectedOffer}
          onClose={() => setSelectedOffer(null)}
        />
      )}
    </div>
  );
};

export default CandidatesDashboard; 