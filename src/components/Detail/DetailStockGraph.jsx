import React from "react";
import Plot from "react-plotly.js";

export default function DetailStockGraph({ stockList, loading }) {
  if (!loading) {
    return (
      <>
        <h1>Detail Stock</h1>
        <ul>
          {stockList.map((stock) => (
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
                layout={{ width: 400, height: 250, title: stock.symbol }}
              />
            </li>
          ))}
        </ul>
      </>
    );
  }

  return <h1>Detail Stock</h1>;
}
