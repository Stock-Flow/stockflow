import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';
import { useSelector } from 'react-redux';
import DataProcessingService from '../../services/DataProcessingService';
import './MainDjia.scss';

export default function DjiaGraph({ djiaList, djiaDate }) {
  const chart = useRef();
  const chartposition = useRef();
  useEffect(() => {
    chart.current = createChart(chartposition.current, {
      width: 800,
      height: 400,
    });
    chart.current.applyOptions({
      priceScale: {
        position: 'left',
        autoScale: true,
      },
      timeScale: {
        fixLeftEdge: true,
        barSpacing: 10,
      },
    });
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
    const lineSeries = chart.current.addCandlestickSeries({ title: 'DOW J' });
    lineSeries.setData(stockList);
  }
  return <div ref={chartposition}></div>;
}
