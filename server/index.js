import express from 'express';
import { WebSocketServer } from 'ws';
import { createServer } from 'http';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

app.use(cors());
app.use(express.json());

let isMonitoring = false;
let alertInterval = null;
let connectedClients = new Set();

// Simulated hazard types and AI-generated messages
const hazardTypes = [
  {
    type: 'PPE_VIOLATION',
    severities: ['MEDIUM', 'HIGH'],
    locations: ['Construction Zone A', 'Warehouse Floor B', 'Assembly Line 3'],
    descriptions: [
      'Worker detected without safety helmet in active construction zone',
      'Employee observed without safety glasses near machinery',
      'Individual not wearing high-visibility vest in vehicle traffic area'
    ],
    aiRecommendations: [
      'Immediately notify worker to don hard hat. Suspend work until proper PPE is worn. Review safety protocols with team.',
      'Stop worker and provide safety glasses. Conduct spot check of nearby workers for compliance.',
      'Direct worker to obtain high-vis vest. Implement buddy system for PPE compliance checks.'
    ]
  },
  {
    type: 'HAZARD_DETECTED',
    severities: ['HIGH', 'CRITICAL'],
    locations: ['Chemical Storage Area', 'Heavy Machinery Zone', 'Electrical Panel Room'],
    descriptions: [
      'Potential chemical spill detected in storage area',
      'Machinery operating outside normal parameters',
      'Electrical hazard identified near main panel'
    ],
    aiRecommendations: [
      'Evacuate area immediately. Deploy spill response team. Ensure proper ventilation before cleanup.',
      'Initiate emergency shutdown procedure. Have certified technician inspect equipment before restart.',
      'De-energize circuit immediately. Contact licensed electrician for inspection. Post warning signs.'
    ]
  },
  {
    type: 'UNSAFE_BEHAVIOR',
    severities: ['LOW', 'MEDIUM', 'HIGH'],
    locations: ['Loading Dock', 'Machine Shop', 'Office Area'],
    descriptions: [
      'Worker bypassing safety protocols during lifting operation',
      'Employee using damaged tool instead of reporting it',
      'Individual running in designated walk-only zone'
    ],
    aiRecommendations: [
      'Intervene immediately. Retrain worker on proper lifting techniques and lockout/tagout procedures.',
      'Confiscate damaged tool. Provide replacement. Document incident and schedule safety refresher.',
      'Issue verbal warning. Review facility safety rules. Consider additional safety signage if needed.'
    ]
  },
  {
    type: 'EQUIPMENT_ISSUE',
    severities: ['MEDIUM', 'HIGH'],
    locations: ['Production Line 1', 'HVAC System', 'Fire Safety Equipment'],
    descriptions: [
      'Conveyor belt showing signs of mechanical stress',
      'Fire suppression system showing maintenance alert',
      'Emergency exit door mechanism not functioning properly'
    ],
    aiRecommendations: [
      'Schedule immediate maintenance inspection. Reduce line speed until repairs completed.',
      'Contact fire safety contractor immediately. Test backup systems. Schedule full inspection.',
      'Mark exit as temporarily out of service. Ensure alternate exits are clearly marked and functional.'
    ]
  }
];

// Simulate AI-powered hazard detection
function generateAlert() {
  const hazardType = hazardTypes[Math.floor(Math.random() * hazardTypes.length)];
  const severity = hazardType.severities[Math.floor(Math.random() * hazardType.severities.length)];
  const location = hazardType.locations[Math.floor(Math.random() * hazardType.locations.length)];
  const description = hazardType.descriptions[Math.floor(Math.random() * hazardType.descriptions.length)];
  const aiRecommendation = hazardType.aiRecommendations[Math.floor(Math.random() * hazardType.aiRecommendations.length)];

  return {
    id: uuidv4(),
    timestamp: new Date(),
    type: hazardType.type,
    severity: severity,
    location: location,
    description: description,
    aiRecommendation: aiRecommendation,
    status: 'ACTIVE',
    confidence: 0.75 + Math.random() * 0.24 // 75-99% confidence
  };
}

