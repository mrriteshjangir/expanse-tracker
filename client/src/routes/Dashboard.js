import React from "react";

import Navbar from "../components/Navbar";

import ListTransaction from "./ListTransaction";

import { Link } from "react-router-dom";

export default function Dashboard() {
 
  return (
    <>
      <Navbar title="Dashboard" />
      <div className="container">
        <h3 className="text-center text-primary mt-3">Welcome to Expanse Tracker App</h3>
        <div className="row mt-3">
          <div className="col-md-4">
            <div className="alert alert-success" role="alert">
              Budget : 12000
            </div>
          </div>
          <div className="col-md-4">
            <div className="alert alert-danger" role="alert">
              Expanse : 6000
            </div>
          </div>
          <div className="col-md-4">
            <div className="alert alert-warning" role="alert">
              Remaining : 6000
            </div>
          </div>
        </div>
        <div className="d-grid mb-3">
            <Link className="btn btn-danger" to="/addTransaction" >Add Transaction</Link>
        </div>
        <ListTransaction />
      </div>
    </>
  );
}
