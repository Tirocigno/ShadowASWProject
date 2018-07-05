import React from 'react';
import './previous-order-item.scss';

let PreviousOrderItem = React.createClass({

    render: function () {

        let item = this.props.previousOrderItem;

        return (
            <div className="prev-orders-item">
                <div className="prev-orders-item-top">
                    <div className="prev-orders-item-prop">
                        {item.quantity} -
                    </div>
                    {item.size ?
                        <div className="prev-orders-item-prop">
                            {item.size}
                        </div>
                        : ''}
                    <div className="prev-orders-item-prop">
                        {item.itemName}
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = PreviousOrderItem;
