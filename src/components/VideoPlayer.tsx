import React from 'react';
import { Video } from '../types';

interface VideoPlayerProps {
  video: Video;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h3 className="text-xl font-semibold mb-2">{video.title}</h3>
      <p className="text-gray-600 mb-4">{video.description}</p>
      
      {/* In a real application, this would be an actual video player */}
      <div className="bg-gray-200 rounded-lg aspect-video flex items-center justify-center mb-4">
        <p className="text-gray-600">
          Video Player: {video.title} ({video.duration})
        </p>
      </div>
      
      <div className="flex justify-between text-sm text-gray-500">
        <span>Duration: {video.duration}</span>
      </div>
    </div>
  );
};

export default VideoPlayer;