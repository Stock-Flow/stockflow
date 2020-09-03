import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DetailStockGraph from '../../components/Detail/DetailStockGraph';
import { getDetailStockSagaActionCreator } from '../../redux/modules/detailStock';
import { useState } from 'react';

export default function DetailStockGraphContainer({
  func = 'TIME_SERIES_DAILY_ADJUSTED',
  symbol = 'IBM',
}) {
  const loading = useSelector((state) => state.detailStock.loading);
  const stock = useSelector((state) => state.detailStock.stock);
  const [date, setDate] = useState('Time Series (Daily)');

  const dispatch = useDispatch();
  const getDetailStock = useCallback(
    (func, symbol, date) => {
      dispatch(getDetailStockSagaActionCreator(func, symbol, date));
    },
    [dispatch],
  );

  const movingAverageFive = (stock) => {
    const movingAverage = [];
    for (let i = 0; i < stock.length; i += 5) {
      let sum = 0;
      for (let j = 0; j < 5; j++) {
        sum += +stock[i + j].close;
      }
      movingAverage.push({ time: stock[i].time, value: sum / 5 });
    }
    movingAverage.push({
      time: stock[stock.length - 1].time,
      value: stock[stock.length - 1].close,
    });
    return movingAverage;
  };
  const movingAverageTen = (stock) => {
    const movingAverage = [];
    for (let i = 0; 10 * Math.trunc(stock.length / 10); i += 10) {
      let sum = 0;
      for (let j = 0; j < 10; j++) {
        sum += +stock[i + j].close;
      }
      movingAverage.push({ time: stock[i].time, value: sum / 10 });
    }
    movingAverage.push({
      time: stock[stock.length - 1].time,
      value: stock[stock.length - 1].close,
    });
    return movingAverage;
  };
  const movingAverageTwenty = (stock) => {
    const movingAverage = [];
    for (let i = 0; i < 20 * Math.trunc(stock.length / 20); i += 20) {
      let sum = 0;
      for (let j = 0; j < 20; j++) {
        sum += +stock[i + j].close;
      }
      movingAverage.push({ time: stock[i].time, value: sum / 20 });
    }
    movingAverage.push({
      time: stock[stock.length - 1].time,
      value: stock[stock.length - 1].close,
    });
    return movingAverage;
  };
  const movingAverageSixty = (stock) => {
    const movingAverage = [];
    for (let i = 0; i < 60 * Math.trunc(stock.length / 60); i += 60) {
      let sum = 0;
      for (let j = 0; j < 60; j++) {
        sum += +stock[i + j].close;
      }
      movingAverage.push({ time: stock[i].time, value: sum / 60 });
    }
    movingAverage.push({
      time: stock[stock.length - 1].time,
      value: stock[stock.length - 1].close,
    });
    return movingAverage;
  };
  // function dailyBtnClick(func, symbol) {
  //   setDate('Time Series (Daily)');
  //   func = 'TIME_SERIES_DAILY';
  //   symbol = 'IBM';
  //   dispatch(
  //     getDetailStockSagaActionCreator(func, symbol, 'Time Series (Daily)'),
  //   );
  // }
  // function weeklyBtnClick(func, symbol) {
  //   setDate('Weekly Time Series');
  //   func = 'TIME_SERIES_WEEKLY_ADJUSTED';
  //   symbol = 'IBM';
  //   dispatch(
  //     getDetailStockSagaActionCreator(func, symbol, 'Weekly Adjusted Time Series'),
  //   );
  // }
  // function monthlyBtnClick(func, symbol) {
  //   setDate('Monthly Time Series');
  //   func = 'TIME_SERIES_MONTHLY_ADJUSTED';
  //   symbol = 'IBM';
  //   dispatch(
  //     getDetailStockSagaActionCreator(func, symbol, 'Monthly Adjusted Time Series'),
  //   );

  // }

  // console.log(useSelector((state) => state));

  return (
    <DetailStockGraph
      getDetailStock={getDetailStock}
      movingAverageFive={movingAverageFive}
      movingAverageTen={movingAverageTen}
      movingAverageTwenty={movingAverageTwenty}
      movingAverageSixty={movingAverageSixty}
      loading={loading}
      stock={stock}
      func={func}
      date={date}
      symbol={symbol}
    />
  );
}
