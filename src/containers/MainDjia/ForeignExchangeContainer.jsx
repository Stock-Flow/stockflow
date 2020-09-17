import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ForeignExchange from '../../components/MainDjia/ForeignExchange';
import { getExchangeSagaActionCreator } from '../../redux/modules/exchange';

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

  fxIntraday = fxIntraday.forEach((v, i) => {
    // console.log(Object.keys(v)[1]);
    const beforefx = Object.keys(v)[1];
    const afterfx = Object.keys(v)[0];
    beforefxClose = Number(v[beforefx]['4. close']);
    afterfxClose = Number(v[afterfx]['4. close']);

    return fxIntradayArr.push({
      beforefxClose,
      afterfxClose,
    });
  });

  return (
    <>
      <ForeignExchange
        getExchange={getExchange}
        loading={loading}
        exchangeArr={exchangeArr}
        fromCurrenciesCode={fromCurrenciesCode}
        fromCurrenciesName={fromCurrenciesName}
        toCurrenciesCode={toCurrenciesCode}
        toCurrenciesName={toCurrenciesName}
        exchangeRate={exchangeRate}
        fxIntradayArr={fxIntradayArr}
      />
    </>
  );
}
