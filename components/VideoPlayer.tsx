
import React from 'react';

interface VideoPlayerProps {
  videoUrl: string;
  prompt: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, prompt }) => {
  const downloadFileName = prompt.replace(/[^a-z0-9]/gi, '_').slice(0, 30) + '.mp4';
  
  return (
    <div className="w-full p-4 flex flex-col items-center gap-4">
      <video
        src={videoUrl}
        controls
        autoPlay
        loop
        className="w-full max-w-full rounded-lg shadow-lg border border-gray-700"
      >
        Your browser does not support the video tag.
      </video>
      <a
        href={videoUrl}
        download={downloadFileName}
        className="font-bold py-2 px-6 rounded-lg bg-green-600 hover:bg-green-700 transition-colors duration-300 inline-flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
        Download Video
      </a>
    </div>
  );
};

export default VideoPlayer;
