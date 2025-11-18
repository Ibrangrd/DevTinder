import axios from "axios";
import React, { useEffect } from "react";
import BASE_URL from "./utils/constant";
import ConnectionCards from "./ConnectionCards";
import { useDispatch, useSelector } from "react-redux";
import {addconnections} from "./utils/connectionsSlice";
const Connections = () => {

  const dispatch = useDispatch();
   
  const userConnectionData = useSelector((store)=>store.connections);

  const allConnections = async() => {
  const connectionsData = await axios.get(BASE_URL+"/user/connections",{withCredentials:true});
  const allData = connectionsData?.data?.data;
  dispatch(addconnections(allData));

  };
  useEffect(()=>{
    allConnections();
  },[]);

  return (
    <div className="mb-5">
      <h1 className="text-blue-400 text-center py-5 text-3xl"> Your Connections</h1>
      <div className="flex justify-center">
      <div className="flex flex-col gap-5 ">
      { 
        userConnectionData && userConnectionData.length > 0  ? userConnectionData.map((res)=><ConnectionCards key={res._id} data={res}/>) 
        :<h1 className="text-xl text-white text-center p-8">You have No Connections</h1>
      }
      </div>
      </div>
    </div>
  );
};

export default Connections;
