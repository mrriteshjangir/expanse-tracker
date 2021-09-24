import React, { Component } from "react";
export default class ListTransaction extends Component {
  render() {
    return (
      <>
        <table class="table table-success table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Transaction Detail</th>
              <th scope="col">Amount</th>
              <th scope="col">Type</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>@mdo</td>
            </tr>
          </tbody>
        </table>
      </>
    );
  }
}
