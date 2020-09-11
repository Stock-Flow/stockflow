import React, { useCallback } from 'react';
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

  const getDetailCurrency = useCallback((symbol) => {
    dispatch(
      getDetailCurrencySagaActionCreator(symbol),
    );
  }, [dispatch]);

  return (
    <DetailCurrencyGraph
      getDetailCurrency={getDetailCurrency}
      loading={loading}
      currency={currency}
      volume={volume}
      symbol={symbol}
    />
  )
}