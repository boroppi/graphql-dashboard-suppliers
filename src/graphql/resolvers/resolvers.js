import gql from "graphql-tag";
import getSupplierData from "../queries/getSupplierData";

export const typeDefs = gql`
  type suppliers {
    id: Int!
    brand: String!
    year: Int!
    location: String
    values: String
    description: String!
    collection: [collection!]
  }
  type collection {
    id: Int!
    title: String!
    description: String!
    products: [Int!]
  }
`;
export const resolvers = {
  Mutation: {
    updateSupplierData: (_, { index, value }, { cache }) => {
      const query = gql`
        query updateSupplierData {
          supplierData @client {
            id
            brand
            year
            values
            location
            __typename
          }
        }
      `;

      const prevState = cache.readQuery({ query });
      const data = {
        ...prevState,
        supplierData: {
          ...prevState.supplierData,
          [index]: value
        }
      };
      cache.writeData({ query, data });
      console.log(data);
    }
  }
};
