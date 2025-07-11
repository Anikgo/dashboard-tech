import express from 'express';
import Alert from '../models/Alert.js';

const router = express.Router();

// GET all alerts
router.get('/', async (req, res) => {
  try {
    const alerts = await Alert.find(); // Fetch all alerts from MongoDB
    res.json(alerts); // Send alerts as JSON response
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// POST a new alert (optional, for testing purposes)
router.post('/', async (req, res) => {
  try {
    const newAlert = new Alert(req.body); // Create a new alert document
    const savedAlert = await newAlert.save(); // Save to MongoDB
    res.status(201).json(savedAlert); // Send saved alert as response
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

export default router;