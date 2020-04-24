import {
  ADD_DATA_TO_COLLECTION,
  MAP_DATA_TO_SUPPLIERS_STATE,
  SET_ALL_PRODUCTS
} from "../types.js";

const initialState = {
  supplier: {
    supplierVID: "",
    brand: "",
    year: "",
    location: "",
    description: "NEED TO IMPLEMENT THIS",
    supplierVID: "",
    collections: [
      /* { title: "", description: "", products: [] } */
    ]
  },

  allProducts: []
};

const mainReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_DATA_TO_COLLECTION:
      return {
        ...state,
        collections: [...state.collections, payload]
      };
    case MAP_DATA_TO_SUPPLIERS_STATE:
      return {
        ...state,
        supplier: payload
      };

    case SET_ALL_PRODUCTS:
      return {
        ...state,
        allProducts: payload
      };

    //ADD_INIT_DATA_TO_COLLECTION
    //ADD_DATA_TO_COLLECTION
    default:
      return state;
  }
};

export default mainReducer;
