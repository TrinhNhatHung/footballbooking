import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './profile.css'
import userApi from '../../api/userApi';

Profile.propTypes = {

};

function Profile(props) {

    function handleChangeName(e) {
        const newInfor = infor
        const fullName = e.target.value
        setInfor({
            ...newInfor,
            fullName
        })
    }

    function handleChangeEmail(e) {
        console.log("a")
        const newInfor = infor
        const email = e.target.value
        setInfor({
            ...newInfor,
            email
        })
    }

    function handlePasswordOld(e) {
        const passwordN = password
        const passwordOld = e.target.value
        setPassword({
            ...passwordN,
            passwordOld
        })
    }

    function handlePasswordNew(e) {
        const passwordN = password
        const passwordNew = e.target.value
        setPassword({
            ...passwordN,
            passwordNew
        })
    }

    function handlePasswordNewAgain(e) {
        const passwordN = password
        const passwordNewAgain = e.target.value

        setPassword({
            ...passwordN,
            passwordNewAgain
        })
    }

    function handleSubmitUpdate(e) {
        e.preventDefault()
        if (infor?.userId == undefined) {
            return
        }
        const checkPassword = async () => {
            console.log(infor)
            console.log(password)
            if (password.passwordOld !== '' && password.passwordNew !== '') {
                const response = await userApi.checkLogin({ "phone": infor.phone, "password": password.passwordOld });
                if (response.success && password.passwordNew === password.passwordNewAgain) {
                    const inforNew = {
                        userId: infor.userId,
                        fullname: infor.fullName,
                        email: infor.email,
                        password: password.passwordNew
                    }
                    const result = await userApi.updateUser(inforNew)

                    if (result.success == true) {
                        const newInformation = infor
                        setInfor({
                            ...newInformation,
                            fullName: infor.fullName,
                            email: infor.email,
                        })
                        localStorage.setItem('infor', JSON.stringify({
                            ...newInformation,
                            fullName: infor.fullName,
                            email: infor.email,
                        }));
                        localStorage.setItem('fullname', infor.fullName)
                    }
                }
            } else {
                const inforNew = {
                    userId: infor.userId,
                    fullname: infor.fullName,
                    email: infor.email,
                }
                const result = await userApi.updateUser(inforNew)
                if (result.success == true) {
                    const newInformation = infor
                    setInfor({
                        ...newInformation,
                        fullName: infor.fullName,
                        email: infor.email,
                    })
                    localStorage.setItem('infor', JSON.stringify({
                        ...newInformation,
                        fullName: infor.fullName,
                        email: infor.email,
                    }));
                    localStorage.setItem('fullname', infor.fullName)
                }

            }


        }
        checkPassword()
    }


    const [infor, setInfor] = useState(JSON.parse(localStorage.getItem("infor")))
    const [password, setPassword] = useState({
        passwordOld: '',
        passwordNew: '',
        passwordNewAgain: ''
    })
    const [check, setCheck] = useState({
        checkInfo: false,
        checkPassword: false
    })
    return (

        <div className="container mt-10 mb-10">

            <div className="row">

                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-5"><img className="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" />
                        <div className="font-weight-bold" style={{ marginTop: "10px" }}>{infor?.fullName}</div>
                    </div>
                </div>


                <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">

                    <form action="" method="POST" role="form">
                        <legend>Thông tin người dùng</legend>

                        <div className="form-group">
                            <label for="" className='title-profile'>Họ và Tên</label>
                            <input type="text" className="form-control" id="fullname" name='fullname' placeholder="Họ và tên" value={infor?.fullName} onChange={handleChangeName} />
                        </div>

                        <div className="form-group">
                            <label for="" className='title-profile'>Số điện thoại/Tài khoản</label>
                            <input type="text" className="form-control" id="phone" name='phone' placeholder="Số điện thoại" disabled value={infor?.phone} />
                        </div>

                        <div className="form-group">
                            <label for="" className='title-profile'>Email</label>
                            <input type="text" className="form-control" id="email" name='email' placeholder="Email" value={infor?.email} onChange={handleChangeEmail} />
                        </div>

                        <div className="form-group">
                            <label for="" className='title-profile'>Mật khẩu cũ</label>
                            <input type="password" className="form-control" id="passwordOld"
                                name='passwordOld'
                                placeholder="Mật khẩu cũ"
                                value={password.passwordOld}
                                onChange={handlePasswordOld}
                            />
                        </div>

                        <div className="form-group">
                            <label for="" className='title-profile'>Nhập mật khẩu mới</label>
                            <input type="password" className="form-control" id="passwordNew"
                                name='passwordNew'
                                placeholder="Mật khẩu mới"
                                value={password.passwordNew}
                                onChange={handlePasswordNew} />
                        </div>

                        <div className="form-group">
                            <label for="" className='title-profile'>Nhập lại mật khẩu mới</label>
                            {(password.passwordNew !== password.passwordNewAgain && password.passwordNew !== "" && password.passwordNewAgain !== "") ? <span className='errorPassword'>(Mật khẩu không hợp)</span> : ""}
                            <input type="password" className="form-control" id="passwordNewAgain"
                                name='passwordNewAgain'
                                placeholder="Nhập lại mật khẩu mới"
                                value={password.passwordNewAgain}
                                onChange={handlePasswordNewAgain} />
                        </div>


                        <div className="form-group" hidden>
                            <input type="text" className="form-control" id="userId" name='userId' placeholder="Input field" value={infor?.userId} />
                        </div>




                        <button type="submit" className="btn btn-primary btn-update-profile" onClick={handleSubmitUpdate}>Cập Nhật</button>
                    </form>

                </div>


            </div>

        </div>


    );
}

export default Profile;