
// module.exports = router;
const express = require('express');
const router = express.Router();
const Appointment = require('../models/appointment');

// CREATE: Add a new appointment
router.post('/', async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).json(appointment);
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(400).json({ message: 'Failed to create appointment', error });
  }
});

// READ: Get all appointments
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Failed to fetch appointments', error });
  }
});

// UPDATE: Update an existing appointment
router.put('/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    res.status(200).json(appointment);
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(400).json({ message: 'Failed to update appointment', error });
  }
});

// DELETE: Delete an appointment
router.delete('/:id', async (req, res) => {
  try {
    const result = await Appointment.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: 'Appointment not found' });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(400).json({ message: 'Failed to delete appointment', error });
  }
});

module.exports = router;
