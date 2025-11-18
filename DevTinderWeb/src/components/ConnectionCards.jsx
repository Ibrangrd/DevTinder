import React from "react";
import { Link } from "react-router-dom";

const ConnectionCards = ({ data }) => {
  const { _id, photoUrl, firstName, lastName, age, gender, about, skills } = data;

  return (
    <div className="card bg-base-100 w-full max-w-4xl mx-auto flex flex-col lg:flex-row items-center border-2 border-red-200 rounded-2xl p-6 gap-6 hover:shadow-lg transition-shadow duration-300">

      {/* Image Section */}
      <figure className="flex justify-center lg:justify-start">
        <img
          className="w-32 h-32 lg:w-48 lg:h-48 xl:w-56 xl:h-56 rounded-2xl object-cover shadow-md"
          src={photoUrl}
          alt="userPhoto"
        />
      </figure>

      {/* Content Section */}
      <div className="card-body p-0 lg:p-4 flex-1 text-center lg:text-left">
        <h2 className="card-title text-xl mx-auto lg:mx-0 lg:text-2xl font-bold text-white-800">
          {firstName} {lastName}
        </h2>

        <div className="space-y-2 lg:mt-3 mt-1">
          <p className="text-base lg:text-lg text-white">
            {age} - {gender}
          </p>

          <p className="text-base lg:text-base text-white leading-relaxed">
            {about}
          </p>

          <div className="lg:mt-3 mt-1">
            <p className="text-base lg:text-base font-semibold text-white mb-1">
              Skills:
            </p>
            <p className="text-base lg:text-base text-white wrap-break-words">
              {skills}
            </p>
          </div>
        </div>
      </div>

      {/* Chat Button Section */}
      <div className="flex lg:flex-col justify-center items-center lg:items-end gap-4 lg:gap-6 mt-2 lg:mt-0">
        <Link to={"/chat/" + _id}>
          <button className="btn btn-outline btn-accent h-12 w-32 lg:w-28 text-sm lg:text-base hover:bg-accent hover:text-white transition-colors duration-300">
            Chat
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ConnectionCards;