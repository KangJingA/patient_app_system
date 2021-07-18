import "./FixAppointmentPopup.css";
import FixAppointmentForm from "../../components/Form/FixAppointmentForm";
const FixAppointmentPopup = ({ toggleAppointmentPopup }) => {
  return (
    <div className="popup">
      Fix appointment
      <FixAppointmentForm></FixAppointmentForm>
    </div>
  );
};

export default FixAppointmentPopup;
