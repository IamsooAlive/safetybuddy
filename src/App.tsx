import React, { useState, useEffect } from 'react';
import { Shield, Eye } from 'lucide-react';
import { VideoFeed } from './components/VideoFeed';
import { AlertCard } from './components/AlertCard';
import { ControlPanel } from './components/ControlPanel';
import { MetricsPanel } from './components/MetricsPanel';
import { useWebSocket } from './hooks/useWebSocket';
import { SafetyAlert, MonitoringStatus, SafetyMetrics } from './types';

function App() {
  const [alerts, setAlerts] = useState<SafetyAlert[]>([]);
  const [monitoringStatus, setMonitoringStatus] = useState<MonitoringStatus>({
    isActive: false,
    alertsCount: 0,
    lastUpdate: new Date()
  });

  const { socket, isConnected, sendMessage } = useWebSocket('ws://localhost:3001');

  const metrics: SafetyMetrics = {
    totalAlerts: alerts.length,
    activeAlerts: alerts.filter(a => a.status === 'ACTIVE').length,
    resolvedAlerts: alerts.filter(a => a.status === 'RESOLVED').length,
    criticalAlerts: alerts.filter(a => a.severity === 'CRITICAL').length,
    averageResponseTime: 4.2
  };

  useEffect(() => {
    if (socket) {
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        
        if (data.type === 'ALERT') {
          setAlerts(prev => [data.alert, ...prev]);
          setMonitoringStatus(prev => ({
            ...prev,
            alertsCount: prev.alertsCount + 1,
            lastUpdate: new Date()
          }));
        } else if (data.type === 'STATUS_UPDATE') {
          setMonitoringStatus(prev => ({
            ...prev,
            isActive: data.isActive,
            lastUpdate: new Date(),
            ...(data.isActive && !prev.isActive ? { startTime: new Date() } : {})
          }));
        }
      };
    }
  }, [socket]);

  const handleStart = () => {
    sendMessage({ action: 'START_MONITORING' });
  };

  const handleStop = () => {
    sendMessage({ action: 'STOP_MONITORING' });
  };

  const handleReset = () => {
    setAlerts([]);
    setMonitoringStatus({
      isActive: false,
      alertsCount: 0,
      lastUpdate: new Date()
    });
    sendMessage({ action: 'RESET' });
  };

  const handleAcknowledge = (id: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, status: 'ACKNOWLEDGED' as const } : alert
    ));
  };

  const handleResolve = (id: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, status: 'RESOLVED' as const } : alert
    ));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 rounded-lg p-2">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AI Safety Monitor</h1>
                <p className="text-sm text-gray-600">On-Site Safety & Quality Assurance System</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${
                isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                <div className={`w-2 h-2 rounded-full ${
                  isConnected ? 'bg-green-600' : 'bg-red-600'
                }`}></div>
                <span className="text-sm font-medium">
                  {isConnected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Video Feed and Controls */}
          <div className="lg:col-span-2 space-y-6">
            <VideoFeed isActive={monitoringStatus.isActive} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ControlPanel 
                status={monitoringStatus}
                onStart={handleStart}
                onStop={handleStop}
                onReset={handleReset}
              />
              <MetricsPanel metrics={metrics} />
            </div>
          </div>

          {/* Right Column - Alerts */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Safety Alerts</h2>
                <div className="flex items-center space-x-2">
                  <Eye className="w-5 h-5 text-gray-500" />
                  <span className="text-sm text-gray-600">Real-time</span>
                </div>
              </div>

              <div className="max-h-96 overflow-y-auto space-y-4">
                {alerts.length === 0 ? (
                  <div className="text-center py-8">
                    <Shield className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No alerts yet</p>
                    <p className="text-sm text-gray-400 mt-1">Start monitoring to detect safety issues</p>
                  </div>
                ) : (
                  alerts.map(alert => (
                    <AlertCard
                      key={alert.id}
                      alert={alert}
                      onAcknowledge={handleAcknowledge}
                      onResolve={handleResolve}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;