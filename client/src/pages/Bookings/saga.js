import { takeLatest, call, put } from 'redux-saga/effects';

import { showPopup, setLoading } from '@containers/App/actions';
import { GET_BOOKING_DATA, GET_BOOKING_DETAIL_DATA } from './constants';

function* doGetBookingData({  }) {
    yield put(setLoading(true));

    try {
        // yield call(register, formData);

    } catch (error) {
        yield put(showPopup());
    }

    yield put(setLoading(false));
}

function* doGetBookingDetailData({ id }) {
    yield put(setLoading(true));

    try {
        // yield call(register, formData);

    } catch (error) {
        yield put(showPopup());
    }

    yield put(setLoading(false));
}

export default function* bookingsSaga() {
    yield takeLatest(GET_BOOKING_DATA, doGetBookingData);
    yield takeLatest(GET_BOOKING_DETAIL_DATA, doGetBookingDetailData);
}
