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
  lightMode,
}) {
  const exchangeLoading = useSelector((state) => state.exchange.loading);

  const chartExchange = useRef();
  const exchangeLineSeries = useRef();
  const excahngeChartposition = useRef();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  window.onresize = () => {
    setWindowWidth(window.innerWidth);
    if (chartExchange.current) {
      if (windowWidth >= 1200) {
        chartExchange.current.resize(windowWidth * 0.36 - 100, 260);
      }
      if (windowWidth < 1200) {
        chartExchange.current.resize(windowWidth * 0.72, 260);
      }
    }
  };

  useEffect(() => {
    // if (!exchangeLoading) {

    if (windowWidth >= 1200) {
      chartExchange.current = createChart(excahngeChartposition.current, {
        width: windowWidth * 0.36 - 100,
        height: 260,
      });
    }

    if (windowWidth < 1200) {
      chartExchange.current = createChart(excahngeChartposition.current, {
        width: windowWidth * 0.72,
        height: 260,
      });
    }

    exchangeLineSeries.current = chartExchange.current.addLineSeries({
      title: 'exchange',
      color: '#2196f3',
    });
    // }
  }, []);

  useEffect(() => {
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
        backgroundColor: `${lightMode ? '#eee' : '#2d303e'}`,
        textColor: `${lightMode ? '#181818' : '#eee'}`,
      },
      grid: {
        vertLines: {
          color: 'rgba(114, 122, 160, 0.5)',
          style: 1,
          visible: true,
        },
        horzLines: {
          color: 'rgba(114, 122, 160, 0.5)',
          style: 1,
          visible: true,
        },
      },
    });
  }, [lightMode]);

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
        {exchangeLoading && !chartExchange.current && (
          <div className="exchange-loading">
            <LoadingOutlined />
          </div>
        )}
      </div>
    </>
  );
}
