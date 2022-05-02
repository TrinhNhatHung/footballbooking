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
    const [bookingOrder, setBookingOrder] = useState('/login')
    const { status } = props
    const navigate = useNavigate()

    function handleClickBookingOrder() {
        if (localStorage.getItem('token') !== null) {
            navigate('/bookingdetail')
        } else {
            navigate('/login')
        }
    }

    function handleLogout() {
        localStorage.removeItem('token')
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
                                        <a href="#" className="navbar-brand">FOOTBALL BOOKING</a>
                                    </div>
                                    <div className="navbar-collapse collapse" id="mobile_menu">
                                        <ul className="nav navbar-nav">
                                            <li className=""><Link to="/">Home</Link></li>
                                            <li><a href="#">Welcome</a></li>
                                        </ul>
                                        <ul className="nav navbar-nav navbar-right">
                                            {/* (localStorage.getItem('token')) !== null ? "./bookingdetail" : "login" */}
                                            <li><span onClick={handleClickBookingOrder}><span className="glyphicon glyphicon-book" /> Sân đặt</span></li>
                                            <li><a href="#"><span className="glyphicon glyphicon-user" /> Profile</a></li>
                                            <li><a href="#" className="dropdown-toggle" data-toggle="dropdown"><span className="glyphicon glyphicon-log-in" /> Login / Sign Up <span className="caret" /></a>
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
        </div>
    );
}

export default Header;