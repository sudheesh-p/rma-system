import React, { useState } from 'react'

const RecieptReturns = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [filters, setFilters] = useState({
    batchNumber: '',
    customerName: '',
    recievedDate: ''
  });
  const batchList = [
    { id: '1', batchNumber: 'R3434541', customerName: 'Andras', cxRefrence: '9789871', recievedDate: '28/10/2024', totalItems: "40", replacedItems: "35", cancelledItems: "10", pendingItems: "5" },
    { id: '2', batchNumber: 'R3434542', customerName: 'Andras1', cxRefrence: '9789872', recievedDate: '28/10/2024', totalItems: "40", replacedItems: "35", cancelledItems: "10", pendingItems: "5" },
    { id: '3', batchNumber: 'R3434543', customerName: 'Andras2', cxRefrence: '9789873', recievedDate: '28/10/2024', totalItems: "40", replacedItems: "35", cancelledItems: "10", pendingItems: "5" },
    { id: '4', batchNumber: 'R3434544', customerName: 'Andras3', cxRefrence: '9789874', recievedDate: '28/10/2024', totalItems: "40", replacedItems: "35", cancelledItems: "10", pendingItems: "5" },
    { id: '5', batchNumber: 'R3434545', customerName: 'Andras4', cxRefrence: '9789875', recievedDate: '28/10/2024', totalItems: "40", replacedItems: "35", cancelledItems: "10", pendingItems: "5" }
  ];

  const uniqCustomers = [...new Set(batchList.map(item => item.customerName))];
  const uniqBatchNumber = [...new Set(batchList.map(item => item.batchNumber))];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };
  const  filterdBatchList= batchList.filter((row) => {
    const isNameMatch = !filters.customerName || row.customerName.includes(filters.customerName);
    const isBatchMatch = !filters.batchNumber || row.batchNumber.includes(filters.batchNumber);
    const isRecievedDate = !filters.recievedDate || row.recievedDate.includes(filters.recievedDate);
    return (!filters.customerName && !filters.batchNumber && !filters.recievedDate) || (isNameMatch && isBatchMatch && isRecievedDate);
  });
  // Handle select all rows
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(batchList.map((row) => row.id)); // Select all items
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

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Reciept And Returns</h2>
        <button className="btn btn-primary">Create Batch</button>
      </div>
      <div className="row">
        <div className="col-md-3 mb-3">
          <select
            name="customerName"
            className="form-select"
            placeholder="Filter by Customer"
            value={filters.customerName}
            onChange={handleFilterChange}
          >
            <option>Select Customer</option>
            {uniqCustomers.map((name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3 mb-3">
          <select
            name="batchNumber"
            className="form-select"
            placeholder="Filter by Batch Number"
            value={filters.batchNumber}
            onChange={handleFilterChange}
          >
            <option>Select Batch Number</option>
            {uniqBatchNumber.map((batchNumber, index) => (
              <option key={index} value={batchNumber}>
                {batchNumber}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3 mb-3">
          <input
            type="date"
            name="recievedDate"
            className="form-control"
            placeholder="From Date"
            value={filters.recievedDate}
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
                  checked={selectedItems.includes(row.id)}
                  onChange={() => handleRowSelect(row.id)}
                />
              </td>
              <td>{row.batchNumber}</td>
              <td>{row.customerName}</td>
              <td>{row.recievedDate}</td>
              <td>{row.cxRefrence}</td>
              <td>{row.totalItems}</td>
              <td>{row.replacedItems}</td>
              <td>{row.cancelledItems}</td>
              <td>{row.pendingItems}</td>
            </tr>
          ))}
        </tbody>
      </table>

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