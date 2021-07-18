import "./FixAppointmentPopup.css";
import FixAppointmentForm from "../../components/Form/FixAppointmentForm";
const FixAppointmentPopup = ({ toggleAppointmentPopup, id }) => {
  return (
    <div className="popup">
      Fix appointment
      <FixAppointmentForm
        id={id}
        toggleAppointmentPopup={toggleAppointmentPopup}
      ></FixAppointmentForm>
    </div>
  );
};

export default FixAppointmentPopup;
