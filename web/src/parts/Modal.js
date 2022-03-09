import React from "react";

export default function Modal(props) {
    return (
        <>
            <div className="modal fade" id="addProductModal" aria-labelledby="addProductModal" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form action="">
                            <div className="modal-body">
                                <div className="container">
                                    <div className="row">
                                        <div className="col text-center">
                                            <h5 className="fw-bold">Add Product</h5>
                                        </div>
                                    </div>
                                    <div className="row my-3">
                                        <div className="col">
                                            <label className="form-label">Product Name</label>
                                            <input type="text" className="form-control" id="add-product-name" placeholder="" />
                                        </div>
                                    </div>
                                    <div className="row my-3">
                                        <div className="col">
                                            <label className="form-label">Product No</label>
                                            <input type="text" className="form-control" id="add-product-no" placeholder="" />
                                        </div>
                                    </div>
                                    <div className="row my-3">
                                        <div className="col">
                                            <label className="form-label">Product Category</label>
                                            <select className="form-select" id="add-product-category" defaultValue={"null"}>
                                                <option value="null" disabled>Category...</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row my-3">
                                        <div className="col">
                                            <label className="form-label">Stock</label>
                                            <input type="number" className="form-control" id="add-product-stock" placeholder="" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col text-end">
                                            <button type="submit" className="btn btn-primary px-4 me-2" id="add-product-submit">
                                                Submit
                                            </button>
                                            <button className="btn btn-secondary px-4" data-bs-dismiss="modal">
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}