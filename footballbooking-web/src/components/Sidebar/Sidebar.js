import React from 'react';
import './sidebar.css'

function Sidebar(props) {
    return (
        <div className="collapse navbar-collapse navbar-ex1-collapse">
            <ul className="nav navbar-nav side-nav nav-pitch">
                <li>
                    <div className='side-title'>Sân</div>
                </li>
                <li>
                    <a href="#" className='link-sidebar-item'><i className="fa fa-angle-double-right icon-right" /> Sân 5</a>
                </li>
                <li>
                    <a href="#" className='link-sidebar-item'><i className="fa fa-angle-double-right icon-right" /> Sân 7</a>
                </li>
                <li>
                    <a href="#" className='link-sidebar-item'><i className="fa fa-angle-double-right icon-right" /> Sân 11</a>
                </li>
            </ul>

            <ul className="nav navbar-nav side-nav nav-price">
                <li>
                    <div className='side-title'>Giá</div>
                </li>
                <li>
                    <a href="#" className='link-sidebar-item'><i className="fa fa-angle-double-right icon-right" /> 100.000-200.000 VNĐ</a>
                </li>
                <li>
                    <a href="#" className='link-sidebar-item'><i className="fa fa-angle-double-right icon-right" /> 200.000-300.000 VNĐ</a>
                </li>
                <li>
                    <a href="#" className='link-sidebar-item'><i className="fa fa-angle-double-right icon-right" /> 400.000-500.000 VNĐ</a>
                </li>
                <li>
                    <a href="#" className='link-sidebar-item'><i className="fa fa-angle-double-right icon-right" /> 500.000-600.000 VNĐ</a>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;