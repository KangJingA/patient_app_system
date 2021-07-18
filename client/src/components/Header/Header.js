import React from "react";
import LoginService from "../../services/login-service";
import "./Header.css";
const Header = () => {
  const logout = () => {
    LoginService.logout();
    // need to refresh page after logout
  };
  return (
    <div className="header">
      <img className="icon" src={"/images/icon.svg"} alt=""></img>
      <div className="button" onClick={logout}>
        Logout
      </div>
    </div>
  );
};

export default Header;
