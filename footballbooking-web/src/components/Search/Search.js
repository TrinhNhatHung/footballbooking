import React from 'react';
import './search.css'
import '../../assets/css/base.css'

function Search(props) {
    return (

        <div className="row mb-30">
            <div className="col-xs-10 col-sm-10 col-md-10 col-lg-8 p-0">
                <input type="search" name="" id="input" className="control-form search-input pl-10" value="" required="required" title="" placeholder='Nhập tên sân hoặc là địa chỉ...' />
            </div>

            <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 p-0">

                <button type="button" className="button-main">
                    <span className="glyphicon glyphicon-search"></span>
                </button>

            </div>

        </ div >


    );
}

export default Search;