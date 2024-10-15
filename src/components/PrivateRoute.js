import React from 'react'
import Cookies from "js-cookie";
import { Navigate } from 'react-router-dom';
import { Route } from 'react-router-dom';

// console.log("From index.js ---> ",Cookies.get("loginState"))

function PrivateRoute() {
    const loginState = JSON.stringify(Cookies.get("loginState"))

    return (
        <Route
  )
}

export default PrivateRoute
