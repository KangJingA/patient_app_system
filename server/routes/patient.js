const router = require("express").Router();
const Patient = require("../model/Patient");

const parsePatient = async (patient) => {
  return { patient_id: patient.patient_id, patient_name: patient.patient_name };
};

router.get("/", (req, res) => {
  res.send("patient route is working");
});

router.post("/getPatient", async (req, res) => {
  const patient = await Patient.findOne({ patient_id: req.body.patient_id });

  if (!patient) {
    res.statusMessage = "patient does not exist";
    return res.status(403).end(); // 403 forbidden cos login
  }

  const parsedData = await parsePatient(patient);
  res.send(parsedData);
});

module.exports = router;
