import React from 'react';
import PropTypes from 'prop-types';
import './footer.css'

Footer.propTypes = {

};

function Footer(props) {
    return (
        <footer className="bg-light text-center text-lg-start">
            <div className="container p-4">
                <div className="row">
                    <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
                        <h5 className="text-uppercase">Giới thiệu</h5>
                        <p>
                            Cùng nhau đặt sân và ra sân hết mình. Nơi đặt sân thuận lợi, dễ dàng, giúp cho người dùng
                            tiết kiệm thời gian để tìm sân và đặt. Hãy mang giày và cũng anh em ra sân giải tỏa mọi căng
                            mệt mỏi nào. Chiến thôi mọi người
                        </p>
                    </div>
                    <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
                        <h5 className="text-uppercase">Liên hệ</h5>
                        <div>
                            Facebook: https://www.facebook.com/tien.nquyen.77/
                        </div>
                        <div>Số điện thoại: 0356112087</div>
                        <div>Email: nguyenvantien3042k@gmail.com</div>
                    </div>
                </div>
            </div>
            <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                © 2022 Copyright:
                <a className="text-dark" href="https://BongDaDep.com/">BongDaDep.com</a>
            </div>
        </footer>
    );
}

export default Footer;