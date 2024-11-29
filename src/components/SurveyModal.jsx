import React, { useState } from 'react';
import { X, HelpCircle } from 'lucide-react';

const SURVEY_SECTIONS = {
  performanceManagement: {
    title: 'Performance Management',
    description: 'Evaluate employee performance, goal achievement, and development needs',
    fields: [
      {
        id: 'goalAchievement',
        label: 'Goal Achievement',
        type: 'number',
        min: 1,
        max: 10,
        tooltip: 'Rate how well the employee achieved their set goals (1-10)'
      },
      {
        id: 'skillsDevelopment',
        label: 'Skills Development',
        type: 'select',
        options: ['Excellent', 'Good', 'Average', 'Needs Improvement'],
        tooltip: 'Assess the employee\'s progress in developing new skills'
      },
      {
        id: 'performanceFeedback',
        label: 'Performance Feedback',
        type: 'textarea',
        tooltip: 'Provide detailed feedback about employee\'s performance'
      }
    ]
  },
  exitInterviews: {
    title: 'Exit Interviews',
    description: 'Gather insights from departing employees',
    fields: [
      {
        id: 'reasonForLeaving',
        label: 'Reason for Leaving',
        type: 'select',
        options: ['Better Opportunity', 'Work Environment', 'Compensation', 'Personal Reasons', 'Career Change'],
        tooltip: 'Primary reason for the employee\'s departure'
      },
      {
        id: 'companyExperience',
        label: 'Overall Experience',
        type: 'number',
        min: 1,
        max: 5,
        tooltip: 'Rate overall experience with the company (1-5)'
      },
      {
        id: 'improvementSuggestions',
        label: 'Suggestions for Improvement',
        type: 'textarea',
        tooltip: 'Feedback for company improvement'
      }
    ]
  },
  candidateExperience: {
    title: 'Candidate Experience',
    description: 'Evaluate the recruitment and interview process',
    fields: [
      {
        id: 'interviewProcess',
        label: 'Interview Process Rating',
        type: 'number',
        min: 1,
        max: 5,
        tooltip: 'Rate the overall interview process experience (1-5)'
      },
      {
        id: 'communicationClarity',
        label: 'Communication Clarity',
        type: 'select',
        options: ['Excellent', 'Good', 'Fair', 'Poor'],
        tooltip: 'Assess the clarity of communication during the recruitment process'
      },
      {
        id: 'feedbackTimeliness',
        label: 'Feedback Timeliness',
        type: 'select',
        options: ['Very Timely', 'Somewhat Timely', 'Delayed', 'Very Delayed'],
        tooltip: 'Evaluate the timeliness of feedback after interviews'
      }
    ]
  },
  employeeEngagement: {
    title: 'Employee Engagement',
    description: 'Measure employee satisfaction and engagement',
    fields: [
      {
        id: 'jobSatisfaction',
        label: 'Job Satisfaction',
        type: 'number',
        min: 1,
        max: 10,
        tooltip: 'Rate overall job satisfaction (1-10)'
      },
      {
        id: 'workLifeBalance',
        label: 'Work-Life Balance',
        type: 'select',
        options: ['Excellent', 'Good', 'Fair', 'Poor'],
        tooltip: 'Assess the balance between work and personal life'
      },
      {
        id: 'engagementFeedback',
        label: 'Engagement Feedback',
        type: 'textarea',
        tooltip: 'Share thoughts on how to improve employee engagement'
      }
    ]
  },
  trainingAndOnboarding: {
    title: 'Training & Onboarding',
    description: 'Evaluate the training and onboarding experience',
    fields: [
      {
        id: 'onboardingEffectiveness',
        label: 'Onboarding Effectiveness',
        type: 'select',
        options: ['Very Effective', 'Somewhat Effective', 'Needs Improvement', 'Ineffective'],
        tooltip: 'Rate the effectiveness of the onboarding process'
      },
      {
        id: 'trainingQuality',
        label: 'Training Quality',
        type: 'number',
        min: 1,
        max: 5,
        tooltip: 'Rate the quality of training provided (1-5)'
      },
      {
        id: 'improvementAreas',
        label: 'Areas for Improvement',
        type: 'textarea',
        tooltip: 'Suggest areas where training can be improved'
      }
    ]
  }
};

const SurveyModal = ({ onClose }) => {
  const [activeSection, setActiveSection] = useState('performanceManagement');
  const [formData, setFormData] = useState({});

  const handleInputChange = (sectionId, fieldId, value) => {
    setFormData(prev => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        [fieldId]: value
      }
    }));
  };

  const renderField = (section, field) => {
    switch (field.type) {
      case 'number':
        return (
          <input
            type="number"
            min={field.min}
            max={field.max}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData[section]?.[field.id] || ''}
            onChange={(e) => handleInputChange(section, field.id, e.target.value)}
          />
        );
      case 'select':
        return (
          <select
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            value={formData[section]?.[field.id] || ''}
            onChange={(e) => handleInputChange(section, field.id, e.target.value)}
          >
            <option value="">Select an option</option>
            {field.options.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );
      case 'textarea':
        return (
          <textarea
            rows={4}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            value={formData[section]?.[field.id] || ''}
            onChange={(e) => handleInputChange(section, field.id, e.target.value)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b bg-gray-50">
          <h2 className="text-2xl font-semibold">Employee Survey</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex">
          {/* Sidebar */}
          <div className="w-64 border-r bg-gray-50 overflow-y-auto">
            {Object.entries(SURVEY_SECTIONS).map(([id, section]) => (
              <button
                key={id}
                onClick={() => setActiveSection(id)}
                className={`w-full text-left px-4 py-3 border-l-4 transition-colors ${
                  activeSection === id
                    ? 'bg-blue-50 border-l-blue-500 text-blue-600'
                    : 'border-l-transparent hover:bg-gray-100'
                }`}
              >
                <div className="font-medium">{section.title}</div>
                <div className="text-sm text-gray-500 truncate">
                  {section.description}
                </div>
              </button>
            ))}
          </div>

          {/* Form */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">
                  {SURVEY_SECTIONS[activeSection].title}
                </h3>
                <p className="text-gray-600">
                  {SURVEY_SECTIONS[activeSection].description}
                </p>
              </div>

              {SURVEY_SECTIONS[activeSection].fields.map(field => (
                <div key={field.id} className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <label className="block text-sm font-medium text-gray-700">
                      {field.label}
                    </label>
                    <div className="group relative">
                      <HelpCircle className="w-4 h-4 text-gray-400" />
                      <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 hidden group-hover:block w-48 p-2 bg-gray-900 text-white text-xs rounded shadow-lg">
                        {field.tooltip}
                      </div>
                    </div>
                  </div>
                  {renderField(activeSection, field)}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-6 bg-gray-50">
          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                console.log('Survey Data:', formData);
                onClose();
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Submit Survey
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyModal; 