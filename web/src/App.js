import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Product from "pages/Product";
import ProductForm from "pages/ProductForm"
import Category from "pages/Category";
import User from "pages/User";
import Login from "pages/Login";
import CategoryForm from "pages/CategoryForm";
import UserForm from "pages/UserForm";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      crudStatus: null,
    }
    this.handlerStatus = this.handlerStatus.bind(this)
  }

  handlerStatus = (val) => {
    this.setState({
      crudStatus: val
    })
  }

  render() {
    return (
      <>
        <Router>
          <Route exact path={"/"}>
            <Redirect to={"/products"} />
          </Route>
          {/* Products Routing */}
          <Switch>
            <Route exact sensitive path={"/products"}>
              <Product handlerStatus={this.handlerStatus} crudStatus={this.state.crudStatus} />
            </Route>
            <Route sensitive path={"/products/add"}>
              <ProductForm handlerStatus={this.handlerStatus} />
            </Route>
            <Route sensitive path={"/products/view/:id"}>
              <ProductForm />
            </Route>
            <Route sensitive path={"/products/edit/:id"}>
              <ProductForm handlerStatus={this.handlerStatus} />
            </Route>
            <Route sensitive path={"/products/delete/:id"}>
              <ProductForm handlerStatus={this.handlerStatus} />
            </Route>
          </Switch>
          {/* Categories Routing */}
          <Switch>
            <Route exact sensitive path={"/categories"}>
              <Category handlerStatus={this.handlerStatus} crudStatus={this.state.crudStatus} />
            </Route>
            <Route sensitive path={"/categories/add"}>
              <CategoryForm handlerStatus={this.handlerStatus} />
            </Route>
            <Route sensitive path={"/categories/view/:id"}>
              <CategoryForm />
            </Route>
            <Route sensitive path={"/categories/edit/:id"}>
              <CategoryForm handlerStatus={this.handlerStatus} />
            </Route>
            <Route sensitive path={"/categories/delete/:id"}>
              <CategoryForm handlerStatus={this.handlerStatus} />
            </Route>
          </Switch>
          {/* Users Routing */}
          <Switch>
            <Route exact sensitive path={"/users"}>
              <User handlerStatus={this.handlerStatus} crudStatus={this.state.crudStatus} />
            </Route>
            <Route sensitive path={"/users/add"}>
              <UserForm handlerStatus={this.handlerStatus} />
            </Route>
            <Route sensitive path={"/users/view/:id"}>
              <UserForm handlerStatus={this.handlerStatus} />
            </Route>
            <Route sensitive path={"/users/edit/:id"}>
              <UserForm handlerStatus={this.handlerStatus} />
            </Route>
            <Route sensitive path={"/users/delete/:id"}>
              <UserForm handlerStatus={this.handlerStatus} />
            </Route>
          </Switch>

          <Route exact sensitive path={"/login"}>
            <Login />
          </Route>

          <Route exact sensitive path={"/logout"}>
            <Redirect to="/login" />
          </Route>
        </Router>
      </>
    );
  }
}

export default App;
