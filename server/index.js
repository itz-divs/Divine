require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const appointmentRoute = require('./routes/appointment.js');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/send-appointment', appointmentRoute);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Divine Health Care API' });
});

// ── Serve Vite build in production ──
// After `npm run build`, the static files are in ../dist
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));

// For any non-API route, serve index.html (SPA fallback)
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`\n  ✦ Divine Health Care API Server`);
  console.log(`  ├─ Running on: http://localhost:${PORT}`);
  console.log(`  ├─ Appointment endpoint: POST /api/send-appointment`);
  console.log(`  └─ Health check: GET /api/health\n`);
});
