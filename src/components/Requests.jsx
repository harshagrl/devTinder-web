import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";
import { useEffect } from "react";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);

  const reviewRequests = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error(err.message);
    }
  };
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });
      dispatch(addRequest(res?.data?.data));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;
  if (requests.length === 0)
    return (
      <h1 className="text-center my-10 text-2xl font-bold">
        No Requests found
      </h1>
    );
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold my-4 font-serif">
        Connection Requests
      </h1>
      <div className="flex flex-wrap gap-4 justify-center my-4">
        {requests.map((request) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            request.fromUserId;
          return (
            <div
              className="flex gap-4 w-1/2 p-5 rounded-lg bg-base-300 shadow-lg"
              key={_id}
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
              <div className="self-center ml-auto flex flex-col gap-2">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    reviewRequests("rejected", request._id);
                  }}
                >
                  Reject
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    reviewRequests("accepted", request._id);
                  }}
                >
                  Accept
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
