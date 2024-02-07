import { useDispatch, connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useNavigate, useParams } from 'react-router-dom';
import { useIntl, FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { useEffect, useState } from 'react';

import { selectBookingDetailData } from '../selectors';
import { numberWithPeriods } from '@utils/allUtils';

import classes from '../style.module.scss';

const BookingDetailComponent = ({ id, bookingData }) => {

    const [status, setStatus] = useState(null);

    useEffect(() => {
        if (bookingData?.status) {
            switch (bookingData?.status) {
                case 'WAITING':
                    setStatus({
                        text: <FormattedMessage id='status_waiting' />,
                        color: 'yellow',
                    });
                    break;
                case 'FAILED':
                    setStatus({
                        text: <FormattedMessage id='status_failed' />,
                        color: 'red',
                    });
                    break;
                case 'BOOKED':
                    setStatus({
                        text: <FormattedMessage id='status_success' />,
                        color: 'green',
                    });
                    break;
            }
        }
    }, [bookingData]);

    return (
        <div className={classes.detailContainer}>
            <h2>{bookingData?.bookingCode}</h2>
            <div className={classes.contentContainer}>
                <div className={classes.leftSide}>
                    <img className={classes.image} src={bookingData?.image ?? 'https://d3fkkqa7lc3d5k.cloudfront.net/post-1-attatchments-logo%20kru%20bg.png'} alt="Img failed!" />
                    <div className={classes.contentDetails}>
                        <div className={classes.detailIconContainer}>
                            <FmdGoodIcon className={classes.icon} />
                            <p className={classes.text}>{bookingData?.location}</p>
                        </div>
                        <div className={classes.detailIconContainer}>
                            <AssignmentIndIcon className={classes.icon} />
                            <p className={classes.text}>{bookingData?.organizer}</p>
                        </div>
                    </div>
                </div>
                <div className={classes.rightSide}>
                    <h2 className={classes.title}>{bookingData?.title}</h2>
                    <div className={classes.priceContainer}>
                        <LocalOfferIcon className={classes.icon} />
                        <p className={classes.price}>Rp. {numberWithPeriods(100000)}</p>
                    </div>
                    <div className={classes.paymentMethodContainer}>
                        {bookingData?.isTransfer ? <>
                            <img className={classes.image} src={bookingData?.transferImg ?? "https://d3fkkqa7lc3d5k.cloudfront.net/post-1-attatchments-logo%20kru%20bg.png"} alt="Failed to Load!" />
                            <h4 className={classes.text}><FormattedMessage id='payment_payment_transfer' /></h4>
                        </> : <h4 className={classes.text}><FormattedMessage id='payment_payment_onsitepay' /></h4>}
                    </div>
                    <div className={classes.variantContainer}>
                        <div className={classes.variant} data-active='true'>
                            <h4>{'aaaw2'}</h4>
                        </div>
                    </div>
                    <div className={classes.statusContainer} data-item={status?.color}>{status?.text}</div>
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

BookingDetailComponent.propTypes = {
    id: PropTypes.string,
    bookingData: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
    bookingData: selectBookingDetailData
});

export default connect(mapStateToProps)(BookingDetailComponent);