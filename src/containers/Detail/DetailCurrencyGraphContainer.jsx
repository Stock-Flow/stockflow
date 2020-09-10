import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDetailCurrencySagaActionCreator } from '../../redux/modules/detailCurrency';
import DetailCurrencyGraph from '../../components/Detail/DetailCurrencyGraph';

export default function DetailCurrencyGraphContainer({
  func = 'DIGITAL_CURRENCY_DAILY',
  symbol = 'BTC',
}) {

  const dispatch = useDispatch();

  const getDetailCurrency= useCallback((symbol) => {
    dispatch(
      getDetailCurrencySagaActionCreator(symbol),
    );
  }, [dispatch]);

  return (
    <DetailCurrencyGraph
      getDetailCurrency={getDetailCurrency}
      // movingAverage={movingAverage}
      // rsiSignal={rsiSignal}
      // indicators={indicators}
      // loading={loading}
      // stock={stock}
      // volume={volume}
      symbol={symbol}
    />
  )
}