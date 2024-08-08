import mongoose from 'mongoose';

const SlotSchema = new mongoose.Schema({
  startTime: Date,
  endTime: Date,
  capacity: Number,
});

const appointmentSchema = new mongoose.Schema({
  date: Date,
  startTime: Date,
  endTime: Date,
  capacity: Number,
  slots: [SlotSchema],
});

export default mongoose.model('Appointment', appointmentSchema);
