const router = require("express").Router();
const Doctor = require("../model/doctor");

router.get("/", (req, res) => {
  res.send("doctor route is working");
});

router.post("/getDoctor", async (req, res) => {
  //   Doctor.find({}).then(function (doctors) {
  //     console.log(doctors);
  //   });

  const doctor = await Doctor.findOne({ doctor_id: req.body.doctor_id });
//   const doctor = await Doctor.findOne({ doctor_age: req.body.doctor_age, doctor_gender: req.body.doctor_gender });


  if (!doctor) {
    res.statusMessage = "doctor does not exist";
    return res.status(403).end();
  }
//   console.log(typeof doctor);

//   const userDetails = {
//     id: doctor.doctor_id,
//     name: doctor.doctor_name,
//     age: doctor.doctor_age,
//     gender: doctor.doctor_gender,
//   };
//   console.log(userDetails);
  res.send(doctor);
});

module.exports = router;
