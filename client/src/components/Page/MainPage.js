import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import LoginService from "../../services/login-service";
// import { useState, useEffect } from "react";
// import Table from "../Table/Table";
// import AppointmentsService from "../../services/appointments-service";
const MainPage = () => {
  // check if doctor or patient
  // const [tableDataState, setTableDataState] = useState([]);

  // useEffect(() => {
  //     getPatientAppointments({ patient_id: "P1" })

  // },[]);

  // // do smth about the usecallback here
  // const getPatientAppointments = async (patientData) => {
  //   const response = await AppointmentsService.getPatientAppointments(
  //     patientData
  //   );

  //   console.log(response)
  //   setTableDataState(response);
  // };

  // const getDoctorAppointments = async (doctorData) => {
  //   const response = await AppointmentsService.getPatientAppointments(
  //     doctorData
  //   );
  //   setTableDataState(response);
  // };
  // return <div>{tableDataState.length === 0 ? "Loading Data" : <Table tableDataState={tableDataState}/>}</div>;

  if (!LoginService.isLoggedIn()) {
    return <Redirect to="/login" />;
  }

  return <div>hey</div>;
};

export default MainPage;

// // import AppointmentsService from "./services/appointments-service";
// import PatientService from "./services/patient-service";
// import DoctorService from "./services/doctor-service";
