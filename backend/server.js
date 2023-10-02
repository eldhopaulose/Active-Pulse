require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const workoutRoutes = require("./routes/workout.js");
const { error } = require("console");

//express app
const app = express();

app.use(cors());

//middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//route
app.use("/api/workouts", workoutRoutes);
//listen for requiest

//Connect db
mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Connected DB &listeneing on port 4000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
