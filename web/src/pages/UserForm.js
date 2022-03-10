import React, { Component } from "react";
import Button from "elements/Button";
import Navigation from "parts/Navigation";
import { sha256 } from "js-sha256";

export default class UserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postData: null,
            mode: null,
        }
    }

    componentDidMount() {
        document.title = `${document.location.pathname.split("/")[2]} User | HAIBCA13`;
        window.scrollTo(0, 0);
        this.setState({ mode: document.location.pathname.split("/")[2] })

        fetch("http://localhost:8080/mp13/api/users")
            .then((response) => response.json())
            .then((responseJSON) => this.setState({ users: responseJSON }))
            .catch((error) => {
                // console.log(error)
            });

        if (document.location.pathname.split("/").length > 2) {
            fetch("http://localhost:8080/mp13/api/users/" + document.location.pathname.split("/")[3])
                .then((response) => response.json())
                .then((responseJSON) => {
                    this.setState({ postData: responseJSON })
                    document.getElementById('userName').value = responseJSON.data.userName;
                    document.getElementById('userEmail').value = responseJSON.data.userEmail;
                    document.getElementById('userLevel').value = responseJSON.data.userLevel;
                })
                .catch((error) => {
                    // console.log(error)
                });
        }
    }

    render() {
        const { handlerStatus } = this.props;

        const addUser = () => {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userEmail: document.getElementById('userEmail').value,
                    userPwd: sha256(document.getElementById('userPwd').value),
                    userName: document.getElementById('userName').value,
                    userLevel: parseInt(document.getElementById('userLevel').value)
                })
            };

            console.log(requestOptions)

            fetch('http://localhost:8080/mp13/api/users/', requestOptions)
                .then(response => response.json())
                .then(response => {
                    console.log(response)
                    handlerStatus({ response: { status: response.status, message: response.status === 200 ? 'User successfully added' : 'User failure added' } })
                    if (response.status === 200) {
                        document.getElementById("cancelButton").click()
                    }
                })
                .catch((error) => {
                    // console.log(error)
                });
        }

        const editUser = () => {
            let id = this.state.postData.data.userId
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userEmail: document.getElementById('userEmail').value,
                    userNewPwd: parseInt(document.getElementById('userNewPwd').value),
                    userOldPwd: parseInt(document.getElementById('userOldPwd').value),
                    userName: parseInt(document.getElementById('userName').value),
                    userLevel: parseInt(document.getElementById('userLevel').value)
                })
            };
            fetch('http://localhost:8080/mp13/api/users/' + id, requestOptions)
                .then(response => response.json())
                .then(response => {
                    handlerStatus({ response: { status: response.status, message: response.status === 200 ? `User Id ${response.data.userId} successfully updated` : `User Id ${response.data.userId} failure updated` } })
                    if (response.status === 200) {
                        document.getElementById("cancelButton").click()
                    }
                })
                .catch((error) => {
                    // console.log(error)
                });
        }
        const confirmUser = () => {
            if (this.state.mode === 'delete') {
                fetch('http://localhost:8080/mp13/api/users/' + this.state.postData.data.userId, { method: 'DELETE' })
                    .then(response => response.json())
                    .then(response => {
                        handlerStatus({ response: { status: response.status, message: response.status === 200 ? 'User successfully deleted' : 'User failure deleted' } })
                        if (response.status === 200) {
                            document.getElementById("cancelButton").click()
                        }
                    })
                    .catch((error) => {
                        // console.log(error)
                    });
            } else {
                document.getElementById("cancelButton").click()
            }
        }
        return (
            <>
                <Navigation />
                <section id="content product">
                    <div className="container">
                        <div className="row mt-5">
                            <div className="card col-6 mx-auto">
                                <div className="card-body">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col text-center text-capitalize">
                                                <h5 className="fw-bold">{this.state.mode} User</h5>
                                            </div>
                                        </div>
                                        <div className="row my-3">
                                            <div className="col">
                                                <label className="form-label">Full Name</label>
                                                <input type="text" className="form-control" id="userName" disabled={this.state.mode === 'view' ? true : false} />
                                            </div>
                                        </div>
                                        <div className="row my-3">
                                            <div className="col">
                                                <label className="form-label">Email</label>
                                                <input type="email" className="form-control" id="userEmail" disabled={this.state.mode === 'view' ? true : false} />
                                            </div>
                                        </div>
                                        {
                                            this.state.mode === 'edit' ?
                                                <>
                                                    <div className="row my-3">
                                                        <div className="col">
                                                            <label className="form-label">Old Password</label>
                                                            <input type="password" className="form-control" id="userOldPwd" />
                                                        </div>
                                                    </div>
                                                    <div className="row my-3">
                                                        <div className="col">
                                                            <label className="form-label">New Password</label>
                                                            <input type="password" className="form-control" id="userNewPwd" />
                                                        </div>
                                                    </div>
                                                </>
                                                :
                                                <div className="row my-3">
                                                    <div className="col">
                                                        <label className="form-label">Password</label>
                                                        <input type="password" className="form-control" id="userPwd" />
                                                    </div>
                                                </div>
                                        }
                                        <div className="row my-3">
                                            <div className="col">
                                                <label className="form-label">Level</label>
                                                <input type="number" className="form-control" id="userLevel" disabled={this.state.mode === 'view' ? true : false} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col text-end">
                                                <Button className="btn btn-primary px-4 me-2" onClick={this.state.mode === 'add' ? addUser : this.state.mode === 'edit' ? editUser : confirmUser}>
                                                    {this.state.mode === 'add' ? 'Submit' : this.state.mode === 'edit' ? 'Update' : 'Confirm'}
                                                </Button>
                                                <Button type="link" href="/users" id="cancelButton" className="btn btn-secondary px-4">
                                                    Cancel
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}