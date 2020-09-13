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
  const indicators = useSelector((state) => state.detailStock.indicator);

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
  if (indicators) {
    rsiSig = rsiSignal(indicators[0])
  }
  console.log(indicators)
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
    />
  )
}