import { useParams } from "react-router-dom";
import { useState, useEffect,useRef } from "react";
import BASE_URL, { createSocketConnection } from "./utils/constant";
import { useSelector } from "react-redux";
import axios from "axios";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setmessages] = useState([]);
  const [newMessage, setnewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const firstName = user?.firstName;
  const lastName = user?.lastName;
  const scrollRef = useRef(null);
  const socketRef = useRef(null);
  const fetchChatMessages = async () => {
    const data = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });
    
    const chatMessage = data?.data?.messages.map((res) => {
      const { senderId, text } = res;
      return {
        sender: senderId?._id,
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        text,
      };
    });
    setmessages(chatMessage);
  };

  useEffect(() => {
    fetchChatMessages();
  }, [targetUserId]);
  
  const ChatHeading = messages.find((res )=>{
    return (user._id !== res?.sender )
  })
   useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);


  useEffect(() => {
    if (!userId) return;
    const socket = createSocketConnection();
    socketRef.current = socket;
    socket.emit("joinChat", { firstName, userId, targetUserId });

    socket.on("newMessageReceived", ({sender, firstName,lastName, text }) => {
      setmessages((messages) => [...messages, {sender ,firstName,lastName, text }]);
    });

    return () => socket.disconnect();
  }, [userId, targetUserId]);

  const sendMessage = () => {
  // const socket = createSocketConnection();
    socketRef.current.emit("sendMessage", {
      firstName,
      lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    //  setmessages((prev) => [
    //   ...prev,
    //   { sender: userId, firstName, text: newMessage },
    // ]);
    setnewMessage("");
  };

  return (
    <div className="w-[90%] sm:w-1/2 mx-auto border sm:ml-96 border-gray-600 m-2 sm:m-5 h-[85vh] sm:h-[70vh] flex flex-col rounded-lg overflow-hidden">
      <div className="p-4 sm:p-5 border-b border-gray-600 bg-gray-800 text-white">
        <p className="text-lg sm:text-xl font-semibold">{ChatHeading?.firstName} {ChatHeading?.lastName} </p>
      </div>

      <div className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-3">
        {messages.map((msg, index) => {
          return (
            <div key={index}>
              <div
                className={`chat ${
                  user._id === msg?.sender ? "chat-end" : "chat-start"
                }`}
              >
                <div className="chat-header text-sm sm:text-base">
                  <span>{msg?.firstName + " "}</span>
                  {msg?.lastName && <span>{msg?.lastName}</span>}
                </div>
                <div className="chat-bubble text-sm sm:text-base wrap-break-words max-w-[80vw] sm:max-w-xs">
                  {msg?.text}
                </div>
              </div>
            </div>
          );
        })}
      <div ref={scrollRef}></div>
      </div>
      <div className="p-3 sm:p-5 border-t border-gray-600 flex items-center gap-2 bg-gray-900">
        <input
          value={newMessage}
          onChange={(e) => setnewMessage(e.target.value)}
          className="flex-1 border border-gray-700 bg-gray-800 text-white rounded p-2 focus:outline-none text-sm sm:text-base"
        />
        <button
          onClick={sendMessage}
          className="btn btn-secondary px-3 sm:px-5 py-2 text-sm sm:text-base"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
