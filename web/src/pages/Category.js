import React, { Component } from "react";
import Navigation from "parts/Navigation";
import Button from "elements/Button";
import Weather from "parts/Weather";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faAngleLeft, faAngleRight, faEye, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

export default class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: null,
            weather: null
        }
    }

    componentDidMount() {
        document.title = "Category | HAIBCA13";
        window.scrollTo(0, 0);
        fetch("http://localhost:8080/mp13/api/categories")
            .then((response) => response.json())
            .then((responseJSON) => this.setState({ categories: responseJSON }))
            .catch((error) => {
                console.log(error)
            });
    }
    render() {
        const { categories } = this.state;
        return (
            <>
                <Navigation />
                <section id="content product">
                    <div className="container pt-4 px-4">
                        <div className="row">
                            <div className="col text-start">
                                <h3 className="fw-bold">Category List</h3>
                            </div>
                            <Weather />
                        </div>
                        <div className="row">
                            <div className="col text-end">
                                <Button type="link" href="/categories/add" className="btn btn-success py-2 ps-3 pe-4 text-white" >
                                    <span className="me-2"><FontAwesomeIcon icon={faPlus} /></span> Add Category
                                </Button>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col">
                                <div className="table-responsive">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th scope="col">
                                                    <input type="checkbox" value="all" />
                                                </th>
                                                <th scope="col">Category Name</th>
                                                <th scope="col">Category No</th>
                                                <th scope="col">Category Detail</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {!categories ? null : categories.data.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>
                                                            <input type="checkbox" value={item.categoryId} />
                                                        </td>
                                                        <td>{item.categoryName}</td>
                                                        <td>{item.categoryId}</td>
                                                        <td>{item.categoryDetail}</td>
                                                        <td>
                                                            <div className="table-action">
                                                                <Button type="link" href={`/categories/view/${item.categoryId}`} className="btn btn-outline-success">
                                                                    <FontAwesomeIcon icon={faEye} />
                                                                </Button>
                                                                <Button type="link" href={`/categories/edit/${item.categoryId}`} className="btn btn-outline-primary">
                                                                    <FontAwesomeIcon icon={faPenToSquare} />
                                                                </Button>
                                                                <Button type="link" href={`/categories/delete/${item.categoryId}`} className="btn btn-outline-danger">
                                                                    <FontAwesomeIcon icon={faTrashCan} />
                                                                </Button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })}

                                        </tbody>
                                    </table>
                                </div>
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