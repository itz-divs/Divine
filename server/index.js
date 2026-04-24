require('dotenv').config();
const express = require('express');
const cors = require('cors');
const appointmentRoute = require('./routes/appointment.js');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:4173'],
  methods: ['POST'],
}));
app.use(express.json());

// Routes
app.use('/api/send-appointment', appointmentRoute);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Divine Health Care API' });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n  ✦ Divine Health Care API Server`);
  console.log(`  ├─ Running on: http://localhost:${PORT}`);
  console.log(`  ├─ Appointment endpoint: POST /api/send-appointment`);
  console.log(`  └─ Health check: GET /api/health\n`);
});
