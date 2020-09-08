import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ForeignExchange from '../../components/MainDjia/ForeignExchange';
import { getExchangeSagaActionCreator } from '../../redux/modules/exchange';
import { useEffect } from 'react';

export default function ForeignExchangeContainer() {
  const loading = useSelector((state) => state.exchange.loading);
  const exchange = useSelector((state) => state.exchange);
  const exchangeArr = [
    ['USD', 'KRW'],
    ['JPY', 'KRW'],
    ['USD', 'JPY'],
    ['EUR', 'USD'],
    ['AUD', 'USD'],
  ];
  const dispatch = useDispatch();
  const getExchange = useCallback(() => {
    dispatch(getExchangeSagaActionCreator(exchangeArr));
  }, [dispatch, exchangeArr]);
  // const getExchangeDaily = useCallback(() => {
  //   dispatch(getExchangeSagaActionCreator(exchangeArr));
  // }, [dispatch, exchangeArr]);

  // console.log(exchange.exchange);
  const fromCurrenciesCode = exchange.exchange.map(
    (exchange, i) => exchange['1. From_Currency Code'],
  );
  const fromCurrenciesName = exchange.exchange.map(
    (exchange) => exchange['2. From_Currency Name'],
  );
  const toCurrenciesCode = exchange.exchange.map(
    (exchange) => exchange['3. To_Currency Code'],
  );
  const toCurrenciesName = exchange.exchange.map(
    (exchange) => exchange['4. To_Currency Name'],
  );
  const exchangeRate = exchange.exchange.map(
    (exchange) => exchange['5. Exchange Rate'],
  );
  let fxIntraday = exchange.exchange.map((exchange) => exchange['fxIntraday']);
  let fxIntradayArr = [];
  let beforefxClose = 0;
  let afterfxClose = 0;

  if (!fromCurrenciesName) {
    fxIntraday = fxIntraday.forEach((v, i) => {
      const beforefx = Object.keys(v)[1];
      const afterfx = Object.keys(v)[0];
      beforefxClose = Number(v[beforefx]['4. close']);
      afterfxClose = Number(v[afterfx]['4. close']);

      fxIntradayArr.push({
        beforefxClose,
        afterfxClose,
      });
    });
  }
  // console.log(fxIntradayArr);

  // 0: {2020-09-04 21:45:00: {…}, 2020-09-04 21:40:00: {…}, 2020-09-04 21:35:00: {…}, 2020-09-04 21:30:00: {…}, 2020-09-04 21:25:00: {…}, …}
  // 1: {2020-09-04 21:55:00: {…}, 2020-09-04 21:50:00: {…}, 2020-09-04 21:45:00: {…}, 2020-09-04 21:40:00: {…}, 2020-09-04 21:35:00: {…}, …}
  // 2: {2020-09-04 21:55:00: {…}, 2020-09-04 21:50:00: {…}, 2020-09-04 21:45:00: {…}, 2020-09-04 21:40:00: {…}, 2020-09-04 21:35:00: {…}, …}
  // 3: {2020-09-04 21:55:00: {…}, 2020-09-04 21:50:00: {…}, 2020-09-04 21:45:00: {…}, 2020-09-04 21:40:00: {…}, 2020-09-04 21:35:00: {…}, …}
  // 4: {2020-09-04 21:55:00: {…}, 2020-09-04 21:50:00: {…}, 2020-09-04 21:45:00: {…}, 2020-09-04 21:40:00: {…}, 2020-09-04 21:35:00: {…}, …
  // console.log(fromCurrenciesCode);
  // console.log(fromCurrencies); //  ["EUR", "USD", "JPY", "USD", "AUD"]

  // console.log(result);
  return (
    <div>
      <ForeignExchange
        getExchange={getExchange}
        // getExchangeDaily={getExchangeDaily}
        loading={loading}
        exchangeArr={exchangeArr}
        fromCurrenciesCode={fromCurrenciesCode}
        fromCurrenciesName={fromCurrenciesName}
        toCurrenciesCode={toCurrenciesCode}
        toCurrenciesName={toCurrenciesName}
        exchangeRate={exchangeRate}
        fxIntradayArr={fxIntradayArr}
      />
    </div>
  );
}
