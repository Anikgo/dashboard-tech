const mongoose = require('mongoose');

// MongoDB connection
mongoose.connect('mongodb+srv://anikgo:CtNjTIxe12acTT0p@guardex.cb67k9p.mongodb.net/guardex?retryWrites=true&w=majority&appName=Guardex', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
  console.log('Connected to MongoDB Atlas');
  
  try {
    // Dynamic import for ES module
    const Alert = (await import('./models/Alert.js')).default;
    
    // Add 1 restricted access alert
    const restrictedAlert = new Alert({
      alert_type: 'restricted',
      camera_id: 'cam_03',
      person_id: 'EMP005',
      frame_timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
      logged_at: new Date(Date.now() - 45 * 60 * 1000),
      image_id: '688df366c4729f04f9e094be',
      box_count: 1,
      zone: 'Restricted Area - Server Room',
      status: 'active',
      violation_type: 'unauthorized_entry'
    });

    await restrictedAlert.save();
    console.log('Successfully added 1 restricted access alert');
    console.log('Alert details:', {
      type: 'restricted',
      camera: 'cam_03',
      zone: 'Restricted Area - Server Room',
      time: new Date(Date.now() - 45 * 60 * 1000).toLocaleTimeString()
    });

    // Show current restricted alerts count
    const restrictedCount = await Alert.countDocuments({ alert_type: 'restricted' });
    console.log(`Total restricted access alerts in database: ${restrictedCount}`);

  } catch (error) {
    console.error('Error adding restricted access alert:', error);
  } finally {
    db.close();
    console.log('Database connection closed');
  }
}); 