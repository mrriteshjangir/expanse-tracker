import axios from "axios";
import React, { Component } from "react";
import swal from "sweetalert";

export default class TransactionHeaders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
    };
  }

  componentDidMount() {
    // This will get token value from localStrorage
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);

    axios
      .get(
        "/transaction/getTransaction/" + userToken.usrEmail
      )
      .then((res) => {
        this.setState({
          transactions: res.data,
        });
      })

      .catch((err) => {
        console.log(err);
        swal({
          title: "Can't Get !",
          text: "Error while fetching amounts",
          icon: "error",
        });
      });
  }
  render() {
    let budget = 0,
      expans = 0;
    this.state.transactions.map((info) => {
      if (info.type === "budget") {
        return (budget += info.amount);
      } else {
        return (expans += info.amount);
      }
    });

    return (
      <>
        <div className="row mt-3">
          <div className="col-md-4">
            <div className="alert alert-success" role="alert">
              Budget : {budget}
            </div>
          </div>
          <div className="col-md-4">
            <div className="alert alert-danger" role="alert">
              Expanse : {expans}
            </div>
          </div>
          <div className="col-md-4">
            <div className="alert alert-warning" role="alert">
              Remaining : {budget - expans}
            </div>
          </div>
        </div>
      </>
    );
  }
}