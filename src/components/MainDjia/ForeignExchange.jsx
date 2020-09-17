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
    />
  ));

  return (
    <>{!loading && <div className="foreign-exchange-wrap">{itemList}</div>}</>
  );
}
