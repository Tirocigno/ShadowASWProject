import React from 'react';
import './order-ready-time.scss';

var OrderReadyTime = React.createClass({

    propTypes: {
        methodOfTrans: React.PropTypes.string,
        pickupTime: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.bool
        ]),
        duration: React.PropTypes.string,
        expectedPickupTime: React.PropTypes.string
    },

    render: function () {

        var pickupTime;
        if (this.props.pickupTime === true) {
            pickupTime = <div className="order-ready-time-container">
                <h2 className="order-ready-time-pickup">Adesso puoi utilizzare la bicicletta!
                </h2>
            </div>
        }


        return (
            <div>
                {pickupTime}
            </div>
        )
    }
});

module.exports = OrderReadyTime;
