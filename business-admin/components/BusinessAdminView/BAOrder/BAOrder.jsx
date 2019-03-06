import React from 'react'
import BAOrderDetails from '../BAOrderDetails/BAOrderDetails'
import am_pm_to_24_string from '../../../../formatHour'

let BAOrder = React.createClass({
//Usa propTypes per abilitare il typechecking
    propTypes: {
        //Oggetto di tipo ordine.
        order: React.PropTypes.shape({
            _id: React.PropTypes.string,
            date: React.PropTypes.string,
            selectedShop: React.PropTypes.string,
            items: React.PropTypes.arrayOf(React.PropTypes.shape({
                itemName: React.PropTypes.string,
            })),
            //Tempo trascorso
            time: React.PropTypes.string,
            //Username di chi fa la prenotazione
            username: React.PropTypes.string,
            //Flag per indicare resituzione o meno.
            orderCompleted: React.PropTypes.bool
        }),
    },

    /**
     * Proietta sulla mappa la posizione di una bicicletta.
     */
    trackBike: function () {
        let rand = Math.floor(Math.random() * (10));
        let coord = require('../../../../randomCoordinates.json');
        let directions = 'http://maps.google.com/?saddr=' + '&daddr=' + coord.randomCoordinates[rand].lat + ',' + coord.randomCoordinates[rand].lng;
        window.open(directions);
    },

    /**
     * Mette in uppercase il nome di un utente
     * @param username l'username dell'utente da manipolare
     * @returns {string} l'username con la prima lettera maiuscola
     * @private
     */
    _manipulateUsername: function (username) {
        let name = '';
        let i;
        let ended = false;
        for (i = 0; i < username.length; i++) {
            if (username[i] !== '.' && !ended) {
                name += username[i];
            } else if (username[i] === '.') {
                ended = true
            }
        }
        name = name.charAt(0).toUpperCase() + name.slice(1);
        return name;
    },

    /**
     * Funzione che resituisce lo scheletro della pagina
     * @returns {*} il codice HTML della pagina.
     */
    render: function () {
        let orderDetails = this.props.order.items.map(
            function (item, i) {
                return <BAOrderDetails
                    key={i}
                    item={item}/>
            });

        return (
            <div>
                <div className={this.props.order.orderCompleted ? "ba-order ba-order-complete" : "ba-order"}>
                    <div className="ba-order-left">
                        <h2>{this._manipulateUsername(this.props.order.username)}</h2> <p>{am_pm_to_24_string(this.props.order.time)} - {this.props.order.date}</p>
                        <div><span className="item-name">{this.props.order.selectedShop}</span></div>
                        {orderDetails}
                    </div>
                    <div className="ba-order-right">
                        {this.props.order.orderCompleted ?
                            <p>
                                Consegnata
                                <i className="fa fa-check-circle fa" aria-hidden="true"/>
                            </p>
                            :
                            <button id="traccia" onClick={this.trackBike}>
                                Traccia
                                <i className="fa fa-map-marker fa-lg" aria-hidden="true"/>
                            </button>
                        }
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = BAOrder;
