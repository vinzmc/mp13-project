import React from "react";
import Button from "elements/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faBoxesStacked, faUserLarge, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

export default function Navigation() {
    return (
        <>
            <nav id="side-nav">
                <div className="container">
                    <div className="row">
                        <div className="col text-center">
                            <div className="logo btn btn-outline-primary mt-4">
                                <div className="row py-1 px-4">
                                    <div className="col p-0">
                                        <h1 className="m-0">13</h1>
                                    </div>
                                    <div className="col p-0">
                                        <h6 className="m-0 py-2">HAIBCA</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col text-center">
                            <h6>Hi, <b>Kurniawan</b></h6>
                        </div>
                    </div>
                    <div className="row my-5">
                        <div className="col">
                            <div className="list-group">
                                <Button type="link" href="/products" className={`list-group-item border-0 btn btn-light my-2 ${document.location.pathname === '/products' ? 'active' : ''}`}>
                                    <div className="row">
                                        <div className="col-8 mx-auto">
                                            <div className="row">
                                                <div className="col-2">
                                                    <FontAwesomeIcon icon={faBoxOpen} />
                                                </div>
                                                <div className="col text-start">Product</div>
                                            </div>
                                        </div>
                                    </div>
                                </Button>
                                <Button type="link" href="/categories" className={`list-group-item border-0 btn btn-light my-2 ${document.location.pathname === '/categories' ? 'active' : ''}`}>
                                    <div className="row">
                                        <div className="col-8 mx-auto">
                                            <div className="row">
                                                <div className="col-2">
                                                    <FontAwesomeIcon icon={faBoxesStacked} />
                                                </div>
                                                <div className="col text-start">Category</div>
                                            </div>
                                        </div>
                                    </div>
                                </Button>
                                <Button type="link" href="/users" className={`list-group-item border-0 btn btn-light my-2 ${document.location.pathname === '/users' ? 'active' : ''}`}>
                                    <div className="row">
                                        <div className="col-8 mx-auto">
                                            <div className="row">
                                                <div className="col-2">
                                                    <FontAwesomeIcon icon={faUserLarge} />
                                                </div>
                                                <div className="col text-start">User</div>
                                            </div>
                                        </div>
                                    </div>
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col">
                            <Button type="link" href="/logout" id="btn-logout" className="btn btn-outline-danger form-control border-0">
                                <div className="row">
                                    <div className="col-8 mx-auto">
                                        <div className="row">
                                            <div className="col-2">
                                                <FontAwesomeIcon icon={faArrowRightFromBracket} />
                                            </div>
                                            <div className="col text-start">Logout</div>
                                        </div>
                                    </div>
                                </div>
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}