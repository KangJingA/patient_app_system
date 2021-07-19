import React, { useState } from "react";
import { useForm } from "react-hook-form";
import LoginService from "../../services/login-service";
import "./Form.css";
export const LoginForm = ({ setLoggedIn }) => {
  const { register, handleSubmit } = useForm();

  const [errorMsg, setErrorMsg] = useState("");
  const onSubmit = async ({ name, id, isDoctor }) => {
    const res = await LoginService.login(id, name, isDoctor);
    console.log(res);
    if (typeof res === "string") {
      setErrorMsg(res);
      return;
    } else {
      console.log(res);
      setLoggedIn(res);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-section">
        <div className="submit-container">
          <input
            className="login-input input-top"
            name="id"
            placeholder="Id"
            {...register("id", { required: true })}
          />
        </div>

        <div className="submit-container">
          <input
            className="login-input input-bottom"
            name="name"
            type="text"
            placeholder="Name"
            {...register("name", { required: true })}
          />
        </div>
        <div className="form-checkboxcontainer">
          <input
            className="checkbox"
            name="isDoctor"
            type="checkbox"
            id="genderOthers"
            {...register("isDoctor")}
          />
          <label>Doctor login</label>
        </div>
      </div>

      <input className="button" type="submit" value="Login" />

      {errorMsg && <p>{errorMsg}</p>}
    </form>
  );
};

export default LoginForm;
