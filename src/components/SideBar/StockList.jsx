import React, { useEffect } from "react";
import * as V from "victory";
import { createChart } from "lightweight-charts";
import { useDispatch } from "react-redux";
import { getSelectedStockSagaActionCreator } from "../../redux/modules/selectedStock";
import { getSelectedSymbolActionCreator } from "../../redux/modules/selectedSymbol";

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
    let selectedStock = e.target.querySelector('span')
    dispatch(getSelectedStockSagaActionCreator(selectedStock))
    dispatch(getSelectedSymbolActionCreator(selectedStock, 'symbl'));
    selectedStock = ''
  }

  if (!loading) {
    return (
      <div className="stock-sidebar">
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
                        height: "auto",
                      },
                    }}
                  />
                </li>
              );
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
          )}
        </ul>
      </div>
    );
  }

  return <h1>hi</h1>;
}
