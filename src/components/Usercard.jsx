import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";
const Usercard = ({ user }) => {
  const { _id, firstName, lastName, about, age, gender, skills, photoUrl } =
    user;
  const dispatch = useDispatch();
  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(userId));
    } catch (err) {
      console.error("Error sending request:", err.message);
    }
  };
  if (!user) {
    return (
      <h1 className="text-3xl font-bold font-serif text-red-600">
        No More Users found
      </h1>
    );
  }
  return (
    <div className="card bg-base-300 w-80 h-155 shadow-sm">
      <figure>
        <img src={photoUrl} alt="photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {gender && age && <p>{"Gender- " + gender + " | " + "Age- " + age}</p>}
        {about && <p>{about}</p>}

        {skills && (
          <div>
            <h3 className="font-semibold">Skills:</h3>
            <div className="flex flex-wrap gap-2 my-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center text-xs px-2 py-1 bg-base-200 rounded-md border"
                  role="listitem"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="card-actions justify-center">
          <button
            className="btn btn-primary"
            onClick={() => {
              handleSendRequest("ignored", _id);
            }}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => {
              handleSendRequest("interested", _id);
            }}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default Usercard;
