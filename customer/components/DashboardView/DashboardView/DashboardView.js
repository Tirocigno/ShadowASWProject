import React from 'react';
import Footer from '../Footer/Footer';
import {Link} from 'react-router';
import '../../App/app.scss';
import './dashboard-view.scss';

let DashboardView = React.createClass({

    propTypes: {
        username: React.PropTypes.string,
        name: React.PropTypes.string,
        handlePosition: React.PropTypes.func
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
        return (
            <div className="dashboard-container">
                <div className="title-cover">
                    <h1>Hey {this._manipulateUsername(this.props.username)}!</h1>
                    <h1>La tua bici ti sta aspettando.</h1>
                </div>

                <div className="main-wrap">
                    <Link to="/select-shop" className="start-button-wrap">
                        <button
                            onClick={this.props.handlePosition}
                            className="next-button start-button">
                            Inizia
                        </button>
                    </Link>
                </div>
                <div className="landing-icon-wrap">
                    <div className="how-it-works"><a name="how-it-works"/>Come funziona:</div>
                    <div className="landing-icon landing-icon-1">
                        <img src="/img/bicycle.png"/>
                        <h2>Trova le rastrelliere più vicine</h2>
                    </div>
                    <div className="landing-icon landing-icon-2">
                        <img src="/img/bicycle-rider.png"/>
                        <h2>Prendi la bici</h2>
                    </div>
                    <div className="landing-icon landing-icon-3">
                        <img src="/img/money.png"/>
                        <h2>Paga a tempo quando la riporti</h2>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
});

module.exports = DashboardView;
