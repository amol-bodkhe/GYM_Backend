const path = require('path');
require('dotenv').config();
const connectDB = require('./config/db');
connectDB();

const express = require('express');
const cors = require('cors');

const app = express();

/* =======================
   MIDDLEWARES
======================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
app.use(
  cors({
    origin: [
      'http://localhost:4200',                                    // Angular local
      'http://ec2-13-126-240-40.ap-south-1.compute.amazonaws.com', // EC2 public DNS
      'https://yourdomain.com'                                     // Production domain
    ],
    credentials: true
  })
);

/* =======================
   API ROUTES
======================= */
app.use('/api', require('./modules')); // all backend APIs


/* =======================
   ANGULAR FRONTEND SERVE
======================= */
app.use(express.static(path.join(__dirname, 'public')));

// This route serves Angular app for all non-API routes
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

/* =======================
   HEALTH CHECK
======================= */
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Server running 🚀' });
});

/* =======================
   404 HANDLER
======================= */
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

/* =======================
   ERROR HANDLER
======================= */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
});

/* =======================
   START SERVER
======================= */
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
