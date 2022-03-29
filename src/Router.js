import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {Register} from "./Register";

const routes = [
  {
    role: "admin",
    routes: [
      {
        route: "/register",
        component: <>Register</>,
        text: "Register",
      },
    ],
  },
  {
    role: "none",
    routes: [
      {
        route: "/login",
        component: <>Login</>,
        text: "Login",
      },
      {
        route: "/register",
        component: <Register/>,
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
              {routes[1].routes.map((route) => (
                <Route
                  key={route.route}
                  path={route.route}
                  element={route.component}
                />
              ))}
            </Routes>
          </div>
        </BrowserRouter>
      </>
    );
  }
}
