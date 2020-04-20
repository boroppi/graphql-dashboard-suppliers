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

export const GET_INVENTORIES =  gql`    
    query ($vendorId: String!) {
        getItems(vendorId: $vendorId, itemIds:[329536]) {
            code
            title
            mcwItem{
                code
            }
            manufactureName
            manufacturePartNumber
            hide
            keywords
            metaDescription
            pageTitle
            urlLocked
            seoUrl
            itemType
            itemImage
            thumbnail
            smallImage
            inventories{
                inventoryId,
                inStock,
                hide,
                onOrder,
                minOrderQty,
                minReorderQty,
                pickPackDays,
                hide,
                enableEditDeliveryDate,
                discontinued,
                modifyTime
            }
        }
    }
`;

export const UPDATE_INVENTORIES =  gql`
    mutation($vendorId : String! $inventoryId: ID! $code: String! $itemId: ID! $inStock: Int){
        updateInventory(inventory:
        {
            inventoryId: $inventoryId
            vendorId: $vendorId
            code: $code
            itemId: $itemId
            inStock: $inStock
        }
        ){
            inStock,
            modifyTime
        }
    }
`;


// mutation {
//     updateInventory(inventory: {
//         inventoryId: 132954
//         vendorId:"20180522154"
//         code: "AINLRW35A3-31"
//         itemId: 281867
//         nextShipQty: 100
//         nextShipDate: "2020-03-22T10:00:00"
//     }) {
//         code
//         inStock
//         nextShipQty
//         nextShipDate
//         modifyTime
//     }
// }


// mutation{
//     createInventory(inventory:
//     {
//         inventoryId: "199758"
//         vendorId: "20170130806"
//         code: "COAT-PINK"
//         itemId: "329536"
//         inStock: 234
//     }
// ){
//         inStock
//         inStockBuffer
//         onOrder
//         subCode
//         lastOutOfStock
//         lastInStock
//         pickPackDays
//         nextShipQty
//         nextShipDate
//         dropShipMinQty
//         dropShipDays
//         minReorderQty
//         hide
//         enableEditDeliveryDate
//         discontinued
//         thirdpartyInventory
//         thirdpartyCode
//         wholesalerIdString
//         modifyTime
//         onDisplay
//         minOrderQty
//         defaultDelivery
//     }
// }