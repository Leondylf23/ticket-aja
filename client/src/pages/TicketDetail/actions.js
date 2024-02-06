import { GET_PRODUCT_DATA, SET_PRODUCT_DATA } from "./constants";

export const getProductData = (id, cd) => ({
    type: GET_PRODUCT_DATA,
    id,
    cd
});

export const setProductData = (data) => ({
    type: SET_PRODUCT_DATA,
    data
});

