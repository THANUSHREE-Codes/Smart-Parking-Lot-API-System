const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/slots', require('./routes/slotRoutes'));
app.use('/api/parking', require('./routes/parkingRoutes'));

// Hardcode values directly here
const PORT = 3000;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('Connection Error:', err.message);
  });