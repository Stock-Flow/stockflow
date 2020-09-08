import React from 'react';
import { useEffect } from 'react';
import ForeignExchangeItem from './ForeignExchangeItem';
import './ForeignExchange.scss';

export default function ForeignExchange({
  getExchange,
  exchangeArr,
  getExchangeDaily,
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
    // getExchangeDaily(exchangeArr);
  }, []);
  if (fromCurrenciesName) {
    // console.log(exchangeArr);
    const itemList = exchangeArr.map((item, i) => (
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
      // <div>{item}</div>
    ));

    return <div className="foreign-exchange-wrap">{itemList}</div>;
  }
  return <div>로딩중</div>;
}
