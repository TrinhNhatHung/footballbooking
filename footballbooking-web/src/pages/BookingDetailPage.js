import React from 'react';
import PropTypes from 'prop-types';
import BookingDetail from '../components/BookingDetail/BookingDetail';
import { useNavigate } from 'react-router-dom';

BookingDetailPage.propTypes = {

};

function BookingDetailPage(props) {

    const navigate = useNavigate()

    return (
        <div className='main-container'>
            {(localStorage.getItem('token') !== null) ? <BookingDetail /> : navigate('/login')}
        </div>
    );
}

export default BookingDetailPage;