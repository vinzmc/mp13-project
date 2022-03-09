import React from "react";

export default function Table(props) {
    return (
        <>
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
                        <tr>
                            <td>
                                <input type="checkbox" value="1" />
                            </td>
                            <td>Meja Kantor</td>
                            <td>112233</td>
                            <td>Furniture</td>
                            <td>10</td>
                            <td>
                                <div className="table-action">
                                    <button className="btn btn-outline-success" data-bs-toggle="modal"
                                        data-bs-target="#viewProductModal"><i
                                            className="fa-solid fa-eye"></i></button>
                                    <button className="btn btn-outline-primary" data-bs-toggle="modal"
                                        data-bs-target="#editProductModal"><i
                                            className="fa-solid fa-pen-to-square"></i></button>
                                    <button className="btn btn-outline-danger" data-bs-toggle="modal"
                                        data-bs-target="#deleteProductModal"><i
                                            className="fa-solid fa-trash-can"></i></button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}