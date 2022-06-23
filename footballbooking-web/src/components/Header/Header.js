import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './header.css';
import '../../assets/css/base.css';
import { Link, useNavigate } from 'react-router-dom';


Header.propTypes = {

};

Header.defaultProps = {

};

function Header(props) {
    const [bookingOrder, setBookingOrder] = useState('/login');
    const { status } = props;
    const navigate = useNavigate();
    const roleUser = localStorage.getItem("role");

    const navLink = () => {
        if (roleUser === null || roleUser === undefined || roleUser === "ROLE_CUSTOMER") {
            return <ul className="nav navbar-nav">
                <li className=""><Link to="/">Home</Link></li>
            </ul>
        }

        if (roleUser === "ROLE_PITCHOWNER") {
            return <ul className="nav navbar-nav">
                <li className=""><Link to="/pitchowner/booking">DS yêu cầu đặt sân</Link></li>
            </ul>
        }
    }

    const homeLink = () => {
        if (roleUser === null || roleUser === undefined || roleUser === "ROLE_CUSTOMER") {
            return <a href="/" className="navbar-brand">FOOTBALL BOOKING</a>
        }

        if (roleUser === "ROLE_PITCHOWNER") {
            return <a href="/pitchowner/pitchList" className="navbar-brand">Sân bóng của tôi</a>
        }
    }

    function handleClickBookingOrder() {
        if (localStorage.getItem('token') !== null) {
            navigate('/bookingdetail')
        } else {
            navigate('/login')
        }
    }

    function handleLogout() {
        localStorage.removeItem('role')
        localStorage.removeItem('token')
        localStorage.removeItem('fullname')
        localStorage.removeItem('infor')
    }

    return (
        <div>
            <div className="container-fluid p-0">
                <div className="header">
                    <div className="navbar navbar-inverse">
                        <div className="container-fluid header-width">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="navbar-header">
                                        <button className="navbar-toggle" data-target="#mobile_menu" data-toggle="collapse"><span className="icon-bar" /><span className="icon-bar" /><span className="icon-bar" /></button>
                                        {/* <a href="#" className="navbar-brand">FOOTBALL BOOKING</a> */}
                                        {/* <Link to="/" className="navbar-brand">FOOTBALL BOOKING</Link> */}
                                        {homeLink()}
                                    </div>
                                    <div className="navbar-collapse collapse" id="mobile_menu">
                                        {
                                            navLink()
                                        }
                                        <ul className="nav navbar-nav navbar-right">

                                            {
                                                (localStorage.getItem('role') === 'ROLE_ADMIN')
                                                    ? <li><a href="#" className="dropdown-toggle" data-toggle="dropdown"> Admin <span className="caret" /></a>
                                                        <ul className="dropdown-menu">
                                                            <li><Link to="./list-user">Danh sách người dùng</Link></li>
                                                            <li><Link to="./add-user">Thêm người dùng</Link></li>
                                                        </ul>
                                                    </li>
                                                    : (localStorage.getItem('role') === 'ROLE_CUSTOMER') ? <li> <span onClick={handleClickBookingOrder}><span className="glyphicon glyphicon-book" /> Sân đặt</span>
                                                    </li> : ""
                                            }

                                            <li><Link to="/profile"><span className="glyphicon glyphicon-user" /> Profile</Link></li>
                                            <li><a href="#" className="dropdown-toggle" data-toggle="dropdown"><span className="glyphicon glyphicon-log-in" /> Login / Sign Up
                                                {(localStorage.getItem('fullname') !== null) ? ` (${localStorage.getItem('fullname')})` : ''}
                                                <span className="caret" /></a>
                                                <ul className="dropdown-menu">
                                                    {(localStorage.getItem('token')) !== null ? '' : <li><Link to="./login">Login</Link></li>}
                                                    <li><Link to="./signup">Sign Up</Link></li>
                                                    {(localStorage.getItem('token')) !== null ? <li><Link onClick={handleLogout} to="./login">Logout</Link></li> : ''}
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Header;