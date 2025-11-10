import axios from 'axios';
import React, { useState } from 'react'
import BASE_URL from '../utils/constant';
import { useDispatch } from 'react-redux';
import { removeRequest } from '../utils/requestSlice';

const RequestCard = ({user}) => {
  const dispatch = useDispatch();
  const [showAlert,setshowAlert] = useState(true); 
  const {firstName,lastName,age,photoUrl,about,skills,gender} = user?.fromUserId;
  const {_id} = user;
  const requestId = _id;
  const reviewRequest =  async (status,requestId) =>{
  const data = await axios.post(`${BASE_URL}/request/review/${status}/${requestId}`, {},{withCredentials:true});
  dispatch(removeRequest(_id));
  }


  return (
    <div className=''>
      <div className="card flex flex-row bg-black w-full lg:w-96 shadow-lg rounded-xl mx-auto mt-5 border-2 border-red-200 hover:border-blue-400 transition-all duration-300 hover:shadow-xl ">
  { photoUrl &&
  <figure className="m-4">
    <img className='w-28 h-28 rounded-full object-cover border-2 border-gray-200'
      src={photoUrl}
      alt="User Photo" />
  </figure>
  }
  <div className="card-body p-4">
    <h2 className="card-title text-xl font-bold text-white">
      {firstName} {lastName} 
    </h2>

    {
    age&&gender&&    
    <p className="text-white text-sm">{age} • {gender}</p>
    }
    <p className="text-white mt-2 text-sm"><span className="font-semibold">Skills:</span> {skills}</p>
    <p className="text-white text-sm mt-2 line-clamp-2">{about}</p>
    <div className="card-actions justify-end mt-4 gap-2">
      <div className="flex gap-3">
  <button
    onClick={() => reviewRequest("accepted", _id)}
    className="btn btn-success text-white w-24 h-10 min-h-0 rounded-lg 
    shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 
    bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
  >
    Accept
  </button>

  <button
    onClick={() => reviewRequest("rejected", _id)}
    className="btn btn-error text-white w-24 h-10 min-h-0 rounded-lg 
    shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 
    bg-linear-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700"
  >
    Reject
  </button>
</div>

    </div>
  </div>
</div>
    </div>
  )
}

export default RequestCard;