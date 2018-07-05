import React from 'react';
import OrderTotal from '../../CustomOrderView/OrderTotal/OrderTotal';
import Footer from '../../DashboardView/Footer/Footer';
import {Link} from 'react-router';
//import '../../App/app.scss';
import './order-summary.scss';

let OrderSummaryView = React.createClass({

    propTypes: {
        items: React.PropTypes.array,
        handleDeleteItemFromOrder: React.PropTypes.func,
        handleOrderSubmit: React.PropTypes.func
    },

    render: function () {
        return (
            <div>
                <div className="main-wrap">
                    <div className="order-summary-container">
                        <div className="title-cover">
                            <h1>Conferma utilizzo bicicletta</h1>
                            <div className="userProgress">
                                <div id="fourOfFive">
                                </div>
                            </div>
                        </div>



                        <Link to="/confirmation" className="order-summary-link">
                            <button
                                onClick={this.props.handleOrderSubmit}
                                className="next-button order-summary-button">
                                Sblocca bicicletta
                                <i className="fa fa-check fa-lg" aria-hidden="true"/>
                            </button>
                        </Link>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
});

module.exports = OrderSummaryView;
