import React, { useEffect, useCallback, useState, useRef } from 'react';
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
  loading,
  currencyLoading,
}) {
  const [value, setValue] = useState('stock')

  const dispatch = useDispatch();
  const selected = useRef()
  // return <div>A</div>;

  const sendCurrencySymbol = (selectedStock) => {
    dispatch(getSelectedStockSagaActionCreator(selectedStock, 'currency'));
    dispatch(getSelectedSymbolActionCreator(selectedStock, 'currency'));
  };

  const sendStockSymbol = (selectedStock) => {
    dispatch(getSelectedStockSagaActionCreator(selectedStock, 'stock'));
    dispatch(getSelectedSymbolActionCreator(selectedStock, 'stock'));
  };

  // currencyList = favoriteCurrencyList.filter((favoriteCurrencyList) => {
  //   return (
  //     favoriteCurrencyList.symbol ===
  //     currencyList['Meta Data']['2. Digital Currency Code']
  //   );
  // });

  // stockList = favoriteStockList.filter((favoriteStockList) => {
  //   return favoriteStockList.symbol === stockList.symbol;
  // });

  const selectedValue = () => {
    setValue(selected.current.value)
  };

  // const selectedFavorite = (e, symbol) => {

  // }


  if (!currencyLoading) {
    return (
      <>
        <select className={`sortbox sortValuebox ${menu !== 'favorite' && 'none'}`} id="sort-chocie" onChange={selectedValue} ref={selected}>
          <option defaultValue="stock">stock</option>
          <option value="currency">currency</option>
        </select>
        <div className="sidebar favorite">
          <ul className={menu === 'favorite' ? '' : 'none'}>
            {favoriteCurrencyList.map((symbol) => {
              const currency = currencyList.filter((currency) => {
                return (
                  favoriteCurrencyList.symbol ===
                  currency.symbol
                );
              })[0];
              let currencys = [];
              const keys = Object.keys(
                currency.currencyData,
              ).reverse();
              const values = Object.values(
                currency.currencyData,
              )
                .map((item) => item.open)
                .reverse();
              keys.forEach((item, i) => {
                currencys.push({ date: item, price: values[i] });
              });
              // let color = currency.change[0] === "-" ? "green" : "red"

              function transSymbol(e) {
                e.stopPropagation();
                sendCurrencySymbol(
                  currency.symbol,
                );
              }

              return (
                <>
                  {value === 'currency' && symbol.favorite === true ?
                    <li onClick={transSymbol} className="clear-fix">
                      {/* {currency.change} */}
                      <div className="sidebar-left">
                        <span className="sidebar-symbol">
                          {currency.symbol}
                        </span>
                        <br />
                        <span className="sidebar-name">
                          {currency.name}
                        </span>
                      </div>
                      <div className="sidebar-right">
                        <V.VictoryLine
                          data={currencys}
                          x="date"
                          y="price"
                          style={{
                            data: { stroke: 'yellow' },
                            parent: {
                              width: 50,
                              height: 'auto',
                            },
                          }}
                        />
                        <div className='bookmark'>
                          {symbol.favorite === false && <img src="./images/bookmark_false.png" alt="bookmark_false" className='bookmark_false' />}
                          {symbol.favorite === true && <img src="./images/bookmark_true.png" alt="bookmark_true" className='bookmark_true' />}
                        </div>
                      </div>
                    </li> : <div></div>}
                </>
              );
            })}
            {!loading && favoriteStockList.map((symbol) => {
              const stock = stockList.filter((stock) => {
                return symbol.symbol === stock.symbol;
              })[0];
              let stocks = [];
              const keys = stock.stockData.map((date) => date.time);
              const values = stock.stockData.map((item) => +item.open);
              keys.forEach((item, i) => {
                stocks.push({ date: item, price: values[i] });
              });
              let color = stock.change[0] === '-' ? 'yellow' : 'red';

              function transSymbol(e) {
                e.stopPropagation();
                sendStockSymbol(stock.symbol);
              }

              return (
                <>
                  {value === 'stock' && symbol.favorite === true ?
                    <li onClick={transSymbol} className="clear-fix">

                      <div className="sidebar-left">
                        <span className="sidebar-symbol">{stock.symbol}</span>
                        <br />
                        <span className="sidebar-name">{stock.name}</span>
                        <br />
                      </div>
                      <div className="sidebar-right">
                        <V.VictoryLine
                          data={stocks}
                          x="date"
                          y="price"
                          style={{
                            data: { stroke: color },
                            parent: {
                              width: 50,
                              height: 'auto',
                            },
                          }}
                        />
                        <span className="sidebar-change">{stock.change}</span>
                        <div className='bookmark'>
                          {symbol.favorite === false && <img src="./images/bookmark_false.png" alt="bookmark_false" className='bookmark_false' />}
                          {symbol.favorite === true && <img src="./images/bookmark_true.png" alt="bookmark_true" className='bookmark_true' />}
                        </div>
                      </div>
                    </li> : <div></div>}
                </>
              );
            })}
          </ul>
        </div>
      </>
    );
  } else {
    return <div></div>
  }


}
