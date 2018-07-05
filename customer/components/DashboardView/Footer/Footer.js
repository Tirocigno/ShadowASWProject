import React from 'react';
import './footer.scss';

let Footer = React.createClass({


    render: function () {
        return (
            <div className="footer-container">
                <div className="footer-col-1">
                    <i className="fa fa-facebook-square fa-2x" aria-hidden="true"/>
                    <i className="fa fa-twitter-square fa-2x" aria-hidden="true"/>
                    <i className="fa fa-youtube-square fa-2x" aria-hidden="true"/>
                    <i className="fa fa-google-plus-square fa-2x" aria-hidden="true"/>
                    <i className="fa fa-instagram fa-2x" aria-hidden="true"/>
                    <i className="fa fa-linkedin-square fa-2x" aria-hidden="true"/>
                    <p className="footer-text footer-text-1">About Rent-a-Bike</p>
                    <p className="footer-text">Privacy Policy</p>
                    <p className="footer-text">Terms and Conditions</p>
                    <p className="footer-copyright">©2018 Rent-a-Bike</p>
                </div>
            </div>
        )
    }
});

module.exports = Footer;
