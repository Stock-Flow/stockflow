import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DetailStockGraph from '../../components/Detail/DetailStockGraph';
import { getDetailStockSagaActionCreator } from '../../redux/modules/detailStock';
import { useState } from 'react';
import DetailStockService from '../../services/DetailStockService';

export default function DetailStockGraphContainer({
  func = 'TIME_SERIES_DAILY',
  symbol = 'IBM',
}) {
  const loading = useSelector((state) => state.detailStock.loading);
  const stock = useSelector((state) => state.detailStock.stock);
  const [date, setDate] = useState('Time Series (Daily)');

  const dispatch = useDispatch();
  const getDetailStock = useCallback(() => {
    dispatch(
      getDetailStockSagaActionCreator(func, symbol, 'Time Series (Daily)'),
    );
  }, []);

  let stockData = stock[date];

  function dailyBtnClick(func, symbol) {
    setDate('Time Series (Daily)');
    func = 'TIME_SERIES_DAILY';
    symbol = 'IBM';
    dispatch(
      getDetailStockSagaActionCreator(func, symbol, 'Time Series (Daily)'),
    );
  }
  function weeklyBtnClick(func, symbol) {
    setDate('Weekly Time Series');
    func = 'TIME_SERIES_WEEKLY';
    symbol = 'IBM';
    dispatch(
      getDetailStockSagaActionCreator(func, symbol, 'Weekly Time Series'),
    );
  }
  function monthlyBtnClick(func, symbol) {
    setDate('Monthly Time Series');
    func = 'TIME_SERIES_MONTHLY';
    symbol = 'IBM';
    dispatch(
      getDetailStockSagaActionCreator(func, symbol, 'Monthly Time Series'),
    );
  }
  useEffect(() => {
    getDetailStock(func, symbol, 'Time Series (Daily)');
  }, []);

  // console.log(useSelector((state) => state));

  return (
    <DetailStockGraph
      getDetailStock={getDetailStock}
      loading={loading}
      stock={stock}
      func={func}
      symbol={symbol}
      dailyBtnClick={dailyBtnClick}
      weeklyBtnClick={weeklyBtnClick}
      monthlyBtnClick={monthlyBtnClick}
      stockData={stockData}
    />
  );
}
