const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
  doctor_id: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  doctor_name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  doctor_age: {
    type: Number,
    required: true,
  },
  doctor_gender: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  doctor_specialization: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
});

module.exports = mongoose.model("Doctor", DoctorSchema);
