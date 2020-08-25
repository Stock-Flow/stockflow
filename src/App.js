import React from 'react';
import logo from './logo.svg';
import './App.css';
import { StockService } from './services/StockService';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getStockSagaActionCreator } from './redux/modules/stock';
import { getDJIASagaActionCreator } from './redux/modules/djia';
import SideBarContainer from './containers/SideBarContainer';

const key = "Time Series (1min)"

function App() {

  return (
    <>
      <SideBarContainer></SideBarContainer>
    </>
  );


}

export default App;
