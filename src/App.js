import React from 'react';
import logo from './logo.svg';
import './App.css';
import { history } from './redux/create'
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';

const key = "Time Series (1min)"

function App() {

  return (

    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </ConnectedRouter>

  );


}

export default App;
