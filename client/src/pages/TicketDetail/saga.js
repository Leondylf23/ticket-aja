import { takeLatest, call, put } from 'redux-saga/effects';

import { showPopup, setLoading } from '@containers/App/actions';
import { GET_PRODUCT_DATA } from './constants';
import { getTicketDetailApi } from '@domain/api';
import { setProductData } from './actions';

function* doGetProductData({ formData, cbNotFound }) {
    yield put(setLoading(true));

    try {
        const res = yield call(getTicketDetailApi, formData);

        yield put(setProductData(res?.data));
    } catch (error) {
        if(error?.response?.status === 404) {
            cbNotFound();
            return;
        }
        yield put(showPopup());
    }

    yield put(setLoading(false));
}

export default function* ticketDetailSaga() {
    yield takeLatest(GET_PRODUCT_DATA, doGetProductData);
}
