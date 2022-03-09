import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Product from "pages/Product";
import Category from "pages/Category";
import User from "pages/User";
import Login from "pages/Login";

function App() {
  return (
    <>
      <Router>
        <Route exact sensitive path={"/products"}>
          <Product />
        </Route>
        <Route exact sensitive path={"/categories"}>
          <Category />
        </Route>
        <Route exact sensitive path={"/users"}>
          <User />
        </Route>
        <Route exact sensitive path={"/login"}>
          <Login />
        </Route>
        <Route exact sensitive path={"/logout"}>
          Logout
        </Route>
      </Router>
    </>
  );
}

export default App;
