import { useDispatch, connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useNavigate, useParams } from 'react-router-dom';
import { useIntl, FormattedMessage } from 'react-intl';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { selectTicketDetail } from '@pages/TicketDetail/selectors';

import classes from './style.module.scss';

const ProfilePage = ({ profile }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const intl = useIntl();

    const [userData, setUserData] = useState();
    const [profileImg, setProfileImg] = useState(null);

    return (
        <div className={classes.mainContainer}>
            <h1 className={classes.title}>Your Profile</h1>
            <div className={classes.contentContainer}>
                <div className={classes.leftSide}>
                    <img className={classes.profileImage} src="https://d2kwwar9pcd0an.cloudfront.net/aa61eb7d79550dd4b1a297f6df789a1d.png" alt='Load image failed!' />
                    <label htmlFor='profileImageFile' className={classes.button}>
                        Change Image
                    </label>
                    <input type='file' accept='image/*' hidden id='profileImageFile' />
                    <button className={classes.button} data-type='red'>Remove</button>
                    <div className={classes.accountInfoContainer}>
                        <p>Customer</p>
                        <p>01/01/2024</p>
                    </div>
                </div>
                <div className={classes.rigthSide}>
                    <h3 className={classes.containerTitle}>General</h3>
                    <label htmlFor='email' className={classes.label}>Email</label>
                    <input type="email" id='email' disabled className={classes.input} />
                    <label htmlFor='fullname' className={classes.label}>Fullname</label>
                    <input type="text" id='fullname' className={classes.input} />
                    <label htmlFor='dob' className={classes.label}>Date of Birth</label>
                    <input type="date" id='dob' className={classes.input} />
                    <div className={classes.buttonConatainer}>
                        <button className={classes.button}>Save</button>
                    </div>
                    <h3 className={classes.containerTitle}>Passwords</h3>
                    <label htmlFor='oldPassword' className={classes.label}>Old Password</label>
                    <input type="password" id='oldPassword' className={classes.input} />
                    <label htmlFor='newPassword' className={classes.label}>New Password</label>
                    <input type="password" id='newPassword' className={classes.input} />
                    <label htmlFor='confirmNewPass' className={classes.label}>Confirm New Pasword</label>
                    <input type="password" id='confirmNewPass' className={classes.input} />
                    <div className={classes.buttonConatainer}>
                        <button className={classes.button}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

ProfilePage.propTypes = {
    profile: PropTypes.object,
}

const mapStateToProps = createStructuredSelector({
    
});

export default connect(mapStateToProps)(ProfilePage);