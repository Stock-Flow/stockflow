import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

import './MainDjia.scss';

export default function DjiaGraph({ djiaList, djiaDate }) {
  const chart = useRef();
  const lineSeries = useRef();
  const chartposition = useRef();
  useEffect(() => {
    chart.current = createChart(chartposition.current, {
      width: 700,
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
  return <div ref={chartposition}></div>;
}
