import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage, useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { sendLoginData, showPopup } from '@containers/App/actions';
import { encryptDataAES } from '@utils/allUtils';
import { selectLogin } from '@containers/Client/selectors';

import classes from './style.module.scss';

const Login = ({ isLogin }) => {
    const intl = useIntl();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const sendLogin = (e) => {
        e.preventDefault();

        if (email === '' || password === '') {
            dispatch(showPopup(intl.formatMessage({ id: 'login_title' }), intl.formatMessage({ id: 'login_validation' })));
            return;
            
        } 

        const formData = {
            email: encryptDataAES(email),
            password: encryptDataAES(password)
        }

        dispatch(sendLoginData(formData, () => {
            navigate('/');
        }, (err) => {
            if (err?.response?.status === 401) {
                dispatch(showPopup(intl.formatMessage({ id: 'login_title' }), intl.formatMessage({ id: 'login_wrong_credentials' })));
            } else {
                dispatch(showPopup());
            }
        }));
    };

    useEffect(() => {
        if(isLogin) navigate('/');
    }, [isLogin]);

    return (
        <div className={classes.fullContainer}>
            <div className={classes.innerContainer}>
                <h1 className={classes.title}><FormattedMessage id='login_title' /></h1>
                <form className={classes.formContainer} onSubmit={sendLogin}>
                    <label htmlFor='email' className={classes.label}><FormattedMessage id='login_email' /></label>
                    <input type='email' id='email' className={classes.input} placeholder={intl.formatMessage({ id: 'login_email_placeholder' })} onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor='password' className={classes.label}><FormattedMessage id='login_password' /></label>
                    <input type='password' id='password' className={classes.input} placeholder={intl.formatMessage({ id: 'login_password_placeholder' })} onChange={(e) => setPassword(e.target.value)} />
                    <button type='submit' className={classes.button}><FormattedMessage id='login_button' /></button>
                    <h3 className={classes.footer}>
                        <FormattedMessage id='login_register_footer' />
                        <a onClick={() => navigate('/register')} className={classes.footerLink}><FormattedMessage id='login_register_footer_link' /></a>
                        .
                    </h3>
                </form>
            </div>
        </div>
    );
};

Login.propTypes = {
    isLogin: PropTypes.bool
}

const mapStateToProps = createStructuredSelector({
    isLogin: selectLogin
});

export default connect(mapStateToProps)(Login);