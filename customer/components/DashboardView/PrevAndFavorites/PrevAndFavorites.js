import React from 'react';
import { Link } from 'react-router';
import './prev-and-favorites.scss';

var PrevAndFavorites = React.createClass({


    render: function() {
        return (
            <div className="prev-and-fav-wrap">
                <Link to="/previous-orders" className="prev-orders-link">
                    <div className="prev-orders-button"><i className="fa fa-reply fa-lg"></i>  Previous Orders</div>
                </Link>
            </div>
        )
    }
});

module.exports = PrevAndFavorites;
