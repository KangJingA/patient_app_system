import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import LoginService from "../../services/login-service";
import { useForm } from "react-hook-form";
import "./LoginPage.css";

const LoginPage = () => {
  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
  });
  const [nameState, setNameState] = useState("");
  const [idState, setIdState] = useState("");
  const [isDoctorState, setIsDoctorState] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const handleChange = (e, updateState) => {
    updateState(e.target.value);
  };
  const onSubmit = async () => {
    const res = await LoginService.login(idState, nameState, isDoctorState);
    setLoggedIn(res);
    // somehow need to refresh
  };

  if (loggedIn) {
    console.log("this is run");
    return <Redirect to={"/" + LoginService.getID()} />;
  }

  return (
    <div className="LoginPage">
      <form onSubmit={handleSubmit(onSubmit)} className="patient-form">
        <div className="form-section">
          <div className="submit-container">
            <div className="label-container">
              <label className="submit-label required">Name</label>
            </div>

            <div className="submit-errorcontainer">
              <input
                className="submit-input"
                name="Name"
                type="text"
                maxLength={7}
                // ref={register({ required: true })} // add check here to limit number of characters
                value={nameState}
                onChange={(e) => handleChange(e, setNameState)}
              />
              {/* {errors.Name && errors.Name.type === "required" && (
                <p className="submit-alert">Not Filled</p>
              )} */}
            </div>
          </div>

          <div className="submit-container">
            <label className="submit-label required">ID</label>
            <div className="submit-errorcontainer">
              <input
                className="submit-input"
                name="NRIC"
                maxLength={2}
                value={idState}
                onChange={(e) => handleChange(e, setIdState)}
                // ref={register({ required: true })}
              />
              {/* {errors.NRIC && <p className="submit-alert">Invalid NRIC</p>} */}
            </div>
          </div>

          <div className="submit-container">
            <div className="submit-main-radio-container-horizontal">
              <div className="submit-radio-input-container">
                <input
                  className="submit-radio"
                  type="checkbox"
                  id="genderOthers"
                  value={isDoctorState}
                  onChange={(e) => {
                    setIsDoctorState(!isDoctorState);
                  }}
                  name="gender"
                />
              </div>
            </div>
          </div>
        </div>

        <input className="button" type="submit" value="Login" />
      </form>
    </div>
  );
};

export default LoginPage;
