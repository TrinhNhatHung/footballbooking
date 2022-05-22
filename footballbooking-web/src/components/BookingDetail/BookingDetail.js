import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './bookingDetail.css'
import { Link } from 'react-router-dom';
import pitchApi from '../../api/pitchApi';

BookingDetail.propTypes = {

};

function BookingDetail(props) {

    const [listBooking, setListBooking] = useState([])
    const [status, setStatus] = useState(true)

    const handleOnClickDeletePitch = async (bookingId) => {
        const response = await pitchApi.cancelBooking(bookingId)
        if (response.success === true) {
            let statusnew = !status
            setStatus(statusnew)
        }

        console.log(bookingId)
        console.log("==")
        console.log(response)
    }

    useEffect(() => {
        const bookingInfor = async () => {
            const response = await pitchApi.bookingInfor()
            setListBooking(response.data)
            console.log(response.data)
        }
        bookingInfor();
        console.log("bookingInfor")

    }, [status])

    return (
        <div className='container mt-50'>
            <div className="card-booking-detail">

                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th className='title-booking'>Tên sân</th>
                            <th className='title-booking'>Thời gian</th>
                            <th className='title-booking'>Loại sân</th>
                            <th className='title-booking'>Tiền</th>
                            <th className='title-booking'>Trạng thái</th>
                            <th className='title-booking'>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listBooking?.map((e, index) => (
                            <tr key={index}>
                                <td>{e.pitchName}</td>
                                <td>{e.time}</td>
                                <td>{e.pitchTypeName}</td>
                                <td>{e.cost}VNĐ</td>
                                <td><span className={(e.status === 'Chờ xác nhận') ? 'warning' : (e.status === 'Đã hủy') ? 'cancel' : 'accept'}>{e.status}</span></td>
                                <td>
                                    <button className={(e.status === 'Chờ xác nhận') ? 'btn btn-large btn-block btn-danger' : 'btn btn-large btn-block btn-danger disabled'} data-toggle="modal" data-target={`#exampleModalDetail${e.bookingId}`} >
                                        <span>Hủy</span>
                                    </button>
                                    <div className="modal fade" id={`exampleModalDetail${e.bookingId}`} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="exampleModalLabel">Hủy Sân</h5>
                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">
                                                    <div>Bạn có muốn hủy sân không {e.bookingId}?</div>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Đóng</button>
                                                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => handleOnClickDeletePitch(e.bookingId)}>Hủy sân</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>

                            </tr>

                        ))}
                    </tbody>
                </table>

            </div>

        </div >
    );
}

export default BookingDetail;