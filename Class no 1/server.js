const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const connectMongoDB = require("./config/db");
const app = express();
const port = 5000;
const authRouter = require("./routes/authRoutes");
const todoRouter = require("./routes/todoRoutes");

 
 


// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());







 




app.get("/", (req, res) => {
  res.send("Server is running");
});

// Enable Mongoose debugging (optional)
mongoose.set("debug", true);
connectMongoDB();



app.use("/auth", authRouter);
app.use("/todos", todoRouter);




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});