import { useDispatch, connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useNavigate } from 'react-router-dom';
import { useIntl, FormattedMessage } from 'react-intl';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { selectBookingData } from './selectors';
import BookingCard from './components/BookingCard';
import BookingDetail from './components/BookingDetail';

import classes from './style.module.scss';

const Bookings = ({ bookingData }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const intl = useIntl();

    const [detailId, setDetailId] = useState(null);

    return (
        <div className={classes.mainContainer}>
            <h1 className={classes.title}><FormattedMessage id='bookings_title' /></h1>
            {!detailId ?
                <div className={classes.dataContainer}>
                    {bookingData.length > 0 ? <div className={classes.dataGrid}>
                        <div className={classes.innerDataGrid}>
                            {bookingData.map(booking =>
                                <BookingCard data={booking} onClickDetail={(data) => { }} key={booking?.id} />
                            )}
                        </div>
                    </div> : <div className={classes.empty}>
                        <h3><FormattedMessage id='empty_data' /></h3>
                    </div>}
                </div>
                :
                <BookingDetail id={detailId} />
            }
        </div>
    );
};

Bookings.propTypes = {
    bookingData: PropTypes.array
}

const mapStateToProps = createStructuredSelector({
    bookingData: selectBookingData
});

export default connect(mapStateToProps)(Bookings);