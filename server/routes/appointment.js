const router = require("express").Router();
const Appointment = require("../model/Appointment");

const parsePatientAppointment = async (patientAppointment) => {
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
    patientAppointments.map((appointment) =>
      parsePatientAppointment(appointment)
    )
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

// for doctor
// get all appointments for the given doctor and date
// change to post
router.get("/patientappointments", async (req, res) => {
  const patientAppointments = await Appointment.aggregate([
    {
      $match: {
        doctor_id: "D1", // take from req.body
        appointment_date_time: {
          // take from req.body
          $gte: new Date("08 Mar 2018"),
          $lt: new Date("09 Mar 2018"),
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

  const parsedData = await getAppointments(patientAppointments);

  res.send(parsedData);
});

// fix appointment by patient, doctor, date and time
// works
router.post("/fixappointment", async (req, res) => {
  const date_time = new Date(req.body.date + " " + req.body.time);
  const appointmentExist = await Appointment.findOne({
    patient_id: req.body.patient_id,
    doctor_id: req.body.doctor_id,
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

module.exports = router;

//   const patientAppointments = await Appointment.find(

//     // answers question 2
//     {
//       //query today up to tonight
//       appointment_date_time: {
//         $gte: new Date("08 Mar 2018"),
//         $lt: new Date("09 Mar 2018"),
//       },
//       doctor_id: "D1",
//     //   patient_id: "P1"
//     }

//   );
