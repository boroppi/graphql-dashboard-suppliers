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

import gql from 'graphql-tag';

export default gql `
    mutation updateSupplierData($id: ID, $index: String!, $value: Int!){
        updateSupplierData(id: $id, index: $index, value: $value) @client {
            id
            brand
            year
            values
            location
            __typename
        }
    }
`