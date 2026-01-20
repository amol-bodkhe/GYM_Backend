// const mongoose = require('mongoose');
// const seedRoles=require('../seed/role.seed');
// require('dotenv').config();
// const connectDB = async () => {
//   try {
//     const url=process.env.MONGO_URI;
//     console.log("URL",typeof(url))
//     await mongoose.connect(url);
//     console.log('MongoDB connected successfully');
//     seedRoles();
    
//   } catch (error) {
//     console.error('MongoDB connection failed:', error.message);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;

const mongoose = require('mongoose');
const seedRoles=require('../seed/role.seed');
const connectDB = async () => {
  try {
    console.log("Using URI:", process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    seedRoles();
    console.log("MongoDB Connected");
  } catch (err) {
    console.log("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;