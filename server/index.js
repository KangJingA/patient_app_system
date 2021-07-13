const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// import routes
const patientRoute = require("./routes/patient");
const doctorRoute = require("./routes/doctor");
const appointmentRoute = require("./routes/appointment");
dotenv.config();

// connect to database
const uri = process.env.uri;

mongoose.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to DB");
  }
);

// setting up
const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use("/patient", patientRoute);
app.use("/doctor", doctorRoute);
app.use("/appointment", appointmentRoute);

app.get("/", (req, res) => {
  res.send("ok nice");
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("server is running"));
