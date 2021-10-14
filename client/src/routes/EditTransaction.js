import axios from "axios";
import React, { Component } from "react";
import Navbar from "../components/Navbar";
import swal from "sweetalert";

export default class EditTransaction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: "",
      desc: "",
      type: "",
      // Error List Array
      errorListG: {}
    };
    
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleErrors = (e) => {
    const { amount, desc, type } = this.state;

    let errorListL = {};

    let fromIsValid = true;

    if (!amount) {
      errorListL["amountErr"] = "Amount field can't be empty";
      fromIsValid = false;
    } else {
      if (!/^[0-9]+$/.test(amount)) {
        errorListL["amountErr"] = "This is not a valid number";
        fromIsValid = false;
      }
    }

    if (!desc) {
      errorListL["descErr"] = "Transaction details field can't be empty";
      fromIsValid = false;
    } else {
      if (!/^[A-Za-z 0-9 .₹%*-/()]+$/.test(desc)) {
        errorListL["descErr"] =
          "Write transaction details properly only allowed characters,Numbers & .₹%*-/() these specail characters";
        fromIsValid = false;
      }
    }

    if (!type) {
      errorListL["typeErr"] = "Transaction type can't be empty";
      fromIsValid = false;
    } else {
      if (type === null) {
        errorListL["typeErr"] =
          "Please select proper transaction type i.e. Budget or Expanse";
        fromIsValid = false;
      }
    }

    this.setState({ errorListG: errorListL });
    return fromIsValid;
  };

  componentDidMount() {
    axios
      .get(
        "/transaction/getTransactionAll/" +
          this.props.match.params.ind
      )
      .then((res) => {
        this.setState({
          amount: res.data.amount,
          desc: res.data.desc,
          type: res.data.type,
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
  onUpdate = (e) => {
    e.preventDefault();

    const packg = {
      amount: this.state.amount,
      desc: this.state.desc,
      type: this.state.type,
    };

    if (this.handleErrors()) {
      axios
        .put("/transaction/updateTransaction/"+this.props.match.params.ind,packg)
        .then((res) => {
          swal({
            title: "Success",
            text: "Transaction updated successfully",
            icon: "success",
            button: "Done",
          });

          this.props.history.push("/dashboard");
        })
        .catch((err) => {
          console.log(err);

          swal({
            title: "Error",
            text: "Somthing went wrong",
            icon: "error",
            button: "Okay",
          });
        });
    }
  };
  render() {
    const { amountErr, descErr, typeErr } = this.state.errorListG;
    return (
      <>
        <Navbar title="Add Transaction" />
        <div className="container">
          <h3 className="text-center text-primary mt-3">Update Transaction</h3>
          <form className="myForm mt-3" onSubmit={this.onUpdate}>
            <div className="mb-3">
              <label className="form-label">Transaction Amount</label>
              <input
                type="number"
                className="form-control"
                placeholder="Amount in Ruppes"
                name="amount"
                value={this.state.amount}
                onChange={this.onChange}
              />
            </div>
            {amountErr ? <span className="text-danger">{amountErr}</span> : ""}

            <div className="mb-3">
              <label className="form-label">Transaction Details</label>
              <textarea
                type="text"
                className="form-control"
                placeholder="e.g. For office rent"
                name="desc"
                value={this.state.desc}
                onChange={this.onChange}
              ></textarea>
            </div>
            {descErr ? <span className="text-danger">{descErr}</span> : ""}

            <div className="mb-3">
              <label className="form-label">Transaction Type</label>
              <select
                className="form-select"
                name="type"
                aria-label="Default select example"
                onChange={this.onChange}
              >
                {this.state.type === "budget" ? (
                  <option value="budget">Budget</option>
                ) : (
                  <option value="expanse">Expanse</option>
                )}
                <option value={null}>-: Select Transaction Type :-</option>
                <option value="budget">Budget</option>
                <option value="expanse">Expanse</option>
              </select>
            </div>
            {typeErr ? <span className="text-danger mb-3">{typeErr}</span> : ""}

            <div className="mb-3">
              <button className="btn btn-success me-3" type="submit">
                Update
              </button>
              <button className="btn btn-warning" type="reset">
                Reset
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }
}
