import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register } from "./Register";
import { Login } from "./Login";

const routes = [
  {
    role: "admin",
    routes: [
      {
        route: "/register",
        component: <Register />,
        text: "Register",
      },
    ],
  },
  {
    role: "none",
    routes: [
      {
        route: "/login",
        component: <Login />,
        text: "Login",
      },
      {
        route: "/register",
        component: <Register />,
        text: "Register",
      },
    ],
  },
];

export default class Router extends Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <div className="d-flex justify-content-center mt-5">
            <Routes>
              <Route key={"/"} path={"/"} element={<Auth />} />)
            </Routes>
          </div>
        </BrowserRouter>
      </>
    );
  }
}

var Auth = () => (
  <div style={{display: "flex",flexDirection:"column",justifyContent: "space-between"}}>
    <Login />
    <Register />
  </div>
);
