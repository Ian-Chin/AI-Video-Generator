
import React from 'react';

interface LoadingIndicatorProps {
  message: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ message }) => {
  return (
    <div className="text-center p-8">
      <div className="relative inline-flex">
        <div className="w-16 h-16 bg-purple-500 rounded-full"></div>
        <div className="w-16 h-16 bg-purple-500 rounded-full absolute top-0 left-0 animate-ping"></div>
        <div className="w-16 h-16 bg-purple-500 rounded-full absolute top-0 left-0 animate-pulse"></div>
      </div>
      <p className="mt-6 text-lg text-gray-300 animate-pulse">{message}</p>
      <p className="mt-2 text-sm text-gray-500">Video generation can take a few minutes. Please be patient.</p>
    </div>
  );
};

export default LoadingIndicator;
