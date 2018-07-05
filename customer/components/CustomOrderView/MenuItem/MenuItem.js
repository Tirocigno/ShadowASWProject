import React from 'react';
import _ from 'lodash';
import AddToOrderButton from '../Options/AddToOrderButton';
import './menu-item.scss';

var MenuItem = React.createClass({

    propTypes: {
        itemName: React.PropTypes.string,
        price: React.PropTypes.number,
        options: React.PropTypes.arrayOf(React.PropTypes.string),
        key: React.PropTypes.string,
        handleAddItemToOrder: React.PropTypes.func,
        calculateTotalAndTax: React.PropTypes.func,
        toggleAddNotification: React.PropTypes.func,
        toggleErrorNotification: React.PropTypes.func
    },

    getInitialState: function() {
        return {}
    },

    _handleAddItemToOrder: function(itemDetails) {
        this.props.handleAddItemToOrder(itemDetails)
        this.replaceState({})
    },


    _renderOption: function(option, index) {
    },

    _renderOption2: function(option, index) {
    },


    render: function() {
         return (
            <div className="item">

                {}
                <div className="item-name-wrap">

                    <div className="item-name"><label>{this.props.itemName}</label></div>

                </div>

                <div className="item-other-options">

                    <AddToOrderButton
                        handleAddItemToOrder={this._handleAddItemToOrder}
                        handleItemFormComplete={this._handleItemFormComplete}
                        toggleAddNotification={this.props.toggleAddNotification}
                        toggleErrorNotification={this.props.toggleErrorNotification}
                        itemName={this.props.itemName}
                        itemDetails={this.state} />
                </div>
            </div>
        )
    }
});


module.exports = MenuItem;
