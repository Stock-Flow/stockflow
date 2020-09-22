import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

import './MainDjia.scss';
import { useState } from 'react';
import ForeignExchangeContainer from '../../containers/MainDjia/ForeignExchangeContainer';
import ForeignExchangeDetailContainer from '../../containers/MainDjia/ForeignExchangeDetailContainer';
import { useCallback } from 'react';

export default function DjiaGraph({
  djiaList,
  djiaDate,
  loading,
  done,
  lightMode,
}) {
  const chart = useRef();
  const lineSeries = useRef();
  const chartposition = useRef();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  window.addEventListener(
    'resize',
    useCallback(() => {
      setWindowWidth(window.innerWidth);
      if (chart.current) {
        if (windowWidth >= 1200) {
          chart.current.resize(windowWidth * 0.72 - 100, 400);
        }
        if (windowWidth < 1200) {
          chart.current.resize(windowWidth * 0.72, 300);
        }
      }
    }, [windowWidth]),
  );
  useEffect(() => {
    if (windowWidth > 1200) {
      chart.current = createChart(chartposition.current, {
        width: windowWidth * 0.72 - 100,
        height: 400,
      });
    }
    if (windowWidth < 1200) {
      chart.current = createChart(chartposition.current, {
        width: windowWidth * 0.72,
        height: 300,
      });
    }
    lineSeries.current = chart.current.addCandlestickSeries({ title: 'DOW J' });
  }, []);

  useEffect(() => {
    chart.current.applyOptions({
      priceScale: {
        position: 'right',
        borderVisible: false,
      },
      timeScale: {
        fixLeftEdge: true,
        borderVisible: false,
      },
      layout: {
        backgroundColor: `${lightMode ? '#eee' : '#2d303e'}`,
        textColor: `${lightMode ? '#181818' : '#eee'}`
      },
      grid: {
        vertLines: {
          // color: 'rgba(33, 150, 243, 0.7)',
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

  }, [lightMode])

  let stockList = [];
  if (djiaList.length !== 0) {
    stockList = djiaDate.map((item, i) => {
      return {
        time: item,
        open: djiaList[0][i],
        high: djiaList[1][i],
        low: djiaList[2][i],
        close: djiaList[3][i],
      };
    });
  }

  if (chart.current) {
    lineSeries.current.setData(stockList);
    chart.current.timeScale().setVisibleLogicalRange({
      from: stockList.length - 60,
      to: stockList.length,
    });
  }
  return (
    <div className="djia">
      <h2>DOW J</h2>
      <div ref={chartposition}></div>
      {loading ? (
        <>
          <progress max="30" value={done} className="djia-progress"></progress>{' '}
          <div className="progress-percent">
            Loading... {(done * (100 / 30)).toFixed(0)}%
          </div>
        </>
      ) : (
          <div className="foreign-exchange-wrap">
            <ForeignExchangeContainer />
            <ForeignExchangeDetailContainer />
          </div>
        )}
    </div>
  );
}
