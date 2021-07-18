import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import DoctorService from "../../services/doctor-service";
import "./FixAppointmentForm.css";
const FixAppointmentForm = ({ id }) => {
  const { register, handleSubmit } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
  });
  const [allDoctors, setAllDoctorsState] = useState([]);
  const [doctorState, setDoctorState] = useState("D1");
  const [dateState, setDateState] = useState("");

  useEffect(() => {
    getAllDoctors();
  }, []);

  // time
  const handleChange = (e, updateState) => {
    updateState(e.target.value);
  };
  const handleDoctorDateQuery = async () => {
    console.log("hey");
  };

  const getAllDoctors = async () => {
    const response = await DoctorService.getDoctors();
    console.log(response);
    setAllDoctorsState(response);
  };

  return (
    <>
      <form className="fixappointmentform" onSubmit={handleSubmit(handleDoctorDateQuery)}>
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
              <option key={doctor.doctor_id} value={doctor.doctor_name}>
                {doctor.doctor_name}
              </option>
            );
          })}
        </select>
        <input
          className="button"
          type="submit"
          onClick={handleDoctorDateQuery}
          value="Fix Appointment"
        ></input>
      </form>
    </>
  );
};

export default FixAppointmentForm;
