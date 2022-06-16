import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './addUser.css'
import adminApi from '../../api/adminApi';
import { useNavigate } from 'react-router-dom';

AddUser.propTypes = {

};

function ValidateEmail(input) {

    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (input?.match(validRegex)) {
        return true;
    } else {
        return false;
    }
}

function ValidatePhone(input) {

    var validRegex = /^\d{10}$/;
    if (input?.match(validRegex)) {
        return true;
    } else {
        return false;
    }
}

function AddUser(props) {

    const [inforOwner, setInforOwner] = useState({})
    const [passwordAgain, setPasswordAgain] = useState('')
    const [checkPhone, setCheckPhone] = useState(true)
    let navigate = useNavigate()

    function handleChangeName(e) {
        const inforNew = inforOwner
        const fullname = e.target.value
        setInforOwner({
            ...inforNew,
            fullname
        })
    }

    function handleChangePassword(e) {
        const inforNew = inforOwner
        const password = e.target.value
        setInforOwner({
            ...inforNew,
            password
        })
    }

    function handleChangePhone(e) {
        const inforNew = inforOwner
        const phone = e.target.value
        setInforOwner({
            ...inforNew,
            phone
        })
    }

    function handleChangeEmail(e) {
        const inforNew = inforOwner
        const email = e.target.value
        setInforOwner({
            ...inforNew,
            email
        })
    }

    function handleChangePasswordAgain(e) {
        setPasswordAgain(e.target.value)
    }

    function handleSubmitAddOwner(e) {
        e.preventDefault()
        const addOwner = async () => {
            const response = await adminApi.addOwner(inforOwner);
            setCheckPhone(response.success)
            if (response.success) {
                navigate('../list-user')
            }
        }
        if (inforOwner.password === passwordAgain && inforOwner.password !== "" && passwordAgain !== "" && ValidatePhone(inforOwner.phone) && ValidateEmail(inforOwner.email)) {
            addOwner();
        }

    }

    return (
        <div className='main-container'>
            < div className="container mf-30 p-0" >
                <section className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Thêm người dùng</h3>
                    </div>
                    <div className="panel-body">
                        <form action="designer-finish.html" className="form-horizontal" role="form">
                            <div className="form-group">
                                <label htmlFor="name" className="col-sm-3 control-label">Họ và Tên</label>
                                <div className="col-sm-9">
                                    <input type="text"
                                        className="form-control"
                                        name="fullname" id="fullname" placeholder="Họ và tên"
                                        value={inforOwner.name}
                                        onChange={handleChangeName} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="name" className="col-sm-3 control-label">Số điện thoại</label>
                                <div className="col-sm-9">
                                    <input type="text"
                                        className="form-control"
                                        name="phone" id="phone" placeholder="Số điện thoại"
                                        value={inforOwner.phone}
                                        onChange={handleChangePhone} />
                                    {(!checkPhone) ? <span className='errorPassword'>Số điện thoại đã dùng</span> : ""}
                                    {(!ValidatePhone(inforOwner.phone) && inforOwner.phone !== undefined) ? <span className='errorPassword'>Phone không hợp lệ</span> : ""}
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="name" className="col-sm-3 control-label">Mật khẩu</label>
                                <div className="col-sm-9">
                                    <input type="password" className="form-control" name="password" id="password" placeholder="Mật khẩu"
                                        value={inforOwner.password}
                                        onChange={handleChangePassword}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="name" className="col-sm-3 control-label">Mật khẩu</label>
                                <div className="col-sm-9">
                                    <input type="password" className="form-control" name="passwordAgain" id="passwordAgain" placeholder="Mật khẩu"
                                        value={passwordAgain}
                                        onChange={handleChangePasswordAgain}
                                    />
                                    {(inforOwner.password !== passwordAgain && inforOwner.password !== "" && passwordAgain !== "") ? <span className='errorPassword'>Mật khẩu không hợp</span> : ""}
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="name" className="col-sm-3 control-label">Email</label>
                                <div className="col-sm-9">
                                    <input type="text" className="form-control" name="email" id="email" placeholder="Email"
                                        value={inforOwner.email}
                                        onChange={handleChangeEmail}
                                    />
                                    {(!ValidateEmail(inforOwner.email) && inforOwner.email !== undefined) ? <span className='errorPassword'>Email không hợp lệ</span> : ""}
                                </div>
                            </div>
                            <hr />
                            <div className="form-group">
                                <div className="col-sm-7">
                                    <button type="submit" className="btn btn-primary" onClick={handleSubmitAddOwner}>Thêm</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default AddUser;