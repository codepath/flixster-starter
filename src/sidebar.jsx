import React from "react";
import { Link } from "react-router-dom";
import * as FaIcons from 'react-icons/fa';
export function Sidebar(){
    return(
        <>
        <div>
            <Link to="#" className="menu-bars">
                <FaIcons.FaBars/>
            </Link>
        </div>
        </>
    )
}