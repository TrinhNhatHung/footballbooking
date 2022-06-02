import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './profile.css'

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

    const [infor, setInfor] = useState(JSON.parse(localStorage.getItem("infor")))
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
                            <input type="text" className="form-control" id="fullname" placeholder="Họ và tên" value={infor?.fullName} onChange={handleChangeName} />
                        </div>

                        <div className="form-group">
                            <label for="" className='title-profile'>Số điện thoại/Tài khoản</label>
                            <input type="text" className="form-control" id="phone" placeholder="Số điện thoại" disabled value={infor?.phone} />
                        </div>

                        <div className="form-group">
                            <label for="" className='title-profile'>Email</label>
                            <input type="text" className="form-control" id="email" placeholder="Email" value={infor?.email} onChange={handleChangeEmail} />
                        </div>

                        <div className="form-group" hidden>
                            <input type="text" className="form-control" id="status" placeholder="Input field" value={true} />
                        </div>
                        <div className="form-group" hidden>
                            <input type="text" className="form-control" id="userId" placeholder="Input field" value={true} />
                        </div>




                        <button type="submit" className="btn btn-primary btn-update-profile">Cập Nhật</button>
                    </form>

                </div>


            </div>

        </div>


    );
}

export default Profile;