import React, { Component } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
export default class Signup extends Component {

  constructor(){
    super();
    this.state={
        photo:"",
        name:"",
        email:"",
        password:"",
        conf_pass:""
    }
  }

  onChange=(e)=>{
      this.setState({[e.target.name]:e.target.value});
  }
  onFileChange=(e)=>{
      this.setState({photo:e.target.files[0]});
  }


  onSubmit=(e)=>{
      
  }

  render() {
      
    return (
      <>
        <Navbar title="Sign Up" />
        <div className="container">
          <form className="myForm mt-3" onSubmit={this.onSubmit}>
            <div className="mb-3">
              <label className="form-label">Select Profile Photo</label>
              <input 
              type="file" 
              className="form-control" 
              name="photo"  
              onChange={this.onFileChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Your Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="John Deo"
                name="name"
                onChange={this.onChange}
              />
            </div>
           
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="name@example.com"
                name="email"
                onChange={this.onChange}
              />
            </div>
           
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="********"
                name="password"
                onChange={this.onChange}
              />
            </div>
            
            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="********"
                name="conf_pass"
                onChange={this.onChange}
              />
            </div>
            
            <div className="mb-3">
              <button className="btn btn-success btn-sm me-3" type="submit">
                Create Account
              </button>
              <button className="btn btn-warning btn-sm" type="reset">
                Reset
              </button>
            </div>
            <Link to="/signin">Already have an account ? Click Here</Link>
          </form>
        </div>
      </>
    );
  }
}
