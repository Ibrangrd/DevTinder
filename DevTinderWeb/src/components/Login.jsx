import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../utils/constant";

const Login = () => {
  const [emailId, setemailId] = useState("");
  const [password, setpassword] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [isSign, setisSign] = useState(false);
  const [errorMess, seterrorMes] = useState("");
  const [showPassword,setshowPassword] = useState("password");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logic = async () => {
    if (!isSign) {
      try {
        const res = await axios.post(
          BASE_URL + "/login",
          {
            email: emailId,
            password,
          },
          { withCredentials: true }
        );
        dispatch(addUser(res.data));
        return navigate("/feed");
      } catch (err) {
        seterrorMes("ERROR: " + err?.response?.data);
      }
    } else {
      try {
        const res = await axios.post(
          BASE_URL + "/signup",
          {
            firstName,
            lastName,
            email: emailId,
            password,
          },
          { withCredentials: true }
        );
        dispatch(addUser(res?.data));
        return navigate("/profile");
      } catch (err) {
        seterrorMes("ERROR: " + err?.response?.data);
      }
    }
  };
  return (
    <div>
      <div className="card card-border bg-base-300 w-80 lg:w-96 my-20 mx-auto">
        <div className="card-body">
          <h2 className="card-title text-3xl">Login</h2>
          {isSign && (
            <>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name</legend>
                <input
                  type="text"
                  className="input"
                  value={firstName}
                  onChange={(e) => setfirstName(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  type="text"
                  className="input"
                  value={lastName}
                  onChange={(e) => setlastName(e.target.value)}
                />
              </fieldset>
            </>
          )}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email Id</legend>
            <input
              type="text"
              className="input"
              value={emailId}
              onChange={(e) => setemailId(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <div className="input flex items-center border rounded-lg px-2 bg-base-100">
              <input
                type={showPassword}
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
              <span onClick={()=> {setshowPassword("text")}} className="text-xl cursor-pointer bg-base-100">👁️</span>
            </div>
          </fieldset>
          <div className="card-actions flex flex-col">
            <p className="text-red-500">{errorMess}</p>
            <button
              className="btn btn-neutral bg-blue-800 w-40 mx-auto"
              onClick={logic}
            >
              {!isSign ? "Login" : "Signin"}
            </button>
            {!isSign && (
              <p
                onClick={() => {
                  setisSign(true);
                }}
                className="mx-auto cursor-pointer"
              >
                Are you new here? SignIn{" "}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
