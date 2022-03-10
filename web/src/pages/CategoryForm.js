import React, { Component } from "react";
import Button from "elements/Button";
import Navigation from "parts/Navigation";

export default class CategoryForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postData: null,
            mode: null
        }
    }

    componentDidMount() {
        document.title = `${document.location.pathname.split("/")[2]} Category | HAIBCA13`;
        window.scrollTo(0, 0);
        this.setState({ mode: document.location.pathname.split("/")[2] })

        if (document.location.pathname.split("/").length > 2) {
            fetch("http://localhost:8080/mp13/api/categories/" + document.location.pathname.split("/")[3])
                .then((response) => response.json())
                .then((responseJSON) => {
                    this.setState({ postData: responseJSON })
                    document.getElementById('categoryName').value = responseJSON.data.categoryName;
                    document.getElementById('categoryDetail').value = responseJSON.data.categoryDetail;
                })
                .catch((error) => {
                    // console.log(error)
                });
        }
    }

    render() {
        const { handlerStatus } = this.props

        const addCategory = () => {
            const requestOptions = {
                method: 'POST',
                header: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    categoryName: document.getElementById('categoryName').value,
                    categoryDetail: document.getElementById('categoryDetail').value,
                }),
            }
            fetch('http://localhost:8080/mp13/api/categories', requestOptions)
                .then(response => response.json())
                .then(response => {
                    handlerStatus({ response: { status: response.status, message: response.status === 200 ? 'Category successfully added' : 'Category failure added' } })
                    if (response.status === 200) {
                        document.getElementById("cancelButton").click()
                    }
                })
                .catch((error) => {
                    // console.log(error)
                });
        }

        const editCategory = () => {
            let id = this.state.postData.data.categoryId
            const requestOptions = {
                method: 'PUT',
                header: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    categoryName: document.getElementById('categoryName').value,
                    categoryDetail: document.getElementById('categoryDetail').value,
                }),
            }
            fetch('http://localhost:8080/mp13/api/categories' + id, requestOptions)
                .then(response => response.json())
                .then(response => {
                    handlerStatus({ response: { status: response.status, message: response.status === 200 ? `Category id ${response.data.categoryId} successfully updated` : `Category Id ${response.data.categoryId} failure updated` } })
                    if (response.status === 200) {
                        document.getElementById("cancelButton").click()
                    }
                })
                .catch((error) => {
                    // console.log(error)
                });
        }
        const confirmCategory = () => {
            if (this.state.mode === 'delete') {
                fetch('http://localhost:8080/mp13/api/categories/' + this.state.postData.data.categoryId, { method: 'DELETE' })
                    .then(response => response.json())
                    .then(response => {
                        handlerStatus({ response: { status: response.status, message: response.status === 200 ? 'Category successfully deleted' : 'Category failure deleted' } })
                        if (response.status === 200) {
                            document.getElementById("cancelButton").click()
                        }
                    })
                    .catch((error) => {
                        // console.log(error)
                    });
            } else {
                document.getElementById("cancelButton").click()
            }
        }
        return (
            <>
                <Navigation />
                <section id="content category">
                    <div className="container">
                        <div className="row mt-5">
                            <div className="card col-6 mx-auto">
                                <div className="card-body">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col text-center text-capitalize">
                                                <h5 className="fw-bold">{this.state.mode} Category</h5>
                                            </div>
                                        </div>
                                        <div className="row my-3">
                                            <div className="col">
                                                <label className="form-label">Category Name</label>
                                                <input type="text" className="form-control" id="categoryName" disabled={this.state.mode === 'view' ? true : false} />
                                            </div>
                                        </div>
                                        <div className="row my-3">
                                            <div className="col">
                                                <label className="form-label">Category Detail</label>
                                                <textarea type="text" className="form-control" id="categoryDetail" rows={10} cols={30} disabled={this.state.mode === 'view' ? true : false} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col text-end">
                                                <Button className="btn btn-primary px-4 me-2" onClick={this.state.mode === 'add' ? addCategory : this.state.mode === 'edit' ? editCategory : confirmCategory}>
                                                    {this.state.mode === 'add' ? 'Submit' : this.state.mode === 'edit' ? 'Update' : 'Confirm'}
                                                </Button>
                                                <Button type="link" href="/categories" id="cancelButton" className="btn btn-secondary px-4">
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