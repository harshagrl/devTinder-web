import axios from "axios";
import { BASE_URL } from "../utils/constants";
import Usercard from "./userCard";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import { addUser } from "../utils/userSlice";

const Feed = () => {
  // const dispatch = useDispatch();
  const [feedUsers, setFeedUsers] = useState([]);
  const feed = useSelector((store) => store.feed);
  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      setFeedUsers(res?.data?.data || []);
      // dispatch(addUser(res?.data?.data));
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    if (feed) {
      getFeed();
    }
  }, [feed]);

  return (
    feed && (
      <div className="flex justify-center my-5">
        <Usercard user={feedUsers[0]} />
      </div>
    )
  );
};

export default Feed;
