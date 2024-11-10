import React, { useState } from 'react'
import useFetchList from '../utils/useFetchList';
import { FETCH_CUST_LIST, FETCH_PRODUCT_LIST } from '../Constants'

const BatchManagement = () => {

  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  // const customerList = [{ customerId: 1, customerName: "Sudhi" }, { customerId: 2, customerName: "Justin" },]
  const customerList = useFetchList(FETCH_CUST_LIST);
  const productTypeList = useFetchList(FETCH_PRODUCT_LIST)
  // Function to add a new product
  const handleAddRow = () => {
    // Create a new product with default or empty values
    const newProduct = { id: products.length + 1, productName: '', productQty: '', remarks: '' };
    setProducts([...products, newProduct]);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedProducts(products.map((row) => row.id));
    }
    else {
      setSelectedProducts([]); // Deselect all items
    }
  }
  // Handle individual row selection
  const handleRowSelect = (rowId) => {
    setSelectedProducts((prevSelected) => {
      if (prevSelected.includes(rowId)) {
        return prevSelected.filter((item) => item !== rowId);
      } else {
        return [...prevSelected, rowId];
      }
    });
  };

  const handleInputChange = (index, field, value) => {
    setProducts(
      products.map((row, i) =>
        i === index ? { ...row, [field]: value } : row
      )
    )
  }
  const handleBatchSave = () => {
    console.log('product list', products);
  }
  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Create New Batch</h2>
      </div>
      <div className='row'>
        <div className="col-md-3 mb-3">
          <select
            name="customerName"
            className="form-select"
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
          <input
            type="date"
            name="recievedDate"
            className="form-control"
            placeholder="From Date"
          />
        </div>
      </div>
      <div className='row'>
        <div className="col-md-4 mb-3">
          <label className="form-label">Customer Reference</label>
          <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>
        <div className="col-md-4 mb-3">
          <label className="form-label">Remarks</label>
          <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>
      </div>

      <div className="col-md-2 mb-3">
        <button className="btn btn-outline-primary" onClick={handleAddRow}>Add New Product</button>
      </div>
      {products?.length != 0 && (<div className='table-responsive col-md-8 mb-3'>
        <table className="table">
          <thead className='table-dark'>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedProducts.length === products.length}
                />
              </th>
              <th>Product</th>
              <th>Qty</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {products.map((row, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(row.id)}
                    onChange={() => handleRowSelect(row.id)}
                  />
                </td>
                <td>
                  <select
                    name="productName"
                    className="form-select"
                    onChange={(e) => handleInputChange(index, 'productName', e.target.value)}
                  >
                    <option>Select product type</option>
                    {productTypeList?.map((obj) => (
                      <option key={obj.productId} value={obj.productId}>
                        {obj.productName}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    onChange={(e) => handleInputChange(index, 'productQty', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => handleInputChange(index, 'remarks', e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>)}
      <div className="d-flex gap-2 d-md-block mt-5">
        <button className="btn btn-danger me-md-3" type="button">Delete Product</button>
        <button className="btn btn-success me-md-3" type="button">Print Batch Barcode</button>
        <button className="btn btn-primary me-md-3" type="button" onClick={handleBatchSave}>Save Batch</button>
      </div>
    </div>
  )
}

export default BatchManagement