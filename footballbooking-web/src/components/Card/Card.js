import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './card.css'
import pitchApi from '../../api/pitchApi';
import getPitchs from '../../services/ApiCaller';
import { Link } from 'react-router-dom';
Card.propTypes = {
    pitchs: PropTypes.array,
    onPitchClick: PropTypes.func
};

Card.defaultProps = {
    pitchs: [],
    onPitchClick: null
}

function Card(props) {

    const { pitch, onPitchClick } = props;

    function handleClick(pitch) {
        if (onPitchClick) {
            onPitchClick(pitch)
        }
    }

    return (
        <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-0">
                <div className='card'>
                    <div className="row">
                        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 card-image">
                            <div className=''>
                                <img className='card-image-link' src='https://thegioithethao.vn/upload_images/images/2021/01/31/san-bong-da-osaka-img1.jpg' />
                            </div>
                        </div>

                        <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8 card-information">
                            <div className='name b-b card-info-item'>
                                {pitch.name}
                            </div>
                            <div className='address b-b card-info-item'>
                                {pitch.address.number} - {pitch.address.street}, {pitch.address.commune}, {pitch.address.district}, {pitch.address.city}
                            </div>
                            <div className='category b-b card-info-item'>
                                Sân
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
                            <Link to={'/pitchdetail/' + pitch.pitchId}>
                                <button className='button button--mimas'
                                    onClick={() => handleClick(pitch)}>
                                    <span>Chi tiết</span>
                                </button>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div >


    );
}

export default Card;