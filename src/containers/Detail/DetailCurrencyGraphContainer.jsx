import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDetailCurrencySagaActionCreator } from '../../redux/modules/detailCurrency';
import DetailCurrencyGraph from '../../components/Detail/DetailCurrencyGraph';

export default function DetailCurrencyGraphContainer({
  func = 'DIGITAL_CURRENCY_DAILY',
  symbol = 'BTC',
}) {
  let rsiSig = [];
  const loading = useSelector((state) => state.detailCurrency.loading);
  const currency = useSelector((state) => state.detailCurrency.currency);
  const volume = useSelector((state => state.detailCurrency.volume))
  const indicators = useSelector((state) => state.detailCurrency.indicator);
  const dispatch = useDispatch();

  const getDetailCurrency = useCallback((symbol) => {
    dispatch(
      getDetailCurrencySagaActionCreator(symbol),
    );
  }, [dispatch]);

  const movingAverage = (currency, duration) => {
    const movingAverage = []
    for (let i = currency.length - 1; i >= 0; i--) {
      if (i > currency.length - duration) {
        continue;
      }
      let sum = 0;
      for (let j = 0; j < duration; j++) {
        sum += +currency[i + j].close;
      }
      movingAverage.push({ time: currency[i + duration - 1].time, value: +sum / duration })
    }
    return movingAverage.reverse();
  }

  const rsiSignal = (rsi) => {
    if (!rsi) return;
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
  if (indicators.length !== 0) {
    rsiSig = rsiSignal(indicators[0])
  }

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

  const getMACDData = useCallback((currency) => {
    const movingAverageTwentySix = movingAverage(currency, 26);
    const movingAverageTwelve = movingAverage(currency, 12);
    const MACDData = movingAverageTwentySix.map((item, i) => ({
      time: item.time,
      value: movingAverageTwelve[i].value - item.value,
    }));
    const MACDSignal = getAverage(MACDData, 9);
    const MACDOscillator = MACDSignal.map((item, i) => ({
      time: item.time,
      value: MACDData[i].value - item.value,
    }));
    return [MACDData, MACDSignal, MACDOscillator];
  }, []);

  const getStochasticSlow = useCallback((currency, duration, n, m) => {
    const data = [...currency].reverse();
    const fastK = []
    for (let i = 0; i < data.length - 1 - duration; i++) {
      const low = Math.min(...data.slice(i, duration + i).map(item => { return +item.low }))
      const high = Math.max(...data.slice(i, duration + i).map(item => { return +item.high }))
      const fast = (data[i].close - low) / (high - low) * 100
      fastK.push({ time: data[i].time, value: fast });
    }
    const slowK = getAverage(fastK.reverse(), n);
    const slowD = getAverage(slowK, m);
    return [slowK, slowD]

  }, [])

  return (
    <DetailCurrencyGraph
      getDetailCurrency={getDetailCurrency}
      movingAverage={movingAverage}
      indicators={indicators}
      loading={loading}
      currency={currency}
      volume={volume}
      symbol={symbol}
      rsiSignal={rsiSig}
      getMACDData={getMACDData}
      getStochasticSlow={getStochasticSlow}
    />
  )
}