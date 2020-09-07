<<<<<<< HEAD
import React, { useEffect } from 'react';
import * as V from 'victory';
import { createChart } from 'lightweight-charts';
import { useDispatch } from 'react-redux';
import { getSelectedStockSagaActionCreator } from '../../redux/modules/selectedStock';
=======
import React, { useEffect } from "react";
import * as V from "victory";
import { createChart } from "lightweight-charts";
import { useDispatch } from "react-redux";
import { getSelectedStockSagaActionCreator } from "../../redux/modules/selectedStock";
import { getSelectedSymbolActionCreator } from "../../redux/modules/selectedSymbol";
>>>>>>> f3d68145ebf9e60c19bea172e53e11b066f7e18b

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
<<<<<<< HEAD

  const sendSymbol = (e) => {
    e.stopPropagation();
    const selectedStock = e.target.querySelector('span').textContent;
    dispatch(getSelectedStockSagaActionCreator(selectedStock));
=======

  // function selectedSymbol(selectedStock) {
  //   let selectedArr = [];
  //   let b = selectedStock
  //   function a () {
  //     selectedArr = [...selectedArr, ...[b]];
  //     localStorage.setItem("selectedStock", JSON.stringify(selectedArr));
  //   }
  //   return a;
  // }

  // const selectedSymbol = (function () {
  //   let selectedArr = [];
  //   return {
  //     a(selectedStock) {
  //       selectedArr = [...selectedArr, ...[selectedStock]];
  //       localStorage.setItem("selectedStock", JSON.stringify(selectedArr));
  //     },
  //   };
  // })();

  const sendSymbol = (e) => {
    e.stopPropagation();
    const selectedStock = e.target.querySelector("span").textContent;
    // selectedSymbol.a(selectedStock);
    dispatch(getSelectedStockSagaActionCreator(selectedStock));
    dispatch(getSelectedSymbolActionCreator(selectedStock));
>>>>>>> f3d68145ebf9e60c19bea172e53e11b066f7e18b
  };

  if (!loading) {
    return (
      <div className="stock-sidebar">
<<<<<<< HEAD
        <ul className={menu ? '' : 'none'}>
          {stockList.map(
            (stock) => {
              let stocks = [];
              const keys = Object.keys(stock.stockData).reverse();
              const values = Object.values(stock.stockData)
                .map((item) => +item['1. open'])
                .reverse();
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
>>>>>>> f3d68145ebf9e60c19bea172e53e11b066f7e18b

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
>>>>>>> f3d68145ebf9e60c19bea172e53e11b066f7e18b
                      },
                    }}
                  />
                </li>
              );
<<<<<<< HEAD
            },
=======
            }
>>>>>>> f3d68145ebf9e60c19bea172e53e11b066f7e18b

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
