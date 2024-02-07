import { all } from 'redux-saga/effects';

import appSaga from '@containers/App/saga';
import paymentPageSaga from '@pages/PaymentPage/saga';
import ticketDetailSaga from '@pages/TicketDetail/saga';
import bookingsSaga from '@pages/Bookings/saga';
import ticketCreationSaga from '@pages/TicketCreation/saga';

export default function* rootSaga() {
  yield all([
    appSaga(),
    paymentPageSaga(),
    ticketDetailSaga(),
    bookingsSaga(),
    ticketCreationSaga(),
  ]);
}
