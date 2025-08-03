import React from 'react';
import { Play, Square, RotateCcw, Settings, Activity } from 'lucide-react';
import { MonitoringStatus } from '../types';

interface ControlPanelProps {
  status: MonitoringStatus;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ 
  status, 
  onStart, 
  onStop, 
  onReset 
}) => {
  const getStatusColor = () => {
    return status.isActive ? 'text-green-600' : 'text-gray-500';
  };

  const getStatusText = () => {
    return status.isActive ? 'MONITORING ACTIVE' : 'MONITORING STOPPED';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Control Panel</h2>
        <div className="flex items-center space-x-2">
          <Activity className={`w-5 h-5 ${getStatusColor()}`} />
          <span className={`font-medium ${getStatusColor()}`}>
            {getStatusText()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">Session Duration</p>
          <p className="text-2xl font-bold text-gray-900">
            {status.startTime ? 
              Math.floor((Date.now() - status.startTime.getTime()) / 1000 / 60) : 0}m
          </p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">Total Alerts</p>
          <p className="text-2xl font-bold text-gray-900">{status.alertsCount}</p>
        </div>
      </div>

      <div className="flex space-x-3">
        {!status.isActive ? (
          <button
            onClick={onStart}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
          >
            <Play className="w-5 h-5" />
            <span>Start Monitoring</span>
          </button>
        ) : (
          <button
            onClick={onStop}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
          >
            <Square className="w-5 h-5" />
            <span>Stop Monitoring</span>
          </button>
        )}
        
        <button
          onClick={onReset}
          className="px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors flex items-center justify-center"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
        
        <button className="px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors flex items-center justify-center">
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};