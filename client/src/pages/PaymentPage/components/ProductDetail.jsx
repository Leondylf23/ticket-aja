import { useDispatch, connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useNavigate, useParams } from 'react-router-dom';
import { useIntl, FormattedMessage } from 'react-intl';
import { useState } from 'react';
import PropTypes from 'prop-types';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';


import classes from '../style.module.scss';
import { numberWithPeriods } from '@utils/allUtils';

const ProductDetailComponent = ({ }) => {
    return (
        <div className={classes.componentContainer}>
            <h2 className={classes.title}>Event di Phincon</h2>
            <h4 className={classes.pageTitle}><FormattedMessage id='payment_prct_detail_page_title'/></h4>
            <div className={classes.variantContainer}>
                <div className={classes.variant}>
                    <a>aaaa</a>
                </div>
                <div className={classes.variant}>
                    <a>aaaa</a>
                </div>
                <div className={classes.variant}>
                    <a>aaaa</a>
                </div>
                <div className={classes.variant}>
                    <a>aaaa</a>
                </div>
            </div>
            <div className={classes.footer}>
                <h4 className={classes.footerTitle}><FormattedMessage id='payment_total'/></h4>
                <div className={classes.priceContainer}>
                    <LocalOfferIcon className={classes.icon} />
                    <p className={classes.priceValue}>Rp. {numberWithPeriods(100000)}</p>
                </div>
            </div>
        </div>
    );
}

ProductDetailComponent.propTypes = {

}

const mapStateToProps = createStructuredSelector({

});

export default connect(mapStateToProps)(ProductDetailComponent);