import "./Popup.css";
import FixAppointmentForm from "../../components/Form/FixAppointmentForm";
const FixAppointmentPopup = ({ toggleAppointmentPopup, id }) => {
  return (
    <div className="popup background-white">
      <div className="close" onClick={toggleAppointmentPopup}>
        Close
      </div>
      <h1>Fix an Appointment</h1>
      <FixAppointmentForm
        id={id}
        toggleAppointmentPopup={toggleAppointmentPopup}
      ></FixAppointmentForm>
    </div>
  );
};

export default FixAppointmentPopup;
