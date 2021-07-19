import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import DoctorService from "../../services/doctor-service";
import AppointmentsService from "../../services/appointments-service";

import "./Form.css";

const availHrs = [
  "8:00",
  "9:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
];

const FixAppointmentForm = ({ id, toggleAppointmentPopup }) => {
  console.log("render");
  const { register, handleSubmit } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
  });
  const [allDoctors, setAllDoctorsState] = useState([]);
  const [doctorState, setDoctorState] = useState("D1");
  const [dateState, setDateState] = useState("");
  const [hrState, setHrState] = useState("8:00");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    getAllDoctors();
  }, []);

  const handleChange = (e, updateState) => {
    updateState(e.target.value);
  };

  const handleFixAppointment = async () => {
    const data = {
      patient_id: id,
      doctor_id: doctorState,
      date: dateState,
      time: hrState,
    };
    
    const res = await AppointmentsService.fixAppointment(data);

    if (typeof res === "string") {
      setErrorMsg(res);
    } else {
      console.log("done");
      toggleAppointmentPopup();
    }
  };

  const getAllDoctors = async () => {
    const response = await DoctorService.getDoctors();
    console.log(response);
    setAllDoctorsState(response);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleFixAppointment)}>
        <div className="form-container">
          <label>Time:</label>
          <select
            className="form-dropdown"
            value={hrState}
            onChange={(e) => handleChange(e, setHrState)}
          >
            {availHrs.map((hr) => {
              return (
                <option key={hr} value={hr}>
                  {hr}
                </option>
              );
            })}
          </select>
        </div>

        <div className="form-container">
          <label>Date:</label>
          <input
            className="form-dropdown"
            type="date"
            value={dateState}
            onChange={(e) => handleChange(e, setDateState)}
          ></input>
        </div>

        <div className="form-container">
          <label>Doctor's Name: </label>
          <select
            value={doctorState}
            onChange={(e) => handleChange(e, setDoctorState)}
            className="form-dropdown"
          >
            {allDoctors.map((doctor) => {
              return (
                <option key={doctor.doctor_id} value={doctor.doctor_id}>
                  {doctor.doctor_name}
                </option>
              );
            })}
          </select>
        </div>

        <input className="button" type="submit" value="Fix Appointment"></input>
        {errorMsg && <p>{errorMsg}</p>}
      </form>
    </div>
  );
};

export default FixAppointmentForm;
