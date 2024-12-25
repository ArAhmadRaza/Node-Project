const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const MONGO_URI = process.env.MONGO_URI;




// Function to connect MongoDB with mongoose
const connectMongoDB = async () => {
    try {
        console.log("Mongo_URI",MONGO_URI);
      console.log("Connecting to MongoDB...");
      await mongoose.connect(MONGO_URI || "mongodb://localhost:27017/todosDB"); // Removed deprecated options
      console.log("MongoDB Connected");
      console.log(
        "----------------------- ----------__--___--____--___---____---____---___"
      );
    } catch (error) {
      console.error("MongoDB Connection Error: ", error.message);
      process.exit(1); // Exit the process if MongoDB connection fails
    }
  };
  

module.exports = connectMongoDB;