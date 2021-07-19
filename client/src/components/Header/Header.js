import React from "react";
import { Redirect } from "react-router-dom";
import LoginService from "../../services/login-service";
import "./Header.css";
const Header = () => {
  const logout = () => {
    LoginService.logout();
    return <Redirect to="/login" />;

    // need to refresh page after logout
  };
  return (
    <div className="header">
      <img className="icon" src={"/images/icon.svg"} alt=""></img>
      <div onClick={logout}>
        Logout
      </div>
    </div>
  );
};

export default Header;
