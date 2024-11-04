import React from 'react'
import '../styles/Sidenav.css'
import { Link } from 'react-router-dom'

function Sidenav() {

  return (
    <div className="side-nav d-flex flex-column vh-100 p-3 bg-dark">
      <h4 className="text-center text-white">RMA</h4>
      <nav className="nav flex-column">
        <Link to="/" className="nav-link custom-link">
          Reciept and Returns
        </Link>
        <Link to="/batch-management" className="nav-link custom-link">
          Batch Management
        </Link>
        <Link to="/RO-management" className="nav-link custom-link">
          RO Management
        </Link>
        <Link to="/cleaning-sorting" className="nav-link custom-link">
          Cleaning and Sorting
        </Link>
        <Link to="/RMA" className="nav-link custom-link">
          RMA Management
        </Link>
      </nav>
    </div>
  )
}

export default Sidenav