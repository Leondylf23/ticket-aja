import { useDispatch, connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useNavigate } from 'react-router-dom';
import { useIntl, FormattedMessage } from 'react-intl';
import { useEffect, useState } from 'react';

import classes from './style.module.scss';

const Orders = ({ }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const intl = useIntl();


    return (
        <div className={classes.mainContainer}>
            aa
        </div>
    );
};

Orders.propTypes = {

}

const mapStateToProps = createStructuredSelector({

});

export default connect(mapStateToProps)(Orders);