import React from 'react';
import { TrendingUp, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import { SafetyMetrics } from '../types';

interface MetricsPanelProps {
  metrics: SafetyMetrics;
}

export const MetricsPanel: React.FC<MetricsPanelProps> = ({ metrics }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Safety Metrics</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-blue-600 font-medium">Total</span>
          </div>
          <p className="text-2xl font-bold text-blue-900">{metrics.totalAlerts}</p>
          <p className="text-sm text-blue-700">All Alerts</p>
        </div>

        <div className="bg-red-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <span className="text-sm text-red-600 font-medium">Active</span>
          </div>
          <p className="text-2xl font-bold text-red-900">{metrics.activeAlerts}</p>
          <p className="text-sm text-red-700">Need Attention</p>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <span className="text-sm text-green-600 font-medium">Resolved</span>
          </div>
          <p className="text-2xl font-bold text-green-900">{metrics.resolvedAlerts}</p>
          <p className="text-sm text-green-700">Completed</p>
        </div>

        <div className="bg-orange-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-5 h-5 text-orange-600" />
            <span className="text-sm text-orange-600 font-medium">Avg Time</span>
          </div>
          <p className="text-2xl font-bold text-orange-900">{metrics.averageResponseTime}m</p>
          <p className="text-sm text-orange-700">Response</p>
        </div>
      </div>
    </div>
  );
};