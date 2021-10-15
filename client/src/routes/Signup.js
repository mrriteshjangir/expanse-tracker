import React, { Component } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import swal from 'sweetalert';
import axios from 'axios';
import md5 from 'md5';


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
        errorListG:{},

        // To verify email

        emailVerify:''
    }
  }

  onChange=(e)=>{
      this.setState({[e.target.name]:e.target.value});
  }
  onFileChange=(e)=>{
      this.setState({photo:e.target.files[0]});

      if(e.target.files[0].size>1000000)
      {
        swal("File is too big!", "Upload files below or equal to 2mb");
        e.target.value = null;
        this.setState({photo:null});
      }
  }

  handleValidation=(e)=>{
      const{name,email,password,conf_pass,photo}=this.state;

      let errorList={};

      let fromIsValid=true;

      if(!photo || photo===null)
      {
        errorList['picErr']="Photo could not be empty";
        fromIsValid=false;
      }
     
      
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
          // if(!/^\w+([ -]?\w+)*@\w+([ -]?\w+)*( \w{2,3})+$/.test(email)){
          //   errorList['emailErr']="Wrong formate of email";
          //   fromIsValid=false;
          // }
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
        if(!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{1,}$/.test(conf_pass)){
          errorList['conf_passErr']="Wrong formate of password";
          fromIsValid=false;
        }
        if(conf_pass.length<6)
        {
          errorList['conf_passErr']="Password length could not be less than 6";
          fromIsValid=false;
        }
        else if(conf_pass.length>15)
        {
          errorList['conf_passErr']="Password length could not be more than 15";
          fromIsValid=false;
        }
      }

      this.setState({errorListG:errorList})
      return fromIsValid;
  }


  onSubmit=(e)=>{
    e.preventDefault();

    const formData=new FormData();

    formData.append('photo',this.state.photo);
    formData.append('name',this.state.name);
    formData.append('email',this.state.email);
    formData.append('password',md5(this.state.password));

    if(this.state.password===this.state.conf_pass)
    {
      if(this.handleValidation())
      { 
        axios
          .get("/signup/verify"+this.state.email)
          .then((res)=>{
            this.setState({
              emailVerify:res.data.email,
            });
          })
          .catch((err)=>{
            console.log(err);
          })

        if(this.state.emailVerify!==this.state.email)
        {
          axios
          .post("/signup/create",formData)
            .then((res)=>{

              this.setState=({
                name:"",
                email:"",
                password:"",
                conf_pass:""
              });

              swal({
                title: "Success!",
                text: "Data added successfully!",
                icon: "success",
              });

              // Redirect on other page
              this.props.history.push("/signin");

            })
            .catch((err)=>{
              console.log(err);

              swal({
                title: "Error!",
                text: "Something went wrong!",
                icon: "error",
              });

            })
        }
        else
        {
          swal({
            title: "Error!",
            text: "This email is already in use",
            icon: "warning",
          });
        }

      }
    }
    else
    {
      swal({
        title: "Error!",
        text: "Password didn't matched",
        icon: "error",
      });
    }

  }

  render() {
    const{nameErr,passErr,emailErr,conf_passErr,picErr}=this.state.errorListG;

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
              accept=".png,.jpg,.jpeg" 
              onChange={this.onFileChange} />
            </div>
            {picErr?
                <span className="text-danger mt-1">
                  {picErr}
                </span>
              :""
            }
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
                type="password"
                className="form-control"
                placeholder="********"
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
