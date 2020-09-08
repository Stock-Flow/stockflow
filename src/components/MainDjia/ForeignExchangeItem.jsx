import React from 'react';
// import ForeignExchange from './ForeignExchange';

export default function ForeignExchangeItem({
  loading,
  fromCurrenciesCode,
  fromCurrenciesName,
  toCurrenciesCode,
  toCurrenciesName,
  exchangeRate,
  fxIntradayArr,
}) {
  let resultPercent = 0;
  let before = 0;
  let after = 0;
  if (fxIntradayArr) {
    before = fxIntradayArr['beforefxClose'];
    after = fxIntradayArr['afterfxClose'];
    before = 1187.3;
    after = 1187.6;
    if (before === after) resultPercent = 0;

    if (before < after) {
      resultPercent = ((after - before) / before) * 100;
    }
    if (before > after) {
      resultPercent = ((before - after) / before) * 100;
    }
  }
  resultPercent = resultPercent.toFixed(2);
  let fxDiff = (after - before).toFixed(2);

  console.log(resultPercent);
  const fromCountryIcon = `../images/${fromCurrenciesCode}.svg`;
  const toCountryIcon = `../images/${toCurrenciesCode}.svg`;
  return (
    <>
      {fromCurrenciesName && (
        <div className="exchange-item">
          <div className="exchange-column icon">
            <span className="country-icon from">
              <img src={fromCountryIcon} alt={fromCurrenciesName} />
            </span>
            <span className="country-icon to">
              <img src={toCountryIcon} alt={toCurrenciesName} />
            </span>
          </div>
          <div className="exchange-column name">
            <strong className="currency-code">
              {fromCurrenciesCode}
              {toCurrenciesCode}
            </strong>
            <p className="currency-name">
              {fromCurrenciesName} / {toCurrenciesName}
            </p>
          </div>
          <div className="exchange-column rate">
            <p className="exchange-rate">{exchangeRate}</p>
          </div>
          <div className="exchange-column percent">
            {/* <p className="exchange-percent">{resultPercent}%</p> */}
            <p className="exchange-percent">
              {before < after && (
                <>
                  <span className="plus">+{resultPercent}%</span>
                  <span className="plus">+{fxDiff}</span>
                </>
              )}
              {before > after && (
                <>
                  <span className="minus">-{resultPercent}%</span>
                  <span className="minus">{fxDiff}</span>
                </>
              )}
              {before === after && (
                <>
                  <span className="zero">{resultPercent}%</span>
                  <span className="zero">0</span>
                </>
              )}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
