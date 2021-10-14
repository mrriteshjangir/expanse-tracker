import React, { useState } from "react";
import propTypes from 'prop-types';

import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import swal from "sweetalert";

import md5 from 'md5';

async function loginUser(credentials) {
  return fetch("/signup/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export default function Signin({setToken}) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({ email, password });
    setToken(token);

    if (!token || token.error) {
      swal({
        title: "Error !",
        text: token.error,
        icon: "error",
        button: "Cancel",
      });
    } else {
        swal({
            title: "Success",
            text: "Login done successfully",
            icon: "success",
            buttons: true,
          })
          .then((okay) => {
            if (okay) {
                window.location = "/dashboard";
            } 
          });
      
    }
  };

  return (
    <>
      <Navbar title="Sign In" />

      <div className="container">
        <form className="myForm mt-3" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="name@example.com"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="***********"
              name="password"
              onChange={(e) => setPassword(md5(e.target.value))}
            />
          </div>
          <div className="mb-3">
            <button className="btn btn-success btn-sm me-3" type="submit">
              Login
            </button>
            <button className="btn btn-warning btn-sm" type="reset">
              Reset
            </button>
          </div>
          <Link to="/signup">New user ? Click Here to create account</Link>
        </form>
      </div>
    </>
  );
}
Signin.propTypes={
    setToken:propTypes.func.isRequired,
};