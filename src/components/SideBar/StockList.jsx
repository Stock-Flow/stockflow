import React, { useEffect } from 'react';
import * as V from 'victory';
import { createChart } from 'lightweight-charts';
import { useDispatch } from 'react-redux';
import { getSelectedStockSagaActionCreator } from '../../redux/modules/selectedStock'



export default function StockList({ stockList, getsidebarStock, loading, search, menu }) {
  const dispatch = useDispatch();
  useEffect(() => {
    getsidebarStock(search)
  }, [getsidebarStock, search])


  const sendSymbol = (e) => {
    e.stopPropagation();
    const selectedStock = e.target.querySelector('span').textContent
    dispatch(getSelectedStockSagaActionCreator(selectedStock))
  }


  if (!loading) {
    return (
      <div className="stock-sidebar">
        <ul className={menu ? "" : "none"}>

          {stockList.map(stock => {
            let stocks = []
            const keys = Object.keys(stock.stockData).reverse()
            const values = Object.values(stock.stockData).map(item => +item["1. open"]).reverse()
            keys.forEach((item, i) => { stocks.push({ date: item, price: values[i] }) })
            let color = stock.change[0] === "-" ? "yellow" : "red"


            return <li onClick={sendSymbol}>
              <span>{stock.symbol}</span>
              {stock.change}
              {stock.name}
              <V.VictoryLine
                data={stocks}
                x="date"
                y="price"
                style={{
                  data: { stroke: color },
                  parent: {
                    width: 50,
                    height: "auto"
                  }

                }}
              />


            </li>
          }

            // <li><Plot
            //   data={[
            //     {
            //       x: Object.keys(stock.stockData),
            //       y: Object.values(stock.stockData).map(item => item["1. open"]),
            //       type: 'scatter',
            //       mode: 'lines',
            //     },
            //   ]}
            //   layout={{ width: 400, height: 250, showlegend: false, modebar: false, displaymodebar: false }}


            // />
            //   {stock.change}
            //   {stock.symbol}
            // </li>)
          )
          }
        </ul>
      </div>
    )
  }


  return <h1>hi</h1>

}