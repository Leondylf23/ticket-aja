import { useDispatch, connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useNavigate, useParams } from 'react-router-dom';
import { useIntl, FormattedMessage } from 'react-intl';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

import { numberWithPeriods } from '@utils/allUtils';
import { selectTicketDetail } from '@pages/TicketDetail/selectors';
import { setUserInputs } from '../actions';
import { selectUserInputData } from '../selectors';

import classes from '../style.module.scss';

const ProductDetailComponent = ({ ticketData, userInput }) => {
    const dispatch = useDispatch();

    const [selectedVariant, setSelectedVariant] = useState(null);

    const setVariantData = (data) => {
        setSelectedVariant(data);
        dispatch(setUserInputs({...userInput, variant: data}));
    };

    useEffect(() => {
        if(userInput?.variant) {
            setSelectedVariant(userInput?.variant);
        }
    }, [userInput]);

    return (
        <div className={classes.componentContainer}>
            <h2 className={classes.title}>{ticketData?.title}</h2>
            <h4 className={classes.pageTitle}><FormattedMessage id='payment_prct_detail_page_title'/></h4>
            <div className={classes.variantContainer}>
                {ticketData?.variants?.map(variant => 
                <div className={classes.variant} key={variant?.variantName} onClick={() => setVariantData(variant)} data-active={variant === selectedVariant}>
                    <a>{variant?.variantName}</a>
                </div>
                )}
            </div>
            <div className={classes.footer}>
                <h4 className={classes.footerTitle}><FormattedMessage id='payment_total'/></h4>
                <div className={classes.priceContainer}>
                    <LocalOfferIcon className={classes.icon} />
                    <p className={classes.priceValue}>Rp. {numberWithPeriods(selectedVariant ? selectedVariant?.price : 0)}</p>
                </div>
            </div>
        </div>
    );
}

ProductDetailComponent.propTypes = {
    ticketData: PropTypes.object,
    userInput: PropTypes.object
}

const mapStateToProps = createStructuredSelector({
    ticketData: selectTicketDetail,
    userInput: selectUserInputData
});

export default connect(mapStateToProps)(ProductDetailComponent);