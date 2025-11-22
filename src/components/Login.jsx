import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
const Login = () => {
  const [email, setEmailId] = useState("shruti@gmail.com");
  const [password, setPassword] = useState("Shruti@111");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  useEffect(() => {
    // if (userData) {
    //   navigate("/");
    // }
    if (userData && isLoginForm) {
      navigate("/");
    }
  }, [userData, navigate, isLoginForm]);
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));

      return navigate("/");
    } catch (error) {
      setError(error?.response?.data || "Login failed");
    }
  };
  const handleSignup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, email, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };
  return (
    <div className="flex justify-center my-40">
      <fieldset className="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend text-2xl font-bold">
          {isLoginForm ? "Login" : "Sign up"}
        </legend>

        {!isLoginForm && (
          <>
            <label className="label text-xl my-2">First Name</label>
            <input
              type="email"
              className="input"
              placeholder="Harsh"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label className="label text-xl my-2">Last Name</label>
            <input
              type="email"
              className="input"
              placeholder="Kumar"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </>
        )}
        <label className="label text-xl my-2">Email</label>
        <input
          type="email"
          className="input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmailId(e.target.value)}
        />

        <label className="label text-xl my-2">Password</label>
        <input
          type="password"
          className="input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="text-red-600 font-semibold mt-2">{error}</p>
        <button
          className="btn btn-neutral mt-4"
          onClick={isLoginForm ? handleLogin : handleSignup}
        >
          {isLoginForm ? "Login" : "Sign up"}
        </button>
        <p
          className="cursor-pointer hover:text-gray-500 mx-auto my-2"
          onClick={() => {
            setIsLoginForm((value) => !value);
          }}
        >
          {isLoginForm ? "New user? Sign up" : "Existing user? Login"}
        </p>
      </fieldset>
    </div>
  );
};

export default Login;
