import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import DoctorService from "../../services/doctor-service";
import AppointmentsService from "../../services/appointments-service";

import "./FixAppointmentForm.css";

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

  useEffect(() => {
    getAllDoctors();
  }, []);

  const handleChange = (e, updateState) => {
    updateState(e.target.value);
  };

  const handleDoctorDateQuery = async () => {
    
    const data = {
      patient_id: id,
      doctor_id: doctorState,
      date: dateState,
      time: hrState,
    };

    const result = await AppointmentsService.fixAppointment(data);

    if (typeof result === "string") {
      console.log("error");
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
      <form
        onSubmit={handleSubmit(handleDoctorDateQuery)}
      >
        <div>
          <select value={hrState} onChange={(e) => handleChange(e, setHrState)}>
            {availHrs.map((hr) => {
              return (
                <option key={hr} value={hr}>
                  {hr}
                </option>
              );
            })}
          </select>
        </div>
        <input
          type="date"
          //   ref={register({ required: true })}
          value={dateState}
          onChange={(e) => handleChange(e, setDateState)}
        ></input>

        <select
          value={doctorState}
          onChange={(e) => handleChange(e, setDoctorState)}
        >
          {allDoctors.map((doctor) => {
            return (
              <option key={doctor.doctor_id} value={doctor.doctor_id}>
                {doctor.doctor_name}
              </option>
            );
          })}
        </select>
        <input
          className="button"
          type="submit"
          value="Fix Appointment"
        ></input>
      </form>
    </div>
  );
};

export default FixAppointmentForm;
