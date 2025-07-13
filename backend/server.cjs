import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import alertRoutes from './routes/alerts.js'; // Add `.js` extension for ES modules

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
mongoose.set('strictQuery', true); // Suppress the warning and prepare for Mongoose 7

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));
// Middleware
app.use(express.json());

// Routes
app.use('/api/alerts', alertRoutes);    {/* TODO : Change the folder in MongoDB Guardex Server */}

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));