/* {
  getVendors{
  vendorId
  }
}
 */
import gql from "graphql-tag";

export default gql`
  query {
    getVendors {
      vendorId
    }
  }
`;
