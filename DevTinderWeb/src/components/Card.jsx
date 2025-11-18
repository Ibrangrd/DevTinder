import axios from 'axios';
import React from 'react'
import BASE_URL from './utils/constant';
import { useDispatch } from 'react-redux';
import { removeFeed } from './utils/feedSlice';

const Card = ({user ,showButton}) => {
  const {_id,firstName,lastName,age,photoUrl,about,skills,gender} = user;
  const dispatch = useDispatch();
  const sendRequest = async(status,toUserId)=>{
  const data = await axios.post(BASE_URL+"/request/send/"+status+"/"+toUserId,{},{withCredentials:true})
  dispatch(removeFeed(toUserId));
  }

  return (
      <div className="card bg-base-300 w-90 lg:w-96 shadow-xl mx-auto my-10 border-2 border-blue-200 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-101">
  { photoUrl &&
  <figure className="h-64 overflow-hidden">
    <img
      className="w-full h-full object-cover"
      src={photoUrl}
      alt="User Photo" />
  </figure>
  }
  <div className="card-body bg-base-300">
    <h2 className="card-title text-2xl font-bold text-white">
    {firstName}  {lastName} 
    </h2>

    {
    age&&gender&&    
    <p className="text-white font-medium">{age} - {gender}</p>
    }
    <div className="my-2">
      <p className="text-white font-semibold">Skills:</p>
      <p className="text-white">{skills}</p>
    </div>
    <p className="text-white">{about}</p>
    <div className="card-actions justify-end mt-4">
    { showButton &&
    <>
    <button onClick={()=>{sendRequest("interested",_id)}} className="btn bg-linear-to-r from-purple-500 to-pink-500 text-white border-0 hover:from-purple-600 hover:to-pink-600 w-24 h-11 self-center transform hover:scale-105 transition-all">Interested</button>
    <button onClick={()=>{sendRequest("ignored",_id)}} className="btn bg-linear-to-r from-blue-400 to-cyan-400 text-white border-0 hover:from-blue-500 hover:to-cyan-500 w-24 h-11 self-center transform hover:scale-105 transition-all">Ignored</button>
    </>
     }   
    </div>
  </div>
</div>
  )
}

export default Card