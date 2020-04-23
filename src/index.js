import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { withClientState } from "apollo-link-state";
import { ApolloLink } from "apollo-link";

import { Provider } from "react-redux";
import configureStore from "./redux/index.js";

import "antd/dist/antd.css";
import "draft-js/dist/Draft.css";
import "./css/style.css";
import "./css/DraftStyleDefault.css";

import App from "./App";
import { resolvers, typeDefs } from "./graphql/resolvers/resolvers.js";

const cache = new InMemoryCache();

export const store = configureStore();

const defaultState = {
  supplierData: {
    id: 1,
    year: null,
    brand: "",
    location: "",
    values: "",
    collection: [
      { title: "test", description: "desc", products: [1, 2, 3, 4] }
    ],
    __typename: "SupplierData"
  },
  collectionData: {
    id: 1,
    description: "",
    products: [],
    __typename: "CollectionsData"
  }
};

const stateLink = withClientState({
  cache,
  defaults: defaultState,
  resolvers: resolvers
});
const client = new ApolloClient({
  connectToDevTools: true,
  link: ApolloLink.from([
    stateLink,
    new HttpLink({ uri: "https://kirill-test.herokuapp.com/v1/graphql" })
    //new HttpLink({ uri: "https://c11ca1.avetti.ca/preview/graphql/" })
  ]),
  cache,
  typeDefs,
  resolvers
});

const c11Client = new ApolloClient({
  connectToDevTools: true,
  link: ApolloLink.from([
    stateLink,
    new HttpLink({ uri: "https://c11ca1.avetti.ca/preview/graphql/" })
  ]),
  cache,
  typeDefs,
  resolvers
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App c11Client={c11Client} />
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);
