import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { history } from "./redux/create";
import { ConnectedRouter } from "connected-react-router";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import { useDispatch } from "react-redux";
import { getDJIASagaActionCreator } from "./redux/modules/djia";
import DetailStockGraphContainer from "./containers/Detail/DetailStockGraphContainer";

const key = "Time Series (1min)";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDJIASagaActionCreator());
  }, [dispatch]);

  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/detail" component={DetailStockGraphContainer} />
      </Switch>
    </ConnectedRouter>
  );
}

export default App;
