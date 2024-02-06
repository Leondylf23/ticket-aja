import { useDispatch, connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useNavigate, useParams } from 'react-router-dom';
import { useIntl, FormattedMessage } from 'react-intl';
import { useState } from 'react';
import PropTypes from 'prop-types';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';


import classes from '../style.module.scss';
import { numberWithPeriods } from '@utils/allUtils';

const PaymentSumaryComponent = ({ }) => {
    return (
        <div className={classes.componentContainer}>
            <h2 className={classes.title}><FormattedMessage id='payment_step_4_name' /></h2>
            <h4 className={classes.pageTitleBig}>Event di Phincon</h4>
            <div className={classes.sumaryContainer}>
                <div className={classes.data}>
                    <p className={classes.name}>Variant: Basic</p>
                    <p className={classes.price}>Rp. {numberWithPeriods(1000000)}</p>
                </div>
                <div className={classes.data}>
                    <p className={classes.name}>Kupon Diskon 100k</p>
                    <p className={classes.price}>- Rp. {numberWithPeriods(100000)}</p>
                </div>
                <div className={classes.data}>
                    <p className={classes.name}>Kupon Diskon 100k</p>
                    <p className={classes.price}>- Rp. {numberWithPeriods(100000)}</p>
                </div>
            </div>
            <div className={classes.footer}>
                <h4 className={classes.footerTitle}><FormattedMessage id='payment_summary_total_payment' /></h4>
                <div className={classes.priceContainer}>
                    <LocalOfferIcon className={classes.icon} />
                    <p className={classes.priceValue} data-variant=''>Rp. {numberWithPeriods(800000)}</p>
                </div>
            </div>
        </div>
    );
}

PaymentSumaryComponent.propTypes = {

}

const mapStateToProps = createStructuredSelector({

});

export default connect(mapStateToProps)(PaymentSumaryComponent);