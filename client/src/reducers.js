import { combineReducers } from 'redux';

import appReducer, { storedKey as storedAppState } from '@containers/App/reducer';
import clientReducer, { storedKey as storedClientState } from '@containers/Client/reducer';
import paymentPageReducer, { storedKey as storedPaymentPageState } from '@pages/PaymentPage/reducer';
import ticketDetailReducer, { storedKey as storedTicketDetailState } from '@pages/TicketDetail/reducer';
import bookingsReducer, { storedKey as storedBookingsState } from '@pages/Bookings/reducer';
import ticketCreationReducer, { storedKey as storedTicketCreationState } from '@pages/TicketCreation/reducer';
import languageReducer from '@containers/Language/reducer';

import { mapWithPersistor } from './persistence';

const storedReducers = {
  app: { reducer: appReducer, whitelist: storedAppState },
  client: { reducer: clientReducer, whitelist: storedClientState },
};

const temporaryReducers = {
  language: languageReducer,
  paymentPage: paymentPageReducer,
  ticketDetail: ticketDetailReducer,
  bookings: bookingsReducer,
  ticketCreation: ticketCreationReducer,
};

const createReducer = () => {
  const coreReducer = combineReducers({
    ...mapWithPersistor(storedReducers),
    ...temporaryReducers,
  });
  const rootReducer = (state, action) => coreReducer(state, action);
  return rootReducer;
};

export default createReducer;
