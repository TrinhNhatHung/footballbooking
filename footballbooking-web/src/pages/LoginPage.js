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
            console.log("before")
            const response = await userApi.checkLogin(inputV);
            console.log("after")
            console.log("ax" + response.data.token)
            if (response.data.isAuthen === true) {
                localStorage.setItem('token', response.data.token)
                console.log(navigate(-1))
                navigate(-1)
            } else {
                console.log("ERROR")
            }
        }
        checkLogin()
    }



    // useEffect(() => {
    //     checkLogin();
    // }, [input])


    return (
        <div>
            {/* {
                (localStorage.getItem('token') != null) ? <AlertNotification message="Đã đăng nhập thành công !" /> : ""
            } */}
            <Login onClickLogin={handleClickLogin} />
        </div>


    );
}

export default LoginPage;