import React from 'react';
import { X, Star, TrendingUp, Brain, Users, Code, Database, LineChart, Zap, CheckCircle, AlertCircle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const PerformanceScorecard = ({ performance, onClose }) => {
  const COLORS = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B'];

  const detailedScores = {
    technicalSkills: {
      coding: {
        score: performance.codingScore,
        metrics: {
          'Problem Solving': 92,
          'Code Quality': 88,
          'Optimization': 85,
          'Best Practices': 90,
          'Error Handling': 87
        }
      },
      systemDesign: {
        score: performance.systemDesign,
        metrics: {
          'Architecture': 88,
          'Scalability': 85,
          'Data Modeling': 82,
          'System Integration': 86,
          'Performance': 84
        }
      }
    },
    softSkills: {
      communication: {
        score: performance.communicationScore,
        metrics: {
          'Clarity': 92,
          'Technical Communication': 88,
          'Active Listening': 90,
          'Question Handling': 89,
          'Explanation Skills': 91
        }
      },
      behavioral: {
        score: performance.problemSolving,
        metrics: {
          'Team Collaboration': 88,
          'Leadership Potential': 85,
          'Adaptability': 87,
          'Cultural Fit': 90,
          'Learning Attitude': 92
        }
      }
    }
  };

  const barData = Object.entries(detailedScores.technicalSkills.coding.metrics).map(([name, value]) => ({
    name,
    value
  }));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[80] overflow-hidden flex items-center justify-center">
      <div className="bg-white rounded-xl w-[80vw] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white">
          <div>
            <h2 className="text-2xl font-semibold">Detailed Performance Analysis</h2>
            <p className="text-sm text-gray-500 mt-1">Comprehensive evaluation of all performance metrics</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Overall Score */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
            <div className="grid grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold">{performance.overallScore}%</div>
                <div className="text-sm mt-1 opacity-90">Overall Score</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">{performance.technicalScore}%</div>
                <div className="text-sm mt-1 opacity-90">Technical</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">{performance.communicationScore}%</div>
                <div className="text-sm mt-1 opacity-90">Communication</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">{performance.problemSolving}%</div>
                <div className="text-sm mt-1 opacity-90">Problem Solving</div>
              </div>
            </div>
          </div>

          {/* Technical Skills Breakdown */}
          <div className="grid grid-cols-2 gap-6">
            {/* Coding Skills */}
            <div className="bg-white rounded-xl border p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Code className="w-5 h-5 mr-2 text-blue-500" />
                Coding Skills Analysis
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* System Design Skills */}
            <div className="bg-white rounded-xl border p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Database className="w-5 h-5 mr-2 text-purple-500" />
                System Design Proficiency
              </h3>
              <div className="space-y-4">
                {Object.entries(detailedScores.technicalSkills.systemDesign.metrics).map(([skill, score]) => (
                  <div key={skill}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{skill}</span>
                      <span className="font-medium">{score}%</span>
                    </div>
                    <div className="h-2 bg-purple-100 rounded-full">
                      <div 
                        className="h-full bg-purple-500 rounded-full"
                        style={{ width: `${score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Soft Skills Analysis */}
          <div className="bg-white rounded-xl border p-6">
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              <Users className="w-5 h-5 mr-2 text-green-500" />
              Behavioral & Communication Analysis
            </h3>
            <div className="grid grid-cols-2 gap-8">
              {/* Communication Skills */}
              <div>
                <h4 className="font-medium mb-4 text-gray-700">Communication Metrics</h4>
                <div className="space-y-4">
                  {Object.entries(detailedScores.softSkills.communication.metrics).map(([skill, score]) => (
                    <div key={skill}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{skill}</span>
                        <span className="font-medium">{score}%</span>
                      </div>
                      <div className="h-2 bg-green-100 rounded-full">
                        <div 
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: `${score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Behavioral Skills */}
              <div>
                <h4 className="font-medium mb-4 text-gray-700">Behavioral Competencies</h4>
                <div className="space-y-4">
                  {Object.entries(detailedScores.softSkills.behavioral.metrics).map(([skill, score]) => (
                    <div key={skill}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{skill}</span>
                        <span className="font-medium">{score}%</span>
                      </div>
                      <div className="h-2 bg-blue-100 rounded-full">
                        <div 
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Strengths and Areas for Improvement */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-green-50 rounded-xl border border-green-100 p-6">
              <h3 className="text-lg font-semibold mb-4 text-green-800 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                Key Strengths
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Star className="w-4 h-4 text-green-500 mt-1 mr-2" />
                  <span className="text-green-800">Exceptional problem-solving capabilities with structured approach</span>
                </li>
                <li className="flex items-start">
                  <Star className="w-4 h-4 text-green-500 mt-1 mr-2" />
                  <span className="text-green-800">Strong technical communication and explanation skills</span>
                </li>
                <li className="flex items-start">
                  <Star className="w-4 h-4 text-green-500 mt-1 mr-2" />
                  <span className="text-green-800">Demonstrates good understanding of system design principles</span>
                </li>
              </ul>
            </div>

            <div className="bg-amber-50 rounded-xl border border-amber-100 p-6">
              <h3 className="text-lg font-semibold mb-4 text-amber-800 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2" />
                Areas for Development
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <TrendingUp className="w-4 h-4 text-amber-500 mt-1 mr-2" />
                  <span className="text-amber-800">Could improve on database optimization techniques</span>
                </li>
                <li className="flex items-start">
                  <TrendingUp className="w-4 h-4 text-amber-500 mt-1 mr-2" />
                  <span className="text-amber-800">More focus needed on scalability considerations</span>
                </li>
                <li className="flex items-start">
                  <TrendingUp className="w-4 h-4 text-amber-500 mt-1 mr-2" />
                  <span className="text-amber-800">Can enhance knowledge of advanced system design patterns</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceScorecard; 