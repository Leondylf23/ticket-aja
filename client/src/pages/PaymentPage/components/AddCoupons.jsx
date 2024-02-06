import { useDispatch, connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useNavigate, useParams } from 'react-router-dom';
import { useIntl, FormattedMessage } from 'react-intl';
import { useState } from 'react';
import PropTypes from 'prop-types';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';


import classes from '../style.module.scss';
import { numberWithPeriods } from '@utils/allUtils';

const AddCouponsComponent = ({ }) => {
    const dispatch = useDispatch();
    const [coupons, setCoupons] = useState([]);

    

    return (
        <div className={classes.componentContainer}>
            <h2 className={classes.title}><FormattedMessage id='payment_step_2_name' /></h2>
            <h4 className={classes.pageTitle}><FormattedMessage id='payment_add_cpn_page_title' /></h4>
            <div className={classes.couponsContainer}>
                <div className={classes.coupon}>
                    <p className={classes.name}>Diskon 100k</p>
                    <p className={classes.price}>Rp. {numberWithPeriods(10000)}</p>
                </div>
                <div className={classes.coupon}>
                    <p className={classes.name}>Diskon 100k</p>
                    <p className={classes.price}>Rp. {numberWithPeriods(10000)}</p>
                </div>
                <div className={classes.coupon}>
                    <p className={classes.name}>Diskon 100k</p>
                    <p className={classes.price}>Rp. {numberWithPeriods(10000)}</p>
                </div>
            </div>
            <div className={classes.footer}>
                <h4 className={classes.footerTitle}><FormattedMessage id='payment_add_cpn_page_prc_cut' /></h4>
                <div className={classes.priceContainer}>
                    <LocalOfferIcon className={classes.icon} />
                    <p className={classes.priceValue} data-variant='cut'>Rp. {numberWithPeriods(100000)}</p>
                    <p className={classes.priceValueCut} data-active='true'>Rp. {numberWithPeriods(100000)}</p>
                </div>
            </div>
        </div>
    );
}

AddCouponsComponent.propTypes = {

}

const mapStateToProps = createStructuredSelector({

});

export default connect(mapStateToProps)(AddCouponsComponent);