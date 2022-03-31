import React from 'react';
import PropTypes from 'prop-types';
import '../../assets/css/base.css';
import './pagination.css'

Pagination.propTypes = {

};

function Pagination(props) {
    return (
        <div className='pagination'>
            <button className="button button--skoll pagination-left">
                <span className='glyphicon glyphicon-arrow-left'>
                </span>
            </button>
            <button className="button button--skoll pagination-right">
                <span className='glyphicon glyphicon-arrow-right'>
                </span>
            </button>
        </div>
    );
}

export default Pagination;