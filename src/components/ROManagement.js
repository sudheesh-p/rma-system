import React, { useState } from 'react'
import useFetchList from '../utils/useFetchList';
import { FETCH_CUST_LIST } from '../Constants'
import CreateROModal from './CreateROModal';

const ROManagement = () => {

  const [showROProducts, setShowROProducts] = useState(false)
  const [showPopup, setShowPopup] = useState(false);
  const customerList = useFetchList(FETCH_CUST_LIST);
  return (
    <>
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>RO Management</h2>
          <button className="btn btn-primary" onClick={() => { setShowPopup(true) }}>Create RO</button>
        </div>
        <div className="row">
          <div className="col-md-3 mb-3">
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
          <div className="col-md-3 mb-3">
            <select
              name="customerName"
              className="form-select"
              placeholder="Filter by Customer"
            >
              <option>Select RO Status</option>
              <option>Pending</option>
            </select>
          </div>
          <div className="col-md-3 mb-3">
            <input
              type="date"
              name="receivedDate"
              className="form-control"
              placeholder="From Date"
            />
          </div>
          <div className="col-md-3 mb-3">
            <input
              type="date"
              name="recievedDate"
              className="form-control"
              placeholder="Recieved Date"
            />
          </div>
        </div>
        <div className='table-responsive'>
          <table className="table">
            <thead className='table-light'>
              <tr>
                <th>RO ID</th>
                <th>Customer</th>
                <th>Created Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="pe-auto" onClick={() => {
                setShowROProducts(true)
              }}>
                <td>R123</td>
                <td>Andras</td>
                <td>10/10/2024</td>
                <td>Pending</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="d-grid gap-2 d-md-block mt-5 text-end">
          <button className="btn btn-primary me-md-3" type="button">Manage RO</button>
          <button className="btn btn-success me-md-3" type="button">Print RO</button>
        </div>
        {showROProducts && (<div className='table-responsive mt-5'>
          <table className="table">
            <thead className='table-light'>
              <tr>
                <th>Product Code</th>
                <th>Pending Quantity</th>
                <th>Recieved Quantity</th>
                <th>RO Product Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="pe-auto">
                <td>Mouse</td>
                <td>30</td>
                <td>10</td>
                <td>Pending</td>
              </tr>
            </tbody>
          </table>
        </div>)}
        <div>
          {showPopup && (
            <CreateROModal show={showPopup}
              onClose={() => {
                setShowPopup(false)
              }}
              customerList={customerList}
            ></CreateROModal>
          )}
        </div>
      </div>
    </>
  )
}

export default ROManagement