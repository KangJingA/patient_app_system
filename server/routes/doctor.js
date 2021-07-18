const router = require("express").Router();
const Doctor = require("../model/doctor");

const parseDoctor = async (doctor) => {
  return { doctor_id: doctor.doctor_id, doctor_name: doctor.doctor_name };
};

const getDoctors = async (doctors) => {
  return Promise.all(doctors.map((doctor) => parseDoctor(doctor)));
};

router.get("/", (req, res) => {
  res.send("doctor route is working");
});

// getDoctors
router.get("/getDoctors", async (req, res) => {
  const doctors = await Doctor.find({});
  console.log(doctors)
  const parsedData = await getDoctors(doctors);
  res.send(parsedData);
});

router.post("/getDoctor", async (req, res) => {
  const doctor = await Doctor.findOne({
    doctor_id: req.body.doctor_id,
    doctor_name: req.body.doctor_name,
  });

  if (!doctor) {
    res.statusMessage = "invalid name and id";
    return res.status(403).end(); // 403 forbidden cos login
  }

  const parsedData = await parseDoctor(doctor);

  res.send(parsedData);
});

module.exports = router;
