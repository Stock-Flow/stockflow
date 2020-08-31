import React from "react";
import Plot from "react-plotly.js";
// loading
export default function DetailStockGraph({ showStock }) {
  // console.log(stockList);

  return (
    <>
      <h1>Detail Stock</h1>
      {showStock && (
        <>
          <h2>{showStock.symbol}</h2>
          <ul>
            <li>
              <Plot
                data={[
                  {
                    x: Object.keys(showStock.stockData),
                    y: Object.values(showStock.stockData).map(
                      (item) => item["1. open"]
                    ),
                    type: "scatter",
                    mode: "lines",
                  },
                ]}
                layout={{ width: 800, height: 350, title: showStock.symbol }}
              />
            </li>
          </ul>
        </>
      )}
    </>
  );

  // return <h1>Detail Stock</h1>;
}
