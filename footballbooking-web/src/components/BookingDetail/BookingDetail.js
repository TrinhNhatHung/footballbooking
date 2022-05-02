import React from 'react';
import PropTypes from 'prop-types';
import './bookingDetail.css'
import { Link } from 'react-router-dom';

BookingDetail.propTypes = {

};

function BookingDetail(props) {
    function handleOnClickDeletePitch() {

    }
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

                <table class="table table-striped table-hover">
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
                        <tr>
                            <td>Tên sân</td>
                            <td>tdời gian</td>
                            <td>Loại sân</td>
                            <td>Tiền</td>
                            <td><span className='warning'>Chưa xác nhận</span></td>
                            <td><button type="button" class="btn btn-large btn-block btn-danger">Hủy</button></td>
                        </tr>
                        <tr>
                            <td>Tên sân</td>
                            <td>tdời gian</td>
                            <td>Loại sân</td>
                            <td>Tiền</td>
                            <td><span className='accept'>Đã xác nhận</span></td>
                            <td><button type="button" class="btn btn-large btn-block btn-danger">Hủy</button></td>
                        </tr>
                        <tr>
                            <td>Tên sân</td>
                            <td>tdời gian</td>
                            <td>Loại sân</td>
                            <td>Tiền</td>
                            <td><span className='cancel'>Đã hủy</span></td>
                            <td>
                                {/* <button type="button" className="btn btn-large btn-block btn-danger">Hủy</button> */}
                                <button className='btn btn-large btn-block btn-danger' data-toggle="modal" data-target="#exampleModalDetail">
                                    <span>Hủy</span>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>
            <div className="modal fade" id="exampleModalDetail" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Hủy Sân</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div>Bạn có muốn hủy sân không?</div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Đóng</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={handleOnClickDeletePitch}>Đặt sân</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default BookingDetail;