import React from 'react';

const Placeholder = ({ title, message, gifUrl }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-8 flex flex-col items-center justify-center text-center">
        <img 
          src={gifUrl}
          alt="Coming Soon"
          className="w-64 h-64 object-contain mb-6"
        />
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          {title}
        </h2>
        <p className="text-gray-600 max-w-md">
          {message}
        </p>
      </div>
    </div>
  );
};

export default Placeholder; 