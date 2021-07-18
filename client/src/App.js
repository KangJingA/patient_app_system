import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "./components/Header/Header";
import MainPage from "./components/Page/MainPage";
import LoginService from "./services/login-service";

function App() {
  if (!LoginService.isLoggedIn()) {
    return <Redirect to="/login" />;
  }
  return (
    <div className="App">
      <Route path="/" component={Header} />
  
      <Switch>
        <Route exact path="/:id" component={MainPage} />
      </Switch>
    </div>
  );
}

export default App;

// useEffect(async () => {
//   let data1 = { doctor_id: "D1" };
//   let result1 = await DoctorService.getDoctor(data1);
//   console.log(result1);

//   let data2 = { patient_id: "P4" };
//   let result2 = await PatientService.getPatient(data2);
//   console.log(result2);
// });

//     let fixAppointmentData = {
//       patient_id: "P3",
//       doctor_id: "D3",
//       date: "28 may 2012",
//       time: "12:00:00",
//     };

//     // let result4 = await AppointmentsService.fixAppointment(fixAppointmentData);
//     // console.log(result4);

//     let result5 = await AppointmentsService.deleteAppointment(
//       fixAppointmentData
//     );
//     console.log(result5);
