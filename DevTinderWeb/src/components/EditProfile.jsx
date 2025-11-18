import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import axios from "axios";
import { addUser } from "./utils/userSlice";
import BASE_URL from "./utils/constant";

const EditProfile = ({ data }) => {
  const dispatch = useDispatch();
  const { firstName, lastName, age, gender, about, photoUrl } = data;
  const [prefirstNamee, setprefirstName] = useState(firstName);
  const [prelastName, setpreLastName] = useState(lastName);
  const [preage, setpreage] = useState(age);
  const [pregender, setpregender] = useState(gender);
  const [preabout, setpreabout] = useState(about);
  const [prephotUrl, setprephotoUrl] = useState(photoUrl);
  const [errorMess, seterrorMess] = useState(null);
  const [showAlert,setshowAlert] = useState(false);
  const showButton = false;
  const EditProfileLogic = async () => {
    try {
      const updateUser = await axios.put(
        BASE_URL + "/profile/edit",
        {
          firstName: prefirstNamee,
          lastName: prelastName,
          age: preage,
          gender: pregender,
          about: preabout,
          photoUrl: prephotUrl,
        },
        { withCredentials: true },
        { headers: { "Content-Type": "application/json" } }
      );
      dispatch(addUser(updateUser?.data));
      setshowAlert(true);
      setTimeout(() => {
        setshowAlert(false)
      }, 2500);
    } catch (err) {
      seterrorMess(err?.response?.data)
    }
  };
  return (
    <div className="flex flex-col">
      { showAlert &&
      <div role="alert" className="z-4 alert alert-success -mb-10 w-80 mx-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Your Profile has been saved!</span>
      </div>
      }

      <div className="flex flex-col lg:flex-row justify-center lg:pr-60 lg:pl-40">
        <div className="card card-border bg-base-300 w-90 lg:w-96 my-5 mx-auto">
          <div className="card-body gap-0 pt-2 pb-2">
            <h2 className="card-title text-3xl pt-0">Edit Profile</h2>
            <fieldset className="fieldset pt-0.5">
              <legend className="fieldset-legend">First Name</legend>
              <input
                type="text"
                className="input "
                placeholder="Type here"
                value={prefirstNamee}
                onChange={(e) => setprefirstName(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset ">
              <legend className="fieldset-legend">Last Name</legend>
              <input
                type="text"
                className="input"
                placeholder="Type here"
                value={prelastName}
                onChange={(e) => setpreLastName(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Age</legend>
              <input
                type="text"
                className="input"
                placeholder="Type here"
                value={preage}
                onChange={(e) => setpreage(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Gender</legend>
              <select
                className="input"
                value={pregender}
                onChange={(e) => setpregender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Photo Url</legend>
              <input
                type="text"
                className="input"
                placeholder="Type here"
                value={prephotUrl}
                onChange={(e) => setprephotoUrl(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">About</legend>
              <input
                type="text"
                className="input"
                placeholder="Type here"
                value={preabout}
                onChange={(e) => setpreabout(e.target.value)}
              />
            </fieldset>

            <div className="card-actions flex flex-col">
              <p className="text-red-500">{errorMess}</p>
              <button
                onClick={EditProfileLogic}
                className="btn btn-neutral bg-blue-800 w-40 text-center mx-auto"
              >
                Save
              </button>
            </div>
          </div>
        </div>
        {data && (
          <Card
            user={{
              firstName: prefirstNamee,
              lastName: prelastName,
              age: preage,
              gender: pregender,
              about: preabout,
              photoUrl: prephotUrl,
            }}
            showButton={showButton}
          />
        )}
      </div>
    </div>
  );
};
export default EditProfile;
