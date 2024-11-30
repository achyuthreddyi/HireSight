import React, { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { interviewTranscript } from '../data/interviewTranscript';

const InterviewTabContent = ({ activeTab, currentTime, isPlaying }) => {
  const transcriptData = interviewTranscript;

  const scrollToActiveTranscript = (currentTime) => {
    const activeTranscript = transcriptData.find(
      entry => currentTime >= entry.startTime && currentTime < entry.endTime
    );
    
    if (activeTranscript) {
      const element = document.querySelector(`[data-time="${activeTranscript.startTime}"]`);
      if (element) {
        const container = element.closest('.transcript-container');
        if (container) {
          const targetTop = element.offsetTop - container.offsetHeight / 2;
          const startTop = container.scrollTop;
          const distance = targetTop - startTop;
          const duration = 1000;
          let start = null;

          const animation = (currentTime) => {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const progress = Math.min(timeElapsed / duration, 1);

            const easeInOutCubic = t => t < 0.5 
              ? 4 * t * t * t 
              : 1 - Math.pow(-2 * t + 2, 3) / 2;

            container.scrollTop = startTop + (distance * easeInOutCubic(progress));

            if (progress < 1) {
              requestAnimationFrame(animation);
            }
          };

          requestAnimationFrame(animation);
        }
      }
    }
  };

  const renderTranscript = (currentTime) => (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="transcript-container space-y-3 text-sm text-gray-600 max-h-[400px] overflow-y-auto scroll-smooth">
        {transcriptData.map((entry, index) => (
          <div 
            key={index}
            data-time={entry.startTime}
            className={`border-l-2 pl-4 py-1 transition-all duration-500 ease-in-out ${
              currentTime >= entry.startTime && currentTime < entry.endTime
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300'
            }`}
          >
            <span className="text-gray-400">[{entry.time}]</span>
            <span className="font-medium ml-2">{entry.speaker}:</span>
            <p className="mt-1">{entry.text}</p>
          </div>
        ))}
      </div>
    </div>
  );

  useEffect(() => {
    if (activeTab === 'Audio Transcript' && isPlaying) {
      const scrollTimeout = setTimeout(() => {
        scrollToActiveTranscript(currentTime);
      }, 300);

      return () => clearTimeout(scrollTimeout);
    }
  }, [currentTime, activeTab, isPlaying]);

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
        return renderTranscript(currentTime);

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