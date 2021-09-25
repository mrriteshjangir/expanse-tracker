import React, { Component } from "react";
import axios from "axios";
import swal from "sweetalert";

export default class ListTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/transaction/getTransaction")
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

  render() {
    let myList;
    let count = 1;
    if (!this.state.transactions) {
      myList = "No Transaction Found";
    } else {
      myList = this.state.transactions.map((info, index) => {
        return (
          <tr key={index}>
            <th scope="row">{count++}</th>
            <td>{info.desc}</td>
            {info.type==="budget"?
              <td className="text-success">{info.amount}</td>:
              <td className="text-danger">{info.amount}</td>
            }
            <td>{info.type}</td>
            <td>{info.date}</td>
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
            </tr>
          </thead>
          <tbody>{myList}</tbody>
        </table>
      </>
    );
  }
}