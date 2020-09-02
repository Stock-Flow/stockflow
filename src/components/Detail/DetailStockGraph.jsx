import React from "react";
import Plot from "react-plotly.js";
import { useEffect } from "react";
// loading
export default function DetailStockGraph({ getDetailStock, loading, symbol, dailyBtnClick, weeklyBtnClick, monthlyBtnClick, stockData }) {

  useEffect(() => {
    getDetailStock("TIME_SERIES_DAILY", "IBM");
  }, []);
  
  
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
            </li>
            {/* title: symbol */}
          </ul>
        </>
      )}
    </>
  );

  // return <h1>Detail Stock</h1>;
}

