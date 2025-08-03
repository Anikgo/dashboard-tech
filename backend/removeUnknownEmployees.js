import mongoose from 'mongoose';
import Alert from './models/Alert.js';

// Connect to MongoDB
mongoose.connect('mongodb+srv://anikgo:CtNjTIxe12acTT0p@guardex.cb67k9p.mongodb.net/guardex?retryWrites=true&w=majority&appName=Guardex', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
  console.log('Connected to MongoDB Atlas - guardex database');
  
  try {
    // Find and remove attendance alerts with null names and emp_ids
    const result = await Alert.deleteMany({
      alert_type: 'attendance',
      $or: [
        { name: null },
        { name: { $exists: false } },
        { emp_id: null },
        { emp_id: { $exists: false } }
      ]
    });
    
    console.log(`Successfully removed ${result.deletedCount} unknown employee alerts`);
    
    // Verify the remaining attendance alerts
    const remainingAlerts = await Alert.find({ alert_type: 'attendance' });
    console.log('\nRemaining attendance alerts:');
    remainingAlerts.forEach(alert => {
      console.log(`- ${alert.name} (${alert.emp_id}) - ${alert.zone}`);
    });
    
  } catch (error) {
    console.error('Error removing unknown employee alerts:', error);
  } finally {
    mongoose.connection.close();
    console.log('Database connection closed');
  }
}); 