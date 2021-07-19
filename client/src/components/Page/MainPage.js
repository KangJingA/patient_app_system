import { useState, useEffect } from "react";
import { Redirect, useParams, Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import FixAppointmentPopup from "../../components/Popup/FixAppointmentPopup";
import DeleteAppointmentPopup from "../../components/Popup/DeleteAppointmentPopup";
import Table from "../Table/Table";
import AppointmentsService from "../../services/appointments-service";
import LoginService from "../../services/login-service";
import QueryByDateForm from "../Form/QueryByDateForm";
import "./MainPage.css";

const MainPage = () => {
  let { id } = useParams();
  let username = window.sessionStorage.getItem("username");
  const [appointmentToDelete, setAppointmentToDelete] = useState({});
  const [tableDataState, setTableDataState] = useState([]);
  const [isPopupDisplayed, setIsPopupDisplayed] = useState(false);

  let isDoctor = id[0] === "D";

  useEffect(() => {
    if (isPopupDisplayed) return;
    if (Object.getOwnPropertyNames(appointmentToDelete).length !== 0) return;
    console.log("rerendered");

    if (isDoctor) {
      getDoctorAppointments({ doctor_id: id });
    } else {
      getPatientAppointments({ patient_id: id });
    }
  }, [isPopupDisplayed, appointmentToDelete]);

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

  const closeDeleteAppointmentPopup = () => {
    setAppointmentToDelete({});
  };

  if (!LoginService.isLoggedIn()) {
    return <Redirect to="/login" />;
  }
  return (
    <div className="MainPage">
      <Link to="/login">
        <Header />
      </Link>
      <h1>Hello {username}</h1>
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
        <Table
          tableDataState={tableDataState}
          setAppointmentToDelete={setAppointmentToDelete}
        />
      )}

      {isPopupDisplayed && (
        <FixAppointmentPopup
          id={id}
          toggleAppointmentPopup={toggleAppointmentPopup}
        />
      )}

      {Object.getOwnPropertyNames(appointmentToDelete).length !== 0 && (
        <DeleteAppointmentPopup
          closeDeleteAppointmentPopup={closeDeleteAppointmentPopup}
          appointmentToDelete={appointmentToDelete}
        />
      )}
    </div>
  );
};

export default MainPage;
