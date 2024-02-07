import { takeLatest, call, put } from 'redux-saga/effects';

import { showPopup, setLoading } from '@containers/App/actions';
import { GET_COUPONS_DATA } from './constants';

function* doGetCouponDatas({id}) {
    yield put(setLoading(true));
    try {
        
    } catch (error) {
        
    }
    yield put(setLoading(false));
}

export default function* paymentPageSaga() {
    yield takeLatest(GET_COUPONS_DATA, doGetCouponDatas);
}
