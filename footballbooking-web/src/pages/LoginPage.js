import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Login from '../components/Login/Login';
import userApi from '../api/userApi';
import axios from 'axios';
import queryString, { stringify } from 'query-string';
import { useNavigate } from 'react-router-dom';
import AlertNotification from '../components/AlertNotification/AlertNotification';

LoginPage.propTypes = {

};

function LoginPage(props) {

    const [input, setInput] = useState({})
    const navigate = useNavigate()
    const [check, setCheck] = useState(true)

    function handleClickLogin(inputV) {
        setInput({
            ...inputV
        })
        const checkLogin = async () => {
            console.log(JSON.stringify(inputV) + "v")
            if (JSON.stringify(inputV) != "{}") {
                const response = await userApi.checkLogin(inputV);
                if (response.data?.isAuthen === true) {
                    localStorage.setItem('token', response.data.token)
                    localStorage.setItem('role', response.data.role)
                    localStorage.setItem('fullname', response.data.fullName)
                    localStorage.setItem('infor', JSON.stringify(response.data));
                    setCheck(true)
                    if (response.data.role === "ROLE_CUSTOMER") {
                        navigate('/');
                    } else if (response.data.role === "ROLE_PITCHOWNER") {
                        navigate('/pitchowner/booking');
                    } else if (response.data.role === "ROLE_ADMIN") {
                        navigate('/');
                    } else {
                        console.log("ERROR")
                        setCheck(false)
                    }
                }
            }
        }
        checkLogin()

    }
    return (
        <div>
            <Login check={check} onClickLogin={handleClickLogin} />
        </div>

    );
}

export default LoginPage;