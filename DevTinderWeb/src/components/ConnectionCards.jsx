import React from 'react'

const ConnectionCards = ({data}) => {
  const {photoUrl,firstName,lastName,age,gender,about,skills} = data;
  return (
  <div className="card card-side bg-base-100 w-90  lg:w-4/3 items-center border-2 border-red-200 rounded-2xl">
  <figure>
    <img className='w-40 h-40 rounded-2xl'
      src={photoUrl}
      alt="userPhoto" />
  </figure>
  <div className="card-body p-2 ">
    <h2 className="card-title">{firstName} {lastName}</h2>
    <p>{age} {gender} </p>
    <p>{about}</p>
    <p>Skills: {skills}</p>
  </div>
</div>
  )
}

export default ConnectionCards
