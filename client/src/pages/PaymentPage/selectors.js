import { createSelector } from 'reselect';
import { initialState } from '@containers/App/reducer';

const selectPaymentPageState = (state) => state.paymentPage || initialState;

export const selectUserInputData = createSelector(selectPaymentPageState, (state) => state.userInputData);
