import { produce } from 'immer';
import { SET_PRODUCT_DATA } from './constants';

export const initialState = {
    productData: null,
};

export const storedKey = [];

const ticketDetailReducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case SET_PRODUCT_DATA:
                draft.productData = action.data;
                break;
        }
    });

export default ticketDetailReducer;
