/* {
  getVendors{
  vendorId
  }
}
 */
import gql from "graphql-tag";

/* export default gql`
  query {
    getVendors {
      vendorId
    }
  }
`;
 */

export default gql`
  query {
    suppliers {
      supplierVid
    }
  }
`;
