import React from 'react';
import MenuFormContainer from '../MenuFormContainer/MenuFormContainer';
import OrderTotal from '../OrderTotal/OrderTotal';
import AddItemNotification from '../AddItemNotification/AddItemNotification';
import Footer from '../../DashboardView/Footer/Footer';
import {Link} from 'react-router';
import '../../App/app.scss';
import './custom-order-view.scss';

let CustomOrderView = React.createClass({

    propTypes: {
        notification: React.PropTypes.shape({
            add: React.PropTypes.bool,
            delete: React.PropTypes.bool,
            error: React.PropTypes.bool
        }),
        data: React.PropTypes.object,
        items: React.PropTypes.array,
        handleAddItemToOrder: React.PropTypes.func,
        handleDeleteItemFromOrder: React.PropTypes.func,
        toggleAddNotification: React.PropTypes.func,
        toggleDeleteNotification: React.PropTypes.func,
        toggleErrorNotification: React.PropTypes.func,
        toggleFormNotification: React.PropTypes.func,
    },

    render: function () {

        let nextButton;
        let bikeNoPresent;

        if (this.props.items.length > 0) {
            nextButton = <Link to="/additional-info">
                <button className="next-button">
                    Avanti
                </button>
            </Link>
        } else {
            nextButton = <button
                onClick={this.props.toggleFormNotification}
                className="next-button">
                Avanti
            </button>
        }

        return (
            <div className="custom-order-container">
                <div className="title-cover">
                    <h1>Scegli la tua bici</h1>
                    <div className="userProgress">
                        <div id="twoOfFive"/>
                    </div>
                </div>
                <div className="custom-order-view-wrap">

                    <AddItemNotification
                        notification={this.props.notification}/>
                    <div className="menu-form-container">
                        <MenuFormContainer
                            data={this.props.data}
                            handleAddItemToOrder={this.props.handleAddItemToOrder}
                            toggleAddNotification={this.props.toggleAddNotification}
                            toggleErrorNotification={this.props.toggleErrorNotification}/>
                    </div>
                    <div className="loading-icon">{bikeNoPresent}</div>
                    <div className="order-total-container">
                        <OrderTotal
                            orderItems={this.props.items}
                            handleDeleteItemFromOrder={this.props.handleDeleteItemFromOrder}
                            toggleDeleteNotification={this.props.toggleDeleteNotification}/>
                        {nextButton}
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
});

module.exports = CustomOrderView;
