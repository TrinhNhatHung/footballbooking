import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './card.css'
import pitchApi from '../../api/pitchApi';
import getPitchs from '../../services/ApiCaller';
Card.propTypes = {

};

function Card(props) {

    // useEffect(() => {
    // const fetchPitchsList = async () => {
    //     const response = await pitchApi.getAll();
    //     console.log(response.data)
    // }
    // fetchPitchsList();
    // getPitchs('pitchservice/pitchs', 'GET', null).then(res => {
    //     console.log(res.data);
    // })
    // })

    return (
        <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-0">
                <div className='card'>
                    <div class="row">
                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 card-image">
                            <div className=''>
                                <img className='card-image-link' src='https://thegioithethao.vn/upload_images/images/2021/01/31/san-bong-da-osaka-img1.jpg' />
                            </div>
                        </div>

                        <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 card-information">
                            <div className='name b-b card-info-item'>
                                Sân Chuyên Việt
                            </div>
                            <div className='address b-b card-info-item'>
                                11 Thích Quảng Đức, Hòa Khánh, Liên Chiểu, Đà Nẵng
                            </div>
                            <div className='category b-b card-info-item'>
                                Sân 5
                            </div>
                            <div className='price-time b-b card-info-item'>
                                <span className='time'>5:00 - 16:00 Thứ 2 - Chủ Nhật</span>
                                <span className='price'>180.000VNĐ</span>
                            </div>
                            <div className='price-time b-b card-info-item'>
                                <span className='time'>17:00 - 22:00 Thứ 2 - Chủ Nhật</span>
                                <span className='price'>220.000VNĐ</span>
                            </div>
                            <div className='phone-number b-b card-info-item'>
                                <span className='phone-number-title'>Số điện thoại:</span>
                                <span className='phone-number-value'>0356112087</span>
                            </div>
                            <button className='button button--mimas'>
                                <span>Chi tiết</span>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>


    );
}

export default Card;