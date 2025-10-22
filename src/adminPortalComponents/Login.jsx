import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthContext";

const Login = () => {
  const [userName, setUsername] = useState("");
  const [passWord, setPassword] = useState("");
  const [message, setMessage] = useState("");
  // const [authenticated, setAuthenticated] = useState(false);
  const { setAuthenticated } = useContext(AuthContext);
  const { authenticated } = useContext(AuthContext);
  // Ensure axios sends cookies with requests
  axios.defaults.withCredentials = true;

  // useEffect(() => {
  //   async function checkLogin(){
  //     try {
  //       const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/getCurrentAdmin`)
  //       if(res.status === 200){
  //         setAuthenticated(true)
  //       }
  //     } catch {
  //       setAuthenticated(false);
  //     }
  //   }
  //   checkLogin();
  // }, [])

  async function handleLogin(e) {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/admin/login`,
        {
          username: userName,
          password: passWord,
        }
      );
      // console.log(res.data);

      if (res.status === 200 && res.data.success !== false) {
        setAuthenticated(true);
        setMessage("Login Successful");
      } else {
        setMessage("Login Failed");
      }
      // console.log(authenticated);
    } catch (err) {
      if (err.response && err.response.data) {
        setMessage(err.response.data.message || "Something went");
      } else {
        setMessage("error");
      }
    }
  }

  if (authenticated) {
    return (
      <div>
        <div>
          <h2>Admin logged in</h2>
        </div>
      </div>
    );
  }
  return (
    <div className="vh-100  d-flex justify-content-center align-items-center">
      <div className="m-5 p-5 border border-black rounded-5">
        {/* Login */}
        <div className="mb-4 d-flex justify-content-center align-items-center">
          <h2>Admin Login</h2>
        </div>

        {/* Inputs */}
        <form onSubmit={handleLogin}>
          <div className="m-1 ">
            <p>Username</p>
            <div class="input-group input-group-lg">
              <span class="input-group-text">@</span>
              <input
                type="text"
                placeholder="Username"
                class="form-control"
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <p>Password</p>
            <div class="input-group input-group-lg">
              <label for="inputPassword2" class="visually-hidden">
                Password
              </label>
              <input
                type="password"
                class="form-control"
                placeholder="Password"
                value={passWord}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <button className="btn btn-primary mt-3" type="submit">
            Login
          </button>
        </form>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
