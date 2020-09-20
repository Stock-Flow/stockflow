import React from 'react';
import { useEffect } from 'react';
import ForeignExchangeItem from './ForeignExchangeItem';
import './ForeignExchange.scss';
import { LoadingOutlined } from '@ant-design/icons';

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
      <div className="foreign-exchange-list-wrap">
        {!loading && (
          <>
            <h2>Foriegn Exchange</h2>
            <div className="exchange-item-wrap">{itemList}</div>
          </>
        )}
      </div>
      {loading && (
        <div className="exchange-item-wrap-loading">
          <div className="exchange-loading">
            <LoadingOutlined />
          </div>
        </div>
      )}
    </>
  );
}
