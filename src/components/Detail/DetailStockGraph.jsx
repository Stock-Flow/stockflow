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
  intraBtnClick,
  dailyBtnClick,
  weeklyBtnClick,
  monthlyBtnClick,
  stock,
  func,
}) {
  const detailChart = useRef();
  const detailChartposition = useRef();
  useEffect(() => {
    if (detailChartposition.current) {
      detailChart.current = createChart(detailChartposition.current, {
        width: 600,
        height: 500,
      });
      detailChart.current.applyOptions({
        priceScale: {
          position: 'left',
          autoScale: true,
        },
        timeScale: {
          fixLeftEdge: true,
          barSpacing: 10,
        },
      });
      if (detailChart.current) {
        const lineSeries = detailChart.current.addCandlestickSeries({
          title: 'stock',
        });
        lineSeries.setData(stock);
      }
    }
  }, [stock]);
  // stock
  // 0: {time: "2020-04-13", open: 121.63, high: 121.8, low: 118.04, close: 121.15}

  return (
    <>
      <h1>Detail Stock</h1>
      {!loading && (
        <>
          <h2>{symbol}</h2>
          <button onClick={() => dailyBtnClick()}>1일</button>
          <button onClick={() => weeklyBtnClick()}>1주</button>
          <button onClick={() => monthlyBtnClick()}>1달</button>

          <div ref={detailChartposition}></div>
        </>
      )}
    </>
  );

  // return <h1>Detail Stock</h1>;
}
