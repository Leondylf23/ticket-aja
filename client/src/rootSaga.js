import { all } from 'redux-saga/effects';

import appSaga from '@containers/App/saga';
import paymentPageSaga from '@pages/PaymentPage/saga';
import ticketDetailSaga from '@pages/TicketDetail/saga';

export default function* rootSaga() {
  yield all([
    appSaga(),
    paymentPageSaga(),
    ticketDetailSaga()
  ]);
}
