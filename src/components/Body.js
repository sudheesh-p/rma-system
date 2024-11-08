import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidenav from './Sidenav'
function Body() {

    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };
    return (
        <div className="d-flex">
            <Sidenav isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="p-4" style={{
                flex: 1,
                left: isSidebarOpen ? '245px' : '0',
                transition: 'margin-left 0.3s ease'
            }}>
                <Outlet />
            </div>
        </div>
    )
}

export default Body