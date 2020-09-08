import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DetailStockGraph from '../../components/Detail/DetailStockGraph';
import { getDetailStockSagaActionCreator } from '../../redux/modules/detailStock';

export default function DetailStockGraphContainer({
  func = 'TIME_SERIES_DAILY_ADJUSTED',
  symbol = 'IBM',
}) {
  const loading = useSelector((state) => state.detailStock.loading);
  const stock = useSelector((state) => state.detailStock.stock);
  const indicators = useSelector((state) => state.detailStock.indicator);
  const volume = useSelector((state) => state.detailStock.volume);

  const dispatch = useDispatch();

  const getDetailStock = useCallback(
    (symbol) => {
      dispatch(getDetailStockSagaActionCreator(symbol));
    },
    [dispatch],
  );

<<<<<<< HEAD
  const movingAverageFive = (stock) => {
    const movingAverage = [];
=======

  const movingAverage = (stock, duration) => {
    const movingAverage = []
>>>>>>> d67d6b57e25bd9b26e7347fea448ba28f3023758
    for (let i = stock.length - 1; i >= 0; i--) {
      if (i > stock.length - duration) {
        continue;
      }
      let sum = 0;
      for (let j = 0; j < duration; j++) {
        sum += +stock[i + j].close;
      }
<<<<<<< HEAD
      movingAverage.push({ time: stock[i + 4].time, value: sum / 5 });
    }
    return movingAverage.reverse();
  };
  const movingAverageTwenty = (stock) => {
    const movingAverage = [];
    for (let i = stock.length - 1; i >= 0; i--) {
      let sum = 0;
      if (i > stock.length - 20) {
        continue;
      }
      for (let j = 0; j < 20; j++) {
        sum += +stock[i + j].close;
      }
      movingAverage.push({ time: stock[i + 19].time, value: sum / 20 });
    }

    return movingAverage.reverse();
  };
  const movingAverageSixty = (stock) => {
    const movingAverage = [];
    for (let i = stock.length - 1; i >= 0; i--) {
      if (i > stock.length - 60) {
        continue;
      }
      let sum = 0;
      for (let j = 0; j < 60; j++) {
        sum += +stock[i + j].close;
      }
      movingAverage.push({ time: stock[i + 59].time, value: sum / 60 });
    }
    return movingAverage.reverse();
  };
  const movingAverageHundredTwenty = (stock) => {
    const movingAverage = [];
    for (let i = stock.length - 1; i >= 0; i--) {
      if (i > stock.length - 120) {
        continue;
      }
      let sum = 0;
      for (let j = 0; j < 120; j++) {
        sum += +stock[i + j].close;
      }
      movingAverage.push({ time: stock[i + 119].time, value: sum / 120 });
    }
    return movingAverage.reverse();
  };
=======
      movingAverage.push({ time: stock[i + duration - 1].time, value: +sum / duration })
    }
    return movingAverage.reverse();
  }


>>>>>>> d67d6b57e25bd9b26e7347fea448ba28f3023758

  const rsiSignal = (rsi) => {
    const rsiSignal = [];
    for (let i = rsi.length - 1; i >= 0; i--) {
      if (i > rsi.length - 6) {
        continue;
      }
      let sum = 0;
      for (let j = 0; j < 6; j++) {
        sum += +rsi[i + j].value;
      }
      rsiSignal.push({ time: rsi[i + 5].time, value: +(sum / 6).toFixed(2) });
    }

    return rsiSignal.reverse();
  };

  return (
    <DetailStockGraph
      getDetailStock={getDetailStock}
      movingAverage={movingAverage}
      rsiSignal={rsiSignal}
      indicators={indicators}
      loading={loading}
      stock={stock}
      volume={volume}
      symbol={symbol}
    />
  );
}
