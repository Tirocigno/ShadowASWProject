import React from 'react'
import BAOrder from '../BAOrder/BAOrder'

/**
 *Gestisce il container degli ordini.
 */
var OrdersContainer = React.createClass({

    propTypes: {
        orders: React.PropTypes.oneOfType([
            React.PropTypes.object,
            React.PropTypes.array
        ]),
        completeOrder: React.PropTypes.func
    },

    /**
     * Se a Render viene passata una lista di orders, quest'ultima viene stampata a video.
     * Credo che venga richiamata dopo che i dati sono stati recuperati ma non ne sono sicurissimo
     * @returns {*}
     */
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
