import React from 'react';
import { CheckCircle } from 'lucide-react';

const InterviewTabContent = ({ activeTab }) => {
  const transcriptData = [
    { time: '00:00', speaker: 'Interviewer', text: "Hello! Thanks for joining us today. Could you start by introducing yourself and your background?" },
    { time: '00:45', speaker: 'Candidate', text: "Hi, thank you for having me. I'm a full-stack developer with 5 years of experience, primarily working with React and Node.js..." },
    { time: '02:15', speaker: 'Interviewer', text: "Great! Let's dive into system design. Could you explain how you'd design a real-time chat application?" },
    { time: '03:00', speaker: 'Candidate', text: "I would approach this by first breaking down the requirements. For a real-time chat system, we'd need..." },
    { time: '05:30', speaker: 'Interviewer', text: "Excellent breakdown. How would you handle scaling issues?" },
    { time: '06:15', speaker: 'Candidate', text: "For scaling, I would implement a microservices architecture..." },
    { time: '08:45', speaker: 'Interviewer', text: "Let's move to a coding problem. How would you implement a cache with LRU policy?" },
    { time: '09:30', speaker: 'Candidate', text: "For an LRU cache, I would use a combination of a hash map and doubly linked list..." },
    { time: '12:00', speaker: 'Interviewer', text: "Could you discuss a challenging project you've worked on?" },
    { time: '12:45', speaker: 'Candidate', text: "One particularly challenging project was implementing a real-time analytics dashboard..." },
    { time: '15:00', speaker: 'Interviewer', text: "How do you handle disagreements in your team?" }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview':
        return (
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium mb-3">Interview Overview</h4>
            <p className="text-gray-600 text-sm mb-4">
              Technical interview focused on system design, algorithms, and practical coding experience.
              The candidate demonstrated strong problem-solving skills and deep technical knowledge.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h5 className="font-medium mb-2 text-sm">Interview Focus Areas</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• System Design & Architecture</li>
                  <li>• Data Structures & Algorithms</li>
                  <li>• React & Frontend Development</li>
                  <li>• Problem-Solving Approach</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium mb-2 text-sm">Key Highlights</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Strong system design principles</li>
                  <li>• Excellent problem breakdown</li>
                  <li>• Clear communication</li>
                  <li>• Good coding practices</li>
                </ul>
              </div>
            </div>

            <div className="text-sm text-gray-600">
              <h5 className="font-medium mb-2">Interview Structure</h5>
              <p>45-minute technical discussion covering system design (15min), coding (20min), 
                 and behavioral questions (10min). The candidate was evaluated on technical depth,
                 problem-solving approach, and communication skills.</p>
            </div>
          </div>
        );

      case 'Audio Transcript':
        return (
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="space-y-3 text-sm text-gray-600">
              {transcriptData.map((entry, index) => (
                <div key={index} className="border-l-2 border-gray-300 pl-4 py-1">
                  <span className="text-gray-400">[{entry.time}]</span>
                  <span className="font-medium ml-2">{entry.speaker}:</span>
                  <p className="mt-1">{entry.text}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'Summary':
        return (
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium mb-3">Interview Summary</h4>
            <div className="space-y-4 text-sm text-gray-600">
              <div>
                <h5 className="font-medium mb-2">Technical Proficiency</h5>
                <p>Demonstrated excellent understanding of system design principles and scalability 
                   considerations. Strong grasp of React ecosystem and modern JavaScript practices. 
                   Showed methodical approach to problem-solving with clean code implementation.</p>
              </div>
              
              <div>
                <h5 className="font-medium mb-2">Communication & Approach</h5>
                <p>Articulated thoughts clearly and maintained professional communication throughout. 
                   Asked clarifying questions when needed and explained technical concepts effectively. 
                   Showed good collaboration potential and team-oriented mindset.</p>
              </div>

              <div>
                <h5 className="font-medium mb-2">Areas of Excellence</h5>
                <p>Particularly strong in system design discussions and architectural decisions. 
                   Showed deep understanding of frontend optimization techniques and state management.</p>
              </div>

              <div>
                <h5 className="font-medium mb-2">Recommendations</h5>
                <p>Strongly recommended for the senior frontend role. Would be an excellent addition 
                   to the team, bringing both technical expertise and good communication skills.</p>
              </div>
            </div>
          </div>
        );

      case 'Relevant Skills':
        return (
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2 text-sm">Technical Skills</h4>
                <div className="space-y-2">
                  {['React', 'Node.js', 'System Design', 'TypeScript', 'AWS', 'GraphQL'].map((skill, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2 text-sm">Soft Skills</h4>
                <div className="space-y-2">
                  {[
                    'Communication',
                    'Problem Solving',
                    'Team Collaboration',
                    'Technical Leadership',
                    'Project Planning'
                  ].map((skill, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-[200px] overflow-y-auto">
      <div className="py-4">
        {renderContent()}
      </div>
    </div>
  );
};

export default InterviewTabContent; 