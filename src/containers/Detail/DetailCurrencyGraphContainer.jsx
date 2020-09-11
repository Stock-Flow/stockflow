import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDetailCurrencySagaActionCreator } from '../../redux/modules/detailCurrency';
import DetailCurrencyGraph from '../../components/Detail/DetailCurrencyGraph';

export default function DetailCurrencyGraphContainer({
  func = 'DIGITAL_CURRENCY_DAILY',
  symbol = 'BTC',
}) {
  const loading = useSelector((state) => state.detailCurrency.loading);
  const currency = useSelector((state) => state.detailCurrency.currency);
  const volume = useSelector((state => state.detailCurrency.volume))

  const dispatch = useDispatch();

  const getDetailCurrency= useCallback((symbol) => {
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

  return (
    <DetailCurrencyGraph
      getDetailCurrency={getDetailCurrency}
      movingAverage={movingAverage}
      loading={loading}
      currency={currency}
      volume={volume}
      symbol={symbol}
    />
  )
}