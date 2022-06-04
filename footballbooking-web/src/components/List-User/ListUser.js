import React, { useEffect, useState } from 'react';
import Search from '../Search/Search';
import './listUser.css'
import Pagination from '../Paganation/Pagination';
import adminApi from '../../api/adminApi';

ListUser.propTypes = {

};

function ListUser(props) {

    const [filter, setFilter] = useState({
        page: 1,
        limit: 4,
        searchByNameOrPhone: "",
        roleId: 1,
    })

    const [checkLock, setCheckLock] = useState(true)

    const [users, setUsers] = useState([])

    function handleSearch(formValues) {
        const filterNew = filter
        const searchByNameOrPhone = formValues.searchTerm
        setFilter({
            ...filterNew,
            page: 1,
            searchByNameOrPhone
        })
    }

    function handleClickPagination(type) {
        const filterNew = filter
        let page = filter.page
        if (type === 'next') {
            if (users.length === filter.limit) {
                page = page + 1
            }
        } else {
            if (filter.page !== 1) {
                page = filter.page - 1
            }
        }
        console.log(page + " --- " + users.length)
        setFilter({
            ...filterNew,
            page
        })
    }

    function handleToggleLock(userId) {
        const updateStatusUser = async () => {
            const response = await adminApi.updateStatusAccount(userId);
            if (response.success) {
                const isCheck = !checkLock
                setCheckLock(isCheck)
            }
        }
        updateStatusUser();
    }

    function handleChangeRole(e) {
        const filterNew = filter
        const roleId = e.target.value
        setFilter({
            ...filterNew,
            roleId
        })
    }

    useEffect(() => {
        const fetchUserssList = async () => {
            const response = await adminApi.getListUsers(filter);
            setUsers(response.data.users)
            console.log(response.data.users)
        }
        console.log(filter)
        fetchUserssList();
    }, [filter, checkLock])

    return (
        <div className='main-container'>
            <div className="container mf-30 p-0" >

                <div class="row">
                    <div class="col-xs-0 col-sm-4 col-md-6 col-lg-6">
                    </div>
                    <div class="col-xs-10 col-sm-6 col-md-4 col-lg-4">
                        <Search onFilterSubmit={handleSearch} />
                    </div>
                    <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        <select className='select' value={filter.role} onChange={handleChangeRole}>
                            <option value="1">Chủ sân</option>
                            <option value="2">Người dùng</option>
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
                            {console.log("=====" + users.length)
                            }
                            {
                                users.map((user) => (
                                    <tr key={user.userId}>
                                        <td>{user.fullname}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.email}</td>
                                        <td>Quảng Nam</td>
                                        <th className='center'><span className={(user.status) ? 'accept' : 'cancel'}>{(user.status) ? 'Mở' : 'Đã khóa'}</span></th>
                                        <td>
                                            {
                                                (user.status) ? <button type="button" class="btn btn-warning" data-toggle="modal" data-target={`#modelLockUnLock${user.userId}`}>Khóa</button>
                                                    : <button type="button" class="btn btn-warning" data-toggle="modal" data-target={`#modelLockUnLock${user.userId}`}>Mở khóa</button>
                                            }
                                        </td>
                                        <div className="modal fade" id={`modelLockUnLock${user.userId}`} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog" role="document">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="exampleModalLabel">{(user.status) ? "Khóa tài khoản"
                                                            : "Mở khóa tài khoản"}</h5>
                                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div className="modal-body">
                                                        {
                                                            (user.status) ? <div>Bạn có muốn khóa tài khoản này không ?</div>
                                                                : <div>Bán có muốn mở khóa tài khoản này không ?</div>
                                                        }
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Đóng</button>
                                                        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => handleToggleLock(user.userId)}>Có</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <Pagination onClickPagination={handleClickPagination} />
            </div>
        </div>
    );
}

export default ListUser;