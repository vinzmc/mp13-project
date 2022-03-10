import React, { Component } from "react";
import Button from "elements/Button";
import Navigation from "parts/Navigation";
import ProductServices from "services/ProductServices";
import CategoryServices from "services/CategoryServices";
import UserServices from "services/UserServices";

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
        document.title = `${this.props.location.pathname.split("/")[2]} Product | HAIBCA13`;
        window.scrollTo(0, 0);
        this.setState({ mode: this.props.location.pathname.split("/")[2] })
        CategoryServices.GET(UserServices.getCurrentUser().data.sessionsId).then((response) => this.setState({ categories: response.data }))
        if (this.props.match.params.id !== undefined) {
            ProductServices.GET(UserServices.getCurrentUser().data.sessionsId, this.props.match.params.id).then((response) => {
                const json = response.data
                this.setState({ postData: json })
                document.getElementById('productName').value = json.data.productName;
                document.getElementById('productCategory').value = json.data.category.categoryId;
                document.getElementById('productStock').value = json.data.productStock;
            })
        }
    }

    render() {
        const { categories } = this.state
        const { handlerStatus } = this.props

        const addProduct = () => {
            ProductServices.POST({
                productName: document.getElementById('productName').value,
                categoryId: parseInt(document.getElementById('productCategory').value),
                productStock: parseInt(document.getElementById('productStock').value),
                sessionId: UserServices.getCurrentUser().data.sessionsId
            }).then((response) => {
                handlerStatus({ response: { status: response.data.status, message: response.data.status === 200 ? 'Product successfully added' : 'Product failure added' } })
                this.props.history.push('/products')
            })
        }

        const editProduct = () => {
            ProductServices.PUT(this.props.match.params.id, {
                productName: document.getElementById('productName').value,
                categoryId: parseInt(document.getElementById('productCategory').value),
                productStock: parseInt(document.getElementById('productStock').value),
                sessionId: UserServices.getCurrentUser().data.sessionsId
            }).then((response) => {
                handlerStatus({ response: { status: response.data.status, message: response.data.status === 200 ? `Product Id ${response.data.data.productId} successfully updated` : `Product Id ${response.data.data.productId} failure updated` } })
                this.props.history.push('/products')
            })
        }
        const confirmProduct = () => {
            if (this.state.mode === 'delete') {
                ProductServices.DELETE(this.props.match.params.id, UserServices.getCurrentUser().data.sessionsId)
                    .then((response) => {
                        console.log(response)
                        handlerStatus({ response: { status: response.status, message: response.status === 200 ? 'Product successfully deleted' : 'Product failure deleted' } })
                        this.props.history.push('/products')
                    })
            } else {
                this.props.history.push('/products')
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
                                                <input type="text" className="form-control" id="productName" disabled={this.state.mode === 'view' || this.state.mode === 'delete' ? true : false} />
                                            </div>
                                        </div>
                                        <div className="row my-3">
                                            <div className="col">
                                                <label className="form-label">Product Category</label>
                                                <select className="form-select" defaultValue={"null"} id="productCategory" disabled={this.state.mode === 'view' || this.state.mode === 'delete' ? true : false}>
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
                                                <input type="number" className="form-control" id="productStock" disabled={this.state.mode === 'view' || this.state.mode === 'delete' ? true : false} />
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