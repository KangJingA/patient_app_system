import "./Popup.css";
import FixAppointmentForm from "../../components/Form/FixAppointmentForm";
const FixAppointmentPopup = ({ toggleAppointmentPopup, id }) => {
  return (
    <div className="popup background-white">
      Fix appointment
      <FixAppointmentForm
        id={id}
        toggleAppointmentPopup={toggleAppointmentPopup}
      ></FixAppointmentForm>
    </div>
  );
};

export default FixAppointmentPopup;
