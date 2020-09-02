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
  const chart = useRef();
  const chartposition = useRef();
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
          title: 'DOW J',
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
          <ul>
            {/* <li>
              <Plot
                data={[
                  {
                    x: Object.keys(stockData),
                    y: Object.values(stockData).map(
                      (item) => item["1. open"]
                    ),
                    type: "scatter",
                    mode: "lines",
                  },
                ]}
                layout={{ width: 800, height: 350 }}
              />
            </li> */}
            {/* title: symbol */}
          </ul>

          <div ref={chartposition}></div>

          {/* <div
            ref={(el) => {
              chart.current = createChart(el, {
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
                  title: 'stock',
                });
                lineSeries.setData(stock);
              }
            }}
          ></div> */}
        </>
      )}
    </>
  );

  // return <h1>Detail Stock</h1>;
}
