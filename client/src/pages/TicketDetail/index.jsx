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
        const resData = {
            title: 'Event Bootcamp Phincon',
            location: 'Jakarta Selatan',
            organizer: 'Phincon',
            image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOYAAADmCAYAAADBavm7AAAEsUlEQVR42u3d7WqrMACA4d7/LQ2xiDgkCBKEIoLsTnL+nMI2zs7cR9tonh/PDZi+pCZRTy8vLwnIy8lFAGECwgRhAsIEYQLCBGG6ECBMQJggTECYIExAmCBMQJiAMEGYgDBBmIAwQZiAMAFhgjABYYIwAWGCMAFhAsIEYQLCBGECwgRhAsIEhAnCBIQJwgSECcIEhAkIE4QJCBOECQgThAkIExAmCBMQJggTECYIExAmIEwQJiBMECYgTBAmIEy+Y13XdLlc3nBdhMmdzPOcxnFMfd+ntm3T09PTp6qqSm3bphBCijGmZVlcS2HyU8uypBBCqut6U4hbNE2TxnFM67q6xsLkq0H2ff9rMX40mw7DIFBhssU4jqmqqptG+Vpd1+5Lhcn/FnFuPUv+T4zROAiT91E2TfOwKK+GYTAewuSq67qHR2nmFCavDMOQTZRX8zwbG2GWvTeZW5TXBSGrtcIs1taDAu43hcmdXC6XbKO87nOaNYVptjRrIszHn+zJPcrrvabxEmYxQgi7CNMKrTCL8puH0m8thGDMhOlvbG6apjFuwrQamyPjJswinh7ZW5i2TYTpCF6GPBYmTGEKE2EKU5jCRJgIU5jCFCYHDtOqrDDtY9rHRJjCFKYwESbCFKYwhYkwEaYwhSlMhIkwhSlMhClMYQoTYSJMYQpTmBwxzPP5bNyEWYY9hdm2rTETpjCFiTAfJIeP1PpMgjB555GfdP+qaZqMmTDLEGP0kDTCzM26ru4vEaa/s98TYzRWwrSf6cO1CDMD5/PZV74QZm5y/o7JsizGSJjlLgJVVWXRB2FaBLJ3KUw+lduHbB1aFyZ/dV1niwRh2jqxRSJMNmnb1oF1hGnWNFsKk+xnTfeWwuQD8zxbiUWYOQoh+DAtwiz9NNDz87PrLky2mKbJgo8wXYRS/9L6CytMMntpl1VYYfLNM7S3ejdQVVVpmiaPdgmTLVsl4zimruvuuvhTVVXqui6N4yhUYXJd5AkhpLqusznEXtd1CiGkeZ6NkTDLmhlzi/GzSM2kwjysGOOu3sD+r7caWDAS5mEOCwzDkOXrQ35yTzoMg/1PYe5zRTWEcKggPwrU31xh7iLIPX2X5Lf0fW8GFWa+f1lLC9JfXGG6h9xZoH4fwnzYKusetjweudViFVeYd30FiCC3a5rGYXlh3jbIHF6Yted9UIEKU5ACFaYgEagwBSlQYZZ0uFyQjw3UEy3CfKP0wwE5sQcqzDTP866f+DjyFkvps2exYcYYndjJ/ARRyQcUTqVG6ce/D6XGeRIl4hRmES9SxjtwhfmFJ0HcU+77nrOkR8qKCbPEB5iP+EC2MA82W/phH0Mps+bJgg8WgoTpZA9OBglTmMIUpjARpjCFKUxhChNhClOYCFOYCFOYwkSYwhSmMIUpTIQpTGEKU5jCRJjCBC/jAoQJCBOECQgThAkIE4QJCBMQJggTECYIExAmCBMQJiBMECYgTBAmIEwQJiBMQJggTECYIExAmCBMQJiAMEGYgDBBmIAwQZiAMAFhgjABYYIwAWGCMAFhAsIEYQLCBGECwgRhAsIEhAnCBIQJwgSECcIEhAkIE4QJCBOECQgThAnc3R8ikInaYdta0QAAAABJRU5ErkJggg==',
            variants: [
                {
                    variantName: 'Basic',
                    price: 1000000
                },
                {
                    variantName: 'Intermediate',
                    price: 3500000
                },
                {
                    variantName: 'Advanced',
                    price: 6800000
                },
            ]
        };

        if (resData?.variants.length > 0) {
            const sortedData = resData.variants;
            sortedData.sort((variantA, variantB) => variantA.price - variantB.price);

            setSelectedVariantIndex(0);
            setSelectedVariant(sortedData[0]);
        }

        setDetailData(resData);
    }, []);

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

});

export default connect(mapStateToProps)(TicketDetail);