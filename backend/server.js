import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import alertRoutes from './routes/alerts.js'; // Import the router
import cors from 'cors';


dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// Routes
app.use(cors());
app.use('/api/alerts', alertRoutes); // Use the router

// MongoDB Connection
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((err) => console.error('MongoDB connection error:', err));

mongoose.connect(process.env.MONGO_URI, {
  dbName: 'guardex', 
})
.then(() => console.log('Connected to MongoDB - guardex'))
.catch((err) => console.error('MongoDB connection error:', err));


// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));