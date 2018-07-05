import React from 'react';
import {Link} from 'react-router';
import dummyShopData from '../../../dummy-shop-data.json';
import UsernameView from '../UsernameView/UsernameView/LoginView';
import _ from 'lodash';
import api from '../../api';
import request from 'superagent';
import cookie from 'js-cookie';
import moment from 'moment';
import axios from 'axios';
import calculatePrice from '../../../utility';
import am_pm_to_24_string from '../../../formatHour';

let sha512 = require('sha512');
let geolib = require('geolib');

const DISTANCE = 900;

global.nameCC = '';
global.numberCC = '';
global.monthCC = '';
global.yearCC = '';
global.CCVCC = '';
global.slcRack = '';
global.slcBike = '';
global.actualPosition = null;
global.completed_order = true;
global.takeBike = false;
global.leaveBike = false;

let App = React.createClass({
    getInitialState: function () {
        return {
            username: '',
            password: '',
            userLocation: {
                lat: '',
                lng: ''
            },
            shops: [],
            selectedShop: {},
            selectedBike: {},
            selectedShopLocation: {
                lat: '',
                lng: ''
            },
            distance: '',
            duration: '',
            durationSeconds: undefined,
            items: [],
            notification: {
                add: false,
                delete: false,
                error: false,
                form: false,
                additionalInfo: false,
                userLocation: false
            },
            paymentInfo: {
                nameOnCard: '',
                cardNumber: undefined,
                expMonth: '',
                expYear: '',
                cvv: undefined
            },
            previousOrders: [],
            availableBikes: [],
            orderCompleted: true,
            dateAndTime: '',
            bikePrice: 0.0,
            menuShow: false,
        }
    },

    componentWillMount: function () {
        this._handleCoffeeShopDummyState(dummyShopData);

        this._handleUsernameCheck();
        setTimeout(() => {
            this._handleUserLocationCheck();
        }, 8000);
    },

    _handleUserLocationCheck: function () {
        if (this.state.userLocation.lat === '') {
            this.setState({
                notification: {
                    userLocation: true
                }
            });
        }
    },

    // -------------- USERNAME VALIDATION --------------

    _handleUsernameCheck: function () {
        let usernameCookie = cookie.get('username');
        let passCookie = cookie.get('password');
        usernameCookie ? this._handleUsernameState(usernameCookie, passCookie)
            : '' // if there is a cookie, set it to the state, if not, do nothing
    },

    _handleUsernameState: function (usernameCookie, passwordCookie) {
        this.setState({
            username: usernameCookie,
            password: passwordCookie
        })
    },

    _handleUsername: function (username, password) {

        let obj = require('../../../users.json');
        let usersSet = false;

        for (let i = 0; i < obj.usersJSON.length; i++) {
            let hash = sha512(password);
            let passHashed = hash.toString('hex');
            if (username === obj.usersJSON[i].usernameJSON && passHashed.toUpperCase() === obj.usersJSON[i].passwordJSON) {
                if (username === 'admin' && password === 'admin') {
                    window.location.replace("/admin");
                }
                else {
                    cookie.set('username', username);
                    cookie.set('password', password);
                }
                usersSet = true;
            }
        }
        if (!usersSet) {
            alert('Username o password errati!');
            username = '';
            password = '';
        }
        if (username !== 'admin' && password !== 'admin') {
            this._handleUsernameState(username, password);
        }
    },

    _handleUsernameRemove: function () {
        cookie.remove('username');
        cookie.remove('password');
        location.reload();
    },

    // --------------USER LOCATION AND GOOGLE MAPS API CALL--------------

    _handleUserLocation: function (position) {
        this.setState({
            userLocation: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
        })
    },

    _handleGetLocation: function (position) {
        api.getShops(position, this._handleCoffeeShopState)
    },

    _handleCoffeeShopDummyState: function (shops) {
        this.setState({
            shops: shops
        })
    },

    _handleSelectedShop: function (shop) {

        api.getDetails(shop.place_id, this._handleSelectedShopDetails);
        this.setState({
            selectedShop: shop
        });
        slcRack = shop.nameAlt;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(myPosition, errorOnMyPosition, {enableHighAccuracy: true});
        } else {
            alert('La geolocalizzazione non è attivata');
        }

        function errorOnMyPosition() {
            alert('Errore sulla localizzazione');
        }

        function myPosition(position) {
            let userLat = position.coords.latitude;
            let userLong = position.coords.longitude;
            let rackLat = shop.geometry.location.lat;
            let rackLong = shop.geometry.location.lng;

            let distance = geolib.getDistance(
                {latitude: userLat, longitude: userLong},
                {latitude: rackLat, longitude: rackLong});

            takeBike = distance <= DISTANCE;
        }
    },

    _handleDeliveredBike: function (shop) {
        axios.patch('/api/orders/' + this.userName)
            .then((res) => {
            });

        this._handleUserSelectedBike();
        axios.patch('/api/bikes/' + selectedRack + '/' + slcBike).then();
        console.log(selectedRack);
        console.log(slcBike);
        this._handleStateClear();
        this.setState({
            orderCompleted: true
        });
        completed_order = true;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(myPosition, errorOnMyPosition, {enableHighAccuracy: true});
        } else {
            alert('La geolocalizzazione non è attivata');
        }

        function errorOnMyPosition() {
            alert('Errore sulla localizzazione');
        }

        function myPosition(position) {
            let userLat = position.coords.latitude;
            let userLong = position.coords.longitude;
            let rackLat = shop.geometry.location.lat;
            let rackLong = shop.geometry.location.lng;

            let distance = geolib.getDistance(
                {latitude: userLat, longitude: userLong},
                {latitude: rackLat, longitude: rackLong});

            if (distance > DISTANCE) {
                alert('Non puoi lasciare qui la bici, sei troppo distante!');

            } else {
                alert('Puoi lasciare qui la bici');
            }
        }
        window.location.replace('/');
    },

    _handleSelectedBike: function (bike) {
        //api.getDetails(bike.place_id, this._handleSelectedShopDetails);
        this.setState({
            selectedBike: bike
        })
    },

    _handleSelectedShopDetails: function (place) {
        this.setState({
            selectedShop: place
        });
        this._handleSelectedShopLocation(place);
    },

    _handleSelectedShopLocation: function (place) {
        this.setState({
            selectedShopLocation: {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
            },
        })
    },

    _handleDistanceAndDuration: function (response) {
        this.setState({
            distance: response.rows[0].elements[0].distance.text,
            duration: response.rows[0].elements[0].duration.text,
            durationSeconds: response.rows[0].elements[0].duration.value
        })
    },

    // --------------SERVER API REQUESTS--------------

    _handleOrderSubmit: function () {

        let expectedPickupTime;
        if (this.state.pickupTime === true) {
            expectedPickupTime = moment().add(this.state.durationSeconds, 's').format('LT');
        } else {
            expectedPickupTime = '';
        }

        let date = moment().format('l');
        let time = moment().format('LT');


        request.post('/api/orders')
            .set('Content-Type', 'application/json')
            .send({
                username: this.state.username,
                selectedShop: this.state.selectedShop.name,
                selectedShop_id: this.state.selectedShop.place_id,
                selectedBike: this.state.selectedBike,
                date: date,
                time: time,
                orderCompleted: false,
                items: this.state.items
            })
            .end(function (err, res) {
                res.redirect();
                if (err) {
                    console.log(err);
                }
            });
        completed_order = false;

        axios.patch('/api/bikes/' + this.state.selectedBike).then();

        this._handleStateClear();
    },

    _handleStateClear: function () {
        this.setState({
            items: [],
            paymentInfo: {
                nameOnCard: '',
                cardNumber: undefined,
                expMonth: '',
                expYear: '',
                cvv: undefined
            },
        })
    },

    _handlePreviousOrders: function () {
        request.get('/api/users/' + String(this.state.username) + '/orders/previous')
            .end((err, res) => {
                this.setState({
                    previousOrders: res.body
                })
            });
    },

    _handleUserSelectedBike: function () {
        request.get('/api/users/' + String(this.state.username) + '/orders/bikes')
            .end((err, res) => {
                if (res.body.length > 0) {
                    this.setState({
                        orderCompleted: false
                    });
                    completed_order = false;
                    this.userName = res.body[0].username;
                    slcBike = res.body[0].selectedBike;
                    let dateTime = res.body[0].date + ' ' + am_pm_to_24_string(res.body[0].time);
                    this.setState({
                        dateAndTime: dateTime,
                        bikePrice: calculatePrice(res.body[0].date, res.body[0].time)
                    });
                    let bikeCost = calculatePrice(res.body[0].date, res.body[0].time);
                    this.setState({
                        bikePrice: bikeCost
                    });
                }
            });
    },

    // --------------OTHER APP METHODS--------------

    _handleClearGlobalVariables: function () {
        nameCC = '';
        numberCC = '';
        monthCC = '';
        yearCC = '';
        CCVCC = '';
    },

    _handleCCName: function (event) {
        let newPaymentInfo = _.assign(
            {},
            this.state.paymentInfo,
            {nameOnCard: event.target.value}
        );
        nameCC = event.target.value;
        this.setState({
            paymentInfo: newPaymentInfo
        });
    },

    _handleCCNumber: function (event) {
        let newPaymentInfo = _.assign(
            {},
            this.state.paymentInfo,
            {cardNumber: event.target.value}
        );
        numberCC = event.target.value;
        this.setState({
            paymentInfo: newPaymentInfo
        })
    },

    _handleCCExpMonth: function (event) {
        let newPaymentInfo = _.assign(
            {},
            this.state.paymentInfo,
            {expMonth: event.target.value}
        );
        monthCC = event.target.value;
        this.setState({
            paymentInfo: newPaymentInfo
        })
    },

    _handleCCExpYear: function (event) {
        let newPaymentInfo = _.assign(
            {},
            this.state.paymentInfo,
            {expYear: event.target.value}
        );
        yearCC = event.target.value;
        this.setState({
            paymentInfo: newPaymentInfo
        })
    },

    _handleCCCVV: function (event) {

        let newPaymentInfo = _.assign(
            {},
            this.state.paymentInfo,
            {cvv: event.target.value}
        );
        CCVCC = event.target.value;
        this.setState({
            paymentInfo: newPaymentInfo
        })
    },

    _toggleAddNotification: function () {
        this.setState({
            notification: {
                add: true
            }
        });
        let clearNotification = () => {
            this.setState({
                notification: {
                    add: false
                }
            })
        };
        setTimeout(clearNotification, 3000);
    },

    _toggleDeleteNotification: function () {
        this.setState({
            notification: {
                delete: true
            }
        });
        let clearNotification = () => {
            this.setState({
                notification: {
                    delete: false
                }
            })
        };
        setTimeout(clearNotification, 3000);
    },

    _toggleErrorNotification: function () {
        this.setState({
            notification: {
                error: true
            }
        });
        let clearNotification = () => {
            this.setState({
                notification: {
                    error: false
                }
            })
        };
        setTimeout(clearNotification, 3000);
    },

    _toggleFormNotification: function () {
        this.setState({
            notification: {
                form: true
            }
        });
        let clearNotification = () => {
            this.setState({
                notification: {
                    form: false
                }
            })
        };
        setTimeout(clearNotification, 3000);
    },

    _toggleAdditionalInfoNotification: function () {
        this.setState({
            notification: {
                additionalInfo: true
            }
        });
        let clearNotification = () => {
            this.setState({
                notification: {
                    additionalInfo: false
                }
            })
        };
        setTimeout(clearNotification, 3000);
    },


    _handleAddItemToOrder: function (itemDetails) {
        /* prima rimuovo il corrente e poi aggiungo il nuovo, si puo' avere solo una bici alla volta */
        this._handleDeleteItemFromOrder(0)

        this.setState({
            items: this.state.items.concat(itemDetails),
            selectedBike: itemDetails.itemName
        });
    },

    _handleDeleteItemFromOrder: function (index) {
        let items = this.state.items;
        items.splice(index, 1);
        this.setState({
            items: items
        })
    },

    _handleMenuToggle: function () {
        this.setState({
            menuShow: !this.state.menuShow
        });
    },

    render: function () {
        return (
            <div>
                {!this.state.username && !this.state.password ?
                    <UsernameView handleUsername={this._handleUsername}/> :
                    <div>
                        <nav className="top-nav">
                            <div
                                className="menu-bars"
                                onClick={() => {
                                    this._handleMenuToggle()
                                }}>
                                <i className={this.state.menuShow ? 'fa fa-times fa-2x' : 'fa fa-bars fa-2x'}
                                   aria-hidden="true"/>
                            </div>
                            <div className="top-nav-logo">
                                <img src="/img/favicon2.png"/>
                            </div>
                            <ul className={this.state.menuShow ? 'menu-show' : 'menu-hide'}>
                                <Link to="/" onlyActiveOnIndex={true} className='router-link'>
                                    <li onClick={() => {
                                        this._handleMenuToggle()
                                    }}>Dashboard
                                    </li>
                                </Link>
                                <Link to="/previous-orders" className="prev-orders-link">
                                    <li onClick={() => {
                                        this._handleMenuToggle()
                                    }}>Storico ordini
                                    </li>
                                </Link>
                                <Link to="/" className='router-link' onClick={this._handleUsernameRemove}>
                                    <li className="sign-out" onClick={() => {
                                        this._handleMenuToggle()
                                    }}>Logout
                                    </li>
                                </Link>
                            </ul>
                        </nav>
                        <nav className="side-nav">
                            <Link to="/" onlyActiveOnIndex={true} className='router-link'>
                                <div className="side-nav-logo">
                                    <img src="/img/favicon2.png"/>
                                </div>
                            </Link>
                            <Link to="/" onlyActiveOnIndex={true} className='router-link'>
                                <i className="fa fa-home fa-2x" aria-hidden="true"/>
                            </Link>
                            <Link to="/previous-orders" className="prev-orders-link">
                                <i className="fa fa-clock-o fa-2x"/>
                            </Link>
                            <div className="side-nav-divider"/>
                            <Link to="/" className='router-link' onClick={this._handleUsernameRemove}><i
                                className="fa fa-sign-out fa-2x" aria-hidden="true"/></Link>
                        </nav>

                        {React.cloneElement(this.props.children,
                            {
                                id: this.state.id,
                                username: this.state.username,
                                password: this.state.password,
                                userLocation: this.state.userLocation,
                                selectedShopLocation: this.state.selectedShopLocation,
                                shops: this.state.shops,
                                selectedShop: this.state.selectedShop,
                                selectedBike: this.state.selectedBike,
                                items: this.state.items,
                                handleSelectedShop: this._handleSelectedShop,
                                handleDeliveredBike: this._handleDeliveredBike,
                                distance: this.state.distance,
                                duration: this.state.duration,
                                notification: this.state.notification,
                                toggleAddNotification: this._toggleAddNotification,
                                toggleDeleteNotification: this._toggleDeleteNotification,
                                toggleErrorNotification: this._toggleErrorNotification,
                                toggleFormNotification: this._toggleFormNotification,
                                toggleAdditionalInfoNotification: this._toggleAdditionalInfoNotification,
                                handleAddItemToOrder: this._handleAddItemToOrder,
                                handleDeleteItemFromOrder: this._handleDeleteItemFromOrder,
                                pickupTime: this.state.pickupTime,
                                handleCCName: this._handleCCName,
                                handleCCNumber: this._handleCCNumber,
                                handleCCExpMonth: this._handleCCExpMonth,
                                expMonth: this.state.paymentInfo.expMonth,
                                handleCCExpYear: this._handleCCExpYear,
                                expYear: this.state.paymentInfo.expYear,
                                handleCCCVV: this._handleCCCVV,
                                handleOrderSubmit: this._handleOrderSubmit,
                                handlePreviousOrders: this._handlePreviousOrders,
                                previousOrders: this.state.previousOrders,
                                availableBikes: this.state.availableBikes,
                                orderCompleted: this.state.orderCompleted,
                                dateAndTime: this.state.dateAndTime,
                                bikePrice: this.state.bikePrice,
                                handleMenuToggle: this._handleMenuToggle,
                                handleUserSelectedBike: this._handleUserSelectedBike,
                                handleClearGlobalVar: this._handleClearGlobalVariables,
                                menuShow: this.state.menuShow
                            })
                        }
                    </div>
                }
            </div>
        )
    }
});

module.exports = App;
