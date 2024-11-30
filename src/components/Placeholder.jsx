import React from 'react';

const Placeholder = ({ title, message, gifUrl }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 flex flex-col items-center justify-center text-center">
        {/* Illustration/GIF */}
        <div className="w-64 h-64 mb-6">
          {gifUrl ? (
            <img 
              src={gifUrl} 
              alt="Coming Soon"
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-gray-400">🚧</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          {title || "Coming Soon!"}
        </h3>

        {/* Message */}
        <p className="text-gray-600 max-w-md">
          {message || "We're working hard to bring you something amazing. Stay tuned!"}
        </p>

        {/* Optional: Progress Indicator */}
        <div className="mt-8 w-full max-w-xs">
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 rounded-full w-3/4 animate-pulse"
            />
          </div>
          <div className="mt-2 text-sm text-blue-600 animate-pulse">
            Loading...
          </div>
        </div>
      </div>
    </div>
  );
};

export default Placeholder; 