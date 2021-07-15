import axios from "axios";
import React, { useEffect, useState } from "react";
// import "./login.css";

const Login = () => {
  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      window.location.href = "/Home";
    }
  });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const loginUser = async (formData) => {
    console.log("form data", formData);
    try {
      const res = await axios.post(
        "https://todo-api-srishti.herokuapp.com/api/user/login",
        formData,
        config
      );
      console.log(res.data.token);
      if (res.data.token) {
        window.location.href = "/Home";
      }
      localStorage.setItem("token", res.data.token);
    } catch (error) {
      console.log(error.message);
    }
  };

  // CORS
  // Cors cross origin error
  // HTTP => HTTPS ya vice versa pe jate h
  // HTTP=>react local
  // HTTP => node local
  // Heavy Cors

  // useState
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <body class="text-center">
      <main className="form-signin">
        <form>
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

          <div className="form-floating">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label for="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
            />
            <label for="floatingPassword">Password</label>
          </div>

          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div>
          <button
            className="w-100 btn btn-lg btn-primary"
            type="button"
            onClick={() => {
              loginUser({ email, password });
            }}
          >
            Sign in
          </button>
          <p>
            Haven't registered ? <a href="/signup">Sign Up</a>
          </p>
        </form>
      </main>
    </body>
  );
};

export default Login;
