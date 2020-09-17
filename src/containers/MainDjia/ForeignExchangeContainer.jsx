import React, { useCallback, useEffect } from 'react';
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

  console.log(exchange);
  const fxIntraday = exchange.exchange.map(
    (exchange) => exchange['fxIntraday'],
  );
  let fxIntradayArr = [];
  let beforefxClose = 0;
  let afterfxClose = 0;

  const fxIntradayClose = fxIntraday.forEach((v, i) => {
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

  // ["1173.16000000", "11.17800000", "104.70500000", "1.17908000", "0.72938000"]
  // ["1173.08000000", "11.17800000", "104.70000000", "1.17931000", "0.72958000"]

  // 5분마다 intraday데이터 제공
  // 만약 환율(exchangeRate)이 바뀌면 다시호출하고싶음
  // deps 안에 exchangeRate를 넣으면 무한루프 도는느낌
  useEffect(() => {
    getExchange(exchangeArr);
  }, []);

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
        fxIntraday={fxIntraday}
      />
    </>
  );
}
