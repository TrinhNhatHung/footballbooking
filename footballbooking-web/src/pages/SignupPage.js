import React from 'react';
import PropTypes from 'prop-types';
import Register from '../components/Register/Register';
import userApi from '../api/userApi';
import { useNavigate } from 'react-router-dom';

SignupPage.propTypes = {

};

function SignupPage(props) {
    const navigate = useNavigate()
    function handleSignUp(params) {
        const checkLogin = async () => {
            const response = await userApi.signUp(params);
            if (response.success === true) {
                navigate('/login')
            } else {
                console.log("ERROR")
            }
        }
        checkLogin()
    }

    return (
        <Register onClickSignup={handleSignUp} />
    );
}

export default SignupPage;