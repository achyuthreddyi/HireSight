import React, { useState } from 'react';
import { Check } from 'lucide-react';

const CreatePosition = () => {
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    openings: '',
    experience: '',
    location: '',
    employmentType: 'full-time',
    workMode: 'hybrid',
    minSalary: '',
    maxSalary: '',
    requiredSkills: '',
    description: '',
    responsibilities: '',
    qualifications: ''
  });

  const [notification, setNotification] = useState(false);

  // Add new state for platform notifications
  const [platformNotification, setPlatformNotification] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to save the job
    setNotification(true);
    
    // Reset form to initial state
    setFormData({
      title: '',
      department: '',
      openings: '',
      experience: '',
      location: '',
      employmentType: 'full-time',
      workMode: 'hybrid',
      minSalary: '',
      maxSalary: '',
      requiredSkills: '',
      description: '',
      responsibilities: '',
      qualifications: ''
    });

    setTimeout(() => setNotification(false), 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Add a function to check if all required fields are filled
  const isFormValid = () => {
    return (
      formData.title.trim() !== '' &&
      formData.department !== '' &&
      formData.openings !== '' &&
      formData.experience.trim() !== '' &&
      formData.location.trim() !== '' &&
      formData.requiredSkills.trim() !== '' &&
      formData.description.trim() !== '' &&
      formData.responsibilities.trim() !== '' &&
      formData.qualifications.trim() !== ''
    );
  };

  // Update the handlePublish function
  const handlePublish = (platform) => {
    if (!isFormValid()) {
      setPlatformNotification('Please fill all required fields before publishing');
      setTimeout(() => setPlatformNotification(null), 3000);
      return;
    }
    setPlatformNotification(`Job successfully published to ${platform}!`);
    setTimeout(() => setPlatformNotification(null), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Create New Position</h2>
          
          {/* Publishing Buttons */}
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={() => handlePublish('LinkedIn')}
              disabled={!isFormValid()}
              className={`flex items-center space-x-2 px-4 py-2 border rounded-lg transition-colors ${
                isFormValid()
                  ? 'hover:bg-gray-50'
                  : 'opacity-50 cursor-not-allowed bg-gray-50'
              }`}
            >
              <img 
                src="https://cdn-icons-png.flaticon.com/512/174/174857.png" 
                alt="LinkedIn" 
                className="w-5 h-5"
              />
              <span className="text-sm font-medium">LinkedIn</span>
            </button>

            <button
              type="button"
              onClick={() => handlePublish('Instahyre')}
              disabled={!isFormValid()}
              className={`flex items-center space-x-2 px-4 py-2 border rounded-lg transition-colors ${
                isFormValid()
                  ? 'hover:bg-gray-50'
                  : 'opacity-50 cursor-not-allowed bg-gray-50'
              }`}
            >
              <img 
                src="https://instahyre.com/favicon.ico" 
                alt="Instahyre" 
                className="w-5 h-5"
              />
              <span className="text-sm font-medium">Instahyre</span>
            </button>

            <button
              type="button"
              onClick={() => handlePublish('Naukri')}
              disabled={!isFormValid()}
              className={`flex items-center space-x-2 px-4 py-2 border rounded-lg transition-colors ${
                isFormValid()
                  ? 'hover:bg-gray-50'
                  : 'opacity-50 cursor-not-allowed bg-gray-50'
              }`}
            >
              <img 
                src="https://static.naukimg.com/s/4/100/i/naukri_Logo.png" 
                alt="Naukri" 
                className="w-5 h-5"
              />
              <span className="text-sm font-medium">Naukri</span>
            </button>

            <button
              type="button"
              onClick={() => handlePublish('Indeed')}
              disabled={!isFormValid()}
              className={`flex items-center space-x-2 px-4 py-2 border rounded-lg transition-colors ${
                isFormValid()
                  ? 'hover:bg-gray-50'
                  : 'opacity-50 cursor-not-allowed bg-gray-50'
              }`}
            >
              <img 
                src="https://www.indeed.com/favicon.ico" 
                alt="Indeed" 
                className="w-5 h-5"
              />
              <span className="text-sm font-medium">Indeed</span>
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-md font-medium text-gray-900">Basic Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Title*
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Senior Frontend Developer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department*
                </label>
                <select
                  name="department"
                  required
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Department</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Product">Product</option>
                  <option value="Design">Design</option>
                  <option value="Analytics">Analytics</option>
                  <option value="Infrastructure">Infrastructure</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Openings*
                </label>
                <input
                  type="number"
                  name="openings"
                  required
                  min="1"
                  value={formData.openings}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Experience Required*
                </label>
                <input
                  type="text"
                  name="experience"
                  required
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 3-5 years"
                />
              </div>
            </div>
          </div>

          {/* Job Details */}
          <div className="space-y-4">
            <h3 className="text-md font-medium text-gray-900">Job Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location*
                </label>
                <input
                  type="text"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Bangalore, India"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Employment Type
                </label>
                <select
                  name="employmentType"
                  value={formData.employmentType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="full-time">Full Time</option>
                  <option value="part-time">Part Time</option>
                  <option value="contract">Contract</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Work Mode
                </label>
                <select
                  name="workMode"
                  value={formData.workMode}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="remote">Remote</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="onsite">Onsite</option>
                </select>
              </div>
            </div>
          </div>

          {/* Compensation */}
          <div className="space-y-4">
            <h3 className="text-md font-medium text-gray-900">Compensation</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Salary (per annum)
                </label>
                <input
                  type="text"
                  name="minSalary"
                  value={formData.minSalary}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., ₹15,00,000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Maximum Salary (per annum)
                </label>
                <input
                  type="text"
                  name="maxSalary"
                  value={formData.maxSalary}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., ₹25,00,000"
                />
              </div>
            </div>
          </div>

          {/* Skills and Requirements */}
          <div className="space-y-4">
            <h3 className="text-md font-medium text-gray-900">Skills and Requirements</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Required Skills*
              </label>
              <input
                type="text"
                name="requiredSkills"
                required
                value={formData.requiredSkills}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., React, Node.js, TypeScript"
              />
              <p className="mt-1 text-sm text-gray-500">Separate skills with commas</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Description*
              </label>
              <textarea
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter detailed job description..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Responsibilities*
              </label>
              <textarea
                name="responsibilities"
                required
                value={formData.responsibilities}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter key responsibilities..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Qualifications*
              </label>
              <textarea
                name="qualifications"
                required
                value={formData.qualifications}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter required qualifications..."
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Create Position
            </button>
          </div>
        </form>
      </div>

      {/* Success Notification */}
      {notification && (
        <div className="fixed bottom-4 right-4 bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2">
          <Check className="w-5 h-5" />
          <span>Job position created successfully!</span>
        </div>
      )}

      {/* Platform Publishing Notification */}
      {platformNotification && (
        <div className="fixed bottom-4 right-4 bg-blue-100 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2">
          <Check className="w-5 h-5" />
          <span>{platformNotification}</span>
        </div>
      )}
    </div>
  );
};

export default CreatePosition; 