import React, { Component } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

export default class ListTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      dateDMY: '',
    };
  }

  componentDidMount() {
    // This will get token value from localStrorage
    const tokenString=localStorage.getItem('token');
    const userToken=JSON.parse(tokenString);

    axios
      .get("/transaction/getTransaction/"+userToken.usrEmail)
      .then((res) => {
        this.setState({
          transactions: res.data,
        });
      })
      .catch((er) => {
        console.log(er);
        swal({
          title: "Error",
          text: "Transaction not found",
          icon: "error",
        });
      });
  }

  OnDelete(id) {
    swal({
      title: "Are you sure ?",
      text: "Do u want to delete this Transaction.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete("/transaction/deleteTransaction/" + id)
          .then((res) => {
            swal({
              title: "Success",
              text: "Transaction deleted successfully.",
              icon: "success",
              button: "Done",
            }).then((Done) => {
              window.location = "/dashoboard";
            });
          })
          .catch((err) => {
            swal({
              title: "Error",
              text: "Transaction not deleted",
              icon: "error",
            });
          });
      }
    });
  }

  render() {
    let myList;
    let count = 1;
    if (!this.state.transactions) {
      myList = "No Transaction Found";
    } else {
      myList = this.state.transactions.map((info, index) => {
        let date= new Date(info.date);
        return (
          <tr key={index}>
            <th scope="row">{count++}</th>
            <td>{info.desc}</td>
            {info.type === "budget" ? (
              <td className="text-success">{info.amount}</td>
            ) : (
              <td className="text-danger">{info.amount}</td>
            )}
            <td>{info.type}</td>
            
            <td>{`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}  ${date.getHours()}:${date.getMinutes()<9?'0'+date.getMinutes():date.getMinutes()} ${date.getHours()>= 12 ? 'PM' : 'AM'}`}</td>
            <td>
              <div
                className="btn-group"
                role="group"
                aria-label="Basic example"
              >
                <Link
                  className="btn btn-outline-warning"
                  to={`/editTransaction/${info._id}`}
                >
                  <FaEdit />
                </Link>
                <button
                  className="btn btn-outline-danger"
                  type="button"
                  onClick={this.OnDelete.bind(this, info._id)}
                >
                  <FaTrashAlt />
                </button>
              </div>
            </td>
          </tr>
        );
      });
    }
    return (
      <>
        <table className="table table-success table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Transaction Detail</th>
              <th scope="col">Amount</th>
              <th scope="col">Type</th>
              <th scope="col">Date</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>{myList}</tbody>
        </table>
      </>
    );
  }
}
