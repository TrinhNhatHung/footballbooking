import React from 'react';
import PropTypes from 'prop-types';

AddUser.propTypes = {

};

function AddUser(props) {
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
                                    <input type="text" className="form-control" name="name" id="name" placeholder="Họ và tên" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="name" className="col-sm-3 control-label">Số điện thoại</label>
                                <div className="col-sm-9">
                                    <input type="text" className="form-control" name="name" id="name" placeholder="Số điện thoại" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="name" className="col-sm-3 control-label">Mật khẩu</label>
                                <div className="col-sm-9">
                                    <input type="text" className="form-control" name="name" id="passwork" placeholder="Mật khẩu" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="name" className="col-sm-3 control-label">Email</label>
                                <div className="col-sm-9">
                                    <input type="text" className="form-control" name="name" id="email" placeholder="Email" />
                                </div>
                            </div>
                            <hr />
                            <div className="form-group">
                                <div className="col-sm-7">
                                    <button type="submit" className="btn btn-primary">Thêm</button>
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