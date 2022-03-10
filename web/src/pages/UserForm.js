import React, { Component } from "react";
import Button from "elements/Button";
import Navigation from "parts/Navigation";
import { sha256 } from "js-sha256";
import UserServices from "services/UserServices";

export default class UserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postData: null,
            mode: null,
        }
    }

    componentDidMount() {
        document.title = `${this.props.location.pathname.split("/")[2]} User | HAIBCA13`;
        window.scrollTo(0, 0);
        this.setState({ mode: this.props.location.pathname.split("/")[2] })
        if (this.props.match.params.id !== undefined) {
            UserServices.GET(this.props.match.params.id).then((response) => {
                const json = response.data
                this.setState({ postData: json })
                document.getElementById('userName').value = json.data.userName;
                document.getElementById('userEmail').value = json.data.userEmail;
                document.getElementById('userLevel').value = json.data.userLevel;
            })
        }
    }

    render() {
        const { handlerStatus } = this.props;

        const addUser = () => {
            UserServices.POST({
                userEmail: document.getElementById('userEmail').value,
                userPwd: sha256(document.getElementById('userPwd').value),
                userName: document.getElementById('userName').value,
                userLevel: parseInt(document.getElementById('userLevel').value)
            }).then((response) => {
                handlerStatus({ response: { status: response.data.status, message: response.data.status === 200 ? `User successfully created` : `User failure creatd` } })
                if (response.data.status === 200) {
                    document.getElementById("cancelButton").click()
                }
            })
        }

        const editUser = () => {
            UserServices.PUT(this.props.match.params.id, {
                userEmail: document.getElementById('userEmail').value,
                userNewPwd: sha256(document.getElementById('userNewPwd').value),
                userOldPwd: sha256(document.getElementById('userOldPwd').value),
                userName: document.getElementById('userName').value,
                userLevel: parseInt(document.getElementById('userLevel').value)
            }).then((response) => {
                handlerStatus({ response: { status: response.data.status, message: response.data.status === 200 ? `User Id ${response.data.data.userName} successfully updated` : `User Id ${response.data.data.userName} failure updated` } })
                if (response.data.status === 200) {
                    document.getElementById("cancelButton").click()
                }
            })
        }
        const confirmUser = () => {
            const deleteRequest = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sessionId: UserServices.getCurrentUser().data.sessionsId
                })
            };

            if (this.state.mode === 'delete') {
                UserServices.DELETE(this.props.match.params.id, deleteRequest)
                    .then((response) => {
                        handlerStatus({ response: { status: response.status, message: response.status === 200 ? 'User successfully deleted' : 'User failure deleted' } })
                        if (response.status === 200) {
                            document.getElementById("cancelButton").click()
                        }
                    })
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
                                                this.state.mode === 'add' ?

                                                    <div className="row my-3">
                                                        <div className="col">
                                                            <label className="form-label">Password</label>
                                                            <input type="password" className="form-control" id="userPwd" />
                                                        </div>
                                                    </div>
                                                    :
                                                    ""
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