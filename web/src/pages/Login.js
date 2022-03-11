import React, { Component } from "react";
import Button from "elements/Button";
import UserServices from "services/UserServices";
import { sha256 } from "js-sha256";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: undefined,
            password: undefined,
            loading: false
        }
    }

    componentDidMount() {
        if (sessionStorage.getItem('user') !== null) {
            // this.props.history.push('/products')
            console.log(sessionStorage.getItem('user'));
        }
    }

    render() {
        document.title = "LOGIN | HAIBCA13";
        window.scrollTo(0, 0);
        document.body.style.backgroundColor = '#F9FAFB';

        const onChangeEmail = (e) => {
            this.setState({ email: e.target.value })
        }

        const onChangePassword = (e) => {
            this.setState({ password: e.target.value })
        }
        const handleLogin = () => {
            UserServices.SIGNIN({
                userEmail: this.state.email,
                hashedPass: sha256(this.state.password)
            }).then(() => {
                if (sessionStorage.getItem("user") !== null) {
                    this.props.history.push('/products')
                    window.location.reload()
                }
            })
        }

        return (
            <>
                <div className="container text-center">
                    <div className="row">
                        <div className="col-6-sm mx-auto">
                            <div className="logo-icon py-5">
                                <h1>13</h1>
                                <h4>HAIBCA</h4>
                            </div>
                            <h4 className="mt-2">Login into your account</h4>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-4 mx-auto">
                            <div className="form-group">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    value={this.state.email || ""}
                                    onChange={onChangeEmail}
                                />
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    value={this.state.password || ""}
                                    onChange={onChangePassword}
                                />
                            </div>
                            <div className="form-group mt-4">
                                <Button
                                    className="form-control btn btn-primary"
                                    onClick={handleLogin}
                                >
                                    Login
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}