
import React from 'react'
import sass from './orders-container.scss'
import BAOrder from '../BAOrder/BAOrder'
import lodash from 'lodash'
import {Goofy} from '../BAOrder/Pippo'

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
            let ordersArray = this.props.orders.filter(
                function(order) {
                    return order;
                }
            )

            let ordersHTMLElements = ordersArray.map(
                function(order) {

                   return <BAOrder
                                key={order._id}
                                order={order}/>
                   // return <Goofy/>;
                   // return <p> Perchè il mio componente non va? </p>
            }, this);

            if (ordersHTMLElements.length > 0) {
                return (
                    <div className="ba-orders-container">
                        {ordersHTMLElements}
                    </div>
                )
            }
            else if (ordersHTMLElements.length === 0) {
                return (
                    <div className="no-orders">Nessuna bicicletta utilizzata</div>
                )
            }

        }


    }
});

module.exports = OrdersContainer;
