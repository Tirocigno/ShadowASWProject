import React from 'react';
import './shop-list-item.scss';
import {Link} from 'react-router';

let ShopListItem = React.createClass({

    propTypes: {
        shop: React.PropTypes.object.isRequired,
        handleSelectedShop: React.PropTypes.func
    },

    render: function () {
        return (
            <div className="shop-list-item-container"
                 onClick={() => { this.props.handleSelectedShop(this.props.shop)

              }}>
                <Link to="/custom-order">
                    <div className="shop-list-item-details">
                        <h2>{this.props.shop.name}</h2>
                        <p>{this.props.shop.vicinity}</p>
                        <div className="shop-list-bottom-row"/>
                    </div>
                </Link>

                <button className="open-map-button">
                    <a href={this.props.shop.scope} target="_blank">Posizione </a>
                    <i className="fa fa-map-marker fa-lg" aria-hidden="true"/>
                </button>
                <p className="shop-list-distance">{this.props.shop.distance}</p>
            </div>
        )
    }
});


module.exports = ShopListItem;
