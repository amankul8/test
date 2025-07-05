const mongoose = require('mongoose');

const uri = process.env.MONGO_URI || "mongodb+srv://mongo:AaBauIKXkHNPU3Wz@cluster0.eu8n9fp.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connection.on('connected', () => {
  console.log('✅ Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ Mongoose disconnected from MongoDB');
});

async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    return mongoose.connection;
  } catch (err) {
    console.error('❌ Initial connection error:', err);
    throw err;
  }
}

module.exports = connectDB;
