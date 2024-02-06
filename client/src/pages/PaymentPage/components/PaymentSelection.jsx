import { useDispatch, connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useNavigate, useParams } from 'react-router-dom';
import { useIntl, FormattedMessage } from 'react-intl';
import { useState } from 'react';
import PropTypes from 'prop-types';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';


import classes from '../style.module.scss';

const PaymentSelectionComponent = ({ }) => {
    return (
        <div className={classes.componentContainer}>
            <h2 className={classes.title}><FormattedMessage id='payment_step_3_name' /></h2>
            <h4 className={classes.pageTitle}><FormattedMessage id='payment_payment_page_title' /></h4>
            <div className={classes.paymentSelectionContainer}>
                <div className={classes.payment}>
                    <AccountBalanceIcon />
                    <p className={classes.text}><FormattedMessage id='payment_payment_transfer' /></p>
                </div>
                <div className={classes.payment}>
                    <PointOfSaleIcon />
                    <p className={classes.text}><FormattedMessage id='payment_payment_onsitepay' /></p>
                </div>
            </div>
        </div>
    );
}

PaymentSelectionComponent.propTypes = {

}

const mapStateToProps = createStructuredSelector({

});

export default connect(mapStateToProps)(PaymentSelectionComponent);