import "./App.css";
import { useEffect } from "react";
import AppointmentsService from "./services/appointments-service";

function App() {
  useEffect(async () => {
    let patientData = { patient_id: "P2" };
    let result = await AppointmentsService.getPatientAppointments(patientData);
    console.log(result);

    let doctorData = { doctor_id: "D1" };
    let result2 = await AppointmentsService.getDoctorAppointments(doctorData);
    console.log(result2);

    let doctorDateData = { doctor_id: "D1", date: "08 Apr 2018" };
    let result3 = await AppointmentsService.getDoctorAppointmentsByDate(
      doctorDateData
    );
    console.log(result3);

    let fixAppointmentData = {
      patient_id: "P3",
      doctor_id: "D3",
      date: "28 may 2012",
      time: "12:00:00",
    };

    // let result4 = await AppointmentsService.fixAppointment(fixAppointmentData);
    // console.log(result4);

    let result5 = await AppointmentsService.deleteAppointment(fixAppointmentData);
    console.log(result5)
  });
  return (
    <div className="App">
      <h1>Just a test</h1>
    </div>
  );
}

export default App;
