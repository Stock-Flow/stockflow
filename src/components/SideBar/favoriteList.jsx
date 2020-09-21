import React, { useEffect, useCallback, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as V from 'victory';
import { getSelectedSymbolActionCreator } from '../../redux/modules/selectedSymbol';
import { getSelectedStockSagaActionCreator } from '../../redux/modules/selectedStock';
import { getfavoriteListButtonActionCreator } from '../../redux/modules/selectedSymbol';

export default function FavoriteList({
  favoriteStockList,
  favoriteCurrencyList,
  currencyList,
  stockList,
  menu,
  loading,
  currencyLoading,
  toggleMenu
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

  const sendToCurrencySymbol = (selectedStock, favoriteDataList) => {
    dispatch(getfavoriteListButtonActionCreator(selectedStock, favoriteDataList, 'currency'))

  }

  const sendToStockSymbol = (selectedStock, favoriteDataList) => {
    dispatch(getfavoriteListButtonActionCreator(selectedStock, favoriteDataList, 'stock'))

  }

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

  const favoriteStockData = useSelector(state => state.selectedSymbol.selectedStockSymbol)
  const favoriteCurrencyData = useSelector(state => state.selectedSymbol.selectedCurrencySymbol)

  // console.log(currencyList)
  // console.log(favoriteCurrencyList)

  if (!currencyLoading) {
    return (
      <>
        <select className={`sortbox sortValuebox ${menu !== 'favorite' && 'none'}`} id="sort-chocie" onChange={selectedValue} ref={selected}>
          <option defaultValue="stock">stock</option>
          <option value="currency">currency</option>
        </select>
        <div className="sidebar favorite">
          <ul className={menu === 'favorite' ? '' : 'none'}>
            {/* {console.log(currencyList)}
            {console.log(favoriteCurrencyList, 'a')} */}

            {favoriteCurrencyList.map((favoriteCurrencyList) => {
              const currency = currencyList.filter((currency) => {
                return (
                  favoriteCurrencyList.symbol ===
                  currency.symbol
                );
              })[0];
              // console.log(currency)
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
                toggleMenu();
                e.stopPropagation();
                sendCurrencySymbol(
                  currency.symbol,
                );
              }

              const Currencysymbol = currency.symbol
              let favoriteCurrencyDataList = false;
              if (favoriteCurrencyData.filter((currency) => currency.symbol === Currencysymbol).length !== 0) {
                favoriteCurrencyDataList = favoriteCurrencyData.filter((currency) => currency.symbol === Currencysymbol)[0].favorite
                // console.log(favoriteCurrencyDataList)
              }

              function selectedCurrencyFavorite(e) {
                e.stopPropagation();
                sendToCurrencySymbol(currency.symbol);
                if (favoriteCurrencyData.filter((currency) => currency.symbol === Currencysymbol).length !== 0) {
                  favoriteCurrencyDataList = !favoriteCurrencyDataList
                }
              }

              return (
                <>
                  {value === 'currency' &&
                    <li onClick={transSymbol} className="clear-fix">
                      <button className='bookmark' onClick={selectedCurrencyFavorite}>
                        {favoriteCurrencyDataList ? <img src="./images/bookmark_true.png" alt="bookmark_true" className='bookmark_true' /> : <img src="./images/bookmark_false.png" alt="bookmark_false" className='bookmark_false' />}
                      </button>

                      <div className="sidebar-left">
                        <div className="inner-sidebar-left">
                          <span className="sidebar-symbol">
                            {currency.symbol}
                          </span>
                          <br />
                          <span className="sidebar-name">
                            {currency.name}
                          </span>
                        </div>
                        <div className="inner-sidebar-right">
                          <V.VictoryLine
                            data={currencys}
                            x="date"
                            y="price"
                            style={{
                              data: { stroke: 'yellow' },
                              parent: {
                                width: 50,
                                height: 'auto',
                                margin: `${0} auto`
                              },
                            }}
                          />
                        </div>
                      </div>

                      <div className="sidebar-right">
                        <span className='sidebar-price' >{currency.price}</span>
                        <span className='sidebar-change' >{currency.change}%</span>
                      </div>

                    </li>}
                </>
              );
            })}
            {!loading && favoriteStockList.map((symbol) => {
              const stock = stockList.filter((stock) => {
                return symbol.symbol === stock.symbol;
              })[0];
              if (!stock) return null;
              let stocks = [];

              const keys = stock.stockData.map((date) => date.time);
              const values = stock.stockData.map((item) => +item.open);
              keys.forEach((item, i) => {
                stocks.push({ date: item, price: values[i] });
              });
              let color = stock.change[0] === '-' ? 'yellow' : 'red';
              function transSymbol(e) {
                toggleMenu()
                e.stopPropagation();
                sendStockSymbol(stock.symbol);
              }

              const symbolStock = stock.symbol
              let favoriteStockDataList = false;
              if (favoriteStockData.filter((stock) => stock.symbol === symbolStock).length !== 0) {
                favoriteStockDataList = favoriteStockData.filter((stock) => stock.symbol === symbolStock)[0].favorite
                // console.log(favoriteStockDataList)
              }


              function selectedStockFavorite(e) {
                e.stopPropagation();
                sendToStockSymbol(stock.symbol);
                if (favoriteStockData.filter((stock) => stock.symbol === symbolStock).length !== 0) {
                  favoriteStockDataList = !favoriteStockDataList
                }
              }

              return (
                <>
                  {value === 'stock' &&
                    <li onClick={transSymbol} className="clear-fix">
                      <button className='bookmark' onClick={selectedStockFavorite}>
                        {favoriteStockDataList ? <img src="./images/bookmark_true.png" alt="bookmark_true" className='bookmark_true' /> : <img src="./images/bookmark_false.png" alt="bookmark_false" className='bookmark_false' />}
                      </button>

                      <div className="sidebar-left">
                        <div className="inner-sidebar-left">
                          <span className="sidebar-symbol">{stock.symbol}</span>
                          <br />
                          <span className="sidebar-name">{stock.name}</span>
                          <br />
                        </div>
                        <div className="inner-sidebar-right">
                          <V.VictoryLine
                            data={stocks}
                            x="date"
                            y="price"
                            style={{
                              data: { stroke: color },
                              parent: {
                                width: 50,
                                height: 'auto',
                                margin: `${0} auto`
                              },
                            }}
                          />
                        </div>
                      </div>
                      <div className="sidebar-right">
                        <span className="sidebar-price">{stock.price}</span>
                        <span className="sidebar-change">{stock.change}</span>
                      </div>
                    </li>}
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