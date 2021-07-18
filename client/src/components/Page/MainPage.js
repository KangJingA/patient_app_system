import { useState, useEffect } from "react";
import { Switch, Route, Redirect, useParams } from "react-router-dom";
import FixAppointmentPopup from "../../components/Popup/FixAppointmentPopup";
import Table from "../Table/Table";
import AppointmentsService from "../../services/appointments-service";
import LoginService from "../../services/login-service";
import QueryByDateForm from "../Form/QueryByDateForm";
import "./MainPage.css";

const MainPage = () => {
  let { id } = useParams();
  const [tableDataState, setTableDataState] = useState([]);
  const [isPopupDisplayed, setIsPopupDisplayed] = useState(false);

  let isDoctor = id[0] === "D";

  useEffect(() => {
    if (isDoctor) {
      getDoctorAppointments({ doctor_id: id });
    } else {
      getPatientAppointments({ patient_id: id });
    }
  }, []);

  useEffect(() => {
    if (tableDataState.length === 0) return;
    if (isPopupDisplayed) return;
    // do the display trick to refresh creation of table
  }, [tableDataState,isPopupDisplayed]);

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

  const toggleAppointmentPopup = () => {
    setIsPopupDisplayed(!isPopupDisplayed);
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
          <button className="button" onClick={toggleAppointmentPopup}>
            Book an appointment
          </button>
        )}

        {isDoctor && (
          <QueryByDateForm
            id={id}
            setTableDataState={setTableDataState}
          ></QueryByDateForm>
        )}
      </div>

      {tableDataState.length === 0 ? (
        "Loading Data"
      ) : (
        <Table tableDataState={tableDataState} />
      )}

      {isPopupDisplayed && (
        <FixAppointmentPopup
          id={id}
          toggleAppointmentPopup={toggleAppointmentPopup}
        />
      )}
    </div>
  );
};

export default MainPage;
