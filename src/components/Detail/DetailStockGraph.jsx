import React from "react";
import Plot from "react-plotly.js";
import { useEffect } from "react";
import { dispatch } from "d3";
// loading
export default function DetailStockGraph({ getDetailStock, loading, symbol, stock, dailyBtnClick, weeklyBtnClick, monthlyBtnClick }) {

  useEffect(() => {
    console.log('hi');
    getDetailStock("TIME_SERIES_DAILY_ADJUSTED", symbol);
  }, [getDetailStock, symbol]);

  console.log(stock);
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
            <li>
              <Plot
                data={[
                  {
                    x: Object.keys(stock.stockData),
                    y: Object.values(stock.stockData).map(
                      (item) => item["1. open"]
                    ),
                    type: "scatter",
                    mode: "lines",
                  },
                ]}
                layout={{ width: 800, height: 350 }}
              />
            </li>
            {/* title: symbol */}
          </ul>
        </>
      )}
    </>
  );

  // return <h1>Detail Stock</h1>;
}

