import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

import useFetchList from '../utils/useFetchList';
import Toaster from '../utils/Toaster'
import { FETCH_CUST_LIST, FETCH_PRODUCT_LIST, FETCH_BATCH_DETAILS,CREATE_UPDATE_BATCH } from '../Constants'

const BatchManagement = () => {

  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [customerId, setCustomerId] = useState('');
  const [customerReference, setCustomerReference] = useState('');
  const [receivedDate, setReceivedDate] = useState('');
  const [batchId, setBatchId] = useState()
  const [showToast, setShowToast] = useState(false);
  const [isProductListLoaded, setIsProductListLoaded] = useState(false);
  const { id } = useParams();

  const customerList = useFetchList(FETCH_CUST_LIST);
  const productTypeList = useFetchList(FETCH_PRODUCT_LIST)

  // Call the batch details only after loading the product list
  useEffect(() => {
    if (productTypeList.length > 0) {
      setIsProductListLoaded(true);
    }
  }, [productTypeList]);

  useEffect(() => {
    if (id && isProductListLoaded) {
      fetch(`${FETCH_BATCH_DETAILS}?batchId=${id}`)
        .then(res => res.json())
        .then(data => {
          console.log(productTypeList)
          updateBatchDetails(data);
        })
    }
  }, [id, isProductListLoaded])
  // Function to add a new product
  const handleAddRow = () => {
    // Create a new product with default or empty values
    const newProduct = { id: products?.length + 1, batchProductId: 0, productId: '', productQty: '', remarks: '' };
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
  const handleBatchSave = async () => {
    const batchPayload = {
      batchId: batchId || '',
      customerId: customerId,
      customerReference: customerReference,
      receivedDate: receivedDate,
      batchStatus: "Created",
      batchProducts: products.map(product => ({
        productId: parseInt(product.productId),
        productQty: parseInt(product.productQty),
        remarks: product.remarks
      }))
    };
    try {
      const response = await fetch(CREATE_UPDATE_BATCH, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(batchPayload)
      });

      if (response) {
        const result = await response.json();
        updateBatchDetails(result);
        setShowToast(true);
      } else {
        console.error("Failed to create batch");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  function updateBatchDetails(result) {
    setBatchId(result?.batchId);
    setCustomerId(result?.customerId);
    setCustomerReference(result?.customerReference);
    setReceivedDate(result?.receivedDate);
    // Update products with new batchProductId from the response
    const updatedProducts = result?.batchProducts.map((updatedProduct, index, key) => ({
      id: products[index]?.id || index + 1,
      productId: updatedProduct?.productId,
      productQty: updatedProduct?.productQty,
      remarks: updatedProduct?.remarks,
      batchProductId: updatedProduct?.batchProductId
    }));
    setProducts(updatedProducts);
  }
  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>{batchId ? `Edit Batch ${batchId}` : 'Create New Batch'}</h2>
      </div>
      <div className='row'>
        <div className="col-md-3 mb-3">
          <select
            name="customerName"
            className="form-select"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
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
            value={receivedDate}
            onChange={(e) => setReceivedDate(e.target.value)}
          />
        </div>
      </div>
      <div className='row'>
        <div className="col-md-4 mb-3">
          <label className="form-label">Customer Reference</label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            value={customerReference}
            onChange={(e) => setCustomerReference(e.target.value)}
          >
          </textarea>
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
                    name="productId"
                    className="form-select"
                    value={row.productId}
                    onChange={(e) => handleInputChange(index, 'productId', e.target.value)}
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
                    value={row.productQty}
                    onChange={(e) => handleInputChange(index, 'productQty', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={row.remarks}
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
        {batchId && <button className="btn btn-success me-md-3" type="button">Print Batch Barcode</button>}
        <button className="btn btn-primary me-md-3" type="button" onClick={handleBatchSave}>{batchId ? 'Update Batch' : 'Save Batch'}</button>
        <Toaster
          message="Data saved successfully!"
          show={showToast}
          onClose={() => setShowToast(false)}
        />
      </div>
    </div>
  )
}

export default BatchManagement