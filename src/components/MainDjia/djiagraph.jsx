<<<<<<< HEAD
import React, { useEffect, useRef } from 'react';
import Plot from 'react-plotly.js';
import { createChart } from 'lightweight-charts';
import { useSelector } from 'react-redux';
import DataProcessingService from '../../services/DataProcessingService';
=======
import React, { useEffect, useRef } from "react";
// import Plot from "react-plotly.js";
import "./MainDjia.scss";
import { createChart } from "lightweight-charts";
// import { useSelector } from "react-redux";
>>>>>>> f3d68145ebf9e60c19bea172e53e11b066f7e18b

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
        position: "left",
        autoScale: true,
      },
      timeScale: {
        fixLeftEdge: true,
        barSpacing: 10,
      },
    });
  }, []);
<<<<<<< HEAD
  let stockList = [];
  if (djiaList.length !== 0) {
    stockList = djiaDate.reverse().map((item, i) => {
=======

  let stockList = [];
  if (djiaList.length !== 0) {
    stockList = djiaDate.map((item, i) => {
>>>>>>> f3d68145ebf9e60c19bea172e53e11b066f7e18b
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
>>>>>>> f3d68145ebf9e60c19bea172e53e11b066f7e18b
    lineSeries.setData(stockList);
  }
  return <div ref={chartposition}></div>;
}
