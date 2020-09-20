import React, { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';
import { useSelector } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';

export default function ForeignExchangeDetail({
  selectExchangeListResult,
  fromCurrenciesCode,
  fromCurrenciesName,
  toCurrenciesCode,
  toCurrenciesName,
}) {
  const exchangeLoading = useSelector((state) => state.exchange.loading);

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
    // if (!exchangeLoading) {
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
        backgroundColor: '#2d303e',
        textColor: '#eeeeee',
      },
    });
    exchangeLineSeries.current = chartExchange.current.addLineSeries({
      title: 'exchange',
      color: '#2196f3',
    });
    // }
  }, []);

  if (chartExchange.current) {
    exchangeLineSeries.current.setData(selectExchangeListResult);
    chartExchange.current.timeScale().setVisibleLogicalRange({
      from: selectExchangeListResult.length - 60,
      to: selectExchangeListResult.length,
    });
  }
  return (
    <>
      <div className="foreign-exchange-detail-wrap">
        {!exchangeLoading && (
          <h2>
            {fromCurrenciesCode}/{toCurrenciesCode} Chart
          </h2>
        )}
        <div ref={excahngeChartposition}></div>
        {exchangeLoading && (
          <div className="exchange-loading">
            <LoadingOutlined />
          </div>
        )}
      </div>
    </>
  );
}
