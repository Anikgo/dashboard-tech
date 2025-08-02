import mongoose from 'mongoose';
import Alert from './models/Alert.js';

// Connect to MongoDB Atlas - explicitly specify guardex database
mongoose.connect('mongodb+srv://anikgo:CtNjTIxe12acTT0p@guardex.cb67k9p.mongodb.net/guardex?retryWrites=true&w=majority&appName=Guardex', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
  console.log('Connected to MongoDB Atlas - guardex database');
  
  try {
    // Update camera IDs to match the original format
    const updates = [
      { oldId: "CAM002", newId: "cam_02" },
      { oldId: "CAM003", newId: "cam_03" },
      { oldId: "CAM004", newId: "cam_04" },
      { oldId: "CAM005", newId: "cam_05" },
      { oldId: "CAM006", newId: "cam_06" }
    ];

    for (const update of updates) {
      const result = await Alert.updateMany(
        { camera_id: update.oldId },
        { $set: { camera_id: update.newId } }
      );
      console.log(`Updated ${result.modifiedCount} alerts from ${update.oldId} to ${update.newId}`);
    }

    // Verify the updates
    const allAlerts = await Alert.find({}, 'camera_id violation_type');
    console.log('\nUpdated camera IDs:');
    allAlerts.forEach(alert => {
      console.log(`${alert.camera_id}: ${alert.violation_type}`);
    });

    // Show breakdown by camera
    const cameraBreakdown = await Alert.aggregate([
      { $group: { _id: "$camera_id", count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);
    
    console.log('\nAlerts per camera:');
    cameraBreakdown.forEach(item => {
      console.log(`${item._id}: ${item.count} alerts`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error updating camera IDs:', error);
    process.exit(1);
  }
}); 