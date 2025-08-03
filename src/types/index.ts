export interface SafetyAlert {
  id: string;
  timestamp: Date;
  type: 'PPE_VIOLATION' | 'HAZARD_DETECTED' | 'UNSAFE_BEHAVIOR' | 'EQUIPMENT_ISSUE';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  location: string;
  description: string;
  aiRecommendation: string;
  status: 'ACTIVE' | 'ACKNOWLEDGED' | 'RESOLVED';
  confidence: number;
}

export interface MonitoringStatus {
  isActive: boolean;
  startTime?: Date;
  alertsCount: number;
  lastUpdate: Date;
}

export interface SafetyMetrics {
  totalAlerts: number;
  activeAlerts: number;
  resolvedAlerts: number;
  criticalAlerts: number;
  averageResponseTime: number;
}