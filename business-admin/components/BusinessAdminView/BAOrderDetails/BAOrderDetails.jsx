
import React from 'react'
import sass from './ba-order-details.scss'

/**
 * Fa più o meno la stessa cosa di BAOrders, ma gestisce solo i dettagli ovvero il nome della bici di un ordine e
 * lo shop da cui viene.
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
                <span className="item-name">Bike selected:{this.props.item.itemName}</span>
            </div>
        )
    }
});

module.exports = BAOrderDetails;
