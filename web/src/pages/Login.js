import React from "react";
import Button from "elements/Button";

export default function Login() {
    // initialize the page
    document.title = "LOGIN | HAIBCA13";
    window.scrollTo(0, 0);
    document.body.style.backgroundColor = '#F9FAFB';

    async function handleLogin(event) {
        event.preventDefault();
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
                        <form action="">
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Email" />
                                <input type="password" className="form-control" placeholder="Password" />
                            </div>
                            <div className="form-group mt-4">
                                <Button className="form-control btn btn-primary" onClick={handleLogin}>Login</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}