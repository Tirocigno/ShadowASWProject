import React from 'react';
import './directions-and-call.scss';

let DirectionsAndCall = React.createClass({

    propTypes: {
        selectedShop: React.PropTypes.object,
        userLocation: React.PropTypes.shape({
            lat: React.PropTypes.number,
            lng: React.PropTypes.number
        }),
        selectedShopLocation: React.PropTypes.shape({
            lat: React.PropTypes.number,
            lng: React.PropTypes.number
        })
    },

    render: function () {

        let userLocation = this.props.userLocation;
        let selectedShopAddress = this.props.selectedShop.formatted_address.split(' ').join('+');

        let directions = 'http://maps.google.com/?saddr=' + userLocation.lat + ',' + userLocation.lng + '&daddr=' + selectedShopAddress;

        return (
            <div className="confirmation-button-wrap">
                <a href={directions} target="_blank">
                    <button className="next-button confirmation-button">
                        Posizione
                        <i className="fa fa-map-marker fa-lg" aria-hidden="true"/>
                    </button>
                </a>

            </div>
        )
    }
});

module.exports = DirectionsAndCall;