function broadcastToClients(data) {
  connectedClients.forEach(client => {
    if (client.readyState === client.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

function startMonitoring() {
  if (isMonitoring) return;
  
  isMonitoring = true;
  console.log('🔍 AI Safety monitoring started');
  
  // Broadcast status update
  broadcastToClients({
    type: 'STATUS_UPDATE',
    isActive: true
  });

  // Simulate random alerts every 8-15 seconds
  const scheduleNextAlert = () => {
    if (!isMonitoring) return;
    
    const delay = 8000 + Math.random() * 7000; // 8-15 seconds
    alertInterval = setTimeout(() => {
      if (isMonitoring) {
        const alert = generateAlert();
        console.log(`🚨 Alert generated: ${alert.type} - ${alert.severity}`);
        
        broadcastToClients({
          type: 'ALERT',
          alert: alert
        });
        
        scheduleNextAlert();
      }
    }, delay);
  };

  scheduleNextAlert();
}

function stopMonitoring() {
  if (!isMonitoring) return;
  
  isMonitoring = false;
  if (alertInterval) {
    clearTimeout(alertInterval);
    alertInterval = null;
  }
  
  console.log('⏹️ AI Safety monitoring stopped');
  
  // Broadcast status update
  broadcastToClients({
    type: 'STATUS_UPDATE',
    isActive: false
  });
}

// WebSocket connection handling
wss.on('connection', (ws) => {
  console.log('🔌 Client connected to AI Safety System');
  connectedClients.add(ws);
  
  // Send current monitoring status
  ws.send(JSON.stringify({
    type: 'STATUS_UPDATE',
    isActive: isMonitoring
  }));

  ws.on('message', (data) => {
    try {
      const message = JSON.parse(data.toString());
      
      switch (message.action) {
        case 'START_MONITORING':
          startMonitoring();
          break;
        case 'STOP_MONITORING':
          stopMonitoring();
          break;
        case 'RESET':
          stopMonitoring();
          break;
        default:
          console.log('Unknown action:', message.action);
      }
    } catch (error) {
      console.error('Error parsing WebSocket message:', error);
    }
  });

  ws.on('close', () => {
    console.log('🔌 Client disconnected');
    connectedClients.delete(ws);
  });
});

// REST API endpoints
app.get('/api/status', (req, res) => {
  res.json({
    isMonitoring,
    timestamp: new Date(),
    connectedClients: connectedClients.size
  });
});

app.post('/api/start', (req, res) => {
  startMonitoring();
  res.json({ success: true, message: 'Monitoring started' });
});

app.post('/api/stop', (req, res) => {
  stopMonitoring();
  res.json({ success: true, message: 'Monitoring stopped' });
});

// Computer Vision Model Conceptual Outline
console.log(`
🤖 AI-Powered Safety System - Conceptual CV Model Architecture:

1. REAL-WORLD COMPUTER VISION PIPELINE:
   └── Input: Live camera feeds (RTSP/IP cameras)
   └── Preprocessing: Frame normalization, noise reduction
   └── Object Detection: YOLO v8 for person/equipment detection
   └── Classification Models:
       ├── PPE Detection: Hard hats, safety glasses, vests
       ├── Pose Estimation: Unsafe postures, fall detection  
       ├── Equipment Status: Tool condition, machinery state
       └── Environmental: Spills, smoke, restricted areas
   
2. AI/ML STACK:
   └── Framework: PyTorch/TensorFlow + OpenCV
   └── Models: Pre-trained + domain-specific fine-tuning
   └── Edge Deployment: NVIDIA Jetson/Intel OpenVINO
   └── Cloud Integration: Real-time inference scaling

3. GENERATIVE AI INTEGRATION:
   └── Hazard Context Analysis: Scene understanding
   └── Alert Generation: GPT-4 for actionable recommendations
   └── Risk Assessment: Historical pattern analysis
   └── Compliance Reporting: Automated documentation

4. DEPLOYMENT ARCHITECTURE:
   └── Edge Processing: Real-time inference (< 100ms)
   └── Cloud Analytics: Pattern recognition, reporting
   └── WebSocket API: Live dashboard updates
   └── Mobile Integration: Field supervisor alerts
`);

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`🚀 AI Safety System Server running on port ${PORT}`);
  console.log(`📊 Dashboard: http://localhost:5173`);
  console.log(`🔌 WebSocket: ws://localhost:${PORT}`);
  console.log(`📡 API: http://localhost:${PORT}/api`);
});
