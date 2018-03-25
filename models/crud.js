var mongoose = require('mongoose');

var dataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  time: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  }
});

var Appointment = mongoose.model('appointment', dataSchema);
module.exports = Appointment;

