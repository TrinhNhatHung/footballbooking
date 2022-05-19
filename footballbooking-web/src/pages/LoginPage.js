import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Login from '../components/Login/Login';
import userApi from '../api/userApi';
import axios from 'axios';
import queryString from 'query-string';
import { useNavigate } from 'react-router-dom';
import AlertNotification from '../components/AlertNotification/AlertNotification';

LoginPage.propTypes = {

};

function LoginPage(props) {

    const [input, setInput] = useState({})
    const navigate = useNavigate()

    function handleClickLogin(inputV) {
        setInput({
            ...inputV
        })
        const checkLogin = async () => {
            const response = await userApi.checkLogin(inputV);
            if (response.data.isAuthen === true) {
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('role', response.data.role)
                localStorage.setItem('fullname', response.data.fullName)
                navigate('/')
            } else {
                console.log("ERROR")
            }
        }
        checkLogin()
    }

    return (
        <div>
            <Login onClickLogin={handleClickLogin} />
        </div>

    );
}

export default LoginPage;