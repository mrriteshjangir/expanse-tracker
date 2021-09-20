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
        conf_pass:"",

        // To handle my errors
        errorListG:{}
    }
  }

  onChange=(e)=>{
      this.setState({[e.target.name]:e.target.value});
  }
  onFileChange=(e)=>{
      this.setState({photo:e.target.files[0]});
  }

  handleValidation=(e)=>{
      const{name,email,password,conf_pass}=this.state;

      let errorList={};

      let fromIsValid=true;

      if(!name)
      {
        errorList['nameErr']="Name could not be empty";
        fromIsValid=false;
      }
      else
      {
          if(!/^[A-Za-z ]+$/.test(name)){
            errorList['nameErr']="Wrong formate of name";
            fromIsValid=false;
          }
      }
      if(!email)
      {
        errorList['emailErr']="Email could not be empty";
        fromIsValid=false;
      }
      else
      {
          if(!/^(([<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            errorList['emailErr']="Wrong formate of email";
            fromIsValid=false;
          }
      }
      if(!password)
      {
        errorList['passErr']="Password could not be empty";
        fromIsValid=false;
      }
      else
      {
          if(!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{1,}$/.test(password)){
            errorList['passErr']="Wrong formate of password";
            fromIsValid=false;
          }
          if(password.length<6)
          {
            errorList['passErr']="Password length could not be less than 6";
            fromIsValid=false;
          }
          else if(password.length>15)
          {
            errorList['passErr']="Password length could not be more than 15";
            fromIsValid=false;
          }
      }
      if(!conf_pass)
      {
        errorList['conf_passErr']="Conf pass could not be empty";
        fromIsValid=false;
      }
      else
      {
          if(!/^([6-9]{1,})[0-9]{9,}$/.test(conf_pass)){
            errorList['conf_passErr']="Wrong formate of mobile";
            fromIsValid=false;
          }
          if(conf_pass.length<10)
          {
            errorList['conf_passErr']="mobile no could not be less than 10";
            fromIsValid=false;
          }
          else if(conf_pass.length>10)
          {
            errorList['conf_passErr']="mobile no could not be more than 10";
            fromIsValid=false;
          }
      }

      this.setState({errorListG:errorList})
      return fromIsValid;
  }


  onSubmit=(e)=>{
    e.preventDefault();

    if(this.handleValidation())
    {
      alert("Form summited without errors");
    }
    else
    {
      alert("form submitted with errors");
    }

  }

  render() {
    const{nameErr,passErr,emailErr,conf_passErr}=this.state.errorListG;
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
            {nameErr?
                <span className="text-danger mt-1">
                  {nameErr}
                </span>
              :""
            }
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
            {emailErr?
                <span className="text-danger mt-1">
                  {emailErr}
                </span>
              : ""
            }
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
            {passErr?
                <span className="text-danger mt-1">
                  {passErr}
                </span>
              : ""
            }
            <div className="mb-3">
              <label className="form-label">Confirm Password</label>
              <input
                type="tel"
                className="form-control"
                placeholder="xxxxxxxxx"
                name="conf_pass"
                onChange={this.onChange}
              />
            </div>
            {conf_passErr?
                <span className="text-danger mt-1">
                  {conf_passErr}
                </span>
              : ""
            }
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
