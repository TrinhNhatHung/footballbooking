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
        // <div className="container mt-50">
        //     <article className="card-booking-detail">
        //         <header className="card-header"> My Booking / Tracking </header>
        //         <div className="card-body">
        //             <div className='inf-pitch-booking'>
        //                 <div className='pitch-name'>Sân chuyên việt</div>
        //                 <div className='inf-booking'>
        //                     <span>( sân 1, 12h, 150000vnđ )</span>
        //                 </div>
        //             </div>

        //             <div className="track">
        //                 <div className="step active"> <span className="icon"> <i className="fa fa-user" /> </span> <span className="text">Order confirmed</span> </div>
        //                 <div className="step active"> <span className="icon"> <i className="fa fa-check" /> </span> <span className="text"> Picked by courier</span> </div>
        //                 <div className="step active"> <span className="icon"> <i class="fas fa-check-circle" /></span> <span className="text"> On the way </span> </div>
        //             </div>
        //             <hr />
        //             <hr /> <Link to="/" className="btn btn-warning" data-abc="true"> <i className="fa fa-chevron-left" /> Back to home</Link>
        //         </div>
        //     </article>
        // </div>


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