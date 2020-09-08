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
  const indicators = useSelector((state) => state.detailStock.indicator)
  const volume = useSelector((state => state.detailStock.volume))

  const dispatch = useDispatch();

  const getDetailStock = useCallback((symbol) => {
    dispatch(
      getDetailStockSagaActionCreator(symbol),
    );
  }, [dispatch]);


  const movingAverage = (stock, duration) => {
    const movingAverage = []
    for (let i = stock.length - 1; i >= 0; i--) {
      if (i > stock.length - duration) {
        continue;
      }
      let sum = 0;
      for (let j = 0; j < duration; j++) {
        sum += +stock[i + j].close;
      }
      movingAverage.push({ time: stock[i + duration - 1].time, value: +sum / duration })
    }
    return movingAverage.reverse();
  }



  const rsiSignal = (rsi) => {
    const rsiSignal = []
    for (let i = rsi.length - 1; i >= 0; i--) {
      if (i > rsi.length - 6) {
        continue;
      }
      let sum = 0;
      for (let j = 0; j < 6; j++) {
        sum += +rsi[i + j].value

      }
      rsiSignal.push({ time: rsi[i + 5].time, value: +(sum / 6).toFixed(2) })
    }

    return rsiSignal.reverse()
  }


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
