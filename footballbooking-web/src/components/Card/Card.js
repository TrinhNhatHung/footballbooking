import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './card.css'
import pitchApi from '../../api/pitchApi';
import getPitchs from '../../services/ApiCaller';
import { Link, useNavigate } from 'react-router-dom';
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
            {console.log(pitch)}
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 p-0">
                <div className='card'>
                    <div className="row">
                        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 card-image">
                            <div className=''>
                                <img className='card-image-link' src= {pitch.coverAvatarLink} />
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
                                {/* {pitch?.detail[0]?.pitchTypeName} */}
                                {pitch?.detail?.map((e, index) => (
                                    (pitch?.detail?.length - 1 > index) ? `${e.pitchTypeName} - ` : `${e.pitchTypeName}`
                                ))}
                            </div>

                            {pitch?.detail[0]?.timeSlots?.map((e, index) => {
                                if (index < 2) {
                                    return (
                                        <div className='price-time b-b card-info-item'>
                                            <span className='time'>{e.timeStart} - {e.timeEnd}, {(e.dayOfWeekStart < 7) ? `Thứ ${e.dayOfWeekStart + 1}` : "Chủ nhật"} -
                                                {(e.dayOfWeekEnd < 7) ? `Thứ ${e.dayOfWeekEnd + 1}` : "Chủ nhật"}</span>
                                            <span className='price'>{e.cost}VNĐ</span>
                                        </div>
                                    )
                                }
                            }
                            )}

                            {/* <div className='price-time b-b card-info-item'>
                                <span className='time'>5:00 - 16:00 Thứ 2 - Chủ Nhật</span>
                                <span className='price'>180.000VNĐ</span>
                            </div>
                            <div className='price-time b-b card-info-item'>
                                <span className='time'>17:00 - 22:00 Thứ 2 - Chủ Nhật</span>
                                <span className='price'>220.000VNĐ</span>
                            </div> */}
                            <div className='phone-number b-b card-info-item'>
                                <span className='phone-number-title'>Số điện thoại:</span>
                                <span className='phone-number-value'>{pitch?.owner?.phone}</span>
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