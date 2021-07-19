import React from "react";
import AppointmentsService from "../../services/appointments-service";
import "./Popup.css";
const DeleteAppointmentPopup = ({
  closeDeleteAppointmentPopup,
  appointmentToDelete,
}) => {
  const deleteAppointment = async () => {
    console.log(appointmentToDelete);
    const result = await AppointmentsService.deleteAppointment(
      appointmentToDelete
    );

    if (typeof result === "string") {
      console.log("error");
    } else {
      console.log("done");
      closeDeleteAppointmentPopup();
    }
  };
  return (
    <div className="popup background-black">
      <div className="popup-card-container">
        <h4>Cancel this appointment?</h4> 
        <div className="popup-button-container">
          <div className="close" onClick={closeDeleteAppointmentPopup}>Cancel</div>
          <div className="button" onClick={deleteAppointment}>
            Delete
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAppointmentPopup;
