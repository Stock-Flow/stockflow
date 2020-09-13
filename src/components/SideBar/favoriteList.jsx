import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getSelectedSymbolActionCreator } from '../../redux/modules/selectedSymbol';
import { getSelectedStockSagaActionCreator } from '../../redux/modules/selectedStock';

export default function FavoriteList({
  favoriteStockList,
  favoriteCurrencyList,
  currencyList,
  stockList,
  menu,
}) {
  console.log(favoriteStockList);
  console.log(favoriteCurrencyList);
  return <div>A</div>;

  //   useEffect(() => {
  //     renderCurrencyList();
  //   }, [renderCurrencyList]);

  //   const dispatch = useDispatch();

  //   const sendSymbol = (selectedStock) => {
  //     dispatch(getSelectedStockSagaActionCreator(selectedStock, "currency"));
  //     dispatch(getSelectedSymbolActionCreator(selectedStock, 'currency'));
  //   };

  // return (
  //   <div className="sidebar currency">
  //     <ul className={menu ? 'none' : ''}>
  //       {currencyList.map((currency) => {
  //         let currencys = [];
  //         const keys = Object.keys(
  //           currency['Time Series (Digital Currency Daily)'],
  //         ).reverse();
  //         const values = Object.values(
  //           currency['Time Series (Digital Currency Daily)'],
  //         )
  //           .map((item) => item['1a. open (USD)'])
  //           .reverse();
  //         keys.forEach((item, i) => {
  //           currencys.push({ date: item, price: values[i] });
  //         });
  //         // let color = currency.change[0] === "-" ? "green" : "red"

  //         function transSymbol(e) {
  //           e.stopPropagation();
  //           sendSymbol(currency['Meta Data']['2. Digital Currency Code']);
  //         }

  //         return (
  //           <li onClick={transSymbol} className="clear-fix">
  //             {/* {currency.change} */}
  //             <div className="sidebar-left">
  //               <span className="sidebar-symbol">
  //                 {currency['Meta Data']['2. Digital Currency Code']}
  //               </span>
  //               <br />
  //               <span className="sidebar-name">
  //                 {currency['Meta Data']['3. Digital Currency Name']}
  //               </span>
  //             </div>
  //             <div className="sidebar-right">
  //               <V.VictoryLine
  //                 data={currencys}
  //                 x="date"
  //                 y="price"
  //                 style={{
  //                   data: { stroke: 'yellow' },
  //                   parent: {
  //                     width: 50,
  //                     height: 'auto',
  //                   },
  //                 }}
  //               />
  //             </div>
  //           </li>
  //         );
  //       })}
  //     </ul>
  //   </div>
  // );
}
