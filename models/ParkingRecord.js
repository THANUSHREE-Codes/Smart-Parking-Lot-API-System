const mongoose = require('mongoose');

const parkingRecordSchema = new mongoose.Schema({
  vehiclePlate: {
    type: String,
    required: true
  },
  slotNumber: {
    type: Number,
    required: true
  },
  entryTime: {
    type: Date,
    default: Date.now
  },
  exitTime: {
    type: Date,
    default: null
  },
  status: {
    type: String,
    enum: ['parked', 'exited'],
    default: 'parked'
  }
});

module.exports = mongoose.model('ParkingRecord', parkingRecordSchema);