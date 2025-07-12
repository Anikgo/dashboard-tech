import mongoose from 'mongoose';

const alertSchema = new mongoose.Schema({
  camera_id: { type: String, required: true },
  person_id: { type: String, required: true },
  frame_timestamp: { type: Date, required: true },
  logged_at: { type: Date, default: Date.now },
  image_id: { type: String, required: true },
  
  // 👇 Add these for frontend compatibility
  violation_type: { type: String }, // e.g., 'PPE'
  id: { type: String },             // same as person_id, for frontend use
  name: { type: String },
  time: { type: String },           // e.g., "10:45 AM"
  violation: { type: String },      // e.g., "Missing Mask"
  zone: { type: String },
  status: { type: String }          // e.g., "Present"
});

const Alert = mongoose.model('Alert', alertSchema);

export default Alert;
