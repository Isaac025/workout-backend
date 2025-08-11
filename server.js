require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
const workoutRoute = require("./routes/workoutRoute");
const cors = require("cors");

//express app
const app = express();


//middleware
app.use(express.json()); // to parse JSON bodies
app.use(cors()); // to enable CORS
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/workouts", workoutRoute); // use the workout route
//routes
app.get("/", (req, res) => {
  res.status(200).json({ mssg: "Welcome to the app" });
});

//listen for requests and to connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { dbName: "workout" });
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

connectDB();
