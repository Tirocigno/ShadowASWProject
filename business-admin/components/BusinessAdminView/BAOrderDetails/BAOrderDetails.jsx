
import React from 'react'
import sass from './ba-order-details.scss'

/**
 * Fa più o meno la stessa cosa di BAOrders, ma gestisce solo i dettagli
 */
let BAOrderDetails = React.createClass({

    propTypes: {
        selectedShop: React.PropTypes.string,
        item: React.PropTypes.shape({
            itemName: React.PropTypes.string,
        }),
    },

    render: function () {

        return (
            <div className="ba-order-details-container">
                <span className="item-name">{this.props.item.itemName}</span>
            </div>
        )
    }
});

module.exports = BAOrderDetails;
