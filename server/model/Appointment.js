const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const AppointmentSchema = new mongoose.Schema({
    appointment_id: {
        type: Number,
    },
    appointment_date_time: {
        type: Date,
        required: true,
    },
    doctor_id: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    patient_id: {
        type: String,
        required: true,
        min: 6,
        max: 255
    }
})

AppointmentSchema.plugin(AutoIncrement, {id:'order_seq',inc_field: 'appointment_id'});

module.exports = mongoose.model('Appointment', AppointmentSchema);
