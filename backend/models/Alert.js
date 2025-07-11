import mongoose from 'mongoose';

const alertSchema = new mongoose.Schema({
  camera_id: { type: String, required: true },
  person_id: { type: String, required: true },
  frame_timestamp: { type: Date, required: true },
  logged_at: { type: Date, default: Date.now },
  image_id: { type: String, required: true }
});

const Alert = mongoose.model('Alert', alertSchema);

export default Alert;