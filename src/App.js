import React, { useState, useEffect } from "react";
import { Route, Switch, Router } from "react-router-dom";

import { useQuery, useMutation } from "@apollo/react-hooks";

import Home from "./components/pages/Home";
import Supplier from "./components/pages/Supplier";

import history from "./history";

export const App = ({ c11Client }) => {
  return (
    <Router history={history}>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />

          <Route
            exact
            path="/supplier/:supplierVid"
            render={() => <Supplier c11Client={c11Client} />}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
