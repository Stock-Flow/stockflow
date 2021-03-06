import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ForeignExchangeDetail from '../../components/MainDjia/ForeignExchangeDetail';
import { createGetSelectedExchangeSaga } from '../../redux/modules/selectedExchange';

export default function ForeignExchangeDetailContainer({ lightMode }) {
  const fromCurrenciesCode = useSelector(
    (state) => state.selectedExchange.fxIntraday.fromCurrenciesCode,
  );
  const fromCurrenciesName = useSelector(
    (state) => state.selectedExchange.fxIntraday.fromCurrenciesName,
  );
  const fxIntraday = useSelector(
    (state) => state.selectedExchange.fxIntraday.fxIntraday,
  );
  const toCurrenciesCode = useSelector(
    (state) => state.selectedExchange.fxIntraday.toCurrenciesCode,
  );
  const toCurrenciesName = useSelector(
    (state) => state.selectedExchange.fxIntraday.toCurrenciesName,
  );

  const exchangeIntraday = useSelector(
    (state) => state.selectedExchange.fxIntraday.fxIntraday,
  );

  let time = [];
  let value = [];

  let keyTime = [];
  if (exchangeIntraday) {
    keyTime = Object.keys(exchangeIntraday);
    keyTime.map((v, i) => {
      time.push(keyTime[i]);
      // open.push(Number(exchangeIntraday[v]['1. open']));
      // high.push(Number(exchangeIntraday[v]['2. high']));
      // low.push(Number(exchangeIntraday[v]['3. low']));
      value.push(Number(exchangeIntraday[v]['4. close']));
    });
  }

  let selectExchangeListResult = time.map((item, i) => {
    return {
      time: item,
      // open: open[i],
      // high: high[i],
      // low: low[i],
      value: value[i],
    };
  });

  selectExchangeListResult.reverse();

  const dispatch = useDispatch();
  const getExchangeDaily = useCallback(() => {
    dispatch(
      createGetSelectedExchangeSaga(
        fromCurrenciesCode,
        fromCurrenciesName,
        toCurrenciesCode,
        toCurrenciesName,
        fxIntraday,
      ),
    );
  }, [
    dispatch,
    fromCurrenciesCode,
    fromCurrenciesName,
    toCurrenciesCode,
    toCurrenciesName,
    fxIntraday,
  ]);
  useEffect(() => {
    getExchangeDaily();
  }, []);

  return (
    <ForeignExchangeDetail
      selectExchangeListResult={selectExchangeListResult}
      fromCurrenciesCode={fromCurrenciesCode}
      fromCurrenciesName={fromCurrenciesName}
      toCurrenciesCode={toCurrenciesCode}
      toCurrenciesName={toCurrenciesName}
      lightMode={lightMode}
    />
  );
}
