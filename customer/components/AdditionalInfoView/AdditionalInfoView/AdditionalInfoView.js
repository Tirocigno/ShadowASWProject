import React from 'react';
import {Link} from 'react-router';
import EnterPaymentInfo from '../EnterPaymentInfo/EnterPaymentInfo';
import AdditionalInfoNotification from '../AdditionalInfoNotification/AdditionalInfoNotification';
import Footer from '../../DashboardView/Footer/Footer';
//import '../../App/app.scss';
import './additional-info-view.scss';

let AdditionalInfoView = React.createClass({

    propTypes: {
        handleCCName: React.PropTypes.func,
        handleCCNumber: React.PropTypes.func,
        handleCCExpMonth: React.PropTypes.func,
        expMonth: React.PropTypes.string,
        handleCCExpYear: React.PropTypes.func,
        handleClearGlobalVar: React.PropTypes.func,
        expYear: React.PropTypes.string,
        handleCCCVV: React.PropTypes.func,
        toggleAdditionalInfoNotification: React.PropTypes.func,
        methodOfTrans: React.PropTypes.string,
        methodOfTransShow: React.PropTypes.bool
    },

    _areEmpty: function () {
        alert('Almeno uno dei campi è vuoto o non completo, inserire dati corretti!')
    },

    _clearGlobalVariables: function () {
        this.props.handleClearGlobalVar();
    },

    render: function () {

        let nextButton;
        if (nameCC === '' || numberCC === '' ||  CCVCC === '' || monthCC === '' || yearCC === '' || CCVCC.length < 3 || numberCC.length < 16) {
            nextButton = <button onClick={this._areEmpty} className="next-button1">
                Avanti
                <i className="fa fa-arrow-right fa-lg" aria-hidden="true"/>
            </button>;
        } else {
            nextButton = <Link to="/order-summary">
                <button onClick={this._clearGlobalVariables} className="next-button1">
                    Avanti
                    <i className="fa fa-arrow-right fa-lg" aria-hidden="true"/>
                </button>
            </Link>;
        }

        return (
            <div className="additional-info-container">
                <div className="title-cover">
                    <h1>Un ultimo passaggio, ci siamo!</h1>
                    <div className="userProgress">
                        <div id="threeOfFive">
                        </div>
                    </div>
                </div>
                <AdditionalInfoNotification
                    notification={this.props.notification}/>
                <div>
                    <form>
                        <EnterPaymentInfo
                            handleCCName={this.props.handleCCName}
                            handleCCNumber={this.props.handleCCNumber}
                            handleCCExpMonth={this.props.handleCCExpMonth}
                            expMonthValue={this.props.expMonth || 'default'}
                            handleCCExpYear={this.props.handleCCExpYear}
                            expYearValue={this.props.expYear || 'default'}
                            handleCCCVV={this.props.handleCCCVV}/>
                    </form>
                    <div className="next-button-container">
                        {nextButton}
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
});

module.exports = AdditionalInfoView;
