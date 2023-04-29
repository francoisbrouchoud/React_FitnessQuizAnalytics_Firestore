import React from "react";
import ReactDOM from "react-dom";
import AppWrapper from "./AppWrapper";
import reportWebVitals from "./reportWebVitals";

/**
 * The ReactDOM.render() method is used to render a React element into the DOM
 * in the supplied container and return a reference to the component (or returns null for stateless components).
 */
ReactDOM.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

