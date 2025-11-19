import axios from "axios";
import { BASE_URL } from "../utils/constants";
import Usercard from "./Usercard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addFeed } from "../utils/feedSlice";

const Feed = () => {
  const dispatch = useDispatch();

  const feed = useSelector((store) => store.feed);
  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });

      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return;
  if (feed.length <= 0)
    return (
      <h1 className="text-3xl font-bold font-serif text-red-600 text-center my-10">
        No More Users found
      </h1>
    );
  return (
    feed && (
      <div className="flex justify-center my-5">
        <Usercard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
