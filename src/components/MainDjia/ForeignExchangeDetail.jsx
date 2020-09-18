import React, { useEffect, useRef } from 'react';
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
  useEffect(() => {
    chartExchange.current = createChart(excahngeChartposition.current, {
      width: 800,
      height: 400,
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
        backgroundColor: '#1e1e1e',
        textColor: '#eeeeee',
      },
    });
    exchangeLineSeries.current = chartExchange.current.addCandlestickSeries({
      title: 'exchange',
    });
  }, []);

  if (chartExchange.current) {
    exchangeLineSeries.current.setData(selectExchangeListResult);
    console.log(selectExchangeListResult)
    chartExchange.current.timeScale().setVisibleLogicalRange({
      from: selectExchangeListResult.length - 60,
      to: selectExchangeListResult.length,
    });
  }
  return (
    <div>
      <h2>
        {fromCurrenciesCode} {toCurrenciesCode}
      </h2>
      <div ref={excahngeChartposition}></div>
    </div>
  );
}
