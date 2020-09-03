import React, { useRef } from 'react';
import Plot from 'react-plotly.js';
import { useEffect } from 'react';
import { dispatch } from 'd3';
import { createChart } from 'lightweight-charts';

// loading
export default function DetailStockGraph({
  getDetailStock,
  loading,
  symbol,
  date,
  movingAverageFive,
  movingAverageTen,
  movingAverageTwenty,
  movingAverageSixty,
  stock,
  func,
}) {
  const chart = useRef();
  const chartposition = useRef();
  useEffect(() => {
    console.log(func, symbol, date);
    getDetailStock(func, symbol, date);
  }, [func, symbol, getDetailStock, date]);

  useEffect(() => {
    if (chartposition.current) {
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
      if (chart.current) {
        const lineSeries = chart.current.addCandlestickSeries({
          title: symbol,
        });
        lineSeries.setData(stock);
      }
    }
  }, [stock, symbol]);
  // stock
  // 0: {time: "2020-04-13", open: 121.63, high: 121.8, low: 118.04, close: 121.15}

  return (
    <>
      <h1>Detail Stock</h1>
      {!loading && (
        <>
          <h2>{symbol}</h2>
          <button
            onClick={() => {
              const data = movingAverageFive(stock);
              const lineSeries = chart.current.addLineSeries();
              lineSeries.setData(data);
            }}
          >
            5 Moving Average
          </button>
          <button
            onClick={() => {
              const data = movingAverageTen(stock);
              const lineSeries = chart.current.addLineSeries({
                color: 'pink',
              });
              lineSeries.setData(data);
            }}
          >
            10 Moving Average
          </button>
          <button
            onClick={() => {
              const data = movingAverageTwenty(stock);
              const lineSeries = chart.current.addLineSeries({
                color: 'brown',
              });
              lineSeries.setData(data);
            }}
          >
            20 Moving Average
          </button>
          <button
            onClick={() => {
              const data = movingAverageSixty(stock);
              const lineSeries = chart.current.addLineSeries({ color: 'red' });
              lineSeries.setData(data);
            }}
          >
            60 Moving Average
          </button>
          {/* <button onClick={() => dailyBtnClick()}>1일</button>
          <button onClick={() => weeklyBtnClick()}>1주</button>
          <button onClick={() => monthlyBtnClick()}>1달</button> */}

          <div ref={chartposition}></div>
        </>
      )}
    </>
  );

  // return <h1>Detail Stock</h1>;
}
