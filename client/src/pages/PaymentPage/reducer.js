import { produce } from 'immer';
import { SET_COUPONS_DATA, SET_PRODUCT_ID, SET_USER_INPUTS } from './constants';

export const initialState = {
    userInputData: null,
    couponsData: [
        {
            id: 1,
            name: 'Diskon 100k',
            priceCut: 100000
        },
        {
            id: 2,
            name: 'Diskon 50k',
            priceCut: 50000
        },
        {
            id: 3,
            name: 'Diskon 30k',
            priceCut: 30000
        },
    ],
    productId: null
};

export const storedKey = [];

const paymentPageReducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case SET_USER_INPUTS:
                draft.userInputData = action.data;
                break;
            case SET_COUPONS_DATA:
                draft.couponsData = action.data;
                break;
            case SET_PRODUCT_ID:
                draft.productId = action.id;
                break;
        }
    });

export default paymentPageReducer;
