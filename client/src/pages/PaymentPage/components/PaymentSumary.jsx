import { useDispatch, connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useNavigate, useParams } from 'react-router-dom';
import { useIntl, FormattedMessage } from 'react-intl';
import { useState } from 'react';
import PropTypes from 'prop-types';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';


import classes from '../style.module.scss';
import { numberWithPeriods } from '@utils/allUtils';
import { selectUserInputData } from '../selectors';

const PaymentSumaryComponent = ({ inputtedData }) => {
    return (
        <div className={classes.componentContainer}>
            <h2 className={classes.title}><FormattedMessage id='payment_step_4_name' /></h2>
            <h4 className={classes.pageTitleBig}>Event di Phincon</h4>
            <div className={classes.sumaryContainer}>
                <div className={classes.data}>
                    <p className={classes.name}>Variant: {inputtedData?.variant?.variantName}</p>
                    <p className={classes.price}>Rp. {numberWithPeriods(inputtedData?.variant?.price)}</p>
                </div>
                {inputtedData?.coupons?.length > 0 && inputtedData?.coupons?.map(coupon =>
                    <div className={classes.data}>
                        <p className={classes.name}>{coupon?.name}</p>
                        <p className={classes.price}>- Rp. {numberWithPeriods(coupon?.priceCut)}</p>
                    </div>
                )}
            </div>
            <div className={classes.footer}>
                <h4 className={classes.footerTitle}><FormattedMessage id='payment_summary_total_payment' /></h4>
                <div className={classes.priceContainer}>
                    <LocalOfferIcon className={classes.icon} />
                    <p className={classes.priceValue} data-variant=''>Rp. {numberWithPeriods(inputtedData?.totalPayment)}</p>
                </div>
                    <p className={classes.method}><FormattedMessage id='payment_summary_payment_method' />: <p className={classes.name}><FormattedMessage id={inputtedData?.paymentMethod?.nameIntlId} /></p></p>
            </div>
        </div>
    );
}

PaymentSumaryComponent.propTypes = {
    inputtedData: PropTypes.object
}

const mapStateToProps = createStructuredSelector({
    inputtedData: selectUserInputData
});

export default connect(mapStateToProps)(PaymentSumaryComponent);