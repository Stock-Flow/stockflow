import React from 'react';
import logo from './logo.svg';
import './App.css';
<<<<<<< HEAD
import { history } from './redux/create'
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
=======
import { StockService } from './services/StockService';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getStockSagaActionCreator } from './redux/modules/stock';
import { getDJIASagaActionCreator } from './redux/modules/djia';
import SideBarContainer from './containers/SideBarContainer';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router-dom';
>>>>>>> feature/sidebarStock

const key = "Time Series (1min)"

function App() {

  return (
<<<<<<< HEAD

    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </ConnectedRouter>

=======
    <ConnectedRouter>
      <Switch>
        <Route />
      </Switch>
    </ConnectedRouter>
>>>>>>> feature/sidebarStock
  );


}

export default App;
