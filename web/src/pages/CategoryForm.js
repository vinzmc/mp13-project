import React, { Component } from "react";
import Button from "elements/Button";
import Navigation from "parts/Navigation";
import CategoryServices from "services/CategoryServices";

export default class CategoryForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postData: null,
            mode: null
        }
    }

    componentDidMount() {
        document.title = `${this.props.location.pathname.split("/")[2]} Category | HAIBCA13`;
        window.scrollTo(0, 0);
        this.setState({ mode: this.props.location.pathname.split("/")[2] })
        if (this.props.match.params.id !== undefined) {
            CategoryServices.GET(this.props.match.params.id).then((response) => {
                const json = response.data
                this.setState({ postData: json })
                document.getElementById('categoryName').value = json.data.categoryName;
                document.getElementById('categoryDetail').value = json.data.categoryDetail;
            })
        }
    }

    render() {
        const { handlerStatus } = this.props

        const addCategory = () => {
            CategoryServices.POST({
                categoryName: document.getElementById('categoryName').value,
                categoryDetail: document.getElementById('categoryDetail').value,
            }).then((response) => {
                handlerStatus({ response: { status: response.data.status, message: response.data.status === 200 ? 'Category successfully added' : 'Category failure added' } })
                if (response.data.status === 200) {
                    document.getElementById("cancelButton").click()
                }
            })
        }

        const editCategory = () => {
            CategoryServices.PUT(this.props.match.params.id, {
                categoryName: document.getElementById('categoryName').value,
                categoryDetail: document.getElementById('categoryDetail').value,
            }).then((response) => {
                handlerStatus({ response: { status: response.data.status, message: response.data.status === 200 ? `Category id ${response.data.data.categoryId} successfully updated` : `Category Id ${response.data.data.categoryId} failure updated` } })
                if (response.data.status === 200) {
                    document.getElementById("cancelButton").click()
                }
            })
        }
        const confirmCategory = () => {
            if (this.state.mode === 'delete') {
                CategoryServices.DELETE(this.props.match.params.id)
                    .then((response) => {
                        handlerStatus({ response: { status: response.data.status, message: response.data.status === 200 ? 'Category successfully deleted' : 'Category failure deleted' } })
                        if (response.data.status === 200) {
                            document.getElementById("cancelButton").click()
                        }
                    })
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
                                                <input type="text" className="form-control" id="categoryName" disabled={this.state.mode === 'view' || this.state.mode === 'delete' ? true : false} />
                                            </div>
                                        </div>
                                        <div className="row my-3">
                                            <div className="col">
                                                <label className="form-label">Category Detail</label>
                                                <textarea type="text" className="form-control" id="categoryDetail" rows={10} cols={30} disabled={this.state.mode === 'view' || this.state.mode === 'delete' ? true : false} />
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