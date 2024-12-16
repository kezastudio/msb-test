import React from 'react';

const Loader = () => {
  return (
    // <div className="flex flex-col items-center justify-center h-screen space-y-2">
    <div className="flex flex-col  h-screen space-y-2">
      <div className="text-xl font-semibold text-gray-700">Searching...</div>
      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-yellow-500 rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-yellow-500 rounded-full animate-bounce delay-200"></div>
        <div className="w-4 h-4 bg-yellow-500 rounded-full animate-bounce delay-400"></div>
      </div>
    </div>
  );
};

export default Loader;
