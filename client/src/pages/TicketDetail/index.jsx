import { useDispatch, connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useNavigate, useParams } from 'react-router-dom';
import { useIntl, FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { useEffect, useState } from 'react';

import { numberWithPeriods } from '@utils/allUtils';

import classes from './style.module.scss';
import { selectTicketDetail } from './selectors';

const TicketDetail = ({ ticketDetail }) => {
    const intl = useIntl();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();

    const [detailData, setDetailData] = useState(null);
    const [selectedVariantIndex, setSelectedVariantIndex] = useState(-1);
    const [selectedVariant, setSelectedVariant] = useState(null);

    const selectVariantData = (data, index) => {
        setSelectedVariant(data);
        setSelectedVariantIndex(index);
    };

    const payBtn = () => {
        navigate('./pay');
    };

    useEffect(() => {
        const resData = ticketDetail;

        if(!resData) return;

        if (resData?.variants.length > 0) {
            const ticketVariants = resData.variants;
            const defaultDataIndex = ticketVariants.findIndex(variant => variant.isDefault);

            setSelectedVariantIndex(defaultDataIndex);
            setSelectedVariant(ticketVariants[defaultDataIndex]);
        }

        setDetailData(resData);
    }, [ticketDetail]);

    return (
        <div className={classes.mainContainer}>
            <div className={classes.topContentContainer}>
                <div className={classes.leftContent}>
                    <img className={classes.image} src={detailData?.image} alt="Img failed!" />
                    <div className={classes.contentDetails}>
                        <div className={classes.detailIconContainer}>
                            <FmdGoodIcon className={classes.icon} />
                            <p className={classes.text}>{detailData?.location}</p>
                        </div>
                        <div className={classes.detailIconContainer}>
                            <AssignmentIndIcon className={classes.icon} />
                            <p className={classes.text}>{detailData?.organizer}</p>
                        </div>
                    </div>
                </div>
                <div className={classes.rightContent}>
                    <h2 className={classes.title}>{detailData?.title}</h2>
                    <div className={classes.priceContainer}>
                        <LocalOfferIcon className={classes.icon} />
                        <p className={classes.price}>Rp. {numberWithPeriods(selectedVariant?.price)}</p>
                    </div>
                    <div className={classes.variantContainer}>
                        {detailData?.variants?.map((variant, i) =>
                            <div className={classes.variant} key={variant?.variantName} onClick={() => selectVariantData(variant, i)} data-active={i === selectedVariantIndex}>
                                <h4>{variant?.variantName}</h4>
                            </div>
                        )}
                    </div>
                    <button className={classes.buyButton} onClick={payBtn} ><FormattedMessage id='ticket_detail_buy_btn' /></button>
                    <h3 className={classes.descriptionTitle}><FormattedMessage id='ticket_detail_desc' /></h3>
                    <p className={classes.description}>{`asdwadwadaw
                    dwadawdwa
                    dwadwadawd
                    wadadadadwad
                    waawdwada`}</p>
                </div>
            </div>
        </div>
    );
};

TicketDetail.propTypes = {
    ticketDetail: PropTypes.array
}

const mapStateToProps = createStructuredSelector({
    ticketDetail: selectTicketDetail
});

export default connect(mapStateToProps)(TicketDetail);