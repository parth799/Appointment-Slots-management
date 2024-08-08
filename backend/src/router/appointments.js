import express from 'express';
import Appointment from '../models/Appointment.js';

const router = express.Router();

const isValidDate = (date) => date instanceof Date && !isNaN(date);

router.post('/', async (req, res) => {
  const { date, startTime, endTime, capacity, duration } = req.body;

  if (!isValidDate(new Date(date)) || !isValidDate(new Date(startTime)) || !isValidDate(new Date(endTime))) {
    return res.status(401).send('Invalid date format.');
  }

  if (new Date(startTime) < new Date()) {
    return res.status(402).send('Start time cannot be in the pas');
  }

  if (new Date(endTime) <= new Date(startTime)) {
    return res.status(403).send('End time must be greater than start time!');
  }

  if (!Number.isInteger(capacity) || capacity <= 0) {
    return res.status(404).send('Capacity must be a positive integer!');
  }

  const slots = [];
  const slotDuration = duration * 60 * 1000; 
  console.log("duration", new Date(endTime).getTime());
  console.log("duration", new Date(startTime).getTime());
  // console.log("---------->>>>.",((endTime).getTime() - (startTime).getTime()));
  
  const totalSlots = Math.floor((new Date(endTime).getTime() - new Date(startTime).getTime()) / slotDuration);
  // console.log("///////////////", totalSlots)
  const baseCapacity = Math.floor(capacity / totalSlots);
  console.log("-------", baseCapacity)
  let remainingCapacity = capacity % totalSlots;
  console.log(">>>>>>>>>>>>", remainingCapacity);
  let currentStart = new Date(startTime);
 console.log("currentStart", currentStart)
  for (let i = 0; i < totalSlots; i++) {
    const currentEnd = new Date(currentStart.getTime() + slotDuration);
    if (currentEnd > new Date(endTime)) {
      break;
    }

    let slotCapacity = baseCapacity;
    if (remainingCapacity > 0) {
      slotCapacity += 1;
      remainingCapacity -= 1;
    }

    slots.push({
      startTime: new Date(currentStart),
      endTime: currentEnd,
      capacity: slotCapacity,
    });

    currentStart = currentEnd;
  }

  const appointment = new Appointment({ date, startTime, endTime, capacity, slots });
  await appointment.save();
  res.status(201).send(appointment);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const appointment = await Appointment.findOne({ "slots._id": id });

    if (!appointment) {
      return res.status(404).send('Appointment slot not found.');
    }
    appointment.slots = appointment.slots.filter(slot => slot._id.toString() !== id);
    await appointment.save();

    res.status(200).send('Appointment slot deleted.');
  } catch (error) {
    console.error('Error deleting appointment slot:', error);
    res.status(500).send('Error deleting appointment slot.');
  }
});

router.get('/', async (req, res) => {
  const appointments = await Appointment.find();
  res.status(200).send(appointments);
});

export default router;
