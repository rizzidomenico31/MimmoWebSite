const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const config = require('./src/config');
const contactRoutes = require('./src/routes/contact');

const app = express();

// Security
app.use(helmet());
app.use(cors(config.cors));

// Body parsing
app.use(express.json({ limit: '10kb' }));

// Routes
app.use('/api/contact', contactRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Serve React static build in production
if (process.env.NODE_ENV === 'production') {
  const clientDist = path.join(__dirname, '../client/dist');
  app.use(express.static(clientDist));
  app.get('/{*splat}', (req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

// Start server
app.listen(config.port, () => {
  console.log(`\n🛡️  Portfolio Server running on port ${config.port}`);
  console.log(`   Health: http://localhost:${config.port}/api/health\n`);
});
