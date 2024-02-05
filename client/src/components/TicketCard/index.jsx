import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import classes from './style.module.scss';

const TicketCard = ({ data }) => {
    return (
        <div className={classes.cardContainer}>
            <img className={classes.cardImage} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOYAAADmCAYAAADBavm7AAAEsUlEQVR42u3d7WqrMACA4d7/LQ2xiDgkCBKEIoLsTnL+nMI2zs7cR9tonh/PDZi+pCZRTy8vLwnIy8lFAGECwgRhAsIEYQLCBGG6ECBMQJggTECYIExAmCBMQJiAMEGYgDBBmIAwQZiAMAFhgjABYYIwAWGCMAFhAsIEYQLCBGECwgRhAsIEhAnCBIQJwgSECcIEhAkIE4QJCBOECQgThAkIExAmCBMQJggTECYIExAmIEwQJiBMECYgTBAmIEy+Y13XdLlc3nBdhMmdzPOcxnFMfd+ntm3T09PTp6qqSm3bphBCijGmZVlcS2HyU8uypBBCqut6U4hbNE2TxnFM67q6xsLkq0H2ff9rMX40mw7DIFBhssU4jqmqqptG+Vpd1+5Lhcn/FnFuPUv+T4zROAiT91E2TfOwKK+GYTAewuSq67qHR2nmFCavDMOQTZRX8zwbG2GWvTeZW5TXBSGrtcIs1taDAu43hcmdXC6XbKO87nOaNYVptjRrIszHn+zJPcrrvabxEmYxQgi7CNMKrTCL8puH0m8thGDMhOlvbG6apjFuwrQamyPjJswinh7ZW5i2TYTpCF6GPBYmTGEKE2EKU5jCRJgIU5jCFCYHDtOqrDDtY9rHRJjCFKYwESbCFKYwhYkwEaYwhSlMhIkwhSlMhClMYQoTYSJMYQpTmBwxzPP5bNyEWYY9hdm2rTETpjCFiTAfJIeP1PpMgjB555GfdP+qaZqMmTDLEGP0kDTCzM26ru4vEaa/s98TYzRWwrSf6cO1CDMD5/PZV74QZm5y/o7JsizGSJjlLgJVVWXRB2FaBLJ3KUw+lduHbB1aFyZ/dV1niwRh2jqxRSJMNmnb1oF1hGnWNFsKk+xnTfeWwuQD8zxbiUWYOQoh+DAtwiz9NNDz87PrLky2mKbJgo8wXYRS/9L6CytMMntpl1VYYfLNM7S3ejdQVVVpmiaPdgmTLVsl4zimruvuuvhTVVXqui6N4yhUYXJd5AkhpLqusznEXtd1CiGkeZ6NkTDLmhlzi/GzSM2kwjysGOOu3sD+r7caWDAS5mEOCwzDkOXrQ35yTzoMg/1PYe5zRTWEcKggPwrU31xh7iLIPX2X5Lf0fW8GFWa+f1lLC9JfXGG6h9xZoH4fwnzYKusetjweudViFVeYd30FiCC3a5rGYXlh3jbIHF6Yted9UIEKU5ACFaYgEagwBSlQYZZ0uFyQjw3UEy3CfKP0wwE5sQcqzDTP866f+DjyFkvps2exYcYYndjJ/ARRyQcUTqVG6ce/D6XGeRIl4hRmES9SxjtwhfmFJ0HcU+77nrOkR8qKCbPEB5iP+EC2MA82W/phH0Mps+bJgg8WgoTpZA9OBglTmMIUpjARpjCFKUxhChNhClOYCFOYCFOYwkSYwhSmMIUpTIQpTGEKU5jCRJjCBC/jAoQJCBOECQgThAkIE4QJCBMQJggTECYIExAmCBMQJiBMECYgTBAmIEwQJiBMQJggTECYIExAmCBMQJiAMEGYgDBBmIAwQZiAMAFhgjABYYIwAWGCMAFhAsIEYQLCBGECwgRhAsIEhAnCBIQJwgSECcIEhAkIE4QJCBOECQgThAnc3R8ikInaYdta0QAAAABJRU5ErkJggg==" alt="Img Failed!" />
            <div className={classes.cardContent}>
                <p>{data?.name}</p>
                <p>{}</p>
            </div>
        </div>
    );
};

TicketCard.propTypes = {
    data: PropTypes.object.isRequired
}

export default TicketCard;