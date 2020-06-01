import {
  ADD_DATA_TO_COLLECTION,
  MAP_DATA_TO_SUPPLIERS_STATE,
  SET_ALL_PRODUCTS,
  UNMOUNT_SUPPLIER,
  CHANGE_SUPPLIER_VID
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

const copyOfInitialState = { ...initialState };

const mainReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CHANGE_SUPPLIER_VID:
      return {
        ...state,
        supplier: {
          ...state.supplier,
          supplierVID: payload
        }
      };
    case ADD_DATA_TO_COLLECTION:
      return {
        ...state,
        supplier: {
          ...state.supplier,
          collections: [...state.supplier.collections, payload]
        }
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
    case UNMOUNT_SUPPLIER:
      return {
        ...state,
        supplier: {
          ...copyOfInitialState.supplier
        }
      };

    //ADD_INIT_DATA_TO_COLLECTION
    //ADD_DATA_TO_COLLECTION
    default:
      return state;
  }
};

export default mainReducer;
