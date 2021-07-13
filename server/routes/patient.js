const router = require("express").Router();
const Patient = require("../model/Patient");

router.get("/", (req, res) => {
  res.send("patient route is working");
});

router.post("/getPatient", async (req, res) => {
  //   Patient.find({}).then(function (patients) {
  //     console.log(patients);
  //   });

  const patient = await Patient.findOne({ patient_id: req.body.patient_id });

  if (!patient) {
    res.statusMessage = "patient does not exist";
    return res.status(403).end();
  }
//   console.log(typeof patient);

//   const userDetails = {
//     id: patient.patient_id,
//     name: patient.patient_name,
//     age: patient.patient_age,
//     gender: patient.patient_gender,
//   };
//   console.log(userDetails);
  res.send(patient);
});

module.exports = router;
