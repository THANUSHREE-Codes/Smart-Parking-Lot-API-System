const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  slotNumber: {
    type: Number,
    required: true,
    unique: true
  },
  isOccupied: {
    type: Boolean,
    default: false
  },
  vehiclePlate: {
    type: String,
    default: null
  }
});

module.exports = mongoose.model('Slot', slotSchema);