import { ADD_DATA_TO_COLLECTION, } from "../types.js";

const initialState = {
        year: null,
        brand: "",
        location: "",
        values: "",
        collections: []
};


const mainReducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case ADD_DATA_TO_COLLECTION:
            return {
                ...state,
                collections: [...state.collections, payload]
            };

        //ADD_INIT_DATA_TO_COLLECTION
        //ADD_DATA_TO_COLLECTION
        default:
            return state;
    }
};

export default mainReducer;