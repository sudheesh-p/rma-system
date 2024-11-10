import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Sidenav.css'
import { NavLink } from 'react-router-dom'

function Sidenav({ isOpen, toggleSidebar }) {
  
  return (
    // <div className="side-nav d-flex flex-column vh-100 p-3 bg-dark">
    //   <h4 className="text-center text-white">RMA</h4>
    //   <nav className="nav flex-column">
    //     <Link to="/" className="nav-link custom-link">
    //       Reciept and Returns
    //     </Link>
    //     <Link to="/batch-management" className="nav-link custom-link">
    //       Batch Management
    //     </Link>
    //     <Link to="/RO-management" className="nav-link custom-link">
    //       RO Management
    //     </Link>
    //     <Link to="/cleaning-sorting" className="nav-link custom-link">
    //       Cleaning and Sorting
    //     </Link>
    //     <Link to="/RMA" className="nav-link custom-link">
    //       RMA Management
    //     </Link>
    //   </nav>
    // </div>
    <div className="d-flex">
      {/* Burger Menu */}
      <button
        className="btn btn-dark sidebar-toggle"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
        style={{ left: isOpen ? "245px" : "0" }}
      >
        <i className="bi bi-list" style={{ fontSize: "1.5rem" }}></i>
      </button>

      {/* Sidebar */}
      {isOpen && (<div className={`d-flex flex-column flex-shrink-0 p-3 bg-dark sidebar ${isOpen ? 'show' : 'hide'}`}>
        <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
          <span className="fs-4">RMA System</span>
        </a>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <NavLink to="/" className="nav-link text-white" activeclassname="active">
             <i className="bi bi-house-door-fill me-2"></i>
              Reciept and Returns
           </NavLink>
          </li>
          <li>
            <NavLink to="/batch-management" className="nav-link text-white" activeclassname="active">
              <i className="bi bi-speedometer2 me-2"></i>
                Batch Management
            </NavLink>
          </li>
          <li>
            <NavLink to="/RO-management" className="nav-link text-white" activeclassname="active">
              <i className="bi bi-table me-2"></i>
              RO Management
            </NavLink>
          </li>
          <li>
            <NavLink to="/cleaning-sorting" className="nav-link text-white" activeclassname="active">
              <i className="bi bi bi-grid me-2 me-2"></i>
              Cleaning and Sorting
            </NavLink>
          </li>
          <li>
            <NavLink to="/RMA" className="nav-link text-white" activeclassname="active">
              <i className="bi bi-people me-2"></i>
              RMA Management
            </NavLink>
          </li>
        </ul>
        <hr />
        <div className="dropdown">
          <a
            href="#"
            className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
            id="dropdownUser"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img src="https://via.placeholder.com/30" alt="" width="30" height="30" className="rounded-circle me-2" />
            <strong>mdo</strong>
          </a>
          <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser">
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="#">Sign out</a></li>
          </ul>
        </div>
      </div>)}
    </div>
  )
}

export default Sidenav