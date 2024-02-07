import { useDispatch, connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useNavigate, useParams } from 'react-router-dom';
import { useIntl, FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import classes from './style.module.scss';

const Coupons = ({ couponDatas }) => {
    return (
        <div className={classes.mainContainer}>
            <h1 className={classes.title}>a</h1>
            <div className={classes.dataContainer}>
                <div className={classes.data}>
                    <p className={classes.name}></p>
                    <p className={classes.price}></p>
                    <button className={classes.delBtn} data-type='red'>
                        X
                    </button>
                </div>
            </div>
        </div>
    );
};

Coupons.propTypes = {
    couponDatas: PropTypes.object
}

const mapStateToProps = createStructuredSelector({

});

export default connect(mapStateToProps)(Coupons);