import React, { Component } from "react";
import Button from "elements/Button";
import Navigation from "parts/Navigation";

export default class ProductForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: null,
            postData: null,
            mode: null,
        }
    }

    componentDidMount() {
        document.title = `${document.location.pathname.split("/")[2]} Products | HAIBCA13`;
        window.scrollTo(0, 0);
        this.setState({ mode: document.location.pathname.split("/")[2] })

        fetch("http://localhost:8080/mp13/api/categories")
            .then((response) => response.json())
            .then((responseJSON) => this.setState({ categories: responseJSON }))
            .catch((error) => {
                // console.log(error)
            });

        fetch("http://localhost:8080/mp13/api/products/" + document.location.pathname.split("/")[3])
            .then((response) => response.json())
            .then((responseJSON) => {
                this.setState({ postData: responseJSON })
                document.getElementById('productName').value = responseJSON.data.productName;
                document.getElementById('productCategory').value = responseJSON.data.category.categoryId;
                document.getElementById('productStock').value = responseJSON.data.productStock;
            })
            .catch((error) => {
                // console.log(error)
            });
    }

    render() {
        const { categories } = this.state
        const { handlerStatus } = this.props

        const addProduct = () => {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    productName: document.getElementById('productName').value,
                    categoryId: parseInt(document.getElementById('productCategory').value),
                    productStock: parseInt(document.getElementById('productStock').value)
                })
            };

            fetch('http://localhost:8080/mp13/api/products/', requestOptions)
                .then(response => response.json())
                .then(response => {
                    handlerStatus({ response: { status: response.status, message: response.status == 200 ? 'Product successfully added' : 'Product failure added' } })
                    if (response.status === 200) {
                        document.getElementById("cancelButton").click()
                    }
                });
        }

        const editProduct = () => {
            let id = this.state.postData.data.productId
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    productName: document.getElementById('productName').value,
                    categoryId: parseInt(document.getElementById('productCategory').value),
                    productStock: parseInt(document.getElementById('productStock').value)
                })
            };
            fetch('http://localhost:8080/mp13/api/products/' + id, requestOptions)
                .then(response => response.json())
                .then(response => {
                    handlerStatus({ response: { status: response.status, message: response.status == 200 ? `Product No ${response.data.productId} successfully updated` : `Product failure updated` } })
                    if (response.status === 200) {
                        document.getElementById("cancelButton").click()
                    }
                });
        }
        const confirmProduct = () => {
            if (this.state.mode == 'delete') {
                fetch('http://localhost:8080/mp13/api/products/' + this.state.postData.data.productId, { method: 'DELETE' })
                    .then(response => response.json())
                    .then(response => {
                        handlerStatus({ response: { status: response.status, message: response.status == 200 ? 'Product successfully deleted' : 'Product failure deleted' } })
                        if (response.status === 200) {
                            document.getElementById("cancelButton").click()
                        }
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
                                                <h5 className="fw-bold">{this.state.mode} Product</h5>
                                            </div>
                                        </div>
                                        <div className="row my-3">
                                            <div className="col">
                                                <label className="form-label">Product Name</label>
                                                <input type="text" className="form-control" id="productName" disabled={this.state.mode === 'view' ? true : false} />
                                            </div>
                                        </div>
                                        <div className="row my-3">
                                            <div className="col">
                                                <label className="form-label">Product Category</label>
                                                <select className="form-select" defaultValue={"null"} id="productCategory" disabled={this.state.mode === 'view' ? true : false}>
                                                    <option value={"null"}>Category...</option>
                                                    {!categories ? "" : categories.data.map((item, index) => {
                                                        return (
                                                            <option key={index} value={item.categoryId}>{item.categoryName}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row my-3">
                                            <div className="col">
                                                <label className="form-label">Stock</label>
                                                <input type="number" className="form-control" id="productStock" disabled={this.state.mode === 'view' ? true : false} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col text-end">
                                                <Button className="btn btn-primary px-4 me-2" onClick={this.state.mode === 'add' ? addProduct : this.state.mode === 'edit' ? editProduct : confirmProduct}>
                                                    {this.state.mode === 'add' ? 'Submit' : this.state.mode === 'edit' ? 'Update' : 'Confirm'}
                                                </Button>
                                                <Button type="link" href="/products" id="cancelButton" className="btn btn-secondary px-4">
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