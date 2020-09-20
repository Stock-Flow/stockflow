import React from 'react';
import { useEffect } from 'react';
import ForeignExchangeItem from './ForeignExchangeItem';
import './ForeignExchange.scss';

export default function ForeignExchange({
  getExchange,
  exchangeArr,
  loading,
  fromCurrenciesCode,
  fromCurrenciesName,
  toCurrenciesCode,
  toCurrenciesName,
  exchangeRate,
  fxIntradayArr,
  fxIntraday,
}) {
  useEffect(() => {
    getExchange(exchangeArr);
  }, []);

  let itemList = [];

  itemList = exchangeArr.map((item, i) => (
    <ForeignExchangeItem
      loading={loading}
      item={item}
      fromCurrenciesCode={fromCurrenciesCode[i]}
      fromCurrenciesName={fromCurrenciesName[i]}
      toCurrenciesCode={toCurrenciesCode[i]}
      toCurrenciesName={toCurrenciesName[i]}
      exchangeRate={exchangeRate[i]}
      fxIntradayArr={fxIntradayArr[i]}
      fxIntraday={fxIntraday[i]}
      firstFromCurrenciesCode={fromCurrenciesCode[0]}
      firstFromCurrenciesName={fromCurrenciesName[0]}
      firstToCurrenciesCode={toCurrenciesCode[0]}
      firstToCurrenciesName={toCurrenciesName[0]}
      firstFxIntraday={fxIntraday[0]}
    />
  ));

  return (
    <>
      {!loading && (
        <div className="foreign-exchange-list-wrap">
          <h2>Foriegn Exchange</h2>
          <div className="exchange-item-wrap">{itemList}</div>
        </div>
      )}
    </>
  );
}
