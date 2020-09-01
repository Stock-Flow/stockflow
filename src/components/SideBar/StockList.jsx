import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Plot from 'react-plotly.js';




export default function StockList({ stockList, getsidebarStock, loading, search, menu }) {
  useEffect(() => {
    getsidebarStock(search)
  }, [getsidebarStock, search])




  if (!loading) {
    return (
      <ul className={menu ? "" : "none"}>
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
          />
            {stock.change}
          </li>)
        )
        }
      </ul>
    )
  }


  return <h1>hi</h1>

}