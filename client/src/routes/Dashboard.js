import React from "react";

import Navbar from "../components/Navbar";

import ListTransaction from "./ListTransaction";

import { Link } from "react-router-dom";

import useToken from "../components/useToken";

import TransactionHeaders from "../components/TransactionHeaders";

export default function Dashboard() {
  const { token } = useToken();
  let myDate= new Date(token.usrAccCreDate);
  return (
    <>
      <Navbar title="Dashboard" />
      <div className="container">
        <h3 className="text-center text-primary mt-3">
          Welcome to Expanse Tracker App
        </h3>
        {/* <p className="text-center text-danger mt-3">{token.usrName}</p> */}
        <div class="card mb-3">
          <div class="row g-0">
            <div class="col-md-2">
              <img
                src={`../images/${token.usrPhoto}`}
                class="img-fluid rounded-start"
                style={{ height: "150px" }}
                alt={`Profile of ${token.usrName}`}
              />
            </div>
            <div class="col-md-10">
              <div class="card-body">
                <h5 class="card-title text-danger">{token.usrName}</h5>
                <p class="card-text">{token.usrEmail}</p>
                <p class="card-text">
                  <small class="text-muted">{`${myDate.getDate()}-${myDate.getMonth() + 1}-${myDate.getFullYear()}  ${myDate.getHours()}:${myDate.getMinutes()<9?'0'+myDate.getMinutes():myDate.getMinutes()} ${myDate.getHours()>= 12 ? 'PM' : 'AM'}`}</small>
                </p>
              </div>
            </div>
          </div>
        </div>
        <TransactionHeaders />
        <div className="d-grid mb-3">
          <Link className="btn btn-danger" to="/addTransaction">
            Add Transaction
          </Link>
        </div>
        <ListTransaction />
      </div>
    </>
  );
}
