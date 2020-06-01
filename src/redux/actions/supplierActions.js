import {
  ADD_DATA_TO_COLLECTION,
  MAP_DATA_TO_SUPPLIERS_STATE,
  SET_ALL_PRODUCTS,
  UNMOUNT_SUPPLIER,
  CHANGE_SUPPLIER_VID
} from "../types.js";

export const changeSupplierVIDAction = data => ({
  type: CHANGE_SUPPLIER_VID,
  payload: data
});

export const unMountSupplierAction = () => ({
  type: UNMOUNT_SUPPLIER
});

export const mapDataToSuppliersStateAction = data => ({
  type: MAP_DATA_TO_SUPPLIERS_STATE,
  payload: data
});

export const setAllProductsAction = data => ({
  type: SET_ALL_PRODUCTS,
  payload: data
});

export const addData = data => ({
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
