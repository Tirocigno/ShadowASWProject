

import React from 'react'
import sass from './nav.scss'

let Nav = React.createClass({
    render: function () {
        return (
            <div className="nav-container">
                <div className="nav-icons">
                    <a className="fa fa-sign-out fa-2x" aria-hidden="true" href={"/select-shop"}/>
                </div>
            </div>
        )
    }
});

module.exports = Nav;
