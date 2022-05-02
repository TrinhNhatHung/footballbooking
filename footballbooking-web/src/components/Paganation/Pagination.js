import React from 'react';
import PropTypes from 'prop-types';
import '../../assets/css/base.css';
import './pagination.css'

Pagination.propTypes = {
    onClickPagination: PropTypes.func
};

Pagination.defaultProps = {
    onClickPagination: null
};

function Pagination(props) {
    const { onClickPagination } = props
    function handleClickPage(type) {
        if (onClickPagination) {
            onClickPagination(type)
            console.log(type)
        }

    }
    return (
        <div className='pagination'>
            <button className="button button--skoll pagination-left" onClick={() => handleClickPage('pre')}>
                <span className='glyphicon glyphicon-arrow-left'>
                </span>
            </button>
            <button className="button button--skoll pagination-right" onClick={() => handleClickPage('next')}>
                <span className='glyphicon glyphicon-arrow-right'>
                </span>
            </button>
        </div>
    );
}

export default Pagination;