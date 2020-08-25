import React from 'react';
import logo from './logo.svg';
import './App.css';
import { StockService } from './services/StockService';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getStockSagaActionCreator } from './redux/modules/stock';
import { getDJIASagaActionCreator } from './redux/modules/djia';
import SideBarContainer from './containers/SideBarContainer';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router-dom';

const key = "Time Series (1min)"

function App() {

  return (
    <ConnectedRouter>
      <Switch>
        <Route />
      </Switch>
    </ConnectedRouter>
  );


}

export default App;
