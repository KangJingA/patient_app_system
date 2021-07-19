import { useState } from "react";
import { useForm } from "react-hook-form";
import AppointmentsService from "../../services/appointments-service";

const QueryByDateForm = ({ id, setTableDataState }) => {
  const { handleSubmit } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
  });
  const [dateState, setDateState] = useState("");
  const handleChange = (e, updateState) => {
    updateState(e.target.value);
  };
  const handleDoctorDateQuery = async () => {
    const data = { doctor_id: id, date: dateState };
    const res = await AppointmentsService.getDoctorAppointmentsByDate(data);
    setTableDataState(res);
  };

  const getDoctorAppointments = async () => {
    const doctorData = { doctor_id: id };
    const response = await AppointmentsService.getDoctorAppointments(
      doctorData
    );
    setTableDataState(response);
  };

  return (
    <div>
      <form
        className="form-container"
        onSubmit={handleSubmit(handleDoctorDateQuery)}
      >
        <input
          type="date"
          value={dateState}
          onChange={(e) => handleChange(e, setDateState)}
        ></input>

        <input
          className="button"
          type="submit"
          onClick={handleDoctorDateQuery}
          value="Query by date"
        ></input>

        <input
          className="button"
          type="submit"
          onClick={getDoctorAppointments}
          value="Reset"
        ></input>
      </form>
    </div>
  );
};

export default QueryByDateForm;
