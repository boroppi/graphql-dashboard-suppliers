import gql from "graphql-tag";
import { Mutation } from "@apollo/react-components";

export const INSERT_SUPPLIER = gql`
  mutation insertSupplierData($supplier: suppliers_insert_input!) {
    insert_suppliers(objects: [$supplier]) {
      affected_rows
    }
  }
`;

/*  mutation {
  insert_suppliers(objects: {description: "TEST", brand: "BURAK2", location: "BARRIE", year: 2020, collections: {data: {title: "", description: "", products: {data: {product_id: 10}}}}}) {
    returning {
      id
    }
    affected_rows
  }
} */
