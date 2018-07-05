import React from 'react';
import OrderTotalRow from '../OrderTotalRow/OrderTotalRow';
import OrderTotalTotal from '../OrderTotalTotal/OrderTotalTotal';
import './order-total.scss';



var OrderTotal = React.createClass({

    propTypes: {
        orderItems: React.PropTypes.array,
        handleDeleteItemFromOrder: React.PropTypes.func,
        toggleDeleteNotification: React.PropTypes.func
    },

    render: function() {


        var orderItems = this.props.orderItems.map(
            (item, index) => {


                return (

                        <OrderTotalRow
                            itemDetails={item}
                            handleDeleteItemFromOrder={this.props.handleDeleteItemFromOrder}
                            toggleDeleteNotification={this.props.toggleDeleteNotification}
                            key={index}
                            index={index} />
                )
            }
        );

        return (
            <div>
                <section id="order-total">
                    <h2>Bici selezionata</h2>
                    <table className="order-total-table">
                        <tbody>
                            {orderItems}
                        </tbody>
                    </table>
                </section>
            </div>
        )
    }
});


module.exports = OrderTotal;
