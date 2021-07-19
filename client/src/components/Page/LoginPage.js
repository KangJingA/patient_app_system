import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import LoginForm from "../Form/LoginForm"
import LoginService from "../../services/login-service";
import "./LoginPage.css";

const LoginPage = () => {
  
  const [loggedIn, setLoggedIn] = useState(false);

  if (loggedIn) {
    return <Redirect to={"/" + LoginService.getID()} />;
  }

  return (
    <div className="LoginPage">
      <h1>Patient Appointment System</h1>
      <LoginForm setLoggedIn={setLoggedIn}/>
    </div>
  );
};

export default LoginPage;
