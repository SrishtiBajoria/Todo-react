import axios from "axios";
import React, { useState } from "react";
import "./login.css";

const Signup = () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const registerUser = async (formData) => {
    console.log("form data", formData);
    try {
      const res = await axios.post(
        "https://todo-api-srishti.herokuapp.com/api/user/register",
        formData,
        config
      );
      console.log(res.data.token);
    } catch (error) {
      console.log(error.message);
    }
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  return (
    <div>
      <body class="text-center">
        <main class="form-signin">
          <form>
            <h1 class="h3 mb-3 fw-normal">Register</h1>

            <div class="form-floating">
              <input
                type="Text"
                class="form-control"
                id="floatingInput"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="abc"
              />
              <label for="floatingInput">Name</label>
            </div>
            <div class="form-floating">
              <input
                type="email"
                class="form-control"
                id="floatingInput"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
              />
              <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating">
              <input
                type="password"
                class="form-control"
                id="floatingPassword"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Password"
              />
              <label for="floatingPassword">Password</label>
            </div>

            <div class="checkbox mb-3"></div>
            <button
              class="w-100 btn btn-lg btn-primary"
              type="button"
              onClick={() => {
                registerUser({ name, email, password });
              }}
            >
              Sign Up
            </button>
            <p>
              Already have a account.? <a href="/">Login</a>
            </p>
          </form>
        </main>
      </body>
    </div>
  );
};

export default Signup;
