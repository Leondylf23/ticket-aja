import { produce } from 'immer';
import { SET_PRODUCT_DATA, SET_USER_INPUTS } from './constants';

export const initialState = {
    productData: null,
    userInputData: null,
};

export const storedKey = ['userInputData'];

const paymentPageReducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case SET_USER_INPUTS:
                draft.userInputData = action.data;
                break;
            case SET_PRODUCT_DATA:
                draft.productData = action.data;
                break;
        }
    });

export default paymentPageReducer;
