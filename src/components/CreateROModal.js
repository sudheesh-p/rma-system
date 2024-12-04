import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

function CreateROModal({ show, onClose, customerList }) {
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
                            Create RO
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
                        <div className="container">
                            <div className="row">
                                <div className="col-md-3 mb-5">
                                    <select
                                        name="customerName"
                                        className="form-select"
                                        placeholder="Filter by Customer"
                                    >
                                        <option>Select Customer</option>
                                        {customerList?.map((custObj) => (
                                            <option key={custObj.customerId} value={custObj.customerId}>
                                                {custObj.customerName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='table-responsive col-md-10 mb-3'>
                                    <table className="table table-bordered">
                                        <thead className='table-dark'>
                                            <tr>
                                                {/* <th>
                                                    <input
                                                        type="checkbox"
                                                        onChange={handleSelectAll}
                                                        checked={selectedBatchProducts?.length === batchProductDetails?.length}
                                                    />
                                                </th> */}
                                                <th>Batch ID</th>
                                                <th>Recieved Date</th>
                                                <th>Product Name</th>
                                                <th>Supplier ID</th>
                                                <th>Pending Quantity</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                                <tr>
                                                    <td>111</td>
                                                    <td>10/10/2024</td>
                                                    <td>Mouse</td>
                                                    <td>wewr</td>
                                                    <td>10</td>
                                                </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="d-flex gap-2 d-md-block mt-5 text-end">
                                    <button className="btn btn-primary me-md-3" type="button">Create RO</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose} >
                            Close
                        </button>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default CreateROModal