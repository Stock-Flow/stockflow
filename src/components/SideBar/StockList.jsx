import React, { useEffect, useRef } from "react";
import * as V from "victory";
import { createChart } from "lightweight-charts";

export default function StockList({
  stockList,
  getsidebarStock,
  loading,
  search,
  menu,
}) {
  useEffect(() => {
    getsidebarStock(search);
  }, [getsidebarStock, search]);

  // if (stockList.length !== 0) {
  //   const a = Object.values(stockList[0]);
  //   console.log(a[0]);
  // }
  const selectedItem = useRef();

  const clickList = () => {
    // console.log(selectedItem.current.firstChild);

    if (stockList.length !== 0) {
      const selectedSymbol = selectedItem.current.firstChild;
      let b = [];
      stockList.map((stock, i) => {
        // return Object.values(stock[i]) === selectedSymbol
        //   ? selectedSymbol
        //   : clickList();
        console.log(stock, i);
        const a = Object.values(stock);
        b[i] += "" + a[0];
        // console.log(b);
        // const c = b[i] === selectedSymbol ? selectedSymbol : "";
      });
    }
  };

  if (!loading) {
    return (
      <div className="stock-sidebar">
        <ul className={menu ? "" : "none"}>
          {stockList.map(
            (stock) => {
              let stocks = [];
              const keys = Object.keys(stock.stockData).reverse();
              const values = Object.values(stock.stockData)
                .map((item) => +item["1. open"])
                .reverse();
              keys.forEach((item, i) => {
                stocks.push({ date: item, price: values[i] });
              });
              let color = stock.change[0] === "-" ? "yellow" : "red";

              return (
                <li onClick={clickList}>
                  <span ref={selectedItem}>
                    {stock.symbol}
                    {stock.change}
                    {stock.name}
                  </span>
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
