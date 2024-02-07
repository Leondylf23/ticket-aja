import { takeLatest, call, put } from 'redux-saga/effects';

import { showPopup, setLoading } from '@containers/App/actions';
import { GET_PRODUCT_DATA } from './constants';

function* doGetProductData({ id, cb }) {
    yield put(setLoading(true));

    try {
        // yield call(register, formData);

        cb();
    } catch (error) {
        yield put(showPopup());
    }

    yield put(setLoading(false));
}

export default function* ticketCreationSaga() {
    yield takeLatest(GET_PRODUCT_DATA, doGetProductData);
}
