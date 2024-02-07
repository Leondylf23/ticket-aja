import { GET_BOOKING_DATA, GET_BOOKING_DETAIL_DATA, SET_BOOKING_DATA, SET_BOOKING_DETAIL_DATA } from "./constants";

export const getProductData = () => ({
    type: GET_BOOKING_DATA,
});

export const setProductData = (data) => ({
    type: SET_BOOKING_DATA,
    data
});

export const getBookingDetailData = (id) => ({
    type: GET_BOOKING_DETAIL_DATA,
    id
});

export const setBookingDetailData = (data) => ({
    type: SET_BOOKING_DETAIL_DATA,
    data
});