import React from 'react';
import ShopList from '../ShopList/ShopList';
import Footer from '../../DashboardView/Footer/Footer';
import {Link} from 'react-router';
import '../../App/app.scss';
import './select-shop-view.scss';

let cond = 0;
global.selectedRack = 'Mad Cafè';

let SelectShopView = React.createClass({

    componentWillMount() {
        this.props.handleUserSelectedBike();
    },
    propTypes: {
        shops: React.PropTypes.arrayOf(React.PropTypes.object),
        bikes: React.PropTypes.arrayOf(React.PropTypes.object),
        handleSelectedShop: React.PropTypes.func,
        handleDeliveredBike: React.PropTypes.func,
        notification: React.PropTypes.object
    },

    render: function () {

        return this.props.orderCompleted ?

                <div className="select-shop-container">
                    <div>
                    </div>
                    <div className="title-cover">
                        <h1>Seleziona rastrelliera</h1>
                        <div className="userProgress">
                            <div id="oneOfFive">
                            </div>
                        </div>
                    </div>
                    <div className="main-wrap">
                        <div>
                            <ShopList
                                shops={this.props.shops}
                                handleSelectedShop={this.props.handleSelectedShop}/>
                        </div>
                    </div>
                    <Footer/>
                </div>
         :

                <div className="select-shop-container">
                    <div>
                    </div>
                    <div className="title-cover">
                        <h1>Vuoi consegnare la bici?</h1>

                    </div>
					{<div className="imgDiv">
						<img id="gifBike" src="img/bike.gif" alt="Bike Icon" className="imgGif"/>
					</div>}

                    <div className="main-wrap2">
                        <select id="racksSelect" name="racks" onChange={(e) => selectedRack = e.target.value}>
                            <option value="Mad Cafè" selected>Mad Cafè</option>
                            <option value="Rastrelliera Iper Coop Lungosavio, Cesena">Rastrelliera Iper Coop Lungosavio,
                                Cesena
                            </option>
                            <option value="Cimitero">Cimitero</option>
                            <option value="Parco per Fabio">Parco per Fabio</option>
                            <option value="Orogel Stadium Dino Manuzzi">Orogel Stadium Dino Manuzzi</option>
                            <option value="Cesena Rugby Club - Giovanili">Cesena Rugby Club - Giovanili</option>
                            <option value="Ippodromo Cesena">Ippodromo Cesena</option>
                            <option value="Biblioteca Malatestiana">Biblioteca Malatestiana</option>
                        </select>
                        <p>Data e Ora prelievo bici -> {this.props.dateAndTime}</p>
                        <p>Costo fino a questo momento -> &euro;{this.props.bikePrice} </p>
                        <Link to="/" className="order-summary-link">
                            <button id="buttonRacks"
                                onClick={this.props.handleDeliveredBike}
                                className="next-button order-summary-button">
                                Consegna bicicletta
                                <i className="fa fa-check fa-lg" aria-hidden="true"/>
                            </button>

                        </Link>
                    </div>
                    <Footer/>
                </div>



    }
});

module.exports = SelectShopView;
