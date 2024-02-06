import { produce } from 'immer';
import { SET_USER_INPUTS } from './constants';

export const initialState = {
    userInputData: null,
};

export const storedKey = [];

const paymentPageReducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case SET_USER_INPUTS:
                draft.userInputData = action.data;
                break;
        }
    });

export default paymentPageReducer;
