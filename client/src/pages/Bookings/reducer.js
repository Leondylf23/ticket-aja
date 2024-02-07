import { produce } from 'immer';
import { SET_BOOKING_DATA, SET_BOOKING_DETAIL_DATA } from './constants';

export const initialState = {
    bookingsData: [
        {
            id: 1,
            bookingCode: 'aaaaa',
            status: 'WAITING'
        },
        {
            id: 2,
            bookingCode: 'aaa2a',
            status: 'BOOKED'
        },
    ],
    bookingDetailData: {
        id: 2,
        bookingCode: 'aaa2a',
        status: 'BOOKED',
        title: 'Event di Phincon',
        price: 1000000,
        image: 'https://d3fkkqa7lc3d5k.cloudfront.net/post-1-attatchments-logo%20kru%20bg.png',
        isTransfer: true,
        transferImg: 'https://d3fkkqa7lc3d5k.cloudfront.net/post-1-attatchments-logo%20kru%20bg.png',
        location: 'Jakarta Selatan',
        organizer: 'Phincon'
    }
};

export const storedKey = [];

const bookingsReducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case SET_BOOKING_DATA:
                draft.bookingsData = action.data;
                break;
            case SET_BOOKING_DETAIL_DATA:
                draft.bookingDetailData = action.data;
                break;
        }
    });

export default bookingsReducer;
