import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Product from "pages/Product";
import ProductForm from "pages/ProductForm"
import Category from "pages/Category";
import User from "pages/User";
import Login from "pages/Login";
import CategoryForm from "pages/CategoryForm";
import UserForm from "pages/UserForm";
import authHeader from "services/AuthHeader";

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
    const Authauthenticated = () => {
      const session = sessionStorage.getItem('user');
      if (!session) {
        return false;
      } else {
        const header = authHeader()["x-access-token"]
        if (header.authResult && header.sessionsId) {
          return true
        }
        return false
      }
    }

    return (
      <>
        <Router>
          <Route exact path={"/"}>
            {
              Authauthenticated() ?
                <Redirect to={"/products"} />
                :
                <Redirect to={"/login"} />
            }
          </Route>
          {
            Authauthenticated() ?
              <>
                {/* Products Routing */}
                <Switch>
                  <Route exact sensitive path={"/products"}>
                    <Product handlerStatus={this.handlerStatus} crudStatus={this.state.crudStatus} />
                  </Route>
                  <Route sensitive
                    path={["/products/add", "/products/view/:id", "/products/edit/:id", "/products/delete/:id"]}
                    render={(props) => <ProductForm handlerStatus={this.handlerStatus} {...props} />}
                  />
                </Switch>
                {/* Categories Routing */}
                <Switch>
                  <Route exact sensitive path={"/categories"}>
                    <Category handlerStatus={this.handlerStatus} crudStatus={this.state.crudStatus} />
                  </Route>
                  <Route sensitive
                    path={["/categories/add", "/categories/view/:id", "/categories/edit/:id", "/categories/delete/:id"]}
                    render={(props) => <CategoryForm handlerStatus={this.handlerStatus} {...props} />}
                  />
                </Switch>
                {/* Users Routing */}
                <Switch>
                  <Route exact sensitive path={"/users"}>
                    <User handlerStatus={this.handlerStatus} crudStatus={this.state.crudStatus} />
                  </Route>
                  <Route sensitive
                    path={["/users/add", "/users/view/:id", "/users/edit/:id", "/users/delete/:id"]}
                    render={(props) => <UserForm handlerStatus={this.handlerStatus} {...props} />}
                  />
                </Switch>
              </>
              :
              <Redirect to={"/login"} />
          }
          <Route exact sensitive path={"/login"} component={Login} />
        </Router>
      </>
    );
  }
}

export default App;
