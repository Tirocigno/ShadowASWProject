import React from 'react';
import AddItemNotification from '../AddItemNotification/AddItemNotification';
import './order-total-row.scss';


let OrderTotalRow = React.createClass({

    propTypes: {
        itemDetails: React.PropTypes.shape({
            itemName: React.PropTypes.string,
            price: React.PropTypes.number,
            quantity: React.PropTypes.string,
            size: React.PropTypes.string
        }),
        handleDeleteItemFromOrder: React.PropTypes.func,
        toggleDeleteNotification: React.PropTypes.func
    },

    _handleDeleteItem: function () {
        this.props.handleDeleteItemFromOrder(this.props.index);
        this.props.toggleDeleteNotification();
    },


    render: function () {

        let itemName = this.props.itemDetails.itemName;
        let quantity = this.props.itemDetails.quantity;
        let size = this.props.itemDetails.size;


        return (
            <tr className='order-total-row'>
                <td>
                    <p>{quantity}
                        <span>  </span>
                        {size}
                        <span> </span>
                        {itemName}
                    </p>

                </td>
                <td className='td-price'>

                        <span
                            title='Delete item from order'
                            onClick={
                                this._handleDeleteItem

                            }

                            className="delete-button">
                            <i className="fa fa-times fa-lg delete-item"/>
                        </span>
                </td>
            </tr>
        )
    }
});

module.exports = OrderTotalRow;
