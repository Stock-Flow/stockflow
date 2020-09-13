import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as V from 'victory';
import { getSelectedSymbolActionCreator } from '../../redux/modules/selectedSymbol';
import { getSelectedStockSagaActionCreator } from '../../redux/modules/selectedStock';

export default function FavoriteList({
  favoriteStockList,
  favoriteCurrencyList,
  currencyList,
  stockList,
  menu,
}) {
  return <div>A</div>;
  // console.log(favoriteStockList);
  // console.log(favoriteCurrencyList);

  // console.log(currencyList);

  // const dispatch = useDispatch();

  // const sendCurrencySymbol = (selectedStock) => {
  //   dispatch(getSelectedStockSagaActionCreator(selectedStock, 'currency'));
  //   dispatch(getSelectedSymbolActionCreator(selectedStock, 'currency'));
  // };

  // const sendStockSymbol = (selectedStock) => {
  //   dispatch(getSelectedStockSagaActionCreator(selectedStock, 'stock'));
  //   dispatch(getSelectedSymbolActionCreator(selectedStock, 'stock'));
  // };

  // currencyList = favoriteCurrencyList.filter((favoriteCurrencyList) => {
  //   return (
  //     favoriteCurrencyList.symbol ===
  //     currencyList['Meta Data']['2. Digital Currency Code']
  //   );
  // });

  // stockList = favoriteStockList.filter((favoriteStockList) => {
  //   return favoriteStockList.symbol === stockList.symbol;
  // });

  // if (currencyList) {
  //   return (
  //     <div className="sidebar currency">
  //       <ul className={menu ? 'none' : ''}>
  //         {currencyList.map((currency) => {
  //           let currencys = [];
  //           const keys = Object.keys(
  //             currency['Time Series (Digital Currency Daily)'],
  //           ).reverse();
  //           const values = Object.values(
  //             currency['Time Series (Digital Currency Daily)'],
  //           )
  //             .map((item) => item['1a. open (USD)'])
  //             .reverse();
  //           keys.forEach((item, i) => {
  //             currencys.push({ date: item, price: values[i] });
  //           });
  //           // let color = currency.change[0] === "-" ? "green" : "red"

  //           function transSymbol(e) {
  //             e.stopPropagation();
  //             sendCurrencySymbol(
  //               currency['Meta Data']['2. Digital Currency Code'],
  //             );
  //           }

  //           return (
  //             <li onClick={transSymbol} className="clear-fix">
  //               {/* {currency.change} */}
  //               <div className="sidebar-left">
  //                 <span className="sidebar-symbol">
  //                   {currency['Meta Data']['2. Digital Currency Code']}
  //                 </span>
  //                 <br />
  //                 <span className="sidebar-name">
  //                   {currency['Meta Data']['3. Digital Currency Name']}
  //                 </span>
  //               </div>
  //               <div className="sidebar-right">
  //                 <V.VictoryLine
  //                   data={currencys}
  //                   x="date"
  //                   y="price"
  //                   style={{
  //                     data: { stroke: 'yellow' },
  //                     parent: {
  //                       width: 50,
  //                       height: 'auto',
  //                     },
  //                   }}
  //                 />
  //               </div>
  //             </li>
  //           );
  //         })}
  //       </ul>
  //     </div>
  //   );
  // }

  // if (stockList) {
  //   return (
  //     <div className="sidebar stock">
  //       <ul className={menu ? '' : 'none'}>
  //         {stockList.map((stock) => {
  //           let stocks = [];
  //           const keys = stock.stockData.map((date) => date.time).reverse();
  //           const values = stock.stockData.map((item) => +item.open);
  //           keys.forEach((item, i) => {
  //             stocks.push({ date: item, price: values[i] });
  //           });
  //           let color = stock.change[0] === '-' ? 'yellow' : 'red';

  //           function transSymbol(e) {
  //             e.stopPropagation();
  //             sendStockSymbol(stock.symbol);
  //           }

  //           return (
  //             <li onClick={transSymbol} className="clear-fix">
  //               <div className="sidebar-left">
  //                 <span className="sidebar-symbol">{stock.symbol}</span>
  //                 <br />
  //                 <span className="sidebar-name">{stock.name}</span>
  //                 <br />
  //               </div>
  //               <div className="sidebar-right">
  //                 <V.VictoryLine
  //                   data={stocks}
  //                   x="date"
  //                   y="price"
  //                   style={{
  //                     data: { stroke: color },
  //                     parent: {
  //                       width: 50,
  //                       height: 'auto',
  //                     },
  //                   }}
  //                 />

  //                 <span className="sidebar-change">{stock.change}</span>
  //               </div>
  //             </li>
  //           );
  //         })}
  //       </ul>
  //     </div>
  //   );
  // }
}
