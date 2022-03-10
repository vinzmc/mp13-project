import React, { Component, createRef, useEffect } from "react";
import Button from "elements/Button";
import Navigation from "parts/Navigation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Weather from "parts/Weather";
import { faPlus, faAngleLeft, faAngleRight, faEye, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

export default class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: null,
            weather: null
        }
    }

    componentDidMount() {
        document.title = "Products | HAIBCA13";
        window.scrollTo(0, 0);

        fetch("http://localhost:8080/mp13/api/products")
            .then((response) => response.json())
            .then((responseJSON) => this.setState({ products: responseJSON }))
            .catch((error) => {
                console.log(error)
            });
    }

    render() {
        const { products } = this.state;
        const { crudStatus } = this.props.handlerStatus;
        return (
            <>
                <Navigation />
                <section id="content product">
                    <div className="container pt-4 px-4">
                        {
                            crudStatus ?
                                <div className="row">
                                    <div className={`col alert text-center text-capitalize fw-bolder alert-${crudStatus.response.status === 200 ? 'success' : 'danger'}`}>
                                        {crudStatus.response.message}
                                    </div>
                                </div>
                                :
                                ""
                        }
                        <div className="row">
                            <div className="col text-start">
                                <h3 className="fw-bold">Product List</h3>
                            </div>
                            <Weather />
                        </div>
                        <div className="row">
                            <div className="col text-end">
                                <Button type="link" href="/products/add" className="btn btn-success py-2 ps-3 pe-4 text-white">
                                    <span className="me-2"><FontAwesomeIcon icon={faPlus} /></span> Add Product
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
                                                <th scope="col">Product Name</th>
                                                <th scope="col">Product No</th>
                                                <th scope="col">Product Category</th>
                                                <th scope="col">Stock</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {!products ? null : products.data.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>
                                                            <input type="checkbox" value={item.productId} />
                                                        </td>
                                                        <td>{item.productName}</td>
                                                        <td>{item.productId}</td>
                                                        <td>{item.category.categoryName}</td>
                                                        <td>{item.productStock}</td>
                                                        <td>
                                                            <div className="table-action">
                                                                <Button type="link" href={`/products/view/${item.productId}`} className="btn btn-outline-success">
                                                                    <FontAwesomeIcon icon={faEye} />
                                                                </Button>
                                                                <Button type="link" href={`/products/edit/${item.productId}`} className="btn btn-outline-primary">
                                                                    <FontAwesomeIcon icon={faPenToSquare} />
                                                                </Button>
                                                                <Button type="link" href={`/products/delete/${item.productId}`} className="btn btn-outline-danger">
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
                                        <input type="number" min={1} max={10} className="form-control text-center w-80" placeholder="1" />
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