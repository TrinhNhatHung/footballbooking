import React from 'react';
import PropTypes from 'prop-types';
import './header.css';
import '../../assets/css/base.css';


Header.propTypes = {

};

Header.defaultProps = {

};

function Header(props) {
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
                                            <li className=""><a href="#">Home</a></li>
                                            <li><a href="#">Welcome</a></li>
                                        </ul>
                                        <ul className="nav navbar-nav navbar-right">
                                            <li><a href="#"><span className="glyphicon glyphicon-book" /> Đặt sân</a></li>
                                            <li><a href="#"><span className="glyphicon glyphicon-user" /> Profile</a></li>
                                            <li><a href="#" className="dropdown-toggle" data-toggle="dropdown"><span className="glyphicon glyphicon-log-in" /> Login / Sign Up <span className="caret" /></a>
                                                <ul className="dropdown-menu">
                                                    <li><a href="./login.html">Login</a></li>
                                                    <li><a href="./sign-up.html">Sign Up</a></li>
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