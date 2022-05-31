import React from 'react';
import './alertWarning.css'

AlertNotification.propTypes = {

};

function AlertNotification(props) {
    const { message } = props

    function handleClickClose() {
        document.getElementById('notification').classList.add('hide')
        document.getElementById('notification').classList.remove('show')

    }

    // function hideMessage() {
    //     document.getElementById('notification').classList.add('hide')
    //     document.getElementById('notification').classList.remove('show')

    // }
    // setTimeout(hideMessage, 5000)

    return (
        <div className="alert showAlert hide" id='notification'>
            {/* <span className="fa fa-check style-icon" /> */}
            <span className='glyphicon glyphicon-info-sign style-icon'></span>
            <span className="msg">Đặt sân không thành công</span>
            <div className="close-btn" onClick={handleClickClose}>
                <span className='glyphicon glyphicon-remove style-icon'></span>
            </div>
        </div>
    );
}

export default AlertNotification;