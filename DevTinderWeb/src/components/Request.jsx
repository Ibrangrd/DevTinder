import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BASE_URL from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest } from '../utils/requestSlice'
import RequestCard from './RequestCard'

const Request = () => {
  const allRequest = useSelector((store)=>store.request);
  const [showMess,setshowMess] = useState(false);
  const dispatch = useDispatch(); 
  const requestHandle = async () => {
  const requestData = await axios.get(BASE_URL+"/user/requests/received",{withCredentials:true});
  const allRequestData = requestData?.data?.data;
  // console.log(allRequestData);
  dispatch(addRequest(allRequestData));
  } 
  useEffect(()=>{
    requestHandle();
  },[]);
  return (
    <div>
      <p className='text-blue-400 text-center text-2xl py-5 lg:text-3xl'> Requests</p>
        <div className='pb-20'>
      {
        allRequest && allRequest.length>0 ? allRequest.map((res)=> <RequestCard key={res._id} user={res}/>)
         : <h1 className="text-xl text-white text-center p-8">No pending Request</h1>
      }
      </div>
    </div>
  )
}

export default Request
