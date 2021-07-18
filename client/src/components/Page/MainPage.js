import { useState, useEffect } from "react";
import { Switch, Route, Redirect, useParams } from "react-router-dom";
import Table from "../Table/Table";
import AppointmentsService from "../../services/appointments-service";
import LoginService from "../../services/login-service";
import QueryByDateForm from "../Form/QueryByDateForm";
import "./MainPage.css";

const MainPage = () => {
  let { id } = useParams();
  const [tableDataState, setTableDataState] = useState([]);

  let isDoctor = id[0] === "D";

  useEffect(() => {
    if (isDoctor) {
      getDoctorAppointments({ doctor_id: id });
    } else {
      getPatientAppointments({ patient_id: id });
    }
  }, []);

  useEffect(() =>{
    if (tableDataState.length === 0) return;
  }, [tableDataState])

  // do smth about the usecallback here
  const getPatientAppointments = async (patientData) => {
    const response = await AppointmentsService.getPatientAppointments(
      patientData
    );
    setTableDataState(response);
  };

  const getDoctorAppointments = async (doctorData) => {
    const response = await AppointmentsService.getDoctorAppointments(
      doctorData
    );
    setTableDataState(response);
  };

  const handleBookAppointment = () => {
    console.log("hi");
  };

  const handleDoctorDateQuery = (e) => {
    e.preventDefault();
    console.log(e);
  };
  if (!LoginService.isLoggedIn()) {
    return <Redirect to="/login" />;
  }
  return (
    <div className="MainPage">
      <h2>Hello {id}</h2>
      <div className="subheader">
        <p>Your scheduled consultations:</p>
        {!isDoctor && (
          <button className="button" onClick={handleBookAppointment}>
            Book an appointment
          </button>
        )}

        {isDoctor && (
          <QueryByDateForm
            id ={id}
            setTableDataState={setTableDataState}
          ></QueryByDateForm>
        )}
      </div>

      {tableDataState.length === 0 ? (
        "Loading Data"
      ) : (
        <Table tableDataState={tableDataState} />
      )}
    </div>
  );
};

export default MainPage;
