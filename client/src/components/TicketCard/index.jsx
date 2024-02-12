import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { FormattedMessage } from 'react-intl';
import ViewWeekIcon from '@mui/icons-material/ViewWeek';

import { numberWithPeriods } from '@utils/allUtils';

import classes from './style.module.scss';

const TicketCard = ({ data, isBusiness }) => {
    const navigate = useNavigate();

    return (
        <div className={classes.cardContainer} onClick={() => isBusiness ? navigate(`/ticketcreation/${data?.id}`) : navigate(`/ticket/${data?.id}`)} data-testid='ticket-card'>
            <img className={classes.cardImage} src={data?.imageUrl} alt="Img Failed!" data-testid='ticket-card-img' />
            <div className={classes.cardContent}>
                <p className={classes.title} data-testid='ticket-card-title'>{data?.title}</p>
                <div className={classes.infoContainer}>
                    <div className={classes.infoIconContainer}>
                        <FmdGoodIcon className={classes.icon} />
                        <p className={classes.text} data-testid='ticket-card-location'>{data?.location}</p>
                    </div>
                    <div className={classes.infoIconContainer}>
                        <AssignmentIndIcon className={classes.icon} />
                        <p className={classes.text} data-testid='ticket-card-org'>{data?.organization}</p>
                    </div>
                    <div className={classes.infoIconContainer}>
                        <ViewWeekIcon className={classes.icon} />
                        <p className={classes.text} data-testid='ticket-card-variant'>{data?.variants?.join(', ')}</p>
                    </div>
                    <div className={classes.priceContainer}>
                        <LocalOfferIcon className={classes.icon} />
                        <p className={classes.text} data-testid='ticket-card-price'>Rp. {numberWithPeriods(data?.price)}</p>
                    </div>
                    <p className={classes.footer}>/<FormattedMessage id='ticket_card_price' /></p>
                </div>
            </div>
        </div>
    );
};

TicketCard.propTypes = {
    data: PropTypes.object.isRequired
}

export default TicketCard;