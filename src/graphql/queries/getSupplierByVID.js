/* {
  suppliers(where: {supplierVID: {_eq: "22411234"}}) {
    id
  }
 
}
 */

import gql from "graphql-tag";

export default gql`
  query getSupplierDataByVid($vid: String!) {
    suppliers(where: { supplierVID: { _eq: $vid } }) {
      supplierVID
      brand
      year
      location
      collections {
        id
        title
        description
        products {
          product_id
          title
        }
      }
    }
  }
`;
