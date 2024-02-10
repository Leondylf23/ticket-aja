import { useDispatch, connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useNavigate, useParams } from 'react-router-dom';
import { useIntl, FormattedMessage } from 'react-intl';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';

import { selectProfileData } from './selectors';
import { getProfileData, saveNewPassword, saveProfileData } from './actions';
import { showPopup } from '@containers/App/actions';
import { selectUserData } from '@containers/Client/selectors';
import { decryptDataAES, encryptDataAES } from '@utils/allUtils';
import { setUserData } from '@containers/Client/actions';

import classes from './style.module.scss';

const ProfilePage = ({ profileData, userDataSelect }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const intl = useIntl();

    const [userData, setUserDataInternal] = useState();
    const [userPassword, setUserPassword] = useState({ oldPass: '', newPass: '', confirmPass: '' });
    const [profileImg, setProfileImg] = useState(null);

    const setNewProfileImage = (e) => {
        const file = e.target.files[0];
        setProfileImg(file);
    };

    const saveGeneralData = () => {
        if (userData?.fullname.length < 3 || userData?.length > 255) {
            dispatch(showPopup(intl.formatMessage({ id: 'profile_title' }), intl.formatMessage({ id: 'register_fullname_validation' })));
            return;

        } else if (userData?.dob === '') {
            dispatch(showPopup(intl.formatMessage({ id: 'profile_title' }), intl.formatMessage({ id: 'register_dob_validation' })));
            return;

        } else if ((new Date().getTime - new Date(userData?.dob).getTime()) < (15 * 365 * 24 * 3600000)) {
            dispatch(showPopup(intl.formatMessage({ id: 'profile_title' }), intl.formatMessage({ id: 'register_dob_age_validation' })));
            return;

        }

        const form = new FormData();

        form.append('fullname', userData?.fullname);
        form.append('dob', userData?.dob);
        if (profileImg) form.append('imageData', profileImg);

        dispatch(saveProfileData(form, (imageUrl) => {
            if (imageUrl) {
                let user = JSON.parse(decryptDataAES(userDataSelect));
                user.profileImage = imageUrl

                const updatedUser = encryptDataAES(JSON.stringify(user));
                dispatch(setUserData(updatedUser));
            }

            setProfileImg(null);
            dispatch(showPopup(intl.formatMessage({ id: 'profile_title' }), intl.formatMessage({ id: 'profile_generic_save_success' })));
            dispatch(getProfileData());
        }));
    };

    const saveNewPasswordData = () => {
        if (userPassword?.oldPass === '' || userPassword?.newPass === '' || userPassword?.confirmPass === '') {
            dispatch(showPopup(intl.formatMessage({ id: 'profile_title' }), intl.formatMessage({ id: 'profile_password_fill_all' })));
            return;

        } else if (userPassword?.newPass?.length < 6 || userPassword?.newPass?.length > 20) {
            dispatch(showPopup(intl.formatMessage({ id: 'profile_title' }), intl.formatMessage({ id: 'register_password_validation' })));
            return;

        } else if (userPassword?.newPass !== userPassword?.confirmPass) {
            dispatch(showPopup(intl.formatMessage({ id: 'profile_title' }), intl.formatMessage({ id: 'profile_password_same_pass' })));
            return;
        }

        const encryptedData = {
            oldPassword: encryptDataAES(userPassword?.oldPass),
            newPassword: encryptDataAES(userPassword?.newPass)
        }

        dispatch(saveNewPassword(encryptedData, () => {
            setUserPassword({ oldPass: '', newPass: '', confirmPass: '' });
            dispatch(showPopup(intl.formatMessage({ id: 'profile_title' }), intl.formatMessage({ id: 'profile_password_success' })));
        }, () => {
            dispatch(showPopup(intl.formatMessage({ id: 'profile_title' }), intl.formatMessage({ id: 'profile_password_old_pass_not_match' })));
        }))
    };

    useEffect(() => {
        dispatch(getProfileData());
    }, []);
    useEffect(() => {
        setUserDataInternal(profileData);
    }, [profileData]);

    return (
        <div className={classes.mainContainer}>
            <h1 className={classes.title}><FormattedMessage id='profile_title' /></h1>
            <div className={classes.contentContainer}>
                <div className={classes.leftSide}>
                    <Avatar className={classes.profileImage} src={profileImg ? URL.createObjectURL(profileImg) : profileData?.profileImage} alt='Load image failed!' />
                    {profileImg ?
                        <button className={classes.button} data-type='red' onClick={() => setProfileImg(null)}><FormattedMessage id='profile_delete_img' /></button>
                        :
                        <>
                            <label htmlFor='profileImageFile' className={classes.button}>
                                <FormattedMessage id='profile_chg_img' />
                            </label>
                            <input type='file' accept='image/*' hidden id='profileImageFile' onChange={setNewProfileImage} />
                        </>
                    }
                    <div className={classes.accountInfoContainer}>
                        <p>{profileData?.role === 'customer' ? intl.formatMessage({ id: 'profile_customer' }) : intl.formatMessage({ id: 'profile_business' })}</p>
                        <p>{profileData?.createdAt}</p>
                    </div>
                </div>
                <div className={classes.rigthSide}>
                    <h3 className={classes.containerTitle}><FormattedMessage id='profile_general' /></h3>
                    <label htmlFor='email' className={classes.label}><FormattedMessage id='profile_email' /></label>
                    <input type="email" id='email' disabled className={classes.input} value={userData?.email} />
                    <label htmlFor='fullname' className={classes.label}><FormattedMessage id='profile_fullname' /></label>
                    <input type="text" id='fullname' className={classes.input} value={userData?.fullname} onChange={(e) => setUserData(prevVal => ({ ...prevVal, fullname: e.target.value }))} />
                    <label htmlFor='dob' className={classes.label}><FormattedMessage id='profile_dob' /></label>
                    <input type="date" id='dob' className={classes.input} value={userData?.dob} onChange={(e) => setUserData(prevVal => ({ ...prevVal, dob: e.target.value }))} />
                    <div className={classes.buttonConatainer}>
                        <button className={classes.button} onClick={saveGeneralData}><FormattedMessage id='profile_save' /></button>
                    </div>
                    <h3 className={classes.containerTitle}><FormattedMessage id='profile_passwords' /></h3>
                    <label htmlFor='oldPassword' className={classes.label}><FormattedMessage id='profile_password_old' /></label>
                    <input type="password" id='oldPassword' className={classes.input} value={userPassword?.oldPass} onChange={(e) => setUserPassword(prevVal => ({ ...prevVal, oldPass: e.target.value }))} />
                    <label htmlFor='newPassword' className={classes.label}><FormattedMessage id='profile_password_new' /></label>
                    <input type="password" id='newPassword' className={classes.input} value={userPassword?.newPass} onChange={(e) => setUserPassword(prevVal => ({ ...prevVal, newPass: e.target.value }))} />
                    <label htmlFor='confirmNewPass' className={classes.label}><FormattedMessage id='profile_password_confirm' /></label>
                    <input type="password" id='confirmNewPass' className={classes.input} value={userPassword?.confirmPass} onChange={(e) => setUserPassword(prevVal => ({ ...prevVal, confirmPass: e.target.value }))} />
                    <div className={classes.buttonConatainer}>
                        <button className={classes.button} onClick={saveNewPasswordData}><FormattedMessage id='profile_save' /></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

ProfilePage.propTypes = {
    profileData: PropTypes.object,
    userDataSelect: PropTypes.object,
}

const mapStateToProps = createStructuredSelector({
    profileData: selectProfileData,
    userDataSelect: selectUserData
});

export default connect(mapStateToProps)(ProfilePage);