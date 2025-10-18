import React from "react";

const Login = () => {

  return (
    <div className="vh-100  d-flex justify-content-center align-items-center">
      <div className="m-5 p-5 border border-black rounded-5">
        {/* Login */}
        <div className="mb-4 d-flex justify-content-center align-items-center">
          <h2>Admin Login</h2>
        </div>

        {/* Inputs */}
        <form>

        <div className="m-1 ">
          <p>Username</p>
          <div class="input-group input-group-lg">
            <span class="input-group-text">@</span>
            <input 
                type="text" 
                placeholder="Username" 
                class="form-control" 
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
              />
          </div>
        </div>
        <button className="btn btn-primary mt-3" type="submit">
          Login
        </button>
    </form>
      </div>
    </div>
  );
};

export default Login;