<<<<<<< HEAD
import React, { useEffect, useRef } from 'react';
// import Plot from "react-plotly.js";
import './MainDjia.scss';
import { createChart } from 'lightweight-charts';
// import { useSelector } from "react-redux";
=======

import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';
import { useSelector } from 'react-redux';
import DataProcessingService from '../../services/DataProcessingService';
import "./MainDjia.scss";



>>>>>>> 70ad982a426ba8e787838054bd974ac910eeef7a

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
<<<<<<< HEAD
=======

>>>>>>> 70ad982a426ba8e787838054bd974ac910eeef7a

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
<<<<<<< HEAD
    const lineSeries = chart.current.addCandlestickSeries({ title: 'DOW J' });
=======
    const lineSeries = chart.current.addCandlestickSeries({ title: "DOW J" });
>>>>>>> 70ad982a426ba8e787838054bd974ac910eeef7a
    lineSeries.setData(stockList);
  }
  return <div ref={chartposition}></div>;
}
