import React from 'react';
import { X, Building, Calendar, DollarSign, Briefcase, MapPin, Users, Award } from 'lucide-react';

const OfferDetailsModal = ({ offer, onClose }) => {
  // Mock additional offer details
  const offerDetails = {
    ...offer,
    benefits: [
      'Health & Term Life Insurance',
      'Employee Stock Options (ESOPs)',
      'Flexible Work Hours',
      'Remote Work Options',
      'Employee Provident Fund (EPF)',
      'Annual Learning Budget ₹1,00,000'
    ],
    location: 'Bangalore, India (Hybrid)',
    team: 'Frontend Engineering',
    reportingTo: 'Sarah Wilson - Engineering Director',
    startDate: '2024-04-15',
    compensationDetails: {
      base: '₹24,00,000 per annum',
      bonus: '15% annual performance bonus',
      equity: '10,000 ESOPs vested over 4 years',
      signingBonus: '₹3,00,000',
      variablePay: '₹6,00,000 per annum',
      totalCtc: '₹32,00,000 per annum'
    },
    additionalPerks: [
      'Phone & Internet Allowance (₹2,000/month)',
      'Health & Wellness Allowance (₹50,000/year)',
      'Food Coupons (₹2,200/month)',
      'Corporate Gym Membership',
      'Group Medical Insurance for Family'
    ]
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[70] overflow-hidden">
      <div className="h-full flex items-center justify-center p-4">
        <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b bg-white">
            <div>
              <h2 className="text-2xl font-semibold">{offerDetails.role}</h2>
              <div className="text-sm text-gray-500 mt-1 flex items-center">
                <Building className="w-4 h-4 mr-1" />
                {offerDetails.company}
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-8">
              {/* Key Details */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <DollarSign className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold">Compensation Details</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Base Salary (Fixed)</span>
                      <span className="font-medium">{offerDetails.compensationDetails.base}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Variable Pay</span>
                      <span className="font-medium">{offerDetails.compensationDetails.variablePay}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Performance Bonus</span>
                      <span className="font-medium">{offerDetails.compensationDetails.bonus}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Signing Bonus</span>
                      <span className="font-medium">{offerDetails.compensationDetails.signingBonus}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">ESOPs</span>
                      <span className="font-medium">{offerDetails.compensationDetails.equity}</span>
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex justify-between font-medium text-blue-700">
                        <span>Total CTC</span>
                        <span>{offerDetails.compensationDetails.totalCtc}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Briefcase className="w-5 h-5 text-purple-600" />
                    <h3 className="font-semibold">Role Details</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                      <span className="text-gray-600">{offerDetails.location}</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Users className="w-4 h-4 text-gray-500 mt-0.5" />
                      <span className="text-gray-600">{offerDetails.team}</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Calendar className="w-4 h-4 text-gray-500 mt-0.5" />
                      <span className="text-gray-600">Start Date: {offerDetails.startDate}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-green-600" />
                  Benefits & Perks
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium mb-3">Core Benefits</h4>
                    <div className="space-y-2">
                      {offerDetails.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center text-gray-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2" />
                          {benefit}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium mb-3">Additional Perks</h4>
                    <div className="space-y-2">
                      {offerDetails.additionalPerks.map((perk, index) => (
                        <div key={index} className="flex items-center text-gray-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2" />
                          {perk}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Deadline Notice */}
              <div className="bg-yellow-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Offer Deadline</h4>
                    <p className="text-gray-600 mt-1">Please respond by {offerDetails.deadline}</p>
                  </div>
                  <div className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                    {offerDetails.status}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferDetailsModal; 