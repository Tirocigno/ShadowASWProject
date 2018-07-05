import React from 'react';
import _ from 'lodash';
import './options.scss';
import '../../App/app.scss';

let AddToOrderButton = React.createClass({


    propTypes: {
        handleAddItemToOrder: React.PropTypes.func,
        handleItemFormComplete: React.PropTypes.func,
        toggleAddNotification: React.PropTypes.func,
        toggleErrorNotification: React.PropTypes.func,
        itemName: React.PropTypes.string,
        price: React.PropTypes.number,
        itemDetails: React.PropTypes.shape({
            quantity: React.PropTypes.string,
        })
    },


    render: function () {

        let itemDetails = _.assign({itemName: this.props.itemName}, this.props.itemDetails);

        return (

            <div className="add-to-order-wrap">

                <div className='add-to-order'
                     onClick={() => {

                         if (takeBike) {
                             this.props.handleAddItemToOrder(itemDetails);
                             this.props.toggleAddNotification()
                         } else {
                             alert('Non puoi selezionare la bici, sei troppo distante!');
                         }

                     }}>
                    Seleziona
                </div>
            </div>
        )
    }
});

module.exports = AddToOrderButton;
