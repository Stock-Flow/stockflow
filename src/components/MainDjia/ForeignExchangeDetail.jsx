import React, { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';

export default function ForeignExchangeDetail({
  selectExchangeListResult,
  fromCurrenciesCode,
  fromCurrenciesName,
  toCurrenciesCode,
  toCurrenciesName,
}) {
  const chartExchange = useRef();
  const exchangeLineSeries = useRef();
  const excahngeChartposition = useRef();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  window.onresize = () => {
    setWindowWidth(window.innerWidth);
    if (chartExchange.current) {
      chartExchange.current.resize(windowWidth * 0.36 - 100, 260);
    }
  };
  useEffect(() => {
    chartExchange.current = createChart(excahngeChartposition.current, {
      width: windowWidth * 0.36 - 100,
      height: 260,
    });
    chartExchange.current.applyOptions({
      priceScale: {
        position: 'right',
        borderVisible: false,
      },
      timeScale: {
        rightOffset: 0,
        fixLeftEdge: true,
      },
      layout: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        textColor: '#eeeeee',
      },
    });
    exchangeLineSeries.current = chartExchange.current.addLineSeries({
      title: 'exchange',
      color: '#2196f3',
    });
  }, []);

  if (chartExchange.current) {
    exchangeLineSeries.current.setData(selectExchangeListResult);
    chartExchange.current.timeScale().setVisibleLogicalRange({
      from: selectExchangeListResult.length - 60,
      to: selectExchangeListResult.length,
    });
  }
  return (
    <div className="foreign-exchange-detail-wrap">
      <h2>
        {fromCurrenciesCode && (
          <>
            {fromCurrenciesCode}/{toCurrenciesCode} Chart
          </>
        )}
      </h2>
      <div ref={excahngeChartposition}></div>
    </div>
  );
}
