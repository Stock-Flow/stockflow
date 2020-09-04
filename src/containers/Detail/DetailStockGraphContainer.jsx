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
  const indicators = useSelector((state) => state.detailStock.indicator)
  const [date, setDate] = useState('Time Series (Daily)');

  const dispatch = useDispatch();
  const getDetailStock = useCallback((func, symbol, date) => {
    dispatch(
      getDetailStockSagaActionCreator(func, symbol, date),
    );
  }, [dispatch]);

  const movingAverageFive = (stock) => {
    const movingAverage = []
    for (let i = stock.length - 1; i >= 0; i--) {
      if (i > stock.length - 5) {
        continue;
      }
      let sum = 0;
      for (let j = 0; j < 5; j++) {
        sum += +stock[i + j].close

      }
      movingAverage.push({ time: stock[i + 4].time, value: sum / 5 })
    }
    return movingAverage.reverse();
  }
  const movingAverageTen = (stock) => {
    const movingAverage = []
    for (let i = stock.length - 1; i >= 0; i--) {
      if (i > stock.length - 10) {
        continue;
      }
      let sum = 0;
      for (let j = 0; j < 10; j++) {
        sum += +stock[i + j].close

      }
      movingAverage.push({ time: stock[i + 9].time, value: sum / 10 })
    }
    return movingAverage.reverse();
  }
  const movingAverageTwenty = (stock) => {
    const movingAverage = []
    for (let i = stock.length - 1; i >= 0; i--) {
      let sum = 0;
      if (i > stock.length - 20) {
        continue;
      }
      for (let j = 0; j < 20; j++) {
        sum += +stock[i + j].close

      }
      movingAverage.push({ time: stock[i + 19].time, value: sum / 20 })
    }

    return movingAverage.reverse();
  }
  const movingAverageSixty = (stock) => {
    const movingAverage = []
    for (let i = stock.length - 1; i >= 0; i--) {
      if (i > stock.length - 60) {
        continue;
      }
      let sum = 0;
      for (let j = 0; j < 60; j++) {
        sum += +stock[i + j].close

      }
      movingAverage.push({ time: stock[i + 59].time, value: sum / 60 })
    }

    return movingAverage.reverse()
  }


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
