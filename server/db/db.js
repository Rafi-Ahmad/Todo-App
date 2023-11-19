const mongoose = require('mongoose');

// Connect to MongoDB

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.ATLAS_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
