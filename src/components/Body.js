import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidenav from './Sidenav'
function Body() {
   
    return (
        <div className="d-flex">
            <Sidenav/>
            <div className="p-4" style={{ flex: 1}}>
                <Outlet />
            </div>
        </div>
    )
}

export default Body