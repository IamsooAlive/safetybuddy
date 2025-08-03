# AI-Powered On-Site Safety and Quality Assurance System

A comprehensive full-stack web application that demonstrates AI-powered safety monitoring for industrial environments using computer vision and generative AI for real-time hazard detection and intelligent alert generation.

## 🚀 Features

### Frontend (React/TypeScript)
- **Real-time Dashboard**: Live monitoring interface with WebSocket connectivity
- **Video Feed Simulation**: Mockup of live camera feeds with AI detection overlays
- **Interactive Controls**: Start/stop monitoring with professional control panel
- **Real-time Alerts**: Live safety alert notifications with severity levels
- **AI-Generated Recommendations**: Contextual safety advice powered by simulated LLM
- **Metrics Dashboard**: Comprehensive safety statistics and performance tracking
- **Responsive Design**: Professional industrial monitoring interface

### Backend (Node.js/Express)
- **WebSocket Server**: Real-time bidirectional communication
- **RESTful API**: Status monitoring and control endpoints  
- **Simulated AI Detection**: Timer-based hazard simulation system
- **Alert Generation**: Intelligent safety recommendations
- **Multi-client Support**: Concurrent dashboard connections

### AI Integration Simulation
- **Computer Vision Mockup**: Simulated object detection and hazard identification
- **Generative AI Alerts**: Contextual safety recommendations and action items
- **Risk Assessment**: Severity classification and confidence scoring
- **Real-world Model Architecture**: Conceptual outline for production deployment

## 🏗️ System Architecture

```
┌─────────────────┐    WebSocket    ┌──────────────────┐
│   React Client  │ ←──────────────→ │   Node.js API    │
│   (Dashboard)   │                 │   (WebSocket +   │
└─────────────────┘                 │    REST API)     │
                                    └──────────────────┘
                                             │
                                    ┌──────────────────┐
                                    │  AI Simulation   │
                                    │  • Hazard Det.   │
                                    │  • Alert Gen.    │
                                    │  • Risk Assess.  │
                                    └──────────────────┘
```

## 🧠 Real-World Computer Vision Pipeline

The system includes a conceptual outline for production deployment:

### 1. Vision Processing Stack
- **Input**: Live RTSP/IP camera feeds
- **Object Detection**: YOLO v8 for person/equipment identification
- **PPE Detection**: Hard hats, safety glasses, high-vis vests
- **Pose Estimation**: Unsafe postures, fall detection
- **Environmental Monitoring**: Spills, smoke, restricted area violations

### 2. AI/ML Framework
- **Core**: PyTorch/TensorFlow + OpenCV
- **Models**: Pre-trained + domain-specific fine-tuning
- **Edge Deployment**: NVIDIA Jetson/Intel OpenVINO
- **Cloud Integration**: Scalable real-time inference

### 3. Generative AI Integration
- **Context Analysis**: Scene understanding and risk assessment
- **Alert Generation**: GPT-4 powered actionable recommendations
- **Pattern Recognition**: Historical incident analysis
- **Compliance Reporting**: Automated safety documentation

## 🛠️ Installation & Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Full Development Environment**
   ```bash
   npm run dev:full
   ```
   This runs both the backend server (port 3001) and frontend (port 5173)

3. **Individual Services**
   ```bash
   # Backend only
   npm run server
   
   # Frontend only  
   npm run dev
   ```

## 📊 Usage

1. **Access Dashboard**: Navigate to `http://localhost:5173`
2. **Start Monitoring**: Click "Start Monitoring" to begin AI simulation
3. **View Real-time Alerts**: Safety alerts appear automatically with AI recommendations
4. **Manage Alerts**: Acknowledge and resolve alerts using the action buttons
5. **Monitor Metrics**: Track safety performance in real-time

## 🔧 API Endpoints

- `GET /api/status` - Get current monitoring status
- `POST /api/start` - Start safety monitoring
- `POST /api/stop` - Stop safety monitoring
- `WebSocket ws://localhost:3001` - Real-time communication

## 🎯 Alert Types

- **PPE Violations**: Missing safety equipment detection
- **Hazard Detection**: Environmental and equipment dangers
- **Unsafe Behavior**: Protocol violations and risky actions  
- **Equipment Issues**: Machinery and safety system problems

## 🚀 Production Deployment Considerations

### Hardware Requirements
- **Edge Processing**: NVIDIA Jetson AGX Xavier or Intel NUC
- **Cameras**: IP cameras with RTSP support (1080p minimum)
- **Network**: Gigabit Ethernet for video streaming
- **Storage**: Local NVR for footage retention

### Cloud Infrastructure
- **Container Orchestration**: Kubernetes/Docker
- **Database**: PostgreSQL for alert history
- **Message Queue**: Redis for real-time processing
- **Monitoring**: Grafana + Prometheus for system health

### Security & Compliance
- **Network Segmentation**: Isolated VLAN for safety systems
- **Data Encryption**: TLS 1.3 for all communications
- **Access Control**: Role-based dashboard permissions
- **Audit Logging**: Comprehensive incident tracking

## 📈 Future Enhancements

- **Mobile App**: iOS/Android for field supervisors
- **Voice Alerts**: Audio notifications for critical incidents
- **Predictive Analytics**: Machine learning for incident prediction
- **Integration APIs**: Connect with existing safety management systems
- **Wearable Integration**: Smart helmet and vest sensor data
- **Advanced Reporting**: Automated compliance documentation

## 🤝 Contributing

This is a demonstration system showcasing full-stack AI safety monitoring capabilities. The architecture provides a solid foundation for real-world industrial safety applications.

## 📄 License

MIT License - Built for educational and demonstration purposes.