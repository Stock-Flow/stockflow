<<<<<<< HEAD
import React, { useEffect } from 'react';
import * as V from 'victory';
import { createChart } from 'lightweight-charts';
import { useDispatch } from 'react-redux';
import { getSelectedStockSagaActionCreator } from '../../redux/modules/selectedStock';
import { getSelectedSymbolActionCreator } from '../../redux/modules/selectedSymbol';
=======

import React, { useEffect } from "react";
import * as V from "victory";
import { createChart } from "lightweight-charts";
import { useDispatch } from "react-redux";
import { getSelectedStockSagaActionCreator } from "../../redux/modules/selectedStock";
import { getSelectedSymbolActionCreator } from "../../redux/modules/selectedSymbol";
>>>>>>> 70ad982a426ba8e787838054bd974ac910eeef7a

export default function StockList({
  stockList,
  getsidebarStock,
  loading,
  search,
  menu,
}) {
  const dispatch = useDispatch();
  useEffect(() => {
    getsidebarStock(search);
  }, [getsidebarStock, search]);



  const sendSymbol = (e) => {
    e.stopPropagation();
<<<<<<< HEAD
    const selectedStock = e.target.querySelector('span').textContent;
    // selectedSymbol.a(selectedStock);
    dispatch(getSelectedStockSagaActionCreator(selectedStock));
    dispatch(getSelectedSymbolActionCreator(selectedStock));
=======
    const selectedStock = e.target.querySelector("span").textContent;

    // selectedSymbol.a(selectedStock);
    dispatch(getSelectedStockSagaActionCreator(selectedStock));
    dispatch(getSelectedSymbolActionCreator(selectedStock, "stock"));
>>>>>>> 70ad982a426ba8e787838054bd974ac910eeef7a
  };

  if (!loading) {
    return (
      <div className="stock-sidebar">
<<<<<<< HEAD
        <ul className={menu ? '' : 'none'}>
          {stockList.map(
            (stock) => {
              let stocks = [];
              const keys = stock.stockData.map((date) => date.time).reverse();
              const values = stock.stockData.map((item) => +item.open);
              keys.forEach((item, i) => {
                stocks.push({ date: item, price: values[i] });
              });
              let color = stock.change[0] === '-' ? 'yellow' : 'red';

=======

        <ul className={menu ? "" : "none"}>
          {stockList.map(
            (stock) => {
              let stocks = [];
              const keys = stock.stockData.map(date => date.time).reverse();
              const values = stock.stockData
                .map((item) => +item.open)
              keys.forEach((item, i) => {
                stocks.push({ date: item, price: values[i] });
              });
              let color = stock.change[0] === "-" ? "yellow" : "red";
>>>>>>> 70ad982a426ba8e787838054bd974ac910eeef7a
              return (
                <li onClick={sendSymbol}>
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
<<<<<<< HEAD
                        height: 'auto',
=======
                        height: "auto",
>>>>>>> 70ad982a426ba8e787838054bd974ac910eeef7a
                      },
                    }}
                  />
                </li>
              );
<<<<<<< HEAD
            },
=======

            }

>>>>>>> 70ad982a426ba8e787838054bd974ac910eeef7a

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
          )}
        </ul>
      </div>
    );
  }

  return <h1>hi</h1>;
}
