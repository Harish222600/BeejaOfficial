const mongoose = require('mongoose');
const MONGO_URI = 'mongodb://127.0.0.1:27017/learnhub'; // Replace with your MongoDB URI
exports.connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected");
  } catch (error) {
    console.error("Error while connecting server with Database");
    console.error(error);
  }
};
