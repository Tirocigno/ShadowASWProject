import React from 'react';
import Footer from '../../DashboardView/Footer/Footer';
import './login-view.scss';
import '../../App/app.scss';

let LoginView = React.createClass({

    propTypes: {
        handleUsername: React.PropTypes.func
    },

    _handleUsernameSubmit: function (event) {
        event.preventDefault();
        let username = this._usernameInput.value;
        let password = this._passwordInput.value;
        this.props.handleUsername(username, password);
    },

    render: function () {
        return (
            <div className="username-container">
                <nav>
                    <a href="/"><img src="img/bikeLogo3.png"/></a>
                    <ul>
                        <a href="#how-it-works">
                            <li>Come funziona</li>
                        </a>
                        <a href="#about-info">
                            <li>About</li>
                        </a>
                        <li>Blog</li>
                    </ul>
                </nav>

                <div className="title-cover-landing">
                    <div className="title-cover-left"/>
                    <div className="title-cover-right">
                        <div className="title-cover-right-child">
                            <h1 id="intro">Prenota una bici in pochi click e vai!</h1>
                            <form onSubmit={this._handleUsernameSubmit}>
                                <input
                                    type="text"
                                    placeholder="Nome"
                                    name="username"
                                    ref={(c) => this._usernameInput = c}
                                    required/><br/>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    ref={(c) => this._passwordInput = c}
                                    required/>
                                <button>Vai!</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="landing-icon-wrap">
                    <div className="how-it-works"><a name="how-it-works"/>Come funziona</div>
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

                <div className="landing-icon-button"/>
                <div className="company-logo-container">

                    <h2>Sistema utilizzato da</h2>
                    <img src="img/uniboLogo.png"/>
                </div>
                <div className="about-info"><a name="about-info"/></div>
                <Footer/>
            </div>
        )
    }
});

module.exports = LoginView;
