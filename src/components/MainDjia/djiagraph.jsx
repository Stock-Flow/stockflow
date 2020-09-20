import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

import './MainDjia.scss';
import { useState } from 'react';
import ForeignExchangeContainer from '../../containers/MainDjia/ForeignExchangeContainer';
import ForeignExchangeDetailContainer from '../../containers/MainDjia/ForeignExchangeDetailContainer';
import { useCallback } from 'react';

export default function DjiaGraph({ djiaList, djiaDate, loading, done }) {
  const chart = useRef();
  const lineSeries = useRef();
  const chartposition = useRef();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  window.onresize = useCallback(() => {
    setWindowWidth(window.innerWidth);
    console.log('hi');
    if (chart.current) {
      chart.current.resize(windowWidth * 0.72 - 100, 400);
    }
  }, [windowWidth]);
  useEffect(() => {
    chart.current = createChart(chartposition.current, {
      width: windowWidth * 0.72 - 100,
      height: 400,
    });
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
        backgroundColor: '#2d303e',
        textColor: '#eeeeee',
      },
    });

    lineSeries.current = chart.current.addCandlestickSeries({ title: 'DOW J' });
  }, []);

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
      {loading ? <>
        <h1 className="progress-percent">{(done * (100 / 30)).toFixed(0)}%</h1>
        <progress max="30" value={done} className="djia-progress">
        </progress> </> : <div className="foreign-exchange-wrap">
          <ForeignExchangeContainer />
          <ForeignExchangeDetailContainer />
        </div>}

    </div>
  );
}
