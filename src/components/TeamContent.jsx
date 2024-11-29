import React, { useState } from 'react';
import { User, Search, Filter, CheckCircle } from 'lucide-react';
import { MOCK_DATA } from '../data/mockData';

const TeamContent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [interviewerFilter, setInterviewerFilter] = useState('all');

  const departments = [...new Set(MOCK_DATA.team.map(member => member.department))];

  const filteredTeam = MOCK_DATA.team
    .filter(member => 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(member => departmentFilter === 'all' ? true : member.department === departmentFilter)
    .filter(member => interviewerFilter === 'all' ? true : 
      interviewerFilter === 'interviewer' ? member.isInterviewer : !member.isInterviewer
    );

  const handleImageError = (e) => {
    e.target.onerror = null; // Prevent infinite callbacks
    e.target.style.display = 'none';
    e.target.parentElement.querySelector('.fallback-icon').style.display = 'flex';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Team Members</h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search team members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex space-x-4 mb-6">
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>

          <select
            value={interviewerFilter}
            onChange={(e) => setInterviewerFilter(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Members</option>
            <option value="interviewer">Interviewers Only</option>
            <option value="non-interviewer">Non-Interviewers</option>
          </select>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeam.map(member => (
            <div key={member.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-4">
                {member.image ? (
                  <div className="relative w-12 h-12">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      onError={handleImageError}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div 
                      className="fallback-icon hidden w-12 h-12 rounded-full bg-blue-100 absolute top-0 left-0 items-center justify-center"
                    >
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                )}
                <div>
                  <h3 className="font-medium text-gray-900">{member.name}</h3>
                  <p className="text-sm text-gray-500">{member.role}</p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Department</span>
                  <span className="font-medium">{member.department}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Seniority</span>
                  <span className="font-medium">{member.seniority}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Interviewer</span>
                  {member.isInterviewer ? (
                    <span className="text-green-600 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Yes
                    </span>
                  ) : (
                    <span className="text-gray-600">No</span>
                  )}
                </div>
                {member.isInterviewer && member.interviewPanels && (
                  <div className="pt-2">
                    <div className="text-sm text-gray-500 mb-1">Interview Panels</div>
                    <div className="flex flex-wrap gap-2">
                      {member.interviewPanels.map((panel, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs"
                        >
                          {panel}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamContent; 