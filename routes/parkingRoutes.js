const express = require('express');
const router = express.Router();
const Slot = require('../models/Slot');
const ParkingRecord = require('../models/ParkingRecord');

// POST /api/parking/entry  →  Vehicle enters, assign slot
router.post('/entry', async (req, res) => {
  const { vehiclePlate } = req.body;

  if (!vehiclePlate) {
    return res.status(400).json({ error: 'vehiclePlate is required' });
  }

  // Find the first available slot
  const slot = await Slot.findOne({ isOccupied: false }).sort({ slotNumber: 1 });
  if (!slot) {
    return res.status(400).json({ error: 'Parking lot is full' });
  }

  // Mark slot as occupied
  slot.isOccupied = true;
  slot.vehiclePlate = vehiclePlate.toUpperCase();
  await slot.save();

  // Save parking record
  const record = await ParkingRecord.create({
    vehiclePlate: vehiclePlate.toUpperCase(),
    slotNumber: slot.slotNumber
  });

  res.status(201).json({
    message: 'Vehicle parked successfully',
    slotAssigned: slot.slotNumber,
    entryTime: record.entryTime
  });
});

// POST /api/parking/exit  →  Vehicle exits, free the slot
router.post('/exit', async (req, res) => {
  const { vehiclePlate } = req.body;

  if (!vehiclePlate) {
    return res.status(400).json({ error: 'vehiclePlate is required' });
  }

  // Find the active parking record
  const record = await ParkingRecord.findOne({
    vehiclePlate: vehiclePlate.toUpperCase(),
    status: 'parked'
  });

  if (!record) {
    return res.status(404).json({ error: 'Vehicle not found in parking lot' });
  }

  // Update the record
  record.exitTime = new Date();
  record.status = 'exited';
  await record.save();

  // Free the slot
  await Slot.findOneAndUpdate(
    { slotNumber: record.slotNumber },
    { isOccupied: false, vehiclePlate: null }
  );

  res.json({
    message: 'Vehicle exited successfully',
    slotReleased: record.slotNumber,
    exitTime: record.exitTime
  });
});

// GET /api/parking/current  →  See who is currently parked
router.get('/current', async (req, res) => {
  const records = await ParkingRecord.find({ status: 'parked' });
  res.json(records);
});

// GET /api/parking/history  →  See all parking history
router.get('/history', async (req, res) => {
  const records = await ParkingRecord.find().sort({ entryTime: -1 });
  res.json(records);
});

// GET /api/parking/search?plate=KA01  →  Search by number plate (OPTIONAL BONUS)
router.get('/search', async (req, res) => {
  const { plate } = req.query;

  if (!plate) {
    return res.status(400).json({ error: 'Please provide plate. Example: /search?plate=KA01' });
  }

  // $regex does partial search, $options: 'i' makes it case-insensitive
  const records = await ParkingRecord.find({
    vehiclePlate: { $regex: plate, $options: 'i' }
  });

  if (records.length === 0) {
    return res.status(404).json({ message: 'No records found' });
  }

  res.json(records);
});

module.exports = router;