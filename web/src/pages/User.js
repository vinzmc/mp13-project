import React, { Component } from "react";
import Navigation from "parts/Navigation";
import Table from "parts/Table";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faPlus, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

export default class User extends Component {
    componentDidMount() {
        document.title = "User | HAIBCA13";
        window.scrollTo(0, 0);
    }
    render() {
        return (
            <>
                <Navigation />
                <section id="content product">
                    <div className="container pt-4 px-4">
                        <div className="row">
                            <div className="col text-start">
                                <h3 className="fw-bold">User List</h3>
                            </div>
                            <div id="weather" className="col text-end">
                                <p>
                                    <span className="text-primary me-2"><FontAwesomeIcon icon={faCloud} /></span>
                                    Central Klaten, <span className="temperature">26&#176;C</span> Mostly Cloudly</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col text-end">
                                <button className="btn btn-success py-2 ps-3 pe-4 text-white" data-bs-toggle="modal"
                                    data-bs-target="#addProductModal">
                                    <span className="me-2"><FontAwesomeIcon icon={faPlus} /></span> Add User
                                </button>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col">
                                <Table data={["aku", "kamu"]} />
                            </div>
                        </div>
                        <div id="pagination" className="row">
                            <div className="col-3 ms-auto">
                                <div className="row">
                                    <div className="col p-0 text-end">
                                        <button className="btn btn-light rounded-circle">
                                            <FontAwesomeIcon icon={faAngleLeft} />
                                        </button>
                                    </div>
                                    <div className="col p-0 mx-2 text-center">
                                        <input type="text" className="form-control text-center w-80" placeholder="1" />
                                    </div>
                                    <div className="col p-0">
                                        <button className="btn btn-light rounded-circle">
                                            <FontAwesomeIcon icon={faAngleRight} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    }
}