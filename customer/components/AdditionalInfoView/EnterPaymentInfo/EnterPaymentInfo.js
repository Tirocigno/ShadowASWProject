import React from 'react'
import sass from './enter-payment-info.scss'

let EnterPaymentInfo = React.createClass({

    propTypes: {
        handleCCName: React.PropTypes.func,
        handleCCNumber: React.PropTypes.func,
        handleCCExpMonth: React.PropTypes.func,
        expMonthValue: React.PropTypes.string,
        handleCCExpYear: React.PropTypes.func,
        expYearValue: React.PropTypes.string,
        handleCCCVV: React.PropTypes.func
    },

    _checkCardOwner: function (event) {
        event.preventDefault();
        let re = /^[A-Za-z]|^\s+$/;
        let cardOwner = this._cardOwner.value;
        if (cardOwner.length > 20 || !re.test(cardOwner)) {
            alert('I caratteri massimi consentiti sono 20 e non inserire numeri o caratteri speciali');
            if (cardOwner.length < 20) {
                event.target.value = '';
                this.props.handleCCName(event);
            } else {
                event.target.value = cardOwner.slice(0, 20);
            }
        } else {
            this.props.handleCCName(event);
        }
    },
    _checkCardNumber: function (event) {
        event.preventDefault();
        let re = /^\d*[1-9]\d*$/;
        let cardNumber = this._cardNumber.value;
        if (cardNumber.length > 16 || !re.test(cardNumber)) {
            alert('Sono consentiti 16 numeri, non inserire lettere o caratteri speciali');
            if (cardNumber.length < 16) {
                event.target.value = '';
                this.props.handleCCNumber(event);
            } else {
                event.target.value = cardNumber.slice(0, 16);
            }
        } else {
            this.props.handleCCNumber(event);
        }
    },
    _checkCardCCV: function (event) {
        event.preventDefault();
        let re = /^\d*[1-9]\d*$/;
        let cardCCV = this._cardCCV.value;
        if (cardCCV.length > 3 || !re.test(cardCCV)) {
            alert('I caratteri massimi consentiti sono 3 e non inserire numeri o caratteri speciali');
            if (cardCCV.length < 3) {
                event.target.value = '';
                this.props.handleCCCVV(event);
            } else {
                event.target.value = cardCCV.slice(0, 3);
            }
        } else {
            this.props.handleCCCVV(event);
        }
    },

    render: function () {
        return (
            <div className="enter-payment-info-container">
                <h2>Metodi di pagamento</h2>
                <div className="payment-info-section payment-name">
                    <p>Nome</p>
                    <input
                        onChange={this._checkCardOwner}
                        type="text"
                        placeholder="Nome"
                        ref={(c) => this._cardOwner = c}
                        />
                </div>
                <div className="payment-info-section payment-card-number">
                    <p>Numero della carta di credito</p>
                    <input
                        onChange={this._checkCardNumber}
                        type="text"
                        placeholder="Numero carta di credito"
                        ref={(c) => this._cardNumber = c}
                        />
                </div>
                <div className="payment-info-section payment-month-year">
                    <p>Scadenza</p>
                    <select
                        className="payment-month"
                        onChange={this.props.handleCCExpMonth}
                        name="exp-month"
                    >
                        <option value="default">Mese</option>
                        <option value="01">Gen (01)</option>
                        <option value="02">Feb (02)</option>
                        <option value="03">Mar (03)</option>
                        <option value="04">Apr (04)</option>
                        <option value="05">Mag (05)</option>
                        <option value="06">Giu (06)</option>
                        <option value="07">Lug (07)</option>
                        <option value="08">Ago (08)</option>
                        <option value="09">Set (09)</option>
                        <option value="10">Ott (10)</option>
                        <option value="11">Nov (11)</option>
                        <option value="12">Dic (12)</option>
                    </select>
                    <select
                        className="payment-year"
                        onChange={this.props.handleCCExpYear}
                        name="exp-year">
                        <option value="default">Anno</option>
                        <option value="2018">2018</option>
                        <option value="2019">2019</option>
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                    </select>
                </div>
                <div className="payment-info-section payment-csv">
                    <p>CSV</p>
                    <input
                        onChange={this._checkCardCCV}
                        type="text"
                        placeholder="CSV"
                        ref={(c) => this._cardCCV = c}
                        />
                </div>
            </div>
        )
    }
});

module.exports = EnterPaymentInfo;
