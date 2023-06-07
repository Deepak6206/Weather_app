import React, { Component } from "react";
import Weather from "./Weather";
import "./App.css";
export default class App extends Component {
  render() {
    return (
      <div className="container">
        <Weather />
      </div>
    );
  }
}
