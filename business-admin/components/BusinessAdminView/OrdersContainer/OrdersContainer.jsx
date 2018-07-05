import React from 'react'
import sass from './orders-container.scss'
import BAOrder from '../BAOrder/BAOrder'
import lodash from 'lodash'

var OrdersContainer = React.createClass({

    propTypes: {
        orders: React.PropTypes.oneOfType([
            React.PropTypes.object,
            React.PropTypes.array
        ]),
        completeOrder: React.PropTypes.func
    },

    render: function() {

        if (this.props.orders === null) {
            return (
                <div>
                    <i className="fa fa-cog fa-spin fa-3x fa-fw"></i>
                    <span className="sr-only">Loading...</span>
                </div>
            )
        } else {
            var filteredOrders = this.props.orders.filter(
                function(order) {
                    return order;
                }
            )

              var orders = filteredOrders.map(
                function(order) {

                    return <BAOrder
                                key={order._id}
                                order={order}/>
            }, this);

            if (orders.length > 0) {
                return (
                    <div className="ba-orders-container">
                        {orders}
                    </div>
                )
            }
            else if (orders.length === 0) {
                return (
                    <div className="no-orders">Nessuna bicicletta utilizzata</div>
                )
            }

        }


    }
});

module.exports = OrdersContainer;