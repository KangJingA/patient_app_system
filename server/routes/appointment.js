const { startOfDay, endOfDay } = require("date-fns");

const router = require("express").Router();
const Appointment = require("../model/Appointment");

const parseAppointment = async (patientAppointment) => {
  return {
    doctor_id: patientAppointment.doctor_id,
    doctor_name: patientAppointment.doctor[0].doctor_name,
    patient_id: patientAppointment.patient_id,
    patient_name: patientAppointment.patient[0].patient_name,
    patient_age: patientAppointment.patient[0].patient_age,
    patient_gender: patientAppointment.patient[0].patient_gender,
    appointment_id: patientAppointment.appointment_id,
    appointment_date_time: patientAppointment.appointment_date_time,
  };
};

const getAppointments = async (patientAppointments) => {
  return Promise.all(
    patientAppointments.map((appointment) => parseAppointment(appointment))
  );
};

router.get("/", (req, res) => {
  res.send("appointment route is working");
});

router.get("/createdata", async (req, res) => {
  // not sure if the date is in correct format
  const data1 = new Appointment({
    appointment_date_time: new Date("08 Mar 2018 09:00:00"),
    doctor_id: "D1",
    patient_id: "P2",
  });

  const data2 = new Appointment({
    appointment_date_time: new Date("08 Apr 2018 10:00:00"),
    doctor_id: "D1",
    patient_id: "P1",
  });

  const data3 = new Appointment({
    appointment_date_time: new Date("08 Mar 2018 10:00:00"),
    doctor_id: "D1",
    patient_id: "P1",
  });

  const savedData1 = await data1.save();
  const savedData2 = await data2.save();
  const savedData3 = await data3.save();

  res.send(savedData1);
});

// get appointments by patient id
router.post("/patientAppointments", async (req, res) => {
  const patientAppointments = await Appointment.aggregate([
    {
      $match: {
        patient_id: req.body.patient_id,
      },
    },
    {
      $lookup: {
        from: "patients",
        localField: "patient_id",
        foreignField: "patient_id",
        as: "patient",
      },
    },
    {
      $lookup: {
        from: "doctors",
        localField: "doctor_id",
        foreignField: "doctor_id",
        as: "doctor",
      },
    },
  ]);

  const parsedData = await getAppointments(patientAppointments);
  res.header('Access-Control-Allow-Origin', "*")
  res.send(parsedData);
});

// get appointments by doctor id
router.post("/doctorAppointments", async (req, res) => {
  const doctorAppointments = await Appointment.aggregate([
    {
      $match: {
        doctor_id: req.body.doctor_id,
      },
    },
    {
      $lookup: {
        from: "patients",
        localField: "patient_id",
        foreignField: "patient_id",
        as: "patient",
      },
    },
    {
      $lookup: {
        from: "doctors",
        localField: "doctor_id",
        foreignField: "doctor_id",
        as: "doctor",
      },
    },
  ]);

  const parsedData = await getAppointments(doctorAppointments);

  res.send(parsedData);
});

// get all appointments for the given doctor and date
router.post("/doctorAppointmentsByDate", async (req, res) => {
  // smth to parse here
  const doctorAppointmentsByDate = await Appointment.aggregate([
    {
      $match: {
        doctor_id: req.body.doctor_id, // take from req.body
        appointment_date_time: {
          $gte: startOfDay(new Date(req.body.date)),
          $lt: endOfDay(new Date(req.body.date)),
        },
      },
    },
    {
      $lookup: {
        from: "patients",
        localField: "patient_id",
        foreignField: "patient_id",
        as: "patient",
      },
    },
    {
      $lookup: {
        from: "doctors",
        localField: "doctor_id",
        foreignField: "doctor_id",
        as: "doctor",
      },
    },
  ]);

  const parsedData = await getAppointments(doctorAppointmentsByDate);

  res.send(parsedData);
});

// fix appointment by patient, doctor, date and time
router.post("/appointment", async (req, res) => {
  const date_time = new Date(req.body.date + " " + req.body.time);
  const appointmentExist = await Appointment.findOne({
    patient_id: req.body.patient_id,
    doctor_id: req.body.doctor_id,
    appointment_date_time: date_time,
  });
  if (appointmentExist)
    return res.status(400).send("appointment already exists");

  // create appointment
  const appointment = new Appointment({
    patient_id: req.body.patient_id,
    doctor_id: req.body.doctor_id,
    appointment_date_time: date_time,
  });

  try {
    const savedAppointment = await appointment.save();
    console.log(savedAppointment);
    res.send(savedAppointment);
  } catch (error) {
    res.status(400).send(error);
  }
});

// cancel appointment by patient, doctor, date and time
router.delete("/appointment", async (req, res) => {
  const date_time = new Date(req.body.date + " " + req.body.time);

  const appointmentExist = await Appointment.findOne({
    patient_id: req.body.patient_id,
    doctor_id: req.body.doctor_id,
    appointment_date_time: date_time,
  });

  if (!appointmentExist)
    return res.status(400).send("appointment does not exist");

  const result = await Appointment.deleteOne({
    patient_id: req.body.patient_id,
    doctor_id: req.body.doctor_id,
    appointment_date_time: date_time,
  });

  res.send(result);
});

module.exports = router;

// $match: {
//   doctor_id: "D1", // take from req.body
//   appointment_date_time: {
//     // take from req.body
//     $gte: new Date("08 Mar 2018"),
//     $lt: new Date("09 Mar 2018"),
//   },
// },
