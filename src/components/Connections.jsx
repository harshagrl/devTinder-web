import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnection(res.data.data));
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.length === 0)
    return (
      <h1 className="text-center my-10 text-2xl font-bold">
        No Connections found
      </h1>
    );
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold my-4 font-serif">Connections</h1>
      <div className="flex flex-wrap gap-4 justify-center my-4">
        {connections.map((connection) => {
          const { firstName, lastName, photoUrl, age, gender, about } =
            connection;
          return (
            <div
              className="flex gap-4 w-1/2 p-5 rounded-lg bg-base-300 shadow-lg"
              key={connection._id}
            >
              <div>
                <img
                  className="w-25 h-25 object-cover rounded-full"
                  src={photoUrl}
                  alt="photo"
                />
              </div>
              <div className="text-left mx-4">
                <h2 className="text-xl font-semibold font-serif">
                  {firstName + " " + lastName}
                </h2>
                {age && gender && <p>{age + ", " + gender}</p>}
                <p>{about}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
