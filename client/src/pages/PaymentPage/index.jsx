import { useDispatch, connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useNavigate, useParams } from 'react-router-dom';
import { useIntl, FormattedMessage } from 'react-intl';
import { useEffect, useState } from 'react';

import ProductDetail from './components/ProductDetail';
import AddCoupons from './components/AddCoupons';
import PaymentSelection from './components/PaymentSelection';
import PaymentSumary from './components/PaymentSumary';

import classes from './style.module.scss';

const PaymentPage = ({ }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const intl = useIntl();
    const { id } = useParams();
    const stepPages = [
        {
            id: 1,
            name: intl.formatMessage({ id: 'payment_step_1_name' }),
            page: <ProductDetail />
        },
        {
            id: 2,
            name: intl.formatMessage({ id: 'payment_step_2_name' }),
            page: <AddCoupons />
        },
        {
            id: 3,
            name: intl.formatMessage({ id: 'payment_step_3_name' }),
            page: <PaymentSelection />
        },
        {
            id: 4,
            name: intl.formatMessage({ id: 'payment_step_4_name' }),
            page: <PaymentSumary />
        },
    ];

    const [stepPage, setStepPage] = useState(null);
    const [step, setStep] = useState(-1);

    const setStepPageTab = (data) => {
        setStep(data?.id);
        setStepPage(data?.page);
    };

    const finish = () => {
        navigate('/orders');
    };

    useEffect(() => {
        setStepPageTab(stepPages[0]);
    }, []);

    return (
        <div className={classes.mainContainer}>
            <div className={classes.innerContainer}>
                <div className={classes.leftSide}>
                    {stepPages.map(page =>
                        <div className={classes.stepsIndicators} key={page?.id} data-active={page?.id === step} onClick={() => setStepPageTab(page)}>
                            <div className={classes.stepNumberContainer}>
                                <a className={classes.stepNumber}>{page?.id}</a>
                            </div>
                            <a className={classes.stepTitle}>{page?.name}</a>
                        </div>
                    )}
                </div>
                <div className={classes.rightSide}>
                    {stepPage}
                    <div className={classes.rightSideFooter}>
                        {step > 1 && <button className={classes.prevBtn} onClick={() => setStepPageTab(stepPages[step - 2])}><FormattedMessage id='payment_previous_btn' /></button>}
                        <button className={classes.nextBtn} onClick={() => step === 4 ? finish() : setStepPageTab(stepPages[step])}>{step === 4 ? intl.formatMessage({ id: 'payment_finish_btn' }) : intl.formatMessage({ id: 'payment_next_btn' })}</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

PaymentPage.propTypes = {

}

const mapStateToProps = createStructuredSelector({

});

export default connect(mapStateToProps)(PaymentPage);