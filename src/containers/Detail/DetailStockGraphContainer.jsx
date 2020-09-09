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

  const movingAverage = (stock, duration) => {
    const movingAverage = [];
    for (let i = stock.length - 1; i >= 0; i--) {
      if (i > stock.length - duration) {
        continue;
      }
      let sum = 0;
      for (let j = 0; j < duration; j++) {
        sum += +stock[i + j].close;
      }
      movingAverage.push({
        time: stock[i + duration - 1].time,
        value: +sum / duration,
      });
    }
    return movingAverage.reverse();
  };

  const getAverage = (data, duration) => {
    const movingAverage = [];
    for (let i = data.length - 1; i >= 0; i--) {
      if (i > data.length - duration) {
        continue;
      }
      let sum = 0;
      for (let j = 0; j < duration; j++) {
        sum += +data[i + j].value;
      }
      movingAverage.push({
        time: data[i + duration - 1].time,
        value: +sum / duration,
      });
    }
    return movingAverage.reverse();
  };

  const rsiSignal = (rsi) => {
    if (!rsi) return;
    const rsiSignal = []
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
  const getMACDData = useCallback((stock) => {
    const movingAverageTwentySix = movingAverage(stock, 26);
    const movingAverageTwelve = movingAverage(stock, 12);
    const MACDData = movingAverageTwentySix.map((item, i) => ({ time: item.time, value: movingAverageTwelve[i].value - item.value }))
    const MACDSignal = getAverage(MACDData, 9);
    const MACDOscillator = MACDSignal.map((item, i) => ({ time: item.time, value: MACDData[i].value - item.value }))
    return [MACDData, MACDSignal, MACDOscillator]
  }, [])

  const getStochasticSlow = useCallback((stock, duration, n, m) => {
    const data = stock.reverse();
    const fastK = []
    for (let i = 0; i < stock.length - 1 - duration; i++) {
      const low = Math.min(...data.slice(i, duration + i).map(item => { return +item.low }))
      const high = Math.max(...data.slice(i, duration + i).map(item => { return +item.high }))
      const fast = (stock[i].close - low) / (high - low) * 100
      fastK.push({ time: stock[i].time, value: fast });
    }
    const slowK = getAverage(fastK.reverse(), n);
    const slowD = getAverage(slowK, m);
    return [slowK, slowD]

  }, [])

  return (
    <DetailStockGraph
      getDetailStock={getDetailStock}
      movingAverage={movingAverage}
      rsiSignal={rsiSignal(indicators[0])}
      getMACDData={getMACDData}
      getStochasticSlow={getStochasticSlow}
      indicators={indicators}
      loading={loading}
      stock={stock}
      volume={volume}
      symbol={symbol}
    />
  );
}
