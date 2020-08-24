import React from 'react';
import logo from './logo.svg';
import './App.css';
import { StockService } from './services/StockService';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getStockSagaActionCreator } from './redux/modules/stock';

const key = "Time Series (1min)"

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStockSagaActionCreator('TIME_SERIES_INTRADAY', 'IBM'))
  }, [dispatch])

  return (
    <>

    </>
  );


}

export default App;
