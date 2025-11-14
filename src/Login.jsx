import { useState } from "react";
import axios from "axios";
const Login = () => {
  const [email, setEmailId] = useState("dilshad@gmail.com");
  const [password, setPassword] = useState("Dilshad@111");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log("Login response:", res.data);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  return (
    <div className="flex justify-center my-40">
      <fieldset className="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend text-2xl font-bold">Login</legend>

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

        <button className="btn btn-neutral mt-4" onClick={handleLogin}>
          Login
        </button>
      </fieldset>
    </div>
  );
};

export default Login;
