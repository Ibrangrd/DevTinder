import axios from "axios";
import React, { useEffect } from "react";
import BASE_URL from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import Card from "./Card";

const Feed = () => {
  const feed = useSelector((store)=>store.feed);
  const showButton = true;
  const dispatch = useDispatch();
  const feedData = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
      const data = res?.data?.users;
      dispatch(addFeed(data));
    } catch (err) {
      console.error(err);
    }
  };
    useEffect(() => {
      feedData();
    }, []);
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        { feed &&
          feed[0]?.firstName!=null ? 
          <Card user={feed[0]} showButton={showButton} /> 
          : <h1 className="text-xl text-white text-center p-8">No new user found</h1>
        }
      </div>
    );
};

export default Feed;