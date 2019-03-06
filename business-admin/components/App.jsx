import React from 'react'

/**
 * Main della sezione Buisness Administrator
 */
var App = React.createClass({

    render: function() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
})

module.exports = App;
