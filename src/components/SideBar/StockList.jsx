import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Plot from 'react-plotly.js';
import { Scatter } from 'recharts';
import { line } from 'd3-shape';




export default function StockList({ stockList, loading }) {

  if (!loading) {

    return (

      <ul>
        {stockList.map(stock => (
          <li><Plot
            data={[
              {
                x: Object.keys(stock.stockData),
                y: Object.values(stock.stockData).map(item => item["1. open"]),
                type: 'scatter',
                mode: 'lines',
              },
            ]}
            layout={{ width: 400, height: 250, title: stock.symbol }}
          /></li>)
        )
        }
      </ul>
    )
  }


  return <h1>hi</h1>

}