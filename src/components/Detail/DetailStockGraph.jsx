import React from "react";
import Plot from "react-plotly.js";
import { useEffect } from "react";
// loading
export default function DetailStockGraph({ getDetailStock, loading, stock }) {
  // console.log(getDetailStock);
  useEffect(() => {
    getDetailStock("TIME_SERIES_INTRADAY", "IBM");
  }, []);
  return (
    <>
      <h1>Detail Stock</h1>
      {loading && (
        <>
          <h2>{stock.symbol}</h2>
          <button>1일</button>
          <button>1주</button>
          <button>1달</button>
          <ul>
            <li>
              {/* <Plot
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
                layout={{ width: 800, height: 350, title: stock.symbol }}
              /> */}
            </li>
          </ul>
        </>
      )}
    </>
  );

  // return <h1>Detail Stock</h1>;
}
