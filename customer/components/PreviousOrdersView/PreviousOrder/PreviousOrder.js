import React from 'react';
import './previous-order.scss';
import PreviousOrderItem from '../PreviousOrderItem/PreviousOrderItem';

let PreviousOrder = React.createClass({

    render: function () {

        let previousOrderItems = this.props.previousOrder.items.map(function (item, index) {
            return <PreviousOrderItem
                previousOrderItem={item}
                key={index}/>
        });

        return (
            <div className="prev-orders">
                <h2>
                    {this.props.previousOrder.selectedShop}
                </h2>
                <div>{previousOrderItems}</div>
            </div>
        )
    }
});

module.exports = PreviousOrder;
