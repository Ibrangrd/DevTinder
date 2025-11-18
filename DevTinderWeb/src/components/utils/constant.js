// const BASE_URL = "https://devtinder-q7ng.onrender.com";
import io from "socket.io-client"
const BASE_URL = import.meta.env.DEV
  ? "http://localhost:7777"        // when running locally
  : "https://devtinder-q7ng.onrender.com";
export default BASE_URL;


export const createSocketConnection = () =>{
  if(location.hostname==="localhost"){
  return  io(BASE_URL,{
    withCredentials:true,
    transports:["websocket"],
  });
  }
  else{
    return io("https://devtinder-q7ng.onrender.com",{
      withCredentials:true,
      transports:["websocket"],
      path: "/socket.io",
    });
  }
};