import { useState, useEffect } from "react";
import { Switch, Route, Redirect, useParams } from "react-router-dom";
import Table from "../Table/Table";
import AppointmentsService from "../../services/appointments-service";
import LoginService from "../../services/login-service";

const MainPage = () => {
  let { id } = useParams();
  const [tableDataState, setTableDataState] = useState([]);
  console.log(id);
  let isDoctor = id[0] === "D";

  useEffect(() => {
    if (isDoctor) {
      getDoctorAppointments({ doctor_id: id });
    } else {
      getPatientAppointments({ patient_id: id });
    }
  }, []);

  // do smth about the usecallback here
  const getPatientAppointments = async (patientData) => {
    const response = await AppointmentsService.getPatientAppointments(
      patientData
    );

    console.log(response);
    setTableDataState(response);
  };

  const getDoctorAppointments = async (doctorData) => {
    const response = await AppointmentsService.getDoctorAppointments(
      doctorData
    );
    setTableDataState(response);
  };
  
  if (!LoginService.isLoggedIn()) {
    return <Redirect to="/login" />;
  }
  return (
    <div>
      {tableDataState.length === 0 ? (
        "Loading Data"
      ) : (
        <Table tableDataState={tableDataState} />
      )}
    </div>
  );
};

export default MainPage;
