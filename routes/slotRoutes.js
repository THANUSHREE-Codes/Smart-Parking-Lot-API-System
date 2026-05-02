const express = require('express');
const router = express.Router();
const Slot = require('../models/Slot');

// POST /api/slots/initialize  →  Create slots
router.post('/initialize', async (req, res) => {
  const { totalSlots } = req.body;

  if (!totalSlots) {
    return res.status(400).json({ error: 'Please provide totalSlots' });
  }

  // Create slot 1, 2, 3 ... up to totalSlots
  const slots = [];
  for (let i = 1; i <= totalSlots; i++) {
    slots.push({ slotNumber: i });
  }

  await Slot.insertMany(slots);
  res.status(201).json({ message: `${totalSlots} slots created successfully` });
});

// GET /api/slots  →  View all slots
router.get('/', async (req, res) => {
  const slots = await Slot.find().sort({ slotNumber: 1 });
  res.json(slots);
});

// DELETE /api/slots/reset  →  Clear everything (for testing)
router.delete('/reset', async (req, res) => {
  await Slot.deleteMany({});
  res.json({ message: 'All slots deleted' });
});

module.exports = router;