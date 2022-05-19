import React from 'react';
import PropTypes from 'prop-types';
import Search from '../Search/Search';
import './listUser.css'

ListUser.propTypes = {

};

function ListUser(props) {
    return (
        <div className='main-container'>
            <div className="container mf-30 p-0" >

                <div class="row">
                    <div class="col-xs-0 col-sm-4 col-md-6 col-lg-6">
                    </div>
                    <div class="col-xs-10 col-sm-6 col-md-4 col-lg-4">
                        <Search />
                    </div>
                    <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        <select className='select'>
                            <option>Chủ sân</option>
                            <option>Người dùng</option>
                        </select>
                    </div>
                </div>

                <div class="table-hover">
                    <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th className='title-list'>Tên người dùng</th>
                                <th className='title-list'>Số điện thoại</th>
                                <th className='title-list'>Email</th>
                                <th className='title-list'>Địa chỉ</th>
                                <th className='title-list'>Trạng thái</th>
                                <th className='title-list'>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Nguyễn Văn Tiên</td>
                                <td>0356112087</td>
                                <td>tien@gmail.com</td>
                                <td>Quảng Nam</td>
                                <th>Đã khóa</th>
                                <td>
                                    <button type="button" class="btn btn-warning">Mở khóa</button>
                                </td>
                            </tr>
                            <tr>
                                <td>Nguyễn Văn Tiên</td>
                                <td>0356112087</td>
                                <td>tien@gmail.com</td>
                                <td>Quảng Nam</td>
                                <th>Mở</th>
                                <td>
                                    <button type="button" class="btn btn-warning">Khóa</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ListUser;