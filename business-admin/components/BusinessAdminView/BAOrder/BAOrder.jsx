import React from 'react'
import sass from './ba-order.scss'
import BAOrderDetails from '../BAOrderDetails/BAOrderDetails'
import Timer from '../Timer/Timer'
import request from 'superagent';
import am_pm_to_24_string from '../../../../formatHour'

let BAOrder = React.createClass({

    propTypes: {
        order: React.PropTypes.shape({
            _id: React.PropTypes.string,
            date: React.PropTypes.string,
            selectedShop: React.PropTypes.string,
            items: React.PropTypes.arrayOf(React.PropTypes.shape({
                itemName: React.PropTypes.string,
            })),
            time: React.PropTypes.string,
            username: React.PropTypes.string,
            orderCompleted: React.PropTypes.bool
        }),
    },

    trackBike: function () {
        let rand = Math.floor(Math.random() * (10));
        let coord = require('../../../../randomCoordinates.json');
        let directions = 'http://maps.google.com/?saddr=' + '&daddr=' + coord.randomCoordinates[rand].lat + ',' + coord.randomCoordinates[rand].lng;
        window.open(directions);
    },

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
