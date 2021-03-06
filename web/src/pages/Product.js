import React, { Component } from "react";
import Button from "elements/Button";
import Navigation from "parts/Navigation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Weather from "parts/Weather";
import ProductServices from "services/ProductServices";
import { faPlus, faAngleLeft, faAngleRight, faEye, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import UserServices from "services/UserServices";

export default class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: null,
            weather: null,
            page: 1,
        }
    }

    componentDidMount() {
        document.title = "Products | HAIBCA13";
        window.scrollTo(0, 0);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                sessionId: UserServices.getCurrentUser().data.sessionsId
            })
        };

        ProductServices.GET(requestOptions, undefined)
            .then(response => response.json())
            .then((responseData) => {
                console.log(responseData);
                let data = []
                let i = 0;
                let j = 0;
                
                responseData.data.forEach((item) => {
                    if (j === 0) {
                        data.push({ key: [] })
                    } else if (j % 6 === 0) {
                        data.push({ key: [] })
                        i++
                    }
                    data[i].key.push(item)
                    j++
                })
                this.setState({ products: data })
                document.getElementById('pagination-data').setAttribute("max", data.length)
            })
    }

    render() {
        const { products } = this.state;
        const { crudStatus } = this.props;

        const pagination = (e) => {
            if (e.target.value === e.target.getAttribute("max")) {
                this.setState({ page: parseInt(e.target.getAttribute("max")) })
                return;
            }
            this.setState({ page: parseInt(e.target.value) })
            Array.from(document.querySelectorAll('input[type=checkbox]')).map((item) => item.checked = false)
        }

        const prevPagination = () => {
            let e = document.getElementById('pagination-data')
            this.setState({
                page: this.state.page - 1 <= e.getAttribute("min") ?
                    parseInt(e.getAttribute("min"))
                    : this.state.page - 1
            })
            Array.from(document.querySelectorAll('input[type=checkbox]')).map((item) => item.checked = false)
        }

        const nextPagination = () => {
            let e = document.getElementById('pagination-data')
            this.setState({
                page: this.state.page + 1 >= e.getAttribute("max") ?
                    parseInt(e.getAttribute("max"))
                    : this.state.page + 1
            })
            Array.from(document.querySelectorAll('input[type=checkbox]')).map((item) => item.checked = false)
        }

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
                                                <th scope="col">No</th>
                                                <th scope="col">Product Name</th>
                                                <th scope="col">Product Id</th>
                                                <th scope="col">Product Category</th>
                                                <th scope="col">Stock</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {!products ? null : products[this.state.page - 1].key.map((item, index) => {
                                                return (
                                                    <tr key={(this.state.page - 1) * 6 + index + 1}>
                                                        <td>{(this.state.page - 1) * 6 + index + 1}</td>
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
                                        <Button className="btn btn-light rounded-circle" onClick={prevPagination}>
                                            <FontAwesomeIcon icon={faAngleLeft} />
                                        </Button>
                                    </div>
                                    <div className="col p-0 mx-2 text-center">
                                        <input type="number" id="pagination-data" min="1" className="form-control text-center" value={this.state.page} onChange={pagination} />
                                    </div>
                                    <div className="col p-0">
                                        <Button className="btn btn-light rounded-circle" onClick={nextPagination}>
                                            <FontAwesomeIcon icon={faAngleRight} />
                                        </Button>
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