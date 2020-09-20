import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as V from 'victory';
import { getSelectedSymbolActionCreator } from '../../redux/modules/selectedSymbol';
import { getSelectedStockSagaActionCreator } from '../../redux/modules/selectedStock';
import { getfavoriteListButtonActionCreator } from '../../redux/modules/selectedSymbol'
import { LoadingOutlined } from '@ant-design/icons'

export default function CurrencyList({
  currencyList,
  renderCurrencyList,
  menu,
  loading,
}) {
  useEffect(() => {
    renderCurrencyList();
  }, [renderCurrencyList]);

  const dispatch = useDispatch();

  const sendSymbol = (selectedStock) => {
    dispatch(getSelectedStockSagaActionCreator(selectedStock, 'currency'));
    dispatch(getSelectedSymbolActionCreator(selectedStock, 'currency'));
  };

  const sendToSymbol = (selectedStock, favoriteDataList) => {
    dispatch(getfavoriteListButtonActionCreator(selectedStock, favoriteDataList, 'currency'))
  }

  const favoriteData = useSelector(state => state.selectedSymbol.selectedCurrencySymbol)




  if (!loading) {

  return (
    <div className="sidebar currency">
      <ul className={menu === 'currency' ? '' : 'none'}>
        {currencyList.map((currency) => {
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
          let color = currency.change === "-" ? "green" : "red"

          function transSymbol(e) {
            e.stopPropagation();
            sendSymbol(currency.symbol);
          }

          const symbol = currency.symbol
          let favoriteDataList = false;
          if (favoriteData.filter((currency) => currency.symbol === symbol).length !== 0) {
            favoriteDataList = favoriteData.filter((currency) => currency.symbol === symbol)[0].favorite
          }

          function selectedFavorite(e) {
            e.stopPropagation();
            sendToSymbol(currency.symbol);
            if (favoriteData.filter((currency) => currency.symbol === symbol).length !== 0) {
              favoriteDataList = !favoriteDataList
            }
          }
          
          return (
            <li onClick={transSymbol} className="clear-fix">
              <button className='bookmark' onClick={selectedFavorite}>
                  {favoriteDataList ? <img src="./images/bookmark_true.png" alt="bookmark_true" className='bookmark_true' /> : <img src="./images/bookmark_false.png" alt="bookmark_false" className='bookmark_false' />}
              </button>

              <div className="sidebar-left">
                <span className="sidebar-symbol">
                  {currency.symbol}
                </span>
                <br />
                <span className="sidebar-name">
                  {currency.name}
                </span>
                <br />
              </div>

              <div className="sidebar-right">
                <V.VictoryLine
                  data={currencys}
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
              </div>

              <span className='sidebar-change' >{currency.price}</span>
              <span className='sidebar-change' >{currency.change}%</span>                   
            </li>
          );
        })}
      </ul>
    </div>
  );   
      } else  {
        return (
          <div className="sidebar currency">
              <ul className={menu === 'currency' ? '' : 'none'}>
                <LoadingOutlined />
              </ul>
          </div>
        )
      }
}

