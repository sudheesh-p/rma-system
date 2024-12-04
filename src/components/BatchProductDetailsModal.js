import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { FETCH_BATCH_PRODCUT_DETAILS } from '../Constants'

const BatchProductDetailsModal = ({ show, batchProductId, onClose }) => {
    const [batchProductDetails, setBatchProductDetails] = useState(null);
    const [selectedBatchProducts, setSelectedBatchProducts] = useState([])
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

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedBatchProducts(batchProductDetails.map((row) => row.itemId));
        }
        else {
            setSelectedBatchProducts([]); // Deselect all items
        }
    }
    // Handle individual row selection
    const handleRowSelect = (rowId) => {
        setSelectedBatchProducts((prevSelected) => {
            if (prevSelected.includes(rowId)) {
                return prevSelected.filter((item) => item !== rowId);
            } else {
                return [...prevSelected, rowId];
            }
        });
    };
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
                        >
                        </button>
                    </div>
                    <div className="modal-body" style={{ display: 'flex', justifyContent: 'center' }}>
                        <div className="container mt-5">
                            <div className='row'>
                                <div className='table-responsive col-md-10 mb-3'>
                                    <table className="table table-bordered">
                                        <thead className='table-dark'>
                                            <tr>
                                                <th>
                                                    <input
                                                        type="checkbox"
                                                        onChange={handleSelectAll}
                                                        checked={selectedBatchProducts?.length === batchProductDetails?.length}
                                                    />
                                                </th>
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
                                                    <td>
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedBatchProducts.includes(row.itemId)}
                                                            onChange={() => handleRowSelect(row.itemId)}
                                                        >
                                                        </input>
                                                    </td>
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
                            <div className='row'>
                                <div className="d-flex gap-2 d-md-block mt-5 text-end">
                                    <button className="btn btn-danger me-md-3" type="button">Delete Item</button>
                                    <button className="btn btn-success me-md-3" type="button">Print Item Barcode</button>
                                    <button className="btn btn-primary me-md-3" type="button">Mark as Missing Item</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </div> */}
                </div>
            </div>
        </div>

    )
}

export default BatchProductDetailsModal