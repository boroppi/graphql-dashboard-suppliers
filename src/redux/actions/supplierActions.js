import { ADD_DATA_TO_COLLECTION, } from "../types.js";

export const addData = (data) => ({
    type: ADD_DATA_TO_COLLECTION,
    payload: data
});

export const decResult = () => ({
    //type: DEC_ACTION
});

export const customChange = data => ({
    //type: CUSTOM_CHANGE,
    payload: data
});
