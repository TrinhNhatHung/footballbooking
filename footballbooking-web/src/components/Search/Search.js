import React, { useState } from 'react';
import './search.css'
import '../../assets/css/base.css'
import PropTypes from 'prop-types';

Search.propTypes = {
    onSubmit: PropTypes.func
}

Search.defaultProps = {
    onSubmit: null
}

function Search(props) {

    const { onFilterSubmit } = props;
    const [searchTerm, setSearchTerm] = useState('');

    function handleSearchTermChange(e) {
        setSearchTerm(e.target.value)
    }

    function handleButtonClick() {
        if (onFilterSubmit) {
            const formValues = {
                searchTerm,
            }
            onFilterSubmit(formValues)
        }
    }

    return (

        <div className="row mb-30">
            <div className="col-xs-10 col-sm-10 col-md-10 col-lg-8 p-0">
                <input type="search" name="" id="input" className="control-form search-input pl-10" required="required" title="" placeholder='Nhập tên sân hoặc là địa chỉ...'
                    value={searchTerm}
                    onChange={handleSearchTermChange} />
            </div>

            <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 p-0">

                <button type="button"
                    className="button-main"
                    onClick={handleButtonClick}>
                    <span className="glyphicon glyphicon-search"></span>
                </button>

            </div>

        </ div >


    );
}

export default Search;