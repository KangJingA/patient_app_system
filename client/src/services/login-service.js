import DoctorService from "./doctor-service";
import PatientService from "./patient-service";
const sessionStore = window.sessionStorage;

const LoginService = {
  isLoggedIn() {
    return sessionStore.getItem("username") && sessionStore.getItem("id")
      ? true
      : false;
  },

  setLoginDetails(isDoctor, result) {
    if (isDoctor) {
      sessionStore.setItem("id", result.doctor_id);
      sessionStore.setItem("username", result.doctor_name);
    } else {
      sessionStore.setItem("id", result.patient_id);
      sessionStore.setItem("username", result.patient_name);
    }
  },

  async login(id, name, isDoctor) {
    let result;

    if (isDoctor) {
      result = await DoctorService.getDoctor({
        doctor_id: id,
        doctor_name: name,
      });
    } else {
      result = await PatientService.getPatient({
        patient_id: id,
        patient_name: name,
      });
    }

    if (typeof result === "string") return result;
    console.log(result);
    this.setLoginDetails(isDoctor, result);
    return true;
  },

  logout() {
    sessionStore.removeItem("id");
    sessionStore.removeItem("username");
  },

  getID() {
    return sessionStore.getItem("id");
  },
};
export default LoginService;
