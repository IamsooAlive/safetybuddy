import React from 'react';
import { AlertTriangle, Shield, Clock, CheckCircle2, X, Eye } from 'lucide-react';
import { SafetyAlert } from '../types';

interface AlertCardProps {
  alert: SafetyAlert;
  onAcknowledge: (id: string) => void;
  onResolve: (id: string) => void;
}

export const AlertCard: React.FC<AlertCardProps> = ({ alert, onAcknowledge, onResolve }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return 'border-red-500 bg-red-50';
      case 'HIGH': return 'border-orange-500 bg-orange-50';
      case 'MEDIUM': return 'border-yellow-500 bg-yellow-50';
      case 'LOW': return 'border-blue-500 bg-blue-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  const getSeverityIcon = (severity: string) => {
    const iconClass = severity === 'CRITICAL' ? 'text-red-600' : 
                     severity === 'HIGH' ? 'text-orange-600' : 
                     severity === 'MEDIUM' ? 'text-yellow-600' : 'text-blue-600';
    
    return <AlertTriangle className={`w-5 h-5 ${iconClass}`} />;
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'PPE_VIOLATION': return 'PPE Violation';
      case 'HAZARD_DETECTED': return 'Hazard Detected';
      case 'UNSAFE_BEHAVIOR': return 'Unsafe Behavior';
      case 'EQUIPMENT_ISSUE': return 'Equipment Issue';
      default: return type;
    }
  };

  return (
    <div className={`border-l-4 rounded-lg p-4 mb-4 ${getSeverityColor(alert.severity)} transition-all duration-200 hover:shadow-md`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          {getSeverityIcon(alert.severity)}
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="font-semibold text-gray-900">{getTypeLabel(alert.type)}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                alert.severity === 'CRITICAL' ? 'bg-red-100 text-red-800' :
                alert.severity === 'HIGH' ? 'bg-orange-100 text-orange-800' :
                alert.severity === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {alert.severity}
              </span>
              <span className="text-gray-500 text-sm">Confidence: {Math.round(alert.confidence * 100)}%</span>
            </div>
            
            <p className="text-gray-700 mb-2">{alert.description}</p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
              <div className="flex items-start space-x-2">
                <Shield className="w-4 h-4 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900">AI Recommendation:</p>
                  <p className="text-sm text-blue-800">{alert.aiRecommendation}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{new Date(alert.timestamp).toLocaleTimeString()}</span>
              </div>
              <span>📍 {alert.location}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          {alert.status === 'ACTIVE' && (
            <>
              <button
                onClick={() => onAcknowledge(alert.id)}
                className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-lg text-sm font-medium hover:bg-yellow-200 transition-colors flex items-center space-x-1"
              >
                <Eye className="w-3 h-3" />
                <span>Acknowledge</span>
              </button>
              <button
                onClick={() => onResolve(alert.id)}
                className="px-3 py-1 bg-green-100 text-green-800 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors flex items-center space-x-1"
              >
                <CheckCircle2 className="w-3 h-3" />
                <span>Resolve</span>
              </button>
            </>
          )}
          
          {alert.status === 'ACKNOWLEDGED' && (
            <button
              onClick={() => onResolve(alert.id)}
              className="px-3 py-1 bg-green-100 text-green-800 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors flex items-center space-x-1"
            >
              <CheckCircle2 className="w-3 h-3" />
              <span>Resolve</span>
            </button>
          )}

          {alert.status === 'RESOLVED' && (
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium flex items-center space-x-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Resolved</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};