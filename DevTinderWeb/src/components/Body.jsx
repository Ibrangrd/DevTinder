import React, { useEffect } from 'react'
import NavBar from './NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import BASE_URL from "../utils/constant";
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'

const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const userData = useSelector((store)=>store.user)
  const fetchData = async () =>{
  try{  
  const res = await axios.get(BASE_URL+"/profile/view",{withCredentials:true});
  dispatch(addUser(res.data));
  }
  catch(err){
    if(err.status===401)
    {
      navigate("/login");  
    }
  }
  };

  useEffect(()=>{
    if(!userData) fetchData();
    },
    []);
  
  return (
    <div className="flex flex-col min-h-screen">
     <NavBar/>
    <main className="grow">
     <Outlet/>
     </main>
     <Footer/>
    </div>
  )
}

export default Body;
