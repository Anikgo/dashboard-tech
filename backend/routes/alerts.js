import express from 'express';
import mongoose from 'mongoose';
import Alert from '../models/Alert.js';
import { ObjectId } from 'mongodb';
import { GridFSBucket } from 'mongodb';

const router = express.Router();

// GET PPE compliance alerts
router.get('/ppe-compliance', async (req, res) => {
    try {
      const ppeAlerts = await Alert.find({ violation_type: 'PPE' }); // Filter by PPE compliance
      res.json(ppeAlerts); // Send PPE alerts as JSON response
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });

// GET restricted  alerts
router.get('/restricted', async (req, res) => {
    try {
      const ppeAlerts = await Alert.find({ violation_type: 'unauthorized_entry' }); // Filter by PPE compliance
      res.json(ppeAlerts); // Send PPE alerts as JSON response
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });

// GET sleep  alerts
router.get('/sleeping', async (req, res) => {
    try {
      const ppeAlerts = await Alert.find({ violation_type: 'sleeping' }); // Filter by PPE compliance
      res.json(ppeAlerts); // Send PPE alerts as JSON response
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });

// GET phone  alerts
router.get('/phone', async (req, res) => {
    try {
      const ppeAlerts = await Alert.find({ violation_type: 'on_phone' }); // Filter by PPE compliance
      res.json(ppeAlerts); // Send PPE alerts as JSON response
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });


// GET Attendance alerts
router.get('/attendance', async (req, res) => {
    try {
      const alerts = await Alert.find({ alert_type: 'attendance' }); // Filter by PPE compliance
      res.json(alerts); // Send attendance alerts as JSON response
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });

// GET idle machinery alerts
router.get('/idle_machinery', async (req, res) => {
    try {
      const ppeAlerts = await Alert.find({ violation_type: 'idle_machinery' }); // Filter by PPE compliance
      res.json(ppeAlerts); // Send PPE alerts as JSON response
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });
  

// GET loitering alerts
router.get('/loitering', async (req, res) => {
  try {
    const ppeAlerts = await Alert.find({ violation_type: 'loitering' }); // Filter by PPE compliance
    res.json(ppeAlerts); // Send PPE alerts as JSON response
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
  
  

  // Get images
router.get('/image/:image_id', async (req, res) => {
    try {
      const db = mongoose.connection.db;
      const bucket = new GridFSBucket(db, { bucketName: 'fs' });
  
      const fileId = new ObjectId(req.params.image_id);
  
      // Check if file exists
      const files = await db.collection('fs.files').find({ _id: fileId }).toArray();
      if (!files || files.length === 0) {
        return res.status(404).send('Image not found');
      }
  
      // Set correct MIME type
      res.set('Content-Type', files[0].contentType || 'image/jpeg');
  
      // Stream image
      bucket.openDownloadStream(fileId).pipe(res);
    } catch (err) {
      console.error("Image fetch error:", err.message);
      res.status(500).send({ error: err.message });
    }
  });

// routes/alerts.js
router.get('/fire-smoke', async (req, res) => {
    try {
      const alerts = await Alert.find({ violation_type: { $in: ['Fire', 'Smoke'] } }).sort({ frame_timestamp: -1 });
      res.json(alerts);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  
  

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

// Delete a particular alert
router.delete('/:id', async (req, res) => {
    try {
      await Alert.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Alert deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

export default router;