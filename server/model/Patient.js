const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
    patient_id: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    patient_name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    patient_age: {
        type: Number,
        required: true,
    },
    patient_gender: {
        type: String,
        required: true,
        min: 6,
        max: 255
    }
})

module.exports = mongoose.model('Patient', PatientSchema);
