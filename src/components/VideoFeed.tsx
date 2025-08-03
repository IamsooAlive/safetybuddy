import React from 'react';
import { Camera, Wifi, WifiOff } from 'lucide-react';

interface VideoFeedProps {
  isActive: boolean;
}

export const VideoFeed: React.FC<VideoFeedProps> = ({ isActive }) => {
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
      <div className="bg-gray-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Camera className="w-5 h-5 text-blue-400" />
          <span className="text-white font-medium">Live Camera Feed - Zone A</span>
        </div>
        <div className="flex items-center space-x-2">
          {isActive ? (
            <>
              <Wifi className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-sm">LIVE</span>
            </>
          ) : (
            <>
              <WifiOff className="w-4 h-4 text-red-400" />
              <span className="text-red-400 text-sm">OFFLINE</span>
            </>
          )}
        </div>
      </div>
      
      <div className="aspect-video bg-gray-800 flex items-center justify-center relative">
        {isActive ? (
          <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center relative overflow-hidden">
            {/* Simulated video feed with moving elements */}
            <div className="absolute inset-0 opacity-20">
              <div className="w-full h-full bg-gradient-to-r from-blue-500/10 to-green-500/10 animate-pulse"></div>
            </div>
            
            {/* Overlay elements to simulate detection boxes */}
            <div className="absolute top-4 left-4 border-2 border-green-400 rounded px-2 py-1 bg-black/50">
              <span className="text-green-400 text-xs font-mono">WORKER_1: PPE ✓</span>
            </div>
            
            <div className="absolute bottom-4 right-4 border-2 border-yellow-400 rounded px-2 py-1 bg-black/50">
              <span className="text-yellow-400 text-xs font-mono">EQUIPMENT: MONITORING</span>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
                <Camera className="w-8 h-8 text-blue-400" />
              </div>
              <p className="text-gray-400">AI Vision Analysis Active</p>
              <p className="text-gray-500 text-sm mt-1">Processing frame data...</p>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-4">
              <Camera className="w-8 h-8 text-gray-500" />
            </div>
            <p className="text-gray-500">Camera Feed Offline</p>
            <p className="text-gray-600 text-sm mt-1">Start monitoring to activate</p>
          </div>
        )}
      </div>
    </div>
  );
};