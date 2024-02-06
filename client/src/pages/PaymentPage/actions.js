import { GET_PRODUCT_DATA, SET_PRODUCT_DATA, SET_USER_INPUTS } from "./constants";

export const setUserInputs = (data) => ({
    type: SET_USER_INPUTS,
    data
});

export const getProductData = (id, cd) => ({
    type: GET_PRODUCT_DATA,
    id,
    cd
});

export const setProductData = (data) => ({
    type: SET_PRODUCT_DATA,
    data
});

