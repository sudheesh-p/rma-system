import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { FETCH_BATCH_PRODCUT_DETAILS } from '../Constants'

const BatchProductDetailsModal = ({ show, batchProductId, onClose }) => {
    const [batchProductDetails, setBatchProductDetails] = useState(null);
    useEffect(() => {
        if (batchProductId) {
            // Fetch product details based on batchProductId
            fetch(`${FETCH_BATCH_PRODCUT_DETAILS}?batchProductId=${batchProductId}`)
                .then((response) => response.json())
                .then((data) => {
                    setBatchProductDetails(data?.items)
                    console.log(data?.items);
                })
                .catch((err) => console.error("Error fetching product details:", err));
        }
    }, [batchProductId]);
    return (
        <div
            className={`modal fade ${show ? 'show d-block' : ''}`}
            tabIndex="-1"
            role="dialog"
            aria-labelledby="productModalLabel"
            aria-hidden={!show}
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            style={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)', // Dark backdrop
            }}
        >
            <div className="modal-dialog modal-xl" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="productModalLabel">
                            Product Details
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={onClose}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <div className='table-responsive col-md-10 mb-3'>
                            <table className="table table-bordered">
                                <thead className='table-dark'>
                                    <tr>
                                        <th>Item Barcode</th>
                                        <th>Warranty Date</th>
                                        <th>Supplier Code</th>
                                        <th>Supplier ID</th>
                                        <th>Model No</th>
                                        <th>Remarks</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {batchProductDetails?.map((row, index) => (
                                        <tr key={index}>
                                            <td>{row?.barcode}</td>
                                            <td>{row?.warrantyDate}</td>
                                            <td></td>
                                            <td></td>
                                            <td>{row?.serialNumber}</td>
                                            <td>{row?.remarks}</td>
                                            <td></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BatchProductDetailsModal