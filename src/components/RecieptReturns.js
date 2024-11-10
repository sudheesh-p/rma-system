import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useFetchList from '../utils/useFetchList';
import { FETCH_CUST_LIST, FETCH_BATCH_LIST } from '../Constants'

const RecieptReturns = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [filters, setFilters] = useState({
    batchNumber: '',
    customerName: '',
    recievedDate: ''
  });
  const navigate = useNavigate();
  const batchList = useFetchList(FETCH_BATCH_LIST)
  const customerList = useFetchList(FETCH_CUST_LIST);
  const uniqBatchNumber = [...new Set(batchList.map(item => item.batchNo))];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };
  const filterdBatchList = batchList.filter((row) => {
    const isNameMatch = !filters.customerId || row.customerId.includes(filters.customerId);
    const isBatchMatch = !filters.batchNo || row.batchNo.includes(filters.batchNo);
    const isReceivedDate = !filters.receivedDate || row.receivedDate.includes(filters.receivedDate);
    return (!filters.customerName && !filters.batchNo && !filters.receivedDate) || (isNameMatch && isBatchMatch && isReceivedDate);
  });
  // Handle select all rows
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(batchList.map((row) => row.batchNo)); // Select all items
    } else {
      setSelectedItems([]); // Deselect all items
    }
  };

  // Handle individual row selection
  const handleRowSelect = (rowId) => {
    setSelectedItems((prevSelected) => {
      if (prevSelected.includes(rowId)) {
        return prevSelected.filter((item) => item !== rowId);
      } else {
        return [...prevSelected, rowId];
      }
    });
  };

  // handle navigation to create new batch
  const navigateToCreateNBatch = () => {
    navigate('/batch-management');
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Reciept And Returns</h2>
        <button className="btn btn-primary" onClick={navigateToCreateNBatch}>Create New Batch</button>
      </div>
      <div className="row">
        <div className="col-md-3 mb-3">
          <select
            name="customerName"
            className="form-select"
            placeholder="Filter by Customer"
            value={filters.customerId}
            onChange={handleFilterChange}
          >
            <option>Select Customer</option>
            {customerList.map((custObj) => (
              <option key={custObj.customerId} value={custObj.customerId}>
                {custObj.customerName}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3 mb-3">
          <select
            name="batchNo"
            className="form-select"
            placeholder="Filter by Batch Number"
            value={filters.batchNo}
            onChange={handleFilterChange}
          >
            <option>Select Batch Number</option>
            {uniqBatchNumber.map((batchNo, index) => (
              <option key={index} value={batchNo}>
                {batchNo}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3 mb-3">
          <input
            type="date"
            name="receivedDate"
            className="form-control"
            placeholder="From Date"
            value={filters.receivedDate}
            onChange={handleFilterChange}
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
          <thead className='table-dark'>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedItems.length === batchList.length}
                />
              </th>
              <th>Batch No</th>
              <th>Customer</th>
              <th>Recieved Date</th>
              <th>Cx Reference</th>
              <th>Total Items</th>
              <th>Replaced</th>
              <th>Cancelled</th>
              <th>Pending</th>
            </tr>
          </thead>
          <tbody>
            {filterdBatchList.map((row, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(row.batchNo)}
                    onChange={() => handleRowSelect(row.batchNo)}
                  />
                </td>
                <td>{row?.batchNo}</td>
                <td>{row?.customerName}</td>
                <td>{row?.receivedDate}</td>
                <td>{row?.customerReference}</td>
                <td>{row?.totalItemsCount}</td>
                <td>{row?.replacedItemsCount}</td>
                <td>{row?.cancelledItemsCount}</td>
                <td>{row?.pendingItemsCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-grid gap-2 d-md-block mt-5">
        <button className="btn btn-danger me-md-3" type="button">Delete Batch</button>
        <button className="btn btn-primary me-md-3" type="button">Edit/View Batch</button>
        <button className="btn btn-success me-md-3" type="button">Print Batch Barcode</button>
        <button className="btn btn-info me-md-3" type="button">Generate Replace Order</button>
        <button className="btn btn-warning me-md-3" type="button">Cancellation</button>
        <button className="btn btn-secondary" type="button">Recieve Replacement</button>
      </div>
    </div>
  )
}

export default RecieptReturns