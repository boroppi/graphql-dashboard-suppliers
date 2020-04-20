/*
 *    Avetti Commerce
 *
 *    NOTICE OF LICENSE
 *
 *    This source file is subject to the Avetti Enterprise License (AEL 1.20)
 *    that is bundled with this package in the file AELICENSE.txt.
 *
 *    Copyright(c)2020. Avetti.com Corporation. (http://www.avetticommerce.com)
 *    License:   Avetti Enterprise License (AEL 1.20)
 *
 *    COPYRIGHT Avetti.com Corporation 1998-2020.  All Rights Reserved
 */

// The list of all used GraphQl queries
import gql from 'graphql-tag';

// Queries
export const GET_SUPPLIER_DATA =  gql`
    query GetSupplierData {
        suppliers {
            id
            description
            brand
            year
            values
        }
    }
`;

export const FIND_ITEM_BY_CODE_OR_TITLE = gql`
    query FindItemByCodeOrTitle($vendorId: String!, 
        $codeOrTitle: String!){
          getItemsByCodeOrTitle(
            vendorId: $vendorId
            codeOrTitle: $codeOrTitle
          ) {
            code
            title
          }
    }
`
export const GET_ALL_ITEMS = gql`
    query GetItems($vendorId: String!){
        getItems(
            vendorId: $vendorId
        ) {
            itemId
            code
            title
        }
    }
`

// Mutations
export const UPDATE_SUPPLIER_DATA =  gql`
    mutation UpdateSuppliers(
        $brand: String, $location: String,
        $values: String, $year: Int
    ) {
        update_suppliers(
            where: {id: {_eq: 1}},
            _set: {
                brand: $brand,
                location: $location,
                values: $values,
                year: $year
            }){
            affected_rows
        }
    }
`;

