import React from 'react';
import MenuItem from '../MenuItem/MenuItem';
import _ from 'lodash';
import './menu-section.scss';
import request from 'superagent';

var MenuSection = React.createClass({

	componentWillMount(){
		this.handleAvailableBikes();
    },
	getInitialState: function(){
		return {
			availableBikes: []
		}
	},
    propTypes: {
        slug: React.PropTypes.string,
        handleAddItemToOrder: React.PropTypes.func,
        handleAvailableBikes: React.PropTypes.func,
        toggleAddNotification: React.PropTypes.func,
        toggleErrorNotification: React.PropTypes.func
    },
	handleAvailableBikes: function () {
            request.get('/api/bikes/' + slcRack)
                .end((err, res) => {
					this.setState({
						availableBikes : res.body
					});
                });
        },
    render: function() {

	return (
            <section className="menu-section">
                <h2>Biciclette</h2>
				{ this.state.availableBikes.map(
				(item, index) => {
					return(
				<MenuItem
				    key={item._id}
                    itemName={item.bikeId}
                    handleAddItemToOrder={this.props.handleAddItemToOrder}
                    toggleAddNotification={this.props.toggleAddNotification}
                    toggleErrorNotification={this.props.toggleErrorNotification} />)
					}
				)}
                <div className="divider"></div>
            </section>
			)
    }
});


module.exports = MenuSection;
