const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        min: 6,
        max: 255
    }
})

module.exports = mongoose.model('Patient', PatientSchema);
